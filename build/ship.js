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
	var radius = 9.22;
	Movable.call(this, x, y, z, 0, 0, 0, radius);
	// Initialize our Ship specific properties
	materialShip = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});

	createBody(this, 0, 0, 0);
	addLeftGun(this, 6, 0, -2.5);
	addRightGun(this, 6, 0, 2.5);
	addCockpit(this, 2, 0, 5);

	this.scale.x = shipWidth;
	this.scale.y = shipHeight;
	this.scale.z = shipDepth;
	this.radius *= shipWidth;

	this.rotateY(PI/2);
	this.rotateZ(PI/2);

	scene.add(this);
}

// Create a Ship.prototype object that inherits from Movable.prototype.
Ship.prototype = Object.create(Movable.prototype);

// Set the constructor properly to refer to Ship
Ship.prototype.constructor = Ship;
