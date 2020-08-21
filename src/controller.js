export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.intervalId = null;
    this.isPlaying = false;

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));

    this.view.renderStartScreen();
  }
  update() {
    this.game.movePieceDown();
    this.updateView();
  }

  play() {
    this.isPlaying = true;
    this.startTimer();
    this.updateView();
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }

  reset() {
    this.game.reset();
    this.play();
  }

  updateView() {
    const state = this.game.getState();

    if (state.isGameOver) {
      this.view.renderEndScreen(state);
    } else if (!this.isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(state);
    }
  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;
    if (!this.intervalId) {
      this.intervalId = setInterval(
        () => {
          this.update();
        },
        speed > 0 ? speed : 100
      );
    }
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case 40: //кнопка вниз
        this.startTimer();
        break;
    }
  }

  handleKeyDown(event) {
    const state = this.game.getState();
    switch (event.keyCode) {
      case 13: //Enter
        if (state.isGameOver) {
          this.reset();
        } else {
          this.play();
        }
        break;
      case 32: //пробел
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
        break;
      case 37: //левая стрелка
        this.game.movePieceLeft();
        this.updateView();
        break;
      case 38: //кнопка вверх
        this.game.rotatePiece();
        this.updateView();
        break;
      case 39: //кнопка вправо
        this.game.movePieceRight();
        this.updateView();
        break;
      case 40: //кнопка вниз
        this.stopTimer();
        this.game.movePieceDown();
        this.updateView();
        break;
    }
  }
}