// Import Three.js and required modules
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { ARButton } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/webxr/ARButton.js";

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;  // Enable WebXR
document.getElementById("container3D").appendChild(renderer.domElement);

// Add AR button to the webpage
document.body.appendChild(ARButton.createButton(renderer));

// Load the 3D model
const loader = new GLTFLoader();
loader.load("Assets/Models/panel500.glb", (gltf) => {
  scene.add(gltf.scene);
}, undefined, console.error);

// Add lights
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);
scene.add(new THREE.AmbientLight(0x333333, 2));

// Set camera position
camera.position.z = 200;

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Update animate function for AR rendering
function animate() {
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}
animate();

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
