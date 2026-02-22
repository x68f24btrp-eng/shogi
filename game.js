class Game {

constructor(){
this.board=new Board();
this.engine=new Engine(this.board);
this.turn="sente";
this.hands={sente:[],gote:[]};
}

move(sx,sy,tx,ty){

const p=this.board.get(sx,sy);
const target=this.board.get(tx,ty);

if(target){
target.side=this.turn;
target.promoted=false;
this.hands[this.turn].push(target);
}

this.board.move(sx,sy,tx,ty);

if(this.canPromote(p,sy,ty)){
if(confirm("成りますか？")){
p.promoted=true;
}
}

this.turn=this.turn==="sente"?"gote":"sente";
}

drop(type,x,y){

this.board.set(x,y,{type,side:this.turn,promoted:false});

const hand=this.hands[this.turn];
const index=hand.findIndex(p=>p.type===type);
hand.splice(index,1);

this.turn=this.turn==="sente"?"gote":"sente";
}

canPromote(p,sy,ty){
if(p.type==="k"||p.type==="g") return false;

if(p.side==="sente") return sy<=2 || ty<=2;
return sy>=6 || ty>=6;
}

}