function renderWeather(data) {
  const forecast = data.forecast.forecastday;
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  forecast.forEach((dayData, i) => {
    let card;
    if (i === 0) {
      card = document.querySelector('.weather-card2.main');
    } else {
      card = document.querySelectorAll('.weather-card2.text-center')[i-1];
    }
    if (!card) return;
    const dateObj = new Date(dayData.date);
    const dayName = days[dateObj.getDay()];
    const dayNameElem = card.querySelector('.day-name');
    if (dayNameElem) dayNameElem.textContent = dayName;
    if (i === 0) {
      const dateStrElem = card.querySelector('.date-str');
      if (dateStrElem) dateStrElem.textContent = dayData.date;
    }
    const locElem = card.querySelector('.location-name');
    if (locElem) locElem.textContent = data.location.name;
    const tempElem = card.querySelector('.temp');
    if (tempElem) tempElem.innerHTML = `${dayData.day.avgtemp_c}<sup>°C</sup>`;
    const iconElem = card.querySelector('.weather-icon');
    if (iconElem) {
      iconElem.src = "https:" + dayData.day.condition.icon;
      iconElem.alt = dayData.day.condition.text;
    }
    const descElem = card.querySelector('.weather-desc');
    if (descElem) descElem.textContent = dayData.day.condition.text;
    if (i === 0) {
      const details = card.querySelector('.weather-details');
      if (details) {
        const spans = details.querySelectorAll('span');
        if (spans[0]) spans[0].innerHTML = `<i class="fas fa-tint"></i> ${dayData.day.avghumidity}%`;
        if (spans[1]) spans[1].innerHTML = `<i class="fas fa-wind"></i> ${dayData.day.maxwind_kph}km/h`;
        if (spans[2]) spans[2].innerHTML = `<i class="fas fa-location-arrow"></i> ${data.current.wind_dir}`;
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', function() {
  const city = "Cairo";
  document.getElementById('cityInput').value = city;
  fetch(`http://api.weatherapi.com/v1/forecast.json?key=f2ff7b86934840f9a1d172904250107&q=${encodeURIComponent(city)}&days=3`)
    .then(res => res.json())
    .then(data => {
      renderWeather(data);
    });
});

let debounceTimer;
document.getElementById('cityInput').addEventListener('input', function(e) {
  const city = e.target.value.trim();
  clearTimeout(debounceTimer);
  if (!city) return;
  debounceTimer = setTimeout(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=f2ff7b86934840f9a1d172904250107&q=${encodeURIComponent(city)}&days=3`)
      .then(res => res.json())
      .then(data => {
        renderWeather(data);
        localStorage.setItem('weatherData', JSON.stringify(data));
      })
      .catch(() => {});
  }, 600);
});

document.getElementById('weatherForm').addEventListener('submit', function(e) {
  e.preventDefault();
});