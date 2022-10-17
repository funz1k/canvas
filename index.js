const canvas = document.getElementById("canvas");
const collapsButton = document.getElementById("collapse_line");
const bounds = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");
const width = canvas.width = 600;
const height = canvas.height = 600;

let startX = 0;
let startY = 0;
let mouseX = 0;
let mouseY = 0;
let click = 0;
let isDrawing = false;
let existingLines = [];
let result = [];


function draw() {
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "black";
    ctx.beginPath();

    for (let i = 0; i < existingLines.length; ++i) {
        const line = existingLines[i];
        ctx.moveTo(line.firsttX, line.firstY);
        ctx.lineTo(line.secondX, line.secondY);
    }

    ctx.stroke();

    if (isDrawing) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();

    }
}

function drawCircle(array) {

    for (let index = 0; index < array.length; index++) {
        const { x, y } = array[index];
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(x, y, 5, 0 * Math.PI, 2 * Math.PI);
        ctx.fill();
    }

}


function calculateIntersection(array, x3, y3, x4, y4) {
    const result = []

    for (let index = 0; index < array.length; index++) {
        const { firsttX, firstY, secondX, secondY } = array[index];


        const d1 = (firsttX - secondX) * (y3 - y4);
        const d2 = (firstY - secondY) * (x3 - x4);
        const d = (d1) - (d2);

        const u1 = (firsttX * secondY - firstY * secondX);
        const u4 = (x3 * y4 - y3 * x4);

        const u2x = x3 - x4;
        const u3x = firsttX - secondX;
        const u2y = y3 - y4;
        const u3y = firstY - secondY;

        const px = (u1 * u2x - u3x * u4) / d;
        const py = (u1 * u2y - u3y * u4) / d;

        const p = { x: px, y: py };

        if (firsttX <= px && secondX >= px && x3 <= px && x4 >= px || firstY <= py && secondY >= py && y3 <= py && y4 >= py) {
            result.push(p)
        }
    }

    return result
}

function onMouseClick(e) {
    click += 1;

    if (!isDrawing) {
        startX = e.clientX - bounds.left;
        startY = e.clientY - bounds.top;
        isDrawing = true;
    }

    draw();
    onMouseSecondClick()
}

function onMouseSecondClick() {
    if (click === 2) {
        existingLines.push({
            firsttX: startX,
            firstY: startY,
            secondX: mouseX,
            secondY: mouseY
        });

        isDrawing = false;
        click = 0
    }

    draw();
    result = [...result, ...calculateIntersection(existingLines, startX, startY, mouseX, mouseY)]
    drawCircle(result)
}

function onMousemove(e) {

    mouseX = e.clientX - bounds.left;
    mouseY = e.clientY - bounds.top;

    if (isDrawing) {
        draw();
        drawCircle([...calculateIntersection(existingLines, startX, startY, mouseX, mouseY), ...result])
    }
}

function collapseLine() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, width, height);
    result = []
    existingLines = []
}



canvas.addEventListener('click', onMouseClick);
canvas.addEventListener('mousemove', onMousemove);
collapsButton.addEventListener('click', collapseLine)
draw();



