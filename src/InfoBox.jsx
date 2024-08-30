import "./InfoBox.css";
import { getLocalTime, chooseIcon, chooseBgImg } from "./helper";

export default function InfoBox({ info }) {
  let isDay = getLocalTime(info.hour);
  // console.log(isDay);
  const { icon, color } = chooseIcon(isDay, info.weather);
  const mainBgImg = chooseBgImg(isDay, info.weather);

  let iconStyle = {
    fontSize: "8rem",
    marginTop: "4rem",
    marginBottom: "4rem",
    textShadow: "0 0 5px black",
  };

  let bgImg = {
    backgroundImage: `url(${mainBgImg})`,
  };

  return (
    <>
      <div className="info-container" style={bgImg}>
        <span className="time-span">
          {info.hour}:{info.minute}
        </span>

        <h1>{info.city}</h1>

        <p>
          <i
            className={`fa-solid ${icon} fa-2xl weather-icon`}
            style={{
              ...iconStyle,
              color,
            }}
          ></i>
        </p>
        <p style={{ margin: "10px", textShadow: "0 0 2px white" }}>
          <b>
            {info.day} &nbsp;&nbsp;&nbsp;
            {info.date.toString().split("-").reverse().join("-")}
          </b>
        </p>

        <h2>{info.temp}&deg;C</h2>
        <p className="main-weather">{info.weather}</p>
        <div className="otherInfo-container">
          <div className="common-div">
            <p>
              Max <i className="fa-solid fa-temperature-high"></i> :{" "}
              {info.max_temp}
              &deg;C
            </p>
            <p>
              Min <i className="fa-solid fa-temperature-low"></i> :{" "}
              {info.min_temp}
              &deg;C
            </p>
          </div>
          <div className="common-div">
            <p>
              Humidity <i className="fa-solid fa-droplet"></i> : {info.humidity}
            </p>
            <p>
              Wind <i className="fa-solid fa-wind"></i> : {info.wind_speed}km/h
            </p>
          </div>
        </div>
        <p style={{ margin: "0" }}>
          The weather is described as <b>{info.description}</b> and feels like{" "}
          <b>{info.feels_like}&deg;C</b>
        </p>
      </div>
      <p style={{ margin: "5px 0 " }}>
        <span style={{ color: "red" }}>*</span>This information is might be
        inaccurate
      </p>
    </>
  );
}
