const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { PORT } = require("./config/constants");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
