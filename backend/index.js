require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;
var cors = require("cors");
const { database } = require("./db/database");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

database(app);

fs.readdirSync(path.join(__dirname + "/routes")).forEach((file) => {
  require(path.join(__dirname + "/routes", file))(app, file.split(".")[0]);
});

app.listen(PORT, () => {
  console.log(`we are getting ready on port ${PORT}`);
});
