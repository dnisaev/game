const {Game} = require("./game.js");

describe("game test", () => {
    let game
    beforeEach(()=>{
        game = new Game();
    });
    afterEach(async () => {
        await game.stop();
    })
    it("init test", async () => {
        game.settings = {
            gridSize: {
                width: 4,
                height: 5
            }
        };

        expect(game.settings.gridSize.width).toBe(4);
        expect(game.settings.gridSize.height).toBe(5);
    });
    it("start game", async () => {
        game.settings = {
            gridSize: {
                width: 4,
                height: 5
            }
        };

        expect(game.status).toBe('pending');
        await game.start();
        expect(game.status).toBe('in-process');
    });
    it("units should have unique coordinates", async () => {
        game.settings = {
            gridSize: {
                width: 1,
                height: 3
            }
        };

        await game.start();

        expect([1]).toContain(game.player1.position.x)
        expect([1, 2, 3]).toContain(game.player1.position.y)

        expect([1]).toContain(game.player2.position.x)
        expect([1, 2, 3]).toContain(game.player2.position.y)

        expect([1]).toContain(game.google.position.x)
        expect([1, 2, 3]).toContain(game.google.position.y)

        expect(
            game.google.position.x !== game.player1.position.x ||
            game.google.position.y !== game.player2.position.y ||
            (game.google.position.y !== game.player1.position.y ||
                game.google.position.x !== game.player2.position.x)
        )
    });
    it("check google position after jump", async () => {
        game.settings = {
            gridSize: {
                width: 1,
                height: 4
            },
            googleJumpInterval: 100,
        };

        await game.start();

        const prevPosition = game.google.position.clone();
        await delay(150);
        expect(game.google.position.equal(prevPosition)).toBe(false)
    })
    it("catch google by player1 ot player2 for one row", async () => {
        for (let i = 0; i < 10; i++) {
            game = new Game();
            game.settings = {
                gridSize: {
                    width: 3,
                    height: 1
                },
            };

            await game.start();

            const deltaForPlayer1 = game.google.position.x - game.player1.position.x;

            const prevGooglePosition = game.google.position.clone();

            if (Math.abs(deltaForPlayer1) === 2) {
                const deltaForPlayer2 = game.google.position.x - game.player2.position.x;
                if (deltaForPlayer2 > 0) {
                    game.movePlayer2Right();
                } else {
                    game.movePlayer2Left();
                }

                expect(game.score[1].points).toBe(0);
                expect(game.score[2].points).toBe(1);
            } else {
                if (deltaForPlayer1 > 0) {
                    game.movePlayer1Right();
                } else {
                    game.movePlayer1Left();
                }

                expect(game.score[1].points).toBe(1);
                expect(game.score[2].points).toBe(0);
            }
            expect(game.google.position.equal(prevGooglePosition)).toBe(false);
        }
    })
    it("catch google by player1 or player2 for one column", async () => {
        for (let i = 0; i < 10; i++){
            game = new Game();

            game.settings = {
                gridSize: {
                    width: 1,
                    height: 3
                },
            };

            await game.start();

            const deltaForPlayer1 = game.google.position.y - game.player1.position.y

            const prevGooglePosition = game.google.position.clone();

            if (Math.abs(deltaForPlayer1) === 2) {
                const deltaForPlayer2 =
                    game.google.position.y - game.player2.position.y;

                if (deltaForPlayer2 > 0) game.movePlayer2Down();
                else game.movePlayer2Up()

                expect(game.score[1].points).toBe(0);
                expect(game.score[2].points).toBe(1);
            } else {
                if (deltaForPlayer1 > 0) game.movePlayer1Down();
                else game.movePlayer1Up();

                expect(game.score[1].points).toBe(1);
                expect(game.score[2].points).toBe(0);
            }

            expect(game.google.position.equal(prevGooglePosition)).toBe(false)
        }
    })
});

const delay = (ms) => new Promise((res) => {
    setTimeout(res, ms)
})