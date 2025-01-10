require('dotenv').config();
console.log(process.env);
const apiKey = process.env.API_KEY;

const btn = document.getElementById('btn');
const infoGeneral = document.getElementById('infoWeather')
const containerWeather = document.getElementById('weather-info')

const getWeather = (city) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => displayWeather(data))
};

// Effect Blur CSS
document.querySelectorAll('.info-weather').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        document.querySelectorAll('.info-weather').forEach((otherElement) => {
            if (otherElement !== element) {
                otherElement.classList.add('blurred');
            }
        });
    });

    element.addEventListener('mouseleave', () => {
        document.querySelectorAll('.info-weather').forEach((otherElement) => {
            otherElement.classList.remove('blurred');
        });
    });
});
document.getElementById('infoWeather1').classList.add('active');
document.getElementById('infoWeather2').classList.add('active');


const displayWeather = (data) => {
  const info1 = document.getElementById('infoWeather1');
  const info2 = document.getElementById('infoWeather2');
  containerWeather.style.display = 'flex';
  
  info1.innerHTML = `
    Ciudad: ${data.name} 🗺️ <br> Temperatura: ${(data.main.temp - 273.15).toFixed(1)} °C 🌡️<br> Descripción del clima: ${data.weather[0].description} 🌦️ <br>`
  info2.innerHTML = `Humedad: ${data.main.humidity} % 🍃 <br> Presión: ${Math.round(data.main.pressure)} hPa ⏱️ <br> Nivel del mar: ${Math.round(data.main.sea_level)} m 🌊 <br> Visibilidad: ${Math.round(data.visibility / 1000)} km 🌫️ <br>`;
};

btn.addEventListener('click', function () {
  const input = document.getElementById('input-data').value;
  if (input != false) {
    if (input) {
      const delays = [500, 1500, 2200, 2300];
      const actions = [
        () => { btn.innerHTML = 'Cargando...'; },
        () => { infoGeneral.innerHTML = 'Información encontrada exitosamente.'; },
        () => { getWeather(input); },
        () => { btn.innerHTML = 'Enviar'; }
      ];
      actions.forEach((action, index) => {
        setTimeout(action, delays[index]);
      });
    }

  } else {
    alert('Por favor, ingresa una ciudad válida.');
  }
});
