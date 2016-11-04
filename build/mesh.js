/*===========================================================================================================
#
#
#   2ª Entrega  -  28/10
#
#
============================================================================================================*/

/*==========================================================================================================
	Mesh superclass
============================================================================================================*/

// We define classes as functions
var Mesh = function(color, material) {

	THREE.Mesh.call(this, geometry, material[0]);

	this.lambertMaterial = material[1];
	this.lambertMaterial.shading = THREE.FlatShading;

	this.phongMaterial = material[2];
	this.phongMaterial.shininess = 30;
	this.phongMaterial.shading = THREE.FlatShading;

	this.basicMaterial = material[0];

	this.material = this.lambertMaterial;
	this.material.wireframe = false;
};

// Create a Movable.prototype object that inherits from Object3D.prototype.
// Note: A common error here is to use "new Object3D()" to create the
// Movable.prototype. The correct place to call Object3D is above, where we call
// it from Movable.
Mesh.prototype = Object.create(THREE.Mesh.prototype);
// Set the constructor properly to refer to Movable
Mesh.prototype.constructor = Mesh;
