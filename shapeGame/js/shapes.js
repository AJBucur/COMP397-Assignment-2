/**************************
 * HomeWork: Task #1
 * Due: March 7th
 * . Draw three target shapes (rectangle, circle and triangle) in the top half of the stage
 * . Draw three source shapes (again rectangle, circle and triangle) in the bottom half of the stage
 * . Write drag-and-drop handlers (as below) for the source shapes so that:
 *    . when a shape is dropped over it's corresponding shape (triangle over triangle f.e.) 
 *       it should fall and the source should be removed from the stage
 *    . when a shape is dropped over a non-corresponding shape (triangle over rectangle f.e.) 
 *       it should go back to its starting position (via a tweening animation as in the code below) 
 *    . when all shapes are dropped successfully show a stylized winning message
 */
var stage;
var shapes = [];
var slots = [];
var score = 0;

function init() {
    stage = new createjs.Stage("canvas");
    buildShapes();
    setShapes();
    startGame();
}
function buildShapes() {
    var colors = ['blue', 'red', 'green', 'yellow'];
    var i, shape, slot;
    /*for (i = 0; i < 4; i++) {
        //slots
        slot = new createjs.Shape();
        slot.graphics.beginStroke(colors[i]);
        slot.graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255, 1));
        slot.graphics.drawRect(0, 0, 100, 100);
        slot.regX = slot.regY = 50;
        slot.key = i;
        slot.y = 80;
        slot.x = (i * 130) + 100;
        stage.addChild(slot);
        slots.push(slot);
        //shapes
        shape = new createjs.Shape();
        shape.graphics.beginFill(colors[i]);
        shape.graphics.drawRect(0, 0, 100, 100);
        shape.regX = shape.regY = 50;
        shape.key = i;
        shapes.push(shape);
    }*/

    //RECTANGLE
    var rect = new createjs.Shape();
    rect.graphics.beginStroke('#000');
    rect.graphics.beginFill('#FF0000');
    rect.graphics.drawRect(0, 0, 150, 100);
  //  rect.x = rect.y = 20;
    rect.key = 0;
    rect.regX = 75;
    rect.regY = 50;
    //stage.addChild(rectangle);
    shapes.push(rect);

    var circle = new createjs.Shape();
    circle.graphics.beginStroke('#000');
    circle.graphics.beginFill('#FFF000');
    circle.graphics.drawCircle(50, 50, 50);
   // circle.x = 250;
   // circle.y = 100;
    circle.key = 1;
    circle.regX = circle.regY = 50;
    //stage.addChild(circle);
    shapes.push(circle);

    //TRIANGLE
    var tri = new createjs.Shape();
    tri.graphics.beginStroke('#000');
    tri.graphics.beginFill('#00FF00');
    tri.graphics.moveTo(50, 0)
            .lineTo(0, 100)
            .lineTo(100, 100)
            .lineTo(50, 0);
    //tri.x = 400;
    //tri.y = 50;
    tri.key = 2;
    tri.regX = tri.regY = 50;
    //stage.addChild(tri);
    shapes.push(tri);

    //RECTANGLE
    var rectSlot = new createjs.Shape();
    rectSlot.graphics.beginStroke('#F00');
    rectSlot.graphics.beginFill('#FFFFFF');
    rectSlot.graphics.drawRect(0, 0, 150, 100);
    rectSlot.x = 150
    rectSlot.y = 300;
    rectSlot.key = 0;
    rectSlot.regX = 75;
    rectSlot.regY = 50;
    stage.addChild(rectSlot);
    slots.push(rectSlot);

    var circleSlot = new createjs.Shape();
    circleSlot.graphics.beginStroke('#FF0');
    circleSlot.graphics.beginFill('#FFFFFF');
    circleSlot.graphics.drawCircle(50, 0, 50);
    circleSlot.x = 320;
    circleSlot.y = 300;
    circleSlot.key = 1;
    circleSlot.regX = circle.regY = 50;
    stage.addChild(circleSlot);
    slots.push(circleSlot);

    //TRIANGLE
    var triSlot = new createjs.Shape();
    triSlot.graphics.beginStroke('#0F0');
    triSlot.graphics.beginFill('#FFFFFF');
    triSlot.graphics.moveTo(50, 0)
            .lineTo(0, 100)
            .lineTo(100, 100)
            .lineTo(50, 0);
    triSlot.x = 470;
    triSlot.y = 300;
    triSlot.key = 2;
    triSlot.regX = triSlot.regY = 50;
    triSlot.addEventListener("click", function(e){
        console.log(triSlot.key);
    });
    stage.addChild(triSlot);
    slots.push(triSlot);
}
function setShapes() {
    var i, r, shape;
    var l = shapes.length;
    
    for (i = 0; i < l; i++) {
        r = Math.floor(Math.random() * shapes.length);
        shape = shapes[r];
        shape.homeY = 70;
        shape.homeX = (i * 150) + 100;
        shape.y = shape.homeY;
        shape.x = shape.homeX;
        shape.addEventListener("mousedown", startDrag);
        stage.addChild(shape);
        shapes.splice(r, 1);
    }
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function (e) {
        stage.update();
    });
}
function startDrag(e) {
    var shape = e.target;
    var slot = slots[shape.key];
    
    stage.setChildIndex(shape, stage.getNumChildren() - 1);
    stage.addEventListener('stagemousemove', function (e) {
        shape.x = e.stageX;
        shape.y = e.stageY;
    });
    stage.addEventListener('stagemouseup', function (e) {
        stage.removeAllEventListeners();
        var pt = slot.globalToLocal(stage.mouseX, stage.mouseY);
        console.log(pt.x);
        console.log(pt.y);

        console.log(slot.x);
        console.log(slot.y);
        console.log(slot.hitTest(pt.x, pt.y));

        if (slot.hitTest(pt.x, pt.y)) {
            shape.removeEventListener("mousedown",startDrag);
            score++;
            createjs.Tween.get(shape).to({x:slot.x, y:slot.y}, 200, createjs.Ease.quadOut).call(checkGame);
            console.log('h');
        }
        else {
            createjs.Tween.get(shape).to({x:shape.homeX, y:shape.homeY}, 200, createjs.Ease.quadOut);
        }
    });
}
function checkGame(){
    if(score == 3){
        stage.removeAllChildren();
        var msg = "CONGRATULATIONS! \n\n\n YOU WIN!";
        gameOverTxt = new createjs.Text(msg, "40px Century Gothic");
        gameOverTxt.color = 'blue';
        gameOverTxt.textAlign = 'center';
        gameOverTxt.textBaseline = 'middle';
        gameOverTxt.x = stage.canvas.width / 2;
        gameOverTxt.y = stage.canvas.height / 3;
        stage.addChild(gameOverTxt);
    }
}