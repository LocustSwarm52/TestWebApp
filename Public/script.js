// Existing code for fetching and displaying temperature and humidity
function fetchData() {
    fetch('/data')
    .then(response => response.json())
    .then(data => {
        document.getElementById('temp').textContent = data.temperature + '°C';
        document.getElementById('humidity').textContent = data.humidity + '%';
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Initial fetch and set to refresh data every 2 seconds
fetchData();
setInterval(fetchData, 2000);

// Function to send the new humidity target to the server
function setHumidityTarget() {
  const target = document.getElementById('humidity-target').value;
  fetch('/set-humidity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ humidityTarget: target })
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error setting humidity target:', error));
}


