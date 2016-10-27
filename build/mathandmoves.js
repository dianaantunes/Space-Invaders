/*==========================================================================================================
	Math code
============================================================================================================*/

function getRandomSpeed() {
	return Math.random() * 0.01 - 0.005;
}


/*==========================================================================================================
	Movable superclass
============================================================================================================*/

// We define classes as functions
var Movable = function(x, y, z, speedX, speedY, acceleration, radius) {
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
	this.radius = radius;
};

// Create a Movable.prototype object that inherits from Object3D.prototype.
// Note: A common error here is to use "new Object3D()" to create the
// Movable.prototype. The correct place to call Object3D is above, where we call
// it from Movable.
Movable.prototype = Object.create(THREE.Object3D.prototype);

// Set the constructor properly to refer to Movable
Movable.prototype.constructor = Movable;

// We add a couple of methods
Movable.prototype.move = function(delta) {

	'use strict';
	var currentPositionX;
	var currentPositionY;
	var currentSpeedX;
	var currentSpeedY;
	// x = x0 + v0t + (a * t^2) / 2
	// v = v0 + at

	currentPositionX = this.position.x;
	currentPositionY = this.position.y;
	currentSpeedX = this.speedX;
	currentSpeedY = this.speedY;

	maxSpeed();

	if (this.moveStartTime && this.moveStopTime) {

		this.speedX = currentSpeedX + this.accelerationX * delta;
		this.speedY = currentSpeedY + this.accelerationY * delta;
		currentPositionX  = currentPositionX + this.speedX * delta + Math.pow((this.accelerationX * delta)/2, 2);
		currentPositionY  = currentPositionY + this.speedY * delta + Math.pow((this.accelerationY * delta)/2, 2);

		if (this.speedX < 0.01 && this.speedX > -0.01) {
			this.speedX = 0;
			this.accelerationX = 0;
			this.moveStartTime = null;
			this.moveStopTime = null;
		}
	}
	else if (this.moveStartTime){

		currentPositionX = currentPositionX + this.speedX * delta + Math.pow((this.accelerationX * delta)/2, 2);
		currentPositionY = currentPositionY + this.speedY * delta + Math.pow((this.accelerationY * delta)/2, 2);
		this.speedX = currentSpeedX + this.accelerationX * delta;
		this.speedY = currentSpeedY + this.accelerationY * delta;
	}

	maxSpeed();

	return [currentPositionX, currentPositionY];
}

Movable.prototype.detectCollision = function(self, tentative_pos) {

	var noUpdate = 0;
	// Ship colliding with walls
	if (self instanceof Ship) {
		if (tentative_pos[0] + self.radius > (width/2)) {
			self.position.x = (width/2) - self.radius;
			self.speedX = 0;
			self.accelerationX = 0;
			self.moveStopTime = null;
			self.moveStartTime = null;
			noUpdate = 1;
		} else if (tentative_pos[0] - self.radius < -(width/2)) {
			self.position.x = self.radius -(width/2);
			self.speedX = 0;
			self.accelerationX = 0;
			self.moveStopTime = null;
			self.moveStartTime = null;
			noUpdate = 1;
		}
	}

	// Alien colliding with walls
	else if (self instanceof SKiller) {

		if ((tentative_pos[0] + self.radius) > (width/2)) {
			self.speedX *= -1;
			noUpdate = 1;
		} else if ((tentative_pos[0] - self.radius) < -(width/2)) {
			self.speedX *= -1;
			noUpdate = 1;
		} else if ((tentative_pos[1] + self.radius) > (height * 0.75)) {
			self.speedY *= -1;
			noUpdate = 1;
		} else if ((tentative_pos[1] - self.radius) < -(height * 0.25)) {
			self.speedY *= -1;
			noUpdate = 1;
		}

		scene.traverse(function (node) {
			if (node instanceof SKiller && node !== self ) {
				if (
					((self.radius + node.radius) * (self.radius + node.radius)) >=
					(((tentative_pos[0] - node.position.x) * (tentative_pos[0] - node.position.x)) +
				 	((tentative_pos[0] - node.position.x) * (tentative_pos[0] - node.position.x)))
					&&
					((self.radius + node.radius) * (self.radius + node.radius)) >=
						(((tentative_pos[1] - node.position.y) * (tentative_pos[1] - node.position.y)) +
					 	((tentative_pos[1] - node.position.y) * (tentative_pos[1] - node.position.y)))
				) {
					self.speedX *= -1;
					node.speedX *= -1;
					self.speedY *= -1;
					node.speedY *= -1;
					noUpdate = 1;
				}
			}
		});
	}

	// Bullet
	else if (self instanceof Bullet) {

		scene.traverse(function (node) {

			if (node instanceof SKiller) {
				if (
					((self.radius + node.radius) * (self.radius + node.radius)) >=
					(((tentative_pos[0] - node.position.x) * (tentative_pos[0] - node.position.x)) +
				 	((tentative_pos[0] - node.position.x) * (tentative_pos[0] - node.position.x)))
					&&
					((self.radius + node.radius) * (self.radius + node.radius)) >=
						(((tentative_pos[1] - node.position.y) * (tentative_pos[1] - node.position.y)) +
					 	((tentative_pos[1] - node.position.y) * (tentative_pos[1] - node.position.y)))
				) {
					node.position.x = 1000;
					self.position.x = 1000;
					noUpdate = 1;
				}
			}
		});

	}

	if (!noUpdate){
		self.position.x = tentative_pos[0];
		self.position.y = tentative_pos[1];
	}

}

function maxSpeed(){
	if(ship.speedX > 0.3) ship.speedX = 0.3;
	else if(ship.speedX < -0.3) ship.speedX = -0.3;
}
