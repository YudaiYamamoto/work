<!DOCTYPE html>
<html lang="en">
	<head>
		<title>three.js canvas - performance</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				font-family: Monospace;
				background-color: #f0f0f0;
				margin: 0px;
				overflow: hidden;
			}
		</style>
	</head>
	<body>

		<script src="../build/three.js"></script>

		<script src="js/renderers/Projector.js"></script>
		<script src="js/renderers/CanvasRenderer.js"></script>

		<script src="js/libs/stats.min.js"></script>

		<script>

			var container, stats;

			var camera, scene, renderer;

			var light;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, 1000, 1000 );
				camera.lookAt( scene.position );


				// Grid

				var gridHelper = new THREE.GridHelper( 1000, 10 );
				scene.add( gridHelper );

				// Spheres

				var geometry = new THREE.SphereGeometry( 100, 26, 18 );
				var material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );

				for ( var i = 0; i < 20; i ++ ) {

					var sphere = new THREE.Mesh( geometry, material );

					sphere.position.x = ( i % 5 ) * 200 - 400;
					sphere.position.z = Math.floor( i / 5 ) * 200 - 400;

					scene.add( sphere );

				}

				// Lights

				var ambientLight = new THREE.AmbientLight( Math.random() * 0x202020 );
				scene.add( ambientLight );

				var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
				directionalLight.position.set( 0, 1, 0 );
				scene.add( directionalLight );

				light = new THREE.PointLight( 0xff0000, 1, 500 );
				scene.add( light );

				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild(stats.dom);

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				var timer = Date.now() * 0.001;

				light.position.x = Math.cos( timer ) * 1000;
				light.position.y = 500;
				light.position.z = Math.sin( timer ) * 1000;

				renderer.render( scene, camera );

			}

		</script>

	</body>
</html>
