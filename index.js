require("dotenv").config()
const express = require('express');
const connectDB = require('./config/db.js')
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes
const mainRouter = require('./routes/index.route.js')
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const corsOption = {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    Credential: true,
  };


const PORT = process.env.PORT || 8888;
connectDB()

// Middlewares
app.use(cors(corsOption));
app.use('/api', mainRouter)

// Basic Route
app.get('/',(req, res)=>{
    res.send("This is the backend server for recipe")
})


// Server
app.listen(PORT,() => {
    console.log(`The server is running on http://localhost:${PORT}`)
})
