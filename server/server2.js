// server.js

// Add these imports at the top of your file
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentinfo/info', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define schema and model for your data
const dataSchema = new mongoose.Schema({
    enrollmentNo: { type: String, required: true, unique: true }, // Ensure unique enrollment numbers
    cgpa: { type: Number, required: true, min: 0, max: 10 }, // Set reasonable CGPA range
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },  // Ensure unique roll numbers
    dob: { type: Date, required: true },
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    skills: [{ type: String, trim: true, required: true }],
    skillscore: [{ type: String, trim: true, required: true }],
    researchPapers: { type: Number, default: 0 },
    researchPaperUrls: [{ type: String, trim: true }],
    patents: { type: Number, default: 0 },
    patentUrls: [{ type: String, trim: true }],
    }
);

const DataModel = mongoose.model('Data', dataSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API endpoint to retrieve all data
app.get('/api/data', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(path.join('/Users/lakshyaagrawal/Coding/CDPC App/server/client')));

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
