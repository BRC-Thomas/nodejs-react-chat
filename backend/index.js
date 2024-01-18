require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const SECRET = process.env.API_SECRET;
const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  //Get or create user
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": `${SECRET}` } }
    );

    return res.status(r.status).json(r.data);
  } catch (e) {
    if (e.response) {
      return res.status(e.response.status).json(e.response.data);
    } else {
      console.error(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.listen(3001);
