'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var items = require("./items.js");

var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/meals", function (req, res) {
  items.add(req.body);
  res.status(201).json({"status": "ok"});
});

app.get("/", function (req, res) {
  items.get()
})

app.listen(3000, function () {
  console.log("Listening on port 3000...")
});
