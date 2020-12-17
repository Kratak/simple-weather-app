import { useState, useEffect } from "react";
import { openWeatherApiInstance } from "./api/openWeatherApi";
import { openCageApiInstance } from "./api/openCageApi";

interface IUseOpenweathermapProps {}

interface IGeoCoordinates {
  lng: number;
  lat: number;
}

enum UnitsTypes {
  metric = "metric",
  imperial = "imperial",
}

export const useApi = (props?: IUseOpenweathermapProps) => {
  const [apiData, setApiData] = useState<{}>();
  const [geoCoordinates, setGeoCoordinates] = useState<IGeoCoordinates>();
  const [city, setCity] = useState<string>();
  const [unit, setUnit] = useState<UnitsTypes>(UnitsTypes.metric);
  const [language, setLanguage] = useState<string>("pl");

  const handleCityChange = (value: string) => setCity(value);
  const handleUnitChange = (value: UnitsTypes) => setUnit(value);
  const handleLanguageChange = (value: string) => setLanguage(value);

  useEffect(() => {
    if (!geoCoordinates) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          setGeoCoordinates({ lat: latitude, lng: longitude })
      );
    }
  }, []);

  useEffect(() => {
    if (geoCoordinates && language && unit) {
      openWeatherApiInstance
        .get(
          `&lat=${geoCoordinates.lat}&lon=${geoCoordinates.lng}&lang=${language}&units=${unit}`
        )
        .then((response) => setApiData(response.data))
        .catch((e) => console.log(e));
    }
  }, [geoCoordinates, language, unit]);

  useEffect(() => {
    if (city && language) {
      openCageApiInstance
        .get(`&q=${city}&language=${language}`)
        .then((response) =>
          setGeoCoordinates(response.data.results[0].geometry)
        )
        .catch((e) => console.log(e));
    }
  }, [city, language]);

  return {
    apiData,
    handleCityChange,
    handleUnitChange,
    handleLanguageChange,
  };
};
