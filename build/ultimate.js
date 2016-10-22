/*===========================================================================================================
#   2ª Entrega  -  28/10
#
#   Calculo de velocidade é so num objeto:
#   Superclase "movable" tem velocidade, aceleraçao, funcao move, funcao detectColision.
#   Nave, aliens, tiro derivam dessa classe
#
#   Colisão detetada por esfera
#
#
#
============================================================================================================*/

var currentCamera, ortographicCamera, perspectiveCamera1, perspectiveCamera2;
var scene, renderer;
var geometry, mesh;
var ship;

var materialSKiller, materialShip;

var aspectRatio, viewSize;

var width = 1000;
var height = 600;

var sKillerWidth = 5;
var sKillerHeight = 5;
var sKillerDepth = 5;

var shipWidth = 5;
var shipHeight = 5;
var shipDepth = 5;

const PI = Math.PI;

/*==========================================================================================================
	Math code
============================================================================================================*/

function getRandomSpeed() {
    // Tottaly random between [-0.0001, 0.0001]
	return Math.random() * 0.0002 - 0.0001;
}


/*==========================================================================================================
	Movable superclass
============================================================================================================*/

// We define classes as functions
var Movable = function(x, y, z, speedX, speedY, acceleration) {
	THREE.Object3D.call(this);
	this.moveStartTime = null;
	this.moveStopTime = null;
	this.position.x = x;
	this.position.y = y;
	this.position.z = z;
	this.speedX = speedX;
	this.speedY = speedY;
	this.accelerationX = acceleration;
	this.accelerationY = 0;
};

// Create a Movable.prototype object that inherits from Object3D.prototype.
// Note: A common error here is to use "new Object3D()" to create the
// Movable.prototype. The correct place to call Object3D is above, where we call
// it from Movable.
Movable.prototype = Object.create(THREE.Object3D.prototype);

// Set the constructor properly to refer to Movable
Movable.prototype.constructor = Movable;

// We add a couple of methods
Movable.prototype.move = function() {

	'use strict';
	var delta;
	var now;
	var currentPositionX;
	var currentPositionY;
	var currentSpeedX;
	var currentSpeedY;
	// x = x0 + v0t + (a * t^2) / 2
	// v = v0 + at

	now = new Date().getTime();

	currentPositionX = this.position.x;
	currentPositionY = this.position.y;
	currentSpeedX = this.speedX;
	currentSpeedY = this.speedY;

	maxSpeed();

	if (this.moveStartTime && this.moveStopTime) {

		delta = now - this.moveStartTime.getTime();
		this.speedX = currentSpeedX + this.accelerationX * delta;
		this.speedY = currentSpeedY + this.accelerationY * delta;
		this.position.x = currentPositionX + this.speedX * delta + (this.accelerationX * delta) / 4;
		this.position.y = currentPositionY + this.speedY * delta + (this.accelerationY * delta) / 4;

		if (this.speedX < 0.01 && this.speedX > -0.01) {
			this.speedX = 0;
			this.accelerationX = 0;
			this.moveStartTime = null;
			this.moveStopTime = null;
		}
	}
	else if (this.moveStartTime){

		delta = now - this.moveStartTime.getTime();
		this.position.x = currentPositionX + this.speedX * delta + (this.accelerationX * delta) / 4;
		this.position.y = currentPositionY + this.speedY * delta + (this.accelerationY * delta) / 4;
		this.speedX = currentSpeedX + this.accelerationX * delta;
		this.speedY = currentSpeedY + this.accelerationY * delta;
	}

	maxSpeed();
}

Movable.prototype.detectColision = function() {
	// TODO
}

function maxSpeed(){
	if(ship.speedX > 0.02) ship.speedX = 0.02;
	else if(ship.speedX < -0.02) ship.speedX = -0.02;
}

/*==========================================================================================================

	Ship code
============================================================================================================*/

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

// Define the Ship constructor
function Ship(x, y, z) {
	// Call the parent constructor, making sure (using call)
	// that "this" is ser correctly during the call
	Movable.call(this, x, y, z, 0, 0, 0);

	// Initialize our Ship specific properties
	materialShip = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});

	createBody(this, 0, 0, 0);
	addLeftGun(this, 6, 0, -2.5);
	addRightGun(this, 6, 0, 2.5);
	addCockpit(this, 2, 0, 5);

	this.scale.x = shipWidth;
	this.scale.y = shipHeight;
	this.scale.z = shipDepth;
	this.rotateY(PI/2);
	this.rotateZ(PI/2);

	scene.add(this);
}

// Create a Ship.prototype object that inherits from Movable.prototype.
Ship.prototype = Object.create(Movable.prototype);

// Set the constructor properly to refer to Ship
Ship.prototype.constructor = Ship;

/*==========================================================================================================
	Space Killer code
============================================================================================================*/

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


// Define the Ship constructor
function SKiller(x, y, z) {
	// Call the parent constructor, making sure (using call)
	// that "this" is ser correctly during the call
	Movable.call(this, x, y, z, getRandomSpeed(), getRandomSpeed(), 0);

	createBodySK(this, 0, 0, 0);
	this.scale.x = sKillerWidth;
	this.scale.y = sKillerHeight;
	this.scale.z = sKillerDepth;

	this.moveStartTime = new Date();
	scene.add(this);
}

// Create a SKiller.prototype object that inherits from Movable.prototype.
SKiller.prototype = Object.create(Movable.prototype);

// Set the constructor properly to refer to SKiller
SKiller.prototype.constructor = SKiller;

function makeSKiller(){
	'use strict';

	var disX = -120, disY = 120;

	materialSKiller = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

	for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 5; col++) {
        	new SKiller(disX, disY, 0);
			disX += 60;
 		}
 		disX = -120;
 		disY += 50;
	}
}

/*==========================================================================================================
	Funcional code
============================================================================================================*/

function onResize(){
	'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    aspectRatio = window.innerWidth/window.innerHeight;

    ortographicCamera.left = aspectRatio * viewSize / -2;
    ortographicCamera.right = aspectRatio * viewSize / 2;
    ortographicCamera.top = viewSize * 0.75;
    ortographicCamera.bottom = viewSize * -0.25;

    ortographicCamera.updateProjectionMatrix();
}

function render(){
	'use strict';

	renderer.render(scene, currentCamera);
}

function createOrtographicCamera(){
	'use strict';

	viewSize = 900;
	aspectRatio = window.innerWidth/window.innerHeight;

	ortographicCamera = new THREE.OrthographicCamera( aspectRatio*viewSize / -2, aspectRatio*viewSize / 2, viewSize * 0.75, viewSize * -0.25, 1, 1000 );

	ortographicCamera.position.x = 0;
	ortographicCamera.position.y = 0;
	ortographicCamera.position.z = 50;

	ortographicCamera.lookAt(scene.position);
}

function createPerspectiveCamera1() {
	'use strict';

	perspectiveCamera1 = new THREE.PerspectiveCamera(60, aspectRatio, 1, 1000);

	perspectiveCamera1.position.x = 0;
	perspectiveCamera1.position.y = -70;
	perspectiveCamera1.position.z = 20;

	perspectiveCamera1.lookAt(ship.position);  //Adjust look at to in between ship and aliens
}

function createPerspectiveCamera2() {
	'use strict';

	perspectiveCamera2 = new THREE.PerspectiveCamera(90, aspectRatio, 1, 1000);

	perspectiveCamera2.position.x = 0;
	perspectiveCamera2.position.y = -70;
	perspectiveCamera2.position.z = 20;

	perspectiveCamera2.lookAt(ship.position); //Adjust look at to in between ship and aliens
}

function createScene(){
	'use strict';

	scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(10));

	makeSKiller();
	ship = new Ship(0,0,0);

}

//Keyboard events Reading

function onKeyDown(e){
	'use strict';

	switch (e.keyCode) {
		case 65: //A
		case 97: //a
			materialSKiller.wireframe = !materialSKiller.wireframe;
			materialShip.wireframe = !materialShip.wireframe;
			break;

		case 37: // <-
			ship.accelerationX = -0.00001;
			if (!ship.moveStartTime) {
				ship.moveStartTime = new Date();
			}
			//ship.rotation.z = 0.3
			// ship.rotateX(PI/150);
			break;
		case 39:  // ->
			ship.accelerationX = 0.00001;
			if (!ship.moveStartTime) {
				ship.moveStartTime = new Date();
			}
			// ship.rotateX(-PI/150);
			//ship.rotation.z = -0.3
			break;
		case 49: // 1
			currentCamera = ortographicCamera;
			break;
		case 50: // 2
			currentCamera = perspectiveCamera1;
			break;
		case 51: // 3
			currentCamera = perspectiveCamera2;
			break;
	}
}

function onKeyUp(e){
	'use strict';
	switch (e.keyCode){
		case 37:
		case 39:
			ship.accelerationX = -ship.accelerationX;
			ship.moveStopTime = new Date();
			break;
	}
}

function animate() {
    'use strict';

	ship.move();
	perspectiveCamera1.position.x = ship.position.x;
	scene.traverse(function (node) {
		if (node instanceof SKiller) {
			node.move();
		}
	})

	render();
	requestAnimationFrame(animate);
}

function init(){
	'use strict';

	renderer = new THREE.WebGLRenderer({ antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	createScene();
	createOrtographicCamera();
	createPerspectiveCamera1();
	createPerspectiveCamera2();

	currentCamera = ortographicCamera;

	render();
	animate();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}
