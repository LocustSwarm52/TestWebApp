// Fetch the data from the server and update the elements on the page
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
