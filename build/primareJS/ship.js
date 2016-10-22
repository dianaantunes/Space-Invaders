

var camera, scene, renderer;
var geometry, material, mesh;
var ball;
var shipWidth = 5;
var shipHeight = 5;
var shipDepth = 5;


const PI = Math.PI;


function createShip(x, y, z){
	'use strict';
	var ship = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

	createBody(ship, 0, 0, 0);
	addLeftGun(ship, 6, 0, -2.5);
	addRightGun(ship, 6, 0, 2.5);
	addCockpit(ship, 2, 0, 5);

	scene.add(ship);

	ship.position.x = x;
	ship.position.y = y;
	ship.position.z = z;

	ship.scale.x = shipWidth;
	ship.scale.y = shipHeight;
	ship.scale.z = shipDepth;
	ship.rotateY(PI/2);
	ship.rotateZ(PI/2);
}

function createBody(obj, x, y, z){
	'use strict';
	var body = new THREE.Object3D();
	
	addCenterCylinder(body, 0, 0, 0);
	addUpperCylinder(body, 0, 1, 0);
	addMiddleRectangle(body, 3, 0, 0);
	obj.add(body);
}

function addCenterCylinder(obj, x, y, z){
	'use strict';
	geometry = new THREE.CylinderGeometry(5, 5, 1);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addUpperCylinder(obj, x, y, z){
	'use strict';
	geometry = new THREE.CylinderGeometry(1, 5, 1);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addMiddleRectangle(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(6, 1, 2);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addLeftGun(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(6, 1, 3);
	geometry.vertices[1].z = 0.5;
	geometry.vertices[3].z = 0.5;
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addRightGun(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(6, 1, 3);
	geometry.vertices[2].z = -0.5;
	geometry.vertices[0].z = -0.5;
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addCockpit(obj, x, y, z){
	'use strict';
	geometry = new THREE.CylinderGeometry(1, 0.5, 2);
	mesh = new THREE.Mesh(geometry, material);
	mesh.rotateZ(PI/2);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}


function onResize(){
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
	'use strict';
	renderer.render(scene, camera);

}

function createCamera(){
	'use strict';
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	//camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
	camera.position.x = 200;
	camera.position.y = 200;
	camera.position.z = 200;
	camera.lookAt(scene.position);
}

function createScene(){
	'use strict';
	scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(50));

	createShip(0, 0, 0);
}

function onKeyDown(e){
	'use strict';

	switch (e.keyCode) {
		case 65: //A
		case 97: //a
			material.wireframe = !material.wireframe;
				
			break;
	}

	render();
}

function init(){
	'use strict';
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	createScene();
	createCamera();
	render();
	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);

}
