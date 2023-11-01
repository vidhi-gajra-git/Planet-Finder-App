import React from 'react';

import ReactDOM from 'react-dom';
import "./css/styles.css";
// import { Canvas } from "@react-three/fiber";
import ThreeCanvas from "./App.jsx";
import Navbar from "./navbar.jsx";
 
function App() {
  return (
    <>
     <Navbar/>

      <ThreeCanvas/>
    </>
  );
}
 
ReactDOM.render(<App/>,document.getElementById("root"))