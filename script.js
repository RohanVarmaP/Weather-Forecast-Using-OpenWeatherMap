const apiKey = "141b859a30dcae2b8ddcf390ef7ed0d3"; // Replace with your actual OpenWeatherMap API key\

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    document.getElementById("city").textContent = `City: ${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("description").textContent = `Description: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Create Chart.js chart (assuming you have the library included)
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Temperature', 'Humidity', 'Wind Speed'],
        datasets: [{
          label: 'Weather Data',
          data: [data.main.temp, data.main.humidity, data.wind.speed],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("City not found or an error occurred.");
  }
}