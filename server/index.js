const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const port = 9000;

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/something", (req, res) => {
  const response = {
    body: {
      time: new Date().toUTCString(),
    },
  };
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
