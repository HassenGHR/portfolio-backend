const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); 
require('dotenv').config();

const app = express();
const PORT = 5002;

app.use(bodyParser.json());
app.use(cors()); 


mongoose.connect(process.env.MONGODB_URI);


const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create a model
const FormData = mongoose.model("FormData", formDataSchema);

app.post("/submit-form", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new document
    const formData = new FormData({
      name,
      email,
      message,
    });

    // Save the document to MongoDB
    await formData.save();

    res.status(200).send("Form submitted successfully!");
  } catch (error) {
    console.error("Error handling form submission", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
