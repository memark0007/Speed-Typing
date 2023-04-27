const wordEl = document.getElementById('word')
const textEl = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')

const btnLevelEl = document.getElementById('level-btn')
const settingsEl = document.getElementById('settings')
const levelFormEl = document.getElementById('level-form')
const levelEl = document.getElementById('level')
const gameOverEl = document.getElementById('gameover-container')

const words = ['one', 'two', 'tree']
let randomWord;
let score = 0;
let time = 15;

let level = 'medium'

const saveMode= localStorage.getItem("mode") !== null? localStorage.getItem('mode') :'medium'

const timeInterval = setInterval(() => {
    updateTime()
}, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}
function displayWordToUI() {
    timeEl.innerHTML = time
    randomWord = getRandomWord()
    wordEl.innerHTML = randomWord
}

textEl.addEventListener('input', e => {
    const inputText = e.target.value

    if (inputText === randomWord) {
            if(saveMode== 'easy'){
        time += 4
    }else if(saveMode == 'medium'){
        time += 3
    }else{
        time += 2
    }
        displayWordToUI()
        updateScore()
        e.target.value = ''
    }
})
function updateScore() {
    score += 10
    scoreEl.innerHTML = score
}
function updateTime() {
    time--
    timeEl.innerHTML = time
    if (time === 0) {
        clearInterval(timeInterval)
        gameOver()
    }
}
function gameOver() {
    gameOverEl.innerHTML = '<h1>จบเกมแล้วนะครับ</h1><p>คะแนนของคุณ = ' + score + ' คะแนน</p> <button onclick="location.reload()">เล่นอีกครั้ง</button>'
    gameOverEl.style.display = 'flex'
}
btnLevelEl.addEventListener('click', ()=>{
    settingsEl.classList.toggle('hide')
})

levelEl.addEventListener('change',(e)=>{
    level=e.target.value
    localStorage.setItem("mode", level)
})

function startGame(){
    levelEl.value = saveMode
    if(saveMode== 'easy'){
        time = 15
    }else if(saveMode == 'medium'){
        time = 10
    }else{
        time = 5
    }
    displayWordToUI()
}

startGame()
textEl.focus();