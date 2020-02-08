//Make connection
const socket = io.connect('localhost:3000')

//This section creates the board of divs that the game is played on.
const board = document.getElementById('board')

const board2 = document.getElementById('board2')

let mainTimer
let gameActive = false
let numbArr2 = []

for (i = 0; i < 200; i++) {
    const newSquares = document.createElement('div')
    newSquares.className = "square"
    board.appendChild(newSquares)
}

for (i = 0; i < 200; i++) {
    const newSquares = document.createElement('div')
    newSquares.className = "square"
    board2.appendChild(newSquares)
}

for (i = 0; i < 200; i++) {
    numbArr2.push(0)
}

//This section instantiates my global variables.
const tetrisShapes = [[4, 5, 14, 15], [5, 15, 25, 35], [5, 4, 6, 15], [5, 6, 14, 15], [4, 5, 15, 16], [4, 14, 24, 25], [5, 15, 24, 25]]
const boardArr2 = document.getElementById('board2').children
let shapeIndex
const titleColors = ['#39ff14', '#fe019a']
const title = document.getElementsByTagName('span')
let rowCounter = 0
let score = 0
let highScore = 2000

//This is the function that makes the shapes move down.
const fall = () => {
    for (let i = numbArr2.length - 1; i >= 0; i--) {
        if (numbArr2[i] === 1) {
            if (numbArr2[i + 10] !== 2) {
                numbArr2[i + 10] = 1
                numbArr2[i] = 0
            }
        }
    }
}

//This is the function that checks to see if the shape can move down. If not it freezes the shape.
const stop = () => {
    for (let i = numbArr2.length - 1; i >= 0; i--) {
        if (numbArr2[i] === 1) {
            if ((i + 11 > 200) || (numbArr2[i + 10] === 2)) {
                for (let i = numbArr2.length - 1; i >= 0; i--) {
                    if (numbArr2[i] === 1) {
                        numbArr2[i] = 2
                    }
                }
            }
        }
    }
}

//This function allows the shapes to move right.
const moveRight = () => {
    let movableBlockCount = 0
    for (let i = numbArr2.length - 1; i >= 0; i--) {
        if (numbArr2[i] === 1) {
            if (((i + 1) % 10 != 0) && (numbArr2[i + 1] != 2)) {
                movableBlockCount = movableBlockCount + 1
            }
        }
    }
    if (movableBlockCount === 4) {
        for (let i = numbArr2.length - 1; i >= 0; i--) {
            if (numbArr2[i] === 1) {
                numbArr2[i + 1] = 1
                numbArr2[i] = 0
            }
        }
        stop()
    }
}

//This function allows the shapes to move left.
const moveLeft = () => {
    let movableBlockCount = 0
    for (let i = 0; i < numbArr2.length; i++) {
        if (numbArr2[i] === 1) {
            if ((i % 10 != 0) && (numbArr2[i - 1] != 2)) {
                movableBlockCount = movableBlockCount + 1
            }
        }
    }
    if (movableBlockCount === 4) {
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                numbArr2[i - 1] = 1
                numbArr2[i] = 0
            }
        }
        stop()
    }
}

//This function allows the shapes to rotate.
const rotateShape = () => {
    if (shapeIndex === 1) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((tempArr[1] % 10 != 0) && (numbArr2[tempArr[1] - 1] != 1) && (numbArr2[tempArr[1] - 1] != 2) && (numbArr2[tempArr[1] + 1] != 1) && (numbArr2[tempArr[1] + 1] != 2) && (numbArr2[tempArr[1] + 2] != 1) && (numbArr2[tempArr[1] + 2] != 2) && ((tempArr[1] + 1) % 10 != 0) && ((tempArr[1] + 2) % 10 != 0)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[2]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[1] - 1] = 1
            numbArr2[tempArr[1] + 1] = 1
            numbArr2[tempArr[1] + 2] = 1
            shapeIndex = 11
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 11) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[1] - 10] != 1) && (numbArr2[tempArr[1] - 10] != 2) && (numbArr2[tempArr[1] + 10] != 1) && (numbArr2[tempArr[1] + 10] != 2) && (numbArr2[tempArr[1] + 20] != 1) && (numbArr2[tempArr[1] + 20] != 2)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[2]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[1] - 10] = 1
            numbArr2[tempArr[1] + 10] = 1
            numbArr2[tempArr[1] + 20] = 1
            shapeIndex = 1
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 2) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[1] - 10] != 1) && (numbArr2[tempArr[1] - 10] != 2)) {
            numbArr2[tempArr[2]] = 0
            numbArr2[tempArr[1] - 10] = 1
            shapeIndex = 21
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 21) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[2] + 1] != 1) && (numbArr2[tempArr[2] + 1] != 2) && ((tempArr[2] + 1) % 10 != 0)) {
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[2] + 1] = 1
            shapeIndex = 22
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 22) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[2] + 10] != 1) && (numbArr2[tempArr[2] + 10] != 2)) {
            numbArr2[tempArr[1]] = 0
            numbArr2[tempArr[2] + 10] = 1
            shapeIndex = 23
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 23) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[1] - 1] != 1) && (numbArr2[tempArr[1] - 1] != 2) && (tempArr[1] % 10 != 0)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[1] - 1] = 1
            shapeIndex = 2
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 3) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[0] - 10] != 1) && (numbArr2[tempArr[0] - 10] != 2) && (numbArr2[tempArr[0] + 11] != 1) && (numbArr2[tempArr[0] + 11] != 2)) {
            numbArr2[tempArr[1]] = 0
            numbArr2[tempArr[2]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[0] - 10] = 1
            numbArr2[tempArr[0] + 11] = 1
            numbArr2[tempArr[0] + 1] = 1
            shapeIndex = 31
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 31) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[1] + 10] != 1) && (numbArr2[tempArr[1] + 10] != 2) && (numbArr2[tempArr[1] + 9] != 1) && (numbArr2[tempArr[1] + 9] != 2) && (tempArr[1] % 10 != 0) && ((tempArr[2] + 1) % 10 != 0)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[1] + 9] = 1
            numbArr2[tempArr[1] + 10] = 1
            shapeIndex = 3
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 4) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[1] - 10] != 1) && (numbArr2[tempArr[1] - 10] != 2) && (numbArr2[tempArr[1] + 9] != 1) && (numbArr2[tempArr[1] + 9] != 2)) {
            numbArr2[tempArr[2]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[1] + 9] = 1
            numbArr2[tempArr[1] - 10] = 1
            shapeIndex = 41
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 41) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[2] + 10] != 1) && (numbArr2[tempArr[2] + 10] != 2) && (numbArr2[tempArr[2] + 11] != 1) && (numbArr2[tempArr[2] + 11] != 2) && ((tempArr[2] + 1) % 10 != 0) && (tempArr[1] % 10 != 0)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[2] + 11] = 1
            numbArr2[tempArr[2] + 10] = 1
            shapeIndex = 4
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 5) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[1] + 1] != 1) && (numbArr2[tempArr[1] + 1] != 2) && (numbArr2[tempArr[1] - 1] != 1) && (numbArr2[tempArr[1] - 1] != 2) && (numbArr2[tempArr[1] + 9] != 2) && (numbArr2[tempArr[1] + 9] != 2) && (tempArr[1] % 10 != 0)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[2]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[1] + 1] = 1
            numbArr2[tempArr[1] - 1] = 1
            numbArr2[tempArr[1] + 9] = 1
            shapeIndex = 51
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 51) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[1] + 10] != 1) && (numbArr2[tempArr[1] + 10] != 2) && (numbArr2[tempArr[1] - 10] != 1) && (numbArr2[tempArr[1] - 10] != 2) && (numbArr2[tempArr[1] - 11] != 2) && (numbArr2[tempArr[1] - 11] != 2)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[2]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[1] + 10] = 1
            numbArr2[tempArr[1] - 10] = 1
            numbArr2[tempArr[1] - 11] = 1
            shapeIndex = 52
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 52) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[2] + 1] != 1) && (numbArr2[tempArr[2] + 1] != 2) && (numbArr2[tempArr[2] - 1] != 1) && (numbArr2[tempArr[2] - 1] != 2) && (numbArr2[tempArr[2] - 9] != 2) && (numbArr2[tempArr[2] - 9] != 2) && ((tempArr[1] + 1) % 10 != 0)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[1]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[2] + 1] = 1
            numbArr2[tempArr[2] - 1] = 1
            numbArr2[tempArr[2] - 9] = 1
            shapeIndex = 53
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 53) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[2] + 10] != 1) && (numbArr2[tempArr[2] + 10] != 2) && (numbArr2[tempArr[2] - 10] != 1) && (numbArr2[tempArr[2] - 10] != 2) && (numbArr2[tempArr[2] + 11] != 2) && (numbArr2[tempArr[2] + 11] != 2)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[1]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[2] + 10] = 1
            numbArr2[tempArr[2] - 10] = 1
            numbArr2[tempArr[2] + 11] = 1
            shapeIndex = 5
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 6) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[1] + 1] != 1) && (numbArr2[tempArr[1] + 1] != 2) && (numbArr2[tempArr[1] - 1] != 1) && (numbArr2[tempArr[1] - 1] != 2) && (numbArr2[tempArr[1] - 11] != 2) && (numbArr2[tempArr[1] - 11] != 2) && ((tempArr[1] + 1) % 10 != 0)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[2]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[1] + 1] = 1
            numbArr2[tempArr[1] - 1] = 1
            numbArr2[tempArr[1] - 11] = 1
            shapeIndex = 61
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 61) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[2] + 10] != 1) && (numbArr2[tempArr[2] + 10] != 2) && (numbArr2[tempArr[2] - 10] != 1) && (numbArr2[tempArr[2] - 10] != 2) && (numbArr2[tempArr[2] - 9] != 2) && (numbArr2[tempArr[2] - 9] != 2)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[1]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[2] + 10] = 1
            numbArr2[tempArr[2] - 10] = 1
            numbArr2[tempArr[2] - 9] = 1
            shapeIndex = 62
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 62) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[2] + 1] != 1) && (numbArr2[tempArr[2] + 1] != 2) && (numbArr2[tempArr[2] - 1] != 1) && (numbArr2[tempArr[2] - 1] != 2) && (numbArr2[tempArr[2] + 11] != 2) && (numbArr2[tempArr[2] + 11] != 2) && (tempArr[2] % 10 != 0)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[1]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[2] + 1] = 1
            numbArr2[tempArr[2] - 1] = 1
            numbArr2[tempArr[2] + 11] = 1
            shapeIndex = 63
            return shapeIndex
        }
        stop()
    }
    if (shapeIndex === 63) {
        let tempArr = []
        for (let i = 0; i < numbArr2.length; i++) {
            if (numbArr2[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr2[tempArr[1] + 10] != 1) && (numbArr2[tempArr[1] + 10] != 2) && (numbArr2[tempArr[1] - 10] != 1) && (numbArr2[tempArr[1] - 10] != 2) && (numbArr2[tempArr[1] + 9] != 2) && (numbArr2[tempArr[1] + 9] != 2)) {
            numbArr2[tempArr[0]] = 0
            numbArr2[tempArr[2]] = 0
            numbArr2[tempArr[3]] = 0
            numbArr2[tempArr[1] + 10] = 1
            numbArr2[tempArr[1] - 10] = 1
            numbArr2[tempArr[1] + 9] = 1
            shapeIndex = 6
            return shapeIndex
        }
        stop()
    }
}

//This function is called when no more shapes can be spawned.
const gameOver = () => {
    for (let i = 0; i < numbArr2.length; i++) {
        numbArr2[i] = 2
    }
    return score
}

//This function clears the board before every new game.
const clearBoard = () => {
    score = 0
    for (let i = 0; i < numbArr2.length; i++) {
        numbArr2[i] = 0
    }
}

//This function spanws the shapes at the top of the board.
const spawnBlock = () => {
    let activeBlockCount = 0
    for (let i = 0; i < numbArr2.length; i++) {
        if (numbArr2[i] === 1) {
            activeBlockCount = activeBlockCount + 1
        }
    }
    if (activeBlockCount === 0) {
        shapeIndex = Math.floor(Math.random() * 7)
        for (let i = 0; i < tetrisShapes[shapeIndex].length; i++) {
            if (numbArr2[tetrisShapes[shapeIndex][i]] === 2) {
                stopGame()
                gameOver()
                return
            }
            numbArr2[tetrisShapes[shapeIndex][i]] = 1
        }
    }
    return shapeIndex
}

//This function checks to see if there are complete rows that can be removed and it adjusts the score accordingly.
const removeRows = () => {
    for (let i = 0; i < 20; i++) {
        let tempArr = []
        for (let j = 0; j < 10; j++) {
            if (numbArr2[(i * 10) + j] === 2) {
                tempArr.push((i * 10) + j)
            }
        }
        if (tempArr.length === 10) {
            console.log("I should be firing")
            numbArr2.splice(tempArr[0], 10)
            numbArr2.unshift(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
            rowCounter = rowCounter + 1
        }
    }
    if (rowCounter === 1) {
        score = score + 100
    }
    if (rowCounter === 2) {
        score = score + 200
    }
    if (rowCounter === 3) {
        score = score + 400
    }
    if (rowCounter === 4) {
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
    clearInterval(framrateLoop)
    clearInterval(updateSocket)
    clearTimeout(mainTimer)
}

// This function increases the speed of the game relative to the score of the player
const changeSpeed = () => {
    if (score < 750) {
        setTimeout(mainLoop, 800)
    }
    if ((score >= 750) && (score < 1000)) {
        setTimeout(mainLoop, 700)
    }
    if ((score >= 1000) && (score < 2000)) {
        setTimeout(mainLoop, 600)
    }
    if ((score >= 2000) && (score < 3000)) {
        setTimeout(mainLoop, 500)
    }
    if ((score >= 3000) && (score < 5000)) {
        setTimeout(mainLoop, 400)
    }
    if ((score >= 5000) && (score < 10000)) {
        setTimeout(mainLoop, 300)
    }
    if (score >= 10000) {
        setTimeout(mainLoop, 200)
    }
}

//This function updates the board state
const setBoardState = () => {
    for (let i = 0; i < numbArr2.length; i++) {
        if (numbArr2[i] === 0) {
            boardArr2[i].className = "square"
        }
        if (numbArr2[i] === 1) {
            boardArr2[i].className = "square occupied"
        }
        if (numbArr2[i] === 2) {
            boardArr2[i].className = "square occupied dead"
        }
    }
}

const updateSocket = () => {
    socket.emit('updateSocket', numbArr2)
}

socket.on('updateSocket', (data) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i] === 0) {
            boardArr2[i].className = "square"
        }
        if (data[i] === 1) {
            boardArr2[i].className = "square occupied"
        }
        if (data[i] === 2) {
            boardArr2[i].className = "square occupied dead"
        }
    }
})

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
        changeSpeed()
        framrateLoop()
        sendDataLoop()
    }
}

const framrateLoop = () => {
    setInterval(setBoardState, 10)
}

const sendDataLoop = () => {
    setInterval(updateSocket, 250)
}

//This gives the play button the ability to start the game.
document.getElementById('play').addEventListener('click', () => {
    gameActive = true;
    console.log("Play has been clicked")
    clearBoard()
    mainLoop()
})