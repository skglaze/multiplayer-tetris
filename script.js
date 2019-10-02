const board = document.getElementById('board')
for (i = 0; i < 200; i++) {
    const newSquares = document.createElement('div')
    newSquares.className = "square"
    board.appendChild(newSquares)
}

const boardArr = document.getElementsByClassName('square')
let topRight = 4
let topLeft = 5
let bottomRight = 14
let bottomLeft = 15

boardArr[topRight].classList.add("occupied")
boardArr[topLeft].classList.add("occupied")
boardArr[bottomRight].classList.add("occupied")
boardArr[bottomLeft].classList.add("occupied")

stop = () => {
    if (bottomRight > 200)
        clearInterval(interval)
}

fall = () => {
    topLeft = topLeft + 10
    topRight = topRight + 10
    bottomLeft = bottomLeft + 10
    bottomRight = bottomRight + 10
    stop()
    boardArr[topRight].classList.add("occupied")
    boardArr[topLeft].classList.add("occupied")
    boardArr[bottomRight].classList.add("occupied")
    boardArr[bottomLeft].classList.add("occupied")

    boardArr[topRight - 10].classList.remove("occupied")
    boardArr[topLeft - 10].classList.remove("occupied")
}

const interval = setInterval(fall, 1000)



