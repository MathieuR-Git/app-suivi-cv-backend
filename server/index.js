const express = require("express");
const bodyParser = require("body-parser");
const db=require('../database/models');
app = express();

//extract PORT number
const port = process.env.PORT || "3050";
const cors = require("cors");
const router = require("./router/router");
//const userRouter = require("./router/userRouter");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static("../../public"));
app.use(cors());
app.use("/v1", router);
//app.use("/v1/auth", userRouter);

db.sequelize.sync().then(() =>{
let server = app.listen(port, "localhost", () => {
  let host = server.address().address,
    port = server.address().port;
  console.log("Backend sur l'addresse : http://%s:%s", host, port);
});
});
