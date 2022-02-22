import * as M from './controllers/functions'
import Fruit from './controllers/fruit'
import Snake from './controllers/snake'
import Ai from './controllers/ai'

const canvas = document.querySelector('#game'), ctx = canvas.getContext("2d"), viewpoint = M.viewpoint()

canvas.width = M.roundNum(viewpoint['width'])
canvas.height = M.roundNum(viewpoint['height'])

console.log('Resolution:', canvas.width, canvas.height)

const scale = M.roundNum((canvas.width + canvas.height) / 50),
  rows = M.roundNum(canvas.height / scale),
  columns = M.roundNum(canvas.width / scale),
  stats = { 'score': 0, 'maxscore': 0, 'try': 0 },
  MaxScoreTag = document.querySelector('#maxscore'), ScoreTag = document.querySelector('#score')

let snake, fruit, moved
Init()

let executed = false

document.getElementById('ai').addEventListener('click', () => {
  if (!executed) {
    setup(true)
    executed = true
    document.querySelector('#ai').style.display = 'none'
  }
})

window.addEventListener('keydown', (() => {
  if (!executed) {
    setup()
    executed = true
    document.querySelector('#ai').style.display = 'none'
  }
}))

window.addEventListener('keydown', ((evt) => {
  snake.direction(evt.key.replace('Arrow', ''))
}))

function Init() {
  snake = new Snake()
  fruit = new Fruit()
}

function setup(ai = false) {
  if (ai) {
    AiLog()
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.querySelector('#MobPlay').style.display = 'none'
    }
  }
  
  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    if (ai) moved = Ai(snake, fruit, moved)
  
    snake.draw()
    fruit.draw()
    snake.collision()
    
    if (snake.eat(fruit)) {
      fruit.set()
      snake.total++
      stats['score'] = snake.total
    }
  
    ScoreTag.innerText = stats['score']
    if (stats['score'] > stats['maxscore']) stats['maxscore'] = stats['score']
    if (stats['try'] >= 1) MaxScoreTag.innerText = stats['maxscore']
  }, ai ? 30 : 60)
}

function reset() {
  Init()
  
  ScoreTag.innerText = 'Game over'
  stats['score'] = 0
  stats['try']++
}

function AiLog() {
  document.querySelector('#ai').style.display = 'none'
  
  let node = document.createElement("span")
  node.setAttribute("id", "AiTag")
  node.innerText = 'Autopilot: ON'
  document.querySelector('.stats').appendChild(node)
}

export {canvas, ctx, rows, columns, scale, ScoreTag, stats, setup, snake, fruit, reset}