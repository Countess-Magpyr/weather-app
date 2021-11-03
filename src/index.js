function formatDate(date) {
  var hours = date.getHours();

  if (hours < 10) {
    hours = "0".concat(hours);
  }

  var minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }

  var dayIndex = date.getDay();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var day = days[dayIndex];
  return "".concat(day, " ").concat(hours, ":").concat(minutes);
}

let h2 = document.querySelector("h2");
let currentTime = new Date();
h2.innerHTML = formatDate(currentTime);

//Get results from city search

function displayWeatherCondition(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("temperatureElement");
  temperatureElement.innerHTML = temp;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("descriptionElement");
  descriptionElement.innerHTML = description;
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = currentCity;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "24938515d6364eea8b6bfd1202de9eb1";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Temperature(C to F)
//function convertToFahrenheit(event) {
//  event.preventDefault();
//  var temperatureElement = document.querySelector("#temperature");
//  temperatureElement.innerHTML = 77;
//}

//function convertToCelsius(event) {
//  event.preventDefault();
// var temperatureElement = document.querySelector("#temperature");
// temperatureElement.innerHTML = 25;
//}

var searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//var fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);
//var celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);

// current location

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("temperatureElement");
  temperatureElement.innerHTML = temp;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("descriptionElement");
  descriptionElement.innerHTML = description;
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = currentCity;
  console.log(currentCity);
}

// get current location

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "24938515d6364eea8b6bfd1202de9eb1";
  let apiUrl2 =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey +
    "&units=metric";
  console.log(apiUrl2);
  axios.get(apiUrl2).then(showTemperature);
}

function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", findPosition);
