const board = document.getElementById('board')
for (i = 0; i < 200; i++) {
    const newSquares = document.createElement('div')
    newSquares.className = "square"
    board.appendChild(newSquares)
}

const tetrisShapes = [[4, 5, 14, 15], [5, 15, 25, 35], [5, 15, 14, 16], [5, 6, 14, 15], [4, 5, 15, 16], [4, 14, 24, 25], [5, 15, 24, 25]]
const boardArr = document.getElementsByClassName('square')
let shapeIndex

const fall = () => {
    for (let i = boardArr.length - 1; i >= 0; i--) {
        if (boardArr[i].className === "square occupied") {
            if (boardArr[i + 10].className !== "square occupied dead") {
                boardArr[i + 10].classList.add("occupied")
                boardArr[i].classList.remove("occupied")
            }
        }
    }
}

const stop = () => {
    console.log('stop called')
    for (let i = boardArr.length - 1; i >= 0; i--) {
        if (boardArr[i].className === "square occupied") {
            if ((i + 11 > 200) || (boardArr[i + 10].className === "square occupied dead")) {
                for (let i = boardArr.length - 1; i >= 0; i--) {
                    if (boardArr[i].className === "square occupied") {
                        boardArr[i].classList.add("dead")
                    }
                }
            }
        }
    }
}

const moveRight = () => {
    console.log('moveRight called')
    let movableBlockCount = 0
    for (let i = boardArr.length - 1; i >= 0; i--) {
        if (boardArr[i].className === "square occupied") {
            if (((i + 1) % 10 != 0) && (boardArr[i - 1].className != "square occupied dead")) {
                movableBlockCount = movableBlockCount + 1
            }
        }
    }
    if (movableBlockCount === 4) {
        for (let i = boardArr.length - 1; i >= 0; i--) {
            if (boardArr[i].className === "square occupied") {
                boardArr[i + 1].classList.add("occupied")
                boardArr[i].classList.remove("occupied")
            }
        }
    }
}

const moveLeft = () => {
    console.log('moveLeft called')
    let movableBlockCount = 0
    for (let i = 0; i < boardArr.length; i++) {
        if (boardArr[i].className === "square occupied") {
            if ((i % 10 != 0) && (boardArr[i - 1].className != "square occupied dead")) {
                movableBlockCount = movableBlockCount + 1
            }
        }
    }
    if (movableBlockCount === 4) {
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                boardArr[i - 1].classList.add("occupied")
                boardArr[i].classList.remove("occupied")
            }
        }
    }
}

const spawnBlock = () => {
    let activeBlockCount = 0
    for (let i = 0; i < boardArr.length; i++) {
        if (boardArr[i].className === "square occupied") {
            activeBlockCount = activeBlockCount + 1
        }
    }
    console.log('activeBlockCount', activeBlockCount)
    if (activeBlockCount === 0) {
        shapeIndex = Math.floor(Math.random() * 7)
        for (let i = 0; i < tetrisShapes[shapeIndex].length; i++) {
            boardArr[tetrisShapes[shapeIndex][i]].classList.add("occupied")
        }
    }
    return activeBlockCount
}

const fallFaster = () => {
    fall()
    stop()
    spawnBlock()
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowDown') {
        fallFaster()
    }
})
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


mainLoop = () => {
    fall()
    stop()
    spawnBlock()
    setTimeout(mainLoop, 500)
}

mainLoop()
