var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class boldBar{
    constructor(x, y, length){
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.length = length;
        this.circleX = this.x + 10;
        this.hold = false;
    }
    draw(){
        if (this.circleX < this.x){
            this.circleX = this.x + 2
        }
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.length, 3);
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc(this.circleX, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        
        //ctx.fillRect(this.circleX - 10, this.y - 10, this.w,this.h);
      
    }
    onclick(x, y){
      if (x > this.circleX - 10 && x < this.circleX - 10 + this.w && y > this.y - 10 && y < this.y - 10 + this.h){
          this.hold = true;
          return true;
      }
    }
}

class Button{
    constructor(x, y, w, h, color){
        this.x = x;
        this.y =y ;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);        
    }
    onclick(x, y){
        if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h){
            return true
        }
    }
}
var buttons = []
var colors = ["red","blue","black","yellow","green","cyan","brown","white","purple"]
var buttonWidth = 20;
var buttonHeight = 20;
var buttonX = canvas.width / 2 - (buttonWidth + 9) * colors.length / 2;
var buttonY = 20;
for (var i = 0; i < colors.length; i++){
    buttons.push(new Button(buttonX, buttonY, buttonWidth, buttonHeight, colors[i]));
    buttonX += buttonWidth + 9
}
var currentColor = "black";
var lastPoint = [undefined, undefined];
var radius = 1;
bar = new boldBar(10, 60, 200);
function main(){

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, 80);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(currentColor, 10, 30);

    for (var i = 0; i < buttons.length; i++){
        buttons[i].draw()
    }
    bar.draw();
    
    window.requestAnimationFrame(main);
}
main();
window.addEventListener("touchstart", function(e){
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    for (var i = 0; i < buttons.length; i++){

        if (buttons[i].onclick(e.touches[0].clientX, e.touches[0].clientY)){
            currentColor = buttons[i].color;
        }
    }
    bar.onclick(x, y)
})
window.addEventListener("touchend", function(e){
    lastPoint = [undefined, undefined];
    bar.hold = false;
})
window.addEventListener("touchmove", function(e){
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    
    if (! bar.hold){
        radius = Math.round(bar.circleX - bar.x - 12 / 200)
        console.log(radius);
        ctx.beginPath();
        ctx.lineWidth = radius * 2;
        ctx.strokeStyle = currentColor;
        ctx.beginPath();
        ctx.moveTo(lastPoint[0], lastPoint[1])
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = currentColor;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        lastPoint = [x, y];
    }

    if (bar.hold){
        if (bar.circleX > bar.x + 1){
            if (bar.circleX < bar.x + bar.length - 1){
                bar.circleX = x;
            }
            else{
                bar.circleX = bar.x + bar.length - 3
            }
        }
        else{
            bar.circleX = bar.x + 2;
        }
    }

    
})