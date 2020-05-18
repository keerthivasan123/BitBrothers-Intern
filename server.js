require("dotenv").config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
 
//My routes 
const userRoutes = require("./routes/user");

//DB Connection
mongoose
  .connect(process.env.DATABASE, { 
    useMongoClient: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
 
//Middlewares
app.use(express.json());
app.use(express.urlencoded());

//My Routes
app.use("/api/", userRoutes);

app.get('*', (req, res) => {
  res.send('route is undefined');
});

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});