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
        stop()
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
        stop()
    }
}

const spawnBlock = () => {
    let activeBlockCount = 0
    for (let i = 0; i < boardArr.length; i++) {
        if (boardArr[i].className === "square occupied") {
            activeBlockCount = activeBlockCount + 1
        }
    }
    if (activeBlockCount === 0) {
        shapeIndex = Math.floor(Math.random() * 7)
        for (let i = 0; i < tetrisShapes[shapeIndex].length; i++) {
            boardArr[tetrisShapes[shapeIndex][i]].classList.add("occupied")
        }
    }
    return activeBlockCount
}

const removeRows = () => {
    for (let i = 0; i < 20; i++) {
        let tempArr = []
        console.log(tempArr.length)
        for (let j = 0; j < 10; j++) {
            if (boardArr[(i * 10) + j].className === "square occupied dead") {
                tempArr.push((i * 10) + j)
            }
        }
        console.log(tempArr.length)
        if (tempArr.length === 10) {
            for (let i = 0; i < tempArr.length; i++) {
                board.removeChild(boardArr[tempArr[i]])
                const newSquare = document.createElement('div')
                newSquare.className = "square"
                board.insertBefore(newSquare, board.firstChild)
            }
        }
    }
}

const fallFaster = () => {
    fall()
    stop()
    removeRows()
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
    removeRows()
    spawnBlock()
    setTimeout(mainLoop, 500)
}

mainLoop()
