import jungle from '../assets/sounds/jungle.mp3';
import found from '../assets/sounds/found.wav';
import gun from '../assets/sounds/gun1.wav';
import safe from '../assets/sounds/bullet4.wav';
import sneak from '../assets/sounds/sneak.mp3';
import allyheal from '../assets/sounds/allyheal.wav';
import fail from '../assets/sounds/allyfailmatch.wav';
import menuStart from '../assets/sounds/menustart.mp3';
import menuSelect from '../assets/sounds/menuselect.mp3';
import menuOption from '../assets/sounds/menuoption.mp3';
import bossShot from '../assets/sounds/pistol.wav';

function Soundboard(){

    this.found = new Audio(found);
    this.jungle = new Audio(jungle);
    this.gun = new Audio(gun);
    this.safe = new Audio(safe);
    this.sneak = new Audio(sneak);
    this.allyheal = new Audio(allyheal);
    this.fail = new Audio(fail);
    this.menuStart = new Audio(menuStart);
    this.menuSelect = new Audio(menuSelect);
    this.menuOption = new Audio(menuOption);
    this.bossShot = new Audio(bossShot);

    this.soundHolder = [];

    this.soundToggle = true;

    this.initialize = function(){
        this.soundHolder = {
            jungle: jungle,
            found: found,
            gun: gun,
            safe: safe,
            sneak: sneak,
            allyheal: allyheal,
            fail: fail,
            menuStart: menuStart,
            menuSelect: menuSelect,
            menuOption: menuOption,
            bossShot: bossShot
        };

        this.found.loop = false;
        this.gun.loop = false;
        this.safe.loop = false;
        this.allyheal.loop = false;
        this.fail.loop = false;
        this.bossShot.loop = false;

        this.menuStart.loop = false;
        this.menuStart.currentTime = 0.3;
        this.menuSelect.loop = false;
        this.menuSelect.currentTime = 0.3;
        this.menuOption.loop = false;
        this.menuOption.currentTime = 0.95;

        this.jungle.loop = true;
        this.jungle.currentTime = 5;
        this.jungle.volume = 0.75;
        this.sneak.loop = true;
        this.sneak.volume = 0.75;
    };

    this.play = function(type){

        if(this.soundToggle){
            let audioObj = null;

            switch(type){
                case 'found':
                    audioObj = new Audio(this.soundHolder.found);
                    break;
                case 'shot':
                    audioObj = new Audio(this.soundHolder.gun);
                    break;
                case 'safe':
                    audioObj = new Audio(this.soundHolder.safe);
                    break;
                case 'ally':
                    audioObj = new Audio(this.soundHolder.allyheal);
                    break;
                case 'fail':
                    audioObj = new Audio(this.soundHolder.fail);
                    break;
                case 'boss':
                    audioObj = new Audio(this.soundHolder.bossShot);
                    audioObj.currentTime = 0;
                    break;
                case 'start':
                    audioObj = new Audio(this.soundHolder.menuStart);
                    audioObj.currentTime = 0.3;
                    break;
                case 'select':
                    audioObj = new Audio(this.soundHolder.menuSelect);
                    audioObj.currentTime = 0.3;
                    break;
                case 'option':
                    audioObj = new Audio(this.soundHolder.menuOption);
                    audioObj.currentTime = 0.95;
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

            if(audioObj !== null){
                audioObj.play();
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
                this.sneak.currentTime = 0;
                break;
            case 'all':
                this.found.pause();
                this.gun.pause();
                this.safe.pause();
                this.bossShot.pause();
                this.jungle.pause();
                this.jungle.currentTime = 5;
                this.sneak.pause();
                this.sneak.currentTime = 0;
                this.allyheal.pause();
                this.fail.pause();
                this.menuStart.pause();
                this.menuStart.currentTime = 0.3;
                this.menuSelect.pause();
                this.menuSelect.currentTime = 0.3;
                this.menuOption.pause();
                this.menuOption.currentTime = 0.95;
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