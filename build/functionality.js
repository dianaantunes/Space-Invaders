/*==============================================================================
#
#
#   3ª Entrega  -  11/11
#
#
==============================================================================*/

/*==============================================================================
	Funcional code
==============================================================================*/


function onResize(){

    renderer.setSize(window.innerWidth, window.innerHeight);

    aspectRatio = window.innerWidth/window.innerHeight;

    ortographicCamera.left = aspectRatio * viewSize / -2;
    ortographicCamera.right = aspectRatio * viewSize / 2;
    ortographicCamera.top = viewSize * 0.75;
    ortographicCamera.bottom = viewSize * -0.25;

    ortographicCamera.updateProjectionMatrix();

	perspectiveCamera1.aspect = aspectRatio;
	perspectiveCamera2.aspect = aspectRatio;
	perspectiveCamera1.updateProjectionMatrix();
	perspectiveCamera2.updateProjectionMatrix();
}

function render(){
	renderer.clear();
	renderer.setViewport(0, 0, 100, window.innerHeight);	
	renderer.setScissor(0, 0, 100, window.innerWidth );
	renderer.setScissorTest(true);
	renderer.render(scene, ortographicCamera2);

	renderer.setViewport(100, 0, window.innerWidth, window.innerHeight);
	renderer.setScissor(0, 0, window.innerWidth, window.innerWidth );
	renderer.setScissorTest(true);
	renderer.render(scene, currentCamera);
}

function createOrtographicCamera(){

	aspectRatio = window.innerWidth/window.innerHeight;
	//TODO replace 100 with a relative value
	ortographicCamera = new THREE.OrthographicCamera( aspectRatio*viewSize / -2 + 100,
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

function createOrtographicCamera2(){

	aspectRatio = window.innerWidth/window.innerHeight;
	//TODO replace 100 with a relative value
	ortographicCamera2 = new THREE.OrthographicCamera( aspectRatio*viewSize / -2,
													  aspectRatio*viewSize / -2 + 100,
													  viewSize * 0.75,
													  viewSize * -0.25,
													  1,
													  1000 );

	ortographicCamera2.position.x = 0;
	ortographicCamera2.position.y = 0;
	ortographicCamera2.position.z = 50;

	ortographicCamera2.lookAt(scene.position);
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

function createSpotlight() {

	spotlight = new THREE.SpotLight( 0xffffff, 10, 400, Math.PI/4);

	spotlight.position.set( 0, -20, 5);
	scene.add( spotlight );

	spotlight.target = ship;
	scene.add( spotlight.target );

	ship.spotlight = spotlight;
}

function createScene(){

  directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set( 0, 0, 50);

  scene = new THREE.Scene();
  makeLives(numLives);
  ship = new Ship(0,0,0);
  makeSKiller();
  

  scene.add(directionalLight);
  makePointLight();
  createSpotlight();

  var geometry = new THREE.PlaneGeometry( 2560, 1440);
  var material = new THREE.MeshBasicMaterial();
  var mesh    = new THREE.Mesh( geometry, material);

  var loader = new THREE.TextureLoader();
  mesh.material.map = loader.load('galaxy.jpg');

  scene.mesh = mesh;
  scene.add(ship);
  scene.add( scene.mesh);
}

function shootBullet() {
	currentShot = new Date().getTime();
	if (currentShot - lastShot > MINBULLETTIME) {
		new Bullet(ship.position.x,0,0);
		lastShot = new Date().getTime();
	}
}

function switchWireframe() {
	for(var i=0; i < 3; i++) {
		materialShip[i].wireframe = !materialShip[i].wireframe;
		materialSKiller[i].wireframe = !materialSKiller[i].wireframe;
		materialBullet[i].wireframe = !materialBullet[i].wireframe;
	}
}

function switchMaterial() {
	scene.traverse(function (node) {
		if (node instanceof Mesh) {
			if (node.material == node.lambertMaterial)
				(node.material = node.phongMaterial)
			else if (node.material == node.phongMaterial)
				(node.material = node.lambertMaterial)
		}
	});
}

function gameOver() {

	var loader = new THREE.TextureLoader();
	scene.mesh.material.map = loader.load('gameover.jpg');

}

// Keyboard events Reading

function onKeyDown(e){

	var currentShot;

	switch (e.keyCode) {
		case 65: // A
		case 97: // a
			switchWireframe();
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

		case 71: // G
		case 103: // g
			switchMaterial();
			break;

	    case 78: // N
	    case 110: // n
	      directionalLight.visible = !directionalLight.visible;
	      break;

		case 76: // L
		case 108: // l
			scene.traverse(function (node) {
				if (node instanceof Mesh) {
					if (node.material != node.basicMaterial)
						node.material = node.basicMaterial
					else
						(node.material = node.lambertMaterial)
				}
			});
			break;

		case 67: // C
		case 99: // c
			scene.traverse(function (node) {
				if (node instanceof THREE.PointLight) {
					node.visible = !node.visible;
				}
			});
			break;

		case 72: // H
		case 104: // h
			ship.spotlight.visible = !ship.spotlight.visible;
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

		case 52: // 4
			gameOver();
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

	if(toRemove[0] || toRemove[1]) {
		// toRemove[0] has a value if a bullet left the scene or hit an alien
		// or an alien hit the ship
		scene.remove(toRemove[0]);
		if(toRemove[1]){
			// toRemove[1] has a value if a bullet  hit an alien
			scene.remove(toRemove[1]);
			alienCount--;
		}
		toRemove = [null, null]; // Restart the vector for the next iteration
	}
	if (!alienCount || !numLives){ // if there are no more aliens or lives, it's gameover
		gameOver();
	}

	//XXX workaround for the collisiondetection 
	// of ship vs wall doesnt let ships past the wall 
	for (var i = 0; i < numLives; i++){
		Lives[i].position.x = -900; 
	}
	perspectiveCamera1.position.x = ship.position.x;
	render();
	requestAnimationFrame(animate);
}

function init(){

	renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.autoClear = false;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	t = new Date().getTime();

	createScene();
	createOrtographicCamera();
	createOrtographicCamera2();
	createPerspectiveCamera1();
	createPerspectiveCamera2();

	currentCamera = ortographicCamera;

	render();
	animate();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}
