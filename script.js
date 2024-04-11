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
    y: 0
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
  function movePlayer(){
    if(controls.left){
        player.x--;
    }else if(controls.right){
        player.x++;
    }
    if(controls.up){
        player.y--;
    }else if(controls.down){
        player.y++;
    }
  }


function tick(){
    requestAnimationFrame(tick);

   movePlayer();

    displayPlayerAtPosition();
}