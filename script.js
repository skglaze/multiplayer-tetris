const board = document.getElementById('board')
for (i = 0; i < 200; i++) {
    const newSquares = document.createElement('div')
    newSquares.className = "square"
    board.appendChild(newSquares)
}

const boardArr = document.getElementsByClassName('square')

const tetrisShapes = [[4, 5, 14, 15], [5, 15, 25, 35], [5, 15, 14, 16], [5, 6, 14, 15], [4, 5, 15, 16], [4, 14, 24, 25], [5, 15, 24, 25]]

let shapeIndex
let interval
let topLeft
let topRight
let bottomLeft
let bottomRight

const makeTetrisBlock = () => {
    boardArr[topRight].classList.add("occupied")
    boardArr[topLeft].classList.add("occupied")
    boardArr[bottomRight].classList.add("occupied")
    boardArr[bottomLeft].classList.add("occupied")
}

const moveRight = () => {
    if (((topRight + 1) % 10 != 0) && ((boardArr[bottomRight + 1].classList.value != "square occupied") && (boardArr[topRight + 1].classList.value != "square occupied"))) {
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
    if ((topLeft % 10 != 0) && ((boardArr[bottomLeft - 1].classList.value != "square occupied") && (boardArr[topLeft - 1].classList.value != "square occupied"))) {
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

whichInterval = () => {
    if (shapeIndex === 0) {
        interval = setInterval(fallSquare, 400)
    }
    if (shapeIndex === 1) {
        interval = setInterval(fallLine, 400)
    }
    if (shapeIndex === 2) {
        interval = setInterval(fallT, 400)
    }
    if (shapeIndex === 3) {
        interval = setInterval(fallS, 400)
    }
    if (shapeIndex === 4) {
        interval = setInterval(fallZ, 400)
    }
    if (shapeIndex === 5) {
        interval = setInterval(fallL, 400)
    }
    if (shapeIndex === 6) {
        interval = setInterval(fallJ, 400)
    }
}

const play = () => {

    setUp = () => {
        shapeIndex = Math.floor(Math.random() * 7)

        topLeft = tetrisShapes[shapeIndex][0]
        topRight = tetrisShapes[shapeIndex][1]
        bottomLeft = tetrisShapes[shapeIndex][2]
        bottomRight = tetrisShapes[shapeIndex][3]

        makeTetrisBlock()

    }

    setUp()

    const stopSquare = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            play()
        }
    }

    const stopLine = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            play()
        }
    }

    const stopT = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied") || (boardArr[topRight + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            play()
        }
    }

    const stopS = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied") || (boardArr[topRight + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            play()
        }
    }

    const stopZ = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied") || (boardArr[topLeft + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            play()
        }
    }

    const stopL = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            play()
        }
    }

    const stopJ = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied")) {
            clearInterval(interval)
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

    const fallSquare = () => {
        console.log(topRight)
        topLeft = topLeft + 10
        topRight = topRight + 10
        bottomLeft = bottomLeft + 10
        bottomRight = bottomRight + 10
        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")
        console.log(topRight)

        boardArr[topRight - 10].classList.remove("occupied")
        boardArr[topLeft - 10].classList.remove("occupied")
        stopCondition()
    }

    const fallLine = () => {
        topLeft = topLeft + 10
        topRight = topRight + 10
        bottomLeft = bottomLeft + 10
        bottomRight = bottomRight + 10
        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")

        boardArr[topLeft - 10].classList.remove("occupied")
        stopCondition()
    }

    const fallT = () => {
        topLeft = topLeft + 10
        topRight = topRight + 10
        bottomLeft = bottomLeft + 10
        bottomRight = bottomRight + 10
        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")

        boardArr[topLeft - 10].classList.remove("occupied")
        boardArr[bottomLeft - 10].classList.remove("occupied")
        boardArr[bottomRight - 10].classList.remove("occupied")
        stopCondition()
    }

    const fallS = () => {
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
        boardArr[bottomLeft - 10].classList.remove("occupied")
        stopCondition()
    }

    const fallZ = () => {
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
        boardArr[bottomRight - 10].classList.remove("occupied")
        stopCondition()
    }

    const fallL = () => {
        topLeft = topLeft + 10
        topRight = topRight + 10
        bottomLeft = bottomLeft + 10
        bottomRight = bottomRight + 10
        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")

        boardArr[topLeft - 10].classList.remove("occupied")
        boardArr[bottomRight - 10].classList.remove("occupied")
        stopCondition()
    }

    const fallJ = () => {
        topLeft = topLeft + 10
        topRight = topRight + 10
        bottomLeft = bottomLeft + 10
        bottomRight = bottomRight + 10
        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")

        boardArr[topLeft - 10].classList.remove("occupied")
        boardArr[bottomLeft - 10].classList.remove("occupied")
        stopCondition()
    }

    whichFall = () => {
        if (shapeIndex === 0) {
            fallSquare()
        }
        if (shapeIndex === 1) {
            fallLine()
        }
        if (shapeIndex === 2) {
            fallT()
        }
        if (shapeIndex === 3) {
            fallS()
        }
        if (shapeIndex === 4) {
            fallZ()
        }
        if (shapeIndex === 5) {
            fallL()
        }
        if (shapeIndex === 6) {
            fallJ()
        }
    }

    whichInterval = () => {
        if (shapeIndex === 0) {
            interval = setInterval(fallSquare, 400)
        }
        if (shapeIndex === 1) {
            interval = setInterval(fallLine, 400)
        }
        if (shapeIndex === 2) {
            interval = setInterval(fallT, 400)
        }
        if (shapeIndex === 3) {
            interval = setInterval(fallS, 400)
        }
        if (shapeIndex === 4) {
            interval = setInterval(fallZ, 400)
        }
        if (shapeIndex === 5) {
            interval = setInterval(fallL, 400)
        }
        if (shapeIndex === 6) {
            interval = setInterval(fallJ, 400)
        }
    }

    whichInterval()

}

play()