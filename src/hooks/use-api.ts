import { useState, useEffect } from "react";
import {
  openWeatherApiKey,
  openWeatherApiCallTypes,
  openWeatherApiInstance,
} from "./api/openWeatherApi";

interface IUseOpenweathermapProps {}

const mockData = {
  lon: 32,
  lat: 22,
};

const callType = openWeatherApiCallTypes.onecall;

export const useApi = (props?: IUseOpenweathermapProps) => {
  const [apiData, setApiData] = useState<{}>();

  useEffect(() => {
    openWeatherApiInstance
      .get(
        `${callType}?lat=${mockData.lat}&lon=${mockData.lon}&appid=${openWeatherApiKey}`
      )
      .then((response) => setApiData(response.data))
      .catch((e) => console.log(e));
  }, []);
  return {
    apiData,
  };
};
