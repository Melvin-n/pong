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
let playerPaddleY = 135;
let oppPaddleY = 135;
//ball movement vars and iterators
let x = 240;
let y = 160;
let dx = -2;
let dy = 2;

//movement flags
let pressDown = false;
let pressUp = false;



//main draw function which will refresh per framerate
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawOppPaddle();
    drawBall();

    //check for kep press flags, move player paddle accordingly
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


}


//refresh rate every 10ms
setInterval(draw, 10);


//sub draw functions 
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(10, playerPaddleY, playerPaddleWidth, playerPaddleHeight);
    ctx.fillStyle = 'black';
    ctx.fill()
    ctx.closePath();
}

function drawOppPaddle(){
    ctx.beginPath();
    ctx.rect(460, 135, oppPaddleWidth, oppPaddleHeight);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(240, 160, 5, 0, Math.PI * 2)
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

}


//event handlers for key up and down
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

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

draw();
