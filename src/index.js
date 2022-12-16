function getCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  searchCity(searchInput);
}
function searchCity(city) {
  let apiKey = `be81f193e065bf5feb2d944c7336968b`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(showTemp);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  console.log(position);
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&untits=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  document.querySelector("h1").innerHTML = `${response.data.name}`;
  document.querySelector("#deg").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;
  document.querySelector("#h-deg").innerHTML = `H:${Math.round(
    response.data.main.temp_max
  )} °C`;
  document.querySelector("#l-deg").innerHTML = `L:${Math.round(
    response.data.main.temp_min
  )} °C`;
  document.querySelector("#feel").innerHTML = `Feels like:${Math.round(
    response.data.main.feels_like
  )} °C`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `Wind Speed: ${response.data.wind.speed} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `Main: ${response.data.weather[0].main}`;
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
searchCity("Ahvaz");
