class Game {
  #settings = {
    gridSize: {
      width: 4,
      height: 5
    }
  };
  #status = "pending";
  #player1;
  #player2;
  #google;

  constructor() {

  }

  set settings(newSetting) {
    this.#settings = newSetting;
  }

  get settings() {
    return this.#settings;
  }

  get status() {
    return this.#status
  }

  get player1() {
    return this.#player1
  }

  get player2() {
    return this.#player2
  }

  get google() {
    return this.#google
  }

  #createUnits() {
    const player1Position = new Position(
      Position.getNotCrossedPosition(
        [],
        this.#settings.gridSize.width,
        this.#settings.gridSize.height ));
    this.#player1 = new Player(player1Position, 1);

    const player2Position = new Position(
      Position.getNotCrossedPosition(
        [player1Position],
        this.#settings.gridSize.width,
        this.#settings.gridSize.height ));
    this.#player2 = new Player(player2Position, 2);

    const googlePosition = new Position(
      Position.getNotCrossedPosition(
        [player1Position, player2Position],
        this.#settings.gridSize.width,
        this.#settings.gridSize.height ));
    this.#google = new Google(googlePosition)

  }

  start() {
    if (this.#status === "pending") {
      this.#status = "in-process";
    }
    this.#createUnits()
  }

  pause() {

  }

  resume() {

  }

  finished() {

  }
}

class NumberUtil {
  static getRandomNumber(max) {
    return Math.floor(1 + Math.random() * (max));
  }
}

class Unit {
  constructor(position) {
    this.position = position;
  }
}

class Player extends Unit {
  constructor(position, playerNumber) {
    super(position)
    this.playerNumber = playerNumber;
  }
}

class Google extends Unit {
  constructor(position) {
    super(position)
  }
}

class Position {
  constructor(obj) {
    this.x = obj.x;
    this.y = obj.y;
  }

  static getNotCrossedPosition(coordinates, maxX, maxY) {
    let x, y;

    do {
      x = NumberUtil.getRandomNumber(maxX);
      y = NumberUtil.getRandomNumber(maxY);
    } while (
      coordinates.some(
        coord => coord.x === x && coord.y === y
      )
      );

    return { x, y };
  }
}

module.exports = {
  Game
};