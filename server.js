"use strict";

var express = require("express");
var cors = require("cors");
var multer = require("multer");
// require and use "multer"...

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

var upload = multer({ dest: "uploads/" });
app.post("/api/fileanalyse", upload.single("upfile"), function(req, res, next) {
  var upfile = req.file;
  if (typeof upfile === "undefined") res.json({ error: "file not uploaded" });
  return res.json({
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
