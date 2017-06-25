var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.fillRect(0,0,canvas.width, canvas.height);

var screen = title(canvas.width, canvas.height);

// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

loop();

function loop() {
    requestAnimFrame( loop );
    if(screen) {
      screen.logic(); 
      screen.render(ctx);
    }
}

var accept = 32;
var leftButton = 37;
var rightButton = 39;
var fireButton = 32;
var buttonPressed = false;
var buttonsPressed = [];

window.addEventListener('keydown', function(e) {
  if(!buttonsPressed.includes(e.keyCode))
    buttonsPressed.push(e.keyCode);
});

window.addEventListener('keyup', function(e) {
  buttonsPressed.forEach(function(button, index) {
    if(button == e.keyCode)
      buttonsPressed.splice(index, 1);
  });
});

window.onresize = function(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if(screen) {
    screen.width = canvas.width;
    screen.height = canvas.height;
    screen.render(ctx);
  }

  if(actor)
    actor.y = canvas.height - 200;
};

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" )
    stroke = true;
  if (typeof radius === "undefined")
    radius = 5;

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) 
    ctx.stroke();
  if (fill) 
    ctx.fill();
}

// Utilities //
function roll(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}