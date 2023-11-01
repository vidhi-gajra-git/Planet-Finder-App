import * as THREE from 'three';
import stars from './images/galaxy1.png';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useEffect, useRef, useState } from 'react';
import './css/style.css';
import './css/styles.css';
import Moon from './images/moonmap4k.jpg';
import MoonBump from './images/moonbump4k.jpg';
// import fonts from '/planet_textures\\helvetiker_regular.typeface.json';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


const PlanetCanvas = (props) => {
    const canvasRef=useRef();
    
    
  const color_blue= 0xa6a6a6;
  const color_red= 0xe84d4d;
  const color_yellow=0xffff00;
    function addLabel( text, obj, x, y, z , cameraPosition,size,color)
				{

					var loader = new FontLoader();
					var material_text = new THREE.MeshBasicMaterial( { color: color} );
					
          // const scale = new THREE.Vector3(-1, 1, 1);

					loader.load( '/planet_textures/helvetiker_regular.typeface.json', function ( font ) {

						var geometry = new TextGeometry( text, {
							font: font,
							size: size,
							height: 2,
							curveSegments: 10,
							bevelEnabled: false,
              
						} );

						var textMesh = new THREE.Mesh( geometry, material_text );
            const scale = new THREE.Vector3(-1, 1, 1);
            cameraPosition.multiply(scale);
						textMesh.position.set( x, y, z );
            textMesh.lookAt(cameraPosition);

            // textMesh.scale.multiply(scale);

						// textMesh.rotation.y = Math.PI/-2;

						textMesh.name = text;

						obj.add( textMesh );
					} );

				}
    useEffect(()=>{
      let alertShown = false;

      const scale=10

        const Planets={'mercury': 0.38, 'venus': .95, 'mars': .53,'jupiter':11.19,'saturn':9.40,'uranus':4.04,'neptune':3.88}
        const scene = new THREE.Scene();
     
        var current=0
       
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(20, 10, 0);
        light.castShadow = true;
        light.shadowCameraVisible = true;
        scene.add(light);
        // Create a scene


// Create an ambient light with a color and intensity
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Color: white, Intensity: 0.5
// Add the ambient light to the scene
// scene.add(ambientLight); 

        
          const camera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,         
            0.01,
            100000
          );
          const cameraDistance = 75 ;
          // const fov = (180 * (2 * Math.atan(radius / cameraDistance))) / Math.PI;
  //   directions
  var direction_N_geom;
  // const fontLoader = new FontLoader();
  
  
    
    // Create a camera

  //   const cameraPosition = new THREE.Vector3(
  //    cameraDistance * Math.cos(props.Longitude) * Math.cos(props.Latitude),
  //     cameraDistance * Math.sin(props.Latitude),

  //   );
  //   // const lookAtPoint = new THREE.Vector3(10, 100, 10);
     
  // camera.position.copy(cameraPosition)
  scene.add(camera);

  camera.position.z = -0.1;
     // Add the camera to the scene
    // if (cameraPosition.y < 0) {
    //   // Reset the camera's position to be just above the ground
    //   camera.position.copy(groundPosition.clone().add(new THREE.Vector3(0, 1, 0)));
    // }
    // const overlay = document.getElementById('overlay');
    const overlayElement = document.createElement('div');
    
        
        const starGeometry = new THREE.SphereGeometry(10000, 64, 64);
        const starmap = new THREE.TextureLoader().load(stars);
        const starMaterial = new THREE.MeshBasicMaterial({ map: starmap, side: THREE.BackSide, transparent: true });
        const starMesh = new THREE.Mesh(starGeometry, starMaterial);
       
        scene.add(starMesh);
        //HORIZON
        ///PLanets
        const planetGroup = new THREE.Group();
planetGroup.add(ambientLight);

        const objects=[];
        var control_element=camera;

        const labelElement = document.createElement('div');
        document.body.appendChild(labelElement);

        labelElement.className = 'label';

        // adding rotation
        const cur_rot_rad=(90 - props.Latitude) / 180 * Math.PI
        var rot_speed = props.rotation;
        
        var unit_i = new THREE.Vector3(1, 0, 0);
        var unit_j = new THREE.Vector3(0, 1, 0);
        var unit_k = new THREE.Vector3(0, 0, 1);
        var axis_polar = unit_j.clone();
        axis_polar.applyAxisAngle(unit_i, cur_rot_rad);
        var look_vector;
        Object.keys(Planets).forEach(k => {
          const geometry = new THREE.SphereGeometry(Planets[k], 64, 64);
          const planettext = new THREE.TextureLoader().load('/planet_textures/2k_'+k+'.jpg');
          // const moonBump = new THREE.TextureLoader().load(MoonBump);
          const planetMaterial = new THREE.MeshPhongMaterial({roughness: 0, metalness: 0, map: planettext });
          const mesh = new THREE.Mesh(geometry, planetMaterial);
          if (props.planetData[current]!=undefined)
          
          // {  console.log(planetData[current])
          {
            const azimuth = props.planetData[current].x;
            const altitude = props.planetData[current].y;
            
            // Calculate the position of the planet relative to the camera
            const x = cameraDistance * Math.cos(altitude) * Math.sin(azimuth);
            const y = cameraDistance * Math.sin(altitude);
            const z = cameraDistance * Math.cos(altitude) * Math.cos(azimuth);
            // console.log(k,x*scale, y*scale,z*scale)
            mesh.position.set(x*scale, y*scale,z*scale);
            objects.push([mesh,k]);
            addLabel(k,mesh,x*scale*2,y*scale*2,z*scale*2,camera.position,50,color_yellow);
           
           

           
          
            const light = new THREE.PointLight(0xffffff, 5, 100);

          light.position.set(props.planetData[current].x+Planets[k]*1, props.planetData[current].y+Planets[k]*15, 0);
          planetGroup.add(light);
        }
        
          // light.castShadow = true;
          // light.shadowCameraVisible = true;
          // meshes.append(mesh)
          planetGroup.add(mesh);

          if (props.find!=="") {

            if (props.planetData[props.find] !== undefined) {
            console.log(props.planetData[props.find]);
            const azimuth = props.planetData[props.find].x;
            const altitude = props.planetData[props.find].y;
            console.log(props.planetData[props.find]);
            // // console.log(props.find);
    
           const x = cameraDistance * Math.cos(altitude) * Math.sin(azimuth);
           const  y = cameraDistance * Math.sin(altitude);
           const  z = cameraDistance * Math.cos(altitude) * Math.cos(azimuth);
            // camera.position.copy( mesh.position )
          
            // camera.rotation.z= z*10;
            if (y>0)
          {  
          

              look_vector =new THREE.Vector3(x,y,z);
            camera.lookAt(look_vector);
            control_element=planetGroup;
            camera.updateMatrixWorld();
           }
           else  if (y<0 && !alertShown ){
            alert("Planet is below the horizon!");
            alertShown=true;
            // props.find="";
            // overlayElement.style.visibility="visible";
            // overlayElement.innerText = 'The Planet is below the Horizon';
            // overlayElement.style.position = 'absolute';
            // overlayElement.style.top = '50%';
            // overlayElement.style.left = '50%';
            // overlayElement.style.transform = 'translate(-50%, -50%)';
            // overlayElement.style.backgroundColor = 'black';
            // overlayElement.style.padding = '20px';
            // overlayElement.style.borderRadius = '10px';
            // overlayElement.style.fontFamily = 'Arial';
            // overlayElement.style.fontSize = '18px';
            // overlayElement.style.color = 'white';
            // // overlay.appendChild(overlayElement);

            // // Add the overlay container to the document body
            // document.body.appendChild(overlayElement)
            ;}
           }
            
            
            }
            current=current+1;
    
    
          }
         


      );
      var c=0
      const geometry = new THREE.SphereGeometry(10, 64, 64);
      const moontext = new THREE.TextureLoader().load(Moon);
      const moonBump = new THREE.TextureLoader().load(MoonBump);
      const moonMaterial = new THREE.MeshPhongMaterial({roughness: 5, metalness: 0, map: moontext, bumpMap: moonBump, bumpScale: 0.02 });
      const moon_mesh = new THREE.Mesh(geometry, moonMaterial);
      moon_mesh.receiveShadow = true;
      moon_mesh.castShadow = true;
      const azimuth = props.Moon_data.x;
      const altitude =  props.Moon_data.y;
      const x = cameraDistance * Math.cos(altitude) * Math.sin(azimuth);
      const y = cameraDistance * Math.sin(altitude);
      const z = cameraDistance * Math.cos(altitude) * Math.cos(azimuth);
      moon_mesh.position.set(x*scale,y*scale, z*scale)
      planetGroup.add(moon_mesh);
      addLabel('moon',moon_mesh,moon_mesh.position.x,moon_mesh.position.y,moon_mesh.position.z,camera.position,1,color_yellow)
      scene.add(planetGroup);
      
        ////////////////////////////////
        const group = new THREE.Group();

        // Add the ground to the group
        var geom = new THREE.CylinderGeometry( 150, 150, 0.5, 8 );
        
        var grass_texture =new THREE.TextureLoader().load("/planet_textures/grass_textures_seamless_36.jpg");
        grass_texture.wrapS = THREE.RepeatWrapping;
        grass_texture.wrapT = THREE.RepeatWrapping;
        grass_texture.repeat.set( 8, 8 );
        var mat = new THREE.MeshPhongMaterial({ map: grass_texture });

        const ground_circle = new THREE.Mesh(geom, mat);
        ground_circle.position.y = -1;
    
      // ground_group = new THREE.Group();
        group.add(ground_circle);
        // group.add(ground_circle);
        var direction_N_Material=new THREE.MeshBasicMaterial( { color: 0x3d5ccc } );
        const font_loader = new FontLoader();
        // var direction_N_geom;
     
       

        
  var direction_N = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 11), new THREE.MeshStandardMaterial({color: 0xe84d4d }));
  var direction_E = new THREE.Mesh(new THREE.BoxGeometry(11, 0.03, 0.03), new THREE.MeshStandardMaterial({color: 0xa6a6a6 }));
  var direction_S = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 11), new THREE.MeshStandardMaterial({color: 0x3d5ccc }));
  var direction_W = new THREE.Mesh(new THREE.BoxGeometry(11, 0.03, 0.03), new THREE.MeshStandardMaterial({color: 0xa6a6a6 }));
 
  direction_N.position.z = 6;
  direction_E.position.x = -6;
  direction_S.position.z = -6;
  direction_W.position.x =6;
  
  direction_N.position.y = -0.5;
  direction_E.position.y = -0.5;
  direction_S.position.y = -0.5;
  direction_W.position.y = -0.5;
  group.add(direction_N);
  group.add(direction_E);
  group.add(direction_S);
  group.add(direction_W);
  var look= new THREE.Vector3(0,0,0);
  addLabel('N',direction_N,0,0,6,look,.5,color_blue);
  addLabel('S',direction_S,0,0,-6,look,.5,color_red);
  addLabel('E',direction_E,-6,0,0,look,.5,color_red);
  addLabel('W',direction_W,6,0,0,look,.5,color_red);
  // addLabel('N',direction_N,0,0,6,camera.position,.5,color_blue);

  
  scene.add(group);

        ////////////////////////////////////////////////////////////////
        const size = { width: window.innerWidth, height: window.innerHeight };
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(size.width, size.height);
        const controls = new OrbitControls(control_element, renderer.domElement);
        //disable zooming and panning (can only look in different directions)
        controls.enablePan = false;
        controls.enableZoom = false;
        window.addEventListener('resize', () => {
        size.height = window.innerHeight;
        size.width = window.innerWidth;
        camera.aspect = size.width / size.height;
        renderer.setSize(size.width, size.height);
        // starMesh.rotation.x= 0.002;
        // mesh.rotation.x= 0.002;
        // camera.updateProjectionMatrix();
      });
        const loop = () => {
            // controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(loop);
            planetGroup.rotateOnWorldAxis(axis_polar, -rot_speed);

          };
          loop();

        }, [props.Latitude, props.Longitude, props.planetData,props.rotation,props.find])
  return(<> <canvas ref={canvasRef} className="webgl" />   </>);

       
}
export default PlanetCanvas

// export default PlanetCanvas;
