// import { useEffect } from "react";
import * as THREE from 'three';
import stars from './images/galaxy1.png';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useEffect, useRef ,useState} from 'react';
// import FontLoader from 'bmfont-text';
import fonts from '/planet_textures\\helvetiker_regular.typeface.json'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import  './css/style.css';
import  './css/styles.css';
import PlanetCanvas from './planetcanvas.jsx'

// import loadFont from 'load-bmfont';
// import { TextSprite } from 'three.textsprite'; 

function FetchUpi(){
const [error, setError] = useState(null); // Initialize error as null
var [coord,setCoord]=useState({latitude:0,longitude:0,planets:[],time:'',sun:[],moon:[]});
var [rot,setRot]=useState(0)

const objects=[]

// console.log(time, sun, moon)
const [planet_search,setPlanet]=useState('')

  
        useEffect(()=> {

            fetch('http://127.0.0.1:8000/nightsky') // Replace with your Django API endpoint
            .then((response) => {
            
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
               return response.json();
            })
            .then((data) =>  setCoord(
              {latitude:data.Latitude, longitude:data.Longitude , planets:data.PlanetData, time:data.Time,sun:data.Sun,moon:data.Moon
              })).catch((error) => console.error( error));
           

    }
    ,[1]);
const [findPlanet,setFindPlanet]=useState('')
function stopRotation(){
  if (rot!=0)
  {setRot(0)}
  else (setRot(0.001))
}
function inputHandler(event){
  if (event.target.name=='planets_finder'){
  setFindPlanet(prev => {return event.target.value})}
  else if (event.target.name=='Revert'){
    planets_finder.value="";
    setFindPlanet("")
  }
  
}
var { latitude, longitude, planets , time ,sun,moon} = coord;

    // console.log(planets);
    return (<>
      <div id='time' className='time'> Positions calculated at UTC time : {time}
      {/* <div><input type="radio"   style={{color:'black'}} placeholder="Search for a planet " id='planet' name='planet' onChange={inputHandler} value={findPlanet}/></div> */}<div>
      <label htmlFor="plantes_finder" style={{color:'white'}}>Search for  a planet </label>
      <select id="planets_finder" value={findPlanet} name="planets_finder"  onChange={inputHandler}style={{color:'black'}} >
      <option value={""} style={{color:'black'}}>None</option>

        <option value={0} style={{color:'black'}}>Mercury</option>
        <option value={1} style={{color:'black'}}>Venus</option>
        <option value={2} style={{color:'black'}}>Mars</option>
        <option value={3} style={{color:'black'}}>Jupiter</option>
        <option value={4} style={{color:'black'}}>Saturn</option>
        <option value={5} style={{color:'black'}}>Uranus</option>
        <option value={3} style={{color:'black'}}>Neptune</option>




      </select>
      </div>

      </div>
    <div><button type="button" id='rotation' className='rotation'onClick={stopRotation}>
      {rot===0 && <h1>Start Rotation</h1>}{rot!=0 && <h1>Stop Rotation</h1> }</button></div>
      {findPlanet!=="" && <div><button type="button" id='rotation' className='rotation' name="Revert" onClick={inputHandler}
      
      
      style={{top:45,height:30,alignItems:'center',left:250,fontSize:17}}>
     Back </button></div>
    }
      {/* <div><button type="button" id='rotation' className='rotation' name="Revert" onClick={inputHandler}
      
      
      style={{top:90,height:20,alignItems:'center',left:20}}>
     Back </button></div> */}
    
    <PlanetCanvas  Latitude={THREE.MathUtils.degToRad(latitude)}
    Longitude={THREE.MathUtils.degToRad(longitude) }
    Sun={sun}
    Moon_data={moon}
    elevation={0} 
    rotation={rot} 
    planetData={planets}
    find={findPlanet}/>
  
    
    </>
    );}
// ------------------------------------------------------------------------------



// -------------PLANET CANVAS --------------------------------


export default FetchUpi;
