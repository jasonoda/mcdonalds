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

            } else if (event.key === "c") {

                console.log("ccc")

                // this.e.scene.playerCont.position.z = 210;
                this.e.scene.playerCont.position.z = 0;

            } else if (event.key === "p") {

                this.e.scene.movePlayer = false

            } else if (event.key === "t") {

                this.e.camContX.rotation.x+=this.e.u.ca(2);

            } else if (event.key === "g") {

                this.e.camContX.rotation.x-=this.e.u.ca(2);

            // } else if (event.key === "b") {

            //     this.e.camera.position.z-=2;

            //     //-------------------------------------------------------

            } else if (event.key === "v") {

                this.e.ui.highlight1()

            } else if (event.key === "b") {

                this.e.ui.highlight2()

            } else if (event.key === "n") {

                // this.e.camera.position.z+=2;

                this.e.ui.highlight3()

                //-------------------------------------------------------

            } else if (event.key === "l") {

                // console.log("lll")
                // this.e.scene.uniformColor = 0xff0000;
                // this.e.scene.uniformColor = 0xff0000;
                // console.log(e.scene.uniformMaterial);
                // e.scene.uniformMaterial.color.setHex( 0xff0000 );

                // this.e.scene.uniformColor = 0xff0000;
                this.e.scene.uniformFlash();

            } else if (event.key === "m") {

                // console.log( this.e.u.ca( this.e.camera.rotation.x ) );
                // console.log( this.e.camera.position.z );

                this.e.ui.highlightReset()

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

        //---touchstart--------------------------------------------------------------------------------------------------------------

        this.ongoingTouches = [];

        document.addEventListener("touchstart", evt => {

            for (var i = 0; i < evt.touches.length; i++) {
                var found = false;

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

        });

        //---mousemove--------------------------------------------------------------------------------------------------------------

        document.addEventListener("mousemove", evt => {
            
            // this.e.mouse = new THREE.Vector2();
            // this.e.mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
            // this.e.mouse.y = -(evt.clientY / window.innerHeight) * 2 + 1;
        
            if(this.e.mobile===false){

                this.e.mouse = new THREE.Vector2();
                this.e.mouse.x = evt.clientX
                this.e.mouse.y = evt.clientY
            
            }

        });

        document.addEventListener("mousedown", evt => {

            this.e.mouseDown.x = evt.clientX
            this.e.mouseDown.y = evt.clientY

        });

        document.getElementById("foodButton1").addEventListener("mousedown", evt => {

            console.log("button1");
            this.e.scene.hasPushedButton1=true;
        
        });

        document.getElementById("foodButton2").addEventListener("mousedown", evt => {

            if(this.e.scene.gameAction==="shoot" && this.e.mobile===false){
                console.log("d button2");
                console.log("---shoot")
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
                console.log("t button2");
                console.log("---shoot")
                this.e.scene.gameAction="pick target"
            }

        });

        document.getElementById("foodButton3").addEventListener("touchstart", evt => {

            console.log("t button3");
            this.e.scene.hasPushedButton3=true;
        
        });

        //---touchmove--------------------------------------------------------------------------------------------------------------

        this.ongoingTouches = [];

        document.addEventListener("touchmove", evt => {

            for (var i = 0; i < evt.touches.length; i++) {
            
                this.e.touch.x=evt.touches[i].clientX
                this.e.touch.y=evt.touches[i].clientY

                this.e.mouse.x = evt.touches[i].clientX
                this.e.mouse.y = evt.touches[i].clientY

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

    }

}