import { gsap } from "./greensock/all.js";
import * as THREE from '../../build/three.module.js';

export class UI {

    setUp(e) {

        this.e = e;

        //-----------------

        this.uiCanvas = document.getElementById('mycanvas');

        // this.leftContBoxes = [];

        this.app = new PIXI.Application({
            view: this.uiCanvas,
            width: window.innerWidth, 
            height: window.innerHeight,
            transparent: true,
			resolution: window.devicePixelRatio,
			appDensity: true
        });

        window.addEventListener('resize', (event) => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
        });

        PIXI.settings.RESOLUTION = window.devicePixelRatio;

        this.app.renderer.plugins.interaction.mouseOverRenderer = true;

        this.counter=0;

    }

    load() {

        console.log("LOAD IMAGES")

        this.loader = new PIXI.Loader();
        this.loader.reset();
        
        //----------------------------------------------------

        this.loader.add('white', './src/img/white.png');
        this.loader.add('black', './src/img/black.png');
        this.loader.add('vig', './src/img/vig.png');
        this.loader.add('glint', './src/img/glint.png');
        this.loader.add('gradGlowWhite2', './src/img/gradGlowWhite2.png');
        
        //----------------------------------------------------

        this.loader.load((loader, resources) => {

            console.log("UI LOADED")

            this.isLoaded_UI=true;

            //----------------------------------------------------

            this.white=resources.white.texture;
            this.black=resources.black.texture;
            this.t_vig=resources.vig.texture;
            this.t_glint=resources.glint.texture;
            this.t_gradGlowWhite2=resources.gradGlowWhite2.texture;

        });

    }

    //---------------------------------------------------------------------------------------------------------

    setUp2(){

        console.log("UI SET UP")

        this.mainCont = new PIXI.Container();
        this.mainCont.sortableChildren = true;
        this.app.stage.addChild(this.mainCont);

        this.vig = new PIXI.Sprite(this.t_vig);
        this.vig.anchor.x=0
        this.vig.anchor.y=0
        this.vig._zIndex=80
        this.vig.alpha=.85;
        this.mainCont.addChild(this.vig);

        console.log("cs "+this.e.scene.sLights.length)

        for(var i=0; i<this.e.scene.sLights.length; i++){

          console.log("s_light")

          this.glint = new PIXI.Sprite(this.t_glint);
          this.glint.anchor.x=0.5
          this.glint.anchor.y=0.5
          this.glint._zIndex=60
          this.glintRan = this.e.u.ran(20)+40
          this.glint.width=this.glintRan
          this.glint.height=this.glintRan
          this.glint.alpha=1;
          this.mainCont.addChild(this.glint);

          this.e.scene.sLights[i].glint2d = this.glint;

          this.glint = new PIXI.Sprite(this.t_gradGlowWhite2);
          this.glint.anchor.x=0.5
          this.glint.anchor.y=0.5
          this.glint._zIndex=60
          this.glintRan = (this.e.u.ran(30)+30)*6
          this.glint.width=this.glintRan
          this.glint.height=this.glintRan
          this.glint.alpha=.2;
          this.mainCont.addChild(this.glint);

          this.e.scene.sLights[i].glint2dB = this.glint;

        }

        // this.leLogo = new PIXI.Sprite(this.t_lesserEvil);
        // this.leLogo.width=50;
        // this.leLogo.height=50;
        // this.leLogo.anchor.x = this.leLogo.anchor.y = .5
        // this.tester.alpha=0;
        // this.leLogo._zIndex=100000;
        // this.app.stage.addChild(this.leLogo);
        
    }

    update(){

        this.vig.width = window.innerWidth;
        this.vig.height = window.innerHeight;

        // console.log(this.e.mobile);

        if(this.e.mobile===true){

            this.vig.alpha = 0.3;

        }

        for(var i=0; i<this.e.scene.sLights.length; i++){

            var sp = this.e.u.vectorToScreenPosLight( this.e.scene.sLights[i], this.e.camera )

            this.e.scene.sLights[i].glint2d.position.x = sp.x;
            this.e.scene.sLights[i].glint2d.position.y = sp.y;
            this.e.scene.sLights[i].glint2d.rotation = sp.y/30;

            this.gDist = this.e.u.getDistance( this.e.scene.playerCont.position.x, this.e.scene.playerCont.position.z, this.e.scene.sLights[i].position.x, this.e.scene.sLights[i].position.z)
            // console.log(i+" / "+this.gDist);
            // var percent = this.gDist/252;
            // this.glintSize = 50*percent;

            // this.e.scene.sLights[i].glint2d.width = this.e.scene.sLights[i].glint2d.height = this.glintSize;

            this.e.scene.sLights[i].glint2dB.position.x = sp.x+5;
            this.e.scene.sLights[i].glint2dB.position.y = sp.y;
            this.e.scene.sLights[i].glint2dB.rotation = sp.y/60;

            if(sp.d===false){

                if(this.e.scene.sLights[i].glint2d.alpha>0){
                    this.e.scene.sLights[i].glint2d.alpha-=this.e.dt*1
                    this.e.scene.sLights[i].glint2dB.alpha-=this.e.dt*1
                }
                
            }else{

                this.e.scene.sLights[i].glint2d.alpha=1
                this.e.scene.sLights[i].glint2dB.alpha=.175

            }

        }


    }

}