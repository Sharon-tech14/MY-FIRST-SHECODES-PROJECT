function search(event) {
  event.preventDefault();

  let apiKey = "0b0730393co7c0e96d521df6373adt84"; // Replace with your actual key if this is invalid
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.condition.humidity;
  let wind = Math.round(response.data.wind.speed);
  let dateTime = new Date(response.data.time);

  // Update temperature with Unicode degree symbol
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature}\u00B0C`;

  // Only insert the value, not the label
  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let windElement = document.querySelector("#current-wind");
  windElement.innerHTML = `${wind} km/h`;

  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formatDate(dateTime);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Show current date and time on initial load
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
