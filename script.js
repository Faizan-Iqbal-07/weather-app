const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");




async function checkWeather(city) {
    if (!city.trim()) {
        alert("Please enter a valid city name");
        return;
    }
    
    const key = "9f91cbd3b0d3d7b9383a67d3921da6dc";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    const response = await fetch(URL);
    const data = await response.json();

    if (data.cod === "404") {
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        return;
    }

    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";

    temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}<sup>°C</sup>`;
    description.textContent = `${data.weather[0].description}`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;

    switch (data.weather[0].main) {
        case 'Clouds':
            weatherImg.src = "assets/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "assets/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "assets/rain.png";
            break;
        case 'Mist':
            weatherImg.src = "assets/mist.png";
            break;
        case 'Snow':
            weatherImg.src = "assets/snow.png";
            break;
    }
}


inputBox.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        checkWeather(inputBox.value);
    }
});

searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
});
