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

let pieceAttack = []; //{ moveable: [], truemoveable: [], overlapSama: [], overlapOppose: [] }
export let pieceData = []; //pieceIndexの順番にpieceクラスのインスタンスが入っている
export let boardData = []; //cellIndexの順番にcellクラスのインスタンスが入っている
export let attackA = []; //81マスそれぞれにあるAの駒の利きの数
export let attackB = []; //81マスそれぞれにあるBの駒の利きの数
let count = 0;
let attackPA = [];
let attackPB = [];

//将棋盤とそれ上の駒表示
initialType.forEach((data, _) => {
  const cell = new Cell(boardData.length);
  boardData.push(cell);
  fightBoard.appendChild(cell.element);
  cell.cssUpdate();
  cell.element.dataset.index = cell.cellIndex;
  if (data === null) return;
  const piece = new Piece(cell.cellIndex, count, data.toUpperCase(), /[A-Z]/.test(data) ? 'playerA' : 'playerB');
  pieceAttack.push({ moveable: [], truemoveable: [], overlapSame: [], overlapOppose: [] });
  piece.condition = 'fight';
  cell.intoPiece(piece);
  pieceData.push(piece);
  ++count;
});

//持ち駒置き場を描画　ここでは駒は描画しない（まだimg作ってない）
initialRestB.forEach(() => {
  const cell = new Cell(boardData.length);
  boardData.push(cell);
  restBoardB.appendChild(cell.element);
  cell.cssUpdate();
  cell.element.dataset.index = cell.cellIndex;
});

//持ち駒置き場を描画　ここでは駒は描画しない（まだimg作ってない）
initialRestA.forEach(() => {
  const cell = new Cell(boardData.length);
  boardData.push(cell);
  restBoardA.appendChild(cell.element);
  cell.cssUpdate();
  cell.element.dataset.index = cell.cellIndex;
});

const start = performance.now(); // 計測開始

//最初のpieceRelation更新
pieceData.forEach((data, _) => {
  nextMoveable(data, false, false);
});

//利きを計測するために要素を81個つめる
boardData.forEach((data, i) => {
  if (i > 80) return;
  attackA.push(0);
  attackB.push(0);
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
  pieceAttack[index]['moveable'].forEach((data, i) => {
    if (boardData[i].piece.owner === 'playerA') attackA[data] += 1;
    else if (boardData[i].piece.owner === 'playerB') attackB[data] += 1;
  });
}

console.log(pieceAttack, attackPA, attackPB);

const end = performance.now(); // 計測終了
console.log(`処理時間: ${end - start}ms`); //nextmoveable分ける？

//引数　そのコマ
function nextMoveable(Piece, TorF1, TorF2) {
  let slide = 'false';
  let overlap = 0;
  const type = Piece.evolution === true ? Piece.type + 'e' : Piece.type;
  let attack = pieceAttack[Piece.pieceIndex];
  if (TorF1 === true) {
    attack['moveable'] = [];
    attack['truemoveable'] = [];
  }
  if (TorF2 === true) {
    attack['overlapSame'] = [];
    attack['overlapOppose'] = [];
  }

  let x = Piece.location % 9;
  let y = Math.floor(Piece.location / 9);
  if (Piece.condition === 'fight') {
    for (let j = 0; j < 2; ++j) {
      moveRules[type][slide].forEach((data, _) => {
        overlap = 0;
        let l = Piece.owner === 'playerA' ? 1 : -1;
        while (true) {
          const targetx = x + l * data[0];
          const targety = y + l * data[1];

          //console.log(x, y, l, data[1], targetx, targety);

          if (targetx < 0 || 8 < targetx || targety < 0 || 8 < targety) {
            break;
          }
          const targeti = targety * 9 + targetx;

          if (boardData[targeti].piece === null) {
            if (overlap === 0) attack['moveable'].push(targeti);
            else if (overlap > 0) attack['truemoveable'].push(targeti);
            if (slide === 'false') break;
            if (l > 0) ++l;
            else if (l < 0) --l;
            continue;
          }

          if (boardData[targeti].piece.owner === Piece.owner) {
            if (overlap === 0) pieceAttack[boardData[targeti].piece.pieceIndex]['overlapSame'].push(Piece.pieceIndex);
            else if (overlap > 0) attack['truemoveable'].push(targeti);

            if (slide === 'false') break;
            ++overlap;
            if (overlap === 2) break;
            if (l > 0) ++l;
            else if (l < 0) --l;
            continue;

            //break;
          }

          if (boardData[targeti].piece.owner !== Piece.owner) {
            if (overlap === 0) {
              attack['moveable'].push(targeti);
              pieceAttack[boardData[targeti].piece.pieceIndex]['overlapOppose'].push(Piece.pieceIndex);
            } else if (overlap > 0) attack['truemoveable'].push(targeti);

            if (slide === 'false') break;
            ++overlap;
            if (overlap === 2) break;
            if (l > 0) ++l;
            else if (l < 0) --l;
            continue;

            //break;
          }
        }
      });
      slide = 'true';
    }
  } else if (Piece.condition === 'rest') {
    let l = Piece.owner === 'playerA' ? 1 : -1;
    for (let j = 0; j < 81; ++j) {
      if (boardData[j].piece !== null) continue;
      let slide = 'false';
      let x = j % 9;
      let y = Math.floor(j / 9);
      if (type === 'P') {
        if (Piece.owner === 'playerA' && attackPA[x] !== 0) continue;
        if (Piece.owner === 'playerB' && attackPB[x] !== 0) continue;
      }
      parent: for (let t = 0; t < 2; ++t) {
        const data = moveRules[type][slide];
        for (let f = 0; f < data.length; ++f) {
          const targetx = x + l * data[f][0];
          const targety = y + l * data[f][1];

          //console.log(x, y, l, data[f][1], targetx, targety);

          if (0 <= targetx && targetx <= 8 && 0 <= targety && targety <= 8) {
            attack['moveable'].push(j);
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

  //nextMoveable(boardData[index].piece, true);
  //console.log(pieceAttack[boardData[index].piece.pieceIndex]);

  //console.log(boardData[index].piece.condition);

  if (boardData[index].piece.condition === 'rest') nextMoveable(boardData[index].piece, true, true);

  let move = [];

  if (kinghand === true) {
    const indexmoveable = [...pieceAttack[boardData[index].piece.pieceIndex]['moveable']];
    console.log(pieceAttack[boardData[index].piece.pieceIndex]['moveable']);

    indexmoveable.forEach((data, i) => {
      pieceAttack.forEach((d, _) => {
        d['moveable'] = [];
        d['truemoveable'] = [];
        d['overlapSame'] = [];
        d['overlapOppose'] = [];
      });

      console.log(boardData[data].piece, boardData[index].piece);

      const retainToPiece = boardData[data].piece === null ? null : pieceData[boardData[data].piece.pieceIndex];
      if (retainToPiece !== null) boardData[data].piece.condition = 'rest';
      const retainLocation = boardData[index].piece.location;
      boardData[index].piece.location = boardData[data].cellIndex;
      boardData[data].piece = boardData[index].piece;
      boardData[index].piece = null;

      console.log(boardData[data].piece, boardData[index].piece);

      pieceData.forEach((d, _) => {
        if (d.condition === 'fight') nextMoveable(d, false, false);
      });

      console.log(
        pieceAttack[pieceData[35].pieceIndex]['overlapOppose'],
        pieceAttack[pieceData[4].pieceIndex]['overlapOppose']
      );

      if (
        (observer.teban === 'playerA' && pieceAttack[pieceData[35].pieceIndex]['overlapOppose'].length === 0) ||
        (observer.teban === 'playerB' && pieceAttack[pieceData[4].pieceIndex]['overlapOppose'].length === 0)
      ) {
        move.push(data);
      }

      boardData[index].piece = boardData[data].piece;
      boardData[index].piece.location = retainLocation;
      boardData[data].piece = retainToPiece;
      if (retainToPiece !== null) boardData[data].piece.condition = 'fight';
      console.log(boardData[data].piece, boardData[index].piece);
    });

    pieceAttack.forEach((d, _) => {
      d['moveable'] = [];
      d['truemoveable'] = [];
      d['overlapSame'] = [];
      d['overlapOppose'] = [];
    });

    pieceData.forEach((d, _) => nextMoveable(d, false, false));

    console.log(move);
    move.forEach((data, _) => {
      boardData[data].cssClass = 'move';
      boardData[data].cssUpdate();
    });

    console.log(pieceAttack[boardData[index].piece.pieceIndex]['moveable']);
  } else if (kinghand === false) {
    let aim = [];

    pieceAttack[boardData[index].piece.pieceIndex]['overlapOppose'].forEach((data, i) => {
      if (moveRules[pieceData[data].type].true.length !== 0) {
        aim.push(data);
      }
    });

    let scope;
    let dx1;
    let dy1;

    parent: for (const d of aim) {
      for (const dd of pieceAttack[d]['truemoveable']) {
        if (
          (boardData[index].piece.owner === 'playerA' && pieceData[35].location === dd) ||
          (boardData[index].piece.owner === 'playerB' && pieceData[4].location === dd)
        ) {
          scope = d;

          let Ex = pieceData[scope].location % 9;
          let Ey = Math.floor(pieceData[scope].location / 9);

          let Px = pieceData[index].location % 9;
          let Py = Math.floor(pieceData[index].location / 9);

          dx1 = Px - Ex;
          if (dx1 !== 0) dx1 = dx1 / Math.abs(dx1);
          dy1 = Py - Ey;
          if (dy1 !== 0) dy1 = dy1 / Math.abs(dy1);

          console.log(Px, Py, Ex, Ey, dx1, dy1);

          break parent;
        }
      }
    }

    let between = [];

    if (scope !== undefined && scope !== null) {
      let Kx;
      let Ky;
      if (pieceData[scope].owner === 'playerA') {
        Kx = pieceData[4].location % 9;
        Ky = Math.floor(pieceData[4].location / 9);
      } else if (pieceData[scope].owner === 'playerB') {
        Kx = pieceData[35].location % 9;
        Ky = Math.floor(pieceData[35].location / 9);
      }
      let Ex = pieceData[scope].location % 9;
      let Ey = Math.floor(pieceData[scope].location / 9);
      let dx = Kx - Ex;
      if (dx !== 0) dx = dx / Math.abs(dx);
      let dy = Ky - Ey;
      if (dy !== 0) dy = dy / Math.abs(dy);
      console.log(Kx, Ky, Ex, Ey, dx, dy);
      if (dx1 === dx && dy1 === dy) {
        let moveRule;
        for (const data of moveRules[pieceData[scope].type]['true']) {
          if (data[0] === dx && data[1] === dy) {
            moveRule = data;
            break;
          }
        }
        while (true) {
          between.push(9 * Ey + Ex);
          Ex += moveRule[0];
          Ey += moveRule[1];
          if (Ex === Kx && Ey === Ky) break;
        }
      }
    }

    //その走りごまのtruemoveableに味方の王がいるマスがあって　（王手になる可能性のある走りごまを特定）
    //その走りごまと自玉の間のマスをリストアップ

    if (boardData[index].piece.type === 'k' || boardData[index].piece.type === 'Q') {
      pieceAttack[boardData[index].piece.pieceIndex]['moveable'].forEach((data, _) => {
        if (
          (boardData[index].piece.owner === 'playerA' && attackB[data] === 0) ||
          (boardData[index].piece.owner === 'playerB' && attackA[data] === 0)
        ) {
          boardData[data].cssClass = 'move';
          boardData[data].cssUpdate();
          move.push(data);
          console.log(move);
        }
      });
    } else if (between.length !== 0) {
      pieceAttack[boardData[index].piece.pieceIndex]['moveable'].forEach((data, _) => {
        if (between.includes(data)) {
          boardData[data].cssClass = 'move';
          boardData[data].cssUpdate();
          move.push(data);
        }
      });
    } else {
      pieceAttack[boardData[index].piece.pieceIndex]['moveable'].forEach((data, _) => {
        boardData[data].cssClass = 'move';
        boardData[data].cssUpdate();
        move.push(data);
      });
    }
  }

  //console.log(attackA);

  return [hand, move];
}

function attackUpdate(i) {
  const piece = boardData[i].piece;
  if (piece.condition === 'fight') {
    if (piece.owner === 'playerA') {
      attackA.forEach((data, index) => {
        data.includes(piece.index);
      });
    }
  }
}

let AorB;
const playerChange = { playerA: 'playerB', playerB: 'playerA' };

//const exceptMoveRules = { false: [], true: [[]] };

let update = []; //pieceAttackを更新する駒のpieceIndex

export function transfer(index, hand) {
  //成るかならないか
  AorB = boardData[hand].piece.owner === 'playerA' ? [0, 1, 2] : [6, 7, 8];

  if (
    boardData[hand].piece.condition === 'fight' &&
    boardData[hand].piece.evolution === false &&
    boardData[hand].piece.type !== 'G' &&
    boardData[hand].piece.type !== 'K' &&
    boardData[hand].piece.type !== 'Q' &&
    (AorB.includes(Math.floor(index / 9)) || AorB.includes(Math.floor(hand / 9))) &&
    confirm('成りますか？') === true
  )
    boardData[hand].piece.evolution = true;

  //駒がいたら取る
  if (boardData[index].piece !== null) {
    //持ち駒送りだけ
    AorB = boardData[index].piece.owner === 'playerA' ? 'torestB' : 'torestA';
    boardData[index].piece.owner = playerChange[boardData[index].piece.owner];
    boardData[index].piece.condition = 'rest';
    boardData[index].piece.evolution = false;
    boardData[moveRules[boardData[index].piece.type][AorB]].intoPiece(boardData[index].piece);
    boardData[index].outofPiece(boardData[index].piece);
  } else if (hand > 80) boardData[hand].piece.condition = 'fight';

  boardData[hand].piece.location = index;
  boardData[index].intoPiece(boardData[hand].piece);
  boardData[hand].outofPiece();

  pieceData.forEach((_, i) => {
    pieceAttack[i]['moveable'] = [];
    pieceAttack[i]['truemoveable'] = [];
    pieceAttack[i]['overlapSame'] = [];
    pieceAttack[i]['overlapOppose'] = [];
  });

  pieceData.forEach((data, _) => {
    if (data.condition === 'fight') nextMoveable(data, false, false); //ここ解決する
  });

  for (let i = 0; i < 81; ++i) {
    attackA[i] = 0;
    attackB[i] = 0;
  }

  for (let i = 0; i < 9; ++i) {
    attackPA[i] = 0;
    attackPB[i] = 0;
  }

  for (let i = 0; i < 81; ++i) {
    if (boardData[i].piece === null) continue;
    const indexx = boardData[i].piece.pieceIndex;
    if (boardData[i].piece.type === 'P') {
      if (boardData[i].piece.owner === 'playerA') attackPA[boardData[i].cellIndex % 9] += 1;
      else if (boardData[i].piece.owner === 'playerB') attackPB[boardData[i].cellIndex % 9] += 1;
    }
    pieceAttack[indexx]['moveable'].forEach((data, _) => {
      if (boardData[i].piece.owner === 'playerA') attackA[data] += 1;
      if (boardData[i].piece.owner === 'playerB') attackB[data] += 1;
    });
  }
  //console.log(attackPA, attackPB);
}

export function pile(teban) {
  let move = [];
  const retainPieceAttack = structuredClone(pieceAttack);
  for (let data of pieceData) {
    //if (data.owner !== teban) continue;
    const indexmoveable = [...retainPieceAttack[data.pieceIndex]['moveable']];
    //console.log(indexmoveable);
    //console.log(pieceAttack[data.pieceIndex]['moveable']);

    for (const d of indexmoveable) {
      pieceAttack.forEach((dd, _) => {
        dd['moveable'] = [];
        dd['truemoveable'] = [];
        dd['overlapSame'] = [];
        dd['overlapOppose'] = [];
      });
      const retainToPiece = boardData[d].piece === null ? null : { ...boardData[d].piece };
      //console.log(retainToPiece, boardData[d].piece);

      if (retainToPiece !== null) boardData[d].piece.condition = 'rest';
      const retainLocation = data.location;
      data.location = boardData[d].cellIndex;
      boardData[d].piece = data;
      data = null;
      pieceData.forEach((dd, _) => {
        if (dd.owner !== teban && dd.condition === 'fight') {
          nextMoveable(dd, false, false);
          //console.log(dd);
        }
      });
      //console.log(
      //pieceAttack[pieceData[35].pieceIndex]['overlapOppose'],
      //pieceAttack[pieceData[4].pieceIndex]['overlapOppose']
      //);
      if (
        (teban === 'playerA' && pieceAttack[pieceData[35].pieceIndex]['overlapOppose'].length === 0) ||
        (teban === 'playerB' && pieceAttack[pieceData[4].pieceIndex]['overlapOppose'].length === 0)
      ) {
        move.push(d);
      }

      data = boardData[d].piece;
      data.location = retainLocation;
      boardData[d].piece = retainToPiece;
      if (retainToPiece !== null) boardData[d].piece.condition = 'fight';

      if (move.length > 0) {
        pieceAttack = structuredClone(retainPieceAttack);

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

  pieceData.forEach((d, _) => nextMoveable(d, false, false));
  console.log('hi', pieceAttack);
  return false;
}
