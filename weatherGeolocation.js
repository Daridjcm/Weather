import { apiKey, infoGeneral, containerWeather, btn2 } from ".";

// Event Listener button 'Ver mi tiempo según mi ubicación'
btn2.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      showPosition,
      (error) => {
        console.error("Error al obtener la posición:", error);
        alert("No se pudo obtener la ubicación.");
        infoGeneral.innerHTML = `<span style="color: firebrick;">Error al obtener los datos del clima.</span> <span style="color: black;">Permite que obtengamos tu permiso de ubicación para proceder.</span>`;
        
      }
    );
  } else {
    alert("El objeto Geolocation no es soportado por este navegador.");
  } 
});

const getWeatherCurrentCity = (lat, lon) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const delays = [500, 1500, 2200];
        const actions = [
          () => {
            btn2.innerHTML = 'Cargando...';
          },
          () => {
            containerWeather.style.display = 'none';
            btn2.innerHTML = `Información recolectada de mi ubicación: ${data.name}`;
          },
          () => {
            infoGeneral.innerHTML = `
              <div class="info-weather2">
                Ciudad: ${data.name} 🗺️ <br>
                Temperatura: ${(data.main.temp - 273.15).toFixed(1)} °C 🌡️ <br>
                Descripción del clima: ${data.weather[0].description} 🌦️ <br>
                Humedad: ${data.main.humidity} % 🍃 <br>
                Presión: ${Math.round(data.main.pressure)} hPa ⏱️ <br>
                Nivel del mar: ${data.main.sea_level ? `${Math.round(data.main.sea_level)} m 🌊` : 'N/A'} <br>
                Visibilidad: ${Math.round(data.visibility / 1000)} km 🌫️ <br>
              </div>
            `;
          }
        ];

        actions.forEach((action, index) => {
          setTimeout(action, delays[index]);
        });
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos del clima:", error);
    });
};



// Get Data about coords
export const showPosition = (position) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  console.log("Lat:", lat, "Long:", long);
  getWeatherCurrentCity(lat, long);
};
