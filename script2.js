const board = document.getElementById('board')
for (i = 0; i < 200; i++) {
    const newSquares = document.createElement('div')
    newSquares.className = "square"
    board.appendChild(newSquares)
}

const tetrisShapes = [[4, 5, 14, 15], [5, 15, 25, 35], [5, 4, 6, 15], [5, 6, 14, 15], [4, 5, 15, 16], [4, 14, 24, 25], [5, 15, 24, 25]]
const boardArr = document.getElementsByClassName('square')
let shapeIndex
const titleColors = ['#39ff14', '#fe019a']
const title = document.getElementsByTagName('span')
let rowCounter = 0
let score = 0

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
                alert("You Lose!!")
            }
            boardArr[tetrisShapes[shapeIndex][i]].classList.add("occupied")
        }
    }
    return shapeIndex
}

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
    if (score > 2000) {
        document.getElementById("highScore").innerHTML = `high score ${score}`
    }
    rowCounter = 0
    document.getElementById("yourScore").innerHTML = `your score ${score}`
    return score
}

increaseSpeed = () => {
    if (score < 500) {
        setTimeout(mainLoop, 800)
    }
    if (score >= 500) {
        setTimeout(mainLoop, 700)
    }
    if (score >= 750) {
        setTimeout(mainLoop, 600)
    }
    if (score >= 1000) {
        setTimeout(mainLoop, 500)
    }
    if (score >= 1500) {
        setTimeout(mainLoop, 400)
    }
    if (score >= 2000) {
        setTimeout(mainLoop, 300)
    }
    if (score >= 3000) {
        setTimeout(mainLoop, 200)
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


mainLoop = () => {
    fall()
    stop()
    removeRows()
    spawnBlock()
    //increaseSpeed()
    setTimeout(mainLoop, 300)
}

mainLoop()