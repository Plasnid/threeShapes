import * as THREE from 'three';
let camera, renderer, canvasRatio, canvasHeight, canvasWidth;
let cameraControls, container, canvas;
let scene = new THREE.Scene();
let clock = new THREE.Clock();

function init() {
    canvasRatio = 4 / 3;
    canvasHeight = window.innerHeight
    canvasWidth = canvasHeight * canvasRatio;


    // RENDERER
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x66ccff, 1.0);
    //document.body.appendChild( renderer.domElement );

    // CAMERA
    camera = new THREE.PerspectiveCamera(75, canvasRatio, 0.1, 4000);
    camera.position.set(-150, 400, 350);

    // CONTROLS
    cameraControls = new THREE.OrbitControls(camera);
    cameraControls.target.set(-25, -50, 0);
    cameraControls.update();

    // Light
    // var pointLight = new THREE.PointLight( 0xFFFFFF, 2);
    // pointLight.position.set( 200, 250, 600 );
    // pointLight.castShadow = true;
    // scene.add( pointLight );
    let spotLight = new THREE.SpotLight(0xFFFFFF, 2);
    spotLight.position.set(200, 250, 600);
    spotLight.target.position.set(100, -50, 0);
    spotLight.castShadow = true;
    scene.add(spotLight.target);
    scene.add(spotLight);
    //Set up shadow properties for the spotLight
    spotLight.shadow.mapSize.width = 512; // default
    spotLight.shadow.mapSize.height = 512; // default
    spotLight.shadow.camera.near = 0.5; // default
    spotLight.shadow.camera.far = 15000; // default

    // var directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 1 );
    // directionalLight.position.set( 100, 350, 250 );
    // directionalLight.castShadow = true;
    // scene.add( directionalLight );

    let ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

}

function addToDOM() {
    container = document.querySelector('#container');
    canvas = container.getElementsByTagName('canvas');
    if (canvas.length > 0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild(renderer.domElement);
    /*renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );*/
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render() {
    let delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render(scene, camera);
}

function fillScene() {
    // var faceMaterial = new THREE.MeshBasicMaterial({ color: 0x0087E6 });
    // var faceMaterial = new THREE.MeshLambertMaterial({ color: 0x0087E6 });
    // var faceMaterial = new THREE.MeshPhongMaterial({ color: 0x0087E6, shininess: 100 } );
    let faceMaterial = new THREE.MeshStandardMaterial({
        color: 0x0087E6
    });
// front
//https://threejs.org/docs/#api/en/geometries/TorusBufferGeometry
//TorusBufferGeometry(radius, tube, radial segments, tubular segments) 
let torus = new THREE.Mesh(new THREE.TorusBufferGeometry(50, 10, 16, 64), faceMaterial);
torus.position.set(0, 50, 250);
torus.rotation.x = -90 * Math.PI / 180;
torus.castShadow = true;
scene.add(torus);

    // first row
    //https://threejs.org/docs/#api/en/geometries/CylinderBufferGeometry
    //CylinderBufferGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
    let cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(50, 50, 100, 32), faceMaterial);
    cylinder2.position.set(300, 50, 0);
    cylinder2.castShadow = true;
    scene.add(cylinder2);

    //https://threejs.org/docs/#api/en/geometries/CylinderBufferGeometry
    //CylinderBufferGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
    let cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0, 50, 100, 64), faceMaterial);
    cylinder.position.set(150, 50, 0);
    cylinder.castShadow = true;
    scene.add(cylinder);

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

    let cylinder3 = new THREE.Mesh(new THREE.CylinderGeometry(0, 50, 100, 4), faceMaterial);
    cylinder3.position.set(250, 50, -350);
    cylinder3.rotation.y = -45 * Math.PI / 180;
    cylinder3.castShadow = true;
    scene.add(cylinder3);

    //https://threejs.org/docs/#api/en/geometries/DodecahedronGeometry
    //DodecahedronGeometry(radius : Float, detail : Integer)
    let dodecahedron = new THREE.Mesh(new THREE.DodecahedronGeometry(50), faceMaterial);
    dodecahedron.position.set(50, 50, -350);
    dodecahedron.castShadow = true;
    scene.add(dodecahedron);

    //https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry
    //IcosahedronGeometry(radius : Float, detail : Integer)
    let icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(50), faceMaterial);
    icosahedron.position.set(-150, 50, -350);
    icosahedron.castShadow = true;
    scene.add(icosahedron);

    //https://threejs.org/docs/#api/en/geometries/OctahedronGeometry
    //OctahedronGeometry(radius : Float, detail : Integer)
    let octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(50), faceMaterial);
    octahedron.position.set(-350, 50, -350);
    octahedron.castShadow = true;
    scene.add(octahedron);

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
}

init();
fillScene();
addToDOM();
animate();