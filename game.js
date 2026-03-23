//一局の進行を担当する、ゆくゆくはまったとかも

const gameBoard = document.getElementById('gameBoard');
export const fightBoard = document.getElementById('fightBoard');
export const restBoardB = document.getElementById('restB');
export const restBoardA = document.getElementById('restA');

const hurigoma = Math.random();
const sente = hurigoma < 0.5 ? 'playerA' : 'playerB';
const gote = sente === 'playerA' ? 'playerB' : 'playerA';

class Game {
  constructor() {
    this.teban = sente;
    this.counter = 1;
    this.record = [];
    this.end = false;
  }

  tebanUpdate() {
    this.teban = this.counter % 2 === 1 ? sente : gote;
  }
}

export const observer = new Game();

let hand = null; //cssがhandになっているマスのindex
let move = []; //cssがmoveになっているマスのindex

let kinghand = false;

import { boardData, pieceData, attackA, attackB, selectPiece, transfer, pile } from './board.js';

gameBoard.addEventListener('click', (event) => {
  if (observer.end === true) return;

  const cell = event.target;

  if (!cell.dataset.index) return;

  const index = parseInt(cell.dataset.index);

  if (boardData[index].cssClass === 'plane') {
    cssPlane();
    if (boardData[index].piece !== null && boardData[index].piece.owner === observer.teban) {
      const handmove = selectPiece(index, kinghand);
      hand = handmove[0];
      move = handmove[1];
    }
  } else if (boardData[index].cssClass === 'hand') {
    cssPlane();
  } else if (boardData[index].cssClass === 'move') {
    transfer(index, hand);
    cssPlane();
    //王手判定
    aimK();
    ++observer.counter;
    observer.tebanUpdate();

    if (kinghand === true && pile(observer.teban) === false) observer.end = true;

  }
});

//盤上のcssがplaneじゃないところをplaneにする
function cssPlane() {
  if (hand !== null) {
    boardData[hand].cssClass = 'plane';
    boardData[hand].cssUpdate();
  }

  move.forEach((data, _) => {
    boardData[data].cssClass = 'plane';
    boardData[data].cssUpdate();
  });
  hand = null;
  move = [];
}

function aimK() {
  if (observer.teban === 'playerA' && attackA[pieceData[4].location] !== 0) kinghand = true;
  else if (observer.teban === 'playerB' && attackB[pieceData[35].location] !== 0) kinghand = true;
  else kinghand = false;
}
