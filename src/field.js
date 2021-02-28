'use strict';
import * as sound from './sound.js';

const ZOMBIE_WIDTH = 50;
const ZOMBIE_HEIGHT = 73;
const BOMB_SIZE = 50;

export const ItemType = Object.freeze({
    zombie: 'zombie',
    bomb: 'bomb',
})


export default class Field {
    constructor(zombieCount, bombCount) {
        this.zombieCount = zombieCount;
        this.bombCount = bombCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        
        this.field.addEventListener('click', this.onClick);
    }

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    onClick = (event)=> {
        const target = event.target;
        if(target.matches('zombie')){
            target.remove();
            sound.playZombie();
            this.onItemClick && this.onItemClick(ItemType.zombie);
         }else if(target.matches('.bomb')){
            this.onItemClick && this.onItemClick(ItemType.bomb);
         }

    }

    init(){
        this.field.innerHTML = '';
        this._addItem('zombie', this.zombieCount, 'img/zombie.png');
        this._addItem('bomb', this.bombCount, 'img/bomb.png');
    }

    _addItem(className, count, imgPath){
        const x1 = 0;
        const y1 = 0;
        const x2 = (className === 'zombie') ? this.fieldRect.width - ZOMBIE_WIDTH : this.fieldRect.width - BOMB_SIZE;
        const y2 = (className === 'zombie') ? this.fieldRect.height - ZOMBIE_HEIGHT : this.fieldRect.height - BOMB_SIZE;
    
        for(let i=0; i < count; i++){
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            const img = document.createElement('img');
            img.setAttribute('class', className);
            img.setAttribute('src', imgPath);
            img.style.position = 'absolute';
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
            this.field.appendChild(img);
        }
    };

}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
};

function stopSound(sound){
    sound.pause();
}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
};