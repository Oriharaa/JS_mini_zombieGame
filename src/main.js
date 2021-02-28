'use strict';
import PopUp from './popup.js';
import Game, { Reason } from './game.js';
import GameBuilder from './game.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.gameDuration(5)
.zombieCount(10)
.bombCount(10)
.build();

game.setGameStopListener(reason=>{
    console.log(reason);
    let message;
    switch (reason){
        case Reason.cancel :
            message = 'REPLAY ❓';
            sound.playAlert();
            break;
        case Reason.win :
            message = 'YOU WON 🎉';
            sound.playWin();
            break;
        case Reason.lose :
            message = 'YOU LOST 💩';
            sound.playBug();
            break;
        default :
            throw new Error('fuck error');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=>{
    game.start();
});

