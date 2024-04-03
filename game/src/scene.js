import * as THREE from "../../build/three.module.js";
import { gsap } from "./greensock/all.js";

export class Scene {
	setUp(e) {
		this.e = e;
		this.uniformArray=[];
		this.uniformArray2=[];
		this.uniformArray3=[];
		this.uniformArray4=[];
		this.uniformArray5=[];
		this.switchShirtMatCount=0
		this.usePlayerRot=true;

		this.goldenMove=0;
		this.sodaRush=0;
		this.energy=0;
		this.penaltyScore=0;
		this.myMult=1;

		this.tally = new Object();
		this.tally.score = 0;
		this.tally.points = 0;
		this.myMcdPoints = 1000;

		// var qr = new QRCode(document.getElementById("qrTest"), {
		// 	text: "http://google.com", // URL or text to encode
		// 	width: 128, // Width of QR code in pixels
		// 	height: 128, // Height of QR code in pixels
		// 	colorDark: "#000000", // Color of the dark squares
		// 	colorLight: "#ffffff", // Color of the light squares
		// 	correctLevel: QRCode.CorrectLevel.H // Error correction level (L, M, Q, H)
		// });

	}

	resetGame(){

		console.log("reset game ")

		this.e.mobileGameNumber+=1;

		this.e.loadBack=1;

		this.tally.score = 0;
		this.tally.points = 0;

		this.playerAction = "set";
		this.count = 0;
		this.movePlayer = false;
		this.aniAction = "go"
		this.ballAction = "start"
		// this.gameAction = "char set";
		this.gameAction = "char set";
		this.e.ui.insAction = "ins1 wait";
		this.score=0;

		this.e.ui.insOb.charAlpha = 0;
		document.getElementById("charContainer").style.pointerEvents="none"
		document.getElementById("foodDiv1").style.pointerEvents="auto"
		document.getElementById("foodDiv2").style.pointerEvents="auto"
		document.getElementById("foodDiv3").style.pointerEvents="auto"

		this.goldenMove=0;
		this.sodaRush=0;
		this.energy=0;
		this.penaltyScore=0;
		this.myMult=1;
		
		this.e.camera.position.z = 17;
        this.e.camContY.position.y = 3.75;
		this.e.setCamPosition=false;
		this.e.camContX.rotation.x = this.e.u.ca(0)
		
		this.e.ui.insOb = new Object();
		this.e.ui.insOb.splashAlpha = 0;
		this.e.ui.insOb.charAlpha = 0;
		this.e.ui.insOb.insAlpha1 = 0;
		this.e.ui.insOb.insAlpha2 = 0;
		this.e.ui.insOb.blackAlpha = 0;

		this.e.ui.foodSizer1.opacity = 0;
		this.e.ui.foodSizer2.opacity = 0;
		this.e.ui.foodSizer3.opacity = 0;

		this.e.ui.labelOffset.alpha1 = 0;
		this.e.ui.labelOffset.alpha2 = 0;
		this.e.ui.labelOffset.alpha3 = 0;

		this.ballCont2.position.x=0;
		this.ballCont2.position.z=0;

		this.usePlayerRot=true

		this.lerpCamera = false;

		this.playerCont.position.y=0;
		this.playerCont.position.x=0;
		this.e.camContY.position.x=0;
		this.e.camContY.rotation.y=0;
		
		// this.playerCont.position.z = this.fieldStart;
		// this.e.camContY.position.z = this.playerCont.position.z

		this.properFade(this.victoryAction, this.idleAction, .02)
		
		document.getElementById('resultDiv').style.pointerEvents = 'none';
		document.getElementById('resultDiv').style.opacity = '0';
		document.getElementById('meterDiv').style.display = 'none';

		this.ballTween.play();

		this.e.ui.curBarTime = 10;

		this.e.ui.meterAction="wait"

		for(var i=0; i<this.pellets.length; i++){

			this.pellets[i].scale.x = this.pellets[i].scale.y = this.pellets[i].scale.z = 0.3;
			
			for(var j=0; j< this.pellets[i].glows.length; j++){

				this.pellets[i].glows[j].action = "delay"

			}

			this.pellets[i].action = "ready";
			
		}

		for(var i=0; i<this.hurdleLines.length; i++){

			this.hurdleLines[i].action="wait"

		}

		for(var i=0; i<this.dummyLines.length; i++){

			this.dummyLines[i].action="wait"

		}

		for(var i=0; i<this.targets.length; i++){

			this.targets[i].cont.rotation.x=0;
			this.targets[i].material.map = this.targets[i].startTexture;

		}

		document.getElementById("charContainer").style.pointerEvents="auto"

		//hidde the timer

		// this.positionPlayersForSplash()

	}

	positionPlayersForSplash(){

		if(this.e.loader.loadPlayer1===true){
			this.e.player1.animMixer.stopAllAction();
			this.e.player1.position.y=0;
			this.e.player1.rotation.y = this.e.u.ca(120);
			var direction = new THREE.Vector3(0, 0, 1);
			direction.applyQuaternion(this.e.player1.quaternion);
			this.e.player1.position.add(direction.multiplyScalar(1));
			this.idleClip1 = THREE.AnimationClip.findByName(this.e.player1.animations, "Idle");
			this.idleAnimation1 = this.e.player1.animMixer.clipAction(this.idleClip1);
			this.idleAnimation1.reset()
			this.idleAnimation1.play()
		}

		if(this.e.loader.loadPlayer2===true){
			this.e.player2.animMixer.stopAllAction();
			this.e.player2.position.y=0;
			this.e.player2.rotation.y = this.e.u.ca(0);
			var direction = new THREE.Vector3(0, 0, 1);
			direction.applyQuaternion(this.e.player2.quaternion);
			this.e.player2.position.add(direction.multiplyScalar(1));
			this.idleClip2 = THREE.AnimationClip.findByName(this.e.player2.animations, "Idle");
			this.idleAnimation2 = this.e.player2.animMixer.clipAction(this.idleClip2);
			this.idleAnimation2.reset()
			this.idleAnimation2.play()
		}

		if(this.e.loader.loadPlayer3===true){
			this.e.player3.animMixer.stopAllAction();
			this.e.player3.position.y=0;
			this.e.player3.rotation.y = this.e.u.ca(240);
			var direction = new THREE.Vector3(0, 0, 1);
			direction.applyQuaternion(this.e.player3.quaternion);
			this.e.player3.position.add(direction.multiplyScalar(1));
			this.idleClip3 = THREE.AnimationClip.findByName(this.e.player3.animations, "Idle");
			this.idleAnimation3 = this.e.player3.animMixer.clipAction(this.idleClip3);
			this.idleAnimation3.reset()
			this.idleAnimation3.play()
		}

	}

	
	loadPlayer(num){

		console.log("LOAD PLAYER "+num)

		if(this.e.loader.loadPlayer1===true){
			this.e.player1.animMixer.stopAllAction();
			this.playerCont.add(this.e.player1);
			this.e.player1.scale.set(.015, .015, .015);
		}
		
		if(this.e.loader.loadPlayer2===true){
			this.e.player2.animMixer.stopAllAction();
			this.playerCont.add(this.e.player2);
			this.e.player2.scale.set(1.5, 1.5, 1.5);
		}
		
		if(this.e.loader.loadPlayer3===true){
			this.e.player3.animMixer.stopAllAction();
			this.playerCont.add(this.e.player3);
			this.e.player3.scale.set(1.5, 1.5, 1.5);
		}
		
		//-----------------------------------------

		if(num===1){
			this.e.myPlayerModel = this.e.player1
		}else if(num===2){
			this.e.myPlayerModel = this.e.player2
		}else if(num===3){
			this.e.myPlayerModel = this.e.player3
		}

		this.animations = this.e.myPlayerModel.animations;

		this.runningClip = THREE.AnimationClip.findByName(this.animations, "Running");
		this.runningAction = this.e.myPlayerModel.animMixer.clipAction(this.runningClip); this.runningAction.name = "runningAction";

		this.spinningClip = THREE.AnimationClip.findByName(this.animations, "Spinning");
		this.spinningAction = this.e.myPlayerModel.animMixer.clipAction(this.spinningClip); this.spinningAction.name = "spinningAction";

		this.strikeClip = THREE.AnimationClip.findByName(this.animations, "Strike");
		this.strikeAction = this.e.myPlayerModel.animMixer.clipAction(this.strikeClip); this.strikeAction.name = "strikeAction";

		this.idleClip = THREE.AnimationClip.findByName(this.animations, "Idle");
		this.idleAction = this.e.myPlayerModel.animMixer.clipAction(this.idleClip); this.idleAction.name = "idleAction";

		this.victoryClip = THREE.AnimationClip.findByName(this.animations, "Victory");
		this.victoryAction = this.e.myPlayerModel.animMixer.clipAction(this.victoryClip); this.victoryAction.name = "victoryAction";

		this.rushClip = THREE.AnimationClip.findByName(this.animations, "SodaRush");
		this.rushAction = this.e.myPlayerModel.animMixer.clipAction(this.rushClip); this.rushAction.name = "rushAction";
		this.rushAction.setEffectiveWeight(1)
		this.rushAction.enabled=true;

		this.stumbleBackClip = THREE.AnimationClip.findByName(this.animations, "StumbleBack");
		this.stumbleBackAction = this.e.myPlayerModel.animMixer.clipAction(this.stumbleBackClip); this.stumbleBackAction.name = "stumbleBackAction";
		this.stumbleBackAction.setEffectiveWeight(1)
		this.stumbleBackAction.enabled=true;

		this.stumbleClip = THREE.AnimationClip.findByName(this.animations, "Stumble");
		this.stumbleAction = this.e.myPlayerModel.animMixer.clipAction(this.stumbleClip); this.stumbleAction.name = "stumbleAction";
		this.stumbleAction.setEffectiveWeight(1)
		this.stumbleAction.enabled=true;
		
		this.idleAction.play();
		
		this.playerBody = this.e.myPlayerModel;

		// if(num===1){
			
		// }else if(num===2){
		// 	this.playerBody.scale.set(1.5, 1.5, 1.5);
		// }else if(num===3){
		// 	this.playerBody.scale.set(1.5, 1.5, 1.5);
		// }

		

	}

	buildScene() {
		//---VARS--------------------------------------------------------------------------------------------------------------------

		this.playerAction = "set";
		this.count = 0;

		this.charCount=0;

		this.movePlayer = false;
		this.aniAction = "go"
		this.ballAction = "start"

		this.score=0;
		this.preventMoving=0;

		this.playerNum = 2;

		this.raycaster = new THREE.Raycaster();

		this.spinnerBoxes=[];
		this.dummyLines=[];
		this.sprinklers=[];
		this.waterHits=[];

		this.waterHitDelay=0;
		
		this.uniformColor=new THREE.Color(0x4e228c)
		this.uniformColor2=new THREE.Color(0x111111)
		this.uniformColor3=new THREE.Color(0xe66800)
		this.uniformColor4=new THREE.Color(0xcccccc)
		this.uniformColor5=new THREE.Color(0xff0000)

		this.lerpCamera=false;

		//---BASE--------------------------------------------------------------------------------------------------------------------

		this.mainCont = new THREE.Group();
		this.e.scene3D.add(this.mainCont);

		//---LIGHTS------------------------------------------------------------------------------------------------------------------

		// main light

		this.dl = new THREE.DirectionalLight(0xfff88b, .5);
		// this.dl.position.x=-26 * 6;
		// this.dl.position.z=12 * 6;
		this.dl.position.y=12 * 6;
		this.mainCont.add(this.dl);

		// shadow light

		// this.dl_shad = new THREE.DirectionalLight(0xffffff, .75);
		this.dl_shad = new THREE.DirectionalLight(0xffffff, 1.2);
		this.dl_shad.position.x = 6 * 6;
		this.dl_shad.position.z = -26 * 6;
		this.dl_shad.position.y = 26 * 6;
		this.mainCont.add(this.dl_shad);

		// if(this.e.mobile===false){
				
			this.dl_shad.castShadow = true;

			this.shadowMapMult=.5;
			this.dl_shad.shadow.mapSize.width = Math.round(4096*this.shadowMapMult);
			this.dl_shad.shadow.mapSize.height = Math.round(4096*this.shadowMapMult);
			this.e.sSize = 15;
			this.dl_shad.shadow.camera.near = 0.1;
			this.dl_shad.shadow.camera.far = 380;
			this.dl_shad.shadow.camera.left = -this.e.sSize;
			this.dl_shad.shadow.camera.right = this.e.sSize;
			this.dl_shad.shadow.camera.top = this.e.sSize;
			this.dl_shad.shadow.camera.bottom = -this.e.sSize;
			this.dl_shad.shadow.radius = 2;

		// }

		// const shadowHelper = new THREE.CameraHelper(this.dl_shad.shadow.camera);
		// this.mainCont.add(shadowHelper);

		// ambient light

		// this.ambLight = new THREE.AmbientLight(0xffffff, 0.475);
		this.ambLight = new THREE.AmbientLight(0xffffff, 0.65);
		this.mainCont.add(this.ambLight);

		//---PLAYER------------------------------------------------------------------------------------------------------

		// Create a cube geometry for the skybox
		const skyboxGeometry = new THREE.BoxGeometry(1000, 1, 1000);
		const skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.BackSide });
		const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
		skybox.castShadow=true;
		skybox.position.y=10;
		// this.mainCont.add(skybox);

		this.hurdleLines=[];
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
		var material = new THREE.MeshStandardMaterial({ color: 0xff0000, visible: false });
		this.playerHit2 = new THREE.Mesh(geometry, material);
		this.playerHit2.position.y=2
		this.playerCont.add( this.playerHit2 );
	
		//-----------------------------------------------------------

		// animatedd body

		console.log("LP 3")
		if(this.e.char==="1"){
			this.loadPlayer(1)
		}else if(this.e.char==="2"){
			this.loadPlayer(2)
		}else if(this.e.char==="3"){
			this.loadPlayer(3)
		}else {
			this.loadPlayer(3)
		}
		

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
		this.ball.receiveShadow = false;
		this.ballCont2.add(this.ball);

		this.ball.traverse((object) => {

			this.ballObject = object;

		});

		// this.playerBody.position.y=200;
		// this.ball.position.y=200;

		// console.log(this.ballObject)

		// gsap.to(this.ballObject.position, { x: 5, duration: 0.365, repeat: -1, yoyo: true, ease: "sine.expo"});

		this.ball.scale.x = this.ball.scale.y = this.ball.scale.z = 1.8;

		this.ballTweenObject = new Object();
		this.ballTweenObject.z = 0;
		this.ballTweenObject.y = 0;

		this.ballTween = gsap.to(this.ballTweenObject, { y: 0, z: 2.7, duration: 0.365, repeat: -1, yoyo: true, ease: "sine.expo"});

		this.crashers=[];
		this.crashersDummy=[];

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
		this.field.position.y = 0.1;
		this.mainCont.add(this.field);

		this.field.traverse((object) => {
			if (object.material !== undefined) {

				// console.log(object.name)

				this.saveMat = object.material.map

				if(object.name==="field"){
					// object.color = 0xffffff;
					object.castShadow=false;
					object.material = new THREE.MeshStandardMaterial({ wireframe: false, color: 0xcccccc, map: this.saveMat});

					this.saveMat.wrapS = this.saveMat.wrapT = THREE.RepeatWrapping;
					this.saveMat.repeat.set(2, 2);

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
				// } else if (object.material.name === "blueSeats2") {

				// 	object.material = new THREE.MeshStandardMaterial({
				// 		wireframe: false,
				// 		// color: 0xff0000,
				// 		color: 0x06172a,
				// 	});

				} else if (object.material.name === "runner") {

					object.material = new THREE.MeshBasicMaterial({
						wireframe: false,
						color: 0xffffff,
						fog: false,
						map: this.saveMat,
					});
					
				} else if (object.material.name === "upperFence") {

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
					object.material = new THREE.MeshBasicMaterial({
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

			// object.castShadow = true;
			// object.receiveShadow = true;

			if (object.name === "top") {
				object.material = new THREE.MeshStandardMaterial({
					wireframe: false,
					color: 0xffffff,
					map: this.saveMat,
				});
				object.material.side = THREE.DoubleSide;

			} else if (object.name === "lines" || object.name === "lines2" || object.name === "lines3") {

				object.material = new THREE.MeshStandardMaterial({ wireframe: false, color: 0xa36200 });

				object.material.transparent = true;
				object.material.opacity = 0.75;
				object.position.y += -0.025;

			} else if (object.name === "logo") {

				object.material = new THREE.MeshStandardMaterial({ wireframe: false, color: 0xa36200 });

				object.receiveShadow=true;

				object.material.transparent = true;
				object.material.opacity = 0.75;
				object.position.y += -0.05;

				this.fieldLogo = object;

			} else if (object.name === "seats") {
				object.material = new THREE.MeshBasicMaterial({
					wireframe: false,
					color: 0x01060b,
				});
				this.seats = object;
			} else if (object.name === "field") {
				object.material = new THREE.MeshStandardMaterial({
					wireframe: false,
					color: 0xffffff,
					map: this.saveMat,
				});
			} else if (object.name === "skySphere") {
				// console.log("skysphere");
				object.material = new THREE.MeshBasicMaterial({
					wireframe: false,
					// color: 0x73d4dd,
					color: 0xffffff,
					map: this.saveMat,
					fog: false,
					side: THREE.DoubleSided,
				});

				this.skySphere = object;

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
				object.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: object.startTexture });

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
				object.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: object.startTexture });

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
				object.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: object.startTexture });

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
				object.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: object.startTexture });

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
				object.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: object.startTexture });

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
				object.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: object.startTexture });

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
				object.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: object.startTexture });

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
		// this.fieldStart = 0;
		// this.fieldStart = -260;
		this.fieldEnd = 260 * 1;
		this.gameSpeed = 16;
		this.slowDownFactor = new Object();
		this.slowDownFactor.num = 1;

		this.gateContainers = [];
		this.spinners = [];
		this.poleContainers = [];

		this.resetBoard();

		this.makeHurdleLine(210, 2);

		this.makePellet(180+5, 0);
		this.makeConeLine(180, 2);
		this.makePellet(165+5, 0);
		this.makeConeLine(165, 1);
		this.makePellet(150+5, 0);
		this.makeConeLine(150, 2);

		this.makeDummyLine(106.5)

		this.makeConeLine(80, 2);
		this.makePellet(65+5, 0);
		this.makeConeLine(65, 1);
		this.makePellet(50+5, 0);
		this.makeConeLine(50, 2);

		this.makeHurdleLine(30, 2);
		
		this.makePellet(-5, 0);
		this.makePellet(-15, 0);

		this.makePellet(-30+5, 0);
		this.makeConeLine(-30, 2);
		this.makePellet(-45+5, 1);
		this.makeConeLine(-45, 1);
		this.makePellet(-60+5, 1);
		this.makeConeLine(-60, 2);

		this.makeDummyLine(-100);

		this.makeConeLine(-130, 2);
		this.makePellet(-135-5, 0);
		this.makeConeLine(-145, 1);
		this.makePellet(-150-5, 0);
		this.makeConeLine(-160, 2);

		this.makeHurdleLine(-180, 2);

		this.makePellet(-210-5, 0);
		this.makeConeLine(-220, 2);
		this.makePellet(-225-5, 0);
		this.makeConeLine(-235, 1);
		this.makePellet(-240-5, 0);
		this.makeConeLine(-250, 2);

		this.runVolume = 0;
		this.runLoop = new Howl({src: ['./src/sounds/runLoop.mp3'], volume:.5, loop:true});
		this.runLoop.play();
	

	}

    playAgain(){

        //

    }

	resetBoard() {

		this.playerCont.position.z = this.fieldStart;
		this.e.camContY.position.z = this.playerCont.position.z

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

	makeDummyLine(z){

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
	
			this.crashersDummy.push(this.holeBox)

			//

			this.dummy = this.e.dummy.clone();
			this.dummy.position.z = z+18;
			this.dummy.position.x = i*11.9;
			this.mainCont.add( this.dummy );

			this.dummy.traverse((object) => {

				if(object.name==="lines"){

					object.material = new THREE.MeshStandardMaterial({ wireframe: false, color: 0xa36200 });

					object.material.transparent = true;
					object.material.opacity = 0.75;

				}
				
			});
			
		}

		var geometry = new THREE.BoxGeometry(1, 21, 1);
		var material = new THREE.MeshStandardMaterial({ color: 0xff0000, visible: false });
		this.holeLine = new THREE.Mesh(geometry, material);
		this.holeLine.position.z = z;

		this.holeLine.action="wait"
		this.dummyLines.push(this.holeLine)
		this.mainCont.add( this.holeLine );

		this.holeLine.spinnerBoxes=[];

		for(var i=0; i<this.spinnerBoxes.length; i++){

			this.holeLine.spinnerBoxes.push( this.spinnerBoxes[i] );

		}

	}

	controlDummyLines(){

		for(var i=0; i<this.dummyLines.length; i++){

			// console.log(this.dummyLines[i])

			if(this.dummyLines[i].action==="wait" && this.gameAction==="run"){

				var d = this.dummyLines[i].position.z - this.playerCont.position.z
				if(d<30 && d>0){
	
					this.dummyLines[i].action="alert";
	
				}

			}else if(this.dummyLines[i].action==="alert"){

				console.log("----------------SET SPIN----------------")

				this.e.ui.highlight1();
				this.dummyLines[i].action="ready";

				this.hasPushedButton1 = false;

			}else if(this.dummyLines[i].action==="ready"){

				console.log(">>>"+this.myCurrentAnimation);

				if(this.hasPushedButton1===true && this.myCurrentAnimation!=="stumbleAction"){

					this.goldenMove+=1;
					this.getScore(1000);

					this.e.s.p("zoom")

					this.uniformFlash()

					// console.log("success")

					this.e.ui.highlightReset();

					// find the closest spinner

					var closestBox = null;
					var closestDistance = 100000

					for(var j=0; j<this.dummyLines[i].spinnerBoxes.length; j++){

						var d = this.dummyLines[i].spinnerBoxes[j].position.x - this.playerCont.position.x

						// console.log("------"+j+"---"+d)

						if( Math.abs(d)<closestDistance){

							closestBox = this.dummyLines[i].spinnerBoxes[j];
							closestDistance = Math.abs(d);

						}

					}

					this.mySpinnerBox = closestBox

					// change the player action to be locked in

					this.playerAction = "set spin";
					this.doTheSpinAt = this.dummyLines[i].position.z;

					this.dummyLines[i].action="done"

					this.hasPushedButton1 = false;


				}

				if(this.playerCont.position.z>this.dummyLines[i].position.z){

					this.e.ui.highlightReset()
					this.dummyLines[i].action="done"

				}

			}else if(this.dummyLines[i].action==="done"){

			}
			
		}

		
	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	makeHurdleLine(z){

		this.hurdleCont = new THREE.Group();
		this.mainCont.add(this.hurdleCont);

		this.hurdleLines.push(this.hurdleCont);

		this.hurdleCont.position.z = z;

		for(var i=-6; i<=6; i++){

			this.hurdle = this.e.hurdle.clone();
			
			this.hurdle.position.x = (i * 7);

			this.hurdle.traverse((object) => {

				if(i % 2 !== 0){
					object.material = new THREE.MeshStandardMaterial({ color: 0xff2727 });
				}else{
					object.material = new THREE.MeshStandardMaterial({ color: 0xffbc0d });
				}

			});

			this.hurdle.scale.x = this.hurdle.scale.y = this.hurdle.scale.z = .603;
			this.hurdleCont.add(this.hurdle);

		}

		this.warning = this.e.warning.clone();
		this.warning.position.z = -10;
		this.warning.position.y = .1;
		this.warning.scale.x = this.warning.scale.y = .7
		this.warning.scale.z = 2;
		this.hurdleCont.add(this.warning);

		this.warning.traverse((object) => {

			object.material = new THREE.MeshStandardMaterial({ wireframe: false, color: 0xa36200 });

			object.material.transparent = true;
			object.material.opacity = 0.75;
			object.position.y += -0.025;

		});

		

	}

	controlHurdleLines(){
		
		for(var i=0; i<this.hurdleLines.length; i++){

			if(this.hurdleLines[i].action===undefined){

				this.hurdleLines[i].action="wait";

			}else if(this.hurdleLines[i].action==="wait" && this.gameAction==="run"){

				var d = this.hurdleLines[i].position.z - this.playerCont.position.z
				if(d<35 && d>0){

					this.hurdleLines[i].action="alert";

				}

			}else if(this.hurdleLines[i].action==="alert"){

				this.e.ui.highlight3();

				gsap.to(this.slowDownFactor, { num: .1, duration: .1, ease: "sine.out"});
				// gsap.to(this.slowDownFactor, { num: 1, duration: 2, delay: .1, ease: "sine.out"});

				this.hurdleLines[i].action="ready";

			}else if(this.hurdleLines[i].action==="ready"){

				var d = this.hurdleLines[i].position.z - this.playerCont.position.z
				if(d<5 && this.playerAction==="move"){

					// console.log("hurdle crash "+i)

					this.getScore(-500)

					this.playerAction="crashBack"
					this.hurdleLines[i].action="complete"

					this.e.ui.highlightReset()

				}

				if(this.hasPushedButton3===true){

					// console.log("success")

					this.getScore(1000, true);
					this.sodaRush+=1;

					this.uniformFlash()

					this.e.ui.highlightReset();

					this.hurdleLines[i].action="complete";
					this.playerAction="fly set";
					this.landAt = this.hurdleLines[i].position.z+10;

				}

			}else if(this.hurdleLines[i].action==="complete"){



			} 

		}

		this.hasPushedButton3 = false;

	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	makeConeLine(z, type){

		this.coneCont = new THREE.Group();
		this.mainCont.add(this.coneCont);

		this.coneCont.position.z = z;

		for (var i = -6; i < 6; i++) {

			if(type===1 && i===1 || type===1 && i===-1 || type===1 && i===5 || type===1 && i===-5){

				this.cone = this.e.sprinkler.clone();

				this.cone.num = i;

				this.cone.traverse((object) => {

					if(object.material!==undefined){

						this.saveMap = object.material.map;

						if(object.material.name==="water"){

							object.material = new THREE.MeshBasicMaterial({ wireframe: false, map: this.saveMap, color: 0xffffff, transparent: true});
							this.cone.water=object;
	
							object.receiveShadow = false;
							object.castShadow = false;

						}else if(object.material.name==="spray"){

							object.material = new THREE.MeshBasicMaterial({ wireframe: false, map: this.saveMap, color: 0xffffff, transparent: true, opacity:.4});
							this.cone.spray=object;
							this.cone.sprayTexture=this.saveMap
	
							object.receiveShadow = false;
							object.castShadow = false;

						}else{

							object.castShadow = true;

						}
					
					}

				});

				this.cone.count=0;

				//

				for(var j=-10; j<10; j++){

					var geometry = new THREE.BoxGeometry(1, 2, 1);
					var material = new THREE.MeshStandardMaterial({ color: 0x66ff66, visible: false });
					this.crashBox = new THREE.Mesh(geometry, material);
					this.crashBox.position.z = j*1.4;
					this.cone.add( this.crashBox );

					this.waterHits.push(this.crashBox);

				}

				if(i<0){
					this.cone.rotation.y+=this.e.u.ca(90)
				}else{

				}

				//

				this.sprinklers.push(this.cone)


			}else{

				this.cone = this.e.cone.clone();

				this.cone.traverse((object) => {
				
					object.receiveShadow = false;
					object.castShadow = true;
	
				});

			}

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

	controlSpriklers(){

		if(this.switchCount===undefined){

			this.switchCount=0

		}

		this.switchCount+=this.e.dt;

		if(this.switchCount>.03){

			this.switchCount=0;

			for(var i=0; i<this.sprinklers.length; i++){

				// this.sprinklers[i].spray

				if(this.sprinklers[i].water.material.opacity===.8){

					this.sprinklers[i].water.material.opacity=.56;

				}else{

					this.sprinklers[i].water.material.opacity=.8;

				}

			}
			
		}

		for(var i=0; i<this.sprinklers.length; i++){

			this.sprinklers[i].sprayTexture.offset.y+=this.e.dt*-.2

			if(this.sprinklers[i].num<0){
				this.sprinklers[i].rotation.y+=this.e.dt
			}else{
				this.sprinklers[i].rotation.y+=this.e.dt
			}
			
			

		}

		//--------------------------------------------

		if(this.waterHitDelay>0){

			this.waterHitDelay-=this.e.dt;

		}

		for(var i=0; i<this.waterHits.length; i++){

			const box1 = new THREE.Box3().setFromObject(this.playerHit);
			const box2 = new THREE.Box3().setFromObject(this.waterHits[i]);

			if (box1.intersectsBox(box2) === true && this.waterHitDelay<=0 && this.gameAction==="run") {

				// console.log("hit")

				this.e.s.p("splash")

				this.waterHitDelay=2;

				this.getScore(-100);

			}

		}



	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	makePellet(z, x, addRan) {
		
		// create clone object

		for(var i=0; i<3; i++){
				
			this.pellet = this.e.ring.clone();

			this.pellet.traverse( ( object ) =>  {

				if(object.name==="glowBall"){
					// object.material = new THREE.MeshStandardMaterial({ wireframe: false, envMap: this.e.reflectionTexture, metalness: .5, roughness: 0.1, color: 0xffffff});
					object.material = new THREE.MeshBasicMaterial({ wireframe: false, color: 0xffffff});
				}

				object.castShadow=false

			});

			// set up

			this.pellet.scale.x = this.pellet.scale.y = this.pellet.scale.z = 0.3;
			this.pellet.castShadow = false;
			this.pellet.receiveShadow = false;
			this.pellet.glows=[];
			
			this.pellet.position.y = 1.2;
			this.pellet.position.y = 0;
			this.pellet.position.z = z;

			if(addRan===false){
				this.pellet.position.x = x;
			}else{
				this.pellet.position.x = x + (this.e.u.nran(4)*10)/10;
			}

			if(i===0){

			}else if(i===1){
				this.pellet.position.x+=15;
			}else if(i===2){
				this.pellet.position.x-=15;
			}
			
			
			this.pellet.action = "ready";

			this.mainCont.add(this.pellet);
			this.pellets.push(this.pellet);

			// make glows

			for(var j=0; j<40/3; j++){

				// this.planeGeo = new THREE.PlaneGeometry( 1.1, 1.1 );
				// this.planeMat = new THREE.MeshStandardMaterial({ map: this.e.glowTexture, transparent:true, side: THREE.DoubleSide});

				this.planeGeo = new THREE.SphereGeometry( 0.2, 10, 8 );
				this.planeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1});

				this.glintPlane = new THREE.Mesh( this.planeGeo, this.planeMat );
				this.mainCont.add( this.glintPlane );

				this.glintPlane.scale.x = this.glintPlane.scale.y = this.glintPlane.scale.z = 0

				this.glintPlane.position.x = this.pellet.position.x;
				this.glintPlane.position.y = this.pellet.position.y;
				this.glintPlane.position.z = this.pellet.position.z;
				this.glintPlane.startx = this.pellet.position.z;
				this.glintPlane.starty = this.pellet.position.y;
				this.glintPlane.startz = this.pellet.position.z;

				this.glintPlane.myPellet = this.pellet;

				this.pellet.glows.push(this.glintPlane);

			}

			if(addRan===false){
				i=5;
			}

		}

	}

	controlRings() {

		this.moveTime = 2;

		for (var i = 0; i < this.pellets.length; i++) {

			// console.log(i)

			for(var j=0; j< this.pellets[i].glows.length; j++){

				// console.log(j)

				var p = this.pellets[i].glows[j];

				if(p.action===undefined){

					p.count=0;
					p.delay=this.e.u.ran(this.moveTime*10)/10

					p.action="delay"

				}else if(p.action==="delay"){

					p.count+=this.e.dt;

					if(p.count>p.delay){

						p.count=0;
						p.action="set"

					}

				}else if(p.action==="set"){

					// console.log(p.startz)

					p.scale.x=p.scale.y=p.scale.z=1*.3;
					// p.scale.y=1.5;

					p.position.x=p.myPellet.position.x;
					p.position.y=p.myPellet.position.y;
					p.position.z=p.myPellet.position.z;
					p.alpha=.8

					this.gDist = 1.9;
					
					gsap.to(p.scale, {x: 0, y: 0, z: 0, duration: this.moveTime, ease: "sine.out" });
					gsap.to(p.position, {
						x: p.myPellet.position.x + this.e.u.nran(this.gDist*10)/20, 
						y: p.myPellet.position.y + this.e.u.nran(this.gDist*10)/20, 
						z: p.myPellet.position.z + this.e.u.nran(this.gDist*10)/20, 
						duration: this.moveTime, 
						ease: "sine.out" 
					});

					p.action="moving"

				}else if(p.action==="moving"){

					p.count+=this.e.dt;
					if(p.count>this.moveTime){

						p.count=0;
						p.action="set"

					}

				}else if(p.action==="got"){

					gsap.killTweensOf(p.scale);
					gsap.killTweensOf(p.position);

					gsap.to(p.scale, {x: 0, y: 0, z: 0, duration: this.moveTime/2, ease: "sine.out" });
					gsap.to(p.position, {
						x: p.myPellet.position.x + this.e.u.nran(this.gDist*100)/20, 
						y: p.myPellet.position.y + this.e.u.nran(this.gDist*100)/20, 
						z: p.myPellet.position.z + this.e.u.nran(this.gDist*100)/20, 
						duration: this.moveTime, 
						ease: "sine.out" 
					});

					p.action="done"


				}
				
			}

			// -----

			const box1 = new THREE.Box3().setFromObject(this.playerHit);
			const box2 = new THREE.Box3().setFromObject(this.pellets[i]);

			if (box1.intersectsBox(box2) === true && this.pellets[i].action === "ready") {

				this.pellets[i].action = "done";

				this.e.s.p("coin")

				this.getScore(250);
				this.energy+=1;

				// console.log("add 250")

				gsap.to(this.pellets[i].scale, {x: 0, y: 0, z: 0, duration: 0.2, ease: "sine.out" });
				gsap.to(this.pellets[i].position, {y: this.pellets[i].position.y+.5, duration: 0.2, ease: "sine.out" });
				
				for(var j=0; j< this.pellets[i].glows.length; j++){

					this.pellets[i].glows[j].action="got"

				}

			}
		}
	}

	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------

	uniformFlash(){

		this.uniformColor = new THREE.Color( "#00fff6" );

		var endColor = new THREE.Color( "#4e228c" );
    	gsap.to(this.uniformColor, { r: endColor.r, g: endColor.g, b: endColor.b, duration: 1});


		this.uniformColor2 = new THREE.Color( "#00fff6" );

		// var endColor = new THREE.Color( "#111111" );
    	// gsap.to(this.uniformColor2, { r: endColor.r, g: endColor.g, b: endColor.b, duration: 1});

		this.switchShirtMatCount=1.3;


		this.uniformColor3 = new THREE.Color( "#00fff6" );

		var endColor = new THREE.Color( "#e66800" );
    	gsap.to(this.uniformColor3, { r: endColor.r, g: endColor.g, b: endColor.b, duration: 1});


		this.uniformColor4 = new THREE.Color( "#00fff6" );

		var endColor = new THREE.Color( "#ffffff" );
    	gsap.to(this.uniformColor4, { r: endColor.r, g: endColor.g, b: endColor.b, duration: 1});

		this.uniformColor5 = new THREE.Color( "#00fff6" );

		var endColor = new THREE.Color( "#ff0000" );
    	gsap.to(this.uniformColor5, { r: endColor.r, g: endColor.g, b: endColor.b, duration: 1});

	}

	getScore(num, height){

		if(num<0 && this.score>0){
			this.penaltyScore+=num;
		}

		this.score+=num;

		if(this.score<0){
			this.score=0;
		}

		if(num<0){
			this.showScore.style.color = "#ff3209";
		}else{
			this.showScore.style.color = "#ffc402";
		}

		this.showScore.innerHTML=num+"";

		if(height===true){
			// console.log('extraheight')
			this.extraHeight=200;
		}else{
			this.extraHeight=0;
		}

		this.scoreOb.left = window.innerWidth/2;
		this.scoreOb.top = (window.innerHeight/2)-this.extraHeight
		this.scoreOb.opacity = 1

		gsap.killTweensOf(this.scoreOb)
		gsap.to(this.scoreOb, { left: (window.innerWidth/2)+this.e.u.nran(30), top:(window.innerHeight/2)-50-this.extraHeight, duration: 1, ease: "expo.out"});
		gsap.to(this.scoreOb, { opacity: 0, delay: .5, duration: .5});

	}

	nextChar(){

		if(this.charCount<=0){

			this.e.s.p("woosh")

			console.log("next char")
	
			gsap.to(this.playerCont.rotation, { y: this.playerCont.rotation.y+this.e.u.ca(120), duration: .25, ease: "expo.out"});
			this.charCount=.25;
			this.playerNum+=1;
			if(this.playerNum>3){
				this.playerNum=1;
			}

			console.log(this.playerNum)
		}
		
	}

	prevChar(){
		
		if(this.charCount<=0){

			this.e.s.p("woosh")

			console.log("prev char")
	
			gsap.to(this.playerCont.rotation, { y: this.playerCont.rotation.y-this.e.u.ca(120), duration: .25, ease: "expo.out"});
			this.charCount=.25;
			this.playerNum-=1;
			if(this.playerNum<1){
				this.playerNum=3;
			}

			console.log(this.playerNum)
		}

	}

	confirmChar(){

		console.log("confirm")

		this.e.s.p("click")

		this.gameAction="char selected"

	}

	update() {

		this.runLoop.volume(this.runVolume);

		if(this.e.shirtMat!==undefined){

			if(this.switchShirtMatCount>0){
				this.switchShirtMatCount-=this.e.dt
				this.e.shirtMat.map = this.e.blueShirt
				this.uniformColor2 = new THREE.Color( "#00fff6" );
			}else{
				
				this.e.shirtMat.map = this.e.blackShirt
				this.uniformColor2 = new THREE.Color( "#111111" );
			}
	
		}

		if(this.charCount>0){
			this.charCount-=this.e.dt;
		}

		// score show

		if(this.scoreOb===undefined){

			this.showScore = document.getElementById("showScore")

			this.scoreOb = new Object();
			this.scoreOb.left = 0;
			this.scoreOb.top = 0;
			this.scoreOb.top = 0;

		}

		this.showScore.style.left = (this.scoreOb.left-100)+"px"
		this.showScore.style.top = this.scoreOb.top+"px"
		this.showScore.style.opacity = this.scoreOb.opacity+""

		// update shadow

		this.dl_shad.target.position.x=this.playerCont.position.x
		this.dl_shad.target.position.z=this.playerCont.position.z+22
		this.dl_shad.target.updateMatrixWorld();

		this.dl_shad.position.x = this.playerCont.position.x+12*6
		this.dl_shad.position.z = this.playerCont.position.z-26*6
		this.dl_shad.updateMatrixWorld();

		// this.dl_shad.shadow.mapSize.width = this.dl_shad.shadow.mapSize.height = 4096 * this.shadowMapMult;
		
		// this.e.sSize = 210;
		// this.dl_shad.shadow.camera.near = 0.1;
		// this.dl_shad.shadow.camera.far = 680;
		// this.dl_shad.shadow.camera.left = -this.e.sSize;
		// this.dl_shad.shadow.camera.right = this.e.sSize;
		// this.dl_shad.shadow.camera.top = this.e.sSize;
		// this.dl_shad.shadow.camera.bottom = -this.e.sSize;
		// this.dl_shad.shadow.radius = 2;


		// if(this.shadowMapMult<2){

		// 	this.shadowMapMult+=this.e.dt/10;
		// 	if(this.shadowMapMult>2){
		// 		this.shadowMapMult=2;
		// 	}

		// }

		for(var i=0; i<this.uniformArray.length; i++){

			this.uniformArray[i].color= this.uniformColor 

		}

		for(var i=0; i<this.uniformArray2.length; i++){

			this.uniformArray2[i].color= this.uniformColor2 

		}

		for(var i=0; i<this.uniformArray3.length; i++){

			this.uniformArray3[i].color= this.uniformColor3 

		}

		for(var i=0; i<this.uniformArray4.length; i++){

			this.uniformArray4[i].color= this.uniformColor4 

		}

		for(var i=0; i<this.uniformArray5.length; i++){

			this.uniformArray5[i].color= this.uniformColor5 

		}

		this.dl_shad.target.position.set( this.playerCont.position.x, this.dl_shad.target.position.y, this.playerCont.position.z );

		this.controlSpriklers();
		this.controlRings();
		this.controlHurdleLines();
		this.controlDummyLines();

		this.mixer();

		document.getElementById("gameScore").innerHTML = this.score+"";

		//--------------------------------------------------------------------------------------------------------------

		// GAME ACTIONS

		// console.log(this.gameAction)

		if(this.gameAction===undefined){

			this.gameAction="reset";
			this.gameCount=0;

		}else if(this.gameAction==="reset"){

			for(var i=0; i<this.hurdleLines.length; i++){

				this.hurdleLines[i].position.y=-10;
	
			}
	
			for(var i=0; i<this.pellets.length; i++){
	
				this.pellets[i].position.y=-10;
	
			}

			this.playerNum = 1;
	
			this.positionPlayersForSplash()

			if(this.e.isLoadingOnMobile===true && this.e.mobileGameNumber===0){

				this.gameAction="load result"
	
			}else{

				this.gameAction="splash"
	
			}

		}else if(this.gameAction==="splash"){

			// if(this.e.ui.insAction==="splash"){

				this.stadium.scale.z = 5;
				this.field.scale.z = 5;
	
				this.playerCont.rotation.y=this.e.u.ca(60)

				this.e.camContY.position.z=0;
				this.e.camContY.position.y=2.95;
				this.e.camContY.rotation.y+=this.e.dt*.3;
				if(this.e.camContY.rotation.y>3.14*2){
					this.e.camContY.rotation.y-=3.14*2
				}
				this.playerCont.position.z=0;

				// this.fieldLogo.rotation.y=this.e.u.ca(180)

				this.e.ui.labelOffset.alpha1=0;
				this.e.ui.labelOffset.alpha2=0;
				this.e.ui.labelOffset.alpha3=0;

			// }

		}else if(this.gameAction==="fade splash"){

			gsap.to(this.e.camContY.position, { y: 1.15, duration: 1, ease: "sine.inOut"});
			gsap.to(this.e.camContY.rotation, { y: this.e.u.ca(180), duration: 1, ease: "sine.inOut"});
			gsap.to(this.e.camera.position, { z: 14, duration: 1, ease: "sine.inOut"});
			// this.camContY.rotation.y=0
			gsap.to(this.e.camContX.rotation, { x: this.e.u.ca(-7.5), duration: this.transSpeed*6, ease: "expo.inOut"});

			this.gameAction="char select wait 1"

		}else if(this.gameAction==="char select wait 1"){

			this.gameCount+=this.e.dt;
			if(this.gameCount>1){
				this.gameAction="char select wait"
				this.gameCount=0;
			}

		}else if(this.gameAction==="char select wait"){

			//

		}else if(this.gameAction==="char selected"){

			document.getElementById("charContainer").style.pointerEvents="none"

			// gsap.to(this.e.ui.insOb, { charAlpha: 0, duration: 0, ease: "sine.out"});
			// gsap.to(this.e.ui.insOb, { blackAlpha: 1, duration: 0, ease: "sine.out"});

			this.e.ui.insOb.charAlpha = 0;
			// this.e.ui.insOb.blackAlpha = .3

			// this.gameAction="char fading in"
			this.gameAction="char set"

		// }else if(this.gameAction==="char fading in"){

		// 	this.gameCount+=this.e.dt;
		// 	if(this.gameCount>0){

		// 		this.gameCount=0;
		// 		this.gameAction="char faded in"

		// 	}

		}else if(this.gameAction==="char set"){

			document.getElementById("charContainer").style.pointerEvents="none"

			this.e.ui.labelOffset.alpha1=0;
			this.e.ui.labelOffset.alpha2=0;
			this.e.ui.labelOffset.alpha3=0;

			console.log("CHAR SET")

			gsap.killTweensOf(this.e.camContY.rotation);
			gsap.killTweensOf(this.e.camContY.position);
			gsap.killTweensOf(this.e.camContX.rotation);
			gsap.killTweensOf(this.e.camera.position);


			if(this.e.loader.loadPlayer1===true){
				this.e.player1.position.x=0; this.e.player1.position.y=0; this.e.player1.position.z=0; this.e.player1.rotation.y=0;
			}
			
			if(this.e.loader.loadPlayer2===true){
				this.e.player2.position.x=0; this.e.player2.position.y=0; this.e.player2.position.z=0; this.e.player2.rotation.y=0;
			}

			if(this.e.loader.loadPlayer3===true){
				this.e.player3.position.x=0; this.e.player3.position.y=0; this.e.player3.position.z=0; this.e.player3.rotation.y=0;
			}

			this.playerCont.rotation.y = this.e.u.ca(0);
			this.playerCont.position.z = this.fieldStart;
            this.e.camContY.position.z = this.fieldStart;

			this.stadium.scale.z = 7;
			this.field.scale.z = 7;
			this.e.camera.position.y = 0;

            this.e.camera.position.z = 17;
            this.e.camContY.position.y = 3.25;

            this.setCamPosition = false;

			this.e.ui.insOb.blackAlpha = 0
            this.e.camContY.rotation.y = this.e.u.ca(180)
            this.e.camContX.rotation.x = this.e.u.ca(-8)
			
			gsap.killTweensOf(this.e.ui.insOb)
			gsap.to(this.e.ui.insOb, { blackAlpha: 0, duration: this.e.ui.transSpeed*4, ease: "sine.out"});
			gsap.to(this.e.ui.insOb, { insAlpha1: 1, duration: this.e.ui.transSpeed, ease: "sine.out"});

			for(var i=0; i<this.hurdleLines.length; i++){

				this.hurdleLines[i].position.y=0;

			}

			for(var i=0; i<this.pellets.length; i++){

				this.pellets[i].position.y=1.2;;

			}

			console.log("LOAD "+this.playerNum)
			console.log("LOAD2 "+this.e.char)

			if(this.e.char!==null){
				this.playerNum= Number(this.e.char) 
			}

			if(this.playerNum===1){
				if(this.e.loader.loadPlayer2===true){
					this.e.player2.position.y=-20;
				}
				if(this.e.loader.loadPlayer3===true){
					this.e.player3.position.y=-20;
				}
				this.loadPlayer(1);
			}else if(this.playerNum===2){
				if(this.e.loader.loadPlayer1===true){
					this.e.player1.position.y=-20;
				}
				if(this.e.loader.loadPlayer3===true){
					this.e.player3.position.y=-20;
				}
				this.loadPlayer(2);
			}else if(this.playerNum===3){
				// console.log("333")
				if(this.e.loader.loadPlayer1===true){
					this.e.player1.position.y=-20;
				}
				if(this.e.loader.loadPlayer2===true){
					this.e.player2.position.y=-20;
				}
				this.loadPlayer(3);
			}

			// this.e.ui.highlightReset()

			this.gameAction="instructions"
			// this.e.ui.insAction="ins1"
			this.e.ui.insAction="ins1 wait"

			
			// this.shadowMapMult=.125;
			// this.dl_shad.shadow.mapSize.width = Math.round(4096*this.shadowMapMult);
			// this.dl_shad.shadow.mapSize.height = Math.round(4096*this.shadowMapMult);
			this.e.sSize = 55;
			this.dl_shad.shadow.camera.near = 0.1;
			this.dl_shad.shadow.camera.far = 380;
			this.dl_shad.shadow.camera.left = -this.e.sSize;
			this.dl_shad.shadow.camera.right = this.e.sSize;
			this.dl_shad.shadow.camera.top = this.e.sSize;
			this.dl_shad.shadow.camera.bottom = -this.e.sSize;
			this.dl_shad.shadow.radius = 2;


			// this.e.ui.insAction="fade ins1"

		}else if(this.gameAction==="splash"){

		}else if(this.gameAction==="game start"){

            this.e.camContY.rotation.y = this.e.u.ca(180)
            this.e.camContX.rotation.x = this.e.u.ca(-8)
			this.e.camContY.position.y = 3.25;

			document.getElementById("gameScore").style.opacity=1;

			this.lerpCamera=true;

			this.e.ui.highlightReset()

			this.properFade(this.idleAction, this.runningAction, .3);
			this.movePlayer=true;
			this.playerAction = "move"
			this.ballAction = "go"
			this.gameAction="run"

		}else if(this.gameAction==="run"){

			// -----------------------------------------------------------------

			if(this.playerCont.position.z > this.fieldEnd-15){

				this.gameAction="set move to center";
				this.usePlayerRot=false;

			}

		}else if(this.gameAction==="set move to center"){

			this.xspeed=0;

			// -----------------------------------------------------------------

			this.movePlayerForward();

			// -----------------------------------------------------------------

			this.et = 1;

			gsap.to(this.e.camContX.rotation, { x: this.e.u.ca(-8), duration: this.et, ease: "expo.out"});

			gsap.to(this.playerCont.position, { x: 0, duration: this.et, ease: "sine.inOut"});

			gsap.killTweensOf(this.playerCont.rotation);

			if( this.playerCont.position.x < -10){
				gsap.to(this.playerCont.rotation, { y: this.e.u.ca(45), duration: this.et/2, ease: "sine.out"});
				gsap.to(this.playerCont.rotation, { y: this.e.u.ca(0), duration: this.et/2, delay: this.et/2, ease: "sine.in"});
			}else if( this.playerCont.position.x > 10){
				gsap.to(this.playerCont.rotation, { y: this.e.u.ca(-45), duration: this.et/2, ease: "sine.out"});
				gsap.to(this.playerCont.rotation, { y: this.e.u.ca(0), duration: this.et/2, delay: this.et/2, ease: "sine.in"});
			}

			this.gameCount=0;
			this.playerAction="wait"
			this.gameAction="move to center"

		}else if(this.gameAction==="move to center"){

			this.xspeed=0;

			// -----------------------------------------------------------------

			this.movePlayerForward();

			// -----------------------------------------------------------------

			this.gameCount+=this.e.dt

			if(this.gameCount>this.et){

				this.gameCount=0;
				this.gameAction="set shoot";

			}

			// console.log(">>>>>"+this.ballAction);

		}else if(this.gameAction==="set shoot"){
			
			this.e.s.p("readyChime")

            this.e.ui.faderOb.opacity = .5;
            gsap.to(this.e.ui.faderOb, { opacity: 0, duration: .5, ease: "linear"});
            
			this.ballTween.pause();
			gsap.to(this.ballCont.position, { z: this.playerCont.position.z + 2, duration: .3, ease: "sine.out"});

			// this.strikeAction.play();
			// this.runningAction.crossFadeTo(this.strikeAction, 0.3, true)

			this.properFade(this.runningAction, this.strikeAction, .1)

			// this.runningAction.stop();
			// this.strikeAction.play();
			// this.aniAction="pause";

			this.gameCount=0;

			this.gameAction="shoot ani wait";
			this.ballAction="pause"

		}else if(this.gameAction==="shoot ani wait"){

			this.gameCount+=this.e.dt

			if(this.gameCount>.225){
				this.strikeAction.paused = true;
				this.gameAction="shoot";

				this.currentTarget = -1;
				this.targetDirection = "up"

				this.e.ui.meterAction="show"

				this.e.ui.highlight2();
			}

		}else if(this.gameAction==="shoot"){

			this.gameCount+=this.e.dt

			if(this.gameCount>.1){

				// console.log(this.currentTarget);

				this.gameCount=0;

				this.e.s.p("targetSwitch")

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

			this.e.ui.meterAction="stop"

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

		}else if(this.gameAction==="force shoot"){

			this.e.ui.highlightReset();

			this.pickedTarget = this.targets[2];

			for(var i=0; i<this.targets.length; i++){

				this.targets[i].material.map = this.targets[i].startTexture;

			}

			this.targets[2].material.map = this.targets[2].highlightTexture;

			this.gameAction="shoot set";

		}else if(this.gameAction==="shoot set"){

			this.pickedTargetLoc = new THREE.Vector3();
			this.pickedTarget.getWorldPosition(this.pickedTargetLoc);

			if(this.playerNum!==2){
				this.uniformFlash()
			}
			
			this.ballFlyTime=.4;

			gsap.to(this.ballCont2.position, { x: this.ballCont.position.x+1, y: this.ballCont.position.y+1, duration: this.ballFlyTime/2, delay:.15, ease: "sine.out"});
			gsap.to(this.ballCont2.position, { x: 0, y: 0, delay: (this.ballFlyTime/2)+.15, duration: this.ballFlyTime/2, ease: "sine.in"});
			gsap.to(this.ballCont.position, { x: this.pickedTargetLoc.x, y: this.pickedTargetLoc.y + this.pickedTarget.offsetY, z: this.pickedTargetLoc.z-.25, duration: this.ballFlyTime, delay:.15, ease: "linear"});

			this.strikeAction.paused = false;

			this.strikeActionPauseCount=0;
			this.gameCount=0;
			this.gameAction="shooting"

			this.strikeAction.play();

			this.playerCont.rotation.y=0

			this.makeKickSound=true;

		}else if(this.gameAction==="shooting"){

			if(this.makeKickSound===true && this.gameCount>.15){

				this.e.s.p("kick")
				this.makeKickSound=false;
			}

			this.strikeActionPauseCount+=this.e.dt;

			this.gameCount+=this.e.dt;

			if(this.gameCount>this.ballFlyTime){

				this.gameCount=0;
				this.gameAction="hit target"

			}

		}else if(this.gameAction==="hit target"){

			// ball has hit target

			// rotate the sign accordingly

			this.e.s.p("metalHit")

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

			this.gameCount=0;
			this.gameAction="has hit target"

			if(this.pickedTarget.num===1 || this.pickedTarget.num===7){
				this.score*=3;
				this.myMult=3;
			}else if(this.pickedTarget.num===2 || this.pickedTarget.num===4 || this.pickedTarget.num===6){
				this.score*=2;
				this.myMult=2;
			}else if(this.pickedTarget.num===3 || this.pickedTarget.num===5){
				this.myMult=1;
				//
			}

		}else if(this.gameAction==="has hit target"){

			this.strikeActionPauseCount+=this.e.dt;

			if(this.strikeActionPauseCount>.8){

				this.strikeAction.paused = true;

				this.properFade(this.strikeAction, this.idleAction, .2)

				this.e.s.p("cheer")

				this.gameAction="wait before victory"

			}

		}else if(this.gameAction==="wait before victory"){

			// this.e.camContY.rotation.y-=this.e.dt;

			this.gameCount+=this.e.dt;
			if(this.gameCount>.5){

				this.properFade(this.idleAction, this.victoryAction, .2)

				this.victoryToIdle=false
				this.gameAction = "show victory"

			}

		}else if(this.gameAction==="show victory"){

			this.e.camContY.rotation.y-=this.e.dt*.8;

			if(this.gameCount>4 && this.victoryToIdle===false){

				this.victoryToIdle=true
				this.properFade(this.victoryAction, this.idleAction, .2)
				// this.victoryAction.stop();

			}

			this.gameCount+=this.e.dt;

			if(this.gameCount>4){

				this.e.s.p("win")

				this.gameAction="load result"
	
			}

		}else if(this.gameAction==="load result"){

			//--------------------------------------------------------------------------------------------------------------

			// --- if loading from mobile
			
			if(this.e.version==="m"){

				this.e.skipCharSelect=true;

				if(this.e.char!==undefined && this.e.char!==null){
					console.log("char "+this.e.char)
					this.playerNum=Number(this.e.char);
				}
				
				this.finalScore=Number(this.e.score);

				if(this.e.date!==null && this.e.mobileGameNumber===0){

					console.log(">>>>stored time")
					this.date=this.fixURLString(this.e.date);
					this.time=this.fixURLString(this.e.time);
	
				}else{
						
					console.log(">>>>real time")
					this.date=this.getDate();
					this.time=this.getTime();

				}

				if(this.e.mobileGameNumber===0){

					this.e.ui.insOb.splashAlpha=0;

					document.getElementById("rmTitle").innerHTML = "Want your prize now?";
					document.getElementById("rmt1").innerHTML = 'Show this at the Pay & Collect Zone to redeem a prize. ';
					document.getElementById("rmt2").innerHTML = 'Or, play again for just 50 MyMcDonald’s Rewards points.';

					document.getElementById('scoreDisplay').innerHTML = "1000 pts";

					document.getElementById("playAgainBut").style.display = "inline";

					document.getElementById("finalScore").innerHTML = this.finalScore;

					this.mymdPoints=1000;

				}else if(this.e.mobileGameNumber===1){

					if(this.e.char===null){
						document.getElementById("rmTitle").innerHTML = "Nice! Go for the prize.";
					}else{
						document.getElementById("rmTitle").innerHTML = "Want your prize now?";
					}
					
					document.getElementById("rmt1").innerHTML = 'Show this at the Pay & Collect Zone to redeem a prize. ';
					document.getElementById("rmt2").innerHTML = 'Or, play again for just 50 MyMcDonald’s Rewards points.';

					document.getElementById('scoreDisplay').innerHTML = "950 pts";

					document.getElementById("playAgainBut").style.display = "inline";

					document.getElementById("finalScore").innerHTML = 0;

					this.mymdPoints=950;

				}else if(this.e.mobileGameNumber===2){

					document.getElementById("rmTitle").innerHTML = "Goooooaaaaaaaaaaall!";
					document.getElementById("rmt1").innerHTML = 'Show this at the Pay & Collect Zone to redeem a prize. ';
					document.getElementById("rmt2").innerHTML = 'Or, play again for just 50 MyMcDonald’s Rewards points.';

					document.getElementById('scoreDisplay').innerHTML = "900 pts";

					document.getElementById("playAgainBut").style.display = "inline";

					document.getElementById("finalScore").innerHTML = 0;

					this.mymdPoints=900;

				}else if(this.e.mobileGameNumber>=3){

					document.getElementById("rmTitle").innerHTML = "Congratulations!";
					document.getElementById("rmt1").innerHTML = 'Show this at the Pay & Collect Zone to redeem a prize. ';
					document.getElementById("rmt2").innerHTML = 'Play daily for your chance to win a Gold or Platinum Ticket, thru 11 April';

					document.getElementById('scoreDisplay').innerHTML = "850 pts";

					document.getElementById("playAgainBut").style.display = "none";

					document.getElementById("finalScore").innerHTML = 0;

					this.mymdPoints=850;

				}

				document.getElementById("resultDate").innerHTML = this.e.date;
				document.getElementById("resultTime").innerHTML = this.e.time;
				
				document.getElementById("qrCode").style.display = "none";
				document.getElementById("rmText").style.width = "100%";
				document.getElementById("rmText").style.fontSize = "2.25vh";

				if(this.e.mobile===false){
					document.getElementById("rmText").style.fontSize = "3.25vh";
				}
				

			}else{

				document.getElementById("playAgainBut").style.display="none"

				console.log(">>>>real time 2")
				this.date=this.getDate();
				this.time=this.getTime();

				// if ipad, load the qr url
					
				this.urlString = "https://podapp.com/t5/mcdonalds48/game/index.html?";

				this.urlString+="v=m"
				this.urlString+="&"
				this.urlString+="char="+this.playerNum;
				this.urlString+="&"
				this.urlString+="score="+this.score;
				this.urlString+="&"
				this.urlString+="date="+this.makeURLString(this.date);
				this.urlString+="&"
				this.urlString+="time="+this.makeURLString(this.time);

				console.log(this.urlString)

				// --- set the final score

				this.finalScore=Number(this.score);
				document.getElementById("finalScore").innerHTML = 0;

				document.getElementById("rmTitle").innerHTML = "Nice! Go for the prize.";
				document.getElementById("rmt1").innerHTML = 'Scan the QR code to redeem a prize now ';
				document.getElementById("rmt2").innerHTML = 'or to play again on your mobile for only 50 MyMcDonald’s Rewards points.';
				document.getElementById("rmText").style.fontSize = "2.25vh"
				
				// --- set mcd points

				document.getElementById('scoreDisplay').innerHTML = "1000 pts";

				//

				var qr = new QRCode(document.getElementById("qrCode"), {
					text: this.urlString,
					width: Math.round(window.innerHeight*.12),
					height: Math.round(window.innerHeight*.12), 
					colorDark: "#000000",
					colorLight: "#ffffff", 
					correctLevel: QRCode.CorrectLevel.H 
				});

				this.mymdPoints=1000;

			}

			if(this.e.mobileGameNumber!==0){

				// --- tally

				console.log("tally "+this.score)

				gsap.to(this.tally, { score: this.score, duration: 4, delay: 1, ease: "linear"});

			}

			//--------------------------------------------------------------------------------------------------------------

			// --- set the date and time

			if(this.date===undefined){
				this.date=this.getDate();
			}

			if(this.time===undefined){
				this.time=this.getTime();
			}

			document.getElementById("resultDate").innerHTML = this.date;
			document.getElementById("resultTime").innerHTML = this.time;

			
			//--------------------------------------------------------------------------------------------------------------

			// --- white fade in

			this.e.ui.faderOb.opacity = 1;
			gsap.to(this.e.ui.faderOb, { opacity: 0, duration: 1.5, ease: "linear"});

			// --- make result div visible and clickable
			
			document.getElementById("resultDiv").style.opacity = 1;
			document.getElementById('resultDiv').style.pointerEvents = 'auto';

			// --- set the player graphic visibility

			console.log("player num "+this.playerNum)

			document.getElementById('resPlayer1').style.opacity=0;
			document.getElementById('resPlayer2').style.opacity=0;
			document.getElementById('resPlayer3').style.opacity=0;

			if(this.playerNum===1){
				document.getElementById('resPlayer1').style.opacity=1;
			}else if(this.playerNum===2){
				document.getElementById('resPlayer2').style.opacity=1;
			}else if(this.playerNum===3){
				document.getElementById('resPlayer3').style.opacity=1;
			}

			// --- position background scene

			this.lerpCamera=false;

			this.stadium.scale.z = 5;
			this.field.scale.z = 3;
			
			this.playerCont.position.y=-10;
			this.playerCont.position.x=10;
			this.e.camContY.position.z=-10;
			this.e.camContY.rotation.y=this.e.u.ca(-45);
			this.e.camContX.rotation.x=this.e.u.ca(-8);

			for(var i=0; i<this.pellets.length; i++){
	
				this.pellets[i].position.y=-10;
	
			}

			// --- hide meter

			document.getElementById('meterDiv').style.display = 'none';

			// --- hide food buttons

			this.e.ui.foodSizer1.opacity = 0;
			this.e.ui.foodSizer2.opacity = 0;
			this.e.ui.foodSizer3.opacity = 0;

			this.e.ui.labelOffset.alpha1 = 0;
			this.e.ui.labelOffset.alpha2 = 0;
			this.e.ui.labelOffset.alpha3 = 0;

			// --- prepare for next action

			this.bingCount=0;
			this.scoreIsTallied=false

			this.gameCount=0;
			
			this.e.ui.insAction=""


			if(this.e.mobileGameNumber!==0){

				this.gameAction="show result menu"

				document.getElementById("playAgainBut").style.opacity=".5"
				document.getElementById("playAgainBut").style.pointerEvents="none"

			}else{

				this.gameAction="start mobile"

			}

		}else if(this.gameAction==="show result menu"){

			this.gameCount+=this.e.dt;

			if(this.gameCount>1 && this.scoreIsTallied===false){

				// if(this.e.isLoadingOnMobile===true){
				if(this.e.mobileGameNumber===0){

					// --- just set it if loading in

					// document.getElementById("finalScore").innerHTML = this.finalScore;

				}else{
					
					// --- use tally if not

					this.bingCount+=this.e.dt;

					if(this.bingCount>.2){

						this.bingCount=0;

						document.getElementById("finalScore").innerHTML = Math.round(this.tally.score);

						if(this.gameCount>=4){

							document.getElementById("finalScore").innerHTML = this.score;

							this.scoreIsTallied=true
							this.e.s.p("start");
							this.e.ui.faderOb.opacity = .75;
							gsap.to(this.e.ui.faderOb, { opacity: 0, duration: 1.5, ease: "linear"});
								
							document.getElementById("playAgainBut").style.opacity="1"
							document.getElementById("playAgainBut").style.pointerEvents="auto"

						}else{

							this.e.s.p("tally");

						}

					}	
					
				}

			}

		}else if(this.gameAction==="start mobile"){

			document.getElementById("playAgainBut").style.opacity="1"
			document.getElementById("playAgainBut").style.pointerEvents="auto"

		}else if(this.gameAction==="play again"){

			// console.log("play again")

			document.getElementById("playAgainBut").style.opacity=".5"
			document.getElementById("playAgainBut").style.pointerEvents="none"

			this.e.s.p("win");
			this.gameCount=0;
			this.bingCount=0;
			this.gameAction="subtract mcd"

		}else if(this.gameAction==="subtract mcd"){

			this.gameCount+=this.e.dt;
			if(this.gameCount>.3){

				this.e.s.p("tally2");
				this.gameCount=0;
				this.bingCount+=1;

				this.mymdPoints-=10;
				document.getElementById('scoreDisplay').innerHTML = this.mymdPoints+" pts";

				if(this.bingCount>=5){
					this.bingCount=0;
					this.gameAction="wait before reset2"
				}

			}

		}else if(this.gameAction==="wait before reset2"){

			this.gameCount+=this.e.dt;
			if(this.gameCount>1){
				this.gameAction="reset2"
			}

		}else if(this.gameAction==="reset2"){

			this.e.ui.insAction="ins1"

			// document.getElementById("playAgainBut").style.opacity="1"
			// document.getElementById("playAgainBut").style.pointerEvents="auto"

			this.e.ui.faderOb.opacity = 1;
			gsap.to(this.e.ui.faderOb, { opacity: 0, duration: 1.5, ease: "linear"});

			this.e.s.p("zoom");

			this.gameAction="";
			this.resetGame();

		}

		// --- reset after time

		if(this.gameCount>120 && this.e.mobileGameNumber<3){

			this.gameCount=0;
			this.resetGame();

		}

		//--------------------------------------------------------------------------------------------------------------

		// CONTROL BALL

		if(this.ballAction==="go"){

			this.ballCont.position.x = this.playerCont.position.x - 0.22 + this.xspeed * 0.02;
			this.ballCont.position.y = 0.20 + this.ballTweenObject.y;
			this.ballCont.position.z = this.playerCont.position.z + 0.5 + this.ballTweenObject.z;

			this.ballCont2.rotation.x+=this.e.dt*20;

		}else if(this.ballAction==="start"){

			this.ballCont.position.x = this.playerCont.position.x - 0.22;
			this.ballCont.position.y = 0.215 + this.ballTweenObject.y;
			this.ballCont.position.z = this.playerCont.position.z + 1.75;

		}

		//--------------------------------------------------------------------------------------------------------------

		// MOVE CAMERA

		if(this.lerpCamera===true){

			this.e.camContY.position.x = this.e.u.lerp(this.e.camContY.position.x,this.playerCont.position.x,20 * this.e.dt);
			this.e.camContY.position.z = this.e.u.lerp(this.e.camContY.position.z,this.playerCont.position.z,20 * this.e.dt);
	
		}

		//--------------------------------------------------------------------------------------------------------------

		// HANDLE ANIMATIONS

		if (this.e.myPlayerModel!==null){
			if (this.e.myPlayerModel.animMixer) {
				if(this.aniAction==="go"){
					if(this.e.loader.loadPlayer1===true){
						this.e.player1.animMixer.update(this.e.dt);
					}
					if(this.e.loader.loadPlayer2===true){
						this.e.player2.animMixer.update(this.e.dt);
					}
					if(this.e.loader.loadPlayer3===true){
						this.e.player3.animMixer.update(this.e.dt);
					}
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
			this.playerAction = "game start";

		} else if (this.playerAction === "move") {

			// -----------------------------------------------------------------

			if(this.movePlayer===true){

				this.movePlayerForward();
				
			}

			//--------------------------------------------------------------------------------------------------------------

			// crash intersections

			if(this.playerCrashCount===undefined){
				this.playerCrashCount=0;
			}

			if(this.playerCrashCount>0){
				this.playerCrashCount-=this.e.dt;
			}

			this.hasHit=false;

			if(this.playerCont.position.z>this.fieldStart+30){
					
				for(var i=0; i<this.crashers.length; i++){

					const box1 = new THREE.Box3().setFromObject(this.playerHit2);
					const box2 = new THREE.Box3().setFromObject(this.crashers[i]);
		
					if (box1.intersectsBox(box2) === true) {

						if(this.playerAction==="move" && this.playerCrashCount<=0){
							this.playerCrashCount=1.5
							this.getScore(-250)
							this.playerAction="crash";
							this.e.s.p("cone")
						}
						
						console.log("HIT "+this.crashers[i].name)
						this.hasHit=true;
						
					}

				}

				for(var i=0; i<this.crashersDummy.length; i++){

					const box1 = new THREE.Box3().setFromObject(this.playerHit2);
					const box2 = new THREE.Box3().setFromObject(this.crashersDummy[i]);
		
					if (box1.intersectsBox(box2) === true) {

						if(this.playerAction==="move" && this.playerCrashCount<=0){
							this.getScore(-500)

							this.playerAction="crashBack"
							this.playerCrashCount=1.5

							this.e.ui.highlightReset()
						}
						
						console.log("HIT "+this.crashersDummy[i].name)
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

			// for(var i=0; i<this.dummyLines.length; i++){

			// 	var d = this.dummyLines[i].position.z - this.playerCont.position.z
			// 	if(d<30){
	
			// 		this.dummyLines[i].action="alert";
	
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

			if(this.usePlayerRot===true){
				this.playerCont.rotation.y = this.e.u.ca(this.xspeed * 2);
			}else{
				this.playerCont.rotation.y *= .95
			}
			
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

		} else if (this.playerAction === "crashBack") {

			this.e.s.p("metalHit")

			this.properFade(this.runningAction, this.stumbleBackAction, .2, 1.5, true)
			this.playerCount = 0;
			this.playerAction = "crashingBack"

			this.preventMoving=1;

			this.isCrashing=true;
			this.crashingTime=0;

		} else if (this.playerAction === "crashingBack") {

			// xspeed

			this.playerSideToSide();

			// this.playerCont.position.x += this.e.dt * this.xspeed; 
			this.movePlayerForward();

			this.playerCount+=this.e.dt;

			if(this.playerCount>.8){

				this.properFade(this.stumbleBackAction, this.runningAction, .4)
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
			this.movePlayerForward();

			this.playerCount+=this.e.dt;

			if(this.playerCount>.4){

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

			this.e.s.p("zoom")

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
				this.movePlayerForward();
				//

			// console.log(this.mySpinnerBox)

			gsap.to(this.playerCont.position, { x: this.mySpinnerBox.position.x, duration: 0.6, ease: "sine.out"});

			this.playerCount = 0;
			this.playerAction = "go to position"

		}else if(this.playerAction === "go to position"){

				// keep moving player
				this.movePlayerForward();
				//

			this.playerCount+=this.e.dt;

			if(this.playerCount>0.6){

				this.playerAction = "wait get to ring"
				this.playerCount = 0;

			}

		}else if(this.playerAction === "wait get to ring"){

				// keep moving player
				this.movePlayerForward();
				//

			if(this.playerCont.position.z > this.doTheSpinAt){

				this.playerAction = "set spin move";

			}

		}else if(this.playerAction === "set spin move"){

				// keep moving player
				this.movePlayerForward();
				//

			this.properFade(this.runningAction, this.spinningAction, .2)
			this.stumbleAction.fadeOut( .1 );

			gsap.to(this.playerCont.position, { x: this.mySpinnerBox.position.x-4, duration: 0.6, ease: "sine.inOut"});

			this.playerAction="wait spin move"

		}else if(this.playerAction === "wait spin move"){

				// keep moving player
				this.movePlayerForward();
				//

			this.playerCount+=this.e.dt;

			if(this.playerCount>1){

				this.playerAction = "back to run"
				this.playerCount = 0;

			}
	

		}else if(this.playerAction === "back to run"){

				// keep moving player
				this.movePlayerForward();
				//

			this.properFade(this.spinningAction, this.runningAction, .3)

			this.playerAction="move"


			// this.mySpinnerBox = closestBox
			// this.doTheSpinAt = this.dummyLines[i].spinnerBoxes[j].position.z;

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

	makeURLString(str){
		return str.replace(/ /g, "%20");
	}

	fixURLString(str){
		return str.replace(/%20/g, " ");
	}

	getDate() {
		
		const currentDate = new Date();
	
		const day = String(currentDate.getDate()).padStart(2, '0');
		var month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const year = String(currentDate.getFullYear()).slice(-2);

		var myMonth = "January"

		// console.log("my month "+month)

		if(month==="01"){
			myMonth = "January"
		}else if(month==="02"){
			myMonth = "February"
		}else if(month==="03"){
			myMonth = "March"
		}else if(month==="04"){
			myMonth = "April"
		}else if(month==="05"){
			myMonth = "May"
		}else if(month==="06"){
			myMonth = "June"
		}else if(month==="07"){
			myMonth = "July"
		}else if(month==="08"){
			myMonth = "August"
		}else if(month==="09"){
			myMonth = "September"
		}else if(month==="10"){
			myMonth = "October"
		}else if(month==="11"){
			myMonth = "November"
		}else if(month==="12"){
			myMonth = "December"
		}
	
		// return `${myMonth} ${day}, 20${year}`;
		return `${day} ${myMonth}`;

	}

	getTime(){
		
		const currentTime = new Date();
	
		this.hours = String(currentTime.getHours()).padStart(2, '0');
		const minutes = String(currentTime.getMinutes()).padStart(2, '0');
		const seconds = String(currentTime.getSeconds()).padStart(2, '0');
			
		const meridiem = this.hours >= 12 ? 'PM' : 'AM';
		this.hours = this.hours % 12 || 12;

		return `${this.hours}:${minutes} ${meridiem}`;
		// return `${this.hours}:${minutes}`;

	}

	movePlayerForward(){

		// this.playerCont.position.z += this.e.dt * this.gameSpeed * this.slowDownFactor.num;

		if(this.preventMoving<=0){
			this.playerCont.position.z += this.e.dt * this.gameSpeed;
		}else{
			this.preventMoving-=this.e.dt;
		}
		

	}

	playerSideToSide(){

		if(this.e.controlType==="drag"){

			// if (this.e.mobile === true) {

				if (this.e.input.ongoingTouches.length === 0) {

					this.xspeed *= 0.9;

				} else if ( this.e.touch.x - this.e.mouseDown.x < 0 ) {

					if( this.e.touch.y<window.innerHeight-100 ){
						this.xspeed += this.e.dt * this.speedIncrease;
					}
					
				} else if ( this.e.touch.x - this.e.mouseDown.x > 0 ) {

					if( this.e.touch.y<window.innerHeight-100 ){
						this.xspeed -= this.e.dt * this.speedIncrease;
					}

				}

			// } else {

				// if (this.e.mouseIsDown === false) {

				// 	this.xspeed *= 0.9;

				// } else if ( this.e.mouse.x - this.e.mouseDown.x < -20 ) {

				// 	this.xspeed += this.e.dt * this.speedIncrease;

				// } else if ( this.e.mouse.x - this.e.mouseDown.x > 20 ) {

				// 	this.xspeed -= this.e.dt * this.speedIncrease;

				// }

				// if (this.e.input.keyRight === true) {

				// 	this.xspeed -= this.e.dt * this.speedIncrease;

				// } else if (this.e.input.keyLeft === true) {

				// 	this.xspeed += this.e.dt * this.speedIncrease;

				// } else {

				// 	this.xspeed *= 0.9;
					
				// }

			// }


		}else if(this.e.controlType==="side"){

			if (this.e.mobile === true) {

				if (this.e.input.ongoingTouches.length === 0) {

					this.xspeed *= 0.9;

				} else if (this.e.input.ongoingTouches[0].clientX > window.innerWidth / 2) {

					if( this.e.touch.y<window.innerHeight-100 ){
						this.xspeed -= this.e.dt * this.speedIncrease;
					}
					
				} else if (this.e.input.ongoingTouches[0].clientX < window.innerWidth / 2) {

					if( this.e.touch.y<window.innerHeight-100 ){
						this.xspeed += this.e.dt * this.speedIncrease;
					}

				}

			} else {

				if (this.e.mouseIsDown === false) {

					this.xspeed *= 0.9;

				} else if ( this.e.mouse.x > window.innerWidth / 2 ) {

					if( this.e.mouse.y<window.innerHeight-100 ){
						this.xspeed -= this.e.dt * this.speedIncrease;
					}

				} else if ( this.e.mouse.x < window.innerWidth / 2 ) {

					if( this.e.mouse.y<window.innerHeight-100 ){
						this.xspeed += this.e.dt * this.speedIncrease;
					}

				}

				// if (this.e.input.keyRight === true) {

				// 	this.xspeed -= this.e.dt * this.speedIncrease;

				// } else if (this.e.input.keyLeft === true) {

				// 	this.xspeed += this.e.dt * this.speedIncrease;

				// } else {

				// 	this.xspeed *= 0.9;
					
				// }

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

	properFade(prev, next, time, timeScale, isCrashBack){

		console.log(prev.name+" / "+next.name)

		if(timeScale===undefined){

			timeScale=1;

		}

		if(next===this.runningAction || next===this.spinningAction){

			if(this.e.playSounds===true){
				this.runVolume=.5
			}else{
				this.runVolume=0
			}
			

		}else{
			
			this.runVolume=0

		}

		// make sure you set the timescale at the start or it won't work

		// jeez! so dumb

		next.reset()
		next.setEffectiveTimeScale( timeScale )
		
		if(isCrashBack===true){

			next.time=.5;

		}

		next.play();

		prev.fadeOut( time );
		next.fadeIn( time );

		this.myCurrentAnimation=next.name;

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
			this.fieldLogo.material.color.setHex( "0x"+this.hslToHex(c1_H,c1_S,c1_L) );
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
			// this.roofEdge.material.color.setHex(
			// 	"0x" + this.hslToHex(c3_H, c3_S, c3_L)
			// );

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
			// this.water.material.opacity = num2;
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
