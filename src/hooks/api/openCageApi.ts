import axios from "axios";

const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY;
const baseUrl = process.env.REACT_APP_OPENCAGE_API_URL;

export const openCageApiInstance = axios.create({
  baseURL: `${baseUrl}json?key=${apiKey}&pretty=1`,
  responseType: "json",
});
