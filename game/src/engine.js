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
        this.touch = new Object;
        this.touch.x=0;
        this.touch.y=0;
         
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
        
    }

    start(){

    }

    update(){

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
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

        // mouse and touch

        if(this.mobile===true){

            if(this.input.ongoingTouches.length>0){
                this.touch.x = this.input.ongoingTouches[0].clientX
                this.touch.y = this.input.ongoingTouches[0].clientY
            }else{
                this.touch.x = 0
                this.touch.y = 0
            }

            this.mouse.x=this.touch.x;
            this.mouse.y=this.touch.y;
        }

        // feedback

        // if(this.ui.tester!==null && this.ui.tester!==undefined){
        //     this.ui.tester.position.x=this.mouse.x;
        //     this.ui.tester.position.y=this.mouse.y;
        // }

        if(this.scene.playerCont!==undefined){
            // document.getElementById("feedback").innerHTML = this.scene.playerAction + " / " + this.scene.gameAction + " / " + this.scene.playerCont.position.x;
            // document.getElementById("feedback").innerHTML = this.mouseDown.x + " / " + this.mouseDown.y;
            // document.getElementById("feedback").innerHTML = this.scene.playerAction;
            // document.getElementById("feedback").innerHTML = this.scene.playerCont.position.z;
            document.getElementById("feedback").innerHTML = this.scene.uniformColor;
            // document.getElementById("feedback").innerHTML = this.scene.hasPushedButton1;
        }

        if(this.action==="set up"){

            //---3D SET UP----------------------------------------------------------------------------------------------------------------

            //---scene parts--------------------------------------------------------------------------------------------------------------

            this.scene3D = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,.1, 940);
            // this.scene3D.background = new THREE.Color( 0x000000 );
            // this.scene3D.fog = new THREE.Fog(0x000000, 0, 151);
            this.scene3D.fog = new THREE.Fog(0x000000, 0, 330*1.6);

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

            this.camera.position.z = 12;
            this.camera.position.y = 0;

            this.camContY.position.y=2;

            this.camContY.rotation.y = this.u.ca(180)
            this.camContX.rotation.x = this.u.ca(-8)

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

            // console.log(this.stadium+" / "+this.ring+" / "+this.soccerBall+" / "+this.goal+" / "+this.cone+" / "+this.waterLine+" / "+this.readyplayerme)
            // console.log(this.loader.isLoaded_3DTEXTURES+" / "+this.loader.isLoaded_3D+" / "+this.loader.isLoaded_CUBE)

            if(this.stadium!==undefined&&
                this.ring!==undefined&&
                this.soccerBall!==undefined&&
                this.goal!==undefined&&
                this.cone!==undefined&&
                this.cone2!==undefined&&
                this.waterLine!==undefined&&
                this.readyplayerme!==undefined&&
                this.field!==undefined
                ){
                this.loader.isLoaded_3D=true
            }

            if(this.loader.isLoaded_3DTEXTURES===true && this.loader.isLoaded_3D===true && this.loader.isLoaded_CUBE===true){
                this.action="wait before build";
            }

        }else if(this.action==="wait before build"){

            // wait before build

            this.count+=this.dt;
            if(this.count>.1){
                this.count=0;
                this.action="build"
            }

        }else if(this.action==="build"){

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

        }else if(this.action==="wait"){

            // fade out loading graphic

            this.loadWords-=this.dt;
            document.getElementById("loadingImage").style.opacity = this.loadWords+""

            // loop

            this.ui.update();
            this.scene.update();

            // end

            this.count+=this.dt;
            if(this.count>1){
                this.count=0;
                this.action="go"
            }

        }else if(this.action==="go"){

            if(this.mobile===true){
                this.camera.position.z = 17;
                this.camContY.position.y = 3;
            }else{
                this.camera.position.z = 12;
                this.camContY.position.y = 2;
            }

            // fade out loading cover

            // this.camContY.rotation.y+=this.dt*.3;

            this.loadBack-=this.dt;
            if(this.loadBack.opacity<0){
                this.loadBack.opacity=0;
            }
            document.getElementById("loadingBack").style.opacity = this.loadBack+""

            // loops

           
            this.scene.update();
            this.ui.update();
            this.render();

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