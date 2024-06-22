const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

weatherForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let location = locationInput.value.trim();
    
    if (!location) {
        alert('Please enter a location');
        return;
    }
    
    const weatherData = await getWeather(location);
    
    if (weatherData) {
        displayWeather(weatherData);
    } else {
        weatherInfo.textContent = 'Weather data not found';
    }
    
    locationInput.value = '';
});

async function getWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (response.ok) {
            return {
                location: data.name,
                temperature: data.main.temp,
                description: data.weather[0].description,
                icon: data.weather[0].icon
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

function displayWeather(weather) {
    weatherInfo.innerHTML = `
        <h2>${weather.location}</h2>
        <p>Temperature: ${weather.temperature}°C</p>
        <p>Description: ${weather.description}</p>
        <img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="Weather icon">
    `;
}
