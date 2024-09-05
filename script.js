let boxes = document.querySelectorAll(".GameBox");
let resetButt = document.querySelector("#RestartButt");
let newGameButt = document.querySelector("#NewGameButt");
let winMess = document.querySelector(".WinMess");
let bodyProperty = document.querySelector("#bodyProperty");
let mess = document.querySelector("#Mess");
let messEmoji = document.querySelector("#MessEmoji");

let turnO = true; 

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText; 
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != '' && pos2val != '' && pos3val != ''){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return;
            } 
        }
    }
    if ([...boxes].every(box => box.innerText !== '')) {
        drawGame();
    }
}

const showWinner = (winner) =>{
    messEmoji.innerText = "🎉";
    mess.innerText = `Winner is '${winner}'`;
    winMess.classList.remove("HideMess");
    bodyProperty.style.justifyContent="start";
    disableBoxes();
}

const drawGame = () =>{
    messEmoji.innerText = "🤐";
    mess.innerText = "The Game is a Draw!";
    winMess.classList.remove("HideMess");
    bodyProperty.style.justifyContent="start";
    disableBoxes();
}

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    winMess.classList.add("HideMess");
    bodyProperty.style.justifyContent="center";
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = '';
    }
}

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        if (box.innerText === '') {  
            if (turnO){
                box.textContent = "O";
                turnO = false;
            }
            else{
                box.textContent = "X";
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
        }
    });    
});

newGameButt.addEventListener("click", resetGame);
resetButt.addEventListener("click", resetGame);
