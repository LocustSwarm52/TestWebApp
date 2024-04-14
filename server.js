const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'Public')));

// Serve the HTML file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'Public/index.html'));
});

// Serve static JSON data for simulation
app.get('/data', (req, res) => {
    res.json({
        temperature: "22°C",
        humidity: "50%",
        moisture: "35%"
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

