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

        this.startLabelOffset=0;

        this.buttonTextLowOpacity=.5;

        this.labelOffset = new Object();
        this.labelOffset.num1 = this.startLabelOffset;
        this.labelOffset.num2 = this.startLabelOffset;
        this.labelOffset.num3 = this.startLabelOffset;
        this.labelOffset.alpha1 = 0;
        this.labelOffset.alpha2 = 0;
        this.labelOffset.alpha3 = 0;

        this.faderOb = new Object();
        this.faderOb.opacity=0;

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

            console.log("---------------------------UI LOADED---------------------------")

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
        this.vig.alpha=.65;
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
        
        this.buttonLabel1 = document.getElementById("goldenMove");
        this.buttonLabel2 = document.getElementById("bigShot");
        this.buttonLabel3 = document.getElementById("electricRush");

        this.ringDiv = document.getElementById("ringDiv");
        this.ringImage = document.getElementById("ringImage");
        this.meterDiv = document.getElementById("meterDiv");
        this.meterImage = document.getElementById("meterImage");
        this.meterBar = document.getElementById("meterBar");

        this.resultDiv = document.getElementById("resultDiv");
        this.resultInnerDiv = document.getElementById("resultInnerDiv");
        this.scoreDisplay = document.getElementById("resultInnerDiv");

        this.charSel1 = document.getElementById("charSel1");
        this.charSel2 = document.getElementById("charSel2");
        this.charSel3 = document.getElementById("charSel3");

        this.splash = document.getElementById("splash");
        this.fader = document.getElementById("fader");

        this.offOpacity = 0;

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
        this.ringSizerMax = 800;

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

        if(this.e.scene.gameAction==="run"){
            this.e.s.p("shine")
        }
        
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

        gsap.to(this.labelOffset, { num1: 14, alpha1: 1, duration: this.highlightTime, ease: "expo.out"});
        gsap.to(this.labelOffset, { num2: this.startLabelOffset, alpha2: this.buttonTextLowOpacity, duration: this.highlightTime, ease: "expo.out"});
        gsap.to(this.labelOffset, { num3: this.startLabelOffset, alpha3: this.buttonTextLowOpacity, duration: this.highlightTime, ease: "expo.out"});

        //

        this.highlightNum = 1;

        gsap.killTweensOf(this.ringSizer);
        this.ringSizer.scale = 60;
        this.ringSizer.opacity = 1;
        gsap.to(this.ringSizer, { scale: this.ringSizerMax, opacity: 0, repeat: -1, duration: this.ringTime*2, ease: "sine.out"});

    }

    highlight2(){

        if(this.e.scene.gameAction==="run"){
            this.e.s.p("shine")
        }
        
        // console.log("h2")

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

        // if(this.insAction==="done"){
            
            gsap.to(this.labelOffset, { num2: 14, alpha2: 1, duration: this.highlightTime, ease: "expo.out"});
            gsap.to(this.labelOffset, { num1: this.startLabelOffset, alpha1: this.buttonTextLowOpacity, duration: this.highlightTime, ease: "expo.out"});
            gsap.to(this.labelOffset, { num3: this.startLabelOffset, alpha3: this.buttonTextLowOpacity, duration: this.highlightTime, ease: "expo.out"});

        // }

        //

        this.highlightNum = 2;

        gsap.killTweensOf(this.ringSizer);
        this.ringSizer.scale = 60;
        this.ringSizer.opacity = 1;
        gsap.to(this.ringSizer, { scale: this.ringSizerMax, opacity: 0, repeat: -1, duration: this.ringTime*2, ease: "sine.out"});

    }

    highlight3(){

        if(this.e.scene.gameAction==="run"){
            this.e.s.p("shine")
        }
        
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

        gsap.to(this.labelOffset, { num3: 14, alpha3: 1, duration: this.highlightTime, ease: "expo.out"});
        gsap.to(this.labelOffset, { num1: this.startLabelOffset, alpha1: this.buttonTextLowOpacity, duration: this.highlightTime, ease: "expo.out"});
        gsap.to(this.labelOffset, { num2: this.startLabelOffset, alpha2: this.buttonTextLowOpacity, duration: this.highlightTime, ease: "expo.out"});

        //

        this.highlightNum = 3;

        gsap.killTweensOf(this.ringSizer);
        this.ringSizer.scale = 60;
        this.ringSizer.opacity = 1;
        gsap.to(this.ringSizer, { scale: this.ringSizerMax, opacity: 0, repeat: -1, duration: this.ringTime*2, ease: "sine.out"});
        
    }

    highlightReset(){

        // console.log("HLR")

        this.resetTime = .2;

        gsap.killTweensOf(this.foodSizer1);
        gsap.killTweensOf(this.foodSizer2);
        gsap.killTweensOf(this.foodSizer3);
        gsap.killTweensOf(this.labelOffset);

        gsap.killTweensOf(this.ringSizer);
        gsap.to(this.ringSizer, { opacity: 0, duration: this.ringTime, ease: "linear"});

        gsap.to(this.foodSizer1, { scale: 1, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer2, { scale: 1, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer3, { scale: 1, duration: this.resetTime, ease: "sine.out"});

        gsap.to(this.foodSizer1, { xOffset: 0, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer2, { xOffset: 0, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer3, { xOffset: 0, duration: this.resetTime, ease: "sine.out"});

        gsap.to(this.foodSizer1, { opacity: this.offOpacity, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer2, { opacity: this.offOpacity, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.foodSizer3, { opacity: this.offOpacity, duration: this.resetTime, ease: "sine.out"});

        gsap.to(this.labelOffset, { num1: this.startLabelOffset, alpha1: this.buttonTextLowOpacity, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.labelOffset, { num2: this.startLabelOffset, alpha2: this.buttonTextLowOpacity, duration: this.resetTime, ease: "sine.out"});
        gsap.to(this.labelOffset, { num3: this.startLabelOffset, alpha3: this.buttonTextLowOpacity, duration: this.resetTime, ease: "sine.out"});

    }

    update(){

        this.maxSplashWidth = 520;

        //--------------------

        this.idealLineHeight = window.innerWidth*.042
        this.maxLineHeight = 38

        this.rmSubTitle = document.getElementById("rmSubTitle")
        // this.rmLineHeight = parseInt( window.getComputedStyle(this.rmSubTitle).getPropertyValue('line-height') );

        // console.log(this.rmLineHeight)

        // console.log( this.idealLineHeight )

        // if(this.idealLineHeight>this.maxLineHeight){
        //     this.rmSubTitle.style.lineHeight=this.maxLineHeight+"px";
        // }else{
        //     this.rmSubTitle.style.lineHeight=this.idealLineHeight+"px";
        // }

        //--------------------

        this.fader.style.opacity = this.faderOb.opacity;

        if(this.maxSplashWidth>window.innerWidth){
            this.maxSplashWidth = window.innerWidth;
        }

        this.splash.style.width = this.maxSplashWidth+"px"
        this.splash.style.height = this.maxSplashWidth+"px"

        // SIZE BUTTONS

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

        this.ridWidth = 800;

        // console.log(this.e.mobile)

        if(this.e.mobile===true){
            this.ridWidth = window.innerWidth;
        }

        if(window.innerWidth<this.ridWidth){
            this.ridWidth=window.innerWidth
        }

        document.getElementById("resPlayer1").style.right = ((window.innerWidth/2) - (this.ridWidth/2)) + "px"
        document.getElementById("resPlayer2").style.right = ((window.innerWidth/2) - (this.ridWidth/2)) + "px"
        document.getElementById("resPlayer3").style.right = ((window.innerWidth/2) - (this.ridWidth/2)) + "px"

        this.resultInnerDiv.style.left = ((window.innerWidth/2) - (this.ridWidth/2))+"px";

        // this.resultInnerDiv.style.left = "100px";
        this.resultInnerDiv.style.width = this.ridWidth+"px";

        // this.botPoint = document.getElementById("rmTitle").clientHeight;

        // console.log(this.botPoint)

        // this.scoreDisplay.style.top = (this.botPoint)+"px";

        // console.log(document.getElementById("rmTitle").clientHeight);


        // console.log(document.getElementById("resultMenu").clientHeight);

        this.extraTop = Math.round(window.innerHeight*.02)

        // document.getElementById("resultMenuLower").style.top = (document.getElementById("resultMenu").clientHeight + this.extraTop) + "px";
        // document.getElementById("resultMenuLower").style.top = (document.getElementById("resultMenu").clientHeight + this.extraTop) + "px";

		//--------------------------------------------------------------------------------------------------------------

        if(this.meterAction===undefined){

            this.meterAction="wait"
            this.curBarTime = 10;

        }else if(this.meterAction==="show"){

            this.meterDiv.style.display="inline";

            this.meterAction="down";

        }else if(this.meterAction==="down"){

            this.curBarTime-=this.e.dt;

            if(this.curBarTime<=0){

                this.curBarTime=0;

                if(this.e.scene.gameAction==="shoot"){

                    this.e.scene.gameAction="force shoot"

                }

            }

        }

        //----
  
        this.meterHeight = 225;

        this.meterDiv.style.right = "0px";
        this.meterDiv.style.height = this.meterHeight+"px";
        this.meterDiv.style.top = (window.innerHeight/2) - (this.meterHeight/2) - (40) + "px";

        this.meterImage.style.height = this.meterHeight+"px";

        if(this.meterBarHeight===undefined){
            this.meterBarTotalHeight = 180;
            this.barTimeTotal = 10;
        }

        this.meterBarHeight = Math.round( (this.curBarTime/this.barTimeTotal) * this.meterBarTotalHeight );
        
        this.meterBar.style.right = "44px";
        this.meterBar.style.height = this.meterBarHeight+"px";
        this.meterBar.style.width = 12+"px";
        this.meterBar.style.top = (180 - this.meterBarHeight) + (31) + "px";
        this.meterBar.style.opacity = ".8";

		//--------------------------------------------------------------------------------------------------------------

        // PLACE BUTTONS

        this.foodDiv1.style.left = ((window.innerWidth/2) - (this.buttonSize1/2) + (this.foodSizer1.xOffset) - 120)+"px";
        this.foodDiv2.style.left = ((window.innerWidth/2) - (this.buttonSize2/2) + (this.foodSizer2.xOffset) )+"px";
        this.foodDiv3.style.left = ((window.innerWidth/2) - (this.buttonSize3/2) + (this.foodSizer3.xOffset) + 120)+"px";

        this.bottomOffset = 65;

        this.foodDiv1.style.top = window.innerHeight - (this.buttonSize1/2) - this.bottomOffset + "px";
        this.foodDiv2.style.top = window.innerHeight - (this.buttonSize2/2) - this.bottomOffset + "px";
        this.foodDiv3.style.top = window.innerHeight - (this.buttonSize3/2) - this.bottomOffset + "px";

		//--------------------------------------------------------------------------------------------------------------

        // TEXT LABELS

        this.buttonLabel1.style.left = ((window.innerWidth/2) - (100) + (this.foodSizer1.xOffset) - 120)+"px";
        this.buttonLabel2.style.left = ((window.innerWidth/2) - (100) + (this.foodSizer2.xOffset) )+"px";
        this.buttonLabel3.style.left = ((window.innerWidth/2) - (100) + (this.foodSizer3.xOffset) + 120)+"px";

        this.bottomLabelOffset = 125;

        this.buttonLabel1.style.top = window.innerHeight - this.bottomLabelOffset - this.labelOffset.num1 + "px";
        this.buttonLabel2.style.top = window.innerHeight - this.bottomLabelOffset - this.labelOffset.num2 + "px";
        this.buttonLabel3.style.top = window.innerHeight - this.bottomLabelOffset - this.labelOffset.num3 + "px";

        this.buttonLabel1.style.opacity = this.labelOffset.alpha1+"";
        this.buttonLabel2.style.opacity = this.labelOffset.alpha2+"";
        this.buttonLabel3.style.opacity = this.labelOffset.alpha3+"";

		//--------------------------------------------------------------------------------------------------------------

        // CIRCLE RING

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

        // this.selButWidth = this.charSel1.clientWidth/2;

        // if(this.selButWidth>100){
        //     this.selButWidth=100
        // }
        // // this.selButWidth = 0;
        // console.log(this.selButWidth)

        // this.charSel1.style.left = ((window.innerWidth/2) - (this.selButWidth*2.5)) + "px";
        // this.charSel2.style.left = ((window.innerWidth/2) + (this.selButWidth*.5)) + "px";

        // this.charSel1.style.top = ((window.innerHeight/3)*.5)+ "px";
        // this.charSel2.style.top = ((window.innerHeight/3)*.5) + "px";

        // this.topDown = ((window.innerHeight/3)*.5) + (this.selButWidth*2);

        // this.charSel3.style.left = ((window.innerWidth*.5) - this.selButWidth) + "px";
        // this.charSel3.style.top = this.topDown + "px";

		//--------------------------------------------------------------------------------------------------------------

        this.vig.width = window.innerWidth;
        this.vig.height = window.innerHeight;

        // console.log(this.e.mobile);

        if(this.e.mobile===true){

            this.vig.alpha = 0.3;

        }

        if(this.waitLightCount===undefined){
            this.waitLightCount=0;
        }

        // this.waitLightCount+=this.e.dt;

        // if(this.waitLightCount>5){

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
            
        // }
		//--------------------------------------------------------------------------------------------------------------

        if(this.insAction===undefined){

            this.splash = document.getElementById("splash");
            this.splashBlack = document.getElementById("splashBlack");

            this.charContainer = document.getElementById("charContainer");

            this.instructions1b = document.getElementById("instructions1b");
            this.rightInstructions = document.getElementById("rightInstructions");
            this.leftInstructions = document.getElementById("leftInstructions");
            this.rightBlack = document.getElementById("rightBlack");
            this.leftBlack = document.getElementById("leftBlack");

            this.instructions2 = document.getElementById("instructions2");
            this.buttonInstructions = document.getElementById("buttonInstructions");
            this.bottomGrad = document.getElementById("bottomGrad");

            this.insOb = new Object();
            this.insOb.splashAlpha = 1;
            this.insOb.charAlpha = 0;
            this.insOb.insAlpha1 = 0;
            this.insOb.insAlpha2 = 0;
            this.insOb.blackAlpha = 0;

            this.labelOffset.alpha1=0;
            this.labelOffset.alpha2=0;
            this.labelOffset.alpha3=0;

            this.insOb2 = new Object();
            this.insOb2.rightBlackOpacity = .4
            this.insOb2.leftBlackOpacity = .4
            this.insOb2.rightInstructionsOpacity = 1
            this.insOb2.leftInstructionsOpacity = 1

            this.sideTime = 1.5

            gsap.to(this.insOb2, { rightBlackOpacity: 0, duration: this.sideTime, yoyo: true, repeat: -1, ease: "sine.out"});
            gsap.to(this.insOb2, { leftBlackOpacity: 0, duration: this.sideTime, delay: this.sideTime, yoyo: true, repeat: -1, ease: "sine.out"});

            gsap.to(this.insOb2, { leftInstructionsOpacity: 0.5, duration: this.sideTime, yoyo: true, repeat: -1, ease: "sine.out"});
            gsap.to(this.insOb2, { rightInstructionsOpacity: 0.5, duration: this.sideTime, delay: this.sideTime, yoyo: true, repeat: -1, ease: "sine.out"});

            this.insCount=0
            this.insAction="splash"

            //

            document.addEventListener("click", evt => {

                if(this.e.mobile===false){

                    // console.log(evt.clientX)
                    // console.log(evt.clientY)
                   
                    if(evt.clientX<50 && evt.clientY< 50){
                        //
                    }else{
                        this.nextIns();
                    }

                }
                
            });

            document.addEventListener("touchstart", evt => {

                console.log("t1 "+this.e.mobile)

                if(this.e.mobile===true){
                    
                    if(evt.touches[0].clientX<50 && evt.touches[0].clientY< 50){
                        //
                    }else{
                        this.nextIns();
                    }

                }
                
            });

        }else if(this.insAction==="splash wait"){

            this.insCount+=this.e.dt;
            if(this.insCount>1){
                this.insCount=0;
                this.insAction="splash"
            }

        }else if(this.insAction==="splash"){

            // wait

            this.splash.style.opacity = 1;
            this.instructions2.style.opacity = 0;

            this.transSpeed = .35;
    
            //--------------------------------------------------------------------------------------------------------------------------------

        }else if(this.insAction==="fade splash2"){

            gsap.killTweensOf(this.insOb);

            gsap.to(this.insOb, { splashAlpha: 0, duration: 0, ease: "sine.out"});
            gsap.to(this.insOb, { blackAlpha: 1, duration: 0, ease: "sine.out"});

        }else if(this.insAction==="fade splash"){

            this.e.scene.gameAction="fade splash"

            gsap.killTweensOf(this.insOb);

			// gsap.to(this.e.camContX.rotation, { x: this.e.u.ca(-8), duration: this.transSpeed*6, ease: "expo.out"});

            // gsap.to(this.insOb, { blackAlpha: .5, duration: this.transSpeed*2, ease: "expo.out"});

            gsap.to(this.insOb, { splashAlpha: 0, duration: this.transSpeed*2, ease: "expo.out"});

            if(this.e.skipCharSelect===true){

                gsap.to(this.insOb, { insAlpha1: 1, duration: this.transSpeed, ease: "sine.out"});
                this.insAction="ins1 wait"
                // this.insAction="char"
                this.insOb.splashAlpha = 0;
                this.e.scene.gameAction="char set"

                document.getElementById("charContainer").style.pointerEvents="none"

                this.setCamPosition=true

                this.fader.style.opacity = 1;
                this.faderOb.opacity = 1;
                gsap.to(this.faderOb, { opacity: 0, duration: 1, ease: "linear"});

            }else{
                    
                this.e.ui.faderOb.opacity = 1
                gsap.to(this.e.ui.faderOb, { opacity: 0, duration: .5, ease: "linear"});

                gsap.to(this.insOb, { charAlpha: 1, duration: this.transSpeed*2, ease: "expo.out"});
                this.insAction="char"
            }
            

            // gsap.to(this.e.camContY.position, { y: 3, duration: this.transSpeed*2, ease: "expo.out"});

            this.labelOffset.alpha1=0;
            this.labelOffset.alpha2=0;
            this.labelOffset.alpha3=0;

            

            //--------------------------------------------------------------------------------------------------------------------------------

        }else if(this.insAction==="char"){

            this.setCamPosition=true

            this.labelOffset.alpha1=0;
            this.labelOffset.alpha2=0;
            this.labelOffset.alpha3=0;

            // wait

        }else if(this.insAction==="fade char"){

            gsap.killTweensOf(this.insOb);

            gsap.to(this.insOb, { blackAlpha: 0, duration: this.transSpeed, ease: "sine.out"});
            gsap.to(this.insOb, { charAlpha: 0, duration: this.transSpeed, ease: "sine.out"});
            gsap.to(this.insOb, { insAlpha1: 1, duration: this.transSpeed, ease: "sine.out"});
 
            this.labelOffset.alpha1=0;
            this.labelOffset.alpha2=0;
            this.labelOffset.alpha3=0;

            // this.e.scene.playerBody.position.y=0;
            // this.e.scene.ball.position.y=0;

            this.insCount=0;
            this.insAction="ins1 wait"

            //--------------------------------------------------------------------------------------------------------------------------------

        }else if(this.insAction==="ins1 wait"){

            this.insCount+=this.e.dt;
            if(this.insCount>1){

                this.insCount=0;
                this.insAction="ins1"

            }

        }else if(this.insAction==="ins1"){

            this.labelOffset.alpha1=0;
            this.labelOffset.alpha2=0;
            this.labelOffset.alpha3=0;

            // wait

        }else if(this.insAction==="fade ins1"){

            gsap.killTweensOf(this.insOb);

            gsap.to(this.insOb, { splashAlpha: 0, duration: this.transSpeed, ease: "sine.out"});
            gsap.to(this.insOb, { insAlpha1: 0, duration: this.transSpeed, ease: "sine.out"});
            gsap.to(this.insOb, { insAlpha2: 1, duration: this.transSpeed, ease: "sine.out"});

            this.insOb.charAlpha = 0;

            this.offOpacity = .5;

            this.highlight2();

            this.insAction="ins2"

            //--------------------------------------------------------------------------------------------------------------------------------

        }else if(this.insAction==="ins2"){

            // wait

        }else if(this.insAction==="fade ins2"){

            gsap.killTweensOf(this.insOb);

            gsap.to(this.insOb, { splashAlpha: 0, duration: this.transSpeed, ease: "sine.out"});
            gsap.to(this.insOb, { insAlpha1: 0, duration: this.transSpeed, ease: "sine.out"});
            gsap.to(this.insOb, { insAlpha2: 0, duration: this.transSpeed, ease: "sine.out"});

            this.highlightReset();

            this.insAction="start game"

        }else if(this.insAction==="start game"){

            this.insOb.blackAlpha = 0;

            this.e.scene.gameAction="game start"
            this.insAction="done"

        }else if(this.insAction==="done"){



        }

        // set instruction parts every frame

        this.rightBlack.style.opacity = this.insOb2.rightBlackOpacity;
        this.leftBlack.style.opacity = this.insOb2.leftBlackOpacity;

        this.rightInstructions.style.opacity = this.insOb2.rightInstructionsOpacity;
        this.leftInstructions.style.opacity = this.insOb2.leftInstructionsOpacity;

        this.rightInstructions.style.right = ((window.innerWidth/4) - (this.rightInstructions.clientWidth/2))+"px"
        this.leftInstructions.style.left = ((window.innerWidth/4) - (this.rightInstructions.clientWidth/2))+"px"

        this.splash.style.opacity = this.insOb.splashAlpha;
        this.splashBlack.style.opacity = this.insOb.blackAlpha;
        if(this.e.controlType==="side"){
            this.instructions1b.style.opacity = this.insOb.insAlpha1;
        }else{
            this.instructions1b.style.opacity = 0;
        }
        
        this.instructions2.style.opacity = this.insOb.insAlpha2;
        this.charContainer.style.opacity = this.insOb.charAlpha;
        
    }

    nextIns(){

        // console.log("----"+this.insAction)
        console.log("----"+this.e.scene.gameAction+" / "+this.insAction)

        if(this.e.scene.gameAction!=="show result menu" && this.e.scene.gameAction!=="play again"){
            
            if(this.insAction==="splash"){

                // console.log(this.e.loadBack);

                if(this.e.loadBack<=0){
                    this.e.s.p("start")
                    this.insAction="fade splash"
                    this.e.s.p("drums")
                    // this.faderOb.opacity = .5;
                    // gsap.to(this.faderOb, { opacity: 0, duration: .5, ease: "linear"});
                    
                }

            }else if(this.insAction==="char"){

                
                // this.insAction="fade char"

            }else if(this.insAction==="ins1"){

                // console.log("click ins 1")

                this.e.s.p("click")
                this.insAction="fade ins1"

            }else if(this.insAction==="ins2"){

                this.e.s.p("whistle")
                this.e.s.p("cheer")
                this.insAction="fade ins2"
                
                this.faderOb.opacity = .5;
                gsap.to(this.faderOb, { opacity: 0, duration: 1.5, ease: "linear"});

            }  
            
        }


    }

}