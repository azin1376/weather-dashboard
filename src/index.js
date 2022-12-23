function getCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  searchCity(searchInput);
}
function searchCity(city) {
  let apiKey = `bd79ao40tde3dec118ca46bc3e6dd55f`;
  let weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(weatherUrl).then(showTemp);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  console.log(position);
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function formatDate(timesTemp) {
  let now = new Date(timesTemp);
  let date = now.getDate();
  let hour = now.getHours();
  let min = now.getMinutes();
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
  return `Last updated: ${day} ${hour}:${min}`;
}
function showTemp(response) {
  if (response.data.message !== undefined) {
    document.querySelector("h1").innerHTML = "No match found.";
    return;
  }
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.city}, ${response.data.country}`;
  celsiusTemperture = response.data.temperature.current;
  document.querySelector("#deg").innerHTML = `${Math.round(celsiusTemperture)}`;

  document.querySelector("#feel").innerHTML = `Feels like:${Math.round(
    response.data.temperature.feels_like
  )} °C`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.condition.description}`;
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `Wind Speed: ${response.data.wind.speed} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `Pressure: ${response.data.temperature.pressure}`;
  let liii = document.querySelector("#day");
  liii.innerHTML = formatDate(response.data.time * 1000);
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  getForecast(response.data.coordinates);
  far.classList.remove("active");
  cel.classList.add("active");
}
function getForecast(coordinates) {
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(desplayForecast);
}
function farTemp(event) {
  event.preventDefault();
  let farElement = document.querySelector("#deg");
  cel.classList.remove("active");
  far.classList.add("active");
  let farTemperature = (celsiusTemperture * 9) / 5 + 32;
  farElement.innerHTML = Math.round(farTemperature);
}
function celTemp(event) {
  event.preventDefault();
  let farElement = document.querySelector("#deg");
  farElement.innerHTML = Math.round(celsiusTemperture);
  far.classList.remove("active");
  cel.classList.add("active");
}
function desplayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    console.log(forecastDay);
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 bg-col3">
            <ul class="ul-style1">
              <li>${formatDay(forecastDay.time)}</li>
              <li>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                />
              </li>
              <li>
              <strong>${Math.round(forecastDay.temperature.maximum)}°</strong> 
               <span class="temp-design">${Math.round(
                 forecastDay.temperature.minimum
               )}°</span>
               </li>
            </ul> 
        </div> `;
    }
  });

  // forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function formatDay(timesTemp) {
  let date = new Date(timesTemp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let search = document.querySelector("#search");
let current = document.querySelector("#current");
let celsiusTemperture = null;
let far = document.querySelector("#far");
let cel = document.querySelector("#cel");
cel.addEventListener("click", celTemp);
search.addEventListener("submit", getCity);
current.addEventListener("click", getLocation);
far.addEventListener("click", farTemp);
searchCity("Ahvaz");
//desplayForecast();
