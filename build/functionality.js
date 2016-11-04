/*===========================================================================================================
#
#
#   2ª Entrega  -  28/10
#
#
============================================================================================================*/

/*==========================================================================================================
	Funcional code
============================================================================================================*/

function onResize(){

    renderer.setSize(window.innerWidth, window.innerHeight);

    aspectRatio = window.innerWidth/window.innerHeight;

    ortographicCamera.left = aspectRatio * viewSize / -2;
    ortographicCamera.right = aspectRatio * viewSize / 2;
    ortographicCamera.top = viewSize * 0.75;
    ortographicCamera.bottom = viewSize * -0.25;

    ortographicCamera.updateProjectionMatrix();
}

function render(){
	renderer.render(scene, currentCamera);
}

function createOrtographicCamera(){

	aspectRatio = window.innerWidth/window.innerHeight;
	ortographicCamera = new THREE.OrthographicCamera( aspectRatio*viewSize / -2,
													  aspectRatio*viewSize / 2,
													  viewSize * 0.75,
													  viewSize * -0.25,
													  1,
													  1000 );

	ortographicCamera.position.x = 0;
	ortographicCamera.position.y = 0;
	ortographicCamera.position.z = 50;

	ortographicCamera.lookAt(scene.position);
}

function createPerspectiveCamera1() {

	perspectiveCamera1 = new THREE.PerspectiveCamera(60, aspectRatio, 1, 1000);

	perspectiveCamera1.position.x = 0;
	perspectiveCamera1.position.y = -70;
	perspectiveCamera1.position.z = 20;

	perspectiveCamera1.lookAt(ship.position);
}

function createPerspectiveCamera2() {

	perspectiveCamera2 = new THREE.PerspectiveCamera(90, aspectRatio, 1, 1000);

	perspectiveCamera2.position.x = 0;
	perspectiveCamera2.position.y = -70;
	perspectiveCamera2.position.z = 20;

	perspectiveCamera2.lookAt(ship.position);
}

function createScene(){

  directionalLight = new THREE.DirectionalLight( 0xffffff, 10 );
  directionalLight.position.set( 0, 100, 20 );

	scene = new THREE.Scene();
	ship = new Ship(0,0,0);
	makeSKiller();

  scene.add(directionalLight);
}

function shootBullet() {
	currentShot = new Date().getTime();
	if (currentShot - lastShot > MINBULLETTIME) {
		new Bullet(ship.position.x,0,0);
		lastShot = new Date().getTime();
	}78
}

//Keyboard events Reading

function onKeyDown(e){

	var currentShot;

	switch (e.keyCode) {
		case 65: //A
		case 97: //a
			materialSKiller.wireframe = !materialSKiller.wireframe;
			materialShip.wireframe = !materialShip.wireframe;
			materialBullet.wireframe = !materialBullet.wireframe;
			break;
		case 37: // <-
			if (!ship.moveStart && !ship.moveStop) {
				ship.accelerationX = -0.0005;
				ship.moveStart = 1;
				ship.moveStop = 0;
				ship.speedX = -0.001;
			}
			break;

		case 39:  // ->
			if (!ship.moveStart && !ship.moveStop) {
				ship.accelerationX = 0.0005;
				ship.moveStart = 1;
				ship.moveStop = 0;
				ship.speedX = 0.001;
			}
			break;

		case 66: // B
		case 98: // b
			shooting = 1;
			break;

    case 78: // N
    case 110: // n
      console.log("Switch Light");
      scene.remove(directionalLight);
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
	switch (e.keyCode){
		case 37:
		case 39:
			if (ship.moveStart && !ship.moveStop) {
				ship.accelerationX = -ship.accelerationX;
				ship.moveStop = 1;
			}
			break;
		case 66:
		case 98:
			shooting = 0;
			break;
	}
}

function animate() {

	var tentative_pos;
	var now, delta;
	var toRemove = [null, null];

	// Calculate delta time
	now = new Date().getTime();
	delta = now - t;
	t = now;

	// Shoot the bullet
	if (shooting) shootBullet();

	// Traverse the scene to update movements
	scene.traverse(function (node) {
		if (node instanceof SKiller ||
			node instanceof Bullet ||
			node instanceof Ship) {
			if(!toRemove[0] && !toRemove[1]) {
				// If there was no bullet colision already on this iteration
				tentative_pos = node.move(delta);
				toRemove = node.detectCollision(node, tentative_pos);
			}
		}
	})

	if(toRemove[0]) {
		// toRemove[0] has a value if a bullet left the scene or hit an alien
		scene.remove(toRemove[0]);
		if(toRemove[1])
			// toRemove[1] has a value if a bullet  hit an alien
			scene.remove(toRemove[1]);
		toRemove = [null, null]; // Restart the vector for the next iteration
	}

	perspectiveCamera1.position.x = ship.position.x;
	render();
	requestAnimationFrame(animate);
}

function init(){

	renderer = new THREE.WebGLRenderer({ antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	t = new Date().getTime();

	createScene();
	createOrtographicCamera();
	createPerspectiveCamera1();
	createPerspectiveCamera2();

	currentCamera = ortographicCamera;

	render();
	animate();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}
