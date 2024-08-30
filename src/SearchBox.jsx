import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useEffect, useState } from "react";
import { handleSubmit, getLocation } from "./helper";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function SearchBox({ updateData }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const URL = import.meta.env.VITE_WEATHER_URL;

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleBtn = async (evt) => {
    setIsLoading(true);
    try {
      evt.preventDefault();
      setCity("");
      let finalResult = await handleSubmit(city, URL, API_KEY);
      let fullData = { ...finalResult, hour: Number(finalResult.hour) };
      // console.log(fullData);
      updateData(fullData);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(false);
  }, [city]);

  const fetchCityName = async () => {
    setIsLoading(true);
    try {
      const city = await getLocation();
      // console.log("City Name:", city);
      let finalResult = await handleSubmit(city, URL, API_KEY);
      let fullData = { ...finalResult, hour: Number(finalResult.hour) };
      // console.log(fullData);
      updateData(fullData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   async () => {
  //     setIsLoading(true);
  //     try {
  //       const city = await getLocation();
  //       // console.log("City Name:", city);
  //       let finalResult = await handleSubmit(city, URL, API_KEY);
  //       let fullData = { ...finalResult, hour: Number(finalResult.hour) };
  //       // console.log(fullData);
  //       updateData(fullData);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  // }, []);

  return (
    <>
      <div className="formContainer">
        <form action="#">
          <div className="form-div">
            <TextField
              id="filled-basic"
              className="searchBox"
              label="City Name"
              variant="filled"
              size="small"
              value={city}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              type="submit"
              className="searchBtn"
              endIcon={<SearchIcon />}
              onClick={handleBtn}
            >
              Search
            </Button>
          </div>

          <div className="orLineMain">
            <div className="orLineCommon"></div>
            <div>OR</div>
            <div className="orLineCommon"></div>
          </div>

          <div className="locationBtn">
            <Button
              variant="contained"
              endIcon={<LocationOnIcon />}
              onClick={fetchCityName}
            >
              Search by Location
            </Button>
          </div>
        </form>
      </div>
      {error && (
        <p
          style={{
            marginBottom: "0",
            color: "red",
          }}
        >
          No such place exist in our database!
        </p>
      )}
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader">
            <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
          </div>
        </div>
      )}
    </>
  );
}
