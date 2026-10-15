import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { time } from 'three/tsl';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { 
  color: 0x00ff00 ,
  side: THREE.DoubleSide
} );
const cube = new THREE.Mesh( geometry, material );


const loader = new GLTFLoader().setPath('public/macdonald/');

loader.load('scene.gltf', (gltf) => {
  const mesh = gltf.scene;
  mesh.position.set(-15,0,0);
  mesh.scale.set(40, 40, 40);
  // mesh.rotation.y = ;
  scene.add(mesh);
});


scene.add( cube );

const spotLight= new THREE.SpotLight(0xffffff, 20, 100, 60, 0.5, 0.2);
spotLight.position.set(2, 10, 2);
scene.add(spotLight);


scene.background = new THREE.Color(0xffffff);

// camera.position.z = 7;
camera.position.set( 5, 3, 11);

function animate( time ) {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.y = time / 2000;
}

animate();