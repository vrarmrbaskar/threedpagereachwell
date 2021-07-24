//import './style.css'
//import * as THREE from 'three'
import * as THREE from "https://unpkg.com/three@0.130.0/build/three.module.js";

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OrbitControls } from "https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js";

//import { loader } from 'mini-css-extract-plugin';
//import { Loader, LoadingManager } from 'three';
import { Loader, LoadingManager } from "https://unpkg.com/three@0.130.0/build/three.module.js";


function main(){
    
    // Canvas
    const canvas = document.querySelector('canvas.webgl');

    //scene
    const scene = new THREE.Scene();

    // window width and height
    const sizes = {
        width : window.innerWidth,
        height : window.innerHeight
    };
   
    //Renderer
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    //renderer.canvas = canvas;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio),2);

    

    //camera
    const fov = 60;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;    

    const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,50,0);
    camera.up.set(0,0,1);
    camera.lookAt(0,0,0);
    
    scene.add(camera);


    // const textureLoader = new THREE.TextureLoader()
    // const sunLogoTexture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg');
    // console.log(sunLogoTexture);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
 
    //Light
    {
        const color =  0xFFFFFF; 
        const intensity = 10.0;
        const light = new THREE.PointLight(color,intensity);
        scene.add(light);
    }

        const objects = [];
         const radius = 1;
        const widthSegments = 40;
        const heightSegments = 40;
        const sphereGeometry = new THREE.SphereGeometry( radius ,widthSegments,heightSegments);

        const solarSystem = new THREE.Object3D();
        scene.add(solarSystem);
         objects.push(solarSystem);

         
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () =>
{
    console.log('loading started')
}
loadingManager.onLoad = () =>
{
    console.log('loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('logo_24.png');
const arvrTexture = textureLoader.load('arvr.jpg');
const brandConsulting = textureLoader.load('brandConsult.png');
const creativeConsult = textureLoader.load('creative.jpg');
const digitalMarket = textureLoader.load('digitalmarket.png');
    
    const createSolarSystem = () => {
        console.log('--- In createSolarSystem----');

        
    const sunMaterial = new THREE.MeshBasicMaterial({
                map: colorTexture
              });
         const sunMesh = new THREE.Mesh(sphereGeometry,sunMaterial);
        sunMesh.scale.set(7,7,7);
        sunMesh.rotation.z = 0;
        sunMesh.rotation.x = 89.6;
        sunMesh.rotation.y = -29.8;
        scene.add(sunMesh);
        //solarSystem.add(sunMesh);
        //objects.push(sunMesh);

        const earthOrbit = new THREE.Object3D();
           solarSystem.add(earthOrbit);
        //objects.push(earthOrbit);

        //const earthMat = new THREE.MeshPhongMaterial({color:0x2233FF,emissive: 0x112244 , flatShading: true});
        const earthMat = new THREE.MeshBasicMaterial({
            map: arvrTexture
          });

        const earthMesh = new THREE.Mesh(sphereGeometry,earthMat);
        earthMesh.position.x = 15;
        //scene.add(earthMesh);
        earthMesh.scale.set(3,3,3);
        earthOrbit.add(earthMesh);
        //objects.push(earthMesh);

        const moonOrbit = new THREE.Object3D();
     
        earthOrbit.add(moonOrbit);
        solarSystem.add(moonOrbit);

        //const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222 , flatShading: true});
        const  moonMaterial = new THREE.MeshBasicMaterial({
            map:creativeConsult
        });
        const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
        moonMesh.position.x = 25;
        moonMesh.scale.set(3,3,3);
        moonOrbit.add(moonMesh);
      //  objects.push(moonMesh);

        const plutoOrbit = new THREE.Object3D();
       // plutoOrbit.position.x = 20;
        earthOrbit.add(plutoOrbit);
        solarSystem.add(plutoOrbit);

        //const plutoMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222 , flatShading: true});
        const  plutoMaterial = new THREE.MeshBasicMaterial({
            map:brandConsulting
        });
        const plutoMesh = new THREE.Mesh(sphereGeometry, plutoMaterial);
       plutoMesh.position.x = -15;
       plutoMesh.scale.set(3,3,3);
       
       plutoOrbit.add(plutoMesh);
       // objects.push(plutoMesh);

        const marsOrbit = new THREE.Object3D();
      
        earthOrbit.add(marsOrbit);
        solarSystem.add(marsOrbit);

       // const marsMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222 , flatShading: true});
       const marsMaterial = new THREE.MeshBasicMaterial({
            map: digitalMarket
       });
        const marsMesh = new THREE.Mesh(sphereGeometry, marsMaterial);
        marsMesh.position.x = -25;
        marsMesh.castShadow = false;
        marsMesh.scale.set(3, 3, 3);
       marsOrbit.add(marsMesh);
        //objects.push(marsMesh);


        console.log('--- out createSolarSystem----');
     }

     const createParticleEffect = () => {
         console.log('----- In createParticleEffect ----');
                /**
                 * Textures
                 */
                const textureLoader = new THREE.TextureLoader()
                const particleTexture = textureLoader.load('8.png')

            const particlesGeometry = new THREE.BufferGeometry();
            const particlesMaterial = new THREE.PointsMaterial();
            particlesMaterial.map = particleTexture;
            particlesMaterial.size = 3;
            particlesMaterial.sizeAttenuation = true;
            // Points
            const particles = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particles);
            objects.push(particles);
            const count = 700;
            particlesMaterial.depthWrite = false;
            particlesMaterial.blending = THREE.AdditiveBlending;

            particlesMaterial.vertexColors = true;
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3)
            for(let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
            {
                positions[i] = (Math.random() - 0.5) * 100; // Math.random() - 0.5 to have a random value between -0.5 and +0.5
                colors[i] = Math.random();
            }
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particlesGeometry.setAttribute('color',new THREE.BufferAttribute(colors,3));

         console.log('----- out createParticleEffect ----');
     }

  /*  const createSunObject = (() => {
        console.log('----In createSunObject ----');
        

        const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
        sunMesh = new THREE.Mesh(sphereGeometry,sunMaterial);
        sunMesh.scale.set(5, 5, 5);
        scene.add(sunMesh);
        objects.push(sunMesh);
        console.log('----out createSunObject ----');

    });

    const createEarthObject = (() => {
        console.log('---- In createEarthObject ---');

        const earthMat = new THREE.MeshPhongMaterial({color:0x2233FF,emissive: 0x112244});
        const earthMesh = new THREE.Mesh(sphereGeometry,earthMat);
       // earthMesh.scale.set(2,2,2);
        earthMesh.position.x = 10;
        //scene.add(earthMesh);
        sunMesh.add(earthMesh);
        objects.push(earthMesh);


        console.log('---- out createEarthObject ---');
    });
   
    createSunObject();
    createEarthObject(); */

        createParticleEffect();
        createSolarSystem();
        
            
            //window resize 
            window.addEventListener('resize' ,() => {
                console.log('--- In window Resize ----');
                // Update sizes
                sizes.width = window.innerWidth;
                sizes.height = window.innerHeight;

                //tick();

                // Update camera
                camera.aspect = sizes.width / sizes.height;
               // camera.updateProjectionMatrix();

                renderer.setSize(sizes.width,sizes.height);
                renderer.setPixelRatio(Math.min(window.setPixelRatio),2);

                console.log('--- out window Resize ----');
            });


        const clock = new THREE.Clock();
        //tick function definition
        const tick = () => {
            console.log('---- In tick -----');
            //createSunObject();

            // Elapsed time
            const elapsedTime = clock.getElapsedTime();

            objects.forEach((obj) => {
                obj.rotation.z = 0.40 * elapsedTime;
            });

           // particles.rotation.z =  elapsedTime;

            // Update controls
            controls.update()

            renderer.render(scene,camera);
            window.requestAnimationFrame(tick);
            console.log('---- out tick -----');
        }

        tick();
    
}

main();

