import React from "react";
import "../styles/app-styles.css";
import "../styles/fonts.css";
import Navbar from "./home/HomeComp/Navbar";

import HomePage from "./home/HomePage";
import "@fontsource/inria-sans";
import "@fontsource/inria-sans/300-italic.css";

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}
export default App;
