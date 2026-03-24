//マスの担当をする

export class Cell {
  constructor(index) {
    this.cellIndex = index; //マス目の番号
    this.cssClass = 'plane'; //マス目に適応されているcssClass
    this.piece = null; //マス目の中にいるPieceクラス
    this.element = document.createElement('div'); //HTMLの箱が入ってる
    this.qty = 0;
  }

  //そのマスに駒のデータを渡して描画する　引数　Pieceクラスのインスタンス
  intoPiece(piece) {
    this.qty += 1;
    this.piece = piece;
    this.render();
  }

  outofPiece(piece) {
    //配列を作るtorestAとかは0～36に
    this.qty -= 1;
    if (this.qty === 0) this.piece = null;
    this.render();
  }

  //駒を描画し直す
  render() {
    this.element.innerHTML = '';
    if (this.piece === null) return;
    this.element.appendChild(this.piece.draw());
    if (this.qty <= 1) return;
    this.element.appendChild(this.number());
  }

  //cssClassを描画し直す
  cssUpdate() {
    this.element.className = this.cssClass;
  }

  number() {
    const number = document.createElement('div');
    number.classList.add('number');
    number.textContent = `${this.qty}`;
    return number;
  }
}
