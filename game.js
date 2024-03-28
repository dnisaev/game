class Game {
  #settings

  set settings(newSetting) {
    this.#settings = newSetting
  }

  get settings() {
    return  this.#settings;
  }
}

module.exports = {
  Game,
}