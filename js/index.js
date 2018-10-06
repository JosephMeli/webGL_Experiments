var THREE = require('three');

var container, myS;
var camera, scene, renderer;
var cube;
var plane;

init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  // scene
  scene = new THREE.Scene();
  //camera
  camera = new THREE.PerspectiveCamera(
    60, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping pane
    1000 // Far clipping pane
  );
  // Reposition the camera
  camera.position.set(5, 5, 0);

  //points the Camera a given Coords
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  //lights

  //cube
  cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x000ff })
  );
  cube.translateY(1);
  scene.add(cube);

  //plane
  plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x393839, wireframe: true })
  );
  plane.rotateX(Math.PI / 2);
  scene.add(plane);

  // create a Web Gl renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setPixelRatio(window.devicePixelRatio);
  // Gives the Renderer the whole window to use
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Set a near white clear color (default is black)
  renderer.setClearColor(0xfff6e6);

  container.appendChild(renderer.domElement);

  // controls
  var controls = new OrbitControls(camera, renderer.domElement);

  //live stat diagram
  myS = new stats();
  myS.showPanel(0);
  container.appendChild(myS.dom);
}

function jrotateX(obj, val) {
  obj.rotation.x += val;
}
function jrotateY(obj, val) {
  obj.rotation.y += val;
}

function animate() {
  requestAnimationFrame(animate);

  jrotateX(cube, 0.01);
  jrotateY(cube, 0.05);

  render();
  myS.update();
}
function render() {
  renderer.render(scene, camera);
}
