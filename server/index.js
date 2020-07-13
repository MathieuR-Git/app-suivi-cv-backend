const express = require("express");
const bodyParser = require("body-parser");

app = express();

//extract PORT number
const port = process.env.PORT || "3050";
const cors = require("cors");
const router = require("./router/router");
const userRouter = require("./router/userRouter");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static("../../public"));
app.use(cors());
app.use("/v1", router);
app.use("/v1/auth", userRouter);

require("dotenv").config();

let server = app.listen(port, "localhost", () => {
  let host = server.address().address,
    port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
