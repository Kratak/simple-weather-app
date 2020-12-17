import { useState, useEffect } from "react";
import { openWeatherApiInstance } from "./api/openWeatherApi";
import { openCageApiInstance } from "./api/openCageApi";

interface IUseOpenweathermapProps {}

interface IGeoCoordinates {
  lng: number;
  lat: number;
}

const mockData2 = {
  city: "Warszawa",
  lang: "pl",
  units: "metric",
};

export const useApi = (props?: IUseOpenweathermapProps) => {
  const [apiData, setApiData] = useState<{}>();
  const [geoCoordinates, setGeoCoordinates] = useState<IGeoCoordinates>();

  useEffect(() => {
    if (geoCoordinates) {
      openWeatherApiInstance
        .get(
          `&lat=${geoCoordinates.lat}&lon=${geoCoordinates.lng}&lang=${mockData2.lang}&units=${mockData2.units}`
        )
        .then((response) => setApiData(response.data))
        .catch((e) => console.log(e));
    }
  }, [geoCoordinates]);

  useEffect(() => {
    openCageApiInstance
      .get(`&q=${mockData2.city}&language=${mockData2.lang}`)
      .then((response) => setGeoCoordinates(response.data.results[0].geometry))
      .catch((e) => console.log(e));
  }, []);
  return {
    apiData,
  };
};
