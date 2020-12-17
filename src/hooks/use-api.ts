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

enum LocalStorageKeys {
  language = "language",
  unit = "unit",
  city = "city",
}

const initialCityName = localStorage.getItem(LocalStorageKeys.city);
const initialLanguage = localStorage.getItem(LocalStorageKeys.language);
const initialUnit = localStorage.getItem(LocalStorageKeys.unit) as UnitsTypes;

export const useApi = (props?: IUseOpenweathermapProps) => {
  const [apiData, setApiData] = useState<{}>();
  const [geoCoordinates, setGeoCoordinates] = useState<IGeoCoordinates>();
  const [city, setCity] = useState<string | null>(initialCityName);
  const [unit, setUnit] = useState<UnitsTypes>(
    initialUnit || UnitsTypes.metric
  );
  const [language, setLanguage] = useState<string>(initialLanguage || "pl");

  const handleCityChange = (value: string) => {
    setCity(value);
    localStorage.setItem(LocalStorageKeys.city, value);
  };
  const handleUnitChange = (value: UnitsTypes) => {
    setUnit(value);
    localStorage.setItem(LocalStorageKeys.unit, value);
  };
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem(LocalStorageKeys.language, value);
  };

  useEffect(() => {
    if (!geoCoordinates && !initialCityName) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setGeoCoordinates({ lat: latitude, lng: longitude });
        }
      );
    }
  }, [geoCoordinates]);

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
