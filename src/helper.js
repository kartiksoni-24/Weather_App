let handleSubmit = async (city, URL, API_KEY) => {
  try {
    let response = await fetch(
      `${URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    let jsonRes = await response.json();

    // console.log(jsonRes);
    let result = {
      city: city,
      temp: jsonRes.main.temp,
      min_temp: jsonRes.main.temp_min,
      max_temp: jsonRes.main.temp_max,
      humidity: jsonRes.main.humidity,
      feels_like: jsonRes.main.feels_like,
      description: jsonRes.weather[0].description,
      weather: jsonRes.weather[0].main,
      wind_speed: jsonRes.wind.speed,
      lat: jsonRes.coord.lat,
      lon: jsonRes.coord.lon,
    };
    // console.log(result);

    const apiUrl = `https://api.api-ninjas.com/v1/worldtime?lat=${result.lat}&lon=${result.lon}`;
    const TIME_API = import.meta.env.VITE_TIME_API_KEY;
    let time = await fetch(apiUrl, {
      headers: {
        "X-Api-Key": TIME_API,
      },
    });
    let jsonTime = await time.json();
    // console.log(jsonTime);
    const currTime = {
      hour: jsonTime.hour,
      minute: jsonTime.minute,
      day: jsonTime.day_of_week,
      date: jsonTime.date,
    };
    // console.log(currTime);

    let finalResult = {
      ...result,
      ...currTime,
    };
    // console.log(finalResult);

    return finalResult;
  } catch (err) {
    throw err;
  }
};

let getLocalTime = (hour) => {
  // let isDayTime = (hour < 6 || hour > 18) && true;
  let isDayTime;
  if (hour >= 6 && hour < 18) {
    isDayTime = true;
  } else {
    isDayTime = false;
  }
  // console.log(isDayTime);
  return isDayTime;
};

let chooseIcon = (isDay, weather) => {
  const weatherIconMap = {
    Rain: { icon: "fa-cloud-showers-heavy", color: "#848a94" },
    Drizzle: { icon: "fa-cloud-showers-heavy", color: "#848a94" },
    Clouds: { icon: "fa-cloud", color: "#8f8f8f" },
    Mist: { icon: "fa-cloud", color: "#8f8f8f" },
    Clear: {
      icon: isDay ? "fa-sun" : "fa-moon",
      color: isDay ? "#ffd43b" : "#fff",
    },
    Haze: {
      icon: isDay ? "fa-sun" : "fa-moon",
      color: isDay ? "#ffd43b" : "#fff",
    },
    Snow: { icon: "fa-snowflake", color: "#74c0fc" },
    Thunderstorm: { icon: "fa-cloud-bolt", color: "#8f8f8f" },
    Default: {
      icon: isDay ? "fa-sun" : "fa-moon",
      color: isDay ? "#ffd43b" : "#fff",
    }, // Fallback for unhandled weather conditions
  };

  const { icon, color } = weatherIconMap[weather] || weatherIconMap.Default;
  return { icon, color };
};

let chooseBgImg = (isDay, weather) => {
  const clearUrl =
    "https://www.shutterstock.com/image-vector/cartoon-flat-seamless-landscape-separated-600nw-342677867.jpg";

  const rainUrl =
    "https://png.pngtree.com/thumb_back/fh260/background/20221205/pngtree-clouds-with-rainfall-background-design-image_1485279.jpg";

  const cloudUrl =
    "https://cdn.pixabay.com/photo/2017/10/05/21/28/clouds-2821064_1280.png";

  const nightUrl =
    "https://img.freepik.com/premium-vector/clear-cloudy-weather-night-mobile-wallpaper_771942-2.jpg?w=360";

  const thunderUrl =
    "https://cdn.vectorstock.com/i/500p/56/72/seamless-pattern-with-thunderstorm-vector-26115672.jpg";

  // const mainBgImg =
  //   info.weather === "Rain" || info.weather === "Drizzle"
  //     ? rainUrl
  //     : info.weather === "Clouds" || info.weather === "Mist"
  //     ? cloudUrl
  //     : isDay && (info.weather === "Clear" || info.weather === "Haze")
  //     ? clearUrl
  //     : nightUrl;

  const weatherBgMap = {
    Rain: rainUrl,
    Drizzle: rainUrl,
    Clouds: cloudUrl,
    Mist: cloudUrl,
    Thunderstorm: thunderUrl,
    Clear: isDay ? clearUrl : nightUrl,
    Haze: isDay ? clearUrl : nightUrl,
    Default: isDay ? clearUrl : nightUrl, // Fallback for unhandled weather conditions
  };
  const mainBgImg = weatherBgMap[weather] || weatherBgMap.Default;
  return mainBgImg;
};

import axios from "axios";

const LOCATION_API_KEY = import.meta.env.VITE_LOCATION_API_KEY;
const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${LOCATION_API_KEY}`
            );
            const city = response.data.results[0].components.city;
            resolve(city);
          } catch (err) {
            reject("Unable to retrieve city name");
          }
        },
        (err) => {
          reject("Geolocation not supported or permission denied");
        }
      );
    } else {
      reject("Geolocation is not supported by this browser");
    }
  });
};

export { handleSubmit, getLocalTime, chooseIcon, chooseBgImg, getLocation };
