const cityDropdown = document.getElementById("cityDropdown");
const weatherInfo = document.getElementById("weatherInfo");

cityDropdown.addEventListener("change", () => {
  const selectedCity = cityDropdown.value;
  fetchWeatherData(selectedCity);
});

function fetchWeatherData(city) {
  const apiKey = 'b2b4b9fba1eb2902f707404d6c2ae534'; // replace with ur api key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data);
      updateBackground(data.dt, data.timezone);
    })
    .catch(error => console.error("Error fetching weather data:", error));
}

function displayWeatherData(data) {
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const cityName = data.name;

  const weatherHTML = `
    <h2>${cityName}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Weather: ${weatherDescription}</p>
  `;

  weatherInfo.innerHTML = weatherHTML;
}

function updateBackground(timestamp, timezone) {
  const localTime = new Date((timestamp + timezone) * 1000);
  const hours = localTime.getUTCHours();

  if (hours >= 6 && hours < 18) {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  }
}
