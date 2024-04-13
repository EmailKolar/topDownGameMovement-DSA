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

    const newPos = {
        x: player.x,
        y: player.y
    }

    if(controls.left){
        player.moving = true;
        player.direction = "left";
        newPos.x -= player.speed * deltaTime;
    }else if(controls.right){
        player.moving = true;
        player.direction = "right";
        newPos.x += player.speed * deltaTime;
    }
    if(controls.up){
        player.moving = true;
        player.direction = "up";
        newPos.y -= player.speed * deltaTime;
    }else if(controls.down){
        player.moving = true;
        player.direction = "down";
        newPos.y += player.speed * deltaTime;
    }

    if(canMoveTo(newPos)){
        player.x = newPos.x;
        player.y = newPos.y;
    }
  }

  function canMoveTo(pos){
    if(pos.x<0 || pos.y < 0 || pos.x>480 || pos.y > 466){
        return false;
    }else{
        return true;
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
