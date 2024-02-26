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

        // console.log("cs "+this.e.scene.sLights.length)

        for(var i=0; i<this.e.scene.sLights.length; i++){

        //   console.log("s_light")

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

		//--------------------------------------------------------------------------------------------------------------

		this.buttonSize = 70;
        
		this.buttonSize1 = this.buttonSize;
		this.buttonSize2 = this.buttonSize;
		this.buttonSize3 = this.buttonSize;

        this.foodDiv1 = document.getElementById("foodDiv1");
        this.foodDiv2 = document.getElementById("foodDiv2");
        this.foodDiv3 = document.getElementById("foodDiv3");
        
        this.foodButton1 = document.getElementById("foodButton1");
        this.foodButton2 = document.getElementById("foodButton2");
        this.foodButton3 = document.getElementById("foodButton3");

        this.ringDiv = document.getElementById("ringDiv");
        this.ringImage = document.getElementById("ringImage");

        this.offOpacity = .5;

        this.foodSizer1 = new Object();
        this.foodSizer1.scale = 0;
        this.foodSizer1.xOffset = 0;
        this.foodSizer1.opacity = this.offOpacity;
        
        this.foodSizer2 = new Object();
        this.foodSizer2.scale = 0;
        this.foodSizer2.xOffset = 0;
        this.foodSizer2.opacity = this.offOpacity;
        
        this.foodSizer3 = new Object();
        this.foodSizer3.scale = 0;
        this.foodSizer3.xOffset = 0;
        this.foodSizer3.opacity = this.offOpacity;

        this.ringSizer = new Object();
        this.ringSizer.scale = 80;
        this.ringSizer.opacity = 0;
        this.ringSizerMax = 600;

        this.highlightTime = .5;
        this.highlightTime2 = .15;

        this.highlightBig = 25;
        this.highlightBiggest = 100;
        this.highlightSmall = -20;

        this.highlightNum = 1;
        this.highlightSize = 80;
        this.ringTime = .25;
        
    }

    highlight1(){

        gsap.killTweensOf(this.foodSizer1);
        gsap.killTweensOf(this.foodSizer2);
        gsap.killTweensOf(this.foodSizer3);

        gsap.to(this.foodSizer1, { opacity: 1, duration: .15, ease: "sine.out"});
        gsap.to(this.foodSizer2, { opacity: this.offOpacity, duration: .15, ease: "sine.out"});
        gsap.to(this.foodSizer3, { opacity: this.offOpacity, duration: .15, ease: "sine.out"});

        gsap.to(this.foodSizer1, { scale: this.highlightBiggest, duration: .15, ease: "sine.out"});
        gsap.to(this.foodSizer1, { scale: this.highlightBig, duration: .35, delay: .15, ease: "elastic.out"});

        gsap.to(this.foodSizer2, { scale: this.highlightSmall, duration: this.highlightTime, ease: "expo.out"});

        gsap.to(this.foodSizer3, { scale: this.highlightSmall, duration: this.highlightTime, ease: "expo.out"});

        gsap.to(this.foodSizer2, { xOffset: 8, duration: this.highlightTime, ease: "expo.out"});

        //

        this.highlightNum = 1;

        gsap.killTweensOf(this.ringSizer);
        this.ringSizer.scale = 60;
        this.ringSizer.opacity = 1;
        gsap.to(this.ringSizer, { scale: this.ringSizerMax, opacity: 0, duration: this.ringTime, ease: "linear"});

    }

    highlight2(){

        console.log("h2")

        gsap.killTweensOf(this.foodSizer1);
        gsap.killTweensOf(this.foodSizer2);
        gsap.killTweensOf(this.foodSizer3);

        gsap.to(this.foodSizer1, { opacity: this.offOpacity, duration: .15, ease: "sine.out"});
        gsap.to(this.foodSizer2, { opacity: 1, duration: .15, ease: "sine.out"});
        gsap.to(this.foodSizer3, { opacity: this.offOpacity, duration: .15, ease: "sine.out"});

        gsap.to(this.foodSizer1, { scale: this.highlightSmall, duration: this.highlightTime, ease: "expo.out"});

        gsap.to(this.foodSizer2, { scale: this.highlightBiggest, duration: .15, ease: "sine.out"});
        gsap.to(this.foodSizer2, { scale: this.highlightBig, duration: .35, delay: .15, ease: "elastic.out"});

        gsap.to(this.foodSizer3, { scale: this.highlightSmall, duration: this.highlightTime, ease: "expo.out"});

        gsap.to(this.foodSizer1, { xOffset: -8, duration: this.highlightTime, ease: "expo.out"});
        gsap.to(this.foodSizer3, { xOffset: 8, duration: this.highlightTime, ease: "expo.out"});

        //

        this.highlightNum = 2;

        gsap.killTweensOf(this.ringSizer);
        this.ringSizer.scale = 60;
        this.ringSizer.opacity = 1;
        gsap.to(this.ringSizer, { scale: this.ringSizerMax, opacity: 0, duration: this.ringTime, ease: "linear"});

    }

    highlight3(){

        gsap.killTweensOf(this.foodSizer1);
        gsap.killTweensOf(this.foodSizer2);
        gsap.killTweensOf(this.foodSizer3);

        gsap.to(this.foodSizer1, { opacity: this.offOpacity, duration: .15, ease: "sine.out"});
        gsap.to(this.foodSizer2, { opacity: this.offOpacity, duration: .15, ease: "sine.out"});
        gsap.to(this.foodSizer3, { opacity: 1, duration: .15, ease: "sine.out"});

        gsap.to(this.foodSizer1, { scale: this.highlightSmall, duration: this.highlightTime, ease: "expo.out"});

        gsap.to(this.foodSizer2, { scale: this.highlightSmall, duration: this.highlightTime, ease: "expo.out"});

        gsap.to(this.foodSizer3, { scale: this.highlightBiggest, duration: .15, ease: "sine.out"});
        gsap.to(this.foodSizer3, { scale: this.highlightBig, duration: .35, delay: .15, ease: "elastic.out"});

        gsap.to(this.foodSizer2, { xOffset: -8, duration: this.highlightTime, ease: "expo.out"});

        //

        this.highlightNum = 3;

        gsap.killTweensOf(this.ringSizer);
        this.ringSizer.scale = 60;
        this.ringSizer.opacity = 1;
        gsap.to(this.ringSizer, { scale: this.ringSizerMax, opacity: 0, duration: this.ringTime, ease: "linear"});
        
    }

    highlightReset(){

        this.resetTime = .2;

        gsap.killTweensOf(this.foodSizer1);
        gsap.killTweensOf(this.foodSizer2);
        gsap.killTweensOf(this.foodSizer3);

        gsap.to(this.foodSizer1, { scale: 1, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer2, { scale: 1, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer3, { scale: 1, duration: this.resetTime, ease: "sine.out"});

        gsap.to(this.foodSizer1, { xOffset: 0, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer2, { xOffset: 0, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer3, { xOffset: 0, duration: this.resetTime, ease: "sine.out"});

        gsap.to(this.foodSizer1, { opacity: this.offOpacity, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer2, { opacity: this.offOpacity, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer3, { opacity: this.offOpacity, duration: this.resetTime, ease: "sine.out"});

    }

    update(){

        // console.log(this.buttonSize1);

        this.buttonSize1 = this.buttonSize + this.foodSizer1.scale;
        this.buttonSize2 = this.buttonSize + this.foodSizer2.scale;
        this.buttonSize3 = this.buttonSize + this.foodSizer3.scale;

        this.foodDiv1.style.opacity = this.foodSizer1.opacity+"";
        this.foodDiv2.style.opacity = this.foodSizer2.opacity+"";
        this.foodDiv3.style.opacity = this.foodSizer3.opacity+"";

        this.foodDiv1.style.width = (this.buttonSize1) + "px";
        this.foodDiv2.style.width = (this.buttonSize2) + "px";
        this.foodDiv3.style.width = (this.buttonSize3) + "px";

        this.foodDiv1.style.height = (this.buttonSize1) + "px";
        this.foodDiv2.style.height = (this.buttonSize2) + "px";
        this.foodDiv3.style.height = (this.buttonSize3) + "px";

        this.foodButton1.style.width = (this.buttonSize1) + "px";
        this.foodButton2.style.width = (this.buttonSize2) + "px";
        this.foodButton3.style.width = (this.buttonSize3) + "px";

        this.foodButton1.style.height = (this.buttonSize1) + "px";
        this.foodButton2.style.height = (this.buttonSize2) + "px";
        this.foodButton3.style.height = (this.buttonSize3) + "px";

		//--------------------------------------------------------------------------------------------------------------

        this.foodDiv1.style.left = ((window.innerWidth/2) - (this.buttonSize1/2) + (this.foodSizer1.xOffset) - 120)+"px";
        this.foodDiv2.style.left = ((window.innerWidth/2) - (this.buttonSize2/2) + (this.foodSizer2.xOffset) )+"px";
        this.foodDiv3.style.left = ((window.innerWidth/2) - (this.buttonSize3/2) + (this.foodSizer3.xOffset) + 120)+"px";

        this.bottomOffset = 65;

        this.foodDiv1.style.top = window.innerHeight - (this.buttonSize1/2) - this.bottomOffset + "px";
        this.foodDiv2.style.top = window.innerHeight - (this.buttonSize2/2) - this.bottomOffset + "px";
        this.foodDiv3.style.top = window.innerHeight - (this.buttonSize3/2) - this.bottomOffset + "px";

		//--------------------------------------------------------------------------------------------------------------

        // console.log(this.ringSizer.scale)

        this.ringImage.style.width = (this.ringSizer.scale) + "px";
        this.ringImage.style.height = (this.ringSizer.scale) + "px";

        if(this.highlightNum===1){

            this.ringDiv.style.left = (window.innerWidth/2) - (this.ringSizer.scale/2) - 120 + "px";

        }else if(this.highlightNum===2){

            this.ringDiv.style.left = (window.innerWidth/2) - (this.ringSizer.scale/2) + 0 + "px";

        }else if(this.highlightNum===3){

            this.ringDiv.style.left = (window.innerWidth/2) - (this.ringSizer.scale/2) + 120 + "px";

        }

        this.ringDiv.style.top = window.innerHeight - (this.ringSizer.scale/2) - this.bottomOffset + "px";
        this.ringDiv.style.opacity = this.ringSizer.opacity;

		//--------------------------------------------------------------------------------------------------------------

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