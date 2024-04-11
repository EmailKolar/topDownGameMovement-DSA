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
    speed: 10,
    moving: false,
    direction: undefined
}


//VIEW******************
function displayPlayerAtPosition(){
    const visualPlayer = document.querySelector("#player");
    visualPlayer.style.translate = `${player.x}px ${player.y}px`
}
function displayPlayerAnimation(){
    /*NB: Det er måske lidt dårlig stil at tilføje og fjerne så mange klasser hver eneste frame 
    - så du kunne med fordel udvide displayPlayerAnimation funktionen lidt, 
    så den tjekker om de aktuelle klasser allerede er sat, før den prøver at 
    sætte dem igen.
    Du kan bruge classList.contains til at spørge om en klasse er sat.
    */
    const visualPlayer = document.querySelector("#player");
    if(player.moving){
        visualPlayer.classList.add("animate");
        visualPlayer.classList.remove("up","down","left","right")
        visualPlayer.classList.add(player.direction)
    }else{
        visualPlayer.classList.remove("animate");
    }
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
    player.moving = false;

    if(controls.left){
        player.moving = true;
        player.direction = "left";
        player.x -= player.speed * deltaTime;
    }else if(controls.right){
        player.moving = true;
        player.direction = "right";
        player.x += player.speed * deltaTime;
    }
    if(controls.up){
        player.moving = true;
        player.direction = "up";
        player.y -= player.speed * deltaTime;
    }else if(controls.down){
        player.moving = true;
        player.direction = "down";
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
    displayPlayerAnimation();
}
