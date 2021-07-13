let gameBoardArray = ["Z","Z","Z","Z","Z","Z","Z","Z","Z"];
let gameBoardDiv = document.getElementById("gameBoard");
let htmlBoxes;
let status = document.getElementById("status");
const playerFactory = (name,marker) => { //factory function to return a marker for each player
    return {name,marker};

}

const player1 = playerFactory("Player 1","X"); //creates player 1 with marker X
const player2 = playerFactory("Player 2","O"); // creates player 2 with marker O
var currentPlayer = player1; 


for (let i=0; i<gameBoardArray.length; i++){ //Creates elements (boxes) inside gameBoard
    let div = document.createElement("div");
    div.className="boxes";
    gameBoardDiv.appendChild(div);


}


for (let i=0; i<gameBoardArray.length; i++){ //adds event listener for each button and each time swaps the player's marker
    
    
    htmlBoxes = document.querySelectorAll(".boxes");

    htmlBoxes[i].addEventListener("click", function(){
        if (gameBoardArray[i]=="Z"){ //does not write if box is already marked
            gameBoardArray[i]=currentPlayer.marker;
            if (currentPlayer==player1){drawMarkers(); currentPlayer = player2; return;}
            if (currentPlayer==player2){drawMarkers(); currentPlayer = player1; return}            
        }   
    })   
    
}


function drawMarkers() { // these functions draws all the elements in the array if not Z
    for (let i=0; i<gameBoardArray.length; i++){
        if (gameBoardArray[i]!="Z"){
            htmlBoxes[i].innerText = gameBoardArray[i];
        }
    }
    
    
    //status.innerText = currentPlayer.name + "'s Turn";
    checkWinner();
    
}

function checkWinner(){
combinations(0,1,2);
combinations(0,3,6);
combinations(2,5,8);
combinations(6,7,8);
combinations(2,4,6);
combinations(0,4,8);
combinations(3,4,5);
    

}

function combinations(num1,num2,num3){
    if (gameBoardArray[num1] =="X" && gameBoardArray[num2] =="X" && gameBoardArray[num3] =="X"){
        status.innerText="Player 1 Wins"
    }

    if (gameBoardArray[num1] =="O" && gameBoardArray[num2] =="O" && gameBoardArray[num3] =="O"){
        status.innerText="Player 2 Wins"
    }

}
