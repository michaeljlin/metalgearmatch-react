import jungle from '../assets/sounds/jungle.mp3';
import found from '../assets/sounds/found.wav';
import gun from '../assets/sounds/gun1.wav';
import safe from '../assets/sounds/bullet4.wav';
import sneak from '../assets/sounds/sneak.mp3';

function Soundboard(){

    this.found = new Audio(found);
    this.jungle = new Audio(jungle);
    this.gun = new Audio(gun);
    this.safe = new Audio(safe);
    this.sneak = new Audio(sneak);

    this.soundToggle = true;

    this.initialize = function(){
        this.found.loop = false;
        this.gun.loop = false;
        this.safe.loop = false;
        this.jungle.loop = true;
        this.jungle.currentTime = 5;
        this.jungle.volume = 0.75;
        this.sneak.loop = true;
        this.sneak.volume = 0.75;
    };

    this.play = function(type){
        console.log('playing sound: ', type);

        if(this.soundToggle){
            switch(type){
                case 'found':
                    this.found.play();
                    break;
                case 'shot':
                    this.gun.play();
                    break;
                case 'safe':
                    this.safe.play();
                    break;
                case 'alert':
                    this.sneak.pause();
                    if(this.jungle.paused){
                        this.jungle.play();
                    }
                    break;
                case 'sneak':
                    this.jungle.pause();
                    if(this.sneak.paused){
                        this.sneak.play();
                    }
                    break;
            }
        }

    };

    this.stop = function(type){
        switch(type){
            case 'alert':
                this.jungle.pause();
                this.jungle.currentTime = 5;
                break;
            case 'sneak':
                this.sneak.pause();
                break;
            case 'all':
                this.found.pause();
                this.found.currentTime = 0;
                this.gun.pause();
                this.gun.currentTime = 0;
                this.safe.pause();
                this.safe.currentTime = 0;
                this.jungle.pause();
                this.jungle.currentTime = 5;
                this.sneak.pause();
                this.sneak.currentTime = 0;
                break;
        }
    };

    this.soundSwitch = function(){
        this.soundToggle = !this.soundToggle;
    };

    this.getSoundState = function(){
        return this.soundToggle;
    }
}

const soundHandler = new Soundboard();

export default soundHandler;