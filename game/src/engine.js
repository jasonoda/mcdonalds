import * as THREE from '../../build/three.module.js';
import { gsap } from "./greensock/all.js";

export class Engine {
    constructor(
        skipTo,
        showOutput,
        scene,
        input,
        loader,
        sounds,
        utilities,
        ui
    ) {
        this.skipTo = skipTo;
        this.showOutput = showOutput;
        this.scene = scene; 
        this.input = input; 
        this.loader = loader;  
        this.s = sounds; 
        this.u = utilities; 
        this.ui = ui; 
        this.mouse = new Object;
        this.mouse.x=0;
        this.mouse.y=0;
        this.mouseIsDown=false;
        this.touch = new Object;
        this.touch.x=0;
        this.touch.y=0;
        this.playSounds=true

        this.skipCharSelect=false;
        this.controlType = "side"
         
        this.mobile = false;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
            this.mobile = true;
        }

        //---vars--------------------------------------------------------------------------------------------------------------

        this.action="set up"
        this.count=0;

        this.mouseDown = new THREE.Vector2();
        this.mouseDown.x=0;
        this.mouseDown.y=0;
        
        document.addEventListener('mousemove',  (event) => {
            if(this.mobile===false){
                this.mouse.x = event.clientX 
                this.mouse.y = event.clientY 
            }
            
        });

        //---params--------------------------------------------------------------------------------------------------------------

		this.params = new URLSearchParams(window.location.search);
		this.version = this.params.get('v');
		this.char = this.params.get('char');
		this.gm = this.params.get('gm'); //goldenMove
		this.sr = this.params.get('sr'); //sodaRush
		this.mm = this.params.get('mm'); //myMult
		this.en = this.params.get('en'); //energy
		this.pen = this.params.get('pen'); //penalty
		this.score = this.params.get('score'); //score
		this.date = this.params.get('date'); //date
		this.time = this.params.get('time'); //time

        console.log(this.date);
        console.log(this.time);

		// console.log(this.version);

		if(this.version==="m"){

			console.log(this.char)

			if(this.char!==null){

				this.isLoadingOnMobile=true;
                this.skipCharSelect=true;
                this.mobileGameNumber=0;

			}else{

                // this.isLoadingOnMobile=true;
                this.mobileGameNumber=1

            }

		}
        
       

    }

    start(){

    }

    isIpadPro() {
        // iPad Pros have a higher pixel density and larger screen sizes. Adjust these as new models are released.
        var screenCheck = (window.matchMedia && window.matchMedia("(min-device-width: 1024px) and (max-device-width: 1366px)").matches);
        var pixelDensityCheck = (window.devicePixelRatio && window.devicePixelRatio > 1);
    
        // Safari on iPadOS should no longer distinguish itself as an iPad specifically, but this is a good additional check for older devices
        var userAgentCheck = /Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
    
        return screenCheck && pixelDensityCheck && userAgentCheck;
    }

    update(){

        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) 
            || this.isIpadPro()===true ) {
            this.mobile = true;
        }

        //---misc--------------------------------------------------------------------------------------------------------------

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);

        //---deltatime--------------------------------------------------------------------------------------------------------------

        var currentTime = new Date().getTime();
        this.dt = (currentTime - this.lastTime) / 1000;
        if (this.dt > 1) {
            this.dt = 0;
        }
        this.lastTime = currentTime;

        //---loop--------------------------------------------------------------------------------------------------------------

        // feedback

        // if(this.ui.tester!==null && this.ui.tester!==undefined){
        //     this.ui.tester.position.x=this.mouse.x;
        //     this.ui.tester.position.y=this.mouse.y;
        // }

        if(this.scene.playerCont!==undefined && this.input.ongoingTouches!==undefined){
            //document.getElementById("feedback").innerHTML = this.scene.playerAction + " / " + this.scene.gameAction + " / " + this.ui.insAction+ " / " + this.ui.labelOffset.alpha1;
            document.getElementById("feedback").innerHTML = this.mobile;
            // if(this.input.ongoingTouches.length>0){
            //     document.getElementById("feedback").innerHTML =  this.touch.x - this.mouseDown.x;
            // }
            // console.log( this.touch.x )
            // document.getElementById("feedback").innerHTML = this.scene.playerNum;
            // document.getElementById("feedback").innerHTML = this.scene.playerCont.position.z;
            // document.getElementById("feedback").innerHTML = this.scene.uniformColor;
            // document.getElementById("feedback").innerHTML = this.scene.aniAction+" / "+this.scene.ballAction;
            // document.getElementById("feedback").innerHTML = this.scene.playerNum;
            // document.getElementById("feedback").innerHTML = this.u.ca2( this.camContX.rotation.x ) + " / "+this.camContY.position.y;
        }

        if(this.action==="set up"){

            //---3D SET UP----------------------------------------------------------------------------------------------------------------

            //---scene parts--------------------------------------------------------------------------------------------------------------

            this.camDistance=960;

            this.scene3D = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,.1, this.camDistance);
            // this.scene3D.background = new THREE.Color( 0x000000 );
            // this.scene3D.fog = new THREE.Fog(0x000000, 0, 151);
            this.scene3D.fog = new THREE.Fog(0x000000, 0, 330*2.9);

            this.mainCont = new THREE.Group();
            this.scene3D.add(this.mainCont);

            //---carmera rig--------------------------------------------------------------------------------------------------------------

            this.camContX = new THREE.Group();
            this.camContY = new THREE.Group();
            this.scene3D.add(this.camContX);
            this.scene3D.add(this.camContY);

            this.camContY.add(this.camContX)
            this.camContX.add(this.camera);

            // this.camera.position.z = 185;
            // this.camera.position.y = 0;

            // this.camContY.position.y=5;

            // this.camContX.rotation.x = this.u.ca(-45)
            // this.camContY.rotation.y = this.u.ca(45)

            //-----------------------

            // this.camera.position.z = 12;
            this.camera.position.y = 0;

            // this.camera.position.z = 145;

            // this.camContY.position.y=2;
            // if(this.mobile===true){
                this.camera.position.z = 17;
                this.camContY.position.y = 3.75;
            // }else{
                // this.camera.position.z = 12;
                // this.camContY.position.y = 2;
            // }

            this.setCamPosition=false;

            this.camContY.rotation.y = this.u.ca(180)
            // this.camContX.rotation.x = this.u.ca(-8)
            this.camContX.rotation.x = this.u.ca(0)

            //---webgl--------------------------------------------------------------------------------------------------------------

            if(this.mobile===true){
                this.renderer = new THREE.WebGLRenderer({antialias:true, powerPreference: "high-performance", alpha: true})
            }else{
                this.renderer = new THREE.WebGLRenderer({antialias:true, powerPreference: "high-performance", alpha: true})
            }

            this.renderer.setSize(window.innerWidth,window.innerHeight);

            this.renderer.setPixelRatio(window.devicePixelRatio);

            // this.renderer.autoClear = false;
            // renderer.setClearColor(0x000000, 0.0);
        
            // this.renderer.setClearColor( 0xff0000, 1 );

            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMapSoft = true;

            this.renderer.shadowCameraNear = 3;
            this.renderer.shadowCameraFar = this.camera.far;
            this.renderer.shadowCameraFov = 50;

            this.renderer.shadowMapBias = 0.0039;
            this.renderer.shadowMapDarkness = 0.5;
            this.renderer.shadowMapWidth = 4096;
            this.renderer.shadowMapHeight = 4096;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

            this.renderer.domElement.style.position="absolute"
            this.renderer.domElement.style.zIndex="2";

            //---end--------------------------------------------------------------------------------------------------------------

            this.action="load images";

        }else if(this.action==="load images"){

            // load 2d images

            this.ui.load();

            this.action="wait for images";

        }else if(this.action==="wait for images"){

            // wait for 2d images

            if(this.ui.isLoaded_UI===true){
                this.action="load 3d";
            }

        }else if(this.action==="load 3d"){

            // load 3d assets

            this.loader.load();
            this.action="loading 3d";

        }else if(this.action==="loading 3d"){

            // wait for 3d assets

            if(this.cone!==undefined && this.cone_load===undefined){
                console.log("LOADED_cone")
                this.cone_load=true;
            }

            if(this.dummy!==undefined && this.dummy_load===undefined){
                console.log("LOADED_dummy")
                this.dummy_load=true;
            }

            if(this.field!==undefined && this.field_load===undefined){
                console.log("LOADED_field")
                this.field_load=true;
            }

            if(this.goal!==undefined && this.goal_load===undefined){
                console.log("LOADED_goal")
                this.goal_load=true;
            }

            if(this.hurdle!==undefined && this.hurdle_load===undefined){
                console.log("LOADED_hurdle")
                this.hurdle_load=true;
            }

            if(this.player1!==undefined && this.player1_load===undefined){
                console.log("LOADED_player1")
                this.player1_load=true;
            }

            if(this.player2!==undefined && this.player2_load===undefined || this.loader.loadPlayer2===false){
                console.log("LOADED_player1")
                this.player2_load=true;
            }

            if(this.player3!==undefined && this.player3_load===undefined || this.loader.loadPlayer3===false){
                console.log("LOADED_player1")
                this.player3_load=true;
            }

            if(this.loader.loadPlayer1===false){
                console.log("SKIPPED_player1")
                this.player1_load=true;
                this.player1 = new Object();
            }

            if(this.loader.loadPlayer2===false){
                console.log("SKIPPED_player2")
                this.player2_load=true;
                this.player2 = new Object();
            }

            if(this.loader.loadPlayer3===false){
                console.log("SKIPPED_player3")
                this.player3_load=true;
                this.player3 = new Object();
            }

            if(this.ring!==undefined && this.ring_load===undefined){
                console.log("LOADED_ring")
                this.ring_load=true;
            }

            if(this.soccerBall!==undefined && this.soccerBall_load===undefined){
                console.log("LOADED_soccerBall")
                this.soccerBall_load=true;
            }

            if(this.stadium!==undefined && this.stadium_load===undefined){
                console.log("LOADED_stadium")
                this.stadium_load=true;
            }

            if(this.warning!==undefined && this.warning_load===undefined){
                console.log("LOADED_warning")
                this.warning_load=true;
            }

            if(this.sprinkler!==undefined && this.sprinkler_load===undefined){
                console.log("LOADED_sprinkler")
                this.sprinkler_load=true;
            }

            if(this.loader.isLoaded_3DTEXTURES===true && this.loader.isLoaded_3D===true && this.loader.isLoaded_CUBE===true){
                this.action="wait before build";
            }

            if(this.stadium!==undefined&&
                this.cone!==undefined&&
                this.dummy!==undefined&&
                this.field!==undefined&&
                this.goal!==undefined&&
                this.hurdle!==undefined&&
                this.player1!==undefined&&
                this.player2!==undefined&&
                this.player3!==undefined&&
                this.ring!==undefined&&
                this.soccerBall!==undefined&&
                this.stadium!==undefined&&
                this.sprinkler!==undefined&&
                this.warning!==undefined
                ){
                this.loader.isLoaded_3D=true
                console.log("---------------------------LOADER COMPLETE---------------------------")
            }

        }else if(this.action==="wait before build"){

            // console.log("wait beore build");

            // wait before build

            this.count+=this.dt;
            if(this.count>.1){
                this.count=0;
                this.action="build"
            }

        }else if(this.action==="build"){

            // console.log(">>> start build");

            // build everything here

            // add 3d dom element to page

            document.body.appendChild(this.renderer.domElement);
            // this.renderer.domElement.style.zIndex=10;
            this.renderer.domElement.style.pointerEvents="none";

            // call builds

            this.scene.buildScene();
            this.ui.setUp2();

            // add resizer

            window.addEventListener("resize", () => {
                this.resize3D();
            })

            // end

            this.loadBack=1;
            this.loadWords=1;

            this.count=0;
            this.action="wait";

            // console.log(">>> end build");

        }else if(this.action==="wait"){

            // console.log(">>> fading load words");

            // fade out loading graphic

            this.loadWords-=this.dt;
            document.getElementById("loadingImage").style.opacity = this.loadWords+""
            document.getElementById("loadingImage2").style.opacity = this.loadWords+""

            // loop

            this.ui.update();
            this.scene.update();

            // end

            this.count+=this.dt;
            if(this.count>1){

                // console.log(">>> go to go");

                this.count=0;
                this.action="go"
            }

        }else if(this.action==="go"){

            // this.count+=this.dt;
            // if(this.count>5){

            //     if(this.camDistance<940){

            //         this.camDistance+=this.dt*100;
            //         this.camera.far = this.camDistance;
            //         this.camera.updateProjectionMatrix();

            //         console.log(this.camDistance)

            //     }

            // }

            if(this.actionGoStart===undefined){
                this.actionGoStart=""
                // console.log("actionGoStart")
            }

            if(this.setCamPosition===true){
                
                if(this.mobile===true){
                    this.camera.position.z = 17;
                    this.camContY.position.y = 3;
                }else{
                    this.camera.position.z = 12;
                    this.camContY.position.y = 2;
                }
    
            }

            // fade out loading cover

            // this.camContY.rotation.y+=this.dt*.3;


            this.loadBack-=this.dt*.5;
            if(this.loadBack.opacity<0){
                this.loadBack.opacity=0;
            }
            document.getElementById("loadingBack").style.opacity = this.loadBack+""

            // loops

            if(this.fr1===undefined){
                this.fr1=""
            }

            this.scene.update();
            
            if(this.fr2===undefined){
                this.fr2=""
            }

            this.ui.update();

            if(this.fr3===undefined){
                this.fr3=""
            }

            this.render();
            
            if(this.fr4===undefined){
                this.fr4=""
            }


        }

    }

    render(){
        
        //---renderer--------------------------------------------------------------------------------------------------------------

        this.renderer.render(this.scene3D, this.camera);

    }

    resize3D(){

        console.log("resize")
    
        var width = window.innerWidth;
        var height = window.innerHeight;

        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
    
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    
        this.renderer.setSize( width, height );
    
    }

}