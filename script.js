"use strict"
window.addEventListener("load", start);
function start() {
    console.log('yoyoyo');
    document.addEventListener("keydown",keyDown)
    document.addEventListener("keyup",keyUp)
    requestAnimationFrame(tick)
}

//MODEL***************¨
const player = {
    x: 0,
    y: 0,
    speed: 10
}


//VIEW******************
function displayPlayerAtPosition(){
    const visualPlayer = document.querySelector("#player");
    visualPlayer.style.translate = `${player.x}px ${player.y}px`
}

//CONTROLLER*******************

const controls = {
    left: false,
    right: false,
    up: false,
    down: false
}
function keyDown(event){
    console.log(event.key);
    
    switch(event.key){
      case "ArrowLeft": controls.left = true; break;
      case "ArrowRight":controls.right = true; break;
      case "ArrowUp":controls.up = true;break;
      case "ArrowDown": controls.down = true; break;
    }
    
  
  }
  
function keyUp(event){
    switch(event.key){
      case "ArrowLeft": controls.left = false; break;
      case "ArrowRight": controls.right = false; break;
      case "ArrowUp": controls.up = false; break;
      case "ArrowDown": controls.down = false; break;
    }
  }
  function movePlayer(deltaTime){
    if(controls.left){
        player.x -= player.speed * deltaTime;
    }else if(controls.right){
        player.x += player.speed * deltaTime;
    }
    if(controls.up){
        player.y -= player.speed * deltaTime;
    }else if(controls.down){
        player.y += player.speed * deltaTime;
    }
  }

  let lastTimestamp = 0;

function tick(timestamp){
    requestAnimationFrame(tick);
   
    const deltaTime = (timestamp - lastTimestamp)/100;
    lastTimestamp = timestamp;

    movePlayer(deltaTime);

    displayPlayerAtPosition();
}