'use client';

import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import "tailwindcss/tailwind.css";

let width:number = 5, length:number = 5;
let blacklists: number[] = [];
let blacklistName: string[] = [];
let nameList: string[] = [];
let nonelist: number[] = [];
let isNumber = true;
let none = "";
let names = "";
let blacklistInputStr = "";
let noneTables: number[] = [];
let blacklistsTable: number[] = []
let tableList: HTMLElement[] = [];
let numlist: number[] = [];
for (let i = 1; i <= 25; i++) {
  numlist.push(i);
}
let isRunning = false;

let max = 25;

let plingSound = new Audio("./pling.mp3");

export default function Main() {
  let [seatAmount, setAmount] = useState(25);

  return (
    <div className='pointer-events-auto h-screen'>
      <nav className='border-box border-2 bg-brown text-2xl w-screen h-10 text-start border-brown fixed'>
        자리추첨 <b><span className='text-[#f5d442]'>{seatAmount}자리</span></b> - 살레시오중학교
      </nav>
      <br /><br />
      <div >
        <span className='ml-3'>열 : </span><input type="number" id='가로' placeholder='가로' className='rounded-lg border-2 outline-none border-thickbrown text-center mx-3 text-black ' min={1} max={10} defaultValue={5} onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (+event.target.value > 10) {
            event.target.value = "10"
          }
          width = +event.target.value;
          numlist = [];
          for (let i = 1; i <= width * length; i++) {
            numlist.push(i);
          }
          max = width * length;
          (document.getElementById("max")!! as HTMLInputElement).value = (width * length).toString();
          setAmount((width * length));
        }}/>
        행 : <input type="number" id='세로' placeholder='세로' className='rounded-lg border-2 outline-none border-thickbrown mx-2 text-center text-black' min={1} max={10} defaultValue={5} onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (+event.target.value > 10) {
            event.target.value = "10"
          }
          length = +event.target.value
          numlist = [];
          for (let i = 1; i <= width * length; i++) {
            numlist.push(i);
          }

          max = width * length;
          (document.getElementById("max")!! as HTMLInputElement).value = (width * length).toString();
          setAmount((width * length));
          }}/><br className='xl:hidden 2xl:hidden'/><button className='rounded-lg border-4 border-brown bg-brown hover:bg-justbrown hover:border-justbrown my-3 transition-colors mx-3 h-[20]' id="change" onClick={
            () => {
              if (isNumber) {
                (document.getElementById("numberorname") as HTMLInputElement)!!.placeholder = "이름(쉼표 구분)";
                isNumber = false;
                document.getElementById("change")!!.innerText = "⇄번호로 추첨";
                document.getElementById("max")!!.style.display = "none";
                document.getElementById("text")!!.style.display = "none";
              } else {
                (document.getElementById("numberorname") as HTMLInputElement)!!.placeholder = "없는 번호(쉼표 구분)";
                isNumber = true;
                document.getElementById("change")!!.innerText = "⇄이름으로 추첨";
                document.getElementById("max")!!.style.display = "inline";
                document.getElementById("text")!!.style.display = "inline";
              }
            }
          }>⇄이름으로 추첨</button>
          <br className='xl:hidden 2xl:hidden'/><span className='ml-3' id="text">마지막 번호 : </span>
          <input id="max" type="number" className='rounded-lg border-2 outline-none border-thickbrown text-center mx-3 text-black w-[120px]' min={1} max={100} defaultValue={25} placeholder="마지막 번호" onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (+event.target.value > 100) {
              event.target.value = "100";
            }            
            max = +event.target.value;
            numlist = [];
            for (let i = 1; i <= (+event.target.value); i++) {
              numlist.push(i);
            }
          }
          }></input> <br className='xl:hidden 2xl:hidden'/>
          <input id="numberorname" type='text' className='rounded-lg border-2 outline-none border-thickbrown text-center mx-3 text-black my-2'  placeholder={"없는 번호(쉼표 구분)"} onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (isNumber) none = event.target.value;
            else names = event.target.value;
          }}/><br className='xl:hidden 2xl:hidden'/> <input id="blacklist" type='text' className='rounded-lg border-2 outline-none border-thickbrown text-center mx-3 text-black my-2'  placeholder={"사방신(쉼표 구분)"} onChange={(event: ChangeEvent<HTMLInputElement>) => {
            blacklistInputStr = event.target.value
          }}/> <br className='xl:hidden 2xl:hidden'/><br className='xl:hidden 2xl:hidden'/>
        <button className='rounded-lg border-4 border-brown bg-brown hover:bg-justbrown hover:border-justbrown transition-colors mx-3' onClick={
            (event) => {
              if (isNumber) {
                let nonList = none.split(',');
                let blacklist = blacklistInputStr.split(',');
                if ((nonList.filter((int: string) => Number.isNaN(Number(int))).length == 0 || none.length == 0) 
                && (blacklist.filter((int: string) => Number.isNaN(Number(int))).length == 0 || blacklistInputStr.length == 0)
                ) {
                  if ((none.length != 0 && nonList.filter((str: string) => { return str == '' }).length != 0) || (blacklistInputStr.length != 0 && blacklist.filter((str: string) => { return str == '' }).length != 0)) {
                    alert("숫자를 입력해주세요");
                    return;
                  } 
                  if (none.length == 0) nonList.pop();
                  if (blacklistInputStr.length == 0) blacklist.pop();
                  if (nonList.filter((str: string) => { return !numlist.includes(Number(str)) }).length != 0) {
                    alert("없는 번호 칸에 입력된 번호가 포함되지 않았습니다");
                    return;
                  }
                  if (blacklist.filter((str: string) => { return !numlist.includes(Number(str)) }).length != 0) {
                    alert("사방신의 번호가 포함되지 않았습니다");
                    return;
                  }
                  if (blacklist.filter((str: string) => { return nonList.includes(str) }).length != 0) {
                    alert("사방신의 번호는 없는 번호입니다");
                    return;
                  }

                  disable(event);
                  for (let i = 0; i < width*length; i++) {
                    const tableElement = document.createElement("div");
                    tableElement.className = "rounded-lg inline-block p-0 my-[5px] bg-thickbrown border-thickbrown text-center text-2xl h-[75px] mx-[3px] float-left leading-[70px] shadow-md transition-colors";
                    tableElement.id = `table{${i}}`;
                    tableElement.onclick = (event) => {
                      if (isRunning) return
                      if (event.button == 0 && event.shiftKey) {
                        if (noneTables.includes(i)) {
                          return
                        } 
                        if (blacklistsTable.includes(i)) {
                          blacklistsTable.splice(noneTables.findIndex((x) => x == i), 1);
                          (event.target as HTMLDivElement).style.background = "#cc6f18";
                          (event.target as HTMLDivElement).style.borderColor = "#cc6f18";
                          (event.target as HTMLDivElement).style.color = "black";
                          
                          
                        } else {
                          blacklistsTable.push(i);
                          (event.target as HTMLDivElement).style.background = "black";
                          (event.target as HTMLDivElement).style.borderColor = "black";
                          (event.target as HTMLDivElement).style.color = "white";
                          
                        }
                      } else if (event.button == 0) {
                        if (blacklistsTable.includes(i)) {
                          return
                        } 
                        if (noneTables.includes(i)) {
                          noneTables.splice(noneTables.findIndex((x) => x == i), 1);
                          (event.target as HTMLDivElement).style.opacity = "1"
                          setAmount(prev => prev + 1);
                          
                        } else {
                          noneTables.push(i);
                          (event.target as HTMLDivElement).style.opacity = "0.2"
                          setAmount(prev => prev - 1);
                        } 
                      }
                    }
                    tableList.push(tableElement);
                    document.getElementById("table")!!.appendChild(tableElement);   
                  } 
                  if (none.length != 0) {
                    nonelist.push(...nonList.map((str: string) => Number(str)));
                  }
                  if (blacklistInputStr.length != 0) {
                    blacklists.push(...blacklist.map((str: string) => Number(str)));
                  }
                  document.getElementById("run")!!.style.display = "inline";
                  
                } else {
                  alert("숫자를 입력해주세요");
                }
              } else {
                
                if (names.length == 0) {
                  alert("이름을 입력해주세요");
                  return
                }
                nameList = names.split(',');
                if (blacklistInputStr.length != 0) {
                  if (blacklistInputStr.split(',').filter((str: string) => { return !nameList.includes(str) }).length == 0) {
                    blacklistName = blacklistInputStr.split(',');
                  } else {
                    alert("사방신의 이름이 이름 입력칸에 포함되지 않았습니다");
                  }                  
                }
                disable(event);
                for (let i = 0; i < width*length; i++) {
                    const tableElement = document.createElement("div");
                    tableElement.className = "rounded-lg inline-block p-0 my-[5px] bg-thickbrown border-thickbrown text-center text-2xl h-[75px] mx-[3px] float-left leading-[70px] shadow-md transition-colors";
                    tableElement.id = `table{${i}}`;
                    tableElement.onclick = (event) => {
                      if (isRunning) return
                      if (event.button == 0 && event.shiftKey) {
                        if (noneTables.includes(i)) {
                          return
                        } 
                        if (blacklistsTable.includes(i)) {
                          blacklistsTable.splice(noneTables.findIndex((x) => x == i), 1);
                          (event.target as HTMLDivElement).style.background = "#cc6f18";
                          (event.target as HTMLDivElement).style.borderColor = "#cc6f18";
                          (event.target as HTMLDivElement).style.color = "black";
                          
                        } else {
                          blacklistsTable.push(i);
                          (event.target as HTMLDivElement).style.background = "black";
                          (event.target as HTMLDivElement).style.borderColor = "black";
                          (event.target as HTMLDivElement).style.color = "white";
                        }
                      } else if (event.button == 0) {
                        if (blacklistsTable.includes(i)) {
                          return
                        } 
                        if (noneTables.includes(i)) {
                          noneTables.splice(noneTables.findIndex((x) => x == i), 1);
                          (event.target as HTMLDivElement).style.opacity = "1";
                          setAmount(prev => prev + 1);
                        } else {
                          noneTables.push(i);
                          (event.target as HTMLDivElement).style.opacity = "0.2";
                          setAmount(prev => prev - 1);
                          
                        } 
                      }
                    }
                    tableList.push(tableElement);
                    document.getElementById("table")!!.appendChild(tableElement);   
                }
                blacklistName = blacklistInputStr.split(',');
            }
          }
          }>생성</button>
          <button id="run" className='hidden rounded-lg border-4 border-[#7cc900] bg-[#7cc900] hover:bg-[#28e602] hover:border-[#28e602] transition-colors mx-3' onClick={(event)=>{
            plingSound.play();
            if (isNumber) {
              if (blacklists.length != blacklistsTable.length) {
                alert("사방신의 수와 사방신의 자리의 수가 같지 않습니다");
              } else if (tableList.length - noneTables.length != max - nonelist.length) {
                alert("번호와 책상의 수가 일치하지 않습니다");
              } else  {
                const button = (event.target as HTMLButtonElement);
                button.disabled = true;
                button.style.borderColor = "gray";
                button.style.background = "gray";
                isRunning = true;
                tableList.forEach((x) => { x.innerText = "" })
                let _numlist: number[] = numlist.filter((x) => { return !nonelist.includes(x) });
                shuffle(_numlist);
                let count = 0;
                let _tl = tableList.filter((element) => { return !(element.style.opacity == "0.2" || element.style.background == "black") })
                let _bl = [...blacklists];
                let tbl = tableList.filter((element) => { return (element.style.background == "black") })
                shuffle(tbl)
                shuffle(_bl)
                shuffle(_tl)
                
                const shuffling = setInterval(() => {                  
                    if (_numlist.length != count) {
                    if (_bl.includes(_numlist[count])) {
                      tbl.pop()!!.innerText = `${_numlist[count]}번`;
                      _numlist.splice(count, 1);
                    } else {
                      _tl[count].innerText = `${_numlist[count]}번`;
                      count++;
                    }
                  } else {
                    clearInterval(shuffling);
                    isRunning = false;
                    button.disabled = false;
                    button.innerText = "↻재추첨";
                    button.style.borderColor = "red";
                    button.style.background = "red";
                  }
                }, 350);                
              }
            } else {
              if (width * length - noneTables.length != nameList.length) {
                alert("없는 자리의 수와 이름의 수가 같지 않습니다");
              } else if (blacklistName.length != blacklistsTable.length) {
                alert("사방신의 수와 이름의 수가 같지 않습니다");
              } else {
                
              }
            }
          }}>▶추첨</button>
        <br /><br />
        <hr className='h-10'/>
      </div>
      <div className=''>
        <div className='border-box border-2 w-1/3 h-16 my-4 mx-auto text-center bg-justbrown border-justbrown text-2xl leading-[60px] shadow-md'>교탁</div>
        <br /><br /><br />
            <div className='hidden' id='table'> 
            </div>
      </div>        
    </div>  
  )
}

function disable(event: MouseEvent<HTMLButtonElement>) {
  document.getElementById("table")!!.style.display = "grid";
  document.getElementById("table")!!.style.gridTemplateColumns = "1fr ".repeat(width);
  (document.getElementById("change")!! as HTMLButtonElement).disabled = true;
  document.getElementById("change")!!.style.background = "gray";
  document.getElementById("change")!!.style.borderColor = "gray";
  (event.target as HTMLButtonElement).disabled = true;
  (event.target as HTMLButtonElement).style.background = "gray";
  (event.target as HTMLButtonElement).style.borderColor = "gray";

  (document.getElementById("numberorname")!! as HTMLInputElement).disabled = true;
  document.getElementById("numberorname")!!.style.borderColor = "gray";
  (document.getElementById("max")!! as HTMLInputElement).disabled = true;
  document.getElementById("max")!!.style.borderColor = "gray";
  (document.getElementById("blacklist")!! as HTMLInputElement).disabled = true;
  document.getElementById("blacklist")!!.style.borderColor = "gray";
  (document.getElementById("가로")!! as HTMLInputElement).disabled = true;
  document.getElementById("가로")!!.style.borderColor = "gray";
  (document.getElementById("세로")!! as HTMLInputElement).disabled = true;
  document.getElementById("세로")!!.style.borderColor = "gray";
}

function shuffle(array: any[]) {
  for (let index = array.length - 1; index > 0; index--) {
    const randomPosition = Math.floor(Math.random() * (index + 1));
    const temporary = array[index];
    array[index] = array[randomPosition];
    array[randomPosition] = temporary;
  }
}
