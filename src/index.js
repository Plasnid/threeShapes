import * as THREE from 'three';

//define a scene
let scene = new THREE.Scene();
//define a canmera
//https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
//PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 4000 );
    camera.position.set(-150, 400, 350);
//position the camera
camera.position.set(-250, 250, 250);
//set where the camera is looking
camera.lookAt(new THREE.Vector3(0,0,0));
//make a material
let faceMaterial = new THREE.MeshPhongMaterial( { color: 0x0087E6, shininess: 100 } );
//make a renderer;a
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


 // front
//https://threejs.org/docs/#api/en/geometries/TorusBufferGeometry
//TorusBufferGeometry(radius, tube, radial segments, tubular segments) 
let torus = new THREE.Mesh(new THREE.TorusBufferGeometry(50, 10, 16, 64), faceMaterial);
torus.position.set(0, 50, 250);
torus.rotation.x = -90 * Math.PI / 180;
torus.castShadow = true;
scene.add(torus);
//https://threejs.org/docs/#api/en/geometries/CylinderBufferGeometry
//CylinderBufferGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
let cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(50, 50, 100, 32), faceMaterial);
cylinder2.position.set(300, 50, 0);
cylinder2.castShadow = true;
scene.add(cylinder2);

//https://threejs.org/docs/#api/en/geometries/BoxGeometry
//BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
let cube = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), faceMaterial);
cube.position.y = 50;
cube.castShadow = true;
scene.add(cube);
//https://threejs.org/docs/#api/en/geometries/SphereGeometry
//SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
let sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), faceMaterial);
sphere.position.set(-150, 50, 0);
sphere.castShadow = true;
scene.add(sphere);
//https://threejs.org/docs/#api/en/geometries/OctahedronGeometry
//OctahedronGeometry(radius : Float, detail : Integer)
let octahedron2 = new THREE.Mesh(new THREE.OctahedronGeometry(50, 2), faceMaterial);
octahedron2.position.set(-300, 50, 0);
octahedron2.castShadow = true;
scene.add(octahedron2);

// Second line
//https://threejs.org/docs/#api/en/geometries/ConeGeometry
//ConeGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
let cone = new THREE.Mesh(new THREE.ConeGeometry(50, 100, 3), faceMaterial);
cone.position.set(450, 50, -350);
cone.rotation.y = -45 * Math.PI / 180;
cone.castShadow = true;
scene.add(cone);

// Create a plane that receives shadows (but does not cast them)
    //https://threejs.org/docs/#api/en/geometries/PlaneBufferGeometry
    //PlaneBufferGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)
    let planeGeometry = new THREE.PlaneBufferGeometry(10000, 10000, 32, 32);
    let planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xb69a77,
        side: THREE.DoubleSide
    });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    scene.add(plane);


//adding a light
//https://threejs.org/docs/#api/en/lights/PointLight
//PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
let pointLight = new THREE.PointLight( 0xFFFFFF, 2);
pointLight.position.set( 0, 250, 0 );
pointLight.castShadow = true;
scene.add( pointLight );

let pointLight2 = new THREE.PointLight( 0xFFFFFF, 2);
pointLight2.position.set( 0, -250, -250 );
pointLight2.castShadow = true;
scene.add( pointLight2 );



function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
    /*cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    //now to animate cube2
    cube2.rotation.x -=0.01;
    cube2.rotation.z -=0.01;*/
}
animate();