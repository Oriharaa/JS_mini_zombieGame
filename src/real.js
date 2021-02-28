'use strict';
import PopUp from './popup.js';
import Field from './field.js';



const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameField = document.querySelector('.game__field');
const gameScore = document.querySelector('.game__score');
const fieldRect = gameField.getBoundingClientRect();

const ZOMBIE_WIDTH = 50;
const ZOMBIE_HEIGHT = 73;
const BOMB_SIZE = 50;

const ZOMBIE_COUNT = 10;
const BOMB_COUNT = 10;
const GAME_DURATION_SEC = 10;

const bgm = new Audio('./sound/bg.mp3');
const zombieSound = new Audio('./sound/die.wav');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bombSound = new Audio('./sound/baam.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
const imgField = new Field();


gameBtn.addEventListener('click', ()=>{
    if(started){
        stopGame();
    }else {
        startGame();
    }
});

gameField.addEventListener('click', onFieldClick);

gameFinishBanner.setClickListener(()=>{
    startGame();
});

function startGame(){
    started = true;
    initGame();
    playSound(bgm);
    showStopButton();
    showTimerAndScore();
    showButton();
    startGameTimer();

};

function stopGame(){
    started = false;
    playSound(alertSound);
    stopSound(bgm);
    stopGameTimer();
    hideButtonAndTimer();
    gameFinishBanner.showWithText('REPLAY ❓');
};

function finishGame(win){
    started = false;
    if(win){
        playSound(winSound);
    }else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgm);
    gameFinishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 💩');
};

function initGame(){
    score = 0;
    gameField.innerHTML = '';
    gameScore.innerTEXT = `remainder : ${ZOMBIE_COUNT}`;
    addItem('zombie', 10, 'img/zombie.png');
    addItem('bomb', 10, 'img/bomb.png');
};

function showStopButton(){
    gameBtn.innerHTML = `<img src="img/stop.png" class="stop" />`;
    gameBtn.style.background = '#FF1616';
};

function showTimerAndScore(){
    gameTimer.style.color = '#FF1616';
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
};

function showButton(){
    gameBtn.style.visibility = 'visible';
}

function startGameTimer(){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=>{
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            finishGame(score === ZOMBIE_COUNT);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
};

function stopGameTimer(){
    clearInterval(timer);
};

function hideButtonAndTimer(){
    gameBtn.style.visibility = 'hidden';
    gameTimer.style.visibility = 'hidden';
    gameScore.style.visibility = 'hidden'; 
};


function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `0${minutes}:${seconds}`;
};

function onFieldClick(event){
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.zombie')){
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(score === ZOMBIE_COUNT){
            finishGame(true);
        }
    }else if(target.matches('.bomb')){
        finishGame(false);
    }
};

function updateScoreBoard() {
    gameScore.innerText = `Remainder ㅡ> ${ZOMBIE_COUNT - score}`;
  }


function playSound(sound){
    sound.currentTime = 0;
    sound.play();
};

function stopSound(sound){
    sound.pause();
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = (className === 'zombie') ? fieldRect.width - ZOMBIE_WIDTH : fieldRect.width - BOMB_SIZE;
    const y2 = (className === 'zombie') ? fieldRect.height - ZOMBIE_HEIGHT : fieldRect.height - BOMB_SIZE;

    for(let i=0; i < count; i++){
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        const img = document.createElement('img');
        img.setAttribute('class', className);
        img.setAttribute('src', imgPath);
        img.style.position = 'absolute';
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        gameField.appendChild(img);
    }
};

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
};


