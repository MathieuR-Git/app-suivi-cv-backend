const express = require("express");
const bodyParser = require("body-parser");
//const DB = require("./db");
app = express();
//extract PORT number
const port = process.env.PORT || "3050";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//const router = require("./router");
const cors = require("cors");
app.use(express.static("../../public"));
app.use(cors());
// app.use("/v1", router);

//const dbname = "Agenda";
require("dotenv").config();

let server = app.listen(port, "localhost", () => {
  let host = server.address().address,
    port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
