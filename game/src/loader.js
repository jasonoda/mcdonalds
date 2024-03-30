import * as THREE from "../../build/three.module.js";
import { GLTFLoader } from "../jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "../jsm/loaders/DRACOLoader.js";

export class Loader {
	setUp(e) {
		console.log("Three.js version:", THREE.REVISION);
		this.e = e;

		this.ready = false;
		this.objectsLoaded = 0;
		this.loaderArray = [];

		this.totalModels = 0;
		this.totalModelsLoaded = 0;

		this.isLoaded_CUBE = true;
		this.isLoaded_3DTEXTURES = false;
		this.isLoaded_3D = false;
		this.e.reflectionTexture = null;

		this.texturesLoaded = 0;
	}

	loadCubeTexture(loader) {
		console.log("CUBE TEXTURE");
		// this.isLoaded_CUBE=true;
	}

	loadTexture(loader) {

		// loader.objectsLoaded += 1;
		loader.texturesLoaded += 1;


		console.log("LOAD 3D TEXTURE: " + this.texturesLoaded + " / " +this.loaderArray.length);

		if (this.objectsLoaded === this.loaderArray.length) {
			this.isLoaded_3DTEXTURES = true;
		}
	}

	managerLoad(obName) {
		this.objectsLoaded += 1;
		this.totalModelsLoaded += 1;

		// console.log("MODEL: " +obName +" - " +this.objectsLoaded +" / " +(this.loaderArray.length));

		if (this.objectsLoaded === this.loaderArray.length) {
			console.log("3d is loaddedd")
			this.isLoaded_3D = true;
		}
	}

	load() {
		var e = this.e;

		//------------------------------------------------------------------

		var loader = new THREE.CubeTextureLoader();
		loader.name = "skyboxLoaderName";

		this.e.reflectionTexture = loader.load(
			[
				"./src/img/ref/pos-x.png",
				"./src/img/ref/neg-x.png",
				"./src/img/ref/pos-y.png",
				"./src/img/ref/neg-y.png",
				"./src/img/ref/pos-z.png",
				"./src/img/ref/neg-z.png",
			],
			this.loadCubeTexture
		);

		// this.loaderArray.push("blackTemp");

		this.e.target2000 = new THREE.TextureLoader().load("./src/img/target2000.png",this.loadTexture(this)); this.loaderArray.push("target2000");
		this.e.target2000_b = new THREE.TextureLoader().load("./src/img/target2000_b.png",this.loadTexture(this)); this.loaderArray.push("target2000_b");
		this.e.target1000 = new THREE.TextureLoader().load("./src/img/target1000.png",this.loadTexture(this)); this.loaderArray.push("target1000");
		this.e.target1000_b = new THREE.TextureLoader().load("./src/img/target1000_b.png",this.loadTexture(this)); this.loaderArray.push("target1000_b");
		this.e.target500 = new THREE.TextureLoader().load("./src/img/target500.png",this.loadTexture(this)); this.loaderArray.push("target500");
		this.e.target500_b = new THREE.TextureLoader().load("./src/img/target500_b.png",this.loadTexture(this)); this.loaderArray.push("target500_b");

		this.e.glowTexture = new THREE.TextureLoader().load("./src/img/gradGlowWhite2.png",this.loadTexture(this)); this.loaderArray.push("gradGlowWhite2");

		this.e.blueShirt = new THREE.TextureLoader().load("./src/img/blueShirt.png",this.loadTexture(this)); this.loaderArray.push("blueShirt");
		this.e.blueShirt.flipY = false;

		// this.e.blackTemp.anisotropy = this.e.renderer.capabilities.getMaxAnisotropy();

		// this.e.blackTemp.repeat.x = 260;
		// this.e.blackTemp.repeat.y = 260;
		// this.e.blackTemp.wrapS = this.e.blackTemp.wrapT = THREE.RepeatWrapping;

		//------------------------------------------------------------------

		console.log("---------------------------BEGIN LOADER---------------------------");
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("./jsm/loaders/draco/"); // Make sure this path is correct

		//------------------------------------------------------------------

		this.myObject1 = "stadium";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage1 = new THREE.LoadingManager();
		this.manage1.onLoad = () => {
			this.managerLoad(this.myObject1);
		};

		this.loader = new GLTFLoader(this.manage);
		this.loader.setDRACOLoader(dracoLoader);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.stadium = gltf.scene;

					if (object.isMesh) {
						object.castShadow = false;
						object.receiveShadow = false;
						object.material.side = THREE.FrontSide;
					}
				});
			},
			this.loadSomething
		);

		//------------------------------------------------------------------

		this.myObject1 = "ring";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};
		this.loader = new GLTFLoader(this.manage);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.ring = gltf.scene;

					if (object.isMesh) {
						object.material.side = THREE.FrontSide;
					}
				});
			},
			this.loadSomething
		);

		//------------------------------------------------------------------

		this.myObject1 = "soccerBall";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};
		this.loader = new GLTFLoader(this.manage);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.soccerBall = gltf.scene;

					if (object.isMesh) {
						object.castShadow = true;
						object.receiveShadow = true;
						object.material.side = THREE.FrontSide;
					}
				});
			},
			this.loadSomething
		);

		//------------------------------------------------------------------

		this.myObject1 = "goal";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};
		this.loader = new GLTFLoader(this.manage);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.goal = gltf.scene;

					if (object.isMesh) {
						object.castShadow = true;
						object.receiveShadow = true;
						object.material.side = THREE.FrontSide;
					}
				});
			},
			this.loadSomething
		);

		//------------------------------------------------------------------

		this.myObject1 = "cone";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};
		this.loader = new GLTFLoader(this.manage);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.cone = gltf.scene;

					if (object.isMesh) {
						object.castShadow = true;
						object.receiveShadow = true;
						object.material.side = THREE.FrontSide;
					}
				});
			},
			this.loadSomething
		);

		//------------------------------------------------------------------

		this.myObject1 = "field";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};
		this.loader = new GLTFLoader(this.manage);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.field = gltf.scene;

					if (object.isMesh) {
						// object.castShadow = true;
						object.receiveShadow = true;
						object.material.side = THREE.FrontSide;
					}
				});
			},
			this.loadSomething
		);

		//------------------------------------------------------------------

		this.myObject1 = "dummy";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};
		this.loader = new GLTFLoader(this.manage);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.dummy = gltf.scene;

					if (object.isMesh) {
						object.castShadow = true;
						// object.receiveShadow = true;
						object.material.side = THREE.FrontSide;
					}
				});
			},
			this.loadSomething
		);

		//------------------------------------------------------------------

		this.myObject1 = "hurdle";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};
		this.loader = new GLTFLoader(this.manage);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.hurdle = gltf.scene;

					if (object.isMesh) {
						object.castShadow = true;
						// object.receiveShadow = true;
						object.material.side = THREE.FrontSide;
					}
				});
			},
			this.loadSomething
		);

		//------------------------------------------------------------------

		this.myObject1 = "warning";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};
		this.loader = new GLTFLoader(this.manage);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.warning = gltf.scene;

					if (object.isMesh) {
						// object.castShadow = true;
						object.receiveShadow = true;
						object.material.side = THREE.FrontSide;
					}
				});
			},
			this.loadSomething
		);

		//------------------------------------------------------------------

		this.myObject1 = "sprinkler";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};
		this.loader = new GLTFLoader(this.manage);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.sprinkler = gltf.scene;

					if (object.isMesh) {
						// object.castShadow = true;
						object.receiveShadow = true;
						object.material.side = THREE.FrontSide;
					}
				});
			},
			this.loadSomething
		);

		//------------------------------------------------------------------

		this.loadPlayer1=true;
		this.loadPlayer2=true;
		this.loadPlayer3=true;

		console.log("VERSION")
		console.log(this.e.version)

		if(this.e.version==="m"){

			console.log(this.e.char)

			if(this.e.char==="1"){

				this.loadPlayer1=true;
				this.loadPlayer2=false;
				this.loadPlayer3=false;
		
			}else if(this.e.char==="2"){

				console.log("char 2---")

				this.loadPlayer1=false;
				this.loadPlayer2=true;
				this.loadPlayer3=false;
		
			}else if(this.e.char==="3"){

				this.loadPlayer1=false;
				this.loadPlayer2=false;
				this.loadPlayer3=true;
		
			}

		}

		//------------------------------------------------------------------
		// PLAYER 1

		if(this.loadPlayer1===true){
				
			console.log(">>> PLAYER1")
					
			this.myObject1 = "player1";
			this.loaderArray.push(this.myObject1);
			this.totalModels += 1;
			this.manage = new THREE.LoadingManager();
			this.manage.onLoad = () => {
				this.managerLoad(this.myObject1);
			};

			this.loader = new GLTFLoader(this.manage);
			this.loader.setDRACOLoader(dracoLoader);

			this.loader.load("./src/models/" + this.myObject1 + ".glb",(gltf) => {gltf.scene.traverse(function (object) {

						object.castShadow = true;
						object.receiveShadow = false;

						if (object.isSkinnedMesh) {

							// console.log(">>> PLAYER1 -"+object.material.name)

							if(object.material.name==="CLEATS.007"){

								// object.material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

							}else if(object.material.name==="SKIN.007"){

								object.material.color.set(0xffffff)

							}else if(object.material.name==="SKINBODY.007" || object.material.name==="SKINBODYARMS.007"){

								e.scene.skinMaterial = new THREE.MeshLambertMaterial({ color: 0x542d2b });
								object.material = e.scene.skinMaterial;

							}else if(object.material.name==="TOP.001" || object.material.name==="PANTS.003" || object.material.name==="PANTS.016"){

								// e.scene.uniformColor = 0x4e228c;
								object.material = new THREE.MeshLambertMaterial({ color: 0xff0000, roughness: 1, metalness: 0 });

								e.scene.uniformArray.push(object.material)
								
								// console.log("----- found "+object.name)

							}else if(object.material.name==="PANTSTRIPE.001" || object.material.name==="SHIRTSTRIPE.001" || object.material.name==="ARMBAND.001" || object.material.name==="WHITEBAND.001" || object.material.name==="ARMBANDSTRIPE.001"){

								e.scene.stripeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
								object.material = e.scene.stripeMaterial;

							// }else if(object.material.name==="CLEATS"){

							// 	e.scene.cleatsMaterial = new THREE.MeshLambertMaterial({ color: 0x999999 });
							// 	object.material = e.scene.cleatsMaterial;

							}

							object.material.skinning = true;
						}

					});

					this.animMixer = new THREE.AnimationMixer(gltf.scene);

					gltf.animations.forEach((clip) => {
						// console.log("Animation name:", clip.name);
					});

					e.player1 = gltf.scene;
					e.player1.animMixer = this.animMixer;
					e.player1.animations = gltf.animations;
					// console.log("e.player1.anim", e.player1.animations);
				},
				this.loadSomething,
				(error) => {
					console.error("An error happened:", error);
				}
			);

		}

		//------------------------------------------------------------------
		// PLAYER 2

		if(this.loadPlayer2===true){
					
			console.log(">>> PLAYER2")
					
			this.myObject1 = "player2";
			this.loaderArray.push(this.myObject1);
			this.totalModels += 1;
			this.manage = new THREE.LoadingManager();
			this.manage.onLoad = () => {
				this.managerLoad(this.myObject1);
			};

			this.loader = new GLTFLoader(this.manage);
			this.loader.setDRACOLoader(dracoLoader);

			this.loader.load("./src/models/" + this.myObject1 + ".glb",(gltf) => {gltf.scene.traverse(function (object) {

						object.castShadow = true;
						object.receiveShadow = false;

						if (object.isSkinnedMesh) {

							// console.log(">>> PLAYER2 -"+object.material.name)

							if(object.material.name==="SKIN"){

								object.material = new THREE.MeshLambertMaterial({ color: 0xbe825d });

							}else if(object.material.name==="BLACK" || object.material.name==="BOTTOMS"){

								object.material.color.set(0x111111)
								e.scene.uniformArray2.push(object.material)

							}else if(object.material.name==="WHITE"){

								object.material.color.set(0xcccccc)
								// e.scene.uniformArray.push(object.material)

							}else if(object.material.name==="SHIRT"){

								e.shirtMat = object.material;
								e.blackShirt = object.material.map;

								// object.material.transparent = true;

								// e.scene.uniformArray2.push(object.material)

							}else if(object.material.name==="Wolf3D_Skin"){

								// console.log( object.material.map )
								var saveMap = object.material.map

								object.material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: saveMap, emissive: 0x222222 });

							}

							object.material.skinning = true;
						}

					});

					this.animMixer = new THREE.AnimationMixer(gltf.scene);

					gltf.animations.forEach((clip) => {
						// console.log("Animation name:", clip.name);
					});

					e.player2 = gltf.scene;
					e.player2.animMixer = this.animMixer;
					e.player2.animations = gltf.animations;
					console.log("e.player2.anim", e.player1.animations);
				},
				this.loadSomething,
				(error) => {
					console.error("An error happened:", error);
				}
			);

		}

		//------------------------------------------------------------------
		// PLAYER 3

		if(this.loadPlayer3===true){

			console.log(">>> PLAYER3")
					
			this.myObject1 = "player3";
			this.loaderArray.push(this.myObject1);
			this.totalModels += 1;
			this.manage = new THREE.LoadingManager();
			this.manage.onLoad = () => {
				this.managerLoad(this.myObject1);
			};

			this.loader = new GLTFLoader(this.manage);
			this.loader.setDRACOLoader(dracoLoader);

			this.loader.load("./src/models/" + this.myObject1 + ".glb",(gltf) => {gltf.scene.traverse(function (object) {

						object.castShadow = true;
						object.receiveShadow = false;

						if (object.isSkinnedMesh) {

							// console.log(">>> PLAYER3 -"+object.material.name)

							if(object.material.name==="Wolf3D_Body"){
								
								e.scene.skinMaterial = new THREE.MeshLambertMaterial({ color: 0x8e5035 });
								object.material = e.scene.skinMaterial;

							}else if(object.material.name==="SHIRT.001"){

								object.material.color.set(0x999999)
								e.scene.uniformArray4.push(object.material)

							}else if(object.material.name==="Wolf3D_Skin.002"){

								object.material.color.set(0xffffff)

							// }else if(object.material.name==="BOTTOMS"){

								// object.material.color.set(0xaa0000)

							}else if(object.material.name==="BOTTOMS.001"){

								// console.log(object.material.color)

								object.material.color.set(0xe66800)

								e.scene.uniformArray3.push(object.material)

							}else if(object.material.name==="WHITE.001"){

								object.material.color.set(0x999999)
								e.scene.uniformArray4.push(object.material)

							}else if( object.material.name==="REDSTRIPESOCK" || object.material.name==="STRIP.001" || object.material.name==="STRIPE.001" || object.material.name==="REDSOCKSTRIP"){

								object.material.color.set(0xff0000)
								e.scene.uniformArray5.push(object.material)

							}

							object.material.skinning = true;
						}

					});

					this.animMixer = new THREE.AnimationMixer(gltf.scene);

					gltf.animations.forEach((clip) => {
						// console.log("Animation name:", clip.name);
					});

					e.player3 = gltf.scene;
					e.player3.animMixer = this.animMixer;
					e.player3.animations = gltf.animations;
					// console.log("e.player3.anim", e.player3.animations);
				},
				this.loadSomething,
				(error) => {
					console.error("An error happened:", error);
				}
			);

		}

	}
}
