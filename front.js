import {Game} from "./game.js";
import {EventEmitter} from "./utils/observer.js";

const start = async () => {
    const eventEmitter = new EventEmitter();
    const game = new Game(eventEmitter);

    const table = document.createElement('table');
    const result = document.querySelector("#result");

    document.body.append(table);

    const render = () => {
        table.innerHTML = '';
        result.innerHTML = '';

        result.append(`Коржик: ${game.score[1].points} — Карамелька: ${game.score[2].points}`);

        for (let y = 1; y <= game.settings.gridSize.height; y++) {
            const tr = document.createElement('tr')
            for (let x = 1; x <= game.settings.gridSize.width; x++) {
                const td = document.createElement('td')

                if (game.player1.position.x === x && game.player1.position.y === y) {
                    const img = document.createElement('img')

                    img.src = "./assets/player1.png"
                    img.alt = "first player"
                    td.append(img)
                }

                if (game.player2.position.x === x && game.player2.position.y === y) {
                    const img = document.createElement('img')

                    img.src = "./assets/player2.png"
                    img.alt = "second player"
                    td.append(img)
                }

                if (game.google.position.x === x && game.google.position.y === y) {
                    const img = document.createElement('img')

                    img.src = "./assets/google.png"
                    img.alt = "google player"
                    td.append(img)
                }
                tr.append(td)
            }
            table.append(tr)
        }
    };

    game.eventEmitter.addEventListener('update', () => render())

    await game.start();

    window.addEventListener('keydown', (event)=>{
        switch (event.code) {
            case 'ArrowUp': {
                game.movePlayer1Up();
                break;
            }
            case 'ArrowDown': {
                game.movePlayer1Down();
                break;
            }
            case 'ArrowLeft': {
                game.movePlayer1Left();
                break;
            }
            case 'ArrowRight': {
                game.movePlayer1Right();
                break;
            }
            case 'KeyW': {
                game.movePlayer2Up();
                break;
            }
            case 'KeyS': {
                game.movePlayer2Down();
                break;
            }
            case 'KeyA': {
                game.movePlayer2Left();
                break;
            }
            case 'KeyD': {
                game.movePlayer2Right();
                break;
            }
        }
    })
    console.log(game)
}

await start()


