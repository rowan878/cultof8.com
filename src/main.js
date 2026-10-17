import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { time } from 'three/tsl';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';






const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias:true});
//renderer.setSize( window.innerWidth, window.innerHeight );
const app = document.querySelector('#app');

renderer.setSize(app.clientWidth, app.clientHeight)


// const controls = new OrbitControls( camera, renderer.domElement );
// // controls.update() must be called after any manual changes to the camera's transform
// camera.position.set( 0, 20, 100 );
// controls.update();
// function animate() {
// 	// required if controls.enableDamping or controls.autoRotate are set to true
// 	controls.update();
// 	renderer.render( scene, camera );
// }
camera.setFocalLength(180);
camera.updateProjectionMatrix();

//camera.aspect = app.clientWidth / app.clientHeight;
//camera.updateProjectionMatrix();



//document.body.appendChild( renderer.domElement );
document.querySelector('#app').appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { 
  color: 0x00ff00 ,
  side: THREE.DoubleSide
} );
// const cube = new THREE.Mesh( geometry, material );


// const loader = new GLTFLoader().setPath('public/macdonald/');

// const loader = new GLTFLoader();

// let prtv;

// loader.load('/protovisionrough.glb', (gltf) => {
//      prtv = gltf.scene;
//      prtv.scale.set(30,30,30);
//     prtv.position.set(0, 0, 0);
//     prtv.rotation.x = 1;
//     scene.add(prtv);

//     renderer.render(scene, camera);
// });

// loader.load('scene.gltf', (gltf) => {
//   const mesh = gltf.scene;
//   mesh.position.set(-15,0,0);
//   mesh.scale.set(40, 40, 40);
//   // mesh.rotation.y = ;
//   scene.add(mesh);
// });


// loader.load('scene.gltf', (gltf) => {
//   const mesh = gltf.scene;
//   mesh.position.set(0,0,0);
// })

// scene.add( cube );

const ambientLight = new THREE.AmbientLight("rgb(255,255,255)", 5);
scene.add(ambientLight);

// const spotLight= new THREE.SpotLight(0xffffff, 5, 100, 60, 0.5, 0.2);
// spotLight.position.set(0, 6, 0);
// scene.add(spotLight);

const fbxLoader = new FBXLoader();

let claudia;

fbxLoader.load('/claudia.fbx', (object) => {

// object.rotation.set(30,0,0.6);
claudia = object;
claudia.scale.set(0.01,0.01,0.01);
  scene.add(claudia);
}
);


scene.background = new THREE.Color("rgb(3,200,3)");

// camera.position.z = 7;
camera.position.set( 2, -0.5, 30);

function animate(time) {
  requestAnimationFrame(animate);

  if (claudia) {
    claudia.rotation.z = time / 4000;
  }

  renderer.render(scene, camera);
}

requestAnimationFrame(animate);