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
  res.json({ message: "Home/Root Route responding" });
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
