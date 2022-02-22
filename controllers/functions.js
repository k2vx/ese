function viewpoint() {
  let e = window
  let a = 'inner'
  if (!('innerWidth' in window)) {
    a = 'client'
    e = document.documentElement || document.body
  }
  return { width: e[a + 'Width'], height: e[a + 'Height'] }
}

function randomColor() {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  document.addEventListener('DOMContentLoaded', function () {
    mobSetup()
  }, false)
}

function showPad() {
  const mobPad = document.querySelector('#mob')
  mobPad.style.display = 'flex'
  document.querySelector('#ai').style.display = 'none'
  document.querySelector('#MobPlay').style.display = 'none'
}

function mobSetup() {
  // let node = document.createElement("button")
  // node.setAttribute("id", "MobPlay")
  // node.innerText = 'Play'
  // document.querySelector('.stats').appendChild(node)
  document.querySelector('#MobPlay').addEventListener('click', showPad)
}

function roundNum(num) {
  return +(Math.ceil(num).toString().replace(/.$/,'0'))
}

export {viewpoint, randomColor, showPad, mobSetup, roundNum}
