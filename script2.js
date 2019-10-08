//This section creates the board of divs that the game is played on.
const board = document.getElementById('board')
let mainTimer
let gameActive = false;
for (i = 0; i < 200; i++) {
    const newSquares = document.createElement('div')
    newSquares.className = "square"
    board.appendChild(newSquares)
}

//This section instantiates my global variables.
const tetrisShapes = [[4, 5, 14, 15], [5, 15, 25, 35], [5, 4, 6, 15], [5, 6, 14, 15], [4, 5, 15, 16], [4, 14, 24, 25], [5, 15, 24, 25]]
const boardArr = document.getElementsByClassName('square')
let shapeIndex
const titleColors = ['#39ff14', '#fe019a']
const title = document.getElementsByTagName('span')
let rowCounter = 0
let score = 0
let highScore = 2000

//This is the function that makes the shapes move down.
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

//This is the function that checks to see if the shape can move down. If not it freezes the shape.
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

//This function allows the shapes to move right.
const moveRight = () => {
    let movableBlockCount = 0
    for (let i = boardArr.length - 1; i >= 0; i--) {
        if (boardArr[i].className === "square occupied") {
            if (((i + 1) % 10 != 0) && (boardArr[i + 1].className != "square occupied dead")) {
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

//This function allows the shapes to move left.
const moveLeft = () => {
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

//This function allows the shapes to rotate.
const rotateShape = () => {
    if (shapeIndex === 1) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((tempArr[1] % 10 != 0) && (boardArr[tempArr[1] - 1].className != "square occupied") && (boardArr[tempArr[1] - 1].className != "square occupied dead") && (boardArr[tempArr[1] + 1].className != "square occupied") && (boardArr[tempArr[1] + 1].className != "square occupied dead") && (boardArr[tempArr[1] + 2].className != "square occupied") && (boardArr[tempArr[1] + 2].className != "square occupied dead") && ((tempArr[1] + 1) % 10 != 0) && ((tempArr[1] + 2) % 10 != 0)) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[2]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[1] - 1].classList.add('occupied')
            boardArr[tempArr[1] + 1].classList.add('occupied')
            boardArr[tempArr[1] + 2].classList.add('occupied')
            shapeIndex = 11
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 11) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[1] - 10].className != "square occupied") && (boardArr[tempArr[1] - 10].className != "square occupied dead") && (boardArr[tempArr[1] + 10].className != "square occupied") && (boardArr[tempArr[1] + 10].className != "square occupied dead") && (boardArr[tempArr[1] + 20].className != "square occupied") && (boardArr[tempArr[1] + 20].className != "square occupied dead")) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[2]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[1] - 10].classList.add('occupied')
            boardArr[tempArr[1] + 10].classList.add('occupied')
            boardArr[tempArr[1] + 20].classList.add('occupied')
            shapeIndex = 1
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 2) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[1] - 10].className != "square occupied") && (boardArr[tempArr[1] - 10].className != "square occupied dead")) {
            boardArr[tempArr[2]].classList.remove("occupied")
            boardArr[tempArr[1] - 10].classList.add('occupied')
            shapeIndex = 21
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 21) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[2] + 1].className != "square occupied") && (boardArr[tempArr[2] + 1].className != "square occupied dead") && ((tempArr[2] + 1) % 10 != 0)) {
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[2] + 1].classList.add('occupied')
            shapeIndex = 22
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 22) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[2] + 10].className != "square occupied") && (boardArr[tempArr[2] + 10].className != "square occupied dead")) {
            boardArr[tempArr[1]].classList.remove("occupied")
            boardArr[tempArr[2] + 10].classList.add('occupied')
            shapeIndex = 23
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 23) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[1] - 1].className != "square occupied") && (boardArr[tempArr[1] - 1].className != "square occupied dead") && (tempArr[1] % 10 != 0)) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[1] - 1].classList.add('occupied')
            shapeIndex = 2
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 3) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[0] - 10].className != "square occupied") && (boardArr[tempArr[0] - 10].className != "square occupied dead") && (boardArr[tempArr[0] + 11].className != "square occupied") && (boardArr[tempArr[0] + 11].className != "square occupied dead")) {
            boardArr[tempArr[1]].classList.remove("occupied")
            boardArr[tempArr[2]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[0] - 10].classList.add('occupied')
            boardArr[tempArr[0] + 11].classList.add('occupied')
            boardArr[tempArr[0] + 1].classList.add('occupied')
            shapeIndex = 31
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 31) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[1] + 10].className != "square occupied") && (boardArr[tempArr[1] + 10].className != "square occupied dead") && (boardArr[tempArr[1] + 9].className != "square occupied") && (boardArr[tempArr[1] + 9].className != "square occupied dead") && (tempArr[1] % 10 != 0) && ((tempArr[2] + 1) % 10 != 0)) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[1] + 9].classList.add('occupied')
            boardArr[tempArr[1] + 10].classList.add('occupied')
            shapeIndex = 3
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 4) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[1] - 10].className != "square occupied") && (boardArr[tempArr[1] - 10].className != "square occupied dead") && (boardArr[tempArr[1] + 9].className != "square occupied") && (boardArr[tempArr[1] + 9].className != "square occupied dead")) {
            boardArr[tempArr[2]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[1] + 9].classList.add('occupied')
            boardArr[tempArr[1] - 10].classList.add('occupied')
            shapeIndex = 41
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 41) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[2] + 10].className != "square occupied") && (boardArr[tempArr[2] + 10].className != "square occupied dead") && (boardArr[tempArr[2] + 11].className != "square occupied") && (boardArr[tempArr[2] + 11].className != "square occupied dead") && ((tempArr[2] + 1) % 10 != 0) && (tempArr[1] % 10 != 0)) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[2] + 11].classList.add('occupied')
            boardArr[tempArr[2] + 10].classList.add('occupied')
            shapeIndex = 4
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 5) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[1] + 1].className != "square occupied") && (boardArr[tempArr[1] + 1].className != "square occupied dead") && (boardArr[tempArr[1] - 1].className != "square occupied") && (boardArr[tempArr[1] - 1].className != "square occupied dead") && (boardArr[tempArr[1] + 9].className != "square occupied dead") && (boardArr[tempArr[1] + 9].className != "square occupied dead") && (tempArr[1] % 10 != 0)) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[2]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[1] + 1].classList.add('occupied')
            boardArr[tempArr[1] - 1].classList.add('occupied')
            boardArr[tempArr[1] + 9].classList.add('occupied')
            shapeIndex = 51
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 51) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[1] + 10].className != "square occupied") && (boardArr[tempArr[1] + 10].className != "square occupied dead") && (boardArr[tempArr[1] - 10].className != "square occupied") && (boardArr[tempArr[1] - 10].className != "square occupied dead") && (boardArr[tempArr[1] - 11].className != "square occupied dead") && (boardArr[tempArr[1] - 11].className != "square occupied dead")) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[2]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[1] + 10].classList.add('occupied')
            boardArr[tempArr[1] - 10].classList.add('occupied')
            boardArr[tempArr[1] - 11].classList.add('occupied')
            shapeIndex = 52
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 52) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[2] + 1].className != "square occupied") && (boardArr[tempArr[2] + 1].className != "square occupied dead") && (boardArr[tempArr[2] - 1].className != "square occupied") && (boardArr[tempArr[2] - 1].className != "square occupied dead") && (boardArr[tempArr[2] - 9].className != "square occupied dead") && (boardArr[tempArr[2] - 9].className != "square occupied dead") && ((tempArr[1] + 1) % 10 != 0)) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[1]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[2] + 1].classList.add('occupied')
            boardArr[tempArr[2] - 1].classList.add('occupied')
            boardArr[tempArr[2] - 9].classList.add('occupied')
            shapeIndex = 53
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 53) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[2] + 10].className != "square occupied") && (boardArr[tempArr[2] + 10].className != "square occupied dead") && (boardArr[tempArr[2] - 10].className != "square occupied") && (boardArr[tempArr[2] - 10].className != "square occupied dead") && (boardArr[tempArr[2] + 11].className != "square occupied dead") && (boardArr[tempArr[2] + 11].className != "square occupied dead")) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[1]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[2] + 10].classList.add('occupied')
            boardArr[tempArr[2] - 10].classList.add('occupied')
            boardArr[tempArr[2] + 11].classList.add('occupied')
            shapeIndex = 5
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 6) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[1] + 1].className != "square occupied") && (boardArr[tempArr[1] + 1].className != "square occupied dead") && (boardArr[tempArr[1] - 1].className != "square occupied") && (boardArr[tempArr[1] - 1].className != "square occupied dead") && (boardArr[tempArr[1] - 11].className != "square occupied dead") && (boardArr[tempArr[1] - 11].className != "square occupied dead") && ((tempArr[1] + 1) % 10 != 0)) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[2]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[1] + 1].classList.add('occupied')
            boardArr[tempArr[1] - 1].classList.add('occupied')
            boardArr[tempArr[1] - 11].classList.add('occupied')
            shapeIndex = 61
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 61) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[2] + 10].className != "square occupied") && (boardArr[tempArr[2] + 10].className != "square occupied dead") && (boardArr[tempArr[2] - 10].className != "square occupied") && (boardArr[tempArr[2] - 10].className != "square occupied dead") && (boardArr[tempArr[2] - 9].className != "square occupied dead") && (boardArr[tempArr[2] - 9].className != "square occupied dead")) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[1]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[2] + 10].classList.add('occupied')
            boardArr[tempArr[2] - 10].classList.add('occupied')
            boardArr[tempArr[2] - 9].classList.add('occupied')
            shapeIndex = 62
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 62) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[2] + 1].className != "square occupied") && (boardArr[tempArr[2] + 1].className != "square occupied dead") && (boardArr[tempArr[2] - 1].className != "square occupied") && (boardArr[tempArr[2] - 1].className != "square occupied dead") && (boardArr[tempArr[2] + 11].className != "square occupied dead") && (boardArr[tempArr[2] + 11].className != "square occupied dead") && (tempArr[2] % 10 != 0)) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[1]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[2] + 1].classList.add('occupied')
            boardArr[tempArr[2] - 1].classList.add('occupied')
            boardArr[tempArr[2] + 11].classList.add('occupied')
            shapeIndex = 63
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 63) {
        let tempArr = []
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].className === "square occupied") {
                tempArr.push(i)
            }
        }
        if ((boardArr[tempArr[1] + 10].className != "square occupied") && (boardArr[tempArr[1] + 10].className != "square occupied dead") && (boardArr[tempArr[1] - 10].className != "square occupied") && (boardArr[tempArr[1] - 10].className != "square occupied dead") && (boardArr[tempArr[1] + 9].className != "square occupied dead") && (boardArr[tempArr[1] + 9].className != "square occupied dead")) {
            boardArr[tempArr[0]].classList.remove("occupied")
            boardArr[tempArr[2]].classList.remove("occupied")
            boardArr[tempArr[3]].classList.remove("occupied")
            boardArr[tempArr[1] + 10].classList.add('occupied')
            boardArr[tempArr[1] - 10].classList.add('occupied')
            boardArr[tempArr[1] + 9].classList.add('occupied')
            shapeIndex = 6
            return shapeIndex
        }
        stop()
    }
}

//This function is called when no more shapes can be spawned.
const gameOver = () => {
    // anime({
    //     targets: '.square',
    //     background: '#fe019a',
    //     delay: anime.stagger(5) // increase delay by 100ms for each elements.
    // });
    for (let i = 0; i < boardArr.length; i++) {
        boardArr[i].classList.add("dead")
    }
    score = 0
    return score
}

//This function clears the board before every new game.
const clearBoard = () => {
    for (let i = 0; i < boardArr.length; i++) {
        boardArr[i].classList.remove("dead")
        boardArr[i].classList.remove("occupied")
    }
}

//This function spanws the shapes at the top of the board.
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
            if (boardArr[tetrisShapes[shapeIndex][i]].className === "square occupied dead") {
                stopGame()
                gameOver()
                return
            }
            boardArr[tetrisShapes[shapeIndex][i]].classList.add("occupied")
        }
    }
    return shapeIndex
}

//This function checks to see if there are complete rows that can be removed and it adjusts the score accordingly.
const removeRows = () => {
    for (let i = 0; i < 20; i++) {
        let tempArr = []
        for (let j = 0; j < 10; j++) {
            if (boardArr[(i * 10) + j].className === "square occupied dead") {
                tempArr.push((i * 10) + j)
            }
        }
        if (tempArr.length === 10) {
            for (let i = 0; i < tempArr.length; i++) {
                board.removeChild(boardArr[tempArr[i]])
                const newSquare = document.createElement('div')
                newSquare.className = "square"
                board.insertBefore(newSquare, board.firstChild)
                rowCounter = rowCounter + 1
            }
        }
    }
    if (rowCounter === 10) {
        score = score + 100
    }
    if (rowCounter === 20) {
        score = score + 200
    }
    if (rowCounter === 30) {
        score = score + 400
    }
    if (rowCounter === 40) {
        score = score + 1200
    }
    if (score > highScore) {
        highScore = score
        document.getElementById("highScore").innerHTML = `high score ${highScore}`
    }
    rowCounter = 0
    document.getElementById("yourScore").innerHTML = `your score ${score}`
    return score
}

//This function stops the game by clearing the timeout loop.
stopGame = () => {
    gameActive = false;
    clearTimeout(mainTimer)
}

//const increaseSpeed = () => {
//    clearTimeout(mainTimer)
//     if (score < 500) {
//         setTimeout(mainLoop, 800)
//     }
//     if (score >= 500) {
//         setTimeout(mainLoop, 700)
//     }
//     if (score >= 750) {
//         setTimeout(mainLoop, 600)
//     }
//     if (score >= 1000) {
//         setTimeout(mainLoop, 500)
//     }
//     if (score >= 1500) {
//         setTimeout(mainLoop, 400)
//     }
//     if (score >= 2000) {
//         setTimeout(mainLoop, 300)
//     }
//     if (score >= 3000) {
//         setTimeout(mainLoop, 200)
//     }
// }

//This function allows the player to increase fall speed.
const fallFaster = () => {
    fall()
    stop()
    removeRows()
    spawnBlock()
}

//These attach event listeners to left, right, down, and up arrow keys as well as preventing default scrolling on the down key.
document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowDown') {
        event.preventDefault()
    }
})
document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowDown') {
        fallFaster()
    }
})
document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowUp') {
        rotateShape()
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

//This function is the main loop of the game.
const mainLoop = () => {
    fall()
    stop()
    removeRows()
    spawnBlock()
    if (gameActive === true) {
        mainTimer = setTimeout(mainLoop, 275)
    }
    console.log(shapeIndex)
}

const startGame = () => {

}
//This gives the play button the ability to start the game.

document.getElementById('play').addEventListener('click', () => {
    gameActive = true;
    clearBoard()
    mainLoop()
})


