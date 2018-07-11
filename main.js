
var main = function () {
  var scene = new THREE.Scene();
 
  var width  = 600;
  var height = 400;
  var fov    = 60;
  var aspect = width / height;
  var near   = 1;
  var far    = 1000;
  var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set( 0, 0, 50 );
 
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );
 
  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 0, 0.7, 0.7 );
  scene.add( directionalLight );
 
 //
  //テクスチャの読み込み
  var texture  = new THREE.ImageUtils.loadTexture('brick_diffuse.jpg');
 
//キューブのジオメトリ（物体）の生成
 var mesh = new THREE.Mesh(                                       
            new THREE.CubeGeometry(10,10,10),                   
            new THREE.MeshPhongMaterial({                                      
                 map: texture                   
            }));     

 scene.add(mesh);

 
  ( function renderLoop () {
    requestAnimationFrame( renderLoop );
    mesh.rotation.set(
      0,
      mesh.rotation.y + 0.1,
      mesh.rotation.z + 0.1,
    );
    renderer.render( scene, camera );
  } )();
};
 
window.addEventListener( 'DOMContentLoaded', main, false );
