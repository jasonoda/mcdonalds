import * as THREE from "../../build/three.module.js";
import { gsap } from "./greensock/all.js";

export class Scene {
	setUp(e) {
		this.e = e;
		this.uniformArray=[];
	}

	buildScene() {
		//---VARS--------------------------------------------------------------------------------------------------------------------

		this.playerAction = "set";
		this.count = 0;

		this.movePlayer = true;
		this.aniAction = "go"
		this.ballAction = "go"

		this.raycaster = new THREE.Raycaster();

		this.spinnerBoxes=[];
		this.holeLines=[];
		
		this.uniformColor=new THREE.Color(0x4e228c)

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
		// this.dl_shad.shadow.bias = 0.001;

		this.e.sSize = 210;
		this.dl_shad.shadow.camera.near = 0.1;
		this.dl_shad.shadow.camera.far = 680;
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

		this.waterLines=[];
		this.hasPushedButton3 = false;
		this.landAt = 0;


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

		console.log(this.e.readyplayerme)
		
		this.animations = this.e.readyplayerme.animations;

		this.runningClip = THREE.AnimationClip.findByName(this.animations, "Running");
		this.runningAction = this.e.readyplayerme.animMixer.clipAction(this.runningClip);

		this.spinningClip = THREE.AnimationClip.findByName(this.animations, "Spinning");
		this.spinningAction = this.e.readyplayerme.animMixer.clipAction(this.spinningClip)

		this.strikeClip = THREE.AnimationClip.findByName(this.animations, "Strike");
		this.strikeAction = this.e.readyplayerme.animMixer.clipAction(this.strikeClip)

		this.idleClip = THREE.AnimationClip.findByName(this.animations, "Idle");
		this.idleAction = this.e.readyplayerme.animMixer.clipAction(this.idleClip)

		this.rushClip = THREE.AnimationClip.findByName(this.animations, "SodaRush");
		this.rushAction = this.e.readyplayerme.animMixer.clipAction(this.rushClip)
		this.rushAction.setEffectiveWeight(1)
		this.rushAction.enabled=true;

		this.stumbleClip = THREE.AnimationClip.findByName(this.animations, "Stumble");
		this.stumbleAction = this.e.readyplayerme.animMixer.clipAction(this.stumbleClip);
		this.stumbleAction.setEffectiveWeight(1)
		this.stumbleAction.enabled=true;
		
		// this.rushAction.play();
		this.runningAction.play();
		// this.stumbleAction.play();
		// this.strikeAction.play();
		// this.strikeAction.setLoop(THREE.LoopOnce);
		
		this.playerBody = this.e.readyplayerme;
		this.playerBody.scale.set(1.5, 1.5, 1.5);

		this.playerCont.add(this.playerBody);

		//-----------------------------------------------------------

		// ball
		
		// var geometry = new THREE.SphereGeometry(0.2, 30, 16);
		// var material = new THREE.MeshStandardMaterial({ color: 0xcccccc });
		// this.ball = new THREE.Mesh(geometry, material);

		this.ballCont = new THREE.Group();
		this.e.scene3D.add(this.ballCont);

		this.ballCont2 = new THREE.Group();
		this.ballCont.add(this.ballCont2);

		this.ball = this.e.soccerBall.clone();

		this.ball.castShadow = true;
		this.ball.receiveShadow = true;
		this.ballCont2.add(this.ball);

		this.ball.traverse((object) => {

			this.ballObject = object;

		});

		// console.log(this.ballObject)

		// gsap.to(this.ballObject.position, { x: 5, duration: 0.365, repeat: -1, yoyo: true, ease: "sine.expo"});

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

		this.coneMaterial = new THREE.MeshStandardMaterial({ wireframe: false, color: 0x419b95});

		//---FIELD BACKGROUND--------------------------------------------------------------------------

		this.field = this.e.field.clone();
		this.field.scale.x = 1.5;
		this.field.scale.y = 1.5;
		this.field.scale.z = 7;
		this.field.position.y = -0.25;
		this.mainCont.add(this.field);

		this.field.traverse((object) => {
			if (object.material !== undefined) {

				// console.log(object.name)

				this.saveMat = object.material.map

				if(object.name==="field"){
					// object.color = 0xffffff;
					object.castShadow=false;
					object.material = new THREE.MeshStandardMaterial({ wireframe: false, color: 0xffffff, map: this.saveMat});
				}
				
				// if(object.material!==undefined){
				// 	console.log(object.material.map)
				// }
				

			}
		});

		//---FLOOR BACKGROUND--------------------------------------------------------------------------

		this.sLights = [];
		this.sLights2 = [];

		this.stadium = this.e.stadium.clone();
		this.stadium.scale.x = 1.5;
		this.stadium.scale.y = 1.5;
		this.stadium.scale.z = 7;
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
			} else if (object.name === "lines" || object.name === "lines2" || object.name === "lines3" || object.name === "logo") {

				object.material = new THREE.MeshBasicMaterial({ wireframe: false, color: 0xffbc0d });

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
		this.goal.position.z = 332;
		this.goal.rotation.y = this.e.u.ca(180);
		this.mainCont.add(this.goal);

		this.targets = [];

		this.goal.traverse((object) => {

			if (object.material !== undefined) {

				// console.log(object.name + " / " +object.material.name)
			
				this.saveMat = object.material.map;

			}

			// console.log(object.name)

			if(object.name==="net"){

				object.material = new THREE.MeshStandardMaterial({ color: 0x66ff66, transparent: true, map: this.saveMat, side: THREE.DoubleSide });
				object.castShadow=false

			}else if(object.name==="frame"){

				object.receiveShadow=false
				
			}else if(object.name==="target1_1"){

				// this.targets.push(object);
				object.offsetY=-1;
				object.cont=object.parent;
				object.num=1
				object.startTexture=this.e.target2000;
				object.highlightTexture=this.e.target2000_b;
				object.material.map=object.startTexture;
				object.material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: object.startTexture });

				object.startRot = object.cont.rotation.x;

				object.receiveShadow=false;
				this.target1=object;

			}else if(object.name==="target2_1"){

				// this.targets.push(object);
				object.offsetY=1;
				object.cont=object.parent;
				object.num=2
				object.startTexture=this.e.target1000;
				object.highlightTexture=this.e.target1000_b;
				object.material.map=object.startTexture;
				object.material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: object.startTexture });

				object.startRot = object.cont.rotation.x;

				object.receiveShadow=false;
				this.target2=object;

			}else if(object.name==="target3_1"){

				// this.targets.push(object);
				object.offsetY=2;
				object.cont=object.parent;
				object.num=3
				object.startTexture=this.e.target500;
				object.highlightTexture=this.e.target500_b;
				object.material.map=object.startTexture;
				object.material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: object.startTexture });

				object.startRot = object.cont.rotation.x;

				object.receiveShadow=false;
				this.target3=object;

			}else if(object.name==="target4_1"){

				// this.targets.push(object);
				object.offsetY=-1;
				object.cont=object.parent;
				object.num=4
				object.startTexture=this.e.target1000;
				object.highlightTexture=this.e.target1000_b;
				object.material.map=object.startTexture;
				object.material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: object.startTexture });

				object.startRot = object.cont.rotation.x;

				object.receiveShadow=false;
				this.target4=object;

			}else if(object.name==="target5_1"){

				// this.targets.push(object);
				object.offsetY=2;
				object.cont=object.parent;
				object.num=5
				object.startTexture=this.e.target500;
				object.highlightTexture=this.e.target500_b;
				object.material.map=object.startTexture;
				object.material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: object.startTexture });

				object.startRot = object.cont.rotation.x;

				object.receiveShadow=false;
				this.target5=object;

			}else if(object.name==="target6_1"){

				// this.targets.push(object);
				object.offsetY=1;
				object.cont=object.parent;
				object.num=6
				object.startTexture=this.e.target1000;
				object.highlightTexture=this.e.target1000_b;
				object.material.map=object.startTexture;
				object.material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: object.startTexture });

				object.startRot = object.cont.rotation.x;

				object.receiveShadow=false;
				this.target6=object;

			}else if(object.name==="target7_1"){

				// this.targets.push(object);
				object.offsetY=-1;
				object.cont=object.parent;
				object.num=7
				object.startTexture=this.e.target2000;
				object.highlightTexture=this.e.target2000_b;
				object.material.map=object.startTexture;
				object.material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: object.startTexture });

				object.startRot = object.cont.rotation.x;

				object.receiveShadow=false;
				this.target7=object;

			}

		});

		this.targets.push(this.target1);
		this.targets.push(this.target2);
		this.targets.push(this.target3);
		this.targets.push(this.target4);
		this.targets.push(this.target5);
		this.targets.push(this.target6);
		this.targets.push(this.target7);

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

		this.fieldStart = -320;
		// this.fieldStart = -260;
		this.fieldEnd = 260 * 1;
		this.gameSpeed = 16;

		this.gateContainers = [];
		this.spinners = [];
		this.poleContainers = [];

		this.resetBoard();

		this.makeWaterLine(210, 2);

		this.makePellet(180+5, 0);
		this.makeConeLine(180, 2);
		this.makePellet(165+5, 0);
		this.makeConeLine(165, 1);
		this.makePellet(150+5, 0);
		this.makeConeLine(150, 2);
		// this.makeConeLine(70, 2);
		// this.makeConeLine(-70, 2);

		//this.makePoleLine(130, 0);

		//this.makeSpinner(0, 120);
		//this.makeSpinner(17, 120);
		//this.makeSpinner(-17, 120);

		// this.makePellet(110, 0);

		//this.makeSpinner(8.5, 100);
		//this.makeSpinner(-8.5, 100);

		// this.makePellet(90, 0);

		this.makeHoleLine(106.5)

		//this.makePoleLine(75, 0);
		//this.makePoleLine(60, 0);

		//this.makeGateLine(40, 0.5);

		// this.makePellet(30, 0);

		this.makeConeLine(80, 2);
		this.makePellet(65+5, 0);
		this.makeConeLine(65, 1);
		this.makePellet(50+5, 0);
		this.makeConeLine(50, 2);

		this.makeWaterLine(30, 2);

		//this.makeSpinner(8.5, 20);
		//this.makeSpinner(-8.5, 20);

		// this.makePellet(5, 0);

		this.makePellet(-5, 0);
		this.makePellet(-15, 0);
		// this.makePellet(-20, 0);

		this.makePellet(-30+5, 0);
		this.makeConeLine(-30, 2);
		this.makePellet(-45+5, 1);
		this.makeConeLine(-45, 1);
		this.makePellet(-60+5, 1);
		this.makeConeLine(-60, 2);

		//this.makeSpinner(0, -10);
		//this.makeSpinner(17, -10);
		//this.makeSpinner(-17, -10);

		//this.makeGateLine(-30, 0);

		// this.makePellet(-40, 0);

		//this.makePoleLine(-50, 2);

		// this.makeConeLine(-65, 2);

		//this.makeSpinner(8.5, -80);
		//this.makeSpinner(-8.5, -80);

		// this.makePellet(-90, 0);

		// this.makePellet(-60, 1);
		// this.makePellet(-70, 1);
		// this.makePellet(-80, 1);

		this.makeHoleLine(-100)

		//this.makeSpinner(0, -100);
		//this.makeSpinner(17, -100);
		//this.makeSpinner(-17, -100);

		// this.makePellet(-115, 0);

		//this.makePoleLine(-125, 2);

		this.makeConeLine(-130, 2);
		this.makePellet(-135-5, 0);
		this.makeConeLine(-145, 1);
		this.makePellet(-150-5, 0);
		this.makeConeLine(-160, 2);

		this.makeWaterLine(-180, 2);

		this.makePellet(-210-5, 0);
		this.makeConeLine(-220, 2);
		this.makePellet(-225-5, 0);
		this.makeConeLine(-235, 1);
		this.makePellet(-240-5, 0);
		this.makeConeLine(-250, 2);

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

	makeHoleLine(z){

		for(var i=-3; i<4; i++){

			this.makePellet(z, i*11.9, false)

			var geometry = new THREE.BoxGeometry(4.5, .75, 14);
			var material = new THREE.MeshStandardMaterial({ color: 0x66ff66, visible: false });
			this.spinnerBox = new THREE.Mesh(geometry, material);
			this.spinnerBox.position.z = z-10   ;
			this.spinnerBox.position.x = i*11.9;
			this.spinnerBox.position.y = 1.25/2;
			this.mainCont.add( this.spinnerBox );
	
			this.spinnerBoxes.push(this.spinnerBox);

			//

			var geometry = new THREE.BoxGeometry(4.5, 2.5, 6);
			var material = new THREE.MeshStandardMaterial({ color: 0x66ff66, visible: false });
			this.holeBox = new THREE.Mesh(geometry, material);
			this.holeBox.position.z = z+18;
			this.holeBox.position.x = i*11.9;
			this.mainCont.add( this.holeBox );
	
			this.crashers.push(this.holeBox)

		}

		var geometry = new THREE.BoxGeometry(1, 21, 1);
		var material = new THREE.MeshStandardMaterial({ color: 0xff0000, visible: false });
		this.holeLine = new THREE.Mesh(geometry, material);
		this.holeLine.position.z = z;

		this.holeLine.action="wait"
		this.holeLines.push(this.holeLine)
		this.mainCont.add( this.holeLine );

		this.holeLine.spinnerBoxes=[];

		for(var i=0; i<this.spinnerBoxes.length; i++){

			this.holeLine.spinnerBoxes.push( this.spinnerBoxes[i] );

		}

	}

	controlHoleLines(){

		for(var i=0; i<this.holeLines.length; i++){

			// console.log(this.holeLines[i])

			if(this.holeLines[i].action==="wait"){

				var d = this.holeLines[i].position.z - this.playerCont.position.z
				if(d<30){
	
					this.holeLines[i].action="alert";
	
				}

			}else if(this.holeLines[i].action==="alert"){

				console.log("----------------SET SPIN----------------")

				this.e.ui.highlight1();
				this.holeLines[i].action="ready";

				this.hasPushedButton1 = false;

			}else if(this.holeLines[i].action==="ready"){

				if(this.hasPushedButton1===true){

					this.uniformFlash()

					// console.log("success")

					this.e.ui.highlightReset();

					// find the closest spinner

					var closestBox = null;
					var closestDistance = 100000

					for(var j=0; j<this.holeLines[i].spinnerBoxes.length; j++){

						var d = this.holeLines[i].spinnerBoxes[j].position.x - this.playerCont.position.x

						// console.log("------"+j+"---"+d)

						if( Math.abs(d)<closestDistance){

							closestBox = this.holeLines[i].spinnerBoxes[j];
							closestDistance = Math.abs(d);

						}

					}

					this.mySpinnerBox = closestBox

					// change the player action to be locked in

					this.playerAction = "set spin";
					this.doTheSpinAt = this.holeLines[i].position.z;

					this.holeLines[i].action="done"

					this.hasPushedButton1 = false;


				}

				if(this.playerCont.position.z>this.holeLines[i].position.z){

					this.e.ui.highlightReset()
					this.holeLines[i].action="done"

				}

			}else if(this.holeLines[i].action==="done"){

			}
			
		}

		
	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	makeWaterLine(z){

		this.waterLine = this.e.waterLine.clone();
		this.waterLine.position.z = z;

		this.waterLine.traverse((object) => {
			
			object.receiveShadow = false;
			object.castShadow = false;

			// console.log(object.name)

			if( object.name==="water" ){

				object.material = new THREE.MeshStandardMaterial({ color: 0x3d5b6c });
				this.water = object;

			}else if( object.name==="ramp_0" || object.name==="divs" ){

				object.material = new THREE.MeshStandardMaterial({ color: 0x772318 });
				this.ramp1 = object;

			}else if( object.name==="ramp_1" ){

				object.material = new THREE.MeshStandardMaterial({ color: 0x912921 });
				this.ramp2 = object;

			}else if( object.name==="grad" ){

				object.material.opacity = .3

			}else if( object.name==="grad2" ){

				object.material.opacity = .3
				// object.material = new THREE.MeshStandardMaterial({ color: 0xff0000, side: THREE.DoubleSide });
				// object.material.opacity = 1

			}

		});

		this.waterLine.scale.y = 1;
		this.waterLine.scale.x = 1.2;
		this.waterLine.scale.z = 3;
		// this.waterLine.position.y = .2
		this.mainCont.add(this.waterLine);

		this.waterLines.push(this.waterLine);

	}

	controlWaterLines(){

		for(var i=0; i<this.waterLines.length; i++){

			if(this.waterLines[i].action===undefined){

				this.waterLines[i].action="wait";

			}else if(this.waterLines[i].action==="wait"){

				var d = this.waterLines[i].position.z - this.playerCont.position.z
				if(d<35){
	
					this.waterLines[i].action="alert";
	
				}

			}else if(this.waterLines[i].action==="alert"){

				this.e.ui.highlight3();

				this.waterLines[i].action="ready";

			}else if(this.waterLines[i].action==="ready"){

				var d = this.waterLines[i].position.z - this.playerCont.position.z
				if(d<5 && this.playerAction==="move"){

					this.playerAction="crash"
					this.waterLines[i].action="complete"

					this.e.ui.highlightReset()

				}
	
				if(this.hasPushedButton3===true){

					console.log("success")

					this.uniformFlash()

					this.e.ui.highlightReset();

					this.waterLines[i].action="complete";
					this.playerAction="fly set";
					this.landAt = this.waterLines[i].position.z+10;

				}

			}else if(this.waterLines[i].action==="complete"){



			} 

		}

		this.hasPushedButton3 = false;

	}

	makeConeLine(z, type){

		this.coneCont = new THREE.Group();
		this.mainCont.add(this.coneCont);

		this.coneCont.position.z = z;

		for (var i = -6; i < 6; i++) {

			if(type===1){
				this.cone = this.e.cone2.clone();
			}else{
				this.cone = this.e.cone.clone();
			}

			this.cone.traverse((object) => {
				
				// object.material = this.coneMaterial;
				object.receiveShadow = false;
				object.castShadow = true;

			});

			if(type===1){
				this.cone.position.x = (i * 6);
			}else{
				this.cone.position.x = (i * 6) + 3;
			}
			
			this.cone.scale.x = this.cone.scale.y = this.cone.scale.z = 0.45;
			this.coneCont.add(this.cone);

			var geometry = new THREE.BoxGeometry(1.65, 1.25, 1.65);
			var material = new THREE.MeshStandardMaterial({ color: 0x66ff66, visible: false });
			this.crashBox = new THREE.Mesh(geometry, material);
			this.crashBox.position.x = this.cone.position.x;
			this.crashBox.position.y = 1.25/2;
			this.coneCont.add( this.crashBox );
	
			this.crashBox.name = "coneCrashBox";
			this.crashers.push(this.crashBox);
	
		}

	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	makePellet(z, x, addRan) {
		// var geometry = new THREE.SphereGeometry(.25,20,20);
		// var material = new THREE.MeshStandardMaterial({ color: 0x66ff66 });
		// this.pellet = new THREE.Mesh(geometry, material);
		this.pellet = this.e.ring.clone();
		this.pellet.position.y = 1.2;
		this.pellet.position.z = z;

		if(addRan===false){
			this.pellet.position.x = x;
		}else{
			this.pellet.position.x = x + this.e.u.nran(5);
		}
		

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

		for (var i = -4; i < 4; i++) {

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

			this.gate.scale.z = 1.1;
			this.gate.position.x = i * 11;
			this.gate.rotation.y = this.e.u.ca(90);

			this.gateCont.add(this.gate);

			this.gate.traverse((object) => {

				object.castShadow = false;
				object.receiveShadow = false;

				if (object.name === "door") {

					this.gateCont.gates.push(object);
					object.delay = delay;

					if(i===-3){

						object.material = new THREE.MeshStandardMaterial({ color: "red", visible: false });
						object.position.x=10000;

					}else{

						object.material = this.gateMaterial;

					}

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

	uniformFlash(){

		this.uniformColor = new THREE.Color( "#ffffff" );

		var endColor = new THREE.Color( "#4e228c" );
    	gsap.to(this.uniformColor, { r: endColor.r, g: endColor.g, b: endColor.b, duration: 1});

	}

	update() {

		for(var i=0; i<this.uniformArray.length; i++){

			this.uniformArray[i].color= this.uniformColor 

		}

		this.dl_shad.target.position.set( this.playerCont.position.x, this.dl_shad.target.position.y, this.playerCont.position.z );

		this.controlPoleLines()
		this.controlGates();
		this.controlSpinners();
		this.controlRings();
		this.controlWaterLines()
		this.controlHoleLines();

		this.mixer();

		//--------------------------------------------------------------------------------------------------------------

		// GAME ACTIONS

		if(this.gameAction===undefined){

			this.gameAction="run";
			this.gameCount=0;

		}else if(this.gameAction==="run"){

			// -----------------------------------------------------------------

			if(this.playerCont.position.z > this.fieldEnd-15){

				this.gameAction="set move to center";

			}

		}else if(this.gameAction==="set move to center"){

			this.xspeed=0;

			// -----------------------------------------------------------------

			this.playerCont.position.z += this.e.dt * this.gameSpeed;

			// -----------------------------------------------------------------

			this.et = 1;

			gsap.to(this.e.camContX.rotation, { x: this.e.u.ca(-8), duration: this.et, ease: "expo.out"});

			gsap.to(this.playerCont.position, { x: 0, duration: this.et, ease: "sine.inOut"});

			if( this.playerCont.position.x < -10){
				gsap.to(this.playerCont.rotation, { y: this.e.u.ca(45), duration: this.et/2, ease: "sine.out"});
				gsap.to(this.playerCont.rotation, { y: this.e.u.ca(0), duration: this.et/2, delay: this.et/2, ease: "sine.in"});
			}else if( this.playerCont.position.x > 10){
				gsap.to(this.playerCont.rotation, { y: this.e.u.ca(-45), duration: this.et/2, ease: "sine.out"});
				gsap.to(this.playerCont.rotation, { y: this.e.u.ca(0), duration: this.et/2, delay: this.et/2, ease: "sine.in"});
			}

			this.playerAction="wait"
			this.gameAction="move to center"

		}else if(this.gameAction==="move to center"){

			this.xspeed=0;

			// -----------------------------------------------------------------

			this.playerCont.position.z += this.e.dt * this.gameSpeed;

			// -----------------------------------------------------------------

			this.gameCount+=this.e.dt

			if(this.gameCount>this.et){

				this.gameCount=0;
				this.gameAction="set shoot";

			}

		}else if(this.gameAction==="set shoot"){
			
			this.ballTween.pause();
			gsap.to(this.ballCont.position, { z: this.playerCont.position.z + 2, duration: .3, ease: "sine.out"});

			this.strikeAction.play();
			this.runningAction.crossFadeTo(this.strikeAction, 0.3, true)

			// this.runningAction.stop();
			// this.strikeAction.play();
			// this.aniAction="pause";

			this.gameAction="shoot ani wait";
			this.ballAction="pause"

		}else if(this.gameAction==="shoot ani wait"){

			this.gameCount+=this.e.dt

			if(this.gameCount>.225){
				this.strikeAction.paused = true;
				this.gameAction="shoot";

				this.currentTarget = -1;
				this.targetDirection = "up"

				this.e.ui.highlight2();
			}

		}else if(this.gameAction==="shoot"){

			this.gameCount+=this.e.dt

			if(this.gameCount>.1){

				// console.log(this.currentTarget);

				this.gameCount=0;

				if(this.targetDirection==="up"){

					this.currentTarget+=1;
					if(this.currentTarget>=6){

						this.targetDirection="down"

					}
				
				}else{

					this.currentTarget-=1;
					if(this.currentTarget<=0){

						this.targetDirection="up"

					}
				
				}

				for(var i=0; i<this.targets.length; i++){

					this.targets[i].material.map = this.targets[i].startTexture;

				}

				this.targets[this.currentTarget].material.map = this.targets[this.currentTarget].highlightTexture;
	
			}

		}else if(this.gameAction==="pick target"){

			console.log("was picked")

			this.e.ui.highlightReset();

			this.pickedTarget = this.targets[this.currentTarget];

			this.gameAction="shoot set";
			

		// }else if(this.gameAction==="shoot"){

		// 	var closestTarget = null;
		// 	this.pickedTarget = null;
		// 	var closestDistance = 1000000;

		// 	for(var i=0; i<this.targets.length; i++){

		// 		var targetTestX = this.e.u.vectorToScreenPos( this.targets[i], this.e.camera ).x;
		// 		var targetTestY = this.e.u.vectorToScreenPos( this.targets[i], this.e.camera ).y - (this.targets[i].offsetY*30);

		// 		// console.log("----")
		// 		// console.log(i)
		// 		// console.log(targetTestX)
		// 		// console.log(targetTestY)

		// 		if(this.e.mouseDown.x!==undefined){
					
		// 			var closestTarget = this.e.u.getDistance(targetTestX, targetTestY , this.e.mouseDown.x, this.e.mouseDown.y);

		// 			// console.log(this.e.mouseDown.x + " / " + this.e.mouseDown.y)
		// 			// console.log(i+" / "+closestTarget)

		// 			if( closestTarget < closestDistance ){

		// 				closestDistance = closestTarget;
		// 				this.pickedTarget = this.targets[i];

		// 			}
				
		// 		}
			
		// 	}

		// 	// console.log(this.pickedTarget)

		}else if(this.gameAction==="shoot set"){

			this.pickedTargetLoc = new THREE.Vector3();
			this.pickedTarget.getWorldPosition(this.pickedTargetLoc);

			this.uniformFlash()

			this.ballFlyTime=.4;

			gsap.to(this.ballCont2.position, { x: this.ballCont.position.x+1, y: this.ballCont.position.y+1, duration: this.ballFlyTime/2, delay:.15, ease: "sine.out"});
			gsap.to(this.ballCont2.position, { x: 0, y: 0, delay: (this.ballFlyTime/2)+.15, duration: this.ballFlyTime/2, ease: "sine.in"});
			gsap.to(this.ballCont.position, { x: this.pickedTargetLoc.x, y: this.pickedTargetLoc.y + this.pickedTarget.offsetY, z: this.pickedTargetLoc.z-.25, duration: this.ballFlyTime, delay:.15, ease: "linear"});

			this.strikeAction.paused = false;

			this.strikeActionPauseCount=0;
			this.gameCount=0;
			this.gameAction="shooting"

			this.strikeAction.play();

		}else if(this.gameAction==="shooting"){

			this.strikeActionPauseCount+=this.e.dt;

			this.gameCount+=this.e.dt;

			if(this.gameCount>this.ballFlyTime){

				this.gameCount=0;
				this.gameAction="hit target"

			}

		}else if(this.gameAction==="hit target"){

			// ball has hit target

			// rotate the sign accordingly

			if(this.pickedTarget.num===1 || this.pickedTarget.num===4 || this.pickedTarget.num===7){
				gsap.to(this.pickedTarget.cont.rotation, { x: this.e.u.ca(90), duration: .1, ease: "sine.out"});
			}else{
				gsap.to(this.pickedTarget.cont.rotation, { x: this.e.u.ca(-90), duration: .1, ease: "sine.out"});
			}

			// kill tweens on ball
			
			gsap.killTweensOf(this.ballCont.position);
			gsap.to(this.ballCont.position, { x: this.ballCont.position.x*1, z: this.ballCont.position.z+29, duration: 3, ease: "expo.out"});

			//bounce after

			if(this.pickedTarget.num===1 || this.pickedTarget.num===4 || this.pickedTarget.num===7){
				gsap.to(this.ballCont.position, { y: 0.22, duration: 2, ease: "bounce.out"});
			}else{
				gsap.to(this.ballCont.position, { y: this.ballCont.position.y+2	, duration: 1, ease: "sine.out"});
				gsap.to(this.ballCont.position, { y: 0.22, duration: 2, delay: 1, ease: "bounce.out"});
			}
			
			this.ballCont2.rotation.x=0;
			this.ballCont2.rotation.y=0;
			this.ballCont2.rotation.z=0;

			// rotate the ball

			if(this.ball.position.x<0){
				// gsap.to(this.ball.rotation, { x: this.ball.rotation.x-5, z: this.ball.rotation.z+5, duration: 3, ease: "expo.out"});
				gsap.to(this.ballCont2.rotation, { z: this.ballCont2.rotation.z+15, duration: 3.5, ease: "sine.out"});
			}else{
				// gsap.to(this.ball.rotation, { x: this.ball.rotation.x+5, z: this.ball.rotation.z+5, duration: 3, ease: "expo.out"});
				gsap.to(this.ballCont2.rotation, { z: this.ballCont2.rotation.z-15, duration: 3.5, ease: "sine.out"});
			}

			this.gameAction="has hit target"

		}else if(this.gameAction==="has hit target"){

			this.strikeActionPauseCount+=this.e.dt;

			if(this.strikeActionPauseCount>.8){

				this.strikeAction.paused = true;

				this.properFade(this.strikeAction, this.idleAction, .2)

				this.gameAction="done"

			}

			// this.gameCount+=this.e.dt;
			// if(this.gameCount>4){

				// for(var i=0; i<this.targets.length; i++){
				// 	this.targets[i].cont.rotation.x=this.targets[i].startRot;
				// }

				// this.ballCont.position.x=0;

				// this.gameAction = "set shoot"

			// }

		}

		// if (this.playerCont.position.z > this.fieldEnd) {
		// 	this.resetBoard();
		// }

		//--------------------------------------------------------------------------------------------------------------

		// CONTROL BALL

		if(this.ballAction==="go"){

			this.ballCont.position.x = this.playerCont.position.x - 0.22 + this.xspeed * 0.02;
			this.ballCont.position.y = 0.22 + this.ballTweenObject.y;
			this.ballCont.position.z = this.playerCont.position.z + 0.5 + this.ballTweenObject.z;

			this.ballCont2.rotation.x+=this.e.dt*20;

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
				if(this.aniAction==="go"){
					this.e.readyplayerme.animMixer.update(this.e.dt);
				}
			}
		}
		
		//--------------------------------------------------------------------------------------------------------------

		// PLAYER CONTROLS

		if (this.playerAction === "set") {

			this.xspeed = 0;
			this.maxSpeed = 12;
			this.speedIncrease = 40;

			this.playerCount=0;
			this.playerAction = "move";

		} else if (this.playerAction === "move") {

			// -----------------------------------------------------------------

			if(this.movePlayer===true){

				this.playerCont.position.z += this.e.dt * this.gameSpeed;
				
			}

			//--------------------------------------------------------------------------------------------------------------

			// crash intersections

			this.hasHit=false;

			if(this.playerCont.position.z>this.fieldStart+30){
					
				for(var i=0; i<this.crashers.length; i++){

					const box1 = new THREE.Box3().setFromObject(this.playerHit2);
					const box2 = new THREE.Box3().setFromObject(this.crashers[i]);
		
					if (box1.intersectsBox(box2) === true) {

						if(this.playerAction==="move"){
							this.playerAction="crash";
						}
						
						console.log("HIT "+this.crashers[i].name)
						this.hasHit=true;
						
					}

				}

			}

			if(this.hasHit===true){
				// this.playerHit2.material.visible=true;
			}else{
				this.playerHit2.material.visible=false;
			}

			//--------------------------------------------------------------------------------------------------------------

			// for(var i=0; i<this.holeLines.length; i++){

			// 	var d = this.holeLines[i].position.z - this.playerCont.position.z
			// 	if(d<30){
	
			// 		this.holeLines[i].action="alert";
	
			// 	}


			// }

			// for(var i=0; i<this.spinnerBoxes.length; i++){

			// 	const box1 = new THREE.Box3().setFromObject(this.playerHit2);
			// 	const box2 = new THREE.Box3().setFromObject(this.crashers[i]);
	
			// 	if (box1.intersectsBox(box2) === true) {

			// 		if(this.playerAction==="move"){
			// 			this.playerAction="crash";
			// 		}
					
			// 		console.log("HIT "+this.crashers[i].name)
			// 		this.hasHit=true;
					
			// 	}

			// }

			//--------------------------------------------------------------------------------------------------------------

			// rotation

			this.playerCont.rotation.y = this.e.u.ca(this.xspeed * 2);

			//--------------------------------------------------------------------------------------------------------------

			// xspeed

			this.playerSideToSide();

			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------

		} else if (this.playerAction === "crash") {

			this.properFade(this.runningAction, this.stumbleAction, .2, 1.5)
			this.playerCount = 0;
			this.playerAction = "crashing"

			this.isCrashing=true;
			this.crashingTime=0;

		} else if (this.playerAction === "crashing") {

			// xspeed

			this.playerSideToSide();

			// this.playerCont.position.x += this.e.dt * this.xspeed; 
			this.playerCont.position.z += this.e.dt * this.gameSpeed;

			this.playerCount+=this.e.dt;

			if(this.playerCount>.8){

				this.properFade(this.stumbleAction, this.runningAction, .4)
				this.playerAction = "move"

				this.isCrashing=false;
	
			}

			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------

		} else if (this.playerAction === "fly set") {

			this.properFade(this.runningAction, this.rushAction, .4)

			gsap.to(this.playerCont.position, { y: 2, duration: 0.2, ease: "expo.out"});
			gsap.to(this.playerCont.position, { z: this.landAt, duration: 1, delay: .5, ease: "expo.out"});
			// gsap.to(this.playerCont.position, { y: 0, duration: 0.3, delay: 1.25, ease: "sine.in"});
			gsap.to(this.playerCont.position, { y: 0, duration: 0.3, delay: 1.25, ease: "sine.in"});
			
			this.playerCount=0;
			this.playerAction = "fly"

			this.ballAction = "pause"
			gsap.to(this.ballCont2.position, { x: -.2, y: this.playerCont.position.y + 2, duration: 0.3, ease: "sine.out"});

		} else if (this.playerAction === "fly") {

				// keep moving player
				this.ballCont.position.z = this.playerCont.position.z
				//

			this.playerCount+=this.e.dt;

			if(this.playerCount>1.2){

				this.ballAction = "go"
				gsap.to(this.ballCont2.position, { x: 0, y: 0, duration: 0.3, ease: "sine.out"});
	
				this.properFade(this.rushAction, this.runningAction, .4)

				this.playerAction="move"

			}

			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------
			//--------------------------------------------------------------------------------------------------------

		}else if(this.playerAction === "set spin"){

				// keep moving player
				this.playerCont.position.z += this.e.dt * this.gameSpeed;
				//

			// console.log(this.mySpinnerBox)

			gsap.to(this.playerCont.position, { x: this.mySpinnerBox.position.x, duration: 0.6, ease: "sine.out"});

			this.playerCount = 0;
			this.playerAction = "go to position"

		}else if(this.playerAction === "go to position"){

				// keep moving player
				this.playerCont.position.z += this.e.dt * this.gameSpeed;
				//

			this.playerCount+=this.e.dt;

			if(this.playerCount>0.6){

				this.playerAction = "wait get to ring"
				this.playerCount = 0;

			}

		}else if(this.playerAction === "wait get to ring"){

				// keep moving player
				this.playerCont.position.z += this.e.dt * this.gameSpeed;
				//

			if(this.playerCont.position.z > this.doTheSpinAt){

				this.playerAction = "set spin move";

			}

		}else if(this.playerAction === "set spin move"){

				// keep moving player
				this.playerCont.position.z += this.e.dt * this.gameSpeed;
				//

			this.properFade(this.runningAction, this.spinningAction, .2)
			this.stumbleAction.fadeOut( .1 );

			gsap.to(this.playerCont.position, { x: this.mySpinnerBox.position.x-4, duration: 0.6, ease: "sine.inOut"});

			this.playerAction="wait spin move"

		}else if(this.playerAction === "wait spin move"){

				// keep moving player
				this.playerCont.position.z += this.e.dt * this.gameSpeed;
				//

			this.playerCount+=this.e.dt;

			if(this.playerCount>1){

				this.playerAction = "back to run"
				this.playerCount = 0;

			}
	

		}else if(this.playerAction === "back to run"){

				// keep moving player
				this.playerCont.position.z += this.e.dt * this.gameSpeed;
				//

			this.properFade(this.spinningAction, this.runningAction, .3)

			this.playerAction="move"


			// this.mySpinnerBox = closestBox
			// this.doTheSpinAt = this.holeLines[i].spinnerBoxes[j].position.z;

		}

		if(this.isCrashing===true){

			this.crashingTime+=this.e.dt;

			if(this.crashingTime>.8){

				this.stumbleAction.fadeOut( .2 );

				this.isCrashing=false;
				this.crashingTime=0;
	
			}

		}

	}

	playerSideToSide(){

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
		
		if(this.playerCont.position.x>41){
			this.playerCont.position.x=41;
		}

		if(this.playerCont.position.x<-41){
			this.playerCont.position.x=-41;
		}

	}

	properFade(prev, next, time, timeScale){

		if(timeScale===undefined){

			timeScale=1;

		}

		// make sure you set the timescale at the start or it won't work

		// jeez! so dumb

		next.reset()
		next.setEffectiveTimeScale( timeScale )
		next.play();

		prev.fadeOut( time );
		next.fadeIn( time );

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
			this.cleatsMaterial.color.setHex( "0x"+this.hslToHex(c1_H,c1_S,c1_L) );
			// this.skinMaterial.color.setHex( "0x"+this.hslToHex(c1_H,c1_S,c1_L) );
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
			// this.ramp2.material.color.setHex( "0x"+this.hslToHex(c2_H,c2_S,c2_L) );
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

			// this.water.material.color.setHex( "0x"+this.hslToHex(c3_H,c3_S,c3_L) );

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
			this.water.material.opacity = num2;
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
