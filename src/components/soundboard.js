import jungle from '../assets/sounds/jungle.mp3';
import found from '../assets/sounds/found.wav';
import gun from '../assets/sounds/gun1.wav';

function Soundboard(){

    this.found = new Audio(found);
    this.jungle = new Audio(jungle);
    this.gun = new Audio(gun);

    this.initialize = function(){
        this.found.loop = false;
        this.gun.loop = false;
        this.jungle.loop = true;
        this.jungle.currentTime = 5;
    };

    this.play = function(type){
        console.log('playing sound: ', type);

        switch(type){
            case 'found':
                this.found.play();
                break;
            case 'shot':
                this.gun.play();
                break;
            case 'alert':
                if(this.jungle.paused){
                    this.jungle.play();
                }
                break;
        }
    };

    this.stop = function(type){
        switch(type){
            case 'alert':
            this.jungle.pause();
            this.jungle.currentTime = 5;
            break;
        }
    }
}

const soundHandler = new Soundboard();

export default soundHandler;