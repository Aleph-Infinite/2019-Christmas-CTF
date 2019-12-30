const getMousePos = (canvas, evt) => {
    let rect = canvas.getBoundingClientRect()
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}

const setLevel = l => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    level = l
    if(l == 6){
        $('.level').html('Clear!')
    }else{
        context.font = "30px Arial";
        context.fillStyle="rgba(0,0,0,1)"
        context.fillText(level + " Stage", 1000, 50) 
    }
    setMap(l)
    setFlag(l)
    waitStart()
}

const setFlag = l => {
    context.fillStyle="rgba(0,0,0,1)"
    if(l == 1){
        context.fillText('XMAS{}', 1000, 100)
    }else if(l == 2){
        context.fillText('XMAS{M1r0-g4}', 1000, 100)
    }else if(l == 3){
        context.fillText('XMAS{M1r0-g4me-1s-s}', 1000, 100)
    }else if(l == 4){
        context.fillText('XMAS{M1r0-g4me-1s-s0-fun}', 1000, 100)
    }else if(l == 5){
        context.fillText('XMAS{M1r0-g4me-1s-s0-funny-g4me-1}', 1000, 100)
    }else if(l == 6){
        context.fillStyle="rgba(255,0,0,1)"
        context.fillText('XMAS{M1r0-g4me-1s-s0-funny-g4me-1sn7?@?}', 1000, 100)
    }
}

const setMap = l => {
    

    context.beginPath();
    context.rect(20, 20, 50, 50);
    context.fillStyle = "rgba(0, 255, 0, 1)";
    context.lineWidth = 8;
    context.fill();

    context.beginPath()
    context.moveTo(0, 0);
    context.lineTo(930, 0);
    context.lineTo(930, 700);
    context.lineTo(0, 700);
    context.lineTo(0, 0);
    context.strokeStyle = "rgba(255, 0, 0, 1)";
    context.lineWidth = 16;
    context.stroke();        
    
    if(l == 1){
        context.beginPath()
        context.moveTo(8, 90);
        context.lineTo(400, 90);
        context.lineTo(400, 700-8);
        context.lineTo(8, 700-8);
        context.lineTo(8, 0);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill();   
        
        context.beginPath()
        context.moveTo(930-8, 0);
        context.lineTo(930-8, 620);
        context.lineTo(500, 620);
        context.lineTo(500, 0);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill();

        context.beginPath();
        context.rect(860, 630, 50, 50);
        context.fillStyle = "rgba(0, 0, 255, 1)";
        context.lineWidth = 8;
        context.fill();
    }else if(l == 2){
        context.beginPath()
        context.moveTo(88, 0);
        context.lineTo(88, 650);
        context.lineTo(158, 650);
        context.lineTo(158, 0);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill();   

        context.beginPath()
        context.moveTo(408, 0);
        context.lineTo(408, 650);
        context.lineTo(478, 650);
        context.lineTo(478, 0);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill();   

        context.beginPath()
        context.moveTo(728, 0);
        context.lineTo(728, 650);
        context.lineTo(848, 650);
        context.lineTo(848, 0);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill();   

        context.beginPath()
        context.moveTo(248, 700);
        context.lineTo(248, 50);
        context.lineTo(318, 50);
        context.lineTo(318, 700);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill();  
        
        context.beginPath()
        context.moveTo(568, 700);
        context.lineTo(568, 50);
        context.lineTo(638, 50);
        context.lineTo(638, 700);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill();  
        
        context.beginPath();
        context.rect(860, 20, 50, 50);
        context.fillStyle = "rgba(0, 0, 255, 1)";
        context.lineWidth = 8;
        context.fill();
    }else if(l == 4){
        context.beginPath()
        context.moveTo(0, 80);
        context.lineTo(880, 80);
        context.lineTo(860, 140);
        context.lineTo(0, 140);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill();  

        context.beginPath()
        context.moveTo(150, 50);
        context.lineTo(900, 40);
        context.lineTo(880, 140);
        context.lineTo(0, 140);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill();  

        context.beginPath()
        context.moveTo(930, 160);
        context.lineTo(930, 200);
        context.lineTo(30, 200);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill();  

        context.beginPath()
        context.moveTo(30, 200);
        context.lineTo(930, 200);
        context.lineTo(930, 300);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill(); 
        
        context.beginPath()
        context.moveTo(0, 250);
        context.lineTo(900, 325);
        context.lineTo(0, 400);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill(); 

        context.beginPath()
        context.moveTo(0, 250);
        context.lineTo(900, 325);
        context.lineTo(0, 400);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill(); 

        context.beginPath()
        context.moveTo(930, 360);
        context.lineTo(20, 420);
        context.lineTo(930, 480);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill(); 

        context.beginPath()
        context.moveTo(0, 500);
        context.lineTo(930, 550);
        context.lineTo(930, 700);
        context.lineTo(0, 700);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 4;
        context.fill(); 

        context.beginPath();
        context.rect(860, 490, 50, 50);
        context.fillStyle = "rgba(0, 0, 255, 1)";
        context.lineWidth = 8;
        context.fill();
    }else if(l == 5){
        context.beginPath()
        context.moveTo(0, 80);
        context.lineTo(80, 80);
        context.lineTo(80, 700);
        context.lineTo(0, 700);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 
        
        context.beginPath()
        context.moveTo(100, 0);
        context.lineTo(100, 70);
        context.lineTo(930, 70);
        context.lineTo(930, 0);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(100, 0);
        context.lineTo(100, 670);
        context.lineTo(120, 670);
        context.lineTo(120, 0);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(120, 670);
        context.lineTo(250, 0);
        context.lineTo(120, 0);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(140, 700);
        context.lineTo(200, 700);
        context.lineTo(270, 100);
        context.lineTo(270, 90);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(270, 90);
        context.lineTo(900, 90);
        context.lineTo(900, 100);
        context.lineTo(270, 100);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(900, 100);
        context.lineTo(300, 700);
        context.lineTo(140, 700);
        context.lineTo(270, 90);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(930, 130);
        context.lineTo(400, 640);
        context.lineTo(930, 640);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath();
        context.rect(880, 647.5, 40, 40);
        context.fillStyle = "rgba(0, 0, 255, 1)";
        context.lineWidth = 8;
        context.fill();
    }else if(l == 3){
        context.beginPath()
        context.moveTo(0, 80);
        context.lineTo(880, 80);
        context.lineTo(880, 100);
        context.lineTo(0, 100);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(880, 100);
        context.lineTo(880, 660);
        context.lineTo(860, 660);
        context.lineTo(860, 100);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(860, 660);
        context.lineTo(30, 660);
        context.lineTo(30, 630);
        context.lineTo(860, 630);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(30, 630);
        context.lineTo(30, 120);
        context.lineTo(60, 120);
        context.lineTo(60, 630);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(30, 120);
        context.lineTo(835, 120);
        context.lineTo(835, 140);
        context.lineTo(30, 140);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(835, 120);
        context.lineTo(835, 600);
        context.lineTo(815, 600);
        context.lineTo(815, 120);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath()
        context.moveTo(835, 600);
        context.lineTo(80, 600);
        context.lineTo(80, 580);
        context.lineTo(835, 580);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.lineWidth = 8;
        context.fill(); 

        context.beginPath();
        context.rect(340, 250, 200, 200);
        context.fillStyle = "rgba(0, 0, 255, 1)";
        context.lineWidth = 8;
        context.fill();
    }

    publishPos()
}

const publishPos = () => {
    let img = context.getImageData(0, 0, 930, 700).data
    let rgb = new Array()
    for(let i = 0; i < img.length; i += 4){
        rgb.push({r: img[i], g: img[i+1], b: img[i+2], a: img[i+3]})
    }
    pos = new Array()
    startPos = new Array()
    endPos = new Array()
    rgb.forEach((x,index) => {
        if(x.r == 255){
            pos.push({x: index%930, y:parseInt(index/930)})
        }else if(x.g == 255){
            startPos.push({x: index%930, y:parseInt(index/930)})
        }else if(x.b == 255){
            endPos.push({x: index%930, y:parseInt(index/930)})
        }context.fillS
    })
}
 
const clearFlag = () => {
    $('.flag').html('XMAS{}')
}

const checkMap = mousePos => {
    return pos.map(x => x.x == mousePos.x && x.y == mousePos.y).indexOf(true) != -1 ? true : false
}

const checkStart = mousePos => {
    return startPos.map(x => x.x == mousePos.x && x.y == mousePos.y).indexOf(true) != -1 ? true : false
}

const checkEnd = mousePos => {
    return endPos.map(x => x.x == mousePos.x && x.y == mousePos.y).indexOf(true) != -1 ? true : false
}

const checkMousePosWithStart = evt => { 
    let mousePos = getMousePos(canvas, evt)
    if(checkStart(mousePos)){
        gameStart()
    }
}

const checkMousePos = evt => {
    let mousePos = getMousePos(canvas, evt)
    if(mousePos.x < 0 || mousePos.y < 0 || mousePos.x > 930 || mousePos.y > 700){
        gameOver()
    }else if(checkMap(mousePos)){
        gameOver()
    }else if(checkEnd(mousePos)){
        gameClear()
    }
}

const waitStart = () => {
    canvas.addEventListener('mousemove', checkMousePosWithStart, false)
}

const gameStart = () => {
    canvas.removeEventListener('mousemove', checkMousePosWithStart, false)
    canvas.addEventListener('mousemove', checkMousePos, false)
    context.beginPath();
    context.fillStyle="rgba(255,255,255,1)"
    context.rect(1000, 120, 150, 400);
    context.fill();
    context.fillStyle="rgba(0,0,255,1)"
    context.fillText("START", 1000, 150) 
    startTime = Math.round(+new Date()/1000)
}

const gameOver = () => {
    canvas.removeEventListener('mousemove', checkMousePos, false)
    setLevel(level)
    clearFlag()
    context.fillStyle="rgba(255,0,0,1)"
    context.fillText("END", 1000, 150) 
}

const gameClear = () => {
    endTime = Math.round(+new Date()/1000)
    if(endTime - startTime < 1){
        alert('Not use Bug!!')
        gameOver()
        return 
    }
    canvas.removeEventListener('mousemove', checkMousePos, false)
    setLevel(level + 1)
    context.fillStyle="rgba(0,255,0,1)"
    context.fillText("Clear!", 1000, 150) 
}


let canvas = document.getElementById('gameBoard')
let context = canvas.getContext('2d')
let level = 0
let pos = new Array()
let startPos = new Array()
let endPos = new Array()
let startTime, endTime
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.fillStyle="rgba(0,255,0,1)"
context.fillText("Wait,,", 1000, 150) 

$(document).ready(function(){
    $(document).bind('keydown',function(e){
        if ( e.keyCode == 123 /* F12 */) {
            e.preventDefault();
            e.returnValue = false;
        }
    });
});


document.onmousedown=disableclick;
status="Right click is not available.";

function disableclick(event){
    if (event.button==2) {
        return false;
    }
}

setLevel(1)