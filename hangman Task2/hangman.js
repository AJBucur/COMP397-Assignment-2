/**********************************************
 * Home Work - Task2: 
 * Due: March 7th, before class
 *
 * Add graphical representation of the hanged man:
 * . increase the width of the stage to accomodate the drawing of the hanged man
 * . after each loss of live add an additional feature
 * . lives=5 => draw the platform 
 * . lives=4 => draw the rope
 * . lives=3 => draw the head
 * . lives=2 => draw the torso
 * . lives=1 => draw the hands
 * . lives=0 => draw the feet, wait 3 seconds, show game over message
 *********************************************/


var stage, livesTxt, gameOverTxt, win;
var answer = "CREATEJS IS&AWESOME"
var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lives = 5;
var lettersNeeded = 0;


function init() {
    stage = new createjs.Stage("canvas");
    drawBoard();
    drawLetters();
    drawMessages();
    drawHangman();
    startGame();
}

function drawBoard() {
    var i, char, box;
    var xPos = 20;
    var yPos = 90;
    for (i = 0; i < answer.length; i++) {
        char = answer[i];
        if (char != ' ' && char != '&') {
            lettersNeeded++;
            box = new createjs.Shape();
            box.graphics.beginStroke("#000");
            box.graphics.drawRect(0, 0, 20, 24);
            box.regX = 10;
            box.regY = 12;
            box.x = xPos;
            box.y = yPos;
            box.name = 'box_' + i;
            box.key = char;
            stage.addChild(box);
        }
        xPos += 26;
        if (char == '&') {
            yPos += 40;
            xPos = 20;
        }

    }
}

function drawLetters() {
    var i, char, txt, btn;
    var cnt = 0;
    var xPos = 20;
    var yPos = 200;
    for (i = 0; i < abc.length; i++) {
        char = abc[i];
        btn = new createjs.Shape();
        btn.graphics.beginFill("#000");
        btn.graphics.beginStroke("#000");
        btn.graphics.drawRect(0, 0, 20, 24);
        btn.regX = 10;
        btn.regY = 12;
        btn.x = xPos;
        btn.y = yPos;
        stage.addChild(btn);
        //create text
        txt = new createjs.Text(char);
        txt.color = "#FFF";
        txt.textAlign = 'center';
        txt.textBaseline = 'middle';
        txt.x = xPos;
        txt.y = yPos;
        stage.addChild(txt);
        btn.txt = txt;
        btn.addEventListener('click', onLetterClick);
        //adjust positions
        xPos += 24;
        cnt++;
        if (cnt == 13) {
            yPos += 30;
            xPos = 20;
        }
    }
}

function drawMessages() {
    var txt = new createjs.Text("WORD GAME", "26px Arial");
    txt.color = '#990000';
    txt.x = txt.y = 10;
    stage.addChild(txt);
    livesTxt = new createjs.Text("LIVES: " + lives, "16px Arial");
    livesTxt.textAlign = 'right';
    livesTxt.y = 16;
    livesTxt.x = stage.canvas.width - 10;
    stage.addChild(livesTxt);
}

function onLetterClick(e) {
    var btn = e.target;
    var txt = btn.txt;
    btn.removeEventListener('click', onLetterClick);
    checkForMatches(txt);
    drawHangman();
    checkGame();
}

function checkForMatches(txt) {
    var letter = txt.text
    var i, char, box, newTxt;
    var match = false;
    for (i = 0; i < answer.length; i++) {
        char = answer[i];
        if (char == ' ' || char == '&') {
            continue;
        }
        box = stage.getChildByName('box_' + i);
        if (box.key == letter) {
            lettersNeeded--;
            match = true;
            newTxt = txt.clone();
            newTxt.color = "#000";
            newTxt.x = box.x;
            newTxt.y = box.y;
            stage.addChild(newTxt);
        }
    }
    stage.removeChild(txt);
    if (!match) {
        lives--;
        livesTxt.text = "LIVES: " + lives;
    }
}

function checkGame() {
    if (lettersNeeded == 0) {
        win = true;
        //createjs.Ticker.paused = true;
        this.setTimeout(this.gameOver(), 3000); 
        setTimeout(function() {
            gameOver()
            }, 3000);  
    } else if (lives == 0) {
        win = false;
       //createjs.Ticker.paused = true; 
        setTimeout(function() {
            gameOver()
            }, 3000);
    }
}

function drawHangman(){
    
    var gallows = new createjs.Shape();   
    gallows.graphics.beginStroke('#000');
    gallows.graphics.moveTo(400,180);
    gallows.graphics.lineTo(470,180);
    gallows.graphics.moveTo(435,180);
    gallows.graphics.lineTo(435,70);
    gallows.graphics.lineTo(460,70);
    gallows.graphics.endStroke();
    stage.addChild(gallows);

    //gallows.visible = false;

    var rope = new createjs.Shape();
    rope.graphics.beginStroke('#000');
    rope.graphics.moveTo(460,70);
    rope.graphics.lineTo(460,100);
    stage.addChild(rope);
    
    if (lives <= 4){
        rope.visible = true;
    }else{
        rope.visible = false;
    }

    var head = new createjs.Shape();
    head.graphics.beginStroke('#000');
    head.graphics.beginFill('#FFFFFF');
    //head.graphics.moveTo(460,100);
    head.graphics.drawCircle(0, 0, 10);
    head.x = 460;
    head.y = 110;
    head.graphics.endStroke();
    stage.addChild(head);
    head.visible = false;
    if (lives <= 3){
        head.visible = true;
    }else{
        head.visible = false;
    }

    var torso = new createjs.Shape();
    torso.graphics.beginStroke('#000');
    torso.graphics.moveTo(460,120);
    torso.graphics.lineTo(460,150);
    stage.addChild(torso);
    torso.visible = false;
    if (lives <= 2){
        torso.visible = true;
    }else{
        torso.visible = false;
    }

    var hands = new createjs.Shape();
    hands.graphics.beginStroke('#000');
    hands.graphics.moveTo(445,130);
    hands.graphics.lineTo(475,130);
    stage.addChild(hands);
    hands.visible = false;
    if (lives <= 1){
        hands.visible = true;
    }else{
        hands.visible = false;
    }

    var feet = new createjs.Shape();
    feet.graphics.beginStroke('#000');
    feet.graphics.moveTo(450,170);
    feet.graphics.lineTo(460,150);
    feet.graphics.lineTo(470,170);
    stage.addChild(feet);
    feet.visible = false;
    if (lives <= 0){
        feet.visible = true;
    }else{
        feet.visible = false;
    }
    
}

function checkHangman(){
    switch(lives){
        case 4:
            drawHangman().rope = visible;
        break;
        default:
            break;
    }
}

function gameOver() {
    stage.removeAllChildren();
    var msg = win ? "YOU WIN!" : "YOU LOSE";
    gameOverTxt = new createjs.Text(msg, "36px Arial");
    gameOverTxt.color = win ? 'blue' : 'red';
    gameOverTxt.textAlign = 'center';
    gameOverTxt.textBaseline = 'middle';
    gameOverTxt.x = stage.canvas.width / 2;
    gameOverTxt.y = stage.canvas.height / 2;
    stage.addChild(gameOverTxt);
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function(e) {
        stage.update();
    });


}