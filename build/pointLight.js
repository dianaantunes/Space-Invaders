/*==============================================================================
#
#
#   3ª Entrega  -  11/11
#
#
==============================================================================*/

/*==============================================================================
	PointLight code
==============================================================================*/

function makePointLight(){
	var disX = -240, disY = 120;

	for (var row = 0; row < 2; row++) {
        for (var col = 0; col < 3; col++) {
        	new star(disX, disY, 10);
			disX += 240;
 		}
 		disX = -240;
 		disY += 200;
	}
}

function createBodyStar(obj, x, y, z){

   	pointLight = new THREE.PointLight("#404040", 2.4, 500);
   	pointLight.position.set(x,y,45);

   	addStarbody(pointLight, 0, 0, 0)

   	scene.add(pointLight);
}

function addStarbody(obj, x, y, z){

	geometry = new THREE.SphereGeometry(2, 16, 8);
	mesh = new THREE.Mesh(geometry, materialStar);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function star(x, y, z){

	materialStar = new THREE.MeshBasicMaterial({color: 0xaaaaaa});

	createBodyStar(this, x, y, z);
}
