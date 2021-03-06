      
      
      
      var container, stats;
			var camera, scene, renderer;
			var frustumSize = 1000;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> - orthographic view';
				container.appendChild( info );

				var aspect = window.innerWidth / window.innerHeight;
				camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 2000 );
				camera.position.y = 400;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );

				// Grid

				var gridHelper = new THREE.GridHelper( 1000, 20 );
				scene.add( gridHelper );

				// Cubes

				var geometry = new THREE.BoxGeometry( 100, 100, 100 );
				var material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );

        //テクスチャの読み込み
        var texture  = new THREE.ImageUtils.loadTexture('brick_diffuse.jpg');
 
				for ( var i = 0; i < 1; i ++ ) {

					  
        //キューブのジオメトリ（物体）の生成
        var mesh = new THREE.Mesh(                                       
                   new THREE.CubeGeometry(500,500,500),                   
                   new THREE.MeshPhongMaterial({                                      
                       map: texture                   
                  }));     
      
              scene.add(mesh);
				}

				// Lights

				var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
				scene.add( ambientLight );

				var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
				directionalLight.position.x = Math.random() - 0.5;
				directionalLight.position.y = Math.random() - 0.5;
				directionalLight.position.z = Math.random() - 0.5;
				directionalLight.position.normalize();
				scene.add( directionalLight );

				var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
				directionalLight.position.x = Math.random() - 0.5;
				directionalLight.position.y = Math.random() - 0.5;
				directionalLight.position.z = Math.random() - 0.5;
				directionalLight.position.normalize();
				scene.add( directionalLight );

				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				var aspect = window.innerWidth / window.innerHeight;

				camera.left   = - frustumSize * aspect / 2;
				camera.right  =   frustumSize * aspect / 2;
				camera.top    =   frustumSize / 2;
				camera.bottom = - frustumSize / 2;

				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				stats.begin();
				render();
				stats.end();

			}

			function render() {

				var timer = Date.now() * 0.0001;

				camera.position.x = 400;
				camera.position.z = 400;
				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}