import React from "react";
import { useApi } from "./hooks/use-api";

const App = () => {
  const { apiData } = useApi();

  console.log(apiData);
  return <div>Test</div>;
};

export default App;
