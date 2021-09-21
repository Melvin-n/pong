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
console.log
//movement flags
let pressDown = false;
let pressUp = false;

//startGame flag
let start = false;

//rally element
let rally =  document.getElementById('rally');
let rallyCount = 0;

//win/lose flags
let winState = false;
let loseState = false;


//main draw function which will refresh per framerate
function draw(){

    if(winState == false && loseState == false){
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

        
            if(ballX < playerPaddleX + playerPaddleWidth && ballY > playerPaddleY  && ballY < playerPaddleY + playerPaddleHeight){
                dx = -dx
                rallyCount ++;
            }
            else if(ballX == oppPaddleX && ballY > oppPaddleY - oppPaddleHeight / 2 && ballY < oppPaddleY + oppPaddleHeight){
                rallyCount ++;
                dx = -dx;
            }
            else {
                if(ballY <= 0){
                    dy = -dy;           
                } else if(ballY >= canvas.height){
                    dy = -dy;
                }
            }    
        }
    
        //check for win or loss
        if(ballX > canvas.width){
            winState = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            win();
        }

        if(ballX < 0){
            loseState = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            lose();
        }

        oppPaddleY = ballY - (oppPaddleHeight / 2) ;
    }

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

function win(){
    ctx.beginPath();
    ctx.font = '30px Arial';
    ctx.fillText("You win! Play again?", canvas.width / 2, canvas.height / 2);
    ctx.textAlign = 'center';
    ctx.closePath();
    
    // let yes = new Path2D;
    // ctx.beginPath();
    // ctx.font = '20px Arial';
    // yes.fillText("Yes")
    // ctx.closePath();

    // canvas.addEventListener('click', (e) => {
    //     if(ctx.isPointInPath(yes, e.offsetX, e.offsetY)){
    //         draw();
    //     }
    // })

    ctx.beginPath();
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("No", canvas.width / 4, canvas.height / 3)
    ctx.closePath();
}

function lose(){
    ctx.beginPath();
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("You lose! Play again?",  canvas.width / 2, canvas.height / 2);   
    ctx.closePath();

    //define yes as new path, use this variable for addeventlistener
    let yes = new Path2D;
    //define text, then define 'yes' rectangle on same area as text. when yes is clicked, addeventlistener for invicible rect will trigger
    ctx.beginPath();
    ctx.font = '20px Arial';
    ctx.fillText("Yes", canvas.width / 4 , canvas.height - canvas.height / 3)

    ctx.closePath();
    ctx.beginPath();
    yes.rect((canvas.width / 4) - 20 , canvas.height - 20 - canvas.height / 3, 40, 30);
    ctx.closePath();

    //when yes is clicked, start the game again
    canvas.addEventListener('click', (e) => {
        console.log(e)
        if(ctx.isPointInPath(yes, e.offsetX, e.offsetY)){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            loseState = false;
            start = false;
            rallyCount = 0;
            draw();

        }
    })

    ctx.beginPath();
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("No",  canvas.width - canvas.width / 4 , canvas.height - canvas.height / 3)
    ctx.closePath();
   
}

//play again event handlers



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
