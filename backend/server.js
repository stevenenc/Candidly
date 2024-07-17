const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Candidly Backend');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
