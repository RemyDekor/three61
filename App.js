// example import asset
// import imgPath from './assets/img.jpg';

import vertexShader from './shaders/vertexShader.vert';
import fragmentShader from './shaders/fragmentShader.frag';

// TODO : add Dat.GUI
// TODO : add Stats

export default class App {

    constructor() {

        this.container = document.querySelector( '#main' );
        document.body.appendChild( this.container );
        
        this.startTime = Date.now() / 1000;
        this.time = 0;

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 10 );
        this.camera.position.z = 1;

        this.scene = new THREE.Scene();



        // let geometry = new THREE.Geometry();

        // let x = 0.1;
        // let y = 0.08;
        // let size = 0.3;
        
        // for (let i = 0; i < 3; i++) {
        //     x = Math.cos(Math.PI*2/3*i)*size;
        //     y = Math.sin(Math.PI*2/3*i)*size;

        //     for (let j = 0; j < 3; j++) {
        //         geometry.vertices[i*3+j] = new THREE.Vector3(
        //             x + Math.cos(Math.PI*2/3*j)*size,
        //             y + Math.sin(Math.PI*2/3*j)*size,
        //             0
        //         )
        //     }
        //     geometry.faces[i] = new THREE.Face3( 0 + i*3, 1 + i*3, 2 + i*3 );
        // }

        let geometry = new THREE.BufferGeometry();
        let vertices = new Float32Array( 3*3*3 );
        let triangleColors = new Float32Array( 3*3*3 );
        let indices = new Uint32Array( 3*3 );

        let x = 0.1;
        let y = 0.08;
        let size = 0.3;
        
        for (let i = 0; i < 3; i++) {
            x = Math.cos(Math.PI*2/3*i)*size;
            y = Math.sin(Math.PI*2/3*i)*size;

            for (let j = 0; j < 3; j++) {
                vertices[i*3*3 + j*3 +0] = x + Math.cos(Math.PI*2 /3 * j)*size;
                vertices[i*3*3 + j*3 +1] = y + Math.sin(Math.PI*2 /3 * j)*size;
                vertices[i*3*3 + j*3 +2] = 0;

                triangleColors[i*3*3 + j*3 +0] = 1-i/3;
                triangleColors[i*3*3 + j*3 +1] = i/3;
                triangleColors[i*3*3 + j*3 +2] = 0;
            }
            indices[i*3 +0] = i*3 +0;
            indices[i*3 +1] = i*3 +1;
            indices[i*3 +2] = i*3 +2;
        }
        geometry.addAttribute('position', new THREE.BufferAttribute( vertices, 3 ) );
        geometry.addAttribute('triangleColors', new THREE.BufferAttribute( triangleColors, 3 ) );
        geometry.setIndex(  new THREE.BufferAttribute( indices, 1 ) );

        
        this.material = new THREE.ShaderMaterial( {
            uniforms: {
                baseColor: { value: [1, 0.7, 0] },
                time: { type: 'f', value: this.time },
                resolution: { value: [window.innerWidth, window.innerHeight] }
            },
            vertexShader,
            fragmentShader
        } );
    
    	this.mesh = new THREE.Mesh( geometry, this.material );
        this.scene.add( this.mesh );
        
        let pointGeometry = new THREE.SphereGeometry(0.005,8,8);
        let pointMaterial = new THREE.MeshBasicMaterial({color:'0xff0000'});
        this.pointMesh = new THREE.Mesh( pointGeometry, pointMaterial );
        this.scene.add( this.pointMesh );

    	this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    	this.renderer.setPixelRatio( window.devicePixelRatio );
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
    	this.container.appendChild( this.renderer.domElement );

    	window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();

        this.renderer.animate( this.render.bind(this) );
    }

    render() {
        this.time = Date.now() / 1000 - this.startTime;

        this.mesh.rotation.z += 0.01;
        // this.mesh.rotation.y += 0.02;


        // let colors = new Float32Array( indices.length * 3 );
        // for ( var i = 0, i3 = 0, len = indices.length; i < len; i++, i3 += 3 ) {
        //     colors[ i3 + 0 ] = Math.random();
        //     colors[ i3 + 1 ] = Math.random();
        //     colors[ i3 + 2 ] = Math.random();
        // }
        // geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );


        this.mesh.material.uniforms.baseColor.value = 
            [ 1, 1, 1 ];

        this.mesh.material.uniforms.time.value = this.time;
 
    	this.renderer.render( this.scene, this.camera );
    }

    onWindowResize() {
    	this.camera.aspect = window.innerWidth / window.innerHeight;
    	this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        
        this.mesh.material.uniforms.resolution.value =
            [ this.renderer.getSize().width, this.renderer.getSize().height ];
    }
}
