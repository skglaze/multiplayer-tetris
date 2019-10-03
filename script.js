const board = document.getElementById('board')
for (i = 0; i < 200; i++) {
    const newSquares = document.createElement('div')
    newSquares.className = "square"
    board.appendChild(newSquares)
}

const boardArr = document.getElementsByClassName('square')

// this shouldn't be global but it's ok for now
let topLeft = 4
let topRight = 5
let bottomLeft = 14
let bottomRight = 15

const newBlock = () => {
    topLeft = 4
    topRight = 5
    bottomLeft = 14
    bottomRight = 15
}

newBlock()
let again = false

const makeTetrisBlock = () => {
    boardArr[topRight].classList.add("occupied")
    boardArr[topLeft].classList.add("occupied")
    boardArr[bottomRight].classList.add("occupied")
    boardArr[bottomLeft].classList.add("occupied")
}

const moveRight = () => {
    if (((topRight + 1) % 10 != 0) && ((boardArr[bottomRight + 1].classList.value != "square occupied") || (boardArr[topRight + 1].classList.value != "square occupied"))) {
        topLeft = topLeft + 1
        topRight = topRight + 1
        bottomLeft = bottomLeft + 1
        bottomRight = bottomRight + 1

        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")

        boardArr[topLeft - 1].classList.remove("occupied")
        boardArr[bottomLeft - 1].classList.remove("occupied")
    }

}

const moveLeft = () => {
    if ((topLeft % 10 != 0) && ((boardArr[bottomLeft - 1].classList.value != "square occupied") || (boardArr[topLeft - 1].classList.value != "square occupied"))) {
        topLeft = topLeft - 1
        topRight = topRight - 1
        bottomLeft = bottomLeft - 1
        bottomRight = bottomRight - 1

        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")

        boardArr[topRight + 1].classList.remove("occupied")
        boardArr[bottomRight + 1].classList.remove("occupied")
    }
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowRight') {
        moveRight()
    }
})

document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowLeft') {
        moveLeft()
    }
})


const play = () => {
    makeTetrisBlock()

    const stop = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            newBlock()
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            newBlock()
            play()
        }
    }

    const fall = () => {
        topLeft = topLeft + 10
        topRight = topRight + 10
        bottomLeft = bottomLeft + 10
        bottomRight = bottomRight + 10
        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")

        boardArr[topRight - 10].classList.remove("occupied")
        boardArr[topLeft - 10].classList.remove("occupied")
        stop()
    }

    const interval = setInterval(fall, 200)
    if (again === true) {
        return again
    }
}

play()