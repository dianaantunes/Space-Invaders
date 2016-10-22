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