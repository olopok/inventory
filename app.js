const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const inventory = require("./src/routes/invroutes");
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.use("/", inventory);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}`);
});
