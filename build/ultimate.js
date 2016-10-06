var camera, scene, renderer;
var geometry, mesh;
var ship;

var materialSKiller, materialShip;

var width = 1000; 
var height = 600; 

var sKillerWidth = 5;
var sKillerHeight = 5;
var sKillerDepth = 5;

var shipWidth = 5;
var shipHeight = 5;
var shipDepth = 5;


const PI = Math.PI;

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
	mesh = new THREE.Mesh(geometry, materialShip);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addUpperCylinder(obj, x, y, z){
	'use strict';
	geometry = new THREE.CylinderGeometry(1, 5, 1);
	mesh = new THREE.Mesh(geometry, materialShip);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addMiddleRectangle(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(6, 1, 2);
	mesh = new THREE.Mesh(geometry, materialShip);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addLeftGun(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(6, 1, 3);
	geometry.vertices[1].z = 0.5;
	geometry.vertices[3].z = 0.5;
	mesh = new THREE.Mesh(geometry, materialShip);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addRightGun(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(6, 1, 3);
	geometry.vertices[2].z = -0.5;
	geometry.vertices[0].z = -0.5;
	mesh = new THREE.Mesh(geometry, materialShip);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addCockpit(obj, x, y, z){
	'use strict';
	geometry = new THREE.CylinderGeometry(1, 0.5, 2);
	mesh = new THREE.Mesh(geometry, materialShip);
	mesh.rotateZ(PI/2);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function moveShip(ship) {
	'use strict';
	var delta;
	var now;
	var currentPosition;
	var currentSpeed;
	// x = x0 + v0t + (a * t^2) / 2
	// v = v0 + at

	now = new Date();

	currentPosition = ship.position.x;
	currentSpeed = ship.speed;

	if (ship.moveStartTime && ship.moveStopTime) {
		delta = now.getTime() - ship.moveStartTime.getTime();
		currentPosition = ship.position.x;
		currentSpeed = ship.speed;

		ship.speed = currentSpeed + ship.acceleration * delta;
		ship.position.x = currentPosition + ship.speed * delta + (ship.acceleration * delta) / 4;

		if (ship.speed < 0.01 && ship.speed > -0.01) {
			ship.speed = 0;
			ship.acceleration = 0;
			ship.moveStartTime = null;
			ship.moveStopTime = null;
		}

	} else if (ship.moveStartTime){

		delta = now.getTime() - ship.moveStartTime.getTime();
		currentPosition = ship.position.x;
		currentSpeed = ship.speed;

		ship.speed = currentSpeed + ship.acceleration * delta;
		ship.position.x = currentPosition + ship.speed * delta + (ship.acceleration * delta) / 4;

	}

}

function createShip(x, y, z){
	'use strict';
	ship = new THREE.Object3D();
	materialShip = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
	ship.speed = 0;
    ship.acceleration = 0;
	ship.moveStartTime = null;
	ship.moveStopTime = null;
	ship.move = moveShip;

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


function makeSKiller(){
	'use strict';

	var disX = -120, disY = 120;

	materialSKiller = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

	for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 5; col++) {
        	createSKiller(disX, disY, 0);
			disX += 60;
 }
 disX = -120;
 disY += 50;
}
}

function createSKiller(x, y, z){
	'use strict';

	var sKiller = new THREE.Object3D();

	createBodySK(sKiller, 0, 0, 0);

	scene.add(sKiller);

	sKiller.position.x = x;
	sKiller.position.y = y;
	sKiller.position.z = z;

	sKiller.scale.x = sKillerWidth;
	sKiller.scale.y = sKillerHeight;
	sKiller.scale.z = sKillerDepth;
}

function createBodySK(obj, x, y, z){
	'use strict';
	var body = new THREE.Object3D();

	addCenterRectangle(body, 0, 0, 0);

	createArm(body, 2.5, -0.25, 0); //Right
	createArm(body, -2.5, -0.25, 0); //Left

	obj.add(body);
}

function createArm(obj, x, y, z){
	'use strict';
	var arm = new THREE.Object3D();


	add1arm(arm, 2.5, -0.25, 0); //Right
	add1arm(arm, -2.5, -0.25, 0); //Left

	create2Arm(arm, 3.75, -1, 0); //Righ
	create2Arm(arm, -3.75, -1, 0); //Left

	obj.add(arm);
}

function create2Arm(obj, x, y, z){
	'use strict';
	var arm2 = new THREE.Object3D();

	add2arm(arm2, 3.75, -1, 0); //Right
	add2arm(arm2, -3.75, -1, 0); //Left

	createFinger(arm2, 4.50, -2.25, 0); 	// RR
	createFinger(arm2, 3, -2.25, 0);    	// RL
	createFinger(arm2, -3, -2.25, 0);   	// LR
	createFinger(arm2, -4.50, -2.25, 0);	// LL

	obj.add(arm2);
}

function createFinger(obj, x, y, z){
	'use strict';
	var finger = new THREE.Object3D();

	addFinger(finger, 4.50, -2.25, 0); 	// RR
	addFinger(finger, 3, -2.25, 0);    	// RL
	addFinger(finger, -3, -2.25, 0);   	// LR
	addFinger(finger, -4.50, -2.25, 0);	// LL

	obj.add(finger);
}

function addCenterRectangle(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(3.5, 4, 3.5);
	mesh = new THREE.Mesh(geometry, materialSKiller);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function add1arm(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(1.5, 1.5, 2.5);
	mesh = new THREE.Mesh(geometry, materialSKiller);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function add2arm(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(1, 2, 1.5);
	mesh = new THREE.Mesh(geometry, materialSKiller);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addFinger(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(0.5, 1.5, 0.5);
	mesh = new THREE.Mesh(geometry, materialSKiller);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function onResize(){
	'use strict';


    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
}

function render(){
	'use strict';

	// requestAnimationFrame( render );

	// cube.rotation.x += 0.1;
	// cube.rotation.y += 0.1;

	renderer.render(scene, camera);

}

function createCamera(){
	'use strict';

	camera = new THREE.OrthographicCamera( width / -2, width / 2, height * 0.75, height * -0.25, 1, 1000 );

	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 70;

	camera.lookAt(scene.position);
}

function createScene(){
	'use strict';

	scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(10));

	makeSKiller();
	createShip(0,0,0);

}

function onKeyDown(e){
	'use strict';

	switch (e.keyCode) {
		case 65: //A     												//Clicar no "a" faz com que a nave nunca mais de para mecher:
		case 97: //a
			materialSKiller.wireframe = !materialSKiller.wireframe;
			materialShip.wireframe = !materialShip.wireframe;				
			break;

		case 37: // <-
			ship.acceleration = -0.00001;
			if (!ship.moveStartTime) {
				ship.moveStartTime = new Date();
			}
			//ship.rotation.z = 0.3
			// ship.rotateX(PI/150);
			break;
		case 39:  // ->
			ship.acceleration = 0.00001;
			if (!ship.moveStartTime) {
				ship.moveStartTime = new Date();
			}
			// ship.rotateX(-PI/150);
			//ship.rotation.z = -0.3
			break;
	}
}

function onKeyUp(e){
	'use strict';

	ship.acceleration = -ship.acceleration;
	ship.moveStopTime = new Date();

}

function animate() {
    'use strict';

	ship.move(ship);
	/*
     if (obj.prop.jumping)
         obj..step += 0.04; XXXXXXXX
         now = Date();
        delta = now - oldClock;
         oldClock = now;

     */
	 render();
	 requestAnimationFrame(animate);
}

function init(){
	'use strict';

	renderer = new THREE.WebGLRenderer({ antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio( width / height );
	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}
