/*===========================================================================================================
#
#
#   2ª Entrega  -  28/10
#
#
============================================================================================================*/

/*==========================================================================================================
	Math code and useful functions
============================================================================================================*/

function getRandomSpeed() {
	return Math.random() * 0.02 - 0.01;
}

function maxSpeed(obj){
	if(obj.speedX > 0.3) obj.speedX = 0.3;
	else if(obj.speedX < -0.3) obj.speedX = -0.3;
}

function checkLimits(obj1, obj2, tentative_pos) {

	return (
	( Math.pow ((obj1.radius + obj2.radius), 2) >=
	( Math.pow((tentative_pos[0] - obj2.position.x), 2) +
	  Math.pow((tentative_pos[0] - obj2.position.x), 2))) &&
	( Math.pow ((obj1.radius + obj2.radius), 2) >=
  	( Math.pow((tentative_pos[1] - obj2.position.y), 2) +
  	  Math.pow((tentative_pos[1] - obj2.position.y), 2)))
	);

}

function stopMovement(obj) {
	obj.speedX = 0;
	obj.accelerationX = 0;
	obj.moveStop = 0;
	obj.moveStart = 0;
}

/*==========================================================================================================
	Movable superclass
============================================================================================================*/

// We define classes as functions
var Movable = function(x, y, z, speedX, speedY, acceleration, radius) {

	THREE.Object3D.call(this);

	this.moveStart = 0;
	this.moveStop = 0;

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

	if (this.moveStart && this.moveStop) {
		// If the object is deaccelerating to stop
		this.speedX = currentSpeedX + this.accelerationX * delta;
		this.speedY = currentSpeedY + this.accelerationY * delta;
		currentPositionX  = currentPositionX + this.speedX * delta + Math.pow((this.accelerationX * delta)/2, 2);
		currentPositionY  = currentPositionY + this.speedY * delta + Math.pow((this.accelerationY * delta)/2, 2);

		if (this.speedX < 0.1 && this.speedX > -0.1) {
			stopMovement(this);
		}
	}
	else if (this.moveStart){
		// If the object is accelerating or just moving
		this.speedX = currentSpeedX + this.accelerationX * delta;
		this.speedY = currentSpeedY + this.accelerationY * delta;
		currentPositionX = currentPositionX + this.speedX * delta + Math.pow((this.accelerationX * delta)/2, 2);
		currentPositionY = currentPositionY + this.speedY * delta + Math.pow((this.accelerationY * delta)/2, 2);

	}

	maxSpeed(ship);

	return [currentPositionX, currentPositionY];
}

Movable.prototype.detectCollision = function(self, tentative_pos) {
	// This function should be implemented in subclasses.
	// It receives the next position of the object. If no colision is found,
	// the object is positioned there. If a collision occured, the properly
	// treatment should be done
}
