const apiKey = "e51055b0e46f3c59ae05362589005fac"; // Replace with your actual API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";


//____https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//____e51055b0e46f3c59ae05362589005fac


const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const errorMessageElement = document.querySelector(".statusBar"); // New element for error messages

searchButton.addEventListener("click", () => {
  const location = locationInput.value.trim(); // Trim whitespace
  if (location) {
    fetchWeather(location);
  } else {
    displayError("Please enter a city name."); // Display error for empty input
  }
});

// URL = https://api.openweathermap.org/data/2.5/weather?q=location&appid=e51055b0e46f3c59ae05362589005fac

function fetchWeather(location) {
  const url = apiUrl + "?q=" + location + "&appid=" + apiKey;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found"); // Throw error if city is not found
      }
      return response.json();
    })
    .then((data) => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = Math.round(data.main.temp) + "°C";
      descriptionElement.textContent = data.weather[0].description;
      errorMessageElement.textContent = ""; // Clear any previous error messages
    })
    .catch((error) => {      
      displayError(error.message); // Display error message
    });
}

function displayError(message) {
  errorMessageElement.textContent = message; // Display the error message
}
