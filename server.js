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
          "SELECT * from farmer_batches",
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

// Create routes that will fetch data for the other four tables! NOW.
app.listen(7000);
