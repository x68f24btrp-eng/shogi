//駒を担当する

export const moveRules = {
  P: { false: [[0, -1]], true: [], torestA: 108, torestB: 89 },
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
  L: { false: [], true: [[0, -1]], torestA: 107, torestB: 88 },
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
    true: [],
    torestA: 106,
    torestB: 87
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
    true: [],
    torestA: 105,
    torestB: 86
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
    true: [],
    torestA: 104,
    torestB: 85
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
    true: [],
    torestA: 101,
    torestB: 82
  },
  Q: {
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
    true: [],
    torestA: 100,
    torestB: 81
  },

  B: {
    false: [],
    true: [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1]
    ],
    torestA: 103,
    torestB: 84
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
    ],
    torestA: 102,
    torestB: 83
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

export class Piece {
  constructor(location, index, type, owner) {
    this.pieceIndex = index;
    this.type = type;
    this.owner = owner;
    this.location = location; //自分がいるマスの番号（cellIndex）
    this.evolution = false;
    this.condition = null;
  }

  draw() {
    const piece = document.createElement('img');
    piece.classList.add('piece');
    piece.src = `images/${this.owner}/${this.evolution === true ? this.type + 'e' : this.type}.png`;
    return piece;
  }
}
