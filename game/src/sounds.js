export class Sounds {

    setUp(e) {

        this.e=e;
        this.soundArray = ["blip", "boost", "cheer", "click", "coin", "kick", "metalHit", "shine", "splash", "start", "whistle", "woosh", "cone", "win", "readyChime", "metalTargetHit", "targetSwitch", "zoom", "drums", "tally", "tally2"];
        this.loadedSounds = [];

        for(var i=0; i<this.soundArray.length; i++){
            this.loadSounds(this.soundArray[i]);
        }
        
    }

    loadSounds(url){

        var theSound = new Howl({
            src: ['./src/sounds/'+url+".mp3"]
        });

        theSound.on('load', (event) => {
            theSound.name=url;
            this.loadedSounds.push(theSound);
            // console.log("SOUND: "+url+" - "+this.loadedSounds.length+" / "+this.soundArray.length);

            
        });

    }

    stopAll(){

        console.log("stop all")

        for(var i=0; i<this.loadedSounds.length; i++){

            this.loadedSounds[i].stop();
            
        }

    }

    p(type){

        if(this.e.playSounds===true){

            for(var i=0; i<this.loadedSounds.length; i++){

                // console.log(type+" / "+this.loadedSounds[i].name)
    
                if(this.loadedSounds[i].name===type){
                    this.loadedSounds[i].play();
                }
                
            }
    
        }

    }
}