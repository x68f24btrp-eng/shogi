const initialType = [
  'l',
  'n',
  's',
  'g',
  'k',
  'g',
  's',
  'n',
  'l',
  null,
  'r',
  null,
  null,
  null,
  null,
  null,
  'b',
  null,
  'p',
  'p',
  'p',
  'p',
  'p',
  'p',
  'p',
  'p',
  'p',
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
  'P',
  'P',
  'P',
  'P',
  'P',
  'P',
  'P',
  'P',
  'P',
  null,
  'B',
  null,
  null,
  null,
  null,
  null,
  'R',
  null,
  'L',
  'N',
  'S',
  'G',
  'K',
  'G',
  'S',
  'N',
  'L'
];

const trialType = [
  'l',
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
  'L'
];

const initialmoti_Y = [null, 'k', 'r', 'b', 'g', 's', 'n', 'l', 'p'];

const initialmoti_M = [null, 'K', 'R', 'B', 'G', 'S', 'N', 'L', 'P'];

const moveRules = {
  p: { false: [[0, 1]], true: [] },
  pe: {
    false: [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, 0],
      [1, 0],
      [0, -1]
    ],
    true: []
  },
  l: { false: [], true: [[0, 1]] },
  le: {
    false: [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, 0],
      [1, 0],
      [0, -1]
    ],
    true: []
  },
  n: {
    false: [
      [-1, 2],
      [1, 2]
    ],
    true: []
  },
  ne: {
    false: [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, 0],
      [1, 0],
      [0, -1]
    ],
    true: []
  },
  s: {
    false: [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, -1],
      [1, -1]
    ],
    true: []
  },
  se: {
    false: [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, 0],
      [1, 0],
      [0, -1]
    ],
    true: []
  },
  g: {
    false: [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, 0],
      [1, 0],
      [0, -1]
    ],
    true: []
  },
  k: {
    false: [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, 0],
      [1, 0],
      [-1, -1],
      [0, -1],
      [1, -1]
    ],
    true: []
  },
  b: {
    false: [],
    true: [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1]
    ]
  },
  be: {
    false: [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ],
    true: [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1]
    ]
  },
  r: {
    false: [],
    true: [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ]
  },
  re: {
    false: [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1]
    ],
    true: [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ]
  },
  P: { false: [[0, -1]], true: [] },
  Pe: {
    false: [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [0, 1]
    ],
    true: []
  },
  L: { false: [], true: [[0, -1]] },
  Le: {
    false: [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [0, 1]
    ],
    true: []
  },
  N: {
    false: [
      [-1, -2],
      [1, -2]
    ],
    true: []
  },
  Ne: {
    false: [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [0, 1]
    ],
    true: []
  },
  Se: {
    false: [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [0, 1]
    ],
    true: []
  },
  S: {
    false: [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 1],
      [1, 1]
    ],
    true: []
  },
  G: {
    false: [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [0, 1]
    ],
    true: []
  },
  K: {
    false: [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1]
    ],
    true: []
  },

  B: {
    false: [],
    true: [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1]
    ]
  },
  Be: {
    false: [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ],
    true: [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1]
    ]
  },
  R: {
    false: [],
    true: [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ]
  },
  Re: {
    false: [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1]
    ],
    true: [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ]
  }
};

let k_aim = false;

const boardElement = document.getElementById('board');
const yourBoard = document.getElementById('yourBoard');
const myBoard = document.getElementById('myBoard');

//typeとcssClassとownerの情報を追加
let boardData = initialType.map((name) => {
  if (name === null) return { type: null, cssClass: 'plane', owner: null };

  return {
    type: name,
    cssClass: 'plane',
    // 大文字ならme、小文字ならyou
    owner: /[B-S]/.test(name) ? 'me' : 'you'
  };
});

const initialcount = 0;

let motiDataM = initialmoti_M.map((name) => {
  if (name === null) return { type: null, cssClass: 'moti-plane', owner: null, number: null };

  return {
    type: name,
    cssClass: 'moti-plane',
    number: initialcount,
    owner: initialcount === 0 ? null : 'me'
  };
});

let motiDataY = initialmoti_Y.map((name) => {
  if (name === null) return { type: null, cssClass: 'moti-plane', owner: null, number: null };

  return {
    type: name,
    cssClass: 'moti-plane',
    number: initialcount,
    owner: initialcount === 0 ? null : 'you'
  };
});

//先手後手決め
const hurigoma = Math.floor(Math.random() * 2);
let zyunban;
if (hurigoma % 2 === 0) {
  zyunban = { me: 'sente', you: 'gote' };
} else {
  zyunban = { me: 'gote', you: 'sente' };
}

//なん手目か測定
let counter = 1;
let teban;

//将棋盤を作る
for (let i = 0; i < 9; ++i) {
  const cell = document.createElement('div');
  cell.classList.add('moti-plane');
  cell.dataset.type = 'motiY';
  cell.dataset.index = i;
  yourBoard.appendChild(cell);
}

for (let i = 0; i < 81; ++i) {
  const cell = document.createElement('div');
  cell.classList.add('plane');
  cell.dataset.type = 'board';
  cell.dataset.index = i;
  boardElement.appendChild(cell);
}

for (let i = 0; i < 9; ++i) {
  const cell = document.createElement('div');
  cell.classList.add('moti-plane');
  cell.dataset.type = 'motiM';
  cell.dataset.index = i;
  myBoard.appendChild(cell);
}

updateBoard();

//将棋盤をデータ通りにする
function updateBoard() {
  boardData.forEach((data, i) => {
    let cell = boardElement.children[i];
    cell.innerHTML = '';
    cell.className = data.cssClass;
    if (data.type !== null) {
      const piece = document.createElement('img');
      piece.classList.add('piece');
      cell.appendChild(piece);
      piece.src = `images/${data.owner}/${data.type}.png`;
    }
  });
}

//すべての持ち駒の描画処理  Storing(i) + 'M'
function updateMotiBoard() {
  motiDataM.forEach((data, i) => {
    let cell = myBoard.children[i];
    cell.innerHTML = '';
    cell.className = data.cssClass;
    if (data.number !== 0 && data.number !== null) {
      const piece = document.createElement('img');
      piece.classList.add('piece');
      cell.appendChild(piece);
      piece.src = `images/${data.owner}/${data.type}.png`;
    }
  });
  motiDataY.forEach((data, i) => {
    let cell = yourBoard.children[i];
    cell.innerHTML = '';
    cell.className = data.cssClass;
    if (data.number !== 0 && data.number !== null) {
      const piece = document.createElement('img');
      piece.classList.add('piece');
      cell.appendChild(piece);
      piece.src = `images/${data.owner}/${data.type}.png`;
    }
  });
}

//引数　駒の今いるindex番号　中でteban変数使ってる
function movable(i) {
  let slide = 'false';
  const x = i % 9;
  const y = Math.floor(i / 9);
  for (let j = 0; j < 2; ++j) {
    for (let t = 0; t < moveRules[boardData[i].type][slide].length; ++t) {
      let l = 1;
      while (true) {
        const targetx = x + l * moveRules[boardData[i].type][slide][t][0];
        const targety = y + l * moveRules[boardData[i].type][slide][t][1];
        if (targetx < 0 || 8 < targetx || targety < 0 || 8 < targety) {
          break;
        }
        const targeti = targety * 9 + targetx;
        if (zyunban[boardData[targeti].owner] === teban) {
          break;
        }
        boardData[targeti].cssClass = 'move';
        if ((boardData[targeti].owner !== null && zyunban[boardData[targeti].owner] !== teban) || slide === 'false') {
          break;
        }
        ++l;
      }
    }
    slide = 'true';
  }
}

//マスのcssClassのデータをすべてplaneにする
function cssPlane() {
  for (let i = 0; i < boardData.length; ++i) {
    if (boardData[i].cssClass !== 'plane') {
      boardData[i].cssClass = 'plane';
    }
  }
}

//マスのcssClassのデータをすべてshadeにする
function cssShade() {
  for (let i = 0; i < boardData.length; ++i) {
    if (boardData[i].cssClass !== 'shade') {
      boardData[i].cssClass = 'shade';
    }
  }
}

//マスのcssClassのデータをすべてmoveにする
function cssMove() {
  for (let i = 0; i < boardData.length; ++i) {
    if (boardData[i].cssClass !== 'move') {
      boardData[i].cssClass = 'move';
    }
  }
}

//持ち駒のマスのcssClassのデータをすべてmoti-planeにする
function cssMotiplane() {
  for (let i = 0; i < motiDataM.length; ++i) {
    if (motiDataM[i].cssClass !== 'moti-plane') {
      motiDataM[i].cssClass = 'moti-plane';
    }
  }
  for (let i = 0; i < motiDataY.length; ++i) {
    if (motiDataY[i].cssClass !== 'moti-plane') {
      motiDataY[i].cssClass = 'moti-plane';
    }
  }
}

//駒をとるデータ処理　引数　駒が動こうとしてるindex番号　中でteban変数使ってる
function rob(i) {
  //成り駒は一文字目だけで判定
  if (boardData[i].owner === 'you') {
    for (let j = 0; j < 9; ++j) {
      if (boardData[i].type.toUpperCase() === motiDataM[j].type) {
        motiDataM[j].number = motiDataM[j].number + 1;
        motiDataM[j].owner = 'me';
        break;
      }
    }
  } else {
    for (let j = 0; j < 9; ++j) {
      if (boardData[i].type.toLowerCase() === motiDataY[j].type) {
        motiDataY[j].number = motiDataY[j].number + 1;
        motiDataY[j].owner = 'you';
        break;
      }
    }
  }
}

//成るかどうかの判定真偽値を返す　 引数　移動しようとしているマス目のindex番号
function evolution(i) {
  let data;
  for (let j = 0; j < 81; ++j) {
    if (boardData[j].cssClass === 'hand') {
      data = boardData[j];
      break;
    }
  }
  if (data.type === 'G' || data.type === 'K' || data.type === 'g' || data.type === 'k') return false;
  if ([...data.type].length !== 1) return false;

  const toy = Math.floor(i / 9);

  if ((data.owner === 'me' && toy < 3) || (data.owner === 'you' && toy >= 6)) {
    if (nextMoveable(data.type, i).next === false) return true;
    return confirm('成りますか？');
  }
}

//引数　シングルコーテーション付きの駒の種類　戻り値　次移動できるマスがあるかないか
//　　　移動するindex番号　　typeはもじれつ　　　　　　　　　　　　　（true or false）
function nextMoveable(type, i) {
  let nextMoveable = [];
  let slide = 'false';
  const fromx = i % 9;
  const fromy = Math.floor(i / 9);

  for (let j = 0; j < 2; ++j) {
    moveRules[type][slide].forEach((data, index) => {
      let l = 1;
      while (true) {
        const tox = fromx + l * data[0];
        const toy = fromy + l * data[1];
        if (tox < 0 || 8 < tox || toy < 0 || 8 < toy) {
          break;
        }
        nextMoveable.push([9 * toy + tox]);
        ++l;
      }
    });
    slide = 'true';
  }
  if (nextMoveable.length === 0) {
    return { next: false, nextcell: nextMoveable };
  } else {
    return { next: true, nextcell: nextMoveable };
  }
}

//駒が盤上に打たれたり盤上を移動するときのデータ処理（成り処理を含む）
// 引数　駒がいこうとしてるcellのindex番号
function transfer(i) {
  let judge = null;
  for (let j = 0; j < 9; ++j) {
    if (motiDataY[j].cssClass === 'moti-hand') {
      judge = true;
      boardData[i].type = motiDataY[j].type;
      boardData[i].owner = motiDataY[j].owner;
      motiDataY[j].number -= 1;
      if (motiDataY[j].number === 0) {
        motiDataY[j].owner = null;
      }
      break;
    }
  }
  for (let j = 0; j < 9; ++j) {
    if (judge !== null) break;
    if (motiDataM[j].cssClass === 'moti-hand') {
      judge = true;
      boardData[i].type = motiDataM[j].type;
      boardData[i].owner = motiDataM[j].owner;
      motiDataM[j].number -= 1;
      if (motiDataM[j].number === 0) {
        motiDataM[j].owner = null;
      }
      break;
    }
  }
  for (let j = 0; j < 81; ++j) {
    if (judge !== null) break;
    if (boardData[j].cssClass === 'hand') {
      judge = true;
      if (evolution(i)) {
        boardData[i].type = boardData[j].type + 'e';
      } else {
        boardData[i].type = boardData[j].type;
      }
      boardData[i].owner = boardData[j].owner;
      boardData[j].type = null;
      boardData[j].owner = null;
      break;
    }
  }
}

//持ち駒から歩が打てる列を配列にして返す
function doubleP() {
  let dataMe = [];
  let dataYou = [];
  boardData.forEach((data, i) => {
    if (data.type === 'P') {
      dataMe.push(i % 9);
    } else if (data.type === 'p') {
      dataYou.push(i % 9);
    }
  });
  return { me: dataMe, you: dataYou };
}

boardElement.addEventListener('click', (event) => {
  const cell = event.target;

  if (!cell.dataset.index) return;

  const index = parseInt(cell.dataset.index);

  teban = counter % 2 === 1 ? 'sente' : 'gote';

  if (boardData[index].cssClass === 'plane') {
    if (boardData[index].type === null || zyunban[boardData[index].owner] !== teban) {
      cssPlane();
      cssMotiplane();
    } else {
      cssShade();
      boardData[index].cssClass = 'hand';
      movable(index);
      cssMotiplane();
    }
  } else if (boardData[index].cssClass === 'shade') {
    cssPlane();
  } else if (boardData[index].cssClass === 'hand') {
    cssPlane();
  } else if (boardData[index].cssClass === 'move') {
    //ここに持ち駒判定
    if (boardData[index].type !== null) {
      rob(index);
    }
    //ここからしたtransfer関数　　持ち駒から置くのにも対応できるように
    transfer(index);
    //ここになり判定
    cssMotiplane();
    cssPlane();
    ++counter;
  }
  updateBoard();
  updateMotiBoard();
});

yourBoard.addEventListener('click', (event) => {
  const cell = event.target;

  if (!cell.dataset.index) return;

  const index = parseInt(cell.dataset.index);

  if (motiDataY[index].number === 0) return;

  teban = counter % 2 === 1 ? 'sente' : 'gote';

  if (zyunban[motiDataY[index].owner] === teban) {
    if (motiDataY[index].cssClass === 'moti-plane') {
      cssMotiplane();
      motiDataY[index].cssClass = 'moti-hand';
      cssMove();
      boardData.forEach((data, i) => {
        if (data.owner !== null) {
          data.cssClass = 'plane';
          return;
        }
        if (nextMoveable(motiDataY[index].type, i).next === false) {
          data.cssClass = 'plane';
          return;
        }
        //二歩判定
        if (motiDataY[index].type === 'p' && doubleP()['you'].includes(i % 9)) {
          data.cssClass = 'plane';
          return;
        }
      });
    } else if (motiDataY[index].cssClass === 'moti-hand') {
      cssMotiplane();
      cssPlane();
    }
    updateMotiBoard();
    updateBoard();
  }
});

myBoard.addEventListener('click', (event) => {
  const cell = event.target;

  if (!cell.dataset.index) return;

  const index = parseInt(cell.dataset.index);

  if (motiDataM[index].number === 0) return;

  teban = counter % 2 === 1 ? 'sente' : 'gote';

  if (zyunban[motiDataM[index].owner] === teban) {
    if (motiDataM[index].cssClass === 'moti-plane') {
      cssMotiplane();
      motiDataM[index].cssClass = 'moti-hand';
      cssMove();
      boardData.forEach((data, i) => {
        if (data.owner !== null) {
          data.cssClass = 'plane';
          return;
        }
        if (nextMoveable(motiDataM[index].type, i).next === false) {
          data.cssClass = 'plane';
          return;
        }
        //二歩判定
        if (motiDataM[index].type === 'P' && doubleP()['me'].includes(i % 9)) {
          data.cssClass = 'plane';
          return;
        }
      });
    } else if (motiDataM[index].cssClass === 'moti-hand') {
      cssMotiplane();
      cssPlane();
    }
    updateMotiBoard();
    updateBoard();
  }
});
