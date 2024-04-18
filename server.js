const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const path = require('path');
const app = express();

// State to hold the latest sensor data
let sensorData = {
  temperature: "Loading...",
  humidity: "Loading..."
};

// Set up the serial port connection to the Arduino
const port = new SerialPort({ path: 'COM3', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname, 'Public')));

// Endpoint to get the latest sensor data
app.get('/data', (req, res) => {
  // Placeholder for actual data - to be replaced with real-time Arduino data
  res.json(sensorData);
});

parser.on('data', data => {
  console.log('Received data from the serial port: ' + data);
  const parts = data.split(", "); // Assuming your Arduino output is "Humidity: 21%, Temperature: 29C"
  if (parts.length === 2) {
    sensorData.humidity = parts[0].split(": ")[1]; // Extracts humidity
    sensorData.temperature = parts[1].split(": ")[1]; // Extracts temperature
  }
});

const webPort = process.env.PORT || 3000;
app.listen(webPort, () => {
    console.log(`Server running on port ${webPort}`);
});

// Add a POST endpoint to receive the humidity target
app.post('/set-humidity', express.json(), (req, res) => {
  const { humidityTarget } = req.body;
  if (humidityTarget && !isNaN(humidityTarget)) {
    port.write(`H${humidityTarget}\n`, (err) => {
      if (err) {
        return res.status(500).send("Failed to send humidity target to Arduino");
      }
      res.send("Humidity target updated");
    });
  } else {
    res.status(400).send("Invalid humidity target");
  }
});

