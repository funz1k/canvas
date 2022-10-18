export default class Draw {
    isDrawing = false;

    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    get isDrawing() {
        return this.isDrawing;
    }
    setIsDrawing(boolean) {
        this.isDrawing = boolean;
    }

    drawCanvas() {
        this.ctx.fillStyle = "#808080";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawLine(existingLines, startX, startY, mouseX, mouseY ) {
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        for (let i = 0; i < existingLines.length; ++i) {
            const { firsttX, firstY, secondX, secondY } = existingLines[i];
            this.ctx.moveTo(firsttX, firstY);
            this.ctx.lineTo(secondX, secondY);
        }

        this.ctx.stroke();

        if (this.isDrawing) {
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(mouseX, mouseY);
            this.ctx.stroke();
        }

    }

    drawCircle(arrayCoordinates) {
        for (let index = 0; index < arrayCoordinates.length; index++) {
            const { x, y } = arrayCoordinates[index];
            this.ctx.beginPath();
            this.ctx.fillStyle = 'red';
            this.ctx.arc(x, y, 5, 0 * Math.PI, 2 * Math.PI);
            this.ctx.fill();
        }
    }
}