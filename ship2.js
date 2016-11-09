/*===========================================================================================================
#
#
#   2ª Entrega  -  28/10
#
#
============================================================================================================*/

/*==========================================================================================================
	Ship code
============================================================================================================*/

function createBody(obj, x, y, z){
	'use strict';
	var vertices = [new THREE.Vector3(0,0,2),
					new THREE.Vector3(0,-5,0),
					new THREE.Vector3(4,-2,0),
					new THREE.Vector3(4,2,0),
					new THREE.Vector3(0,5,0),
					new THREE.Vector3(-4,2,0),
					new THREE.Vector3(-4,-2,0),
					new THREE.Vector3(2,0,1),
					new THREE.Vector3(2,2,1),
					new THREE.Vector3(-2,2,1)];
					console.log("vertices")
	var faces = [new THREE.Face3(0,1,2),
				 new THREE.Face3(0,2,7),
				 new THREE.Face3(0,7,3),
				 new THREE.Face3(7,2,3),
				 new THREE.Face3(0,3,8),
				 new THREE.Face3(0,8,4),
				 new THREE.Face3(8,3,4),
				 new THREE.Face3(0,4,9),
				 new THREE.Face3(0,9,5),
				 new THREE.Face3(9,4,5),
				 new THREE.Face3(0,5,6),
				 new THREE.Face3(0,6,1)];
	var geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.computeFaceNormals();
	var material = new THREE.MeshPhongMaterial({color: 0x0011ff});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
		mesh.rotateX(-PI/2);
	mesh.rotateZ(-PI/2);

	obj.add(mesh);
}

function addRightGun(obj, x, y, z){
	'use strict';
	var vertices = [new THREE.Vector3(2,2,1),
					new THREE.Vector3(4,2,0),
					new THREE.Vector3(0,5,0),
					new THREE.Vector3(2,10,0)];
					
	var faces = [new THREE.Face3(0,1,3),
				 new THREE.Face3(0,3,2)];

	var geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.computeFaceNormals();
	var material = new THREE.MeshPhongMaterial({color: 0x0011ff});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	mesh.rotateX(-PI/2);
	mesh.rotateZ(-PI/2)

	obj.add(mesh);
}

function addLeftGun(obj, x, y, z){
	'use strict';
	var vertices = [new THREE.Vector3(-2,2,1),
					new THREE.Vector3(-4,2,0),
					new THREE.Vector3(0,5,0),
					new THREE.Vector3(-2,10,0)];
					
	var faces = [new THREE.Face3(0,3,1),
				 new THREE.Face3(0,2,3)];

	var geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.computeFaceNormals();
	var material = new THREE.MeshPhongMaterial({color: 0x0011ff});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	mesh.rotateX(-PI/2);
	mesh.rotateZ(-PI/2)

	obj.add(mesh);
}

function addCockpit(obj, x, y, z){
	'use strict';
	var vertices = [new THREE.Vector3(2,0,1),
					new THREE.Vector3(4,-2,0),
					new THREE.Vector3(4,2,0),
					new THREE.Vector3(6,3,1)];
					
	var faces = [new THREE.Face3(0,1,3),
				 new THREE.Face3(0,3,2),
				 new THREE.Face3(2,3,1)];

	var geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.computeFaceNormals();
	var material = new THREE.MeshPhongMaterial({color: 0x0011ff});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
		mesh.rotateX(-PI/2);
	mesh.rotateZ(-PI/2)

	obj.add(mesh);
}

/*==========================================================================================================
	Object methods
============================================================================================================*/

// Define the Ship constructor
function Ship(x, y, z) {
	// Call the parent constructor, making sure (using call)
	// that "this" is ser correctly during the call
	var radius = 10;
	var lambertMaterial = new THREE.MeshLambertMaterial({color: 0x0011ff});
	var phongMaterial = new THREE.MeshPhongMaterial({color: 0x0011ff});
	var basicMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});

	materialShip = [basicMaterial, lambertMaterial, phongMaterial]

	Movable.call(this, x, y, z, 0, 0, 0, radius);
	// Initialize our Ship specific properties
	createBody(this, 0, 0, 0);
	addRightGun(this, 0, 0, 0);
	addLeftGun(this, 0, 0, 0);
	addCockpit(this, 0, 0, 0);

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

Ship.prototype.detectCollision = function(self, tentative_pos) {

	var update = 1;
	/*==========================================================================
		Colision with the wall
	==========================================================================*/
	if (tentative_pos[0] + self.radius > (width/2)) {
		// Ship colliding with walls
		stopMovement(self);
		self.position.x = (width/2) - self.radius;
		update = 0;
	} else if (tentative_pos[0] - self.radius < -(width/2)) {
		// Ship colliding with walls
		stopMovement(self);
		self.position.x = self.radius - (width/2);
		update = 0;
	}
	/*==========================================================================
		Update the position
	==========================================================================*/
	if (update){
		// Update the position if no colision was found
		self.position.x = tentative_pos[0];
		self.position.y = tentative_pos[1];
	}
	// Return the objects to remove from the scene.
	// The ship isn't removed, so we return NULL.
	return [null, null];
}
