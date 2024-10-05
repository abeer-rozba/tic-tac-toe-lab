/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
]



/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie


/*------------------------ Cached Element References ------------------------*/
const squareElements = document.querySelectorAll(".sqr")
const messageElement = document.querySelector("#message")
const resetButtonElement = document.querySelector("#reset")


/*-------------------------------- Functions --------------------------------*/
const render = () => {
  updateBoard()
  updateMessage()
}

const updateBoard = () => {
  board.forEach((item, index)=> {
    if (item === "X") {
      squareElements[index].textContent = "X"
    }
    else if (item === "O") {
      squareElements[index].textContent = "O"
    }
    else if (item === "") {
      squareElements[index].textContent = ""
    }
  })
}

const updateMessage = () => {
  if (!winner && !tie) {
    messageElement.textContent = `It's ${turn}'s turn.`
  }
  else if (tie) {
    messageElement.textContent = `It's a tie.`
  }
  else {
    messageElement.textContent = `Congratulations! ${turn} won.`
  }
}

const handleClick = (event) => {
  const squareIndex = event.target.id
  if (board[squareIndex] !== "" || winner)
  { return }
  playPiece(squareIndex)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()  
  render()
}

const playPiece = (index) => {
  board[index] = turn
  console.log(board);
}

const checkForWinner = () => {
  for (let i=0; i<winningCombos.length; i++){
    for (let j=0; j<winningCombos[i].length; j++) {
      if ( board[winningCombos[i][j]] !== "" && 
        board[winningCombos[i][j]] === board[winningCombos[i][j+1]] &&
        board[winningCombos[i][j]] === board[winningCombos[i][j+2]] )
      { winner = true }
    }
  }
}

const checkForTie = () => {
  if (winner) { return }
  for (let i=0; i<board.length; i++) {
    if (board[i] === "") { return }
  }
  tie = true
}

const switchPlayerTurn = () => {
  if (winner) { return }
  else if (!winner) {
    if (turn === "X") {
      turn = "O"
    }
    else { turn = "X" }
  }
}

const init = () => {
  board = 
  [ '', '', '',
    '', '', '',
    '', '', '' ]
  turn = "X", winner = false, tie = false
  render()
}


init()
/*----------------------------- Event Listeners -----------------------------*/
squareElements.forEach((square) => {
  square.addEventListener("click", (event) => handleClick(event))
})

resetButtonElement.addEventListener("click", init)