/*==============================================================================
#
#
#   3ª Entrega  -  11/11
#
#
==============================================================================*/

/*==============================================================================
	Mesh superclass
==============================================================================*/

// We define classes as functions
var Mesh = function(geometry, material) {
// material[0] = basic, material[1] = lambert, material[2] = phong

	THREE.Mesh.call(this, geometry, material[0]);

	this.basicMaterial = material[0];
	this.lambertMaterial = material[1];
	this.phongMaterial = material[2];

	this.material = this.phongMaterial;
};

// Create a Mesh.prototype object that inherits from Object3D.prototype.
// Note: A common error here is to use "new Object3D()" to create the
// Mesh.prototype. The correct place to call Object3D is above, where we call
// it from Movable.
Mesh.prototype = Object.create(THREE.Mesh.prototype);
// Set the constructor properly to refer to Mesh
Mesh.prototype.constructor = Mesh;
