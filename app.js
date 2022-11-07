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
const container = document.querySelector(".container");
const cityName = document.querySelector(".city");
const stateName = document.querySelector(".state");
const currentDate = document.querySelector(".date");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");
const currentTemp = document.querySelector(".temperature");
const minMaxTemp = document.querySelector(".min-max");

// Set the container to hide when we load the
container.style.display = "none";

// API Variables/Constants
const API_KEY = "37f2111fdeb0f75bcb28fbd30c3c518c";

// FUNCTIONS

// We search for the coordinates based on the user input
const searchCity = (userInput) => {
  const GET_COORDINATES_API = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${API_KEY}`;

  // Reset foundCity array
  foundCity.length = 0;

  fetch(GET_COORDINATES_API)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((city) => {
        // Fill the foundCity array with what we found
        foundCity.push(city);
        console.log(foundCity);

        // Call the function that displays the cities pills
        getWeather(foundCity);
      });
    })
    .catch((err) => console.log(err));
};

const getWeather = (foundCity) => {
  const CITY_WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${foundCity[0].lat}&lon=${foundCity[0].lon}&appid=${API_KEY}&units=metric`;

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

  cityName.innerHTML = `${currentCityWeather.cityName}, ${currentCityWeather.sys.country}`;
  //currentDate.innerHTML = formattedDate;
  weatherIcon.src = `https://openweathermap.org/img/wn/${currentCityWeather.weather[0].icon}@2x.png`;
  weatherDescription.innerHTML = currentCityWeather.weather[0].description;
  currentTemp.innerHTML = Math.trunc(currentCityWeather.main.temp) + "&#176;C";
  minMaxTemp.innerHTML = `${Math.trunc(currentCityWeather.main.temp_max)}&#176;<sub class="max">MAX</sub> ${Math.trunc(currentCityWeather.main.temp_min)}&#176;<sub class="min">MIN</sub>`;
  stateName.innerHTML = "";

  // Some item do not have a .state property, hence we use this guard close.
  if (currentCityWeather.state !== "undefined") {
    stateName.innerHTML = currentCityWeather.state;
  }
};

// DOM Events
cityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let inputValue = cityForm.name.value.trim().toLowerCase();
  // NEED TO ADD A REGEX PATTERN TO MAKE SURE THERE ARE NO NUMBERS IN THE INPUT

  // Calling the geocoding API
  searchCity(inputValue);
  cityForm.reset();
});
