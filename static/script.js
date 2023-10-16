
var ws = new WebSocket("ws://localhost:3000/ws");
ws.onopen = function() {
    ws.send("Hello, server!")
}

ws.onmessage = function(event) {
    console.log("Received: " + event.data);
}

ws.onclose = function() {
    console.log("Connection closed")
}

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d')
const count = 10;
const size = 300/count;
let move = false;

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const x = Math.floor(px/size) * size + size/2;
    const y = Math.floor(py/size) * size + size/2;

    ctx.font = '45px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    move = !move;
    
    ctx.fillStyle = move ? "#00ff00" : "#0000ff";
    const text = move ? "x" : "o";
    ctx.fillText(text, x, y);
});


drawBoard(count, size);

function drawLine(x1, y1,x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawBoard(count, size){
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    for (let i = 0; i < count-1; i++)
    {
        for (let j = 0; j < count-1; j++){
            drawLine((i+1)*size, 0, (i+1)*size, count*size);
            drawLine(0, (j+1)*size, count*size, (j+1)*size);
        }
    }
}