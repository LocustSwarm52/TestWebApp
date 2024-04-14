const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const path = require('path');
const app = express();

// Set up the serial port connection to the Arduino
const port = new SerialPort({ path: 'COM3', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname, 'Public')));

// Endpoint to get the latest sensor data
app.get('/data', (req, res) => {
  // Placeholder for actual data - to be replaced with real-time Arduino data
  res.json({ temp: "Loading...", humidity: "Loading..." });
});

// Establish events for when data is read from the serial port
parser.on('data', data => {
  console.log('Received data from the serial port: ' + data);
  // Parse the received data and potentially update the response in the '/data' endpoint
});

const webPort = process.env.PORT || 3000;
app.listen(webPort, () => {
    console.log(`Server running on port ${webPort}`);
});


