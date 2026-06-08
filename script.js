let input = document.getElementById("cityinput");
let button = document.getElementById("searchbtn");
let result = document.getElementById("weatherreasult");

let apiKey = "0ef96c3e454bfb145e15e20836bfb5d2";

button.addEventListener("click", async function () {
  let city = input.value;

  if (city === "") {
    result.innerHTML = "<h3>Please enter city name</h3>";
    return;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.cod != 200) {
      result.innerHTML = `<h3>${data.message}</h3>`;
      return;
    }

    result.innerHTML = `
      <h2>${data.name}</h2>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>🤔 Feels Like: ${data.main.feels_like} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
      <p>☁ Condition: ${data.weather[0].main}</p>
    `;

  } catch (error) {
    result.innerHTML = "<h3>Network error</h3>";
    console.log(error);
  }
});