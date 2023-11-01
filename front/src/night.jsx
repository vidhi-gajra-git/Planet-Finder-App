import React from 'react';
import ReactDOM from 'react-dom';
import {useEffect, useState } from 'react';
import "./css/styles.css";
import FetchUpi from "./planets.jsx";
// import Navbar from "./navbar.jsx";

// import axios from 'axios';
// function FetchUpi(){
//     const [coord,setCoord]=useState({latitude:0,longitude:0})
//     const [error, setError] = useState(null); // Initialize error as null
  
//         useEffect(()=> {

//             fetch('http://127.0.0.1:8000/nightsky') // Replace with your Django API endpoint
//             .then((response) => {
            
//               if (!response.ok) {
//                 throw new Error('Network response was not ok');
//               }
//                return response.json();
//             })
//             .then((data) =>  setCoord(prevcord => {return {latitude:data.Latitude, longitude:data.Longitude}})).catch((error) => console.error( error));
           

//     }
//     ,[])
//     return(
     
//         <div>
//           {coord.latitude !== 0 && coord.longitude !== 0 ? ( // Check if the coordinates are fetched
//             <div>
//               Your coords are    
//               <div>
//                 <h2>Latitude: {coord.latitude}</h2>
//                 <p>Longitude: {coord.longitude}</p>
//               </div>
//             </div>
//             ) : (
//               <p>Loading...</p> // Show a loading message until the coordinates are fetched
//           )}
//         </div>
//     );
    
   
// }
function SceneLoader(){
  return(<>

<FetchUpi/>


  </>
  )
}
ReactDOM.render(<SceneLoader/>,document.getElementById('Night'));