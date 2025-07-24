const express = require("express");
const mysql = require("mysql");
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root", // put right username and password
  password: "password",
  port: 3307,
  database: "agriweal",
});
const app = express();

app.use(express.urlencoded({ extended: true })); // body parser

app.get("/", (req, res) => {
  res.redirect("/dashboard");
});
app.get("/dashboard", (req, res) => {
  // fetch all data and do a summary on the view
  dbConn.query("SELECT * FROM farmers", function (farmersErr, farmers) {
    if (farmersErr)
      return res
        .status(500)
        .json({ message: "Server Error", error: err.message });
    dbConn.query("SELECT * FROM crops ", function (cropsErr, crops) {
      if (cropsErr)
        return res
          .status(500)
          .json({ message: "Server Error", error: err.message });
      dbConn.query("SELECT * from batches", function (batchesErr, batches) {
        if (batchesErr)
          return res
            .status(500)
            .json({ message: "Server Error", error: err.message });
        dbConn.query(
          "SELECT * from farmer_batches order by date_purchased DESC",
          function (farmerBatchesErr, farmerBatches) {
            if (farmerBatchesErr)
              return res
                .status(500)
                .json({ message: "Server Error", error: err.message });
            res.render("dashboard.ejs", {
              farmers,
              crops,
              batches,
              farmerBatches,
            });
            // res.json({farmers:farmers, crops:crops, batches:batches, farmerBatches:farmerBatches})
          }
        );
      });
    });
  });
});

app.get("/farmers", (req, res) => {
  dbConn.query("SELECT * FROM farmers", (err, farmers) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server Error", error: err.message });
    }
    res.json(farmers);
  });
});

// POST route to add a new farmer
app.post("/add-farmer", (req, res) => {
  const { name, phone, email, location } = req.body;
  dbConn.query(
    "INSERT INTO farmers (name, phone, email, location, created_at) VALUES (?, ?, ?, ?, NOW())",
    [name, phone, email, location],
    (err, result) => {
      if (err) return res.status(500).send("Error adding farmer");
      res.redirect("/dashboard");
    }
  );
});

// POST route to add a new crop
app.post("/add-crop", (req, res) => {
  const { name, nursery_days, days_to_harvest, harvest_duration_days } =
    req.body;
  dbConn.query(
    "INSERT INTO crops (name, nursery_days, days_to_harvest, harvest_duration_days) VALUES (?, ?, ?, ?)",
    [name, nursery_days, days_to_harvest, harvest_duration_days],
    (err, result) => {
      if (err) return res.status(500).send("Error adding crop");
      res.redirect("/dashboard");
    }
  );
});

// POST route to add a new batch
app.post("/add-batch", (req, res) => {
  const {
    crop_id,
    variety,
    date_sown,
    expected_transplant_date,
    expected_harvest_start,
    expected_harvest_end,
    total_seedlings,
  } = req.body;
  dbConn.query(
    "INSERT INTO batches (crop_id, variety, date_sown, expected_transplant_date, expected_harvest_start, expected_harvest_end, total_seedlings) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      crop_id,
      variety,
      date_sown,
      expected_transplant_date,
      expected_harvest_start,
      expected_harvest_end,
      total_seedlings,
    ],
    (err, result) => {
      if (err) return res.status(500).send("Error adding batch");
      res.redirect("/dashboard");
    }
  );
});

// POST route to add a new seedling purchase
app.post("/add-purchase", (req, res) => {
  const { farmer_id, batch_id, seedlings_bought, date_purchased } = req.body;
  dbConn.query(
    "INSERT INTO farmer_batches (farmer_id, batch_id, seedlings_bought, date_purchased) VALUES (?, ?, ?, ?)",
    [farmer_id, batch_id, seedlings_bought, date_purchased],
    (err, result) => {
      if (err) return res.status(500).send("Error adding purchase");
      res.redirect("/dashboard");
    }
  );
});

// Create routes that will fetch data for the other four tables! NOW.
app.listen(7000);
