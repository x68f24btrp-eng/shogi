//盤面のデータ管理をする

//ここを変えるとinitiakTypeも変わる　変えたやつがmoveRulesにないとダメ
let AAA = ['Q', 'K', 'R', 'B', 'G', 'S', 'N', 'L', 'P'];

let BBB = ['q', 'k', 'r', 'b', 'g', 's', 'n', 'l', 'p'];
//P:歩,L:香,N:桂,S:銀,G:金,B:角,R:飛,K:王,Q:玉

const AA = AAA[8];
const BB = AAA[7];
const CC = AAA[6];
const DD = AAA[5];
const EE = AAA[4];
const FF = AAA[3];
const GG = AAA[2];
const HH = AAA[1];
const II = AAA[0];
const aa = BBB[8];
const bb = BBB[7];
const cc = BBB[6];
const dd = BBB[5];
const ee = BBB[4];
const ff = BBB[3];
const gg = BBB[2];
const hh = BBB[1];
const ii = BBB[0];

const initialType = [
  bb,
  cc,
  dd,
  ee,
  ii,
  ee,
  dd,
  cc,
  bb,
  null,
  gg,
  null,
  null,
  null,
  null,
  null,
  ff,
  null,
  aa,
  aa,
  aa,
  aa,
  aa,
  aa,
  aa,
  aa,
  aa,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  AA,
  AA,
  AA,
  AA,
  AA,
  AA,
  AA,
  AA,
  AA,
  null,
  FF,
  null,
  null,
  null,
  null,
  null,
  GG,
  null,
  BB,
  CC,
  DD,
  EE,
  HH,
  EE,
  DD,
  CC,
  BB
];

const initialRestA = [...BBB, ...AAA];

const initialRestB = [...AAA, ...BBB];

import { fightBoard, restBoardA, restBoardB } from './game.js';
import { Cell } from './cell.js';
import { Piece } from './piece.js';
import { moveRules } from './piece.js';

export let pieceAttack = []; //{ moveable: [], truemoveable: [], overlapSama: [], overlapOppose: [] }
export let pieceData = []; //pieceIndexの順番にpieceクラスのインスタンスが入っている
export let boardData = []; //cellIndexの順番にcellクラスのインスタンスが入っている
let attackPA = [];
let attackPB = [];
let restData = [];

//将棋盤とそれ上の駒表示
initialType.forEach((data, _) => {
  const cell = new Cell(boardData.length);
  boardData.push(cell);
  fightBoard.appendChild(cell.element);
  cell.cssUpdate();
  cell.element.dataset.index = cell.cellIndex;
  if (data === null) return;
  const piece = new Piece(
    cell.cellIndex,
    pieceData.length,
    data.toUpperCase(),
    /[A-Z]/.test(data) ? 'playerA' : 'playerB'
  );
  pieceAttack.push({ moveable: [], truemoveable: [], overlapSame: [], overlapOppose: [] });
  piece.condition = 'fight';
  cell.intoPiece(piece);
  pieceData.push(piece);
});

//持ち駒置き場を描画　ここでは駒は描画しない（まだimg作ってない）
initialRestB.forEach(() => {
  const cell = new Cell(boardData.length);
  boardData.push(cell);
  restBoardB.appendChild(cell.element);
  cell.cssUpdate();
  cell.element.dataset.index = cell.cellIndex;
  restData.push([]);
});

//持ち駒置き場を描画　ここでは駒は描画しない（まだimg作ってない）
initialRestA.forEach(() => {
  const cell = new Cell(boardData.length);
  boardData.push(cell);
  restBoardA.appendChild(cell.element);
  cell.cssUpdate();
  cell.element.dataset.index = cell.cellIndex;
  restData.push([]);
});

const start = performance.now(); // 計測開始

//最初のpieceRelation更新
pieceData.forEach((data, _) => {
  nextMoveable(data, false, false);
});

for (let i = 0; i < 9; ++i) {
  attackPA.push(0);
  attackPB.push(0);
}

//最初の利きを計測
for (let i = 0; i < 81; ++i) {
  if (boardData[i].piece === null) continue;
  const index = boardData[i].piece.pieceIndex;
  if (boardData[i].piece.type === 'P') {
    if (boardData[i].piece.owner === 'playerA') attackPA[boardData[i].cellIndex % 9] += 1;
    else if (boardData[i].piece.owner === 'playerB') attackPB[boardData[i].cellIndex % 9] += 1;
  }
}

//console.log(boardData, pieceData, pieceAttack, restData, attackPA, attackPB);

const end = performance.now(); // 計測終了
console.log(`処理時間: ${end - start}ms`); //nextmoveable分ける？

//引数　そのコマ
function nextMoveable(Piece) {
  let slide = 'false';
  const type = Piece.evolution === true ? Piece.type + 'e' : Piece.type;
  let attackData = pieceAttack[Piece.pieceIndex];
  let x = Piece.location % 9;
  let y = Math.floor(Piece.location / 9);

  if (Piece.condition === 'fight') {
    for (let j = 0; j < 2; ++j) {
      moveRules[type][slide].forEach((data, _) => {
        let overlap = 0;
        let l = Piece.owner === 'playerA' ? 1 : -1;
        let targetx = x;
        let targety = y;
        while (true) {
          targetx += l * data[0];
          targety += l * data[1];

          if (targetx < 0 || 8 < targetx || targety < 0 || 8 < targety) {
            break;
          }
          const targeti = targety * 9 + targetx;
          const targetPiece = boardData[targeti].piece;

          if (targetPiece === null) {
            if (overlap === 0) attackData['moveable'].push(targeti);
            else if (overlap > 0) attackData['truemoveable'].push(targeti);

            if (slide === 'false') break;
          } else {
            if (overlap === 0) {
              if (targetPiece.owner === Piece.owner) {
                pieceAttack[targetPiece.pieceIndex]['overlapSame'].push(Piece.pieceIndex);
              } else if (targetPiece.owner !== Piece.owner) {
                attackData['moveable'].push(targeti);
                pieceAttack[targetPiece.pieceIndex]['overlapOppose'].push(Piece.pieceIndex);
              }
            } else attackData['truemoveable'].push(targeti);

            if (slide === 'false') break;
            ++overlap;
            if (overlap === 2) break;
          }
        }
      });
      slide = 'true';
    }
  } else if (Piece.condition === 'rest') {
    attackData['moveable'] = [];
    attackData['truemoveable'] = [];
    attackData['overlapSame'] = [];
    attackData['overlapOppose'] = [];
    let l = Piece.owner === 'playerA' ? 1 : -1;
    for (let j = 0; j < 81; ++j) {
      if (boardData[j].piece !== null) continue;
      slide = 'false';
      let x = j % 9;
      let y = Math.floor(j / 9);
      if (type === 'P') {
        if (Piece.owner === 'playerA' && attackPA[x] !== 0) continue;
        if (Piece.owner === 'playerB' && attackPB[x] !== 0) continue;
      }
      parent: for (let t = 0; t < 2; ++t) {
        const data = moveRules[type][slide];
        for (const d of data) {
          const targetx = x + l * d[0];
          const targety = y + l * d[1];

          if (0 <= targetx && targetx <= 8 && 0 <= targety && targety <= 8) {
            attackData['moveable'].push(j);
            break parent;
          }
        }
        slide = 'true';
      }
    }
  }
}

import { observer } from './game.js';

export function selectPiece(index, kinghand) {
  boardData[index].cssClass = 'hand';
  boardData[index].cssUpdate();
  const hand = index;
  let handPiece = boardData[index].piece;

  if (handPiece.condition === 'rest') nextMoveable(handPiece);

  let move = [];
  let aim = [];

  pieceAttack[handPiece.pieceIndex]['overlapOppose'].forEach((data, i) => {
    if (moveRules[pieceData[data].type].true.length !== 0) {
      aim.push(data);
    }
  });

  if (kinghand === true || aim.length > 0 || handPiece.type === 'K' || handPiece.type === 'Q') {
    const indexmoveable = [...pieceAttack[handPiece.pieceIndex]['moveable']];

    indexmoveable.forEach((data, i) => {
      pieceAttack.forEach((d, _) => {
        d['moveable'] = [];
        d['truemoveable'] = [];
        d['overlapSame'] = [];
        d['overlapOppose'] = [];
      });

      let targetPiece = boardData[data].piece;

      const retainTargetPiece = targetPiece === null ? null : targetPiece;
      //console.log(retainTargetPiece === null ? null : { ...targetPiece });
      if (retainTargetPiece !== null) targetPiece.condition = 'rest';
      const retainLocation = handPiece.location;
      handPiece.location = boardData[data].cellIndex;
      //配列そのものを書き換えないといけないからリモコンを渡す操作ではだめ 左辺は値を代入される本体が来ないと
      boardData[data].piece = handPiece;
      boardData[index].piece = null;

      pieceData.forEach((d, _) => {
        if (d.condition === 'fight') nextMoveable(d);
      });

      if (
        (observer.teban === 'playerA' && pieceAttack[pieceData[35].pieceIndex]['overlapOppose'].length === 0) ||
        (observer.teban === 'playerB' && pieceAttack[pieceData[4].pieceIndex]['overlapOppose'].length === 0)
      ) {
        move.push(data);
      }

      //移動させた駒を戻す
      boardData[index].piece = boardData[data].piece;
      //上とは違い変数に前に代入した値を戻す
      boardData[index].piece.location = retainLocation;
      boardData[data].piece = retainTargetPiece;
      if (retainTargetPiece !== null) targetPiece.condition = 'fight';
      //console.log(retainTargetPiece === null ? null : { ...targetPiece });
    });

    pieceAttack.forEach((data, _) => {
      data['moveable'] = [];
      data['truemoveable'] = [];
      data['overlapSame'] = [];
      data['overlapOppose'] = [];
    });

    pieceData.forEach((data, _) => nextMoveable(data));
  } else move = pieceAttack[handPiece.pieceIndex]['moveable'];

  move.forEach((data, _) => {
    boardData[data].cssClass = 'move';
    boardData[data].cssUpdate();
  });

  return [hand, move];
}

let AorB; //こいつを拡張
const playerChange = { playerA: 'playerB', playerB: 'playerA' };

//const exceptMoveRules = { false: [], true: [[]] };

//let update = []; //pieceAttackを更新する駒のpieceIndex

export function transfer(index, hand) {
  const handPiece = boardData[hand].piece;
  const targetPiece = boardData[index].piece;
  //成るかならないか
  AorB = handPiece.owner === 'playerA' ? [0, 1, 2] : [6, 7, 8];

  if (
    handPiece.condition === 'fight' &&
    handPiece.evolution === false &&
    handPiece.type !== 'G' &&
    handPiece.type !== 'K' &&
    handPiece.type !== 'Q' &&
    (AorB.includes(Math.floor(index / 9)) || AorB.includes(Math.floor(hand / 9))) &&
    confirm('成りますか？') === true
  )
    handPiece.evolution = true;

  //駒がいたら取る
  if (targetPiece !== null) {
    //持ち駒送りだけ
    AorB = targetPiece.owner === 'playerA' ? 'torestB' : 'torestA';
    restData[moveRules[targetPiece.type][AorB] - 80].push(targetPiece);
    targetPiece.owner = playerChange[targetPiece.owner];
    targetPiece.condition = 'rest';
    targetPiece.evolution = false;
    boardData[moveRules[targetPiece.type][AorB]].intoPiece(targetPiece);
    boardData[index].outofPiece();
  }

  if (hand > 80) {
    restData[hand - 80][0].condition = 'fight';
    boardData[index].intoPiece(restData[hand - 80][0]);
    boardData[index].piece.location = index;
    restData[hand - 80].shift();
    boardData[hand].outofPiece();
    if (restData[hand - 80].length > 0) {
      boardData[hand].piece = restData[hand - 80][0];
    }
  } else {
    handPiece.location = index;
    boardData[index].intoPiece(handPiece);
    boardData[hand].outofPiece();
  }

  //もうデータ上でも描画上でも動かし終わったから動かした後の駒をfightに変える

  pieceAttack.forEach((data, _) => {
    data['moveable'] = [];
    data['truemoveable'] = [];
    data['overlapSame'] = [];
    data['overlapOppose'] = [];
  });

  pieceData.forEach((data, _) => {
    if (data.condition === 'fight') nextMoveable(data);
  });

  for (let i = 0; i < 9; ++i) {
    attackPA[i] = 0;
    attackPB[i] = 0;
  }

  for (let i = 0; i < 81; ++i) {
    if (boardData[i].piece === null) continue;
    if (boardData[i].piece.type === 'P') {
      if (boardData[i].piece.owner === 'playerA') attackPA[boardData[i].cellIndex % 9] += 1;
      else if (boardData[i].piece.owner === 'playerB') attackPB[boardData[i].cellIndex % 9] += 1;
    }
  }
}

export function pile(teban) {
  let move = [];
  const retainPieceAttack = structuredClone(pieceAttack);
  for (let i = 0; i < pieceData.length; ++i) {
    if (pieceData[i].owner !== teban) continue;
    const indexmoveable = structuredClone(retainPieceAttack[pieceData[i].pieceIndex]['moveable']);

    for (const d of indexmoveable) {
      pieceAttack.forEach((dd, _) => {
        dd['moveable'] = [];
        dd['truemoveable'] = [];
        dd['overlapSame'] = [];
        dd['overlapOppose'] = [];
      });

      const retainTargetPiece = boardData[d].piece === null ? null : boardData[d].piece;
      if (retainTargetPiece !== null) boardData[d].piece.condition = 'rest';
      const retainLocation = pieceData[i].location;
      boardData[pieceData[i].location].piece = null;
      pieceData[i].location = boardData[d].cellIndex;
      boardData[d].piece = pieceData[i];
      //nullになっちゃってるけど玉にもnextmoveableしたい
      pieceData.forEach((dd, _) => {
        if (dd !== null && dd.owner !== teban && dd.condition === 'fight') {
          nextMoveable(dd);
        }
      });

      if (pieceData[i] !== null) {
        if (
          (teban === 'playerA' && pieceAttack[pieceData[35].pieceIndex]['overlapOppose'].length === 0) ||
          (teban === 'playerB' && pieceAttack[pieceData[4].pieceIndex]['overlapOppose'].length === 0)
        ) {
          move.push(d);
        }
      } else {
        if (
          (boardData[d].piece.type === 'K' || boardData[d].piece.type === 'Q') &&
          pieceAttack[boardData[d].piece.pieceIndex]['overlapOppose'].length === 0
        )
          move.push(d);
      }

      pieceData[i].location = retainLocation;
      boardData[pieceData[i].location].piece = boardData[d].piece;
      boardData[d].piece = retainTargetPiece;
      if (retainTargetPiece !== null) boardData[d].piece.condition = 'fight';

      if (move.length > 0) {
        pieceAttack.forEach((dd, _) => {
          dd['moveable'] = [];
          dd['truemoveable'] = [];
          dd['overlapSame'] = [];
          dd['overlapOppose'] = [];
        });

        pieceData.forEach((dd, _) => nextMoveable(dd));
        return true;
      }
    }
  }

  pieceAttack.forEach((d, _) => {
    d['moveable'] = [];
    d['truemoveable'] = [];
    d['overlapSame'] = [];
    d['overlapOppose'] = [];
  });

  pieceData.forEach((d, _) => nextMoveable(d));
  console.log('詰み');
  return false;
}
