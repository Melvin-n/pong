//get canvas elements
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

//size variables
let playerPaddleHeight = 50;
let playerPaddleWidth = 10;
let oppPaddleHeight = 50;
let oppPaddleWidth = 10;
let ballRadius = 10;

//draw function which will as per framerate
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(10, 135, playerPaddleWidth, playerPaddleHeight);
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

drawPaddle();
drawOppPaddle();
drawBall();