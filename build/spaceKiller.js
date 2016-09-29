var camera, scene, renderer;
var geometry, material, mesh;
var ball;

var sKillerWidth = 5;
var sKillerHeight = 5;
var sKillerDepth = 5;


function makeSKiller(){
	'use strict';

	// var disX = -120, disY = 120;
	var disX = 0, disY = 0;
	for (var row = 0; row < 1; row++) {
        for (var col = 0; col < 1; col++) {
        	createSKiller(disX, disY, 0);
			disX += 60;
 }
 disX = 0;
 // disX = -120;
 disY += 50;
}
}

function createSKiller(x, y, z){
	'use strict';

	var sKiller = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
	
	createBodySK(sKiller, 0, 0, 0);

	scene.add(sKiller);

	sKiller.position.x = x;
	sKiller.position.y = y;
	sKiller.position.z = z;

	sKiller.scale.x = sKillerWidth;
	sKiller.scale.y = sKillerHeight;
	sKiller.scale.z = sKillerDepth;
}

function createBodySK(obj, x, y, z){
	'use strict';
	var body = new THREE.Object3D();

	addCenterRectangle(body, 0, 0, 0);

	createArm(body, 2.5, -0.25, 0); //Right
	createArm(body, -2.5, -0.25, 0); //Left
	
	obj.add(body);
}

function createArm(obj, x, y, z){
	'use strict';
	var arm = new THREE.Object3D();

	add1arm(arm, 2.5, -0.25, 0); //Right
	add1arm(arm, -2.5, -0.25, 0); //Left

	create2Arm(arm, 3.75, -1, 0); //Righ
	create2Arm(arm, -3.75, -1, 0); //Left
	
	obj.add(arm);
}

function create2Arm(obj, x, y, z){
	'use strict';
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
	'use strict';
	var finger = new THREE.Object3D();

	addFinger(finger, 4.50, -2.25, 0); 	// RR
	addFinger(finger, 3, -2.25, 0);    	// RL
	addFinger(finger, -3, -2.25, 0);   	// LR
	addFinger(finger, -4.50, -2.25, 0);	// LL
	
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
	geometry = new THREE.CubeGeometry(1.5, 1.5, 2.5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function add2arm(obj, x, y, z){
	'use strict';
	geometry = new THREE.CubeGeometry(1, 2, 1.5);
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

	if (window.innerHeight > 0 && window.innerWidth > 0){
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();
	}
}

function render(){
	'use strict';

	renderer.render(scene, camera);

}

function createCamera(){
	'use strict';

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight , 1, 1000);

	//camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
	
	camera.position.x = 50;
	camera.position.y = 50;
	camera.position.z = 50;
	camera.lookAt(scene.position);
}

function createScene(){
	'use strict';

	scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(10));

	makeSKiller();

}

function onKeyDown(e){
	'use strict';

	switch (e.keyCode) {
		case 65: //A
		case 97: //a
			scene.traverse(function(node){
				if (node instanceof THREE.Mesh){
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
	}

	render();
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
	window.addEventListener("keydown", onKeyDown);
}