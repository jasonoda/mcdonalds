import * as THREE from '../../build/three.module.js';

export class Input {
    
    setUp(e) {

        this.e=e;

        this.keyRight = false;
        this.keyLeft = false;
        this.keyUp = false;
        this.keyDown = false;
        this.keySpace = false;

        document.addEventListener("keydown", event => {

            //---arrow keyes---------------------------------------

            if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {

                this.keyRight = true;

            } else if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {

                this.keyLeft = true;

            } else if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {

                this.keyUp = true;

            } else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {

                this.keyDown = true;

            } else if (event.key === "x") {

                // this.e.scene.playerCont.position.z = -180;

            } else if (event.key === "c") {

                this.e.scene.playerCont.position.z = 210;

            } else if (event.key === "p") {

                // this.e.scene.movePlayer = false

            } else if (event.key === "t") {

                // this.e.camContX.rotation.x+=this.e.u.ca(2);

            } else if (event.key === "g") {

                // this.e.camContX.rotation.x-=this.e.u.ca(2);

            // } else if (event.key === "b") {

            //     this.e.camera.position.z-=2;

            //     //-------------------------------------------------------

            } else if (event.key === "j") {

                // this.e.ui.insOb.splashAlpha = 0;

            } else if (event.key === "v") {

                // this.e.ui.highlight1()

            } else if (event.key === "b") {

                // this.e.ui.highlight2()

            } else if (event.key === "n") {

                console.log(this.e.player1)
                console.log(this.e.player2)
                console.log(this.e.player3)

                // this.e.camera.position.z+=2;

                // this.e.ui.highlight3()

                //-------------------------------------------------------

            } else if (event.key === "l") {

                // console.log("lll")
                // this.e.scene.uniformColor = 0xff0000;
                // this.e.scene.uniformColor = 0xff0000;
                // console.log(e.scene.uniformMaterial);
                // e.scene.uniformMaterial.color.setHex( 0xff0000 );

                // this.e.scene.uniformColor = 0xff0000;
                // this.e.scene.uniformFlash();

                // document.getElementById("meterDiv").style.display = "inline"

            } else if (event.key === "m") {

                // console.log( this.e.u.ca( this.e.camera.rotation.x ) );
                // console.log( this.e.camera.position.z );

                // this.e.ui.highlightReset()

                //-------------------------------------------------------

            } else if (event.key === " ") {

                this.keySpace = true;

            }

        });

        document.addEventListener("keyup", event => {

            //---arrow keyes---------------------------------------

            if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {

                this.keyRight = false;

            } else if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {

                this.keyLeft = false;

            } else if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {

                this.keyUp = false;

            } else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {

                this.keyDown = false;

            } else if (event.key === " ") {

                this.keySpace = false;
    
            } else if ( event.key === "q" || event.key === "Q") {

               document.getElementById("dateline").style.opacity = 0;
               document.getElementById("header").style.opacity = 0;
               document.getElementById("disc").style.opacity = 0;

            }

        });

        //---food buttons--------------------------------------------------------------------------------------------------------------

        document.getElementById("foodButton1").addEventListener("mousedown", evt => {

            console.log("button1");
            this.e.scene.hasPushedButton1=true;
        
        });

        document.getElementById("foodButton2").addEventListener("mousedown", evt => {

            if(this.e.scene.gameAction==="shoot" && this.e.mobile===false){
                console.log("d button2");
                // console.log("---shoot")
                this.e.scene.gameAction="pick target"
            }

        });

        document.getElementById("foodButton3").addEventListener("mousedown", evt => {

            console.log("button3");
            this.e.scene.hasPushedButton3=true;
        
        });

        //-----

        document.getElementById("foodButton1").addEventListener("touchstart", evt => {

            console.log("t button1");
            this.e.scene.hasPushedButton1=true;
        
        });

        document.getElementById("foodButton2").addEventListener("touchstart", evt => {

            console.log("---button2")

            if(this.e.scene.gameAction==="shoot" && this.e.mobile===true){
                // console.log("t button2");
                // console.log("---shoot")
                this.e.scene.gameAction="pick target"
            }

        });

        document.getElementById("foodButton3").addEventListener("touchstart", evt => {

            console.log("t button3");
            this.e.scene.hasPushedButton3=true;
        
        });

        //---mousemove--------------------------------------------------------------------------------------------------------------

        document.addEventListener("mousedown", evt => {

            this.e.mouseIsDown=true;

            this.e.mouseDown.x = evt.clientX
            this.e.mouseDown.y = evt.clientY

        });

        document.addEventListener("mousemove", evt => {
            
            if(this.e.mobile===false){

                this.e.mouse = new THREE.Vector2();
                this.e.mouse.x = evt.clientX
                this.e.mouse.y = evt.clientY
            
            }

        });

        document.addEventListener("mouseup", evt => {

            this.e.mouseIsDown=false;

        });

        //---touchstart--------------------------------------------------------------------------------------------------------------

        this.ongoingTouches = [];

        document.addEventListener("touchstart", evt => {

            for (var i = 0; i < evt.touches.length; i++) {
                var found = false;

                if(evt.touches[i].clientX<50 && evt.touches[i].clientY< 50){

                    console.log("mb hit")

                }else{

                    //only add the touch if it is not listed yet, prevent doubles

                    for (var j = 0; j < this.ongoingTouches.length; j++) {

                        if (evt.touches[i].identifier === this.ongoingTouches[j].identifier) {
                            found = true;
                        }

                    }

                    if (found === false) {
                        this.ongoingTouches.push(evt.touches[i]);
                    }
                    
                    // console.log( this.ongoingTouches[0] );

                    this.e.mouseDown.x = this.ongoingTouches[0].clientX
                    this.e.mouseDown.y = this.ongoingTouches[0].clientY
                
                }

            }

        });

        //---touchmove--------------------------------------------------------------------------------------------------------------

        this.ongoingTouches = [];

        document.addEventListener("touchmove", evt => {

            for (var i = 0; i < evt.touches.length; i++) {
            
                this.e.touch.x = evt.touches[0].clientX
                this.e.touch.y = evt.touches[0].clientY

                this.e.mouse.x = evt.touches[i].clientX
                this.e.mouse.y = evt.touches[i].clientY

                // console.log(this.e.touch.x);

            }

        });

        //---touchend--------------------------------------------------------------------------------------------------------------

        document.addEventListener("touchend", evt => {

            //evt.preventDefault();
            var touches = evt.changedTouches;

            for (var i = 0; i < touches.length; i++) {

                for (var j = 0; j < this.ongoingTouches.length; j++) {

                    if (touches[i].identifier === this.ongoingTouches[j].identifier) {
                        this.ongoingTouches.splice(j, 1);
                    }
                }
            }

        });

        //---touchcancel--------------------------------------------------------------------------------------------------------------

        document.addEventListener("touchcancel", evt => {

            //evt.preventDefault();
            var touches = evt.changedTouches;

            for (var i = 0; i < touches.length; i++) {

                for (var j = 0; j < this.ongoingTouches.length; j++) {

                    if (touches[i].identifier === this.ongoingTouches[j].identifier) {
                        this.ongoingTouches.splice(j, 1);
                    }

                }

            }

        });

        //---touchcancel--------------------------------------------------------------------------------------------------------------

        document.getElementById("playAgainBut").addEventListener("mousedown", evt => {

            // this.e.scene.resetGame();
            this.e.scene.gameAction="play again"

        });

        document.getElementById("playAgainBut").addEventListener("touchstart", evt => {

            // this.e.scene.resetGame();
            this.e.scene.gameAction="play again"

        });

        // --------------------------------------------------------------------------------------------------

        document.getElementById("nextChar").addEventListener("mousedown", evt => {

            if(this.e.scene.gameAction==="char select wait"){
                this.e.scene.nextChar();
            }

        });

        document.getElementById("nextChar").addEventListener("touchstart", evt => {

            if(this.e.scene.gameAction==="char select wait"){
                this.e.scene.nextChar();
            }

        });

        // --------------------------------------------------------------------------------------------------

        document.getElementById("prevChar").addEventListener("mousedown", evt => {

            if(this.e.scene.gameAction==="char select wait"){
                this.e.scene.prevChar();
            }
            
        });

        document.getElementById("prevChar").addEventListener("touchstart", evt => {

            if(this.e.scene.gameAction==="char select wait"){
                this.e.scene.prevChar();
            }

        });

        // --------------------------------------------------------------------------------------------------

        document.getElementById("confirmChar").addEventListener("mousedown", evt => {

            if(this.e.scene.gameAction==="char select wait"){
                this.e.scene.confirmChar();
            }

        });

        document.getElementById("confirmChar").addEventListener("touchstart", evt => {

            if(this.e.scene.gameAction==="char select wait"){
                this.e.scene.confirmChar();
            }

        });

        // --------------------------------------------------------------------------------------------------

        // document.getElementById("resetBut").addEventListener("mousedown", evt => {

        //     this.e.scene.resetGame();

        // });

        // document.getElementById("resetBut").addEventListener("touchstart", evt => {

        //     this.e.scene.resetGame();

        // });

        document.getElementById("volOn").addEventListener("touchstart", evt => {

            // turn sounds off

            if(this.e.mobile===true){
                this.e.playSounds=false;
                document.getElementById("volOn").style.display="none";
                document.getElementById("volOff").style.display="block";
                // console.log("vol off")
                this.e.s.stopAll()
            }
            
        });

        document.getElementById("volOff").addEventListener("touchstart", evt => {

            // turn sounds on

            if(this.e.mobile===true){
                this.e.playSounds=true;
                document.getElementById("volOn").style.display="block";
                document.getElementById("volOff").style.display="none";
                // console.log("vol on")
            }

        });

        document.getElementById("volOn").addEventListener("mousedown", evt => {

            if(this.e.mobile===false){
                this.e.playSounds=false;
                document.getElementById("volOn").style.display="none";
                document.getElementById("volOff").style.display="block";
                // console.log("vol on")
            }
            
        });

        document.getElementById("volOff").addEventListener("mousedown", evt => {

            if(this.e.mobile===false){
                this.e.playSounds=true;
                document.getElementById("volOn").style.display="block";
                document.getElementById("volOff").style.display="none";
                // console.log("vol off")
            }
            
        });

        document.getElementById("otherReset").addEventListener("mousedown", evt => {

            if(this.e.scene.gameAction==="show result menu"){
                this.e.scene.resetGame();
            }

        });

        document.getElementById("otherReset").addEventListener("touchstart", evt => {

            if(this.e.scene.gameAction==="show result menu"){
                this.e.scene.resetGame();
            }


        });

    }


}