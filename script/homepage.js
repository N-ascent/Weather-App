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
  let now = new Date(timestamp);
  let hour = time[now.getHours()];
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${now.getMinutes()}`;
  }
  return `${hour}:${minutes}`;
}


function searchTemp(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);
  document.querySelector(
    ".day-temperature"
    ).innerHTML = `<srtong><b> ${max}° </b></strong>`;
    document.querySelector(".night-temperature").innerHTML = `/ ${min}°`;
    
    document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed * 3.6
      );
      document.querySelector("#clouds").innerHTML = response.data.clouds.all;
      document.querySelector("h2").innerHTML = time(response.data.dt * 1000);
      document.querySelector(
        "#icon"
      ).setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

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

  return `${days[now.getDay()]}, ${
    months[now.getMonth()]
  } ${now.getDate()} ${now.getFullYear()}`;
}

function usa(event) {
  event.preventDefault();
  let day = document.querySelector(".day-temperature");
  let night = document.querySelector(".night-temperature");
  day.innerHTML = `<srtong><b> 70° </b></strong>`;
  night.innerHTML = `| 66°`;
}

function canada(event) {
  event.preventDefault();
  let day = document.querySelector(".day-temperature");
  let night = document.querySelector(".night-temperature");
  day.innerHTML = `<srtong><b> 21° </b></strong>`;
  night.innerHTML = `| 19°`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = `727f8c7634f34b68e4f814522083ca30`;
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

  axios.get(`${apiurl}`).then(showTemp);
}

let now = new Date();

let cities = document.querySelector("#input-text");
cities.addEventListener("submit", search);

let pm = document.querySelector("#pm");
pm.innerHTML = noon(now);

let calender = document.querySelector("#current-date");
calender.innerHTML = returnDate(now);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", usa);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", canada);

function weekday(now){
  let week = [
    `Sun`,
    `Mon`,
    `Tue`,
    `Wed`,
    `Thu`,
    `Fri`,
    `Sat`,
    `Sun`,
    `Mon`,
    `Tue`,
    `Wed`,
    `Thu`,
    `Fri`,
    `Sat`,
  ];
  
  let dayOne = document.querySelector("#one");
  let dayTwo = document.querySelector("#two");
  let dayThree = document.querySelector("#three");
  let dayFour = document.querySelector("#four");
  let dayFive = document.querySelector("#five");
  
  dayOne.innerHTML = `${week[now.getDay() + 1]}`;
  dayTwo.innerHTML = `${week[now.getDay() + 2]}`;
  dayThree.innerHTML = `${week[now.getDay() + 3]}`;
  dayFour.innerHTML = `${week[now.getDay() + 4]}`;
  dayFive.innerHTML = `${week[now.getDay() + 5]}`;
}
    
  navigator.geolocation.getCurrentPosition(showPosition);
  
  auto("Vancouver");
  weekday(now)