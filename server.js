const express = require("express");
const path = require("path");
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname)));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/index2", function (req, res) {
  res.sendFile(path.join(__dirname, "/index2.html"));
});

app.get("/get", (req, res, next) => {
  fs.readFile('data.json', (e, data) => {
    res.send(JSON.parse(data));
  });
});

app.post("/post", (req, res, next) => {
  fs.writeFile('data.json', JSON.stringify(req.body), (e) => {
    if (!e) {
      res.send("success");
    }
  });
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  let host = server.address().address;
  let port = server.address().port;
});
