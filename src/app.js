let searchForm = document.querySelector("#search-form");
let inputBar = document.querySelector("#input-bar");

function searchCity(event) {
  event.preventDefault();

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${inputBar.value}`;
  let city = inputBar.value;
  let apiKey = `613b83077f10b4c656d2ofbe1faebbet`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayWeather);
}

searchForm.addEventListener("submit", searchCity);

function displayWeather(response) {
  console.log(response.data);
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = Math.round(response.data.temperature.current);

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class= icon"/>`;

  let humidity = document.querySelector("#humidity");
  let humidityValue = Math.round(response.data.temperature.humidity);
  humidity.innerHTML = `humidity: ${humidityValue}%`;

  let wind = document.querySelector("#wind-speed");
  windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `wind: ${windSpeed}km/h`;

  let clouds = document.querySelector("#cloud-cover");
  clouds.innerHTML = response.data.condition.description;

  let now = new Date(response.data.time * 1000);
  let day = document.querySelector("#weekday");
  day.innerHTML = formatWeekday(now);

  let time = document.querySelector("#time");
  time.innerHTML = formatTime(now);

  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = formatDate(now);
}
function formatWeekday(now) {
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
  return `${day}`;
}

function formatTime(now) {
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = now.getHours();
  return `${hours}:${minutes}`;
}

function formatDate(now) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let dayNumber = now.getDate();
  return `${dayNumber} ${month}`;
}
