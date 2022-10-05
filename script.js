const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 6, 4],
];
const cellElement =
  document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');

const WinningMessageTextElement = document.querySelector(
  '[data-winning-message-text]'
);

const WinningMessageElement = document.querySelector(
  '#winningMessage'
);

const restartButton =
  document.getElementById('restartButton');

let circleTurn;

startGames();

restartButton.addEventListener('click', startGames);

function startGames() {
  circleTurn = false;
  cellElement.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, {
      once: true,
    });
  });
  setBoadrHoverClass();
  WinningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  //   chack winn
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoadrHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    WinningMessageTextElement.innerText = 'Draw';
  } else {
    WinningMessageTextElement.innerText = `${
      circleTurn ? "O's" : "X's"
    }Wins!`;
  }
  WinningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElement].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) ||
      cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}
function setBoadrHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElement[index].classList.contains(
        currentClass
      );
    });
  });
}
