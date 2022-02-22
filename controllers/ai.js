import {scale} from '@/app'

export default (Snake, Fruit, moved = null) => {
  let routes = [
    { n: 1, dir: 'Up', score: 0, blocked: false },
    { n: 2, dir: 'Down', score: 0, blocked: false },
    { n: 3, dir: 'Left', score: 0, blocked: false },
    { n: 4, dir: 'Right', score: 0, blocked: false }
  ], move = null
  
  allowRoute()
  choose()
  
  let blocked = 0
  
  routes.map((route, i) => {
    if (move === null) return move = route
    
    if (route.blocked) {
      routes[i].score = -100
      return blocked++
    }
    if (route.dir === opposite(moved)) {
      routes[i].score = -100
      return blocked++
    }
    
    if (route.score <= move.score && blocked < 3) return
    
    if (!route.blocked) {
      move = route
    }
  })
  
  if (move.blocked) {
    for (let i = 0; i < routes.length; i++) {
      if (!routes[i].blocked) {
        move = routes[i]
        break
      }
    }
  }

  Snake.direction(move.dir)
  return move.dir
  
  function choose() {
    if (Snake.x === Fruit.x) {
      if (Snake.y > Fruit.y) routes[0].score += 1
    }
    
    if (Snake.y === Fruit.y) {
      if (Snake.x > Fruit.x) routes[2].score += 1
    }
    
    if (Snake.y < Fruit.y) routes[1].score += 10
    if (Snake.x < Fruit.x) routes[3].score += 10
    
    if (routes[0].score + routes[1].score + routes[2].score + routes[3].score <= 0)
      Math.random() ? routes[0].score += 10 : routes[2].score += 10
  }
  
  function allowRoute() {
    if (Snake.tail < 1) return routes
    // UP DOWN LEFT RIGHT
    Snake.tail.filter((tail) => {
      if (Snake.x === tail.x && Snake.y - scale === tail.y) routes[0].blocked = true
      if (Snake.x === tail.x && Snake.y + scale === tail.y) routes[1].blocked = true
      if (Snake.x - scale === tail.x && Snake.y === tail.y) routes[2].blocked = true
      if (Snake.x + scale === tail.x && Snake.y === tail.y) routes[3].blocked = true
    })
  }
  
  function opposite(moved) {
    if (!moved) return false
    
    if (moved === 'Up') return 'Down'
    if (moved === 'Down') return 'Up'
    if (moved === 'Right') return 'Left'
    if (moved === 'Left') return 'Right'
  }
}