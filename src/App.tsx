import { useState } from 'react'
import {Button} from '@mui/material/';


function App() {
 const[X, setX] = useState([0,1,2,3,4,5,6,7,8]);
 const S = 3;

 function Piece({value, i}){
  const size = 100; 
  const gap = 5;
  const x = gap + (size + gap) *(i%S);
  const y = gap + (size + gap) *Math.floor(i/S);

  return (
  <g  onClick={()=>click(i)} >
  <rect 
  x = {x} y = {y} width={size} height={size}
  stroke='black' fill='ivory'></rect>
  <text fill="red" x={x + 50} y={y + 50}>{value}</text>
  </g>
  )
 }

 function Board(){
  const pieces = []; //空の配列
  for (let k=0; k<S*S; k++){
    const value = X[k];
    if(X[k] !== 0){
      pieces.push(<Piece i={k} value={value} i={k}></Piece>);
    }
  }
  return(
    <>
      <rect width={320} height={320} fill="pink">
      </rect>
      {pieces}
    </>
  )
}

function click(i:number){
  const copyX = [...X];
  const dirs = [north(i), south(i), west(i), east(i)];

    if(copyX[north(i)] == 0){
      copyX[north(i)] = copyX[i];
      copyX[i] = 0; 
    }
    else if(copyX[south(i)]==0){
      copyX[south(i)] = copyX[i];
      copyX[i] = 0; 
    }
    else if(copyX[west(i)]==0){
      copyX[west(i)] = copyX[i];
      copyX[i] = 0; 
    }
    else if(copyX[east(i)]==0){
      copyX[east(i)] = copyX[i];
      copyX[i] = 0; 
    }

    setX(copyX);
}

function idx2pos(i:number){
  return {r:Math.floor(i/3), c:i % 3}; //dictionaryの書き方
}

function north(i){
  const pos = idx2pos(i);

  if(pos.r <= 0) return -1;
  return (pos.r - 1) * 3 + pos.c;
}
function south(i){
  const pos = idx2pos(i);

  if(pos.r >= 2) return -1;
  return (pos.r +1) * 3 + pos.c;
}
function west(i){
  const pos = idx2pos(i);

  if(pos.c <= 0) return -1;
  return pos.r * 3 + (pos.c - 1);
}
function east(i){
  const pos = idx2pos(i);

  if(pos.c >= 2) return -1;
  return pos.r * 3 + (pos.c + 1);
}

function shuffle(){
  const copyX = [...X];
  const newX = [];

  while(copyX.length > 0){
    const k = Math.floor(Math.random() * copyX.length);

    newX.push(copyX.splice(k, 1)[0]);
  }

  setX(newX);
}

function Shuffle(){
  return(
    <g onClick={shuffle}>
       <rect x={400} y={400} width={100} height={50}
          fill="skyblue">
        </rect>
        <text x={450} y={430} textAnchor="middle" fontSize="20" fill="black">shuffle</text>
    </g>
  )
}

function completed(){
  for(let i=0; i<X.length-1; i++){
    if(X[i] != (i+1)%9 ) return false;
  }

  return true;
}

function Finished(){
  if (completed()){
    return(<h1>完成です。おめでとうございます。</h1>)
  }
  else{
    return(<h1>未完成です。頑張ってください。</h1>)
  }
}

 return(
  <>
    <Finished></Finished>
    <svg width={800} height={800}>
      <Board></Board>
      <Shuffle></Shuffle>
      
    </svg>
  </>
 )
}

export default App
