/*==========================================================================================================
	Funcional code
============================================================================================================*/

function onResize(){
	'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    aspectRatio = window.innerWidth/window.innerHeight;

    ortographicCamera.left = aspectRatio * viewSize / -2;
    ortographicCamera.right = aspectRatio * viewSize / 2;
    ortographicCamera.top = viewSize * 0.75;
    ortographicCamera.bottom = viewSize * -0.25;

    ortographicCamera.updateProjectionMatrix();
}

function render(){
	'use strict';

	renderer.render(scene, currentCamera);
}

function createOrtographicCamera(){
	'use strict';

	viewSize = 900;
	aspectRatio = window.innerWidth/window.innerHeight;

	ortographicCamera = new THREE.OrthographicCamera( aspectRatio*viewSize / -2, aspectRatio*viewSize / 2, viewSize * 0.75, viewSize * -0.25, 1, 1000 );

	ortographicCamera.position.x = 0;
	ortographicCamera.position.y = 0;
	ortographicCamera.position.z = 50;

	ortographicCamera.lookAt(scene.position);
}

function createPerspectiveCamera1() {
	'use strict';

	perspectiveCamera1 = new THREE.PerspectiveCamera(60, aspectRatio, 1, 1000);

	perspectiveCamera1.position.x = 0;
	perspectiveCamera1.position.y = -70;
	perspectiveCamera1.position.z = 20;

	perspectiveCamera1.lookAt(ship.position);  //Adjust look at to in between ship and aliens
}

function createPerspectiveCamera2() {
	'use strict';

	perspectiveCamera2 = new THREE.PerspectiveCamera(90, aspectRatio, 1, 1000);

	perspectiveCamera2.position.x = 0;
	perspectiveCamera2.position.y = -70;
	perspectiveCamera2.position.z = 20;

	perspectiveCamera2.lookAt(ship.position); //Adjust look at to in between ship and aliens
}

function createScene(){
	'use strict';

	scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(10));

	makeSKiller();
	ship = new Ship(0,0,0);
}

//Keyboard events Reading

function onKeyDown(e){
	'use strict';

	switch (e.keyCode) {
		case 65: //A
		case 97: //a
			materialSKiller.wireframe = !materialSKiller.wireframe;
			materialShip.wireframe = !materialShip.wireframe;
			materialBullet.wireframe = !materialBullet.wireframe;
			break;

		case 37: // <-
			ship.accelerationX = -0.0005;
			if (!ship.moveStartTime) {
				ship.moveStartTime = 1;
			}
			//ship.rotation.z = 0.3
			// ship.rotateX(PI/150);
			break;
		case 39:  // ->
			ship.accelerationX = 0.0005;
			if (!ship.moveStartTime) {
				ship.moveStartTime = 1;
			}
			// ship.rotateX(-PI/150);
			//ship.rotation.z = -0.3
			break;

		case 66: // B
		case 98: // b
		 	new Bullet(ship.position.x,0,0);
			break;
		case 49: // 1
			currentCamera = ortographicCamera;
			break;
		case 50: // 2
			currentCamera = perspectiveCamera1;
			break;
		case 51: // 3
			currentCamera = perspectiveCamera2;
			break;
	}
}

function onKeyUp(e){
	'use strict';
	switch (e.keyCode){
		case 37:
		case 39:
			ship.accelerationX = -ship.accelerationX;
			ship.moveStopTime = 1;
			break;
	}
}

function animate() {
    'use strict';
	var tentative_pos;
	var now, delta;

	now = new Date().getTime();
	delta = now - t;
	t = now;

	tentative_pos = ship.move(delta);
	ship.detectCollision(ship, tentative_pos);
	perspectiveCamera1.position.x = ship.position.x;

	scene.traverse(function (node) {
		if (node instanceof SKiller || node instanceof Bullet) {
			tentative_pos = node.move(delta);
			node.detectCollision(node, tentative_pos);
		}
	})

	render();
	requestAnimationFrame(animate);
}

function init(){
	'use strict';

	renderer = new THREE.WebGLRenderer({ antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	createScene();
	createOrtographicCamera();
	createPerspectiveCamera1();
	createPerspectiveCamera2();

	currentCamera = ortographicCamera;
	t = new Date().getTime();

	render();
	animate();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}
