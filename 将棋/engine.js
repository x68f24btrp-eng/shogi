class Engine {

constructor(board){
this.board = board;
}

inside(x,y){
return x>=0 && y>=0 && x<9 && y<9;
}

addMove(list,x,y,side){
if(!this.inside(x,y)) return false;

const t=this.board.get(x,y);

if(!t){
list.push({x,y});
return true;
}

if(t.side!==side){
list.push({x,y});
}

return false;
}

slide(list,x,y,dx,dy,side){
for(let i=1;i<9;i++){
if(!this.addMove(list,x+dx*i,y+dy*i,side)) break;
}
}

getMoves(x,y,p){

const moves=[];
const dir=p.side==="sente"?-1:1;

if(p.promoted && p.type!=="r" && p.type!=="b"){
this.goldMoves(moves,x,y,p.side);
return moves;
}

switch(p.type){

case "p":
this.addMove(moves,x,y+dir,p.side);
break;

case "k":
for(let dx=-1;dx<=1;dx++)
for(let dy=-1;dy<=1;dy++)
if(dx||dy)this.addMove(moves,x+dx,y+dy,p.side);
break;

case "g":
this.goldMoves(moves,x,y,p.side);
break;

case "s":
this.addMove(moves,x,y+dir,p.side);
this.addMove(moves,x-1,y+dir,p.side);
this.addMove(moves,x+1,y+dir,p.side);
this.addMove(moves,x-1,y-dir,p.side);
this.addMove(moves,x+1,y-dir,p.side);
break;

case "l":
this.slide(moves,x,y,0,dir,p.side);
break;

case "n":
this.addMove(moves,x-1,y+dir*2,p.side);
this.addMove(moves,x+1,y+dir*2,p.side);
break;

case "r":
this.slide(moves,x,y,1,0,p.side);
this.slide(moves,x,y,-1,0,p.side);
this.slide(moves,x,y,0,1,p.side);
this.slide(moves,x,y,0,-1,p.side);
if(p.promoted){
this.addMove(moves,x+1,y+1,p.side);
this.addMove(moves,x-1,y+1,p.side);
this.addMove(moves,x+1,y-1,p.side);
this.addMove(moves,x-1,y-1,p.side);
}
break;

case "b":
this.slide(moves,x,y,1,1,p.side);
this.slide(moves,x,y,-1,1,p.side);
this.slide(moves,x,y,1,-1,p.side);
this.slide(moves,x,y,-1,-1,p.side);
if(p.promoted){
this.addMove(moves,x+1,y,p.side);
this.addMove(moves,x-1,y,p.side);
this.addMove(moves,x,y+1,p.side);
this.addMove(moves,x,y-1,p.side);
}
break;
}

return moves;
}

goldMoves(list,x,y,side){
const dir=side==="sente"?-1:1;
this.addMove(list,x,y+dir,side);
this.addMove(list,x-1,y+dir,side);
this.addMove(list,x+1,y+dir,side);
this.addMove(list,x-1,y,side);
this.addMove(list,x+1,y,side);
this.addMove(list,x,y-dir,side);
}

isNifu(x,side){
for(let y=0;y<9;y++){
const p=this.board.get(x,y);
if(p && p.side===side && p.type==="p" && !p.promoted){
return true;
}
}
return false;
}

findKing(side){
for(let y=0;y<9;y++)
for(let x=0;x<9;x++){
const p=this.board.get(x,y);
if(p && p.type==="k" && p.side===side){
return {x,y};
}
}
}

isCheck(side){
const king=this.findKing(side);

for(let y=0;y<9;y++)
for(let x=0;x<9;x++){
const p=this.board.get(x,y);
if(p && p.side!==side){
const moves=this.getMoves(x,y,p);
if(moves.some(m=>m.x===king.x && m.y===king.y)){
return true;
}
}
}
return false;
}

}