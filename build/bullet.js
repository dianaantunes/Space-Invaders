/*==========================================================================================================
	Bullet code
============================================================================================================*/

function Bullet(x, y, z) {
	var radius = 0;
	Movable.call(this, x, y, z, 0, 0.01, 0, 0);

	materialBullet = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

	createBodyBullet(this, 0, 0, 0);
	this.scale.x = bulletWidth;
	this.scale.y = bulletHeight;
	this.scale.z = bulletDepth;

	this.moveStartTime = new Date();

	scene.add(this);
}

function createBodyBullet(obj, x, y, z){
	'use strict';
	var body = new THREE.Object3D();

	addBulletCylinder(body, 0, 0, 0);

	obj.add(body);
}

function addBulletCylinder(obj, x, y, z){
	'use strict';
	geometry = new THREE.CylinderGeometry(0.5, 0.5, 3.5, 32);
	mesh = new THREE.Mesh(geometry, materialBullet);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

// Create a Bullet.prototype object that inherits from Movable.prototype.
Bullet.prototype = Object.create(Movable.prototype);

// Set the constructor properly to refer to Bullet
Bullet.prototype.constructor = Bullet;
