function searchTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;

  max = response.data.main.temp_max;
  min = response.data.main.temp_min;
  document.querySelector(".day-temperature").innerHTML = `<b> ${Math.round(
    max
  )}° </b>`;
  document.querySelector(".night-temperature").innerHTML = `/ ${Math.round(
    min
  )}°`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#clouds").innerHTML = response.data.clouds.all;
  document.querySelector("h2").innerHTML = time(response.data.dt);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  background(response.data.weather[0].icon);

  getForecast(response.data.coord);
}

function background(icon) {
  iconLetter = icon.replace(/[0-9]/g, ` `);
  console.log(iconLetter);
  let container = document.querySelector("#container");
  let weekday = document.querySelector("#weekday");
  let description = document.querySelector("#description");
  let button = document.querySelector(".btn");
  if (iconLetter.trim() === "d") {
    container.style.background = `radial-gradient(circle at 10% 20%, rgb(255, 200, 124) 0%, rgb(252, 251, 121) 90%)`;
    button.style.background = `rgb(252, 251, 121)`;
  } else {
    if (iconLetter.trim() === "n") {
      container.style.background = `linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%)`;
      button.style.background = `rgb(145, 205, 218)`;
      weekday.style.color = `rgb(145, 205, 218)`;
      description.style.color = `rgb(145, 205, 218)`;
    } else {
    }
    container.style.background = `default`;
  }
}

function getForecast(coordinates) {
  let key = `727f8c7634f34b68e4f814522083ca30`;
  let apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;

  axios.get(`${apiurl}`).then(showForecast);
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div>`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="day"><div class="row">
              <div class="col-4">
                <h4>${weekday(forecastDay.dt)}</h4>
              </div>
              <div class="col-3">
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="forecastDay.weather[0].description" class="icon"/>
              </div>
              <div class="col-5">
                <h4 class="degree">
                  <strong>${Math.round(forecastDay.temp.max)}°</strong>
                  <h6>/ ${Math.round(forecastDay.temp.min)}°</h6>
                </h4>
              </div></div></div>
              `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function time(timestamp) {
  let time = [
    "00",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
  ];
  let now = new Date(timestamp * 1000);
  let hour = time[now.getHours()];
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${now.getMinutes()}`;
  }
  document.querySelector("#pm").innerHTML = noon(now);
  returnDate(now);
  return `${hour}:${minutes}`;
}

function noon(now) {
  if (now.getHours() > 11) {
    return `p.m.`;
  } else {
    return `a.m.`;
  }
}

function returnDate(now) {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Satuday`,
  ];
  let months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];
  document.querySelector("#weekday").innerHTML = days[now.getDay()];
  document.querySelector("#current-date").innerHTML = `${days[now.getDay()]}, ${
    months[now.getMonth()]
  } ${now.getDate()} ${now.getFullYear()}`;
}

function weekday(timestamp) {
  let now = new Date(timestamp * 1000);
  let day = now.getDay();
  let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return week[day];
}

function usa(event) {
  event.preventDefault();
  celsius.classList.add("inactive");
  fahrenheit.classList.remove("inactive");
  let maxFahrenheit = (max * 9) / 5 + 32;
  let minFahrenheit = (min * 9) / 5 + 32;
  document.querySelector(".day-temperature").innerHTML = `<b> ${Math.round(
    maxFahrenheit
  )}° </b>`;
  document.querySelector(".night-temperature").innerHTML = `/ ${Math.round(
    minFahrenheit
  )}°`;
}

function canada(event) {
  event.preventDefault();
  celsius.classList.remove("inactive");
  fahrenheit.classList.add("inactive");
  document.querySelector(".day-temperature").innerHTML = `<b> ${Math.round(
    max
  )}° </b>`;
  document.querySelector(".night-temperature").innerHTML = `/ ${Math.round(
    min
  )}°`;
}

function auto(city) {
  let key = "727f8c7634f34b68e4f814522083ca30";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(`${apiurl}`).then(searchTemp);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  auto(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = `727f8c7634f34b68e4f814522083ca30`;
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

  axios.get(`${apiurl}`).then(searchTemp);
}
navigator.geolocation.getCurrentPosition(showPosition);

document.querySelector("#input-text").addEventListener("submit", search);
auto("Vancouver");

document.querySelector("#fahrenheit").addEventListener("click", usa);
document.querySelector("#celsius").addEventListener("click", canada);
