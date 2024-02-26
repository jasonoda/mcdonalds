import * as THREE from "../../build/three.module.js";
import { gsap } from "./greensock/all.js";

export class Scene {
	setUp(e) {
		this.e = e;
	}

	buildScene() {
		//---VARS--------------------------------------------------------------------------------------------------------------------

		this.playerAction = "set";
		this.count = 0;

		this.movePlayer = true;

		this.raycaster = new THREE.Raycaster();

		//---BASE--------------------------------------------------------------------------------------------------------------------

		this.mainCont = new THREE.Group();
		this.e.scene3D.add(this.mainCont);

		//---LIGHTS------------------------------------------------------------------------------------------------------------------

		// main light

		// this.dl = new THREE.DirectionalLight(0xffffff, .75);
		// this.dl.position.x=-20;
		// this.dl.position.z=20;
		// this.dl.position.y=40;
		// this.mainCont.add(this.dl);

		// shadow light

		this.dl_shad = new THREE.DirectionalLight(0xffffff, 0.75);
		this.dl_shad.position.x = 12 * 6;
		this.dl_shad.position.z = -26 * 6;
		this.dl_shad.position.y = 26 * 6;
		this.mainCont.add(this.dl_shad);

		this.dl_shad.castShadow = true;

		this.dl_shad.shadow.mapSize.width = 4096*2;
		this.dl_shad.shadow.mapSize.height = 4096*2;
		this.dl_shad.shadow.bias = 0.001;

		this.e.sSize = 120;
		this.dl_shad.shadow.camera.near = 0.1;
		this.dl_shad.shadow.camera.far = 380;
		this.dl_shad.shadow.camera.left = -this.e.sSize;
		this.dl_shad.shadow.camera.right = this.e.sSize;
		this.dl_shad.shadow.camera.top = this.e.sSize;
		this.dl_shad.shadow.camera.bottom = -this.e.sSize;
		this.dl_shad.shadow.radius = 2;

		// const shadowHelper = new THREE.CameraHelper(this.dl_shad.shadow.camera);
		// this.mainCont.add(shadowHelper);

		// ambient light

		this.ambLight = new THREE.AmbientLight(0xffffff, 0.75);
		this.mainCont.add(this.ambLight);

		//---PLAYER------------------------------------------------------------------------------------------------------

		// Create a cube geometry for the skybox
		// const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
		// const skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide });
		// const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
		// this.e.scene.add(skybox);

		//---PLAYER------------------------------------------------------------------------------------------------------

		// container

		this.playerCont = new THREE.Group();
		this.mainCont.add(this.playerCont);
		this.playerCont.position.y = 0;
		this.playerCont.position.z = 0;
		this.playerCont.position.x = 0;

		//-----------------------------------------------------------

		// hit
		
		var geometry = new THREE.BoxGeometry(.5,1.5,.5);
		var material = new THREE.MeshStandardMaterial({ color: 0x66ff66, visible: false });
		this.playerHit = new THREE.Mesh(geometry, material);
		this.playerHit.position.y=.75
		this.playerHit.castShadow = true;
		this.playerHit.receiveShadow = true;
		this.playerCont.add( this.playerHit );
	
		//-----------------------------------------------------------

		// hit
		
		var geometry = new THREE.BoxGeometry(.5,1.5,.5);
		var material = new THREE.MeshStandardMaterial({ color: 0xff0000, visible: true });
		this.playerHit2 = new THREE.Mesh(geometry, material);
		this.playerHit2.position.y=2
		this.playerCont.add( this.playerHit2 );
	
		//-----------------------------------------------------------

		// animatedd body
		
		const animations = this.e.readyplayerme.animations;
		const runningClip = THREE.AnimationClip.findByName(animations, "Running");
		const spinningClip = THREE.AnimationClip.findByName(animations, "Spinning");
		const runningAction = this.e.readyplayerme.animMixer.clipAction(runningClip);
		const spinningAction = this.e.readyplayerme.animMixer.clipAction(spinningClip);
		
		runningAction.play();
		// spinningAction.play();
		
		this.playerBody = this.e.readyplayerme;
		this.playerBody.scale.set(1.5, 1.5, 1.5);

		this.playerCont.add(this.playerBody);

		//-----------------------------------------------------------

		// ball
		
		// var geometry = new THREE.SphereGeometry(0.2, 30, 16);
		// var material = new THREE.MeshStandardMaterial({ color: 0xcccccc });
		// this.ball = new THREE.Mesh(geometry, material);

		this.ball = this.e.soccerBall.clone();

		this.ball.castShadow = true;
		this.ball.receiveShadow = true;
		this.mainCont.add(this.ball);

		this.ball.scale.x = this.ball.scale.y = this.ball.scale.z = 1.8;

		this.ballTweenObject = new Object();
		this.ballTweenObject.z = 0;
		this.ballTweenObject.y = 0;

		this.ballTween = gsap.to(this.ballTweenObject, { y: 0, z: 2.7, duration: 0.365, repeat: -1, yoyo: true, ease: "sine.expo"});

		this.crashers=[];

		//---MATERIALS--------------------------------------------------------------------------

		// BASIC

		this.goldMaterial = new THREE.MeshStandardMaterial({ wireframe: false, envMap: this.e.reflectionTexture, metalness: .5, roughness: 0.1, color: 0xffe95c});
		this.floorMaterial = new THREE.MeshStandardMaterial({wireframe: false,color: 0xff4100});

		this.gateMaterial = new THREE.MeshStandardMaterial({ wireframe: false, color: 0x608a81});
		this.postMaterial = new THREE.MeshStandardMaterial({ wireframe: false, color: 0x8b9575});

		this.spinner1Material = new THREE.MeshStandardMaterial({ wireframe: false, color: 0xb99646});
		this.spinner2Material = new THREE.MeshStandardMaterial({ wireframe: false, color: 0xc43d3b});

		this.blobMaterial = new THREE.MeshStandardMaterial({ wireframe: false, color: 0x419b95});

		//---FLOOR BACKGROUND--------------------------------------------------------------------------

		this.sLights = [];
		this.sLights2 = [];

		this.stadium = this.e.stadium.clone();
		this.stadium.scale.x = this.stadium.scale.y = 1;
		this.stadium.scale.z = 5;
		this.stadium.position.y = -0.25;
		this.mainCont.add(this.stadium);

		this.stadium.traverse((object) => {
			if (object.material !== undefined) {
				// console.log(object.material.name)

				object.material.color.setHex(0xffffff);
				object.material.metalness = 0;
				object.material.roughness = 1;

				this.saveMat = object.material.map;

				if (object.material.name === "lowerFence") {
					this.lowerFence = object;
					object.material = new THREE.MeshStandardMaterial({
						wireframe: false,
						color: 0xbf4240,
						map: this.saveMat,
					});
				} else if (object.material.name === "upperFence") {
					console.log("---lowerfence");

					this.upperFence = object;
					object.material = new THREE.MeshStandardMaterial({
						wireframe: false,
						color: 0x3c5667,
						map: this.saveMat,
					});
				} else if (object.material.name === "roof") {
					this.roof = object;
					object.material = new THREE.MeshStandardMaterial({
						wireframe: false,
						color: 0x6f8b8a,
						map: this.saveMat,
					});
				} else if (object.material.name === "roofBars") {
					this.roofBars = object;
					object.material = new THREE.MeshStandardMaterial({
						wireframe: false,
						color: 0x7e7f81,
					});
				} else if (object.material.name === "roofBarsInner") {
					this.roofBarsInner = object;

					object.material = new THREE.MeshStandardMaterial({
						wireframe: false,
						color: 0x2c2c2b,
					});
				} else if (object.material.name === "roofWall") {
					this.roofWall = object;
					object.material = new THREE.MeshStandardMaterial({
						wireframe: false,
						color: 0x2d2e39,
					});
				} else if (object.material.name === "roofEdge") {
					// console.log(">>>roof edge")

					this.roofEdge = object;
					object.material = new THREE.MeshStandardMaterial({
						wireframe: false,
						color: 0xd4d4d3,
					});
				} else if (object.material.name === "glintLight") {
					this.roofWall = object;
					object.material = new THREE.MeshStandardMaterial({
						wireframe: false,
						color: 0xffffff,
						fog: false,
					});
				} else if (object.material.name === "lineLight") {
					object.material = new THREE.MeshStandardMaterial({
						wireframe: false,
						color: 0xffffff,
						transparent: true,
						fog: false,
						map: this.saveMat,
					});
				} else if (object.material.name === "rig") {
					this.rig = object;
					object.material = new THREE.MeshBasicMaterial({
						wireframe: false,
						color: 0x171717,
					});
				} else if (object.material.name === "jumbotron") {
					object.material = new THREE.MeshStandardMaterial({
						wireframe: false,
						color: 0xffffff,
						fog: false,
						map: this.saveMat,
					});
				} else if (object.material.name === "jumboOutline") {
					object.material = new THREE.MeshBasicMaterial({
						wireframe: false,
						color: 0x999999,
					});
				}
			}

			if (object.name.substring(0, 7) === "s_light") {
				this.planeGeo = new THREE.PlaneGeometry(0.005, 0.005);
				this.planeMat = new THREE.MeshStandardMaterial({
					color: "red",
					visible: false,
				});
				this.glintPlane = new THREE.Mesh(this.planeGeo, this.planeMat);
				object.add(this.glintPlane);

				this.sLights.push(this.glintPlane);
			}

			object.castShadow = true;
			object.receiveShadow = true;

			if (object.name === "top") {
				object.material = new THREE.MeshStandardMaterial({
					wireframe: false,
					color: 0xffffff,
					map: this.saveMat,
				});
				object.material.side = THREE.DoubleSide;
			} else if (object.name === "lines" || object.name === "lines2") {
				object.material.transparent = true;
				object.material.opacity = 0.5;
				object.position.x += -0.1;
			} else if (object.name === "seats") {
				object.material = new THREE.MeshStandardMaterial({
					wireframe: false,
					color: 0x0e1a1a,
				});
				this.seats = object;
			} else if (object.name === "field") {
				object.material = new THREE.MeshStandardMaterial({
					wireframe: false,
					color: 0xffffff,
					map: this.saveMat,
				});
			} else if (object.name === "skySphere") {
				console.log("skysphere");
				object.material = new THREE.MeshBasicMaterial({
					wireframe: false,
					color: 0xffffff,
					map: this.saveMat,
					fog: false,
					side: THREE.DoubleSided,
				});

				object.castShadow = false;
				object.receiveShadow = false;
			}
		});

		this.goal = this.e.goal.clone();
		this.goal.scale.x = this.goal.scale.y = 1;
		this.goal.scale.z = 5;
		this.goal.position.z = 242;
		this.goal.rotation.y = this.e.u.ca(180);
		this.mainCont.add(this.goal);

		this.goal.traverse((object) => {

			if (object.material !== undefined) {

				this.saveMat = object.material.map;

			}
			
			if(object.name==="net"){

				object.material = new THREE.MeshStandardMaterial({ color: 0x66ff66, transparent: true, map: this.saveMat, side: THREE.DoubleSide });

			}

		});

		// var geometry = new THREE.BoxGeometry(5, 5, 5);
		// var material = new THREE.MeshStandardMaterial({ color: 0x66ff66 });
		// this.testBox = new THREE.Mesh(geometry, material);
		// this.testBox.position.y = 2;
		// this.testBox.castShadow = true;
		// this.testBox.receiveShadow = true;
		// this.mainCont.add( this.testBox );

		// var geometry = new THREE.PlaneGeometry(15, 15, 15);
		// var material = new THREE.MeshStandardMaterial({ color: 0xff6666 });
		// this.plane = new THREE.Mesh(geometry, material);
		// this.plane.position.y = 2;
		// this.plane.rotation.x = this.e.u.ca(-90);
		// this.plane.castShadow = true;
		// this.plane.receiveShadow = true;
		// this.mainCont.add( this.plane );

		// for(var i=0; i<20; i++){

		//   var geometry = new THREE.BoxGeometry(2,2,1);
		//   var material = new THREE.MeshStandardMaterial({ color: 0x66ff66 });
		//   this.testBox = new THREE.Mesh(geometry, material);
		//   this.testBox.position.x=this.e.u.nran(25)
		//   this.testBox.position.y=0
		//   this.testBox.position.z=this.e.u.nran(100)
		//   this.testBox.castShadow = true;
		//   this.testBox.receiveShadow = true;
		// this.mainCont.add( this.testBox );

		// }

		this.ringDist = 40;

		//  make rings

		this.rings = [];
		this.pellets = [];

		this.fieldStart = -210 * 1;
		this.fieldEnd = 190 * 1;
		this.gameSpeed = 16;

		this.gateContainers = [];
		this.spinners = [];
		this.poleContainers = [];

		this.resetBoard();

		this.makeBlobLine(155, 2);

		this.makePoleLine(140, 0);

		this.makeSpinner(0, 120);
		this.makeSpinner(17, 120);
		this.makeSpinner(-17, 120);

		this.makePellet(110, 0);

		this.makeSpinner(8.5, 100);
		this.makeSpinner(-8.5, 100);

		this.makePellet(90, 0);

		this.makePoleLine(75, 0);
		this.makePoleLine(60, 0);

		this.makeGateLine(40, 0.5);

		this.makePellet(30, 0);

		this.makeSpinner(8.5, 20);
		this.makeSpinner(-8.5, 20);

		this.makePellet(5, 0);

		this.makeSpinner(0, -10);
		this.makeSpinner(17, -10);
		this.makeSpinner(-17, -10);

		this.makeGateLine(-30, 0);

		this.makePellet(-40, 0);

		this.makePoleLine(-50, 2);

		// this.makeBlobLine(-65, 2);

		this.makeSpinner(8.5, -80);
		this.makeSpinner(-8.5, -80);

		this.makePellet(-90, 0);

		this.makeSpinner(0, -100);
		this.makeSpinner(17, -100);
		this.makeSpinner(-17, -100);

		this.makePellet(-115, 0);

		this.makePoleLine(-125, 2);

		this.makeBlobLine(-150, 2);
	}

	resetBoard() {

		this.resetCutOuts()

		this.playerCont.position.z = this.fieldStart;

		// for(var i = 0; i<this.rings.length; i++){

		//   if(i===0){

		//     this.rings[i].position.x = this.e.u.nran(8);

		//   }else{

		//     this.rings[i].position.x = this.e.u.nran(12) + this.e.u.nran(6);

		//   }

		// }

		for (var i = 0; i < this.pellets.length; i++) {
			// this.pellets[i].position.x = ( this.rings[i].position.x + this.rings[i+1].position.x ) / 2;

			this.pellets[i].scale.x =
				this.pellets[i].scale.y =
				this.pellets[i].scale.z =
					0.6;
			this.pellets[i].action = "ready";
		}
	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	makeBlobLine(z){

		this.blobCont = new THREE.Group();
		this.mainCont.add(this.blobCont);

		this.blobCont.position.z = z;

		for (var i = -5; i < 5; i++) {

			this.blob = this.e.blob.clone();

			this.blob.traverse((object) => {
				
				object.material = this.blobMaterial;
				object.receiveShadow = false;
				object.castShadow = true;

			});

			this.blob.position.x = i * 6;
			this.blob.scale.x = this.blob.scale.y = this.blob.scale.z = 0.65;
			this.blobCont.add(this.blob);

			var geometry = new THREE.BoxGeometry(1.25, 1.25, 1.25);
			var material = new THREE.MeshStandardMaterial({ color: 0x66ff66, visible: false });
			this.crashBox = new THREE.Mesh(geometry, material);
			this.crashBox.position.x = this.blob.position.x;
			this.crashBox.position.y = 1.25/2;
			this.blobCont.add( this.crashBox );
	
			this.crashBox.name = "blobCrashBox";
			this.crashers.push(this.crashBox);
	
		}

	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	makePellet(z, x) {
		// var geometry = new THREE.SphereGeometry(.25,20,20);
		// var material = new THREE.MeshStandardMaterial({ color: 0x66ff66 });
		// this.pellet = new THREE.Mesh(geometry, material);
		this.pellet = this.e.ring.clone();
		this.pellet.position.y = 1.2;
		this.pellet.position.z = z;
		this.pellet.position.x = x + this.e.u.nran(5);

		this.pellet.action = "ready";

		this.pellet.scale.x = this.pellet.scale.y = this.pellet.scale.z = 0.6;

		this.pellet.castShadow = true;
		this.pellet.receiveShadow = true;
		this.mainCont.add(this.pellet);

		this.pellets.push(this.pellet);

		this.pellet.traverse( ( object ) =>  {

			if(object.material!==undefined){
				object.material = this.goldMaterial;
			}

		});

	}

	controlRings() {
		for (var i = 0; i < this.pellets.length; i++) {

			this.pellets[i].rotation.y += this.e.dt;

			const box1 = new THREE.Box3().setFromObject(this.playerHit);
			const box2 = new THREE.Box3().setFromObject(this.pellets[i]);

			if (box1.intersectsBox(box2) === true &&this.pellets[i].action === "ready") {

				this.pellets[i].action = "done";

				gsap.to(this.pellets[i].scale, {
					x: 0,
					y: 0,
					z: 0,
					duration: 0.2,
					ease: "sine.out",
				});
				
			}
		}
	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	makePoleLine(z, delay) {

		this.poleCont = new THREE.Group();
		this.mainCont.add(this.poleCont);

		this.poleCont.position.z = z;
		this.poleCont.action="wait";
		this.poleCont.count=0;

		this.poleCont.cutouts=[];

		this.poleContainers.push(this.poleCont);

		for (var i = -6; i < 6; i++) {

			this.pole = this.e.pole.clone();

			this.pole.traverse((object) => {

				// object.castShadow = false;
				// object.receiveShadow = false;
				// object.material = new THREE.MeshStandardMaterial({ color: 0x999999 });

				// console.log(object.name);

				if(object.name==="cutOut2"){

					this.crashBox.name = "cutOutCrashBox";
					this.crashers.push(object);

				}

			});

			this.pole.position.x = i * 6;
			this.pole.rotation.x = this.e.u.ca(90);
			this.pole.scale.x = this.pole.scale.y = this.pole.scale.z = 0.45;
			this.poleCont.add(this.pole);

			this.poleCont.cutouts.push(this.pole);

		}

		this.track = this.e.track.clone();
		this.track.scale.x=100;
		this.track.scale.y=.25;
		this.track.castShadow = false;
		this.track.receiveShadow = false;
		this.poleCont.add(this.track);

	}

	controlPoleLines(){

		for(var i=0; i<this.poleContainers.length; i++){

			if(this.poleContainers[i].action==="wait"){

				for(var j=0; j<this.poleContainers[i].cutouts.length; j++){

					this.poleContainers[i].cutouts[j].rotation.x = this.e.u.ca(90);
					this.poleContainers[i].cutouts[j].rotation.y = 0;
					this.poleContainers[i].cutouts[j].rotation.z = 0;

				}

				var dist = this.poleContainers[i].position.z - this.playerCont.position.z;

				if (dist < 75) {

					this.poleContainers[i].action="up"

				}

				//----------------------------------------------------

			}else if(this.poleContainers[i].action==="up"){

				for(var j=0; j<this.poleContainers[i].cutouts.length; j++){

					gsap.killTweensOf(this.poleContainers[i].cutouts[j].rotation);
					gsap.to(this.poleContainers[i].cutouts[j].rotation, {x: 0, duration: .5, ease: "sine.inOut"});

				}

				this.poleContainers[i].count=0;
				this.poleContainers[i].action="up wait"

				//----------------------------------------------------

			}else if(this.poleContainers[i].action==="up wait"){

				this.poleContainers[i].count+=this.e.dt;

				if(this.poleContainers[i].count>.5){

					this.poleContainers[i].count=0;
					this.poleContainers[i].action="move"

				}

				//----------------------------------------------------

			}else if(this.poleContainers[i].action==="move"){

				if(i % 2===0){

					gsap.to(this.poleContainers[i].position, { x: this.poleContainers[i].position.x + 4, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut"});
					
				}else{

					gsap.to(this.poleContainers[i].position, { x: this.poleContainers[i].position.x - 4, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut"});

				}

				for(var j=0; j<this.poleContainers[i].cutouts.length; j++){

					gsap.killTweensOf(this.poleContainers[i].cutouts[j].rotation);
					this.poleContainers[i].cutouts[j].rotation.y=0;

					gsap.to(this.poleContainers[i].cutouts[j].rotation, { y: this.poleContainers[i].cutouts[j].rotation.y + this.e.u.ca(180), duration: .4, delay: 2, repeatDelay: 2, repeat: -1, yoyo: true, ease: "sine.inOut"});

				}

				this.poleContainers[i].action="";

			}
			
		}

	}

	resetCutOuts(){

		for(var i=0; i<this.poleContainers.length; i++){

			gsap.killTweensOf( this.poleContainers[i].position );

			this.poleContainers[i].action="wait";
			this.poleContainers[i].count=0;
			this.poleContainers[i].position.x=0;

			for(var j=0; j<this.poleContainers[i].cutouts.length; j++){

				this.poleContainers[i].cutouts[j].rotation.x = this.e.u.ca(90);

				gsap.killTweensOf( this.poleContainers[i].cutouts[j].rotation );

			}

		}

	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	makeGateLine(z, delay) {

		this.gateCont = new THREE.Group();
		this.mainCont.add(this.gateCont);

		this.gateCont.position.z = z;

		this.gateCont.gates = [];

		this.gateContainers.push(this.gateCont);

		for (var i = -3; i < 3; i++) {
			this.gate = this.e.gate.clone();

			// this.gate.scale.y = 0.5;
			this.gate.position.x = i * 10;
			this.gate.rotation.y = this.e.u.ca(90);

			this.gateCont.add(this.gate);

			this.gate.traverse((object) => {

				object.castShadow = false;
				object.receiveShadow = false;

				// console.log(object.name)

				if (object.name === "door") {

					this.gateCont.gates.push(object);
					object.delay = delay;

					if(i===-3){

						object.material = new THREE.MeshStandardMaterial({ color: "red", visible:false  });

					}

					object.material = this.gateMaterial;

				}else if (object.name === "door_0") {

					object.material = this.gateMaterial;

					this.crashBox.name = "door0CrashBox";
					this.crashers.push(object);

				}else if (object.name === "door_1") {

					object.material = this.postMaterial;

					this.crashBox.name = "door1CrashBox";
					this.crashers.push(object);

				}else if (object.name === "post") {

					object.material = this.spinner1Material;

					this.crashBox.name = "doorPostCrashBox";
					this.crashers.push(object);

				}

			});
		}
	}

	controlGates() {
		for (var i = 0; i < this.gateContainers.length; i++) {
			var g = this.gateContainers[i];

			if (g.action === undefined) {
				g.action = "wait";
				g.count = 0;
				g.state = "even";
			} else if (g.action === "wait") {
				g.count += this.e.dt;

				if (g.count > 2) {
					g.action = "switch";
					g.count = 0;
				}
			} else if (g.action === "switch") {
				g.dist = g.position.z - this.playerCont.position.z;

				// console.log(i+" / "+g.dist)
				// console.log(i+" / "+g.position.z)

				//----------------------------------------------------

				if (g.dist < 115) {
					// console.log(i+" switch")

					if (g.state === "even") {
						g.state = "odd";
					} else if (g.state === "odd") {
						g.state = "even";
					}

					g.action = "wait";

					//----------------------------------------------------

					for (var j = 0; j < g.gates.length; j++) {
						if (g.state === "even") {
							if (j % 2 === 0) {
								gsap.to(g.gates[j].position, {
									y: 0,
									duration: 0.2,
									ease: "sine.out",
								});
							} else {
								gsap.to(g.gates[j].position, {
									y: -5,
									duration: 0.2,
									ease: "sine.out",
								});
							}
						} else {
							if (j % 2 === 0) {
								gsap.to(g.gates[j].position, {
									y: -5,
									duration: 0.2,
									ease: "sine.out",
								});
							} else {
								gsap.to(g.gates[j].position, {
									y: 0,
									duration: 0.2,
									ease: "sine.out",
								});
							}
						}
					}
				}
			}
		}
	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	makeSpinner(x, z) {

		this.spinner = this.e.spinner.clone();
		this.spinner.position.x = x;
		this.spinner.position.z = z;
		this.spinner.scale.x = this.spinner.scale.y = this.spinner.scale.z = 0.6;
		this.mainCont.add(this.spinner);

		this.spinner.traverse((object) => {

			// object.material = new THREE.MeshStandardMaterial({ color: 0x999999 });

			// console.log(object.name)

			if (object.name === "bar") {

				this.spinner.bar = object;
				object.material = this.spinner1Material;

			}else if(object.name === "base"){

				object.material = this.spinner1Material;

			}else{

				object.material = this.spinner2Material;

			}

		});

		this.spinners.push(this.spinner);

		this.hitCont = new THREE.Group();
		this.mainCont.add(this.hitCont);

		this.hitCont.position.x=this.spinner.position.x;
		this.hitCont.position.y=this.spinner.position.y;
		this.hitCont.position.z=this.spinner.position.z;

		this.spinner.hitCont = this.hitCont;

		for(var i=-7; i<8; i++){

			var geometry = new THREE.BoxGeometry(.6, 3, .6);
			var material = new THREE.MeshStandardMaterial({ color: 0x0000ff, visible: false });
			this.crashBox = new THREE.Mesh(geometry, material);
			this.crashBox.position.z = i*1;
			this.hitCont.add( this.crashBox );

			this.crashBox.name = "spinnerCrashBox";
			this.crashers.push(this.crashBox);

		}

		var geometry = new THREE.BoxGeometry(2, 4, 2);
		var material = new THREE.MeshStandardMaterial({ color: 0x66ff66, visible: false });
		this.crashBox = new THREE.Mesh(geometry, material);
		this.crashBox.position.y = 2;
		this.spinner.add( this.crashBox );

		this.crashBox.name = "spinnerPostCrashBox";
		this.crashers.push(this.crashBox);

	}

	controlSpinners() {
		for (var i = 0; i < this.spinners.length; i++) {
			// console.log(this.spinners[i].bar.rotation.y)

			this.spinners[i].bar.rotation.y += this.e.dt * 1.5;

			this.spinners[i].hitCont.rotation.y = this.spinners[i].bar.rotation.y;

		}
	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	update() {

		this.ball.rotation.x+=this.e.dt*20;

		this.dl_shad.target.position.set( this.playerCont.position.x, this.dl_shad.target.position.y, this.playerCont.position.z );

		this.controlPoleLines()
		this.controlGates();
		this.controlSpinners();
		this.controlRings();

		this.mixer();

		//--------------------------------------------------------------------------------------------------------------

		// GAME ACTIONS

		if(this.gameAction===""){

		}else if(this.gameAction==="run"){

			this.playerCont.position.z += this.e.dt * this.gameSpeed;

			if(this.playerCont.position.z > 180){
				this.gameAction="set shoot";
			}

		}else if(this.gameAction==="set shoot"){

			gsap.to(this.e.camContX.rotation, { x: this.e.u.ca(17), duration: 1, ease: "sine.expo"});

			this.gameAction="set shoot";

		}else if(this.gameAction==="shoot"){

		}

		if(this.movePlayer===true){
			this.playerCont.position.z += this.e.dt * this.gameSpeed;

			if(this.playerCont.position.z > 180){
				this.movePlayer=false;
			}
		}

		if (this.playerCont.position.z > this.fieldEnd) {
			this.resetBoard();
		}

		//--------------------------------------------------------------------------------------------------------------

		// MOVE CAMERA

		this.e.camContY.position.x = this.e.u.lerp(
			this.e.camContY.position.x,
			this.playerCont.position.x,
			20 * this.e.dt
		);
		this.e.camContY.position.z = this.e.u.lerp(
			this.e.camContY.position.z,
			this.playerCont.position.z,
			20 * this.e.dt
		);

		//--------------------------------------------------------------------------------------------------------------

		// HANDLE ANIMATIONS

		if (this.e.readyplayerme!==null){
			if (this.e.readyplayerme.animMixer) {
				this.e.readyplayerme.animMixer.update(this.e.dt);
			}
		}
		
		//--------------------------------------------------------------------------------------------------------------

		// PLAYER CONTROLS

		if (this.playerAction === "set") {

			this.xspeed = 0;
			this.maxSpeed = 12;
			this.speedIncrease = 40;

			this.yspeed = 0;
			this.jumping = false;
			this.jumpHeight = 10;
			this.gravity = 30;
			this.ground = 0;

			this.playerAction = "move";

		} else if (this.playerAction === "move") {

			//--------------------------------------------------------------------------------------------------------------

			// crash intersections

			this.hasHit=false;

			if(this.playerCont.position.z>-140){
					
				for(var i=0; i<this.crashers.length; i++){

					const box1 = new THREE.Box3().setFromObject(this.playerHit2);
					const box2 = new THREE.Box3().setFromObject(this.crashers[i]);
		
					if (box1.intersectsBox(box2) === true) {

						console.log("HIT "+this.crashers[i].name)
						this.hasHit=true;
						
					}

				}

			}

			if(this.hasHit===true){
				this.playerHit2.material.visible=true;
			}else{
				this.playerHit2.material.visible=false;
			}

			//--------------------------------------------------------------------------------------------------------------

			// xspeed

			if (this.e.mobile === true) {

				if (this.e.input.ongoingTouches.length === 0) {
					this.xspeed *= 0.9;
				} else if (
					this.e.input.ongoingTouches[0].clientX >
					window.innerWidth / 2
				) {
					this.xspeed -= this.e.dt * this.speedIncrease;
				} else if (
					this.e.input.ongoingTouches[0].clientX <
					window.innerWidth / 2
				) {
					this.xspeed += this.e.dt * this.speedIncrease;
				}

			} else {

				if (this.e.input.keyRight === true) {
					this.xspeed -= this.e.dt * this.speedIncrease;
				} else if (this.e.input.keyLeft === true) {
					this.xspeed += this.e.dt * this.speedIncrease;
				} else {
					this.xspeed *= 0.9;
				}

			}

			if (this.xspeed < -this.maxSpeed) {
				this.xspeed = -this.maxSpeed;
			}

			if (this.xspeed > this.maxSpeed) {
				this.xspeed = this.maxSpeed;
			}

			this.playerCont.position.x += this.e.dt * this.xspeed;

			//--------------------------------------------------------------------------------------------------------------

			// yspeed

			if (this.e.input.keySpace === true && this.jumping === false) {
				console.log("jump now");

				this.yspeed = this.jumpHeight;
				this.jumping = true;
			}

			if (this.jumping === true) {
				this.yspeed -= this.gravity * this.e.dt;
			}

			if (this.playerCont.position.y + this.yspeed * this.e.dt < this.ground) {
				this.yspeed = 0;
				this.jumping = false;
				this.playerCont.position.y = this.ground;
			} else {
				this.playerCont.position.y += this.yspeed * this.e.dt;
			}

			//--------------------------------------------------------------------------------------------------------------

			// rotate ball

			this.playerCont.rotation.y = this.e.u.ca(this.xspeed * 2);

			this.ball.position.x = this.playerCont.position.x - 0.22 + this.xspeed * 0.02;
			this.ball.position.y = 0.22 + this.ballTweenObject.y;
			this.ball.position.z = this.playerCont.position.z + 0.5 + this.ballTweenObject.z;

			if (this.jumping === true) {
				this.ballTween.pause();
			} else {
				this.ballTween.resume();
			}

		}

	}

	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---MIXER-------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------

	mixer() {
		if (document.getElementById("mix").checked === true) {
			// document.getElementById("gradDiv").style.background = "linear-gradient(to bottom,  #"+this.gradCol1+" 0%, #"+this.gradCol2+" 100%)";

			//-------------------------------------

			var c1_H = document.getElementById("c1_H").value;
			var c1_S = document.getElementById("c1_S").value;
			var c1_L = document.getElementById("c1_L").value;

			// this.floorMaterial.color.setHex( "0x"+this.hslToHex(c1_H,c1_S,c1_L) );

			document.getElementById("c1_Color").value = this.hslToHex(
				c1_H,
				c1_S,
				c1_L
			);
			this.blobMaterial.color.setHex( "0x"+this.hslToHex(c1_H,c1_S,c1_L) );
			// this.rig.material.color.setHex( "0x"+this.hslToHex(c1_H,c1_S,c1_L) );
			// this.roofBarsInner.material.color.setHex( "0x"+this.hslToHex(c1_H,c1_S,c1_L) );

			//-------------------------------------

			var c2_H = document.getElementById("c2_H").value;
			var c2_S = document.getElementById("c2_S").value;
			var c2_L = document.getElementById("c2_L").value;

			document.getElementById("c2_Color").value = this.hslToHex(
				c2_H,
				c2_S,
				c2_L
			);

			// this.spinner2Material.color.setHex( "0x"+this.hslToHex(c2_H,c2_S,c2_L) );
			// this.roofBars.material.color.setHex( "0x"+this.hslToHex(c2_H,c2_S,c2_L) );
			// this.dotMaterial.emissive.setHex( "0x"+this.hslToHex(c2_H,c2_S,c2_L) );

			//-------------------------------------

			var c3_H = document.getElementById("c3_H").value;
			var c3_S = document.getElementById("c3_S").value;
			var c3_L = document.getElementById("c3_L").value;

			document.getElementById("c3_Color").value = this.hslToHex(
				c3_H,
				c3_S,
				c3_L
			);
			this.roofEdge.material.color.setHex(
				"0x" + this.hslToHex(c3_H, c3_S, c3_L)
			);

			// this.mintOrange.material.color.setHex( "0x"+this.hslToHex(c3_H,c3_S,c3_L) );

			//-------------------------------------

			var c4_H = document.getElementById("c4_H").value;
			var c4_S = document.getElementById("c4_S").value;
			var c4_L = document.getElementById("c4_L").value;

			document.getElementById("c4_Color").value = this.hslToHex(
				c4_H,
				c4_S,
				c4_L
			);

			// this.ambLight.color.setHex( "0x"+this.hslToHex(c4_H,c4_S,c4_L) );

			//-------------------------------------

			var c5_H = document.getElementById("c5_H").value;
			var c5_S = document.getElementById("c5_S").value;
			var c5_L = document.getElementById("c5_L").value;

			document.getElementById("c5_Color").value = this.hslToHex(
				c5_H,
				c5_S,
				c5_L
			);

			//-------------------------------------

			var num1 = document.getElementById("num1").value;
			var num2 = document.getElementById("num2").value;
			var num3 = document.getElementById("num3").value;

			// this.dl_shad.position.x = num1;
			// this.dl_shad.position.z = num2;
			// this.dl_shad.position.y = num3;

			// this.dotMaterial.opacity = num1/100;
			// this.castleDoors.material.metalness = num2/100;
			// this.castleDoors.material.roughness = num3/100;
		}
	}

	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---UTILS-------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------

	hslToHex(h, s, l) {
		l /= 100;
		const a = (s * Math.min(l, 1 - l)) / 100;
		const f = (n) => {
			const k = (n + h / 30) % 12;
			const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * color)
				.toString(16)
				.padStart(2, "0"); // convert to Hex and prefix "0" if needed
		};
		return `${f(0)}${f(8)}${f(4)}`;
	}

	HSLToRGB = (h, s, l) => {
		s /= 100;
		l /= 100;
		const k = (n) => (n + h / 30) % 12;
		const a = s * Math.min(l, 1 - l);
		const f = (n) =>
			l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
		return [255 * f(0), 255 * f(8), 255 * f(4)];
	};
}
