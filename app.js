const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/enrol-token", async (req, res) => {
  const url = "https://us.rp.secure.iproov.me/api/v2/claim/enrol/token";
  const body = req.body;

  try {
    const response = await axios.post(url, body);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response.status).send(error.response.data);
  }
});

const startServer = () => {
  const port = process.env.PORT || 3000;
  try {
    console.log(`Server running on ${port}`);
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
