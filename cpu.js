let gameBoardArray = ["Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z"]; //"Z" means blank
let gameBoardDiv = document.getElementById("gameBoard");
let htmlBoxes;
let status = document.getElementById("status");
const playerFactory = (name, marker, hover,score, result) => {
  //factory function to return a marker for each player
  return { name, marker, hover,score, result };
};

const player1 = playerFactory("Player 1", "X", "boxes", 0); //creates player 1 with marker X
const player2 = playerFactory("Player 2", "O", "boxes2", 0); // creates player 2 with marker O
var currentPlayer = player1;

for (let i = 0; i < gameBoardArray.length; i++) {
  //Creates elements (boxes) inside gameBoard
  let div = document.createElement("div");
  div.className = currentPlayer.hover;
  gameBoardDiv.appendChild(div);
}


function drawMarkers() {
  // these functions draws all the elements in the array if not Z

  if (player1.result == "Win" || player2.result == "Win") {
    return;
  }

  for (let i = 0; i < gameBoardArray.length; i++) {
    htmlBoxes[i].className = player1.hover;
    if (gameBoardArray[i] != "Z") {
      //htmlBoxes[i].className = "boxesGreyed";
      htmlBoxes[i].innerText = gameBoardArray[i];
    }
  }

  //status.innerText = currentPlayer.name + "'s Turn";
  checkWinner();
}

function checkWinner() {
  combinations(0, 1, 2);
  combinations(0, 3, 6);
  combinations(2, 5, 8);
  combinations(6, 7, 8);
  combinations(2, 4, 6);
  combinations(0, 4, 8);
  combinations(3, 4, 5);
  combinations(1, 4, 7);

  for (let box in gameBoardArray) {
    if (gameBoardArray[box] == "Z") {
      return;
    }
  }

  if (player1.result != "Win" && player2.result != "Win") {
    status.innerText = "It's a draw";
    createResetButton();
  }
}

function combinations(num1, num2, num3) {
  //takes the spots of the gameboard as numbers and sets result if true
  if (
    gameBoardArray[num1] == "X" &&
    gameBoardArray[num2] == "X" &&
    gameBoardArray[num3] == "X"
  ) {
    status.innerText = "Player 1 Wins";
    player1.score+=1;
    createResetButton();
    player1.result = "Win";
    htmlBoxes[num1].className = "blink_me"; //sets css to flash the winning boxes
    htmlBoxes[num2].className = "blink_me";
    htmlBoxes[num3].className = "blink_me";
  }

  if (
    gameBoardArray[num1] == "O" &&
    gameBoardArray[num2] == "O" &&
    gameBoardArray[num3] == "O"
  ) {
    status.innerText = "Player 2 Wins";
    player2.score+=1;
    createResetButton();
    player2.result = "Win";
    htmlBoxes[num1].className = "blink_me2"; //sets css to flash the winning boxes
    htmlBoxes[num2].className = "blink_me2";
    htmlBoxes[num3].className = "blink_me2";
  }

  document.getElementById("p1Score").innerText = `Score = ${player1.score}`; // Updates the scoreboard
  document.getElementById("p2Score").innerText = `Score = ${player2.score}`;

}

function createResetButton() {
  //Creates a play again button
  let btn = document.createElement("button");
  btn.innerText = "Play Again";
  let holder = document.getElementById("holder");
  holder.innerHTML = ""; //removes any button
  btn.addEventListener("click", function () {
    gameBoardArray = ["Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z"];
    player1.result = "";
    player2.result = "";
    drawMarkers();
    holder.innerText = "";

    let boxes = document.querySelectorAll("." + player1.hover);
    let blink_me = document.querySelectorAll(".blink_me");
    let blink_me2 = document.querySelectorAll(".blink_me2");
    for (let box in boxes) {
      boxes[box].innerText = "";
    }
    for (let blink in blink_me) {
      blink_me[blink].innerText = "";
      blink_me[blink].className = currentPlayer.hover;
    }
    for (let blink in blink_me2) {
      blink_me2[blink].innerText = "";
      blink_me2[blink].className = currentPlayer.hover;
    }
    status.innerText = "";
  });

  holder.appendChild(btn);
}



function startGame(){
    for (let i = 0; i < gameBoardArray.length; i++) {
        //adds event listener for each button for single player
      
        htmlBoxes = document.querySelectorAll("." + player1.hover);     
        
      
        htmlBoxes[i].addEventListener("click", function () {
          if (player1.result == "Win" || player2.result == "Win") {
            return;
          }
      
          if (gameBoardArray[i] == "Z") {
            //writes only if empty i.e "Z" in array
            gameBoardArray[i] = currentPlayer.marker;
      
           
            drawMarkers();        
            //currentPlayer=player2;
            cpuPlay();
             
            
          }
        });
      }
      

}

function cpuPlay(){

if (player1.result == "Win" || player2.result == "Win" || status.innerText == "It's a draw") {
        return;
    }

if (gameBoardArray[6]=="Z") randomNum=6;
if (gameBoardArray[2]=="Z") randomNum=2;
if (gameBoardArray[8]=="Z") randomNum=8;
if (gameBoardArray[0]=="Z") randomNum=0;
if (gameBoardArray[4]=="Z") randomNum=4;

while (gameBoardArray[randomNum]!="Z"){randomNum = Math.floor(Math.random() * 9)} //use this only for EASY opponent play
//console.log(randomNum)
//if (gameBoardArray[randomNum]!="Z"){return}
gameBoardArray[randomNum]=player2.marker;
drawMarkers();
    
    
}

startGame();