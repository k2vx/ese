import * as M from './functions'
import {canvas, ctx, scale, reset} from '@/app'
import {roundNum} from './functions'

export default class Snake {
  constructor() {
    this.x = 0
    this.y = 0
    this.xSpeed = 0
    this.ySpeed = 0
    this.total = 0
    this.tail = []
    this.multiplier = 0
    
    this.head = M.randomColor()
    this.body = M.randomColor()
  }
  
  draw() {
    this.update()
    
    ctx.fillStyle = this.body
    
    for (let i = 0; i < this.tail.length; i++) ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale)
    
    ctx.fillStyle = this.head
    ctx.fillRect(this.x, this.y, scale, scale)
  }
  
  update() {
    for (let i = 0; i < this.tail.length - 1; i++) this.tail[i] = this.tail[i + 1]
    
    this.tail[this.total - 1] = { x: this.x, y: this.y }
    
    this.x += roundNum(this.xSpeed)
    this.y += roundNum(this.ySpeed)
    
    if (this.x >= canvas.width) this.x = 0
    if (this.y >= canvas.height) this.y = 0
    if (this.x < 0) this.x = canvas.width
    if (this.y < 0) this.y = canvas.height
  }
  
  eat(fruit) {
    return (this.x === fruit.x) && (this.y === fruit.y)
  }
  
  collision() {
    for (let i = 0; i < this.tail.length; i++) if (this.x === this.tail[i].x && this.y === this.tail[i].y) reset()
  }
  
  direction(direction) {
    switch (direction) {
      case 'Up':
      case 'w':
        this.xSpeed = 0
        this.ySpeed = -scale + this.multiplier
        break
      case 'Down':
      case 's':
        this.xSpeed = 0
        this.ySpeed = scale + this.multiplier
        break
      case 'Left':
      case 'o':
        this.xSpeed = -scale + this.multiplier
        this.ySpeed = 0
        break
      case 'Right':
      case 'd':
        this.xSpeed = scale + this.multiplier
        this.ySpeed = 0
        break
    }
  }
}
