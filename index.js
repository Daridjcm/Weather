const btn = document.getElementById('btn');

const getWeather = (city) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&appid=dc8d10217ff22abb358e09b68985f432`)
    .then(res => res.json())
    .then(data => displayWeather(data))
};

const displayWeather = (data) => {
  const weatherCity = document.getElementById('city');
  let weatherTemp = document.getElementById('temp');
  const weatherDesc = document.getElementById('desc');
  weatherCity.innerHTML = `Ciudad: ${data.name} 🗺️`;
  weatherTemp.innerHTML = `Temperatura: ${(data.main.temp - 273.15).toFixed(1)}°C 🌡️`;
  weatherDesc.innerHTML = `Descripción del clima: ${data.weather[0].description} 🌦️`;
};

btn.addEventListener('click', function () {
  const input = document.getElementById('input-data').value;
  if (input != false) {
    getWeather(input);
  } else {
    alert('Por favor, ingresa una ciudad válida.');
  }
});
