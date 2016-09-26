var camera, scene, renderer;
var geometry, material, mesh;
var ball;

// var sKillerWidth = 5;
// var sKillerHeight = 5;
// var sKillerDepth = 5;

function makeSKiller(){
	'use strict'

	var disZ = 0, disY = 0;
	for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
        	createSKiller(0, disY, disZ);
			disZ += 15;
 }
 disZ = 0;
 disY += 10;
}
}

function createSKiller(x, y, z){
	'use strict';

	var sKiller = new THREE.Object3D();
	
	createBody(sKiller, 0, 0, 0);

	scene.add(sKiller);

	sKiller.position.x = x;
	sKiller.position.y = y;
	sKiller.position.z = z;

	// sKiller.scale.x = sKillerWidth;
	// sKiller.scale.y = sKillerHeight;
	// sKiller.scale.z = sKillerDepth;
}

function createBody(obj, x, y, z){
	'use strict';
	var body = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

	addCenterRectangle(body, 0, 0, 0);

	createArm(body, 0, -0.25, 2.5); //Right
	createArm(body, 0, -0.25, -2.5); //Left
	
	obj.add(body);
}

function createArm(obj, x, y, z){
	'use strict';
	var arm = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

	add1arm(arm, 0, -0.25, 2.5); //Right
	add1arm(arm, 0, -0.25, -2.5); //Left

	create2Arm(arm, 0, -1, 3.75); //Righ
	create2Arm(arm, 0, -1, -3.75); //Left
	
	obj.add(arm);
}

function create2Arm(obj, x, y, z){
	'use strict';
	var arm2 = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

	add2arm(arm2, 0, -1, 3.75); //Right
	add2arm(arm2, 0, -1, -3.75); //Left

	createFinger(arm2, 0, -2.25, 4.50); 	// RR
	createFinger(arm2, 0, -2.25, 3);    	// RL
	createFinger(arm2, 0, -2.25, -3);   	// LR
	createFinger(arm2, 0, -2.25, -4.50);	// LL
	
	obj.add(arm2);
}

function createFinger(obj, x, y, z){
	'use strict';
	var finger = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

	addFinger(finger, 0, -2.25, 4.50); 	// RR
	addFinger(finger, 0, -2.25, 3);    	// RL
	addFinger(finger, 0, -2.25, -3);   	// LR
	addFinger(finger, 0, -2.25, -4.50);	// LL
	
	obj.add(finger);
}

function addCenterRectangle(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(3.5, 4, 3.5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function add1arm(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(2.5, 1.5, 1.5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function add2arm(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(1.5, 2, 1);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addFinger(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(0.5, 1.5, 0.5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function onResize(){
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function render(){
	'use strict';

	renderer.render(scene, camera);

}

function createCamera(){
	'use strict';

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	
	camera.position.x = 50;
	camera.position.y = 50;
	camera.position.z = 50;
	camera.lookAt(scene.position);
}

function createScene(){
	'use strict';

	scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(10));

	makeSKiller()

}

function init(){
	'use strict';

	renderer = new THREE.WebGLRenderer({ antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	render();

	window.addEventListener("resize", onResize);
}