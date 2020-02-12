//Make connection
const socket = io.connect('/')

//This section creates the board of divs that the game is played on.
const board = document.getElementById('board')

const board2 = document.getElementById('board2')

let gameActive = false
let numbArr = []

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
    numbArr.push(0)
}

//This section instantiates my global variables.
const tetrisShapes = [[4, 5, 14, 15], [5, 15, 25, 35], [5, 4, 6, 15], [5, 6, 14, 15], [4, 5, 15, 16], [4, 14, 24, 25], [5, 15, 24, 25]]
let availableShapeIndex = [0, 1, 2, 3, 4, 5, 6]
const Shapes = [[4, 5, 14, 15], [5, 15, 25, 35], [5, 4, 6, 15], [5, 6, 14, 15], [4, 5, 15, 16], [4, 14, 24, 25], [5, 15, 24, 25]]
const boardArr = document.getElementById('board').children
const boardArr2 = document.getElementById('board2').children
let shapeIndex
const titleColors = ['#39ff14', '#fe019a']
const title = document.getElementsByTagName('span')
let rowCounter = 0
let score = 0
let highScore = 2000
let frameRate
let dataLoop
let gameLoop

//This is the function that makes the shapes move down.
const fall = () => {
    for (let i = numbArr.length - 1; i >= 0; i--) {
        if (numbArr[i] === 1) {
            if (numbArr[i + 10] !== 2) {
                numbArr[i + 10] = 1
                numbArr[i] = 0
            }
        }
    }
}

//This is the function that checks to see if the shape can move down. If not it freezes the shape.
const stop = () => {
    for (let i = numbArr.length - 1; i >= 0; i--) {
        if (numbArr[i] === 1) {
            if ((i + 11 > 200) || (numbArr[i + 10] === 2)) {
                for (let i = numbArr.length - 1; i >= 0; i--) {
                    if (numbArr[i] === 1) {
                        numbArr[i] = 2
                    }
                }
            }
        }
    }
}

//This function allows the shapes to move right.
const moveRight = () => {
    let movableBlockCount = 0
    for (let i = numbArr.length - 1; i >= 0; i--) {
        if (numbArr[i] === 1) {
            if (((i + 1) % 10 != 0) && (numbArr[i + 1] != 2)) {
                movableBlockCount = movableBlockCount + 1
            }
        }
    }
    if (movableBlockCount === 4) {
        for (let i = numbArr.length - 1; i >= 0; i--) {
            if (numbArr[i] === 1) {
                numbArr[i + 1] = 1
                numbArr[i] = 0
            }
        }
        //stop()
    }
}

//This function allows the shapes to move left.
const moveLeft = () => {
    let movableBlockCount = 0
    for (let i = 0; i < numbArr.length; i++) {
        if (numbArr[i] === 1) {
            if ((i % 10 != 0) && (numbArr[i - 1] != 2)) {
                movableBlockCount = movableBlockCount + 1
            }
        }
    }
    if (movableBlockCount === 4) {
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                numbArr[i - 1] = 1
                numbArr[i] = 0
            }
        }
        //stop()
    }
}

//This function allows the shapes to rotate.
const rotateShape = () => {
    if (shapeIndex === 1) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((tempArr[1] % 10 != 0) && (numbArr[tempArr[1] - 1] != 1) && (numbArr[tempArr[1] - 1] != 2) && (numbArr[tempArr[1] + 1] != 1) && (numbArr[tempArr[1] + 1] != 2) && (numbArr[tempArr[1] + 2] != 1) && (numbArr[tempArr[1] + 2] != 2) && ((tempArr[1] + 1) % 10 != 0) && ((tempArr[1] + 2) % 10 != 0)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[2]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[1] - 1] = 1
            numbArr[tempArr[1] + 1] = 1
            numbArr[tempArr[1] + 2] = 1
            shapeIndex = 11
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 11) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[1] - 10] != 1) && (numbArr[tempArr[1] - 10] != 2) && (numbArr[tempArr[1] + 10] != 1) && (numbArr[tempArr[1] + 10] != 2) && (numbArr[tempArr[1] + 20] != 1) && (numbArr[tempArr[1] + 20] != 2)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[2]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[1] - 10] = 1
            numbArr[tempArr[1] + 10] = 1
            numbArr[tempArr[1] + 20] = 1
            shapeIndex = 1
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 2) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[1] - 10] != 1) && (numbArr[tempArr[1] - 10] != 2 && (numbArr[tempArr[1] - 10] >= 0))) {
            numbArr[tempArr[2]] = 0
            numbArr[tempArr[1] - 10] = 1
            shapeIndex = 21
            return shapeIndex
        }
        if ((numbArr[tempArr[1] - 10] != 1) && (numbArr[tempArr[1] - 10] != 2 && (numbArr[tempArr[1] - 10] < 0))) {
            console.log("The T should spin")
            fall()
            numbArr[tempArr[2]] = 0
            numbArr[tempArr[1] - 10] = 1
            shapeIndex = 21
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 21) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[2] + 1] != 1) && (numbArr[tempArr[2] + 1] != 2) && ((tempArr[2] + 1) % 10 != 0)) {
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[2] + 1] = 1
            shapeIndex = 22
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 22) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[2] + 10] != 1) && (numbArr[tempArr[2] + 10] != 2) && numbArr[tempArr[2] + 10] <= 200) {
            numbArr[tempArr[1]] = 0
            numbArr[tempArr[2] + 10] = 1
            shapeIndex = 23
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 23) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[1] - 1] != 1) && (numbArr[tempArr[1] - 1] != 2) && (tempArr[1] % 10 != 0)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[1] - 1] = 1
            shapeIndex = 2
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 3) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[0] - 10] != 1) && (numbArr[tempArr[0] - 10] != 2) && (numbArr[tempArr[0] + 11] != 1) && (numbArr[tempArr[0] + 11] != 2) && (numbArr[tempArr[1] - 10] >= 0)) {
            numbArr[tempArr[1]] = 0
            numbArr[tempArr[2]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[0] - 10] = 1
            numbArr[tempArr[0] + 11] = 1
            numbArr[tempArr[0] + 1] = 1
            shapeIndex = 31
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 31) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[1] + 10] != 1) && (numbArr[tempArr[1] + 10] != 2) && (numbArr[tempArr[1] + 9] != 1) && (numbArr[tempArr[1] + 9] != 2) && (tempArr[1] % 10 != 0) && ((tempArr[2] + 1) % 10 != 0)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[1] + 9] = 1
            numbArr[tempArr[1] + 10] = 1
            shapeIndex = 3
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 4) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[1] - 10] != 1) && (numbArr[tempArr[1] - 10] != 2) && (numbArr[tempArr[1] + 9] != 1) && (numbArr[tempArr[1] + 9] != 2) && (numbArr[tempArr[1] - 10] >= 0)) {
            numbArr[tempArr[2]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[1] + 9] = 1
            numbArr[tempArr[1] - 10] = 1
            shapeIndex = 41
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 41) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[2] + 10] != 1) && (numbArr[tempArr[2] + 10] != 2) && (numbArr[tempArr[2] + 11] != 1) && (numbArr[tempArr[2] + 11] != 2) && ((tempArr[2] + 1) % 10 != 0) && (tempArr[1] % 10 != 0)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[2] + 11] = 1
            numbArr[tempArr[2] + 10] = 1
            shapeIndex = 4
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 5) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[1] + 1] != 1) && (numbArr[tempArr[1] + 1] != 2) && (numbArr[tempArr[1] - 1] != 1) && (numbArr[tempArr[1] - 1] != 2) && (numbArr[tempArr[1] + 9] != 2) && (numbArr[tempArr[1] + 9] != 2) && (tempArr[1] % 10 != 0)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[2]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[1] + 1] = 1
            numbArr[tempArr[1] - 1] = 1
            numbArr[tempArr[1] + 9] = 1
            shapeIndex = 51
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 51) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[1] + 10] != 1) && (numbArr[tempArr[1] + 10] != 2) && (numbArr[tempArr[1] - 10] != 1) && (numbArr[tempArr[1] - 10] != 2) && (numbArr[tempArr[1] - 11] != 2) && (numbArr[tempArr[1] - 11] != 2)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[2]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[1] + 10] = 1
            numbArr[tempArr[1] - 10] = 1
            numbArr[tempArr[1] - 11] = 1
            shapeIndex = 52
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 52) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[2] + 1] != 1) && (numbArr[tempArr[2] + 1] != 2) && (numbArr[tempArr[2] - 1] != 1) && (numbArr[tempArr[2] - 1] != 2) && (numbArr[tempArr[2] - 9] != 2) && (numbArr[tempArr[2] - 9] != 2) && ((tempArr[1] + 1) % 10 != 0)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[1]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[2] + 1] = 1
            numbArr[tempArr[2] - 1] = 1
            numbArr[tempArr[2] - 9] = 1
            shapeIndex = 53
            return shapeIndex
        }
        // stop()
    }
    if (shapeIndex === 53) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[2] + 10] != 1) && (numbArr[tempArr[2] + 10] != 2) && (numbArr[tempArr[2] - 10] != 1) && (numbArr[tempArr[2] - 10] != 2) && (numbArr[tempArr[2] + 11] != 2) && (numbArr[tempArr[2] + 11] != 2)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[1]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[2] + 10] = 1
            numbArr[tempArr[2] - 10] = 1
            numbArr[tempArr[2] + 11] = 1
            shapeIndex = 5
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 6) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[1] + 1] != 1) && (numbArr[tempArr[1] + 1] != 2) && (numbArr[tempArr[1] - 1] != 1) && (numbArr[tempArr[1] - 1] != 2) && (numbArr[tempArr[1] - 11] != 2) && (numbArr[tempArr[1] - 11] != 2) && ((tempArr[1] + 1) % 10 != 0)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[2]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[1] + 1] = 1
            numbArr[tempArr[1] - 1] = 1
            numbArr[tempArr[1] - 11] = 1
            shapeIndex = 61
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 61) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[2] + 10] != 1) && (numbArr[tempArr[2] + 10] != 2) && (numbArr[tempArr[2] - 10] != 1) && (numbArr[tempArr[2] - 10] != 2) && (numbArr[tempArr[2] - 9] != 2) && (numbArr[tempArr[2] - 9] != 2)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[1]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[2] + 10] = 1
            numbArr[tempArr[2] - 10] = 1
            numbArr[tempArr[2] - 9] = 1
            shapeIndex = 62
            return shapeIndex
        }
        //stop()
    }
    if (shapeIndex === 62) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[2] + 1] != 1) && (numbArr[tempArr[2] + 1] != 2) && (numbArr[tempArr[2] - 1] != 1) && (numbArr[tempArr[2] - 1] != 2) && (numbArr[tempArr[2] + 11] != 2) && (numbArr[tempArr[2] + 11] != 2) && (tempArr[2] % 10 != 0)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[1]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[2] + 1] = 1
            numbArr[tempArr[2] - 1] = 1
            numbArr[tempArr[2] + 11] = 1
            shapeIndex = 63
            return shapeIndex
        }
        // stop()
    }
    if (shapeIndex === 63) {
        let tempArr = []
        for (let i = 0; i < numbArr.length; i++) {
            if (numbArr[i] === 1) {
                tempArr.push(i)
            }
        }
        if ((numbArr[tempArr[1] + 10] != 1) && (numbArr[tempArr[1] + 10] != 2) && (numbArr[tempArr[1] - 10] != 1) && (numbArr[tempArr[1] - 10] != 2) && (numbArr[tempArr[1] + 9] != 2) && (numbArr[tempArr[1] + 9] != 2)) {
            numbArr[tempArr[0]] = 0
            numbArr[tempArr[2]] = 0
            numbArr[tempArr[3]] = 0
            numbArr[tempArr[1] + 10] = 1
            numbArr[tempArr[1] - 10] = 1
            numbArr[tempArr[1] + 9] = 1
            shapeIndex = 6
            return shapeIndex
        }
        //stop()
    }
}

//This function is called when no more shapes can be spawned.
const gameOver = () => {
    availableShapeIndex = [0, 1, 2, 3, 4, 5, 6]
    document.getElementById('play').addEventListener('click', play)
    for (let i = 0; i < numbArr.length; i++) {
        numbArr[i] = 2
    }
    setBoardState()
    return score
}

//This function clears the board before every new game.
const clearBoard = () => {
    score = 0
    for (let i = 0; i < numbArr.length; i++) {
        numbArr[i] = 0
    }
}

//This function spanws the shapes at the top of the board.
const spawnBlock = () => {
    let activeBlockCount = 0
    let deadBlockCount = 0
    for (let i = 0; i < numbArr.length; i++) {
        if (numbArr[i] === 1) {
            activeBlockCount = activeBlockCount + 1
        }
        if (numbArr[i] === 2) {
            deadBlockCount = deadBlockCount + 1
        }
    }
    if (activeBlockCount === 0 && deadBlockCount != 200) {
        console.log(availableShapeIndex)
        if (availableShapeIndex.length === 0) {
            availableShapeIndex = [0, 1, 2, 3, 4, 5, 6]
        }
        let tempIndex = Math.floor(Math.random() * availableShapeIndex.length)
        shapeIndex = availableShapeIndex[tempIndex]
        for (let i = 0; i < tetrisShapes[shapeIndex].length; i++) {
            if (numbArr[tetrisShapes[shapeIndex][i]] === 2) {
                stopGame()
                socket.emit("gameOver")
                return
            }
            numbArr[tetrisShapes[shapeIndex][i]] = 1

        }
        availableShapeIndex.splice(tempIndex, 1)
    }
    return shapeIndex
}

socket.on("gameOver", () => {
    stopGame()
})

//This function checks to see if there are complete rows that can be removed and it adjusts the score accordingly.
const removeRows = () => {
    let deadSquares = 0
    for (let i = 0; i < numbArr.length; i++) {
        if (numbArr[i] === 2) {
            deadSquares = deadSquares + 1
        }
    }
    for (let i = 0; i < 20; i++) {
        let tempArr = []
        for (let j = 0; j < 10; j++) {
            if (numbArr[(i * 10) + j] === 2) {
                tempArr.push((i * 10) + j)
            }
        }
        if (tempArr.length === 10 && deadSquares != 200) {
            numbArr.splice(tempArr[0], 10)
            numbArr.unshift(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
            rowCounter = rowCounter + 1
        }
    }
    socket.emit('addRows', rowCounter)
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
socket.on('addRows', (data) => {
    if (data > 1) {
        for (let i = 0; i < data; i++) {
            fall()
            numbArr.splice(0, 10)
            numbArr.push(2, 2, 2, 2, 2, 2, 2, 0, 2, 2)
        }
    }
})

//This function stops the game by clearing the timeout loop.
stopGame = () => {
    //console.log("I have been summoned")
    gameActive = false;
    gameOver()
    clearTimeout(gameLoop)
    clearInterval(frameRate)
    clearInterval(dataLoop)
}

// This function increases the speed of the game relative to the score of the player
const changeSpeed = () => {
    if (score < 750) {
        gameLoop = setTimeout(mainLoop, 800)
    }
    if ((score >= 750) && (score < 1000)) {
        gameLoop = setTimeout(mainLoop, 700)
    }
    if ((score >= 1000) && (score < 2000)) {
        gameLoop = setTimeout(mainLoop, 600)
    }
    if ((score >= 2000) && (score < 3000)) {
        gameLoop = setTimeout(mainLoop, 500)
    }
    if ((score >= 3000) && (score < 5000)) {
        gameLoop = setTimeout(mainLoop, 400)
    }
    if ((score >= 5000) && (score < 10000)) {
        gameLoop = setTimeout(mainLoop, 300)
    }
    if (score >= 10000) {
        gameLoop = setTimeout(mainLoop, 200)
    }
}

//This function adds the shadow of the block on the board
const shadowShape = () => {
    let tempArr = []
    let differenceArr = []
    let smallestDistanceIndex = 0
    for (let i = 0; i < numbArr.length; i++) {
        if (numbArr[i] === 1) {
            tempArr.push(i)
        }
        if (numbArr[i] === 3) {
            numbArr[i] = 0
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = tempArr[i]; j < 210; j = j + 10) {
            if (numbArr[j] === 2 || (j >= 200 && j < 250)) {
                let differenceBetween = j - tempArr[i] - 10
                differenceArr.push(differenceBetween)
                j = 300
            }
        }
    }
    for (let i = 1; i < 4; i++) {
        if (differenceArr[i] < differenceArr[smallestDistanceIndex]) {
            smallestDistanceIndex = i
        }
    }
    if (differenceArr[smallestDistanceIndex] > 0) {
        for (let i = 0; i < 4; i++) {
            if (numbArr[tempArr[i] + differenceArr[smallestDistanceIndex]] != 1 && numbArr[tempArr[i] + differenceArr[smallestDistanceIndex]] != 2) {
                numbArr[tempArr[i] + differenceArr[smallestDistanceIndex]] = 3
            }
        }
    }
}

//This function updates the board state
const setBoardState = () => {
    shadowShape()
    //console.log("I'm still firing")
    for (let i = 0; i < numbArr.length; i++) {
        if (numbArr[i] === 0) {
            boardArr[i].className = "square"
        }
        if (numbArr[i] === 1) {
            boardArr[i].className = "square occupied"
        }
        if (numbArr[i] === 2) {
            boardArr[i].className = "square dead"
        }
        if (numbArr[i] === 3) {
            boardArr[i].className = "square shadow"
        }
    }
    //stop()
}

const updateSocket = () => {
    //console.log("I'm also firing")
    socket.emit('updateSocket', numbArr)
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
            boardArr2[i].className = "square dead"
        }
        if (data[i] === 3) {
            boardArr2[i].className = "square shadow"
        }
    }
})

//This function allows the player to increase fall speed.
const fallFaster = () => {
    stop()
    fall()
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
document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        stopGame()
    }
})

//This function is the main loop of the game.
const mainLoop = () => {
    stop()
    fall()
    removeRows()
    spawnBlock()
    if (gameActive === true) {
        changeSpeed()
    }
}

const frameRateLoop = () => {
    frameRate = setInterval(setBoardState, 40)
}

const sendDataLoop = () => {
    dataLoop = setInterval(updateSocket, 250)
}

const play = () => {
    socket.emit('play')
}

document.getElementById('play').addEventListener('click', play)

socket.on('play', () => {
    document.getElementById('play').removeEventListener('click', play)
    gameActive = true;
    frameRateLoop()
    sendDataLoop()
    clearBoard()
    mainLoop()
})