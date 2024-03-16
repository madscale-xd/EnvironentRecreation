//import statements
import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js'; 
import { GLTFLoader } from './GLTFLoader.js';

//Scene, camera, renderer, texture, orbitControls setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 8000 ); //fullscreen
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight ); ///fullscreen
document.body.appendChild( renderer.domElement );   
const textureLoader = new THREE.TextureLoader();
const glLoader = new GLTFLoader();
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0.1,20, 0.1);
camera.lookAt(0, 0, 0);

//skybox setup
const skyGeom = new THREE.SphereGeometry(5000, 32, 32);
skyGeom.scale(-1, 1, 1);
const skyMat = new THREE.MeshBasicMaterial({color:0xF39BA3});
const skybox = new THREE.Mesh(skyGeom, skyMat);
scene.add(skybox);

const sky2Geom = new THREE.SphereGeometry(3200, 32, 32);
sky2Geom.scale(-1, 1, 1); // Ensure the geometry is properly oriented
const sky2Tex = textureLoader.load('./assets/textures/fog.png'); // Replace 'path_to_your_texture.jpg' with the actual path to your texture file
const sky2Mat = new THREE.MeshBasicMaterial({ map: sky2Tex, transparent: true, side: THREE.DoubleSide, opacity: 0.8, color:0x2b2940 }); // Use the texture as the material map
sky2Tex.repeat.set(5,5); 
sky2Tex.wrapS = THREE.RepeatWrapping;
sky2Tex.wrapT = THREE.RepeatWrapping;
const sky2box = new THREE.Mesh(sky2Geom, sky2Mat);
scene.add(sky2box);

const sky3Geom = new THREE.SphereGeometry(4200, 32, 32);
sky3Geom.scale(-1, 1, 1); // Ensure the geometry is properly oriented
const sky3Mat = new THREE.MeshBasicMaterial({ map: sky2Tex, transparent: true, side: THREE.DoubleSide, opacity: 0.6, color:0x3f3347 }); // Use the texture as the material map
const sky3box = new THREE.Mesh(sky3Geom, sky3Mat);
scene.add(sky3box);

//floor setup
const floorGeom = new THREE.PlaneGeometry( 2400, 2400 ); 
const floorTex = textureLoader.load('./assets/textures/lavafloor.jpg');
const floorMat = new THREE.MeshLambertMaterial( { map: floorTex, side: THREE.DoubleSide} ); 
floorMat.color.multiply(new THREE.Color(0.1, 0.1, 0.1));
floorTex.repeat.set(10,12); 
floorTex.wrapS = THREE.RepeatWrapping;
floorTex.wrapT = THREE.RepeatWrapping;
const floor = new THREE.Mesh( floorGeom, floorMat ); 
scene.add( floor );

const arenaGeom = new THREE.TorusGeometry(1200, 200, 7, 100);
const arenaTex = textureLoader.load('./assets/textures/arena.jpg');
const arenaMat = new THREE.MeshLambertMaterial( { map: arenaTex, side: THREE.DoubleSide} ); 
arenaMat.color.multiply(new THREE.Color(0.1, 0.1, 0.1));
arenaTex.repeat.set(14,1); 
arenaTex.wrapS = THREE.RepeatWrapping;
arenaTex.wrapT = THREE.RepeatWrapping;
const arena = new THREE.Mesh(arenaGeom,arenaMat);
floor.add(arena);

//wall and fog wall setup
const wallGeom = new THREE.PlaneGeometry( 2000, 450 ); 
const wallTex = textureLoader.load('./assets/textures/arena.jpg');
const wallMat = new THREE.MeshLambertMaterial(({ map: wallTex,side: THREE.DoubleSide })); 
wallMat.color.multiply(new THREE.Color(0.1, 0.1, 0.1));
wallTex.repeat.set(5,1); 
wallTex.wrapS = THREE.RepeatWrapping;
wallTex.wrapT = THREE.RepeatWrapping;
const wall = new THREE.Mesh( wallGeom, wallMat ); 
scene.add( wall );

const fogGeom = new THREE.PlaneGeometry( 200, 300 ); 
const fogTex = textureLoader.load('./assets/textures/fogwall.jpg');
const yellowTint = new THREE.Color(0xFFD700);
const fogMat = new THREE.MeshLambertMaterial(({ map: fogTex, side: THREE.DoubleSide, color:yellowTint })); 
const fog = new THREE.Mesh( fogGeom, fogMat ); 
scene.add( fog );

const fogBorderGeom = new THREE.CylinderGeometry(10, 10, 300, 32);
const fogBorderTex = textureLoader.load('./assets/textures/lavaborder.jpg');
const fogBorderMat = new THREE.MeshLambertMaterial(({ map: fogBorderTex, side: THREE.DoubleSide, color:yellowTint })); 
const fogBorder = new THREE.Mesh(fogBorderGeom, fogBorderMat);
const fogBorder2 = new THREE.Mesh(fogBorderGeom, fogBorderMat);
scene.add(fogBorder);
scene.add(fogBorder2);

const fog2BorderGeom = new THREE.CylinderGeometry(10, 10, 200, 32);
const fog2Border = new THREE.Mesh(fog2BorderGeom, fogBorderMat);
scene.add(fog2Border);

//PILLARS setup
const pillar1Geom = new THREE.CylinderGeometry( 60, 60, 3600, 32 ); 
const pillarTex = textureLoader.load('./assets/textures/lavapillar.jpg');
pillarTex.repeat.set(1,6.5); 
pillarTex.wrapS = THREE.RepeatWrapping;
pillarTex.wrapT = THREE.RepeatWrapping;
const pillarMat = new THREE.MeshLambertMaterial( { map: pillarTex, side: THREE.DoubleSide} ); 

const pillarTint = new THREE.Color(0.1,0.1,0.1); 
const pillar2Tint = new THREE.Color(0.1,0.1,0.1); 

pillarMat.color.multiply(pillarTint);
const pillar1 = new THREE.Mesh( pillar1Geom, pillarMat ); 
floor.add(pillar1);

const pillar2Geom = new THREE.CylinderGeometry( 50, 35, 3600, 32 );
const pillar2 = new THREE.Mesh( pillar2Geom, pillarMat ); 
floor.add(pillar2);

const pillar3Geom = new THREE.CylinderGeometry( 60, 45, 3600, 32 );
const pillar2Tex = textureLoader.load('./assets/textures/lavapillar2.jpg');
pillar2Tex.repeat.set(1,9); 
pillar2Tex.wrapS = THREE.RepeatWrapping;
pillar2Tex.wrapT = THREE.RepeatWrapping;
const pillar2Mat = new THREE.MeshLambertMaterial( { map: pillar2Tex, side: THREE.DoubleSide} ); 

pillar2Mat.color.multiply(pillar2Tint);
const pillar3 = new THREE.Mesh( pillar3Geom, pillar2Mat ); 
floor.add(pillar3);

const pillar4Geom = new THREE.CylinderGeometry( 60, 75, 3600, 32 );
const pillar4 = new THREE.Mesh( pillar4Geom, pillarMat ); 
floor.add(pillar4);

const pillar5Geom = new THREE.CylinderGeometry( 100, 150, 3600, 32 ); 
const pillar5 = new THREE.Mesh( pillar5Geom, pillar2Mat ); 
floor.add(pillar5);

const pillar6Geom = new THREE.CylinderGeometry( 80, 100, 4500, 32 );
const pillar6 = new THREE.Mesh( pillar6Geom, pillar2Mat ); 
floor.add(pillar6);

const pillar7Geom = new THREE.CylinderGeometry( 120, 80, 3600, 32 );
const pillar7 = new THREE.Mesh( pillar7Geom, pillarMat ); 
floor.add(pillar7);

const pillar8Geom = new THREE.CylinderGeometry( 80, 65, 3600, 32 ); 
const pillar8 = new THREE.Mesh( pillar8Geom, pillarMat ); 
floor.add(pillar8);

//lava puddle and particles setup
const puddleGeom = new THREE.CircleGeometry(840, 64);
const puddleTex = textureLoader.load('./assets/textures/lavapuddle.jpg');
const puddleMat = new THREE.MeshBasicMaterial({
    map: puddleTex,
    side: THREE.DoubleSide
});
const puddle = new THREE.Mesh(puddleGeom, puddleMat);
floor.add(puddle);

// Define particle parameters

// Create particles and add them to the group
let particleGroup;
let particles;

function createParticlesFromPuddle() {
    // Create a group to hold the particles
    particleGroup = new THREE.Group();
    puddle.add(particleGroup);

    // Define particle parameters
    const particleCount = 300; 
    const particleTexture = new THREE.TextureLoader().load('./assets/textures/particle.png');
    const particleMaterial = new THREE.PointsMaterial({
        map: particleTexture,
        size: 15-Math.random()*10
    });

    // Create particles and add them to the group
    const points = [];
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Vector3(     //Position randomizers
            -800+Math.random() * 1800 - 10, 
            -100+Math.random() * 1200 - 10,
            -300+Math.random() * 1600 - 10 
        );
        points.push(particle);
    }

    const particleGeometry = new THREE.BufferGeometry().setFromPoints(points);
    particles = new THREE.Points(particleGeometry, particleMaterial);
    particleGroup.add(particles);
}

// Update function to animate particles spawning from the puddle
function animateParticlesFromPuddle() {
    particleGroup.position.x = puddle.position.x; 
    particleGroup.position.y = puddle.position.y; 
    particleGroup.position.z = puddle.position.z;

    particleGroup.children.forEach(particle => {
        particle.position.z += 1.25; 
        if (particle.position.z > 300) { 
            particle.position.z = 0;
        }
    });
}

//ALL THE LIGHTING GOES HERE
const light = new THREE.AmbientLight( 0x000000); 
light.intensity=20;
scene.add( light );

const redLight = new THREE.PointLight(0xC13026, 12000000, 100000);
puddle.add(redLight);

const yellowLight = new THREE.PointLight(0xF4B569, 5000000, 80000);
puddle.add(yellowLight);

const orangeLight = new THREE.PointLight(0xd0442a, 3700000, 100000);
puddle.add(orangeLight);

const lavalight1 = new THREE.PointLight(0xEC602D, 500000, 1000000);
scene.add(lavalight1);

const lavalight2 = new THREE.PointLight(0xEC602D, 30000, 1000000);
scene.add(lavalight2);

const lavalight3 = new THREE.PointLight(0xEC602D, 80000, 1000000);
scene.add(lavalight3);

const lavalight4 = new THREE.PointLight(0xEC602D, 40000, 100000);
scene.add(lavalight4);

const lavalight5 = new THREE.PointLight(0xEC602D, 20000, 100000);
scene.add(lavalight5);

const lavalight6 = new THREE.PointLight(0xEC602D, 600000, 1000000);
scene.add(lavalight6);

const lavalight7 = new THREE.PointLight(0xEC602D, 60000, 100000);
scene.add(lavalight7);

//CHAINS
const chain1Geom = new THREE.CylinderGeometry( 16, 16, 4070, 3 );
const chainTex = textureLoader.load('./assets/textures/chain.png');
chainTex.repeat.set(6,4); 
chainTex.wrapS = THREE.RepeatWrapping;
chainTex.wrapT = THREE.RepeatWrapping;
chainTex.rotation = Math.PI / 2;
const chainMat = new THREE.MeshPhongMaterial( { map: chainTex, side: THREE.DoubleSide} ); 
const chain2Mat = new THREE.MeshPhongMaterial( { map: chainTex, side: THREE.DoubleSide, color:new THREE.Color(0xFFD700)} ); 
const chain1 = new THREE.Mesh( chain1Geom, chainMat ); 
floor.add(chain1);

const chain2 = new THREE.Mesh( chain1Geom, chainMat ); 
floor.add(chain2);

//3 to 5 are for chandeliers
const chain3 = new THREE.Mesh( chain1Geom, chainMat ); 
floor.add(chain3);

const chain4 = new THREE.Mesh( chain1Geom, chainMat ); 
floor.add(chain4);

const chain5 = new THREE.Mesh( chain1Geom, chainMat ); 
floor.add(chain5);

const chain6 = new THREE.Mesh( chain1Geom, chainMat ); 
floor.add(chain6);

const chain7 = new THREE.Mesh( chain1Geom, chainMat ); 
floor.add(chain7);

const chain8 = new THREE.Mesh( chain1Geom, chainMat ); 
floor.add(chain8);

const chain9 = new THREE.Mesh( chain1Geom, chainMat ); 
floor.add(chain9);

glLoader.load(
  // resource URL
  './assets/textures/bonepile/scene.gltf',
  // called when the resource is loaded
  function ( gltf ) {
      const bones1 = gltf.scene; 
      bones1.scale.set(3.5,3.5,3.5); 
      bones1.rotation.y = Math.PI / 2; 
      bones1.position.y = -430;
      pillar1.add( bones1 ); 

      const bones2 = gltf.scene.clone(); 
      bones2.scale.set(2.5,4,2.5); 
      bones2.rotation.y = Math.PI / 2; 
      bones2.position.y = -450;
      pillar2.add( bones2 ); 

      const bones3 = gltf.scene.clone(); 
      bones3.scale.set(2.5,4,2.5); 
      bones3.rotation.y = Math.PI / 2; 
      bones3.position.y = -465;
      pillar3.add( bones3 ); 

      const bones4 = gltf.scene.clone(); 
      bones4.scale.set(4, 6, 4); 
      bones4.rotation.y = Math.PI / 2; 
      bones4.position.y = -420;
      pillar4.add( bones4 ); 

      const bones5 = gltf.scene.clone(); 
      bones5.scale.set(4, 6, 4); 
      bones5.rotation.y = Math.PI / 2; 
      bones5.rotation.z = Math.PI; 
      bones5.position.y = 2200;
      pillar8.add( bones5 ); 

      const bones7 = gltf.scene.clone(); 
      bones7.scale.set(4, 6, 4); 
      bones7.rotation.y = Math.PI / 2; 
      bones7.rotation.z = Math.PI; 
      bones7.position.z = 500;
      bones7.position.y = 2200;
      pillar5.add( bones7 ); 

      const hueColor = new THREE.Color(0x000000);

      bones1.traverse(child => {
        if (child.isMesh) {
            if (child.material) {
                child.material.color.multiply(hueColor);
            }
        }
        });

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

  },
  // called while loading is progressing
  function ( xhr ) {

      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  // called when loading has errors
  function ( error ) {

      console.log( 'An error happened' );

  }
);

glLoader.load(
  // resource URL
  './assets/textures/snake/scene.gltf',
  // called when the resource is loaded
  function ( gltf ) {

      const snake = gltf.scene; 
      snake.scale.set(320,320,320); 
      snake.rotation.x = Math.PI / 2.25; 
      snake.rotation.y = -Math.PI/1.4;
      snake.position.y = -90;
      snake.position.z = 0;
      floor.add( snake );

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

  },
  // called while loading is progressing
  function ( xhr ) {

      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  // called when loading has errors
  function ( error ) {

      console.log( 'An error happened' );

  }
);

glLoader.load(
    // resource URL
    './assets/textures/chandelier/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {
  
        const chandelier = gltf.scene; 
        chandelier.scale.set(100,100,100); 
        chandelier.rotation.x = Math.PI / 2; 
        chandelier.rotation.y = Math.PI;
        chandelier.position.x = 500;
        chandelier.position.y = 90;
        chandelier.position.z = 550;
        floor.add( chandelier );
        const goldLight = new THREE.PointLight(0xF4B569, 800000, 400);
        chandelier.add(goldLight);

        const chandelier2 = gltf.scene.clone(); 
        chandelier.scale.set(100,100,100); 
        chandelier.rotation.y = Math.PI;
        chandelier.position.x = -600;
        chandelier.position.y = -350;
        chandelier.position.z = 550;
        floor.add( chandelier2 );

        const chandelier3 = gltf.scene.clone(); 
        chandelier.scale.set(100,100,100); 
        chandelier.rotation.y = Math.PI;
        chandelier.position.x = -50;
        chandelier.position.y = -1000;
        chandelier.position.z = 550;
        floor.add( chandelier3 );

        const hueColor = new THREE.Color(0xd4af37);
        chandelier.traverse(child => {
        if (child.isMesh) {
            if (child.material) {
                child.material.color.multiply(hueColor);
            }
        }
        });
  
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
  
    },
    // called while loading is progressing
    function ( xhr ) {
  
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  
    },
    // called when loading has errors
    function ( error ) {
  
        console.log( 'An error happened' );
    }
  );

  glLoader.load(
    // resource URL
    './assets/textures/cage/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {
  
        const cage = gltf.scene; 
        cage.scale.set(30,30,30); 
        cage.rotation.z = -Math.PI/2; 
        cage.rotation.y = Math.PI;
        cage.position.x = -10;
        cage.position.y = 200;
        chain1.add( cage );

        const cage2 = gltf.scene.clone(); 
        cage2.scale.set(30,30,30); 
        cage2.rotation.z = -Math.PI/1.9; 
        cage2.rotation.y = Math.PI;
        cage2.position.y = -540;
        chain1.add( cage2 );

        const cage3 = gltf.scene.clone(); 
        cage3.scale.set(20,20,20); 
        cage3.rotation.z = -Math.PI/2; 
        cage3.rotation.y = Math.PI;
        cage3.position.y = -900;
        chain1.add( cage3 );

        const cage4 = gltf.scene.clone(); 
        cage4.scale.set(30,50,30); 
        cage4.rotation.z = -Math.PI/1.8; 
        cage4.rotation.y = Math.PI;
        cage4.position.y = -1400;
        chain1.add( cage4 );

        const cage5 = gltf.scene.clone(); 
        cage5.scale.set(60,50,40); 
        cage5.rotation.z = -Math.PI/1.8; 
        cage5.rotation.y = Math.PI;
        cage5.position.y = 800;
        chain1.add( cage5 );

        const cage6 = gltf.scene.clone(); 
        cage6.scale.set(60,40,60); 
        cage6.rotation.z = -Math.PI/2.1; 
        cage6.rotation.y = Math.PI;
        cage6.position.y = 1400;
        chain2.add( cage6 );

        const cage7 = gltf.scene.clone(); 
        cage7.scale.set(20,40,20); 
        cage7.rotation.z = -Math.PI/1.6; 
        cage7.rotation.y = Math.PI;
        cage7.position.y = 1800;
        chain2.add( cage7 );

        const cage8 = gltf.scene.clone(); 
        cage8.scale.set(10,40,10); 
        cage8.rotation.z = -Math.PI/1.5; 
        cage8.rotation.y = Math.PI;
        cage8.position.y = 1000;
        chain2.add( cage8 );

        const cage9 = gltf.scene.clone(); 
        cage9.scale.set(50,50,50); 
        cage9.rotation.z = -Math.PI/2; 
        cage9.rotation.y = -Math.PI/1.5;
        cage9.position.y = 900;
        chain6.add( cage9 );

        const cage10 = gltf.scene.clone(); 
        cage10.scale.set(30,30,30); 
        cage10.rotation.z = -Math.PI/2; 
        cage10.rotation.y = -Math.PI/0.9;
        cage10.position.y = -800;
        chain7.add( cage10 );

        const cage11 = gltf.scene.clone(); 
        cage11.scale.set(60,40,60); 
        cage11.rotation.z = -Math.PI/2; 
        cage11.rotation.y = -Math.PI/0.9;
        cage11.position.y = -200;
        chain7.add( cage11 );

        const cage12 = gltf.scene.clone(); 
        cage12.scale.set(35,60,35); 
        cage12.rotation.z = -Math.PI/2; 
        cage12.rotation.y = -Math.PI/1.2;
        cage12.position.y = 800;
        chain7.add( cage12 );

        const cage13 = gltf.scene.clone(); 
        cage13.scale.set(40, 20, 40); 
        cage13.rotation.z = -Math.PI/2; 
        cage13.rotation.y = -Math.PI/1.2;
        cage13.position.y = 800;
        chain8.add( cage13 );

        const cage14 = gltf.scene.clone(); 
        cage14.scale.set(30, 50, 30); 
        cage14.rotation.z = -Math.PI/2; 
        cage14.rotation.y = -Math.PI/1.6;
        cage14.position.y = -1100;
        chain9.add( cage14 );

        const cage15 = gltf.scene.clone(); 
        cage15.scale.set(90, 40, 90); 
        cage15.rotation.z = -Math.PI/2.2; 
        cage15.rotation.y = -Math.PI/1.4;
        cage15.position.y = -100;
        chain9.add( cage15 );
  
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
  
    },
    // called while loading is progressing
    function ( xhr ) {
  
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  
    },
    // called when loading has errors
    function ( error ) {
  
        console.log( 'An error happened' );
  
    }
  );

  glLoader.load(
    // resource URL
    './assets/textures/stalactite/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {
  
        const stal = gltf.scene; 
        stal.scale.set(135,135,135); 
        stal.rotation.x = Math.PI / 2; 
        stal.rotation.y = -Math.PI/2;
        stal.position.x = 1500;
        stal.position.y = -2500;
        stal.position.z = 3000;
        floor.add( stal );

        const stal2 = gltf.scene.clone(); 
        stal.scale.set(165, 165, 165); 
        stal.rotation.x = Math.PI / 2; 
        stal.rotation.y = -Math.PI/2.5;
        stal.position.x = 2500;
        stal.position.y = 500;
        stal.position.z = 3000;
        floor.add( stal2 );

        const stal3 = gltf.scene.clone(); 
        stal.scale.set(250,300, 250); 
        stal.rotation.x = Math.PI / 2; 
        stal.rotation.y = -Math.PI/2.2;
        stal.position.x = -2500;
        stal.position.y = 400;
        stal.position.z = 3400;
        floor.add( stal3 );

        const stal4 = gltf.scene.clone(); 
        stal.scale.set(110,110, 110); 
        stal.rotation.x = Math.PI / 2; 
        stal.rotation.y = -Math.PI/2.3;
        stal.position.x = -700;
        stal.position.y = -1700;
        stal.position.z = 3200;
        floor.add( stal4 );

        const stal5 = gltf.scene.clone(); 
        stal.scale.set(110, 220, 110); 
        stal.rotation.x = Math.PI / 2; 
        stal.rotation.y = -Math.PI/2.6;
        stal.position.x = -2500;
        stal.position.y = -2100;
        stal.position.z = 3200;
        floor.add( stal5 );

        const stal6 = gltf.scene.clone(); 
        stal.scale.set(60,180, 60); 
        stal.rotation.x = Math.PI / 2; 
        stal.rotation.y = -Math.PI/2.4;
        stal.position.x = 400;
        stal.position.y = 250;
        stal.position.z = 3000;
        floor.add( stal6 );

        const stal7 = gltf.scene.clone(); 
        stal.scale.set(60, 200, 60); 
        stal.rotation.x = Math.PI / 2; 
        stal.rotation.y = -Math.PI/2.3;
        stal.position.x = 2600;
        stal.position.y = -1500;
        stal.position.z = 2800;
        floor.add( stal7 );

        const stal8 = gltf.scene.clone(); 
        stal.scale.set(80, 120, 3000); 
        stal.rotation.x = Math.PI / 2; 
        stal.rotation.y = -Math.PI/2.1;
        stal.position.x = -100;
        stal.position.y = -3400;
        stal.position.z = 2000;
        floor.add( stal8 );

        const hueColor = new THREE.Color(0x000000);

        stal.traverse(child => {
            if (child.isMesh) {

                if (child.material) {
                    child.material.color.multiply(hueColor);
                }
            }
            });
  
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
  
    },
    // called while loading is progressing
    function ( xhr ) {
  
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  
    },
    // called when loading has errors
    function ( error ) {
  
        console.log( 'An error happened' );
  
    }
  );
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

createParticlesFromPuddle();

function animate() {
    fog.position.z = -119;
    fog.position.y = 50;

    fogBorder.position.y = 50;
    fogBorder.position.z = -120;
    fogBorder.position.x = 100;

    fogBorder2.position.y = 50;
    fogBorder2.position.z = -120;
    fogBorder2.position.x = -100;

    fog2Border.rotation.z = Math.PI/2;
    fog2Border.position.y = 200;
    fog2Border.position.z = -120;

    wall.position.z = -120;
    wall.position.y = 100;

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -30.3;
    floor.position.z = 500;

    puddle.position.z = 5;
    puddle.position.y = -400;

    arena.position.z = 160;

    skybox.rotation.x = -Math.PI/2;
    skybox.rotation.y = Math.PI/6;

    sky2box.rotation.x += -Math.PI/700;

    sky2box.rotation.y += Math.PI/800;

    //pillars
    pillar1.rotation.x = Math.PI/2;
    pillar1.position.x = 760;
    pillar1.position.y = 100;
    pillar1.position.z = 450;

    pillar2.rotation.x = Math.PI/2;
    pillar2.position.x = -400;
    pillar2.position.y = 50;
    pillar2.position.z = 450;

    pillar3.rotation.x = Math.PI/2;
    pillar3.position.x = -890;
    pillar3.position.y = -200;
    pillar3.position.z = 450;

    pillar4.rotation.x = Math.PI/2;
    pillar4.position.x = 50;
    pillar4.position.y = -500;
    pillar4.position.z = 450;

    pillar5.rotation.x = Math.PI/2;
    pillar5.position.x = -540;
    pillar5.position.y = -650;
    pillar5.position.z = 450;

    pillar6.rotation.x = Math.PI/2;
    pillar6.position.x = 900;
    pillar6.position.y = -720;
    pillar6.position.z = 450;

    pillar7.rotation.x = Math.PI/2;
    pillar7.position.x = 640;
    pillar7.position.y = -1200;
    pillar7.position.z = 450;

    pillar8.rotation.x = Math.PI/2;
    pillar8.position.x = -400;
    pillar8.position.y = -1100;
    pillar8.position.z = 450;

    //chains
    chain1.rotation.z = Math.PI/2;
    chain1.rotation.y = Math.PI/12;
    chain1.rotation.x = Math.PI/4;
    chain1.position.z = 1200;
    chain1.position.y = -800;
    chain1.position.x = -200;

    chain2.rotation.z = Math.PI/2;
    chain2.rotation.y = -Math.PI/10;
    chain2.rotation.x = Math.PI/4;
    chain2.position.z = 1200;
    chain2.position.y = -1000;
    chain2.position.x = 2000;

    //CHAINS 3 TO 5 ARE FOR THE CHANDELIERS
    chain3.rotation.z = Math.PI/2;
    chain3.rotation.y = Math.PI/2;
    chain3.position.z = 2950;
    chain3.position.y = -350;
    chain3.position.x = -580;

    chain4.rotation.z = Math.PI/2;
    chain4.rotation.y = Math.PI/2;
    chain4.position.z = 2950;
    chain4.position.y = 70;
    chain4.position.x = 500;

    chain5.rotation.z = Math.PI/2;
    chain5.rotation.y = Math.PI/2;
    chain5.position.z = 2950;
    chain5.position.y = -1000;
    chain5.position.x = -100;

    chain6.rotation.z = Math.PI/2;
    chain6.rotation.y = -Math.PI/3;
    chain6.rotation.x = Math.PI/10;
    chain6.position.z = 1000;
    chain6.position.y = 60;
    chain6.position.x = 920;

    chain7.rotation.z = Math.PI/2;
    chain7.rotation.y = -Math.PI/9;
    chain7.rotation.x = Math.PI/2;
    chain7.position.z = 1000;
    chain7.position.y = -1100;
    chain7.position.x = -500;

    chain8.rotation.z = Math.PI/2;
    chain8.rotation.y = -Math.PI/3;
    chain8.rotation.x = Math.PI/10;
    chain8.position.z = 1100;
    chain8.position.y = -1000;
    chain8.position.x = 800;

    chain9.rotation.z = Math.PI/12;
    chain9.rotation.y = -Math.PI/6;
    chain9.rotation.x = -Math.PI/4;
    chain9.position.z = 800;
    chain9.position.y = 400;
    chain9.position.x = -1000;

    //light positions
    lavalight1.position.x = 500;
    lavalight1.position.z = 40;
    lavalight2.position.x = -450;
    lavalight3.position.x = -900;
    lavalight3.position.z = 600;
    lavalight5.position.x = 250;
    lavalight6.position.x = -780;
    lavalight6.position.z = 100;

    requestAnimationFrame(animate);
    animateParticlesFromPuddle();
    renderer.render(scene, camera);
    controls.update();
}
animate();