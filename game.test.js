const { Game } = require("./game.js");

describe("game test", () => {
  it("init test", () => {
    const game = new Game();

    game.settings = {
        gridSize: {
          width: 4,
          height: 5
        }
      };

    expect(game.settings.gridSize.width).toBe(4);
    expect(game.settings.gridSize.height).toBe(5);
  });
});