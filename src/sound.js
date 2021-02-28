'use strict';

const zombieSound = new Audio('./sound/carrot_pull.mp3');
const bgm = new Audio('./sound/bg.mp3');
const bombSound = new Audio('./sound/baam.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const winSound = new Audio('./sound/game_win.mp3');


export function playZombie(){
    playSound(zombieSound);
}
export function playBgm(){
    playSound(bgm);
}
export function playBomb(){
    playSound(bombSound);
}
export function playBug(){
    playSound(bugSound);
}
export function playAlert(){
    playSound(alertSound);
}
export function playWin(){
    playSound(winSound);
}

export function stopBgm(){
    stopSound(bgm);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
};

function stopSound(sound){
    sound.pause();
}