class Board {

constructor() {
this.SIZE = 9;
this.reset();
}

piece(type, side, promoted=false){
return {type, side, promoted};
}

reset(){

this.board = [
[
this.piece("l","gote"),this.piece("n","gote"),this.piece("s","gote"),
this.piece("g","gote"),this.piece("k","gote"),this.piece("g","gote"),
this.piece("s","gote"),this.piece("n","gote"),this.piece("l","gote")
],
[null,this.piece("r","gote"),null,null,null,null,null,this.piece("b","gote"),null],
Array.from({length:9},()=>this.piece("p","gote")),
Array(9).fill(null),
Array(9).fill(null),
Array(9).fill(null),
Array.from({length:9},()=>this.piece("p","sente")),
[null,this.piece("b","sente"),null,null,null,null,null,this.piece("r","sente"),null],
[
this.piece("l","sente"),this.piece("n","sente"),this.piece("s","sente"),
this.piece("g","sente"),this.piece("k","sente"),this.piece("g","sente"),
this.piece("s","sente"),this.piece("n","sente"),this.piece("l","sente")
]
];

}

get(x,y){
return this.board[y][x];
}

set(x,y,p){
this.board[y][x]=p;
}

move(sx,sy,tx,ty){
const p=this.get(sx,sy);
this.set(tx,ty,p);
this.set(sx,sy,null);
}

}