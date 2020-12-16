import React from "react";
import { useOpenweathermap } from "./hooks/use-openweathermap-api-hook";

const App = () => {
  const { apiData } = useOpenweathermap();

  console.log(apiData);
  return <div>Test</div>;
};

export default App;
