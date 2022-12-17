function getCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  searchCity(searchInput);
}
function searchCity(city) {
  let apiKey = `3a95t70b3f0900d6bdaf05do94ea7478`;
  let weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&apikey=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(showTemp);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  let apiKey = "3a95t70b3f0900d6bdaf05do94ea7478 ";
  let long = position.coordinates.longitude;
  let lat = position.coordinates.latitude;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  document.querySelector("h1").innerHTML = `${response.data.city}`;
  document.querySelector("#deg").innerHTML = `${Math.round(
    response.data.temperature.current
  )} °C`;
  //document.querySelector("#h-deg").innerHTML = `H:${Math.round(
  //response.data.main.temp_max
  //)} °C`;
  //document.querySelector("#l-deg").innerHTML = `L:${Math.round(
  //response.data.main.temp_min
  // )} °C`;
  //document.querySelector("#feel").innerHTML = `Feels like:${Math.round(
  //response.data.main.feels_like
  // )} °C`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.condition.description}`;
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `Wind Speed: ${response.data.wind.speed} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  //document.querySelector(
  //"#pressure"
  //).innerHTML = `Main: ${response.data.condition.description}`;
}
let now = new Date();
let liii = document.querySelector("#day");
let date = now.getDate();
let hour = now.getHours();
let min = now.getMinutes();
let search = document.querySelector("#search");
let current = document.querySelector("#current");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

if (min < 10) {
  min = `0${min}`;
}
if (hour < 10) {
  hour = `0${hour}`;
}
liii.innerHTML = `${day} ${hour}:${min}`;
search.addEventListener("submit", getCity);
current.addEventListener("click", getLocation);
searchCity("Ahwaz");
