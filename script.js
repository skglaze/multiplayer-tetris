const board = document.getElementById('board')
for (i = 0; i < 200; i++) {
    const newSquares = document.createElement('div')
    newSquares.className = "square"
    board.appendChild(newSquares)
}

const boardArr = document.getElementsByClassName('square')

const tetrisShapes = [[4, 5, 14, 15], [5, 15, 25, 35], [5, 15, 14, 16], [5, 6, 15, 14], [5, 4, 15, 16], [5, 15, 25, 26], [5, 15, 25, 24]]

let shapeIndex = Math.floor(Math.random() * 7) - 1

let topLeft
let topRight
let bottomLeft
let bottomRight

setUp = () => {
    shapeIndex = Math.floor(Math.random() * 7) - 1

    topLeft = tetrisShapes[shapeIndex][0]
    topRight = tetrisShapes[shapeIndex][1]
    bottomLeft = tetrisShapes[shapeIndex][2]
    bottomRight = tetrisShapes[shapeIndex][3]

    const makeTetrisBlock = () => {
        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")
    }
    makeTetrisBlock()
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

const stopSquare = () => {
    if (bottomRight + 10 > 200) {
        clearInterval(interval)
        setUp()
        play()
    }
    if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied")) {
        clearInterval(interval)
        setUp()
        play()
    }
}

const stopLine = () => {
    if (bottomRight + 10 > 200) {
        clearInterval(interval)
        setUp()
        play()
    }
    if ((boardArr[bottomRight + 10].classList.value === "square occupied")) {
        clearInterval(interval)
        setUp()
        play()
    }
}

const stopT = () => {
    if (bottomRight + 10 > 200) {
        clearInterval(interval)
        setUp()
        play()
    }
    if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied") || (boardArr[topRight + 10].classList.value === "square occupied")) {
        clearInterval(interval)
        setUp()
        play()
    }
}

const stopS = () => {
    if (bottomRight + 10 > 200) {
        clearInterval(interval)
        setUp()
        play()
    }
    if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied") || (boardArr[topRight + 10].classList.value === "square occupied")) {
        clearInterval(interval)
        setUp()
        play()
    }
}

const stopZ = () => {
    if (bottomRight + 10 > 200) {
        clearInterval(interval)
        setUp()
        play()
    }
    if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied") || (boardArr[topLeft + 10].classList.value === "square occupied")) {
        clearInterval(interval)
        setUp()
        play()
    }
}

const stopL = () => {
    if (bottomRight + 10 > 200) {
        clearInterval(interval)
        setUp()
        play()
    }
    if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied")) {
        clearInterval(interval)
        setUp()
        play()
    }
}

const stopJ = () => {
    if (bottomRight + 10 > 200) {
        clearInterval(interval)
        setUp()
        play()
    }
    if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied")) {
        clearInterval(interval)
        setUp()
        play()
    }
}

stopCondition = () => {
    if (shapeIndex === 0) {
        stopSquare()
    }
    if (shapeIndex === 1) {
        stopLine()
    }
    if (shapeIndex === 2) {
        stopT()
    }
    if (shapeIndex === 3) {
        stopS()
    }
    if (shapeIndex === 4) {
        stopZ()
    }
    if (shapeIndex === 5) {
        stopL()
    }
    if (shapeIndex === 6) {
        stopJ()
    }
}
const play = () => {

    stopCondition()

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

    const interval = setInterval(fall, 600)
    if (again === true) {
        return again
    }
}

setUp()
play()