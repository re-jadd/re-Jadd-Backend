require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

const driverController = require("./controllers/driverController");
app.use("/api/", driverController);

app.get('/', (req, res) => {
    res.send('Recylcet');
  })
  

app.listen(port, function() {
  console.log("---------------------------------------");
  console.log("Express listening on localhost:" + port);
  console.log("---------------------------------------");
});