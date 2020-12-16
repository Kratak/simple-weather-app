import axios from "axios";

export const openWeatherApiInstance = axios.create({
  baseURL: process.env.REACT_APP_OPENWEATHER_API_URL,
  responseType: "json",
});

export enum openWeatherApiCallTypes {
  forecast = "forecast",
  onecall = "onecall",
}

export const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
