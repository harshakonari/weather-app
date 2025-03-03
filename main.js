const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // Replace with your API key
const weatherContainer = document.getElementById("weatherContainer");
const locations = new Set();

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

async function addLocation() {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();
    if (!city || locations.has(city)) return;

    const data = await fetchWeather(city);
    if (data && data.main) {
        locations.add(city);
        const card = document.createElement("div");
        card.classList.add("weather-card");
        card.innerHTML = `<h2>${data.name}</h2><p>${data.main.temp}°C, ${data.weather[0].main}</p>`;
        weatherContainer.appendChild(card);
    }
    cityInput.value = "";
}
