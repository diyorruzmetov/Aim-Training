const startBtn = document.querySelector('.start'),
    screens = document.querySelectorAll('.screen'),
    timeList = document.querySelector('.time-list'),
    timeEl = document.querySelector('#time'),
    board = document.querySelector('.board')


let time = 0,
    score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up')
})


timeList.addEventListener('click', (e) => {
    // console.log(e.target);
    if (e.target.classList.contains('time-btn')) {
        screens[1].classList.add('up')
        let btnAttr = e.target.getAttribute('data-time')
        time = Number(btnAttr)
        startGame();
    }
})

function decreaseTime() {
    if (time === 0) {
        timeEl.parentNode.classList.add('hide')
        board.innerHTML = `Ваш счет: ${score}`
    } else {
        let currentTime = --time;

        if (currentTime < 10) {
            currentTime = `0${currentTime}`;
        }

        timeEl.innerHTML = `00:${currentTime}`;
    }
}

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
}

function createRandomCircle() {
    const circle = document.createElement('div')

    circle.classList.add('circle')

    let {
        width,
        height
    } = board.getBoundingClientRect()

    let size = randomNumber(10, 80);

    let x = randomNumber(0, width - size)
    let y = randomNumber(0, height - size)

    circle.style = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgb(${getRandomInt(0, 255)},${getRandomInt(0, 255)}, ${getRandomInt(0, 255)});
    `
    board.appendChild(circle)

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}