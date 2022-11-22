// API https://openweathermap.org/api

/*
  - Enter the name of a city into the input field.
  - By pressing enter, the user submits the name of the city which updates the DOM with the temperature, weather condition, 
  image of day or night and weather condition icon.
  
  Bonus:
  - By closing the browser window the city 
  name will be stored in localStorage and when the user returns, 
  the name will be retrieved to make an api call to update the DOM.
*/

// Global Variables
// The array that contains the cities we found with our API call.
const foundCity = [];
let currentCityWeather = null;

// DOM References & DOM Manipulation

// City search input box
const cityForm = document.querySelector(".city-form");

// Ref to DOM Elements that display weather info
const htmlContainer = document.querySelector("html");
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-data");
const cityName = document.querySelector(".city");
const stateName = document.querySelector(".state");
const currentDate = document.querySelector(".date");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");
const currentTemp = document.querySelector(".temperature");
const minMaxTemp = document.querySelector(".min-max");
const notFoundMsg = document.querySelector(".not-found");
const instructions = document.querySelector(".instructions");

// API Variables/Constants
const API_KEY = "37f2111fdeb0f75bcb28fbd30c3c518c";

// FUNCTIONS

// We search for the coordinates based on the user input
const searchCity = (userInput) => {
  const GET_COORDINATES_API = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${API_KEY}`;

  // Hides container each time we search for a new city
  container.classList.add("display-none");

  // Reset foundCity array
  foundCity.length = 0;

  fetch(GET_COORDINATES_API)
    .then((res) => res.json())
    .then((data) => {
      // If we find a city we call getWeather and fetch weather info.
      if (data.length > 0) {
        data.forEach((city) => {
          // Fill the foundCity array with what we found
          foundCity.push(city);
          console.log(foundCity);

          // Call the function that displays the cities pills
          getWeather(foundCity);
        });
      }
      // If we can't find a city we display the not found message
      else {
        container.classList.remove("display-none");
        weatherBox.classList.add("display-none");
        notFoundMsg.classList.remove("display-none");
      }
    })
    .catch((err) => console.log(err));
};

const getWeather = (foundCity) => {
  const CITY_WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${foundCity[0].lat}&lon=${foundCity[0].lon}&appid=${API_KEY}&units=metric`;

  weatherBox.classList.remove("display-none");
  notFoundMsg.classList.add("display-none");

  fetch(CITY_WEATHER_API)
    .then((res) => res.json())
    .then((data) => {
      currentCityWeather = { ...data, cityName: foundCity[0].name, state: foundCity[0].state };
      displayWeather(currentCityWeather);
    })
    .catch((err) => console.log(err));
};

const displayWeather = (currentCityWeather) => {
  console.log("calling display weather", currentCityWeather);
  container.style.display = "block";

  let date = new Date();
  let formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  // Displays City name and Country
  cityName.innerHTML = `${currentCityWeather.cityName}, ${currentCityWeather.sys.country}`;

  // Displays current date
  //currentDate.innerHTML = formattedDate;

  // Displays weather icon
  weatherIcon.src = `https://openweathermap.org/img/wn/${currentCityWeather.weather[0].icon}@2x.png`;

  // Switch Statement to determine background picture based on icon code.
  switch (currentCityWeather.weather[0].icon) {
    // Day time backgrounds
    case "01d":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/01d.jpg') center/cover";
      break;
    case "02d":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/02d.jpg') center/cover";
      break;
    case "03d":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/03d.jpg') center/cover";
      break;
    case "04d":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/04d.jpg') center/cover";
      break;
    case "09d":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/09d.jpg') center/cover";
      break;
    case "10d":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/10d.jpg') center/cover";
      break;
    case "11d":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/11d.jpg') center/cover";
      break;
    case "13d":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/13d.jpg') center/cover";
      break;
    case "50d":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/50d.jpg') center/cover";
      break;

    // Night time backgrounds
    case "01n":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/01n.jpg') center/cover";
      break;
    case "02n":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/02n.jpg') center/cover";
      break;
    case "03n":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/03n.jpg') center/cover";
      break;
    case "04n":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/04n.jpg') center/cover";
      break;
    case "09n":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/09n.jpg') center/cover";
      break;
    case "10n":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/10n.jpg') center/cover";
      break;
    case "11n":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/11n.jpg') center/cover";
      break;
    case "13n":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/13n.jpg') center/cover";
      break;
    case "50n":
      htmlContainer.style.background = "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,0.2)), url('./img/bg/50n.jpg') center/cover";
      break;

    default:
      htmlContainer.style.background = "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)";
  }

  // Displays weather description
  weatherDescription.innerHTML = currentCityWeather.weather[0].description;

  // Displays current temperature
  currentTemp.innerHTML = Math.trunc(currentCityWeather.main.temp) + "&#176;C";

  // Displays min/max temperature
  minMaxTemp.innerHTML = `${Math.trunc(currentCityWeather.main.temp_max)}&#176;<sub class="max">MAX</sub> ${Math.trunc(currentCityWeather.main.temp_min)}&#176;<sub class="min">MIN</sub>`;

  // Some item do not have a .state property, hence we use this guard close.
  if (currentCityWeather.state !== undefined) {
    stateName.innerHTML = currentCityWeather.state;
  } else {
    stateName.innerHTML = "";
  }
};

// DOM Events
cityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let inputValue = cityForm.name.value.trim().toLowerCase();
  let isValid = onlyLettersAndSpaces(inputValue);

  if (isValid) {
    searchCity(inputValue);
    instructions.classList.add("display-none");
    cityForm.reset();
  } else {
    instructions.classList.remove("display-none");
  }

  // Calling the geocoding API
});

function onlyLettersAndSpaces(str) {
  return /^[A-Za-z,\s]*$/.test(str);
}
