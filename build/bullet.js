/*===========================================================================================================
#
#
#   2ª Entrega  -  28/10
#
#
============================================================================================================*/

/*==========================================================================================================
	Bullet code
============================================================================================================*/

function Bullet(x, y, z) {

	Movable.call(this, x, y, z, 0, 0.1, 0, 7);

	materialBullet = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
	createBodyBullet(this, 0, 0, 0);
	this.scale.x = bulletWidth;
	this.scale.y = bulletHeight;
	this.scale.z = bulletDepth;
	this.moveStart = 1;
	scene.add(this);
}

function createBodyBullet(obj, x, y, z){
	var body = new THREE.Object3D();
	addBulletCylinder(body, 0, 0, 0);
	obj.add(body);
}

function addBulletCylinder(obj, x, y, z){
	geometry = new THREE.CylinderGeometry(0.5, 0.5, 3.5, 32);
	mesh = new THREE.Mesh(geometry, materialBullet);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

/*==========================================================================================================
	Object methods
============================================================================================================*/

// Create a Bullet.prototype object that inherits from Movable.prototype.
Bullet.prototype = Object.create(Movable.prototype);

// Set the constructor properly to refer to Bullet
Bullet.prototype.constructor = Bullet;

Bullet.prototype.detectCollision = function(self, tentative_pos) {

	var update = 1;	// A flag to check if the position will be updated
	var toRemove = [null, null];	// A vector to store the objects to remove
	/*==========================================================================
		Colision with the wall
	==========================================================================*/
	if (tentative_pos[1] + self.radius > (height * 0.75)) {
		// If the bullet left the game board
		update = 0;
		toRemove[0] = self;
	}
	/*==========================================================================
		Colision with another alien
	==========================================================================*/
	scene.traverse(function (node) {
		if (node instanceof SKiller) {
			if (checkLimits(self, node, tentative_pos) && update) {
				// If the bullet collided with an alien
				update = 0;
				toRemove[0] = self;
				toRemove[1] = node;
			}
		}
	});
	/*==========================================================================
		Update the position
	==========================================================================*/
	if (update){
		// Update the position if no colision was found
		self.position.x = tentative_pos[0];
		self.position.y = tentative_pos[1];
	}
	// Return the objects to remove from the scene
	return toRemove;
}
