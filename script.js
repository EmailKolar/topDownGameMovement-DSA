"use strict"
window.addEventListener("load", start);
function start() {
    console.log('yoyoyo');
    createTiles();
    createItems();
    displayTiles()
    document.addEventListener("keydown",keyDown)
    document.addEventListener("keyup",keyUp)
    requestAnimationFrame(tick)
}

//MODEL***************¨
const player = {
    x: 600,
    y: 100,
    regX: 17,
    regY: 24,
    hitbox: {
        x: 4,
        y: 7,
        w: 10,
        h: 17
    },
    speed: 10,
    moving: false,
    direction: undefined

}
const tiles = [
    [1,1,1,1,1,2,2,2,1,1,1,1,1,2,2,6,0,0,0,0],
    [1,4,4,4,1,2,2,2,1,4,4,4,1,2,2,6,0,0,0,0],
    [1,4,4,4,5,5,5,5,5,4,4,4,1,2,2,6,0,0,0,0],
    [1,4,4,4,1,2,2,2,1,4,4,4,1,2,2,6,0,0,0,0],
    [1,1,1,1,1,2,2,2,1,1,5,1,1,2,2,6,0,0,0,0],
    [2,2,2,2,2,2,2,2,2,2,5,2,2,2,2,6,0,0,0,0],
    [2,2,2,2,2,2,2,2,2,2,5,2,2,2,2,6,0,0,0,0],
    [6,6,6,6,6,6,6,6,6,6,3,6,6,6,6,6,0,0,0,0],
    [0,0,0,3,3,3,3,6,6,6,3,3,3,3,3,6,0,0,0,0],
    [0,0,6,3,6,6,3,6,6,6,3,3,3,3,3,6,0,0,0,0],
    [6,6,6,3,6,6,3,6,6,6,3,3,3,3,3,6,0,0,0,0],
    [6,6,6,3,6,6,3,3,3,3,3,6,6,6,6,6,0,0,0,0],
    [6,3,3,3,6,6,6,6,6,6,7,6,6,6,6,6,0,0,0,0],
    [6,3,6,6,6,6,6,6,6,3,3,3,3,6,6,6,0,0,0,0],
    [6,3,6,6,6,6,6,6,6,3,6,6,3,6,6,6,0,0,0,0],
    [6,3,3,3,6,3,3,3,3,3,6,6,3,6,6,6,0,0,0,0],
    [6,3,3,3,6,3,6,6,6,6,6,6,3,6,6,6,0,0,0,0],
    [6,3,3,3,6,3,6,6,6,6,6,6,3,3,3,3,0,0,0,0],
    [6,3,3,3,3,3,6,6,6,6,6,6,6,6,6,6,0,0,0,0],
    [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0],
]

const itemsGrid = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

]
const visualItemsGrid = [];


const GRID_WIDTH = tiles[0].length;
const GRID_HEIGHT = tiles.length;
const TILE_SIZE = 32;

function getTileAtCoord({row,col}){
    //const row = coord.row;
    //const col = coord.col;
    //const {row,col} = coord;

    return tiles[row][col];
}
function coordFromPos({x,y}){
    const row = Math.floor(y / TILE_SIZE);
    const col = Math.floor(x / TILE_SIZE);
    const coord = {row, col};
    return coord;
}
function posFromCoord({row,col}){
    
}

function getTileCoordsUnder(player){
    const tiles = [];

    const topLeft = coordFromPos({ x: player.x - player.regX + player.hitbox.x, y: player.y + player.hitbox.y });
    const topRight = coordFromPos({ x: player.x - player.regX + player.hitbox.x + player.hitbox.w, y: player.y + player.hitbox.y });
    const bottomLeft = coordFromPos({ x: player.x - player.regX + player.hitbox.x, y: player.y + player.hitbox.y + player.hitbox.h });
    const bottomRight = coordFromPos({ x: player.x - player.regX + player.hitbox.x + player.hitbox.w, y: player.y + player.hitbox.y + player.hitbox.h });

    tiles.push(topLeft, topRight, bottomLeft, bottomRight);

    return tiles;
}


function getItemsUnderPlayer() {
    return getTileCoordsUnder(player).filter(({row,col}) => itemsGrid[row][col]!= 0);
}


//VIEW******************
function displayPlayerAtPosition(){
    const visualPlayer = document.querySelector("#player");
    visualPlayer.style.translate = `${player.x- player.regX}px ${player.y - player.regY}px`
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

function createTiles(){
    const gamefield = document.querySelector("#gamefield");

    const background = document.querySelector("#background");

    for (let rows = 0; rows < tiles.length; rows++) {
        for (let cols = 0; cols < tiles[0].length; cols++) {
            const tile = document.createElement("div")
            tile.classList.add("tile");
            
            background.appendChild(tile)
        }
        
    }
    gamefield.style.setProperty("--GRID_WIDTH",GRID_WIDTH)
    gamefield.style.setProperty("--GRID_HEIGHT",GRID_HEIGHT)
    gamefield.style.setProperty("--TILE_SIZE",TILE_SIZE+"px")

}

function createItems(){
    const visualItems = document.querySelector("#items");

    for(let row = 0; row < GRID_HEIGHT; row++){
        visualItemsGrid[row] = [];
        for(let col = 0; col < GRID_WIDTH; col++){
            const modelItem = itemsGrid[row][col];
            if(modelItem !== 0){
                const visualItem = document.createElement("div");
                visualItem.classList.add("item");
                visualItem.classList.add("gold");
                visualItem.style.setProperty("--row", row);
                visualItem.style.setProperty("--col", col);
                visualItems.append(visualItem)
                visualItemsGrid[row][col] = visualItem;
            }
        }
    }

}

function takeItem(coords){
    const itemValue = itemsGrid[coords.row][coords.col];
    if(itemValue !== 0){
        itemsGrid[coords.row][coords.col] = 0;

        const visualItem = visualItemsGrid[coords.row][coords.col];
        visualItem.classList.add("take");

    }

}



function displayTiles(){
    const visualTiles = document.querySelectorAll("#background .tile")
    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            console.log("r: "+row+",c: "+col);
            const modelTile = getTileAtCoord({row,col});
            const visualTile = visualTiles[row*GRID_WIDTH+col]

            visualTile.classList.add(getClassForTiletype(modelTile));



        }
        
    }

}

function getClassForTiletype(tiletype){
    switch(tiletype){
        case 0: return "grass"; break;
        case 1: return "wall"; break;
        case 3: return "path"; break;
        case 2: return "water";break;
        case 4: return "floor_wood";break;
        case 5: return "floor_planks";break;
        case 6: return "tree"; break;
    }
}

//CONTROLLER*******************

const controls = {
    left: false,
    right: false,
    up: false,
    down: false,
    use: false,
}
function keyDown(event){
    console.log(event.key);
    
    switch(event.key){
      case "ArrowLeft": controls.left = true; break;
      case "ArrowRight":controls.right = true; break;
      case "ArrowUp":controls.up = true;break;
      case "ArrowDown": controls.down = true; break;
      case "e": controls.use = true; break;
    }
    
  
  }
  
function keyUp(event){
    switch(event.key){
      case "ArrowLeft": controls.left = false; break;
      case "ArrowRight": controls.right = false; break;
      case "ArrowUp": controls.up = false; break;
      case "ArrowDown": controls.down = false; break;
      case "e": controls.use = false; break;
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
    const {row,col} = coordFromPos(pos);
    if(row<0 || row >= GRID_HEIGHT || col < 0 || col >= GRID_WIDTH){
        return false;
    }
    const tileType = getTileAtCoord({row,col});
    switch(tileType){
        case 0:
        case 5:
        case 3:
        case 4:
            return true;
            break;
        case 2: 
        case 1:
            return false;
            break;
    }

  }

  let lastTimestamp = 0;

function tick(timestamp){
    requestAnimationFrame(tick);
   
    const deltaTime = (timestamp - lastTimestamp)/100;
    lastTimestamp = timestamp;

    movePlayer(deltaTime);

    checkForItems();

    displayPlayerAtPosition();
    displayPlayerAnimation();
    showDebugging();
}

function checkForItems(){
    const items = getItemsUnderPlayer();
    if(items.length > 0 && controls.use){
        console.log('HELLO');
        items.forEach(takeItem)
    }
}


//DEBUGGING

function showDebugging(){
    showDebugTileUnderPlayer();
    showDebugPlayerRect();
    showDebugPlayerRegistrationPoint();
}

let lastPlayercoord = {row:0, col:0};

function showDebugTileUnderPlayer(){
    const coord = coordFromPos(player);

    if(coord.row != lastPlayercoord.row || coord.col != lastPlayercoord.col){
        unhighlightTile(lastPlayercoord);
        highlightTile(coord)
    }

    lastPlayercoord = coord;
}

function showDebugPlayerRect(){
    const visualPLayer = document.querySelector("#player");
    if(!visualPLayer.classList.contains("show-rect")){
        visualPLayer.classList.add("show-rect");
    }
}
function showDebugPlayerRegistrationPoint(){
    const visualPLayer = document.querySelector("#player");
    if(!visualPLayer.classList.contains("show-reg-point")){
        visualPLayer.classList.add("show-reg-point");
    }
    visualPLayer.style.setProperty("--regX", player.regX +"px")
    visualPLayer.style.setProperty("--regY", player.regY +"px")
}

function highlightTile({row,col}){
    const visualTiles = document.querySelectorAll("#background .tile");
    const visualTile = visualTiles[row*GRID_WIDTH+col]
    visualTile.classList.add("highlight")
    
}
function unhighlightTile ({row,col}){
    const visualTiles = document.querySelectorAll("#background .tile");
    const visualTile = visualTiles[row*GRID_WIDTH+col]
    visualTile.classList.remove("highlight")
    
}