import axios from "axios";

export enum openWeatherApiCallTypes {
  forecast = "forecast",
  onecall = "onecall",
}

const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
const baseUrl = process.env.REACT_APP_OPENWEATHER_API_URL;

export const openWeatherApiInstance = axios.create({
  baseURL: `${baseUrl}${openWeatherApiCallTypes.onecall}?appid=${apiKey}&exclude=hourly,minutely`,
  responseType: "json",
});
