var scene = new THREE.Scene();
var camera;
var light, light2;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var size = 32;
var depth = 10;

var frameCount = 0;
var updateRate = 10;

var Conway = {};

Conway.init = function() {
	Conway.layers = [];
	
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	
	var tex = THREE.ImageUtils.loadTexture("tex/cube.png");
	
	for (var i = 0; i < depth; i++) {
		Conway.layers[i] = {};
		Conway.layers[i].cubes = [];
		var y = (depth - i) / depth;
		for (var x = 0; x < size; x++) {
			for (var z = 0; z < size; z++) {	//Y-up!
				
				//var material = new THREE.MeshLambertMaterial( { color: new THREE.Color(1.0*y, x/size*y, z/size*y), transparent: true, opacity: y, map: tex } );
				var cf = 1/(i+1);
				var material = new THREE.MeshLambertMaterial( { color: new THREE.Color(1.0*cf + cf/2, x/size*cf + cf/2, z/size*cf + cf/2), map: tex } );
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.x = x - size/2;
				mesh.position.y = -i;
				mesh.position.z = z - size/2;
				
				
				if (i == 0) {
					if (Math.random() < 0.2) {
						mesh.state = 1;
					} else {
						mesh.state = 0;
					}
				}
				
				mesh.scale.set(0.9, 0.9, 0.9);
				
				
				
				var index = x + z*size;
				
				Conway.layers[i].cubes[index] = mesh;
				
				scene.add(mesh);
			}
		}
	}
}

Conway.update = function() {
	//First push all the layers down one
	for (var i = depth-1; i > 0; i--) {
		
		var y = (depth - i) / depth;
		for (var x = 0; x < size; x++) {
			for (var z = 0; z < size; z++) {
				var index = x + z*size;
				Conway.layers[i].cubes[index].state = Conway.layers[i-1].cubes[index].state;
				
				//Conway.layers[i].cubes[index].material.opacity = y;
				
				if (Conway.layers[i].cubes[index].state > 0) {
					//Conway.layers[i].cubes[index].scale.set(1, 1, 1);
					var cf = 1/(i+1);
					var red = Conway.layers[i].cubes[index].state / 10;
					if (red > 1.0) { red = 1.0; }
					Conway.layers[i].cubes[index].material.color = new THREE.Color(red*cf + cf/2, x/size*cf + cf/2, z/size*cf + cf/2)
					Conway.layers[i].cubes[index].visible = true;
				} else {
					//Conway.layers[i].cubes[index].scale.set(0.0001, 0.0001, 0.0001);
					Conway.layers[i].cubes[index].visible = false;
				}
			}
		}
	}
	
	
	var y = 1;
	for (var x = 0; x < size; x++) {
		for (var z = 0; z < size; z++) {
			var index = x + z*size;
			
			var count = 0;
			for (var ix = -1; ix <= 1; ix++) {
				for (var iz = -1; iz <= 1; iz++) {
					if (ix != 0 || iz != 0) {
						var cx = (x + ix + size) % size;
						var cz = (z + iz + size) % size;
						var ci = cx + cz*size;
						
						if (Conway.layers[1].cubes[ci].state > 0) {
							count += 1;
						}
					}
				}
			}
			
			var state = Conway.layers[0].cubes[index].state;
			
			if (state > 0) {
				if (count == 2 || count == 3) {
					state += 1
				} else {
					state = 0;
				}
			} else {
				if (count == 3) {
					state = 1;
				} else {
					state = 0;
				}
			} 
			
			Conway.layers[0].cubes[index].state = state;
			
			var red = state / 10;
			if (red > 1.0) { red = 1.0; }
			
			Conway.layers[0].cubes[index].material.color = new THREE.Color(red, x/size, z/size);
			//Conway.layers[0].cubes[index].material.opacity = y;
			
			if (Conway.layers[0].cubes[index].state) {
				//Conway.layers[0].cubes[index].scale.set(1, 1, 1);
				Conway.layers[0].cubes[index].visible = true;
			} else {
				//Conway.layers[0].cubes[index].scale.set(0.0001, 0.0001, 0.0001);
				Conway.layers[0].cubes[index].visible = false;
			}
		}
	}
	
	
}


function init() {
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
	camera.up = new THREE.Vector3(0,1,0);
	
	renderer.setClearColor(0x80FFFF);
	
	light = new THREE.PointLight(0xffffff);
	light.position.set(-size*2, size, -size*2);
	scene.add(light);
	
	light2 = new THREE.PointLight(0xffffff);
	light2.position.set(size*2, size, size*2);
	scene.add(light2);
	
	
	
	window.addEventListener( 'resize', onWindowResize, false );
	
	Conway.init();
	
}

var render = function () {
	requestAnimationFrame( render );
	
	frameCount += 1;
	
	if (frameCount % updateRate == 0) {
		Conway.update();
	}
	
	
	var camx = Math.cos(frameCount/180)*size;
	var camz = Math.sin(frameCount/180)*size;
	
	
	camera.position.set(camx, size, camz);
	camera.lookAt(new THREE.Vector3(camx/6, 0, camz/6));
	
	//cube.rotation.x += 0.1;
	//cube.rotation.y += 0.1;

	renderer.render(scene, camera);
};

init();
render();



function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}