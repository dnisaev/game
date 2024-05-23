import {Game} from "./game.js";

const game = new Game()

const start = async () => {
    await game.start();

    const render = () => {
        const table = document.createElement('table')
        document.body.append(table)

        for(let y = 1; y <= game.settings.gridSize.height; y++) {
            const tr = document.createElement('tr')
            for(let x = 1; x <= game.settings.gridSize.width; x++) {
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
    }
    render()
}

await start()

console.log(game)


