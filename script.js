const board = document.getElementById('board')
for (i = 0; i < 200; i++) {
    const newSquares = document.createElement('div')
    newSquares.className = "square"
    board.appendChild(newSquares)
}

const boardArr = document.getElementsByClassName('square')
boardArr[4].classList.add("occupied")
boardArr[5].classList.add("occupied")
boardArr[14].classList.add("occupied")
boardArr[15].classList.add("occupied")

const square = [[0, 0], [0, 1], [1, 1], [1, 0]]