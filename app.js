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
const foundCities = [];
let currentCityWeather = null;

// DOM References & DOM Manipulation

// City search input box
const cityForm = document.querySelector(".city-form");

// Div where we display the different city found in the geolocation API call
const foundCitiesBox = document.querySelector(".found-cities");

// Ref to DOM Elements that display weather info
const container = document.querySelector(".container");
const cityName = document.querySelector(".city");
const stateName = document.querySelector(".state");
const currentDate = document.querySelector(".date");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");
const currentTemp = document.querySelector(".temperature");
const minMaxTemp = document.querySelector(".min-max");

container.style.display = "none";

// API Variables/Constants
const API_KEY = "37f2111fdeb0f75bcb28fbd30c3c518c";

// FUNCTIONS

// We search for the coordinates based on the user input
const findCities = (userInput) => {
  const GET_COORDINATES_API = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${API_KEY}`;

  // Reset foundCities array
  foundCities.length = 0;

  fetch(GET_COORDINATES_API)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((city) => {
        //console.log(city.name, city.state, city.country);

        // Fill the foundCities array with what we found
        foundCities.push(city);

        // Call the function that displays the cities pills
        displayCities(foundCities);
      });
    })
    .catch((err) => console.log(err));
};

// Here we display the found cities pills so the user can pick
const displayCities = (foundCities) => {
  let displayCitiesText = "";

  for (let city of foundCities) {
    displayCitiesText += `<span class="city-pill" data-lat="${city.lat}" data-lon="${city.lon}" data-state="${city.state}"> ${city.name}, ${city.country} </span>`;
  }

  foundCitiesBox.innerHTML = displayCitiesText;
};

// We get the weather of the city we picked!

const getWeather = (lat, lon, state) => {
  const CITY_WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  // Reset currentCityWeather array
  //currentCityWeather.length = 0;

  fetch(CITY_WEATHER_API)
    .then((res) => res.json())
    .then((data) => {
      currentCityWeather = { ...data, state: state };
      displayWeather(currentCityWeather);
    })
    .catch((err) => console.log(err));
};

const displayWeather = (currentCityWeather) => {
  console.log("calling display weather", currentCityWeather);
  container.style.display = "block";

  let date = new Date();
  let formattedData = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  cityName.innerHTML = `${currentCityWeather.name}, ${currentCityWeather.sys.country}`;
  currentDate.innerHTML = formattedData;
  weatherIcon.src = `https://openweathermap.org/img/wn/${currentCityWeather.weather[0].icon}@2x.png`;
  weatherDescription.innerHTML = currentCityWeather.weather[0].description;
  currentTemp.innerHTML = Math.trunc(currentCityWeather.main.temp) + "&#8451;";
  minMaxTemp.innerHTML = `${Math.trunc(currentCityWeather.main.temp_max)}&#176;/${Math.trunc(currentCityWeather.main.temp_min)}&#176;`;
  stateName.innerHTML = "";

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
  findCities(inputValue);
  cityForm.reset();
});

foundCitiesBox.addEventListener("click", (event) => {
  // We only do something if what we click is a span tag (city pill)
  if (event.target.localName === "span") {
    let latitude = event.target.dataset.lat;
    let longitude = event.target.dataset.lon;
    let state = event.target.dataset.state;

    getWeather(latitude, longitude, state);
  }
});