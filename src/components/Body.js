import { useEffect, useState } from "react";
import { API_Key } from "../utils/constants";
import Shimmer from "./Shimmer";
const Body = ({ searchQuery }) => {
  const [WeatherData, setWeatherData] = useState({
    name: "Bengaluru",
    country: "India",
    temp_c: "25",
    temp_f: "76",
    feelslike_c: "25.4",
    feelslike_f: "77.8",
    condition_text: "Windy",
  });

  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTempreatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const renderTemperature = () => {
    if (WeatherData.temp_c === "" && WeatherData.temp_f === "") {
      return <Shimmer />;
    } else {
      return (
        <div onClick={toggleTempreatureUnit}>
          {isCelsius ? (
            <>
              <span id="temp_main">{WeatherData.temp_c}°C</span>
              <br />
              <span>(Click to change to Fahrenheit)</span>
              <br />
              <span id="temp">Feels Like </span>
              <span id="temp_main">{WeatherData.feelslike_c}°C</span>
            </>
          ) : (
            <>
              <span id="temp_main">{WeatherData.temp_f}℉</span>
              <br />
              <span>(Click to change to Celsius)</span>
              <br />
              <span id="temp">Feels Like </span>
              <span id="temp_main">{WeatherData.feelslike_f}℉</span>
            </>
          )}
        </div>
      );
    }
  };

  useEffect(() => {
    let delayTimer;

    if (searchQuery) {
      setIsLoading(true);
      delayTimer = setTimeout(() => {
        fetchdata(searchQuery);
      }, 1000);
    }
    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  const fetchdata = async (searchQuery) => {
    try {
      const data = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=" +
          API_Key +
          "&q=" +
          searchQuery +
          "&days=7&aqi=no&alerts=no"
      );

      const json = await data.json();

      setWeatherData({
        name: json.location.name,
        country: json.location.country,
        temp_c: json.current.temp_c,
        temp_f: json.current.temp_f,
        feelslike_c: json.current.feelslike_c,
        feelslike_f: json.current.feelslike_f,
        condition_text: json.current.condition.text,
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="weather-data">
      <span id="location">{WeatherData.name}</span>
      <span id="location">{WeatherData.country}</span>
      {isLoading ? <Shimmer /> : renderTemperature()}
      <span id="conditiontext">"{WeatherData.condition_text}"</span>
    </div>
  );
};

export default Body;
