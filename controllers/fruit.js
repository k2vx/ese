import {ctx, rows, columns, scale} from '@/app'
import * as M from './functions'
import {roundNum} from './functions'

export default class Fruit {
  constructor() {
    this.x = 0
    this.y = 0
    this.color = M.randomColor()
    
    this.set()
  }
  
  set() {
    this.x = +roundNum(Math.floor(Math.random() * columns) * scale)
    this.y = +roundNum(Math.floor(Math.random() * rows) * scale)
    this.color = M.randomColor()
  };
  
  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, scale, scale)
  }
}
