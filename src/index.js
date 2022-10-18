import WorkWithCoordinate from "./WorkWithCoordinate.js";
import Draw from "./Draw.js";
import calculateIntersection from "./calculateIntersection.js";

const canvas = document.getElementById("canvas");
const collapsButton = document.getElementById("collapse_line");

const bounds = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");
const width = canvas.width = 600;
const height = canvas.height = 600;
let click = 0;

const workWithCoordinate = new WorkWithCoordinate()
const draw = new Draw(ctx, width, height)

function onMouseClick(e) {
    click += 1;
    if (!draw.isDrawing) {
        workWithCoordinate.setDinamicValue('startX', e.clientX - bounds.left);
        workWithCoordinate.setDinamicValue('startY', e.clientY - bounds.top);
        draw.setIsDrawing(true);
    }
    draw.drawCanvas();
    onMouseSecondClick()
}

function onMouseSecondClick() {
    if (click === 2) {
        workWithCoordinate.setExistingLines()
        draw.setIsDrawing(false);
        click = 0
    }

    draw.drawLine(
        workWithCoordinate.existingLines,
        workWithCoordinate.startX,
        workWithCoordinate.startY,
        workWithCoordinate.mouseX,
        workWithCoordinate.mouseY
    )
    let res = calculateIntersection(
        workWithCoordinate.existingLines,
        workWithCoordinate.startX,
        workWithCoordinate.startY,
        workWithCoordinate.mouseX,
        workWithCoordinate.mouseY
    )
    workWithCoordinate.setIntersectionResult(res)
    draw.drawCircle(workWithCoordinate.intersectionResult)
}

function onMousemove(e) {
    workWithCoordinate.setDinamicValue('mouseX', e.clientX - bounds.left);
    workWithCoordinate.setDinamicValue('mouseY', e.clientY - bounds.top);
    if (draw.isDrawing) {
        draw.drawCanvas();
        draw.drawLine(
            workWithCoordinate.existingLines,
            workWithCoordinate.startX,
            workWithCoordinate.startY,
            workWithCoordinate.mouseX,
            workWithCoordinate.mouseY
        );
        let res = calculateIntersection(
            workWithCoordinate.existingLines,
            workWithCoordinate.startX,
            workWithCoordinate.startY,
            workWithCoordinate.mouseX,
            workWithCoordinate.mouseY
        )
        draw.drawCircle([...res, ...workWithCoordinate.intersectionResult])
    }
}

function collapseLine() {
    ctx.clearRect(0, 0, width, height);
    draw.drawCanvas()
    workWithCoordinate.removeExistingLines();
    workWithCoordinate.removeIntersectionResult()
}



canvas.addEventListener('click', onMouseClick);
canvas.addEventListener('mousemove', onMousemove);
collapsButton.addEventListener('click', collapseLine)
draw.drawCanvas();



