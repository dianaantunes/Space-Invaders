/*===========================================================================================================
#
#
#   2ª Entrega  -  28/10
#
#
============================================================================================================*/

/*==========================================================================================================
	Space Killer code
============================================================================================================*/

function makeSKiller(){

	var disX = -240, disY = 120;

	materialSKiller = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

	for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 5; col++) {
        	new SKiller(disX, disY, 0);
			disX += 120;
 		}
 		disX = -240;
 		disY += 50;
	}
}

function createBodySK(obj, x, y, z){

	var body = new THREE.Object3D();

	addCenterRectangle(body, 0, 0, 0);

	createArm(body, 2.5, -0.25, 0); //Right
	createArm(body, -2.5, -0.25, 0); //Left

	obj.add(body);
}

function createArm(obj, x, y, z){

	var arm = new THREE.Object3D();

	add1arm(arm, 2.5, -0.25, 0); //Right
	add1arm(arm, -2.5, -0.25, 0); //Left

	create2Arm(arm, 3.75, -1, 0); //Righ
	create2Arm(arm, -3.75, -1, 0); //Left

	obj.add(arm);
}

function create2Arm(obj, x, y, z){

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

	var finger = new THREE.Object3D();

	addFinger(finger, 4.50, -2.25, 0); 	// RR
	addFinger(finger, 3, -2.25, 0);    	// RL
	addFinger(finger, -3, -2.25, 0);   	// LR
	addFinger(finger, -4.50, -2.25, 0);	// LL

	obj.add(finger);
}

function addCenterRectangle(obj, x, y, z){

	geometry = new THREE.CubeGeometry(3.5, 4, 3.5);
	mesh = new THREE.Mesh(geometry, materialSKiller);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function add1arm(obj, x, y, z){

	geometry = new THREE.CubeGeometry(1.5, 1.5, 2.5);
	mesh = new THREE.Mesh(geometry, materialSKiller);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function add2arm(obj, x, y, z){

	geometry = new THREE.CubeGeometry(1, 2, 1.5);
	mesh = new THREE.Mesh(geometry, materialSKiller);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addFinger(obj, x, y, z){

	geometry = new THREE.CubeGeometry(0.5, 1.5, 0.5);
	mesh = new THREE.Mesh(geometry, materialSKiller);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

/*==========================================================================================================
	Object methods
============================================================================================================*/

// Define the Ship constructor
function SKiller(x, y, z) {
	// Call the parent constructor, making sure (using call)
	// that "this" is ser correctly during the call
	Movable.call(this, x, y, z, getRandomSpeed(), getRandomSpeed(), 0, 6);

	createBodySK(this, 0, 0, 0);
	this.scale.x = sKillerWidth;
	this.scale.y = sKillerHeight;
	this.scale.z = sKillerDepth;
	this.radius *= sKillerWidth;
	this.moveStart = 1;
	scene.add(this);
}
// Create a SKiller.prototype object that inherits from Movable.prototype.
SKiller.prototype = Object.create(Movable.prototype);

// Set the constructor properly to refer to SKiller
SKiller.prototype.constructor = SKiller;

SKiller.prototype.detectCollision = function(self, tentative_pos) {

	var update = 1; // A flag to check if the position will be updated
	/*==========================================================================
		Colision with the wall
	==========================================================================*/
	if ((tentative_pos[0] + self.radius) > (width/2) ||
		(tentative_pos[0] - self.radius) < -(width/2)) {
		// If the alien collided with the game board
		self.speedX *= -1;
		update = 0;
	} else if ((tentative_pos[1] + self.radius) > (height * 0.75) ||
			   (tentative_pos[1] - self.radius) < -(height * 0.25)) {
		// If the alien collided with the game board
		self.speedY *= -1;
		update = 0;
	}
	/*==========================================================================
		Colision with another alien
	==========================================================================*/
	scene.traverse(function (node) {
		if (node instanceof SKiller && node !== self ) {
			if ( checkLimits(self, node, tentative_pos) ) {
				// If the alien collided with an alien
				self.speedX *= -1;
				node.speedX *= -1;
				self.speedY *= -1;
				node.speedY *= -1;
				update = 0;
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
	// Return the objects to remove from the scene.
	// No aliens are removed, so we return NULL.
	return [null, null];
}
