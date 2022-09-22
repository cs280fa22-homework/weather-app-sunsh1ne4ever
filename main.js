import './style.css'

const BASE_URL = "https://dataservice.accuweather.com";
const API_KEY = "lYs2Gc2yBfd8wDYixLMIm0AAQxZgObNo"; // terrible practice!
// You should never save API key directly in source code

const search = document.getElementById("search");
search.addEventListener("submit", getWeatherForecast);

function getWeatherForecast(event) {
  event.preventDefault();
  const city = document.getElementById("city").value.trim();
  getLocationKey(city);
}

function getLocationKey(city) {
  fetch(`${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`)
  .then((response) => response.json())
  .then((data) => {
    const location = data[0];
    getCurrentCondition(location);
  })
  .catch((err) => console.log(err));
  console.log(city);
}

function getCurrentCondition(location) {
  const key = location.Key;
  fetch(`${BASE_URL}/currentconditions/v1/${key}?apikey=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    const condition = data[0];
    updateUI(location, condition);
  })
  .catch((err) => console.log(err));
}

function updateUI(location, forecast) {
  document.getElementById("name").innerText = location.EnglishName;
  document.getElementById("condition").innerText = forecast.WeatherText;
  document.getElementById("temperature").innerText = forecast.Temperature.Metric.Value;
}
