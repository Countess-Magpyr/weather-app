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

let timeElement = document.querySelector("#timeNow");
let currentTime = new Date();
timeElement.innerHTML = formatDate(currentTime);
//////////////////////////////////////////////////////////////////////////////////
//Get results from city search
//////////////////////////////////////////////////////////////////////////////////

function displayWeatherCondition(response) {
  let celsiusTemp = response.data.main.temp;
  let temperatureElement = document.querySelector("temperatureElement");
  temperatureElement.innerHTML = celsiusTemp;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("descriptionElement");
  descriptionElement.innerHTML = description;
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = currentCity;
  let windVar = response.data.wind.speed;
  let windElement = document.querySelector("windElement");
  windElement.innerHTML = windVar;
  let humidityVar = response.data.main.humidity;
  let humidityElement = document.querySelector("humidityElement");
  humidityElement.innerHTML = humidityVar;
  let iconElement = document.querySelector("#icon");
  let weatherIcon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
  );
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
  console.log(city);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  console.log(fahrenheitTemp);
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//let button = document.querySelector("button");
//button.addEventListener("click", findPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Berlin");
