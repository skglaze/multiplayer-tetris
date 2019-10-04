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
let nextBlock

const makeTetrisBlock = () => {
    boardArr[topRight].classList.add("occupied")
    boardArr[topLeft].classList.add("occupied")
    boardArr[bottomRight].classList.add("occupied")
    boardArr[bottomLeft].classList.add("occupied")
}

const moveSquareRight = () => {
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

const moveLineRight = () => {
    if (((topRight + 1) % 10 != 0) && ((boardArr[bottomRight + 1].classList.value != "square occupied") && (boardArr[topRight + 1].classList.value != "square occupied") && (boardArr[bottomLeft + 1].classList.value != "square occupied") && (boardArr[topLeft + 1].classList.value != "square occupied"))) {
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
        boardArr[topRight - 1].classList.remove("occupied")
        boardArr[bottomRight - 1].classList.remove("occupied")
    }

}

const moveTRight = () => {
    if (((bottomRight + 1) % 10 != 0) && ((boardArr[bottomRight + 1].classList.value != "square occupied") && (boardArr[topLeft + 1].classList.value != "square occupied"))) {
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

const moveSRight = () => {
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

const moveZRight = () => {
    if (((bottomRight + 1) % 10 != 0) && ((boardArr[bottomRight + 1].classList.value != "square occupied") && (boardArr[topRight + 1].classList.value != "square occupied"))) {
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

const moveLRight = () => {
    if (((bottomRight + 1) % 10 != 0) && ((boardArr[bottomRight + 1].classList.value != "square occupied") && (boardArr[topLeft + 1].classList.value != "square occupied") && (boardArr[topRight + 1].classList.value != "square occupied"))) {
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
        boardArr[topRight - 1].classList.remove("occupied")
    }

}

const moveJRight = () => {
    if (((bottomRight + 1) % 10 != 0) && ((boardArr[bottomRight + 1].classList.value != "square occupied") && (boardArr[topLeft + 1].classList.value != "square occupied") && (boardArr[topRight + 1].classList.value != "square occupied"))) {
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
        boardArr[topRight - 1].classList.remove("occupied")
    }

}

const moveSquareLeft = () => {
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

const moveLineLeft = () => {
    if ((topLeft % 10 != 0) && ((boardArr[bottomLeft - 1].classList.value != "square occupied") && (boardArr[topLeft - 1].classList.value != "square occupied") && (boardArr[topRight - 1].classList.value != "square occupied") && (boardArr[bottomRight - 1].classList.value != "square occupied"))) {
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
        boardArr[topLeft + 1].classList.remove("occupied")
        boardArr[bottomLeft + 1].classList.remove("occupied")
    }
}

const moveTLeft = () => {
    if ((bottomLeft % 10 != 0) && ((boardArr[bottomLeft - 1].classList.value != "square occupied") && (boardArr[topLeft - 1].classList.value != "square occupied"))) {
        topLeft = topLeft - 1
        topRight = topRight - 1
        bottomLeft = bottomLeft - 1
        bottomRight = bottomRight - 1

        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")

        boardArr[topLeft + 1].classList.remove("occupied")
        boardArr[bottomRight + 1].classList.remove("occupied")
    }
}

const moveSLeft = () => {
    if ((bottomLeft % 10 != 0) && ((boardArr[bottomLeft - 1].classList.value != "square occupied") && (boardArr[topLeft - 1].classList.value != "square occupied"))) {
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

const moveZLeft = () => {
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

const moveLLeft = () => {
    if ((bottomLeft % 10 != 0) && ((boardArr[bottomLeft - 1].classList.value != "square occupied") && (boardArr[topLeft - 1].classList.value != "square occupied") && (boardArr[topRight - 1].classList.value != "square occupied"))) {
        topLeft = topLeft - 1
        topRight = topRight - 1
        bottomLeft = bottomLeft - 1
        bottomRight = bottomRight - 1

        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")

        boardArr[topLeft + 1].classList.remove("occupied")
        boardArr[bottomRight + 1].classList.remove("occupied")
        boardArr[topRight + 1].classList.remove("occupied")
    }
}

const moveJLeft = () => {
    if ((bottomLeft % 10 != 0) && ((boardArr[bottomLeft - 1].classList.value != "square occupied") && (boardArr[topLeft - 1].classList.value != "square occupied") && (boardArr[topRight - 1].classList.value != "square occupied"))) {
        topLeft = topLeft - 1
        topRight = topRight - 1
        bottomLeft = bottomLeft - 1
        bottomRight = bottomRight - 1

        boardArr[topRight].classList.add("occupied")
        boardArr[topLeft].classList.add("occupied")
        boardArr[bottomRight].classList.add("occupied")
        boardArr[bottomLeft].classList.add("occupied")

        boardArr[topLeft + 1].classList.remove("occupied")
        boardArr[bottomRight + 1].classList.remove("occupied")
        boardArr[topRight + 1].classList.remove("occupied")
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const moveSquareRightKey = (event) => {
    if (event.code === 'ArrowRight') {
        moveSquareRight()
    }
}

const moveSquareLeftKey = (event) => {
    if (event.code === 'ArrowLeft') {
        moveSquareLeft()
    }
}

const moveLineRightKey = (event) => {
    if (event.code === 'ArrowRight') {
        moveLineRight()
    }
}

const moveLineLeftKey = (event) => {
    if (event.code === 'ArrowLeft') {
        moveLineLeft()
    }
}

const moveTRightKey = (event) => {
    if (event.code === 'ArrowRight') {
        moveTRight()
    }
}

const moveTLeftKey = (event) => {
    if (event.code === 'ArrowLeft') {
        moveTLeft()
    }
}

const moveSRightKey = (event) => {
    if (event.code === 'ArrowRight') {
        moveSRight()
    }
}

const moveSLeftKey = (event) => {
    if (event.code === 'ArrowLeft') {
        moveSLeft()
    }
}

const moveZRightKey = (event) => {
    if (event.code === 'ArrowRight') {
        moveZRight()
    }
}

const moveZLeftKey = (event) => {
    if (event.code === 'ArrowLeft') {
        moveZLeft()
    }
}

const moveLRightKey = (event) => {
    if (event.code === 'ArrowRight') {
        moveLRight()
    }
}

const moveLLeftKey = (event) => {
    if (event.code === 'ArrowLeft') {
        moveLLeft()
    }
}

const moveJRightKey = (event) => {
    if (event.code === 'ArrowRight') {
        moveJRight()
    }
}

const moveJLeftKey = (event) => {
    if (event.code === 'ArrowLeft') {
        moveJLeft()
    }
}

whichMove = () => {
    if (shapeIndex === 0) {
        document.addEventListener('keydown', moveSquareRightKey)
        document.addEventListener('keydown', moveSquareLeftKey)
    }
    if (shapeIndex === 1) {
        document.addEventListener('keydown', moveTRightKey)
        document.addEventListener('keydown', moveTLeftKey)
    }
    if (shapeIndex === 2) {
        document.addEventListener('keydown', moveTRightKey)

        document.addEventListener('keydown', moveTLeftKey)
    }
    if (shapeIndex === 3) {
        document.addEventListener('keydown', moveSRightKey)
        document.addEventListener('keydown', moveSLeftKey)
    }
    if (shapeIndex === 4) {
        document.addEventListener('keydown', moveZRightKey)
        document.addEventListener('keydown', moveZLeftKey)
    }
    if (shapeIndex === 5) {
        document.addEventListener('keydown', moveLRightKey)
        document.addEventListener('keydown', moveLLeftKey)
    }
    if (shapeIndex === 6) {
        document.addEventListener('keydown', moveJRightKey)
        document.addEventListener('keydown', moveJLeftKey)
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

setUp = () => {
    shapeIndex = Math.floor(Math.random() * 7)

    topLeft = tetrisShapes[shapeIndex][0]
    topRight = tetrisShapes[shapeIndex][1]
    bottomLeft = tetrisShapes[shapeIndex][2]
    bottomRight = tetrisShapes[shapeIndex][3]

    makeTetrisBlock()

}

const play = () => {

    const stopSquare = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveSquareRightKey)
            document.removeEventListener('keydown', moveSquareLeftKey)
            setUp()
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveSquareRightKey)
            document.removeEventListener('keydown', moveSquareLeftKey)
            setUp()
            play()
        }
    }

    const stopLine = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveLineRightKey)
            document.removeEventListener('keydown', moveLineLeftKey)
            setUp()
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveLineRightKey)
            document.removeEventListener('keydown', moveLineLeftKey)
            setUp()
            play()
        }
    }

    const stopT = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveTRightKey)
            document.removeEventListener('keydown', moveTLeftKey)
            setUp()
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied") || (boardArr[topRight + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveTRightKey)
            document.removeEventListener('keydown', moveTLeftKey)
            setUp()
            play()
        }
    }

    const stopS = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveSRightKey)
            document.removeEventListener('keydown', moveSLeftKey)
            setUp()
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied") || (boardArr[topRight + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveSRightKey)
            document.removeEventListener('keydown', moveSLeftKey)
            setUp()
            play()
        }
    }

    const stopZ = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveZRightKey)
            document.removeEventListener('keydown', moveZLeftKey)
            setUp()
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied") || (boardArr[topLeft + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveZRightKey)
            document.removeEventListener('keydown', moveZLeftKey)
            setUp()
            play()
        }
    }

    const stopL = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveLRightKey)
            document.removeEventListener('keydown', moveLLeftKey)
            setUp()
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveLRightKey)
            document.removeEventListener('keydown', moveLLeftKey)
            setUp()
            play()
        }
    }

    const stopJ = () => {
        if (bottomRight + 10 > 200) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveJRightKey)
            document.removeEventListener('keydown', moveJLeftKey)
            setUp()
            play()
        }
        if ((boardArr[bottomRight + 10].classList.value === "square occupied") || (boardArr[bottomLeft + 10].classList.value === "square occupied")) {
            clearInterval(interval)
            document.removeEventListener('keydown', moveJRightKey)
            document.removeEventListener('keydown', moveJLeftKey)
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
    whichMove()

}

setUp()
play()
