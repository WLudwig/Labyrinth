var blockGrid = [];
let blockGridSize;
let mapBlockSize = 200;
let playerX, playerY;
let playerAngle;
let keys = [];

let visited = [];

let numCols = 200;
let mapSize = 10;
let fov = 60;
let delta;
let startTime, finalTime;
let music, rain;

let done;

let timer;

let canvas;

function preload() {

  soundFormats('ogg', 'mp3');
  music = loadSound('/gameFiles/ambience.ogg');
  rain = loadSound('/gameFiles/rain.mp3');
}

function submitTime() {
    let time = finalTime - startTime;

    $.ajax({
        type: "POST",
        url: "/Home/AddScore",
        data: { score: floor(time) },
        success: function (result) {
            console.log(result);
            if (result.status=="Success") {
                text("Score Successfully Saved", width / 2, height / 2 + 300);
                $("#status").text("Successfully Saved Score!");
            }
           
        },
        error: function (result) {
            console.log("AJAX FAIL");
        
        }
    });


}


function setup() {

  timer = millis();

  done = false;
  startTime = millis();
  finalTime = 0;

  music.setVolume(1);
  music.loop();
  rain.setVolume(1);
  rain.loop();

  getAudioContext().resume();

    canvas = createCanvas(800, 600);


    canvas.parent('gameContainer');

  rectMode(CENTER);
  //MAP*****************
  cols = mapSize;
  rows = cols;
  blockGridSize = cols * 2 + 1;

  blockGrid = generateAndPopulate();

  //PLAYER*****************
  playerX = playerY = 96; //on red square
  playerAngle = 0;

  delta = radians(fov) / numCols;
  for (let i = 0; i < blockGridSize * blockGridSize; i++)
    visited[i] = false;

}

function keyPressed() {
  // blockGrid = generateAndPopulate();

  keys[key] = true;
  keys[keyCode] = true;

}

function keyReleased() {
  keys[key] = false;
  keys[keyCode] = false;
}

function mouseClicked() {
  //blockGrid = generateAndPopulate();

}

function drawMinimap() {
  if (blockGrid.length > 0) {

    let w = width / blockGridSize;
    noStroke();
    let alpha = 100;



    for (let y = 0; y < blockGridSize; y++) {
      for (let x = 0; x < blockGridSize; x++) {
        //if (blockGrid[x + y * blockGridSize] == 1) //wall
        fill(0, 0, 0, alpha);
        if (blockGrid[x + y * blockGridSize] == 0 && visited[x + y * blockGridSize]) //floor
          fill(255, 255, 255, alpha);
        //  fill(0,0,0,alpha);//TODO
        else if (blockGrid[x + y * blockGridSize] == 2) //red
          fill(255, 0, 0, alpha);
        else if (blockGrid[x + y * blockGridSize] == 3) //green
          fill(0, 255, 0, alpha);
        // else
        //fill(255, 255, 255, alpha);

        let step = mapBlockSize / blockGridSize;

        let xLoc = width - mapBlockSize + x * step + step / 2;
        let yLoc = y * step + step / 2;

        rect(xLoc, yLoc, step, step);
      }
    }


    //player
    fill(255, 255, 0);
    let step = mapBlockSize / blockGridSize;
    //set visited

    visited[floor(playerX / 64) + floor(playerY / 64) * blockGridSize] = true;

    let xLoc = width - mapBlockSize + playerX * step / 64;
    let yLoc = playerY * step / 64;

    ellipse(xLoc, yLoc, step / 2, step / 2);
    let angleLength = step * 2;
    let aX = cos(playerAngle);
    let aY = -sin(playerAngle);
    stroke(255, 255, 0);

    line(xLoc, yLoc, xLoc + aX * angleLength, yLoc + aY * angleLength);



    //CAST

    //Horizontal grid

    /*let blockX = floor(playerX / 64);
    let blockY = floor(playerY / 64);

    //if ray facing up
    let firstY;
    let firstX;
    let dy;
    let dx;
    let stepX, stepY;
    if (playerAngle > 0 && playerAngle <= PI) {
      firstY = floor(playerY / 64) * 64 - 1;
      dy = -64;
      dx = 64.0 / tan(playerAngle)


    } else //facing down
    {
      firstY = floor(playerY / 64) * 64 + 64;
      dy = 64;
      dx = -64.0 / tan(playerAngle)

    }

    firstX = playerX + (playerY - firstY) / tan(playerAngle);
    stepX = firstX;
    stepY = firstY;

    noStroke();

    while (stepX >= 0 && stepX <= blockGridSize * 64 && stepY >= 0 && stepY <= blockGridSize * 64) {

      if (blockGrid[floor(stepX / 64) + floor(stepY / 64) * blockGridSize] == 1)
        fill(255, 0, 0);
      else
        fill(255, 255, 0);

      ellipse(width - mapBlockSize + stepX * step / 64, stepY * step / 64, 5, 5);
      stepX += dx;
      stepY += dy;

    }

    //Vertical Grid

    //if facing right
    if (playerAngle < HALF_PI || playerAngle > HALF_PI * 3) {
      firstX = floor(playerX / 64) * 64 + 64;
      dx = 64;
      dy = -64*tan(playerAngle);
    } else //facing left
    {
      firstX = floor(playerX / 64) * 64 - 1;
      dx = -64;
      dy = 64*tan(playerAngle);
    }
    

    firstY = playerY + (playerX - firstX) * tan(playerAngle);
    stepX = firstX;
    stepY = firstY;
    while (stepX >= 0 && stepX <= blockGridSize * 64 && stepY >= 0 && stepY <= blockGridSize * 64) {
      if (blockGrid[floor(stepX / 64) + floor(stepY / 64) * blockGridSize] == 1)
        fill(255, 0, 0);
      else
        fill(255, 255, 0);

      ellipse(width - mapBlockSize + stepX * step / 64, stepY * step / 64, 5, 5);
      stepX += dx;
      stepY += dy;
    }*/

  }
}

function updatePlayer() {
  if (keys[65]) {
    playerAngle += 0.03;
    if (playerAngle > TWO_PI)
      playerAngle = 0;
  }

  if (keys[68]) {
    playerAngle -= 0.03;
    if (playerAngle < 0)
      playerAngle = TWO_PI;
  }

  if (keys[87] || keys[83]) {
    let dx = cos(playerAngle);
    let dy = -sin(playerAngle);

    let speed = keys[87] ? 0.02 : -0.02;

    //collision detection:
    if (blockGrid[floor(playerX / 64 + dx * speed * 10) + floor(playerY / 64) * blockGridSize] != 1)
      playerX += (dx * speed) * 64;

    if (blockGrid[floor(playerX / 64) + floor(playerY / 64 + dy * speed * 10) * blockGridSize] != 1)
      playerY += (dy * speed) * 64;


  }



}


function getDist(angle) {
  //Horizontal grid

  if (angle < 0)
    angle = TWO_PI - angle;

  if (angle > TWO_PI)
    angle = angle - TWO_PI;

  let blockX = floor(playerX / 64);
  let blockY = floor(playerY / 64);
  let horizDistance = 5000;
  let vertDistance = 5000;

  //if ray facing up
  let firstY;
  let firstX;
  let dy;
  let dx;
  let stepX, stepY;
  if (angle > 0 && angle <= PI) {
    firstY = floor(playerY / 64) * 64 - 1;
    dy = -64;
    dx = 64.0 / tan(angle)


  } else //facing down
  {
    firstY = floor(playerY / 64) * 64 + 64;
    dy = 64;
    dx = -64.0 / tan(angle)

  }

  firstX = playerX + (playerY - firstY) / tan(angle);
  stepX = firstX;
  stepY = firstY;


  while (stepX >= 0 && stepX <= blockGridSize * 64 && stepY >= 0 && stepY <= blockGridSize * 64) {

    if (blockGrid[floor(stepX / 64) + floor(stepY / 64) * blockGridSize] == 1) {
      horizDistance = sqrt((stepX - playerX) * (stepX - playerX) + (stepY - playerY) * (stepY - playerY));
      break;
    }


    stepX += dx;
    stepY += dy;

  }

  //Vertical Grid

  //if facing right
  if (angle < HALF_PI || angle > HALF_PI * 3) {
    firstX = floor(playerX / 64) * 64 + 64;
    dx = 64;
    dy = -64 * tan(angle);
  } else //facing left
  {
    firstX = floor(playerX / 64) * 64 - 1;
    dx = -64;
    dy = 64 * tan(angle);
  }


  firstY = playerY + (playerX - firstX) * tan(angle);
  stepX = firstX;
  stepY = firstY;
  while (stepX >= 0 && stepX <= blockGridSize * 64 && stepY >= 0 && stepY <= blockGridSize * 64) {
    if (blockGrid[floor(stepX / 64) + floor(stepY / 64) * blockGridSize] == 1) {
      vertDistance = sqrt((stepX - playerX) * (stepX - playerX) + (stepY - playerY) * (stepY - playerY));
      break;
    }


    stepX += dx;
    stepY += dy;
  }

  let change = sqrt((angle - playerAngle) * (angle - playerAngle));

  let finalDist = horizDistance <= vertDistance ? horizDistance : vertDistance;



  let idx = round((playerX + cos(angle) * finalDist) / 64) + round((playerY + sin(angle) * finalDist) / 64) * blockGridSize;


  let currentTile = blockGrid[idx];


  let fl = map(finalDist, 10, 300, 100, 0);
  fill(fl);



  finalDist = abs(finalDist) * cos(change);
  // horizDistance = abs(horizDistance) * cos(change);
  // vertDistance = abs(vertDistance) * cos(change);




  return finalDist;




}

function draw3d() {
  let currentAngle = playerAngle - radians(fov / 2);

  if (currentAngle < 0)
    currentAngle = TWO_PI + currentAngle;

  if (currentAngle > TWO_PI)
    currentAngle = currentAngle - TWO_PI;

  //let endingAngle = playerAngle + radians(fov/2);
  let colWidth = width / numCols;

  for (let i = 0; i < numCols; i++) {
    let dist = getDist(currentAngle);
    if (dist < 10)
      dist = 10;


    rect(width - colWidth * i + colWidth / 2, height / 2, colWidth, height / dist * 30); //map(dist,0,300,height,0));
    currentAngle += delta;

    if (currentAngle > TWO_PI)
      currentAngle -= TWO_PI;
  }

}

function drawFloorAndCeiling() {
  let add = 0;
  //Ceiling
  for (let i = 0; i < height / 2; i++) {
    fill(add, 0, 0);
    noStroke();
    rect(width / 2, i, width, 1);
    add += 0.5;
  }

  //Floor
  add = 0;
  for (let i = height / 2; i < height; i++) {
    fill(add, add, add);
    noStroke();
    rect(width / 2, i, width, 1);
    add += 0.2;
  }

}

function drawRain() {
  let w = 5;
  noStroke();
  for (let i = 0; i < width; i += w) {
    fill(0, 0, random(100), 100);

    rect(i, height / 2, w, height);
  }

}

function draw() {
    getAudioContext().resume();


  updatePlayer();



  drawFloorAndCeiling();




  draw3d();
  drawRain();
  drawMinimap();

  textAlign(CENTER, CENTER);
  stroke(255);
  textSize(50);

  let minutes;
  let seconds;
  let cents;


  if (blockGrid[floor(playerX / 64) + floor(playerY / 64) * blockGridSize] == 3 && !done) {
    finalTime = millis();
      submitTime();
    done = true;
  }

  if (done) {
    text("TIME:", width / 2, height / 2);

    minutes = floor((finalTime - startTime) / 60000.0);
    seconds = floor((finalTime - startTime - minutes * 60000) / 1000);
    cents = floor((finalTime - startTime - minutes * 60000 - seconds * 1000) / 10);
    text((minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) + ":" + (cents < 10 ? "0" + cents : cents), width / 2, height / 2 + 50);
  }
  minutes = floor((millis() - startTime) / 60000.0);
  seconds = floor((millis() - startTime - minutes * 60000) / 1000);
  cents = floor((millis() - startTime - minutes * 60000 - seconds * 1000) / 10);

  if (millis() - timer >= 1000) {
    print("FPS: " + frameRate());
    timer = millis();
  }


  text((minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) + ":" + (cents < 10 ? "0" + cents : cents), 105, 30);

}