import React, { useEffect, useRef } from 'react';
import Navbar from "./navbar.jsx";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Moon from './images/moonmap4k.jpg';
import MoonBump from './images/moonbump4k.jpg';
import stars from './images/galaxy1.png';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const ThreeCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();

    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const moontext = new THREE.TextureLoader().load(Moon);
    const moonBump = new THREE.TextureLoader().load(MoonBump);
    const moonMaterial = new THREE.MeshPhongMaterial({roughness: 5, metalness: 0, map: moontext, bumpMap: moonBump, bumpScale: 0.02 });
    const mesh = new THREE.Mesh(geometry, moonMaterial);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    scene.add(camera);
    camera.position.z = 10;

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 0);
    light.castShadow = true;
    light.shadowCameraVisible = true;
    scene.add(light);
    // const light2 = new THREE.PointLight(0xffffff, 1, 100);
    // light2.position.set(20, 3, 5);
    // light2.castShadow = true;
    // light2.shadowCameraVisible = true;
    // scene.add(light2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // color, intensity (0 to 1)
    directionalLight.position.set(10, 10, 0); // Set the position of the light
    directionalLight.castShadow = true; // Enable shadow casting for the light
    scene.add(directionalLight);


    const starGeometry = new THREE.SphereGeometry(20, 64, 64);
    const starmap = new THREE.TextureLoader().load(stars);
    const starMaterial = new THREE.MeshBasicMaterial({ map: starmap, side: THREE.BackSide, transparent: true });
    const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    // starMesh.layers.set(1);
    scene.add(starMesh);

    const size = { width: window.innerWidth, height: window.innerHeight };
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(size.width, size.height);
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // color, intensity (0 to 1)
    // scene.add(ambientLight);

    window.addEventListener('resize', () => {
      size.height = window.innerHeight;
      size.width = window.innerWidth;
      camera.aspect = size.width / size.height;
      renderer.setSize(size.width, size.height);
      starMesh.rotation.x= 0.002;
      mesh.rotation.x= 0.002;
      camera.updateProjectionMatrix();
    });
    // const overlayElement = document.getElementById('root2');
    // overlayElement.innerText = 'Hello, DOM Overlay!';
    // overlayElement.style.position = 'absolute';
    // overlayElement.style.top = '200px';
    // overlayElement.style.left = '200px';
    // overlayElement.style.color = 'white';
    // overlayElement.style.fontSize = '24px';
    // document.body.appendChild(overlayElement);

    const loop = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    };
    loop();
  }, []);

  return(<> <canvas ref={canvasRef} className="webgl" />   </>);
};

export default ThreeCanvas;
