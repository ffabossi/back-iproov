const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/enrol-token", async (req, res) => {
  const url = "https://us.rp.secure.iproov.me/api/v2/claim/enrol/token";
  const body = req.body;

  try {
    const response = await axios.post(url, body);
    res.send(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response.status).send(error.response.data);
  }
});

const startServer = async () => {
  const port = 3000;

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
