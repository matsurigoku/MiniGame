var s;
var scl = 20;
var myRec;
var mostrecentword = "";
var total;
var food;
//var cnv;
/*
function centerCanvas(){
  var x = (windowWidth - width) / 2;
   var y = (windowHeight - height) / 2;
   cnv.position(x, y);
}
*/
function setup() {
  var canvas = createCanvas(600, 600);
  //centerCanvas();
  canvas.parent('snake');
  s = new Snake();

  frameRate(5);
  pickLocation();
  myRec = new p5.SpeechRec('en-US'); // new P5.SpeechRec object
  //myRec = new p5.SpeechRec('zh-tw');
  myRec.continuous = true; // do continuous recognition
  myRec.interimResults = true; // allow partial recognition (faster, less accurate)

  myRec.onResult= parseResult;
  myRec.onError= showError;
  console.log(myRec.onError);
  myRec.start();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
/*
function mousePressed() {
  s.total++;
}
*/
function draw() {
  background(51);

  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();


  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}





function parseResult() {
  mostrecentword = myRec.resultString.split(' ').pop();


  if (mostrecentword.indexOf("left") !== -1) {
    s.dir(-1, 0);
  }else if (mostrecentword.indexOf("right") !== -1) {
    s.dir(1, 0);
  }else if (mostrecentword.indexOf("down") !== -1) {
    s.dir(0, 1);
  }else if (mostrecentword.indexOf("up") !== -1) {
    s.dir(0, -1);
  }else if (mostrecentword.indexOf("laughed") !== -1) {
      s.dir(-1, 0);
  }

  /*
  if (mostrecentword.indexOf("左邊") !== -1){
    s.dir(-1, 0);
  } else if (mostrecentword.indexOf("右邊") !== -1) {
    s.dir(1, 0);
  } else if (mostrecentword.indexOf("上面") !== -1) {
    s.dir(0, 1);
  } else if (mostrecentword.indexOf("下面") !== -1) {
    s.dir(0, -1);
  }
  */
  console.log(myRec.resultString);
  //console.log(myRec.resultString.split(' ').length);



}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}
var arrow_keys_handler = function(e) {
    switch(e.keyCode){
        case 37: case 39: case 38:  case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }
};
window.addEventListener("keydown", arrow_keys_handler, false);
function showError(){
	console.log('There is an error');
	//text('There is an error', windowWidth/2, windowHeight/2);
}
