import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Heading from "./components/Layout/Homepage/Heading/Heading";
import RouterManager from "./components/RouterManager/RouterManager";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Heading />
        <RouterManager />
      </React.Fragment>
    </Router>
  );
}

export default App;
