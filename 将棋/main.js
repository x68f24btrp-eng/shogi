const game=new Game();

const boardEl=document.getElementById("board");
const turnEl=document.getElementById("turn");
const sHand=document.getElementById("senteHand");
const gHand=document.getElementById("goteHand");

let selected=null;
let legalMoves=[];
let handPiece=null;

function img(p){
let name=p.type;
if(p.promoted) name+="_promoted";
return `images/${p.side}/${name}.png`;
}

function render(){

turnEl.textContent="手番: "+(game.turn==="sente"?"先手":"後手");

renderBoard();
renderHands();

}

function renderBoard(){

boardEl.innerHTML="";

for(let y=0;y<9;y++){
for(let x=0;x<9;x++){

const cell=document.createElement("div");
cell.className="cell";

if(selected && selected.x===x && selected.y===y){
cell.classList.add("selected");
}

if(legalMoves.some(m=>m.x===x && m.y===y)){
cell.classList.add("move");
}

const p=game.board.get(x,y);

if(p){
const i=document.createElement("img");
i.src=img(p);
cell.appendChild(i);
}

cell.onclick=()=>clickCell(x,y);
boardEl.appendChild(cell);

}
}
}

function renderHands(){

sHand.innerHTML="";
gHand.innerHTML="";

game.hands.sente.forEach(p=>{
const i=document.createElement("img");
i.src=img(p);
i.onclick=()=>selectHand(p);
sHand.appendChild(i);
});

game.hands.gote.forEach(p=>{
const i=document.createElement("img");
i.src=img(p);
i.onclick=()=>selectHand(p);
gHand.appendChild(i);
});

}

function selectHand(p){
if(p.side!==game.turn) return;
handPiece=p;
legalMoves=getDropMoves(p);
selected=null;
render();
}

function getDropMoves(p){

const moves=[];

for(let y=0;y<9;y++)
for(let x=0;x<9;x++){

if(game.board.get(x,y)) continue;

if(p.type==="p" && game.engine.isNifu(x,game.turn)) continue;

moves.push({x,y});
}

return moves;
}

function clickCell(x,y){

if(handPiece){
if(legalMoves.some(m=>m.x===x && m.y===y)){
game.drop(handPiece.type,x,y);
handPiece=null;
legalMoves=[];
render();
}
return;
}

const p=game.board.get(x,y);

if(selected){
if(legalMoves.some(m=>m.x===x && m.y===y)){
game.move(selected.x,selected.y,x,y);
selected=null;
legalMoves=[];
render();
return;
}
}

if(p && p.side===game.turn){
selected={x,y};
legalMoves=game.engine.getMoves(x,y,p);
}else{
selected=null;
legalMoves=[];
}

render();

}

render();