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
	}

	loadCubeTexture(loader) {
		console.log("CUBE TEXTURE");
		// this.isLoaded_CUBE=true;
	}

	loadTexture(loader) {
		// loader.objectsLoaded += 1;
		console.log("LOAD 3D TEXTURE: " + loader + " - " + this.objectsLoaded + " / " +this.loaderArray.length);

		if (this.objectsLoaded === this.loaderArray.length) {
			this.isLoaded_3DTEXTURES = true;
		}
	}

	managerLoad(obName) {
		this.objectsLoaded += 1;
		this.totalModelsLoaded += 1;

		console.log("MODEL: " +obName +" - " +this.objectsLoaded +" / " +(this.loaderArray.length));

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

		this.e.target2000 = new THREE.TextureLoader().load("./src/img/target2000.png",this.loadTexture(this));
		this.e.target2000_b = new THREE.TextureLoader().load("./src/img/target2000_b.png",this.loadTexture(this));
		this.e.target1000 = new THREE.TextureLoader().load("./src/img/target1000.png",this.loadTexture(this));
		this.e.target1000_b = new THREE.TextureLoader().load("./src/img/target1000_b.png",this.loadTexture(this));
		this.e.target500 = new THREE.TextureLoader().load("./src/img/target500.png",this.loadTexture(this));
		this.e.target500_b = new THREE.TextureLoader().load("./src/img/target500_b.png",this.loadTexture(this));

		// this.e.blackTemp.anisotropy = this.e.renderer.capabilities.getMaxAnisotropy();

		// this.e.blackTemp.repeat.x = 260;
		// this.e.blackTemp.repeat.y = 260;
		// this.e.blackTemp.wrapS = this.e.blackTemp.wrapT = THREE.RepeatWrapping;

		//------------------------------------------------------------------

		console.log("BEGIN LOADER");
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
						object.castShadow = true;
						object.receiveShadow = true;
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
						object.castShadow = true;
						object.receiveShadow = true;
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

		this.myObject1 = "cone2";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};
		this.loader = new GLTFLoader(this.manage);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.cone2 = gltf.scene;

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

		this.myObject1 = "waterLine";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};
		this.loader = new GLTFLoader(this.manage);
		this.loader.load("./src/models/" + this.myObject1 + ".glb", (gltf) => {
				gltf.scene.traverse(function (object) {
					e.waterLine = gltf.scene;

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
						object.castShadow = true;
						object.receiveShadow = true;
						object.material.side = THREE.FrontSide;
					}
				});
			},
			this.loadSomething
		);

		//------------------------------------------------------------------

		// this.myObject1 = "spinner2";
		// this.loaderArray.push(this.myObject1);
		// this.totalModels += 1;
		// this.manage = new THREE.LoadingManager();
		// this.manage.onLoad = () => {
		// 	this.managerLoad(this.myObject1);
		// };
		// this.loader = new GLTFLoader(this.manage);
		// this.loader.load(
		// 	"./src/models/" + this.myObject1 + ".glb",
		// 	(gltf) => {
		// 		gltf.scene.traverse(function (object) {
		// 			e.spinner = gltf.scene;

		// 			if (object.isMesh) {
		// 				object.castShadow = true;
		// 				object.receiveShadow = true;
		// 				object.material.side = THREE.FrontSide;
		// 			}
		// 		});
		// 	},
		// 	this.loadSomething
		// );

		//------------------------------------------------------------------

		// this.myObject1 = "gate";
		// this.loaderArray.push(this.myObject1);
		// this.totalModels += 1;
		// this.manage = new THREE.LoadingManager();
		// this.manage.onLoad = () => {
		// 	this.managerLoad(this.myObject1);
		// };
		// this.loader = new GLTFLoader(this.manage);
		// this.loader.load(
		// 	"./src/models/" + this.myObject1 + ".glb",
		// 	(gltf) => {
		// 		gltf.scene.traverse(function (object) {
		// 			e.gate = gltf.scene;

		// 			if (object.isMesh) {
		// 				object.castShadow = true;
		// 				object.receiveShadow = true;
		// 				object.material.side = THREE.FrontSide;
		// 			}
		// 		});
		// 	},
		// 	this.loadSomething
		// );

		//------------------------------------------------------------------

		// this.myObject1 = "pole";
		// this.loaderArray.push(this.myObject1);
		// this.totalModels += 1;
		// this.manage = new THREE.LoadingManager();
		// this.manage.onLoad = () => {
		// 	this.managerLoad(this.myObject1);
		// };
		// this.loader = new GLTFLoader(this.manage);
		// this.loader.load(
		// 	"./src/models/" + this.myObject1 + ".glb",
		// 	(gltf) => {
		// 		gltf.scene.traverse(function (object) {
		// 			e.pole = gltf.scene;

		// 			if (object.isMesh) {
		// 				object.castShadow = true;
		// 				object.receiveShadow = true;
		// 				object.material.side = THREE.FrontSide;
		// 			}
		// 		});
		// 	},
		// 	this.loadSomething
		// );

		//------------------------------------------------------------------

		// this.myObject1 = "track";
		// this.loaderArray.push(this.myObject1);
		// this.totalModels += 1;
		// this.manage = new THREE.LoadingManager();
		// this.manage.onLoad = () => {
		// 	this.managerLoad(this.myObject1);
		// };
		// this.loader = new GLTFLoader(this.manage);
		// this.loader.load(
		// 	"./src/models/" + this.myObject1 + ".glb",
		// 	(gltf) => {
		// 		gltf.scene.traverse(function (object) {
		// 			e.track = gltf.scene;

		// 			if (object.isMesh) {
		// 				object.castShadow = true;
		// 				object.receiveShadow = true;
		// 				object.material.side = THREE.FrontSide;
		// 			}
		// 		});
		// 	},
		// 	this.loadSomething
		// );

		// //------------------------------------------------------------------
		// // Inside your load method or appropriate place
		this.myObject1 = "readyplayerme";
		this.loaderArray.push(this.myObject1);
		this.totalModels += 1;
		this.manage = new THREE.LoadingManager();
		this.manage.onLoad = () => {
			this.managerLoad(this.myObject1);
		};

		// Initialize DRACOLoader and set the decoder path

		// Initialize GLTFLoader with the manager
		this.loader = new GLTFLoader(this.manage);
		this.loader.setDRACOLoader(dracoLoader); // Attach DRACOLoader to GLTFLoader

		this.loader.load("./src/models/" + this.myObject1 + ".glb",(gltf) => {gltf.scene.traverse(function (object) {

					object.castShadow = true;
					object.receiveShadow = false;

					if (object.isSkinnedMesh) {

						console.log(">>> "+object.material.name)

						if(object.material.name==="SKINBODY" || object.material.name==="SKINBODYARMS"){

							e.scene.skinMaterial = new THREE.MeshLambertMaterial({ color: 0x2f1918 });
							object.material = e.scene.skinMaterial;

						}else if(object.material.name==="TOP.001" || object.material.name==="PANTS.003" || object.material.name==="SOCKS.001"){

							// e.scene.uniformColor = 0x4e228c;
							object.material = new THREE.MeshLambertMaterial({ color: 0xff0000, roughness: 1, metalness: 0 });

							e.scene.uniformArray.push(object.material)
							
							// console.log("----- found "+object.name)

						}else if(object.material.name==="PANTSTRIPE.001" || object.material.name==="SHIRTSTRIPE.001" || object.material.name==="ARMBAND.001" || object.material.name==="WHITEBAND.001" || object.material.name==="ARMBANDSTRIPE.001"){

							e.scene.stripeMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
							object.material = e.scene.stripeMaterial;

						// }else if(object.material.name==="CLEATS"){

						// 	e.scene.cleatsMaterial = new THREE.MeshLambertMaterial({ color: 0x999999 });
						// 	object.material = e.scene.cleatsMaterial;

						}

						object.material.skinning = true;
					}

				});

				// Create the animation mixer for the loaded scene
				this.animMixer = new THREE.AnimationMixer(gltf.scene);

				// Log each animation name
				gltf.animations.forEach((clip) => {
					// console.log("Animation name:", clip.name);
				});

				// Assign the scene to e.readyplayerme
				e.readyplayerme = gltf.scene;
				e.readyplayerme.animMixer = this.animMixer;
				e.readyplayerme.animations = gltf.animations;
				console.log("e.readyplayerme.aniom", e.readyplayerme.animations);
			},
			this.loadSomething, // Assuming this is a function you've defined elsewhere for progress updates
			(error) => {
				console.error("An error happened:", error);
			}
		);
	}
}
