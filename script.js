//get canvas elements
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

//size variables
let playerPaddleHeight = 50;
let playerPaddleWidth = 10;
let oppPaddleHeight = 50;
let oppPaddleWidth = 10;
let ballRadius = 10;

//movement variables
let playerPaddleX = 10;
let playerPaddleY = 135;
let oppPaddleY = 135;
let oppPaddleX = 460; 

//ball movement vars and iterators
let ballX = 0 //playerPaddleX + playerPaddleWidth + ballRadius / 2;
let ballY = 0//playerPaddleY + (playerPaddleHeight) / 2;
let x = 240;
let y = 160;
let dx = 3;
let dy = 2;
console.log(dx)
//movement flags
let pressDown = false;
let pressUp = false;

//startGame flag
let start = false;

//rally element
let rally =  document.getElementById('rally');
let rallyCount = 0;


//main draw function which will refresh per framerate
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawOppPaddle();
    drawBall();
    rally.innerHTML = 'Rally: ' + rallyCount;


    //check for key press flags, move player paddle accordingly
    if(pressDown == true){
        playerPaddleY += 4;        
        if (playerPaddleY > canvas.height - playerPaddleHeight){
            playerPaddleY = canvas.height - playerPaddleHeight
        }
    } else if(pressUp == true) {
        playerPaddleY -= 4;
        if(playerPaddleY < 0 ){
            playerPaddleY  = 0 ;
        }
    }

    if(start == false){
        ballY = playerPaddleY + playerPaddleHeight / 2;
        ballX = playerPaddleX + playerPaddleWidth + ballRadius / 2;
        
    }

    if(start == true){
        ballX += dx;
        ballY -= dy;

    
        if(ballX == playerPaddleX && ballY> playerPaddleY  && ballY < playerPaddleY + playerPaddleHeight){
            dx = -dx
            rallyCount ++;
        }
        if(ballX == oppPaddleX && ballY > oppPaddleY - oppPaddleHeight / 2 && ballY < oppPaddleY + oppPaddleHeight){
            rallyCount ++;
            dx = -dx;
        }
        if(ballY <= 0){
            dy = -dy;           
        } else if(ballY == canvas.height){
            dy = -dy;
        }
        
        
    }

    oppPaddleY = ballY - (oppPaddleHeight / 2) ;


}


//refresh rate every 10ms
setInterval(draw, 10);


//sub draw functions 
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(playerPaddleX, playerPaddleY, playerPaddleWidth, playerPaddleHeight);
    ctx.fillStyle = 'black';
    ctx.fill()
    ctx.closePath();
}

function drawOppPaddle(){
    ctx.beginPath();
    ctx.rect(oppPaddleX, oppPaddleY, oppPaddleWidth, oppPaddleHeight);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ballX, ballY, 5, 0, Math.PI * 2)
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

}


//event handlers for key up and down
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('keydown', startGame, false)

//event handler functions using boolean flags
function keyUpHandler(e){
    if(e.key == 'ArrowUp' || e.key == 'w'){
        pressUp = false;
    } else if (e.key == 'ArrowDown' || e.key == 's') {
        pressDown = false;
    }
}

function keyDownHandler(e){
    if(e.key == 'ArrowUp' || e.key == 'w'){
        pressUp = true;
    } else if (e.key == 'ArrowDown' || e.key == 's') {
        pressDown = true;
    }
}

//function for starting the game/moving the ball
 function startGame(e){
     if(e.keyCode == 32){
         start = true;
     }
 }


draw();
