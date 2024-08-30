export default function Test() {
  const apiKey = "0f16332de27a00a0b58b029e84c85b76";
  // const apiKey = "your_openweathermap_api_key";
  const cityName = "London";

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // You can now access and display the forecast data
    })
    .catch((error) => console.error("Error fetching weather data:", error));
  return <div></div>;
}
