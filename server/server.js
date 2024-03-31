const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Define a schema for your collection
const dataSchema = new mongoose.Schema({
    enrollmentNo: { type: String, required: true, unique: true }, // Ensure unique enrollment numbers
    cgpa: { type: Number, required: true, min: 0, max: 10 }, // Set reasonable CGPA range
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },  // Ensure unique roll numbers
    dob: { type: Date, required: true },
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    skills: [{ type: String, trim: true, required: true }],
    researchPapers: { type: Number, default: 0 },
    researchPaperUrls: [{ type: String, trim: true }],
    patents: { type: Number, default: 0 },
    patentUrls: [{ type: String, trim: true }],
});

// Create a model based on the schema
const DataModel = mongoose.model('Data', dataSchema);

// Handle form submission to store data
// Handle form submission to store data
app.post('/submit', async (req, res) => {
    try {
        // Create a new document based on the submitted data
        const newData = await DataModel.create({
            enrollmentNo: req.body.enrollmentNo,
            cgpa: req.body.cgpa,
            name: req.body.name,
            rollNo: req.body.rollNo,
            dob: req.body.dob,
            linkedin: req.body.linkedin,
            github: req.body.github,
            skills: req.body.skills,
            skillscore: req.body.skillscore, // Include skillscore field
            researchPapers: req.body.researchPapers,
            researchPaperUrls: req.body.researchPaperUrls,
            patents: req.body.patents,
            patentUrls: req.body.patentUrls
        });
        console.log('Data inserted:', newData);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error inserting data.');
    }
});


// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
