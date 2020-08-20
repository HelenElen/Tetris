import Game from "./src/game.js";
import View from "./src/view.js";

const root = document.querySelector("#root");

const game = new Game();
const view = new View(root, 320, 640, 20, 10);

window.game = game; //добавляем в глобальное пространство имен
window.view = view;

document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37: //левая стрелка
      game.movePieceLeft();
      view.render(game.getState());
      break;
    case 38: //кнопка вверх
      game.rotatePiece();
      view.render(game.getState());
      break;
    case 39: //кнопка вправо
      game.movePieceRight();
      view.render(game.getState());
      break;
    case 40: //кнопка вниз
      game.movePieceDown();
      view.render(game.getState());
      break;
  }
});

