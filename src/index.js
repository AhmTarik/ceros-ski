import '../css/game.css';
import { Game } from './Core/Game.js';

document.addEventListener("DOMContentLoaded",() => {

    const skiGame = new Game();
    skiGame.load().then(() => {
        //console.log('run ...')
        skiGame.init();
        skiGame.run();
    })
    .catch(e =>{
        console.log(`error is : `,e)
        //debugger;
        window.location.reload();
    });
});