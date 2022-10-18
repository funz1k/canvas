export default class WorkWithCoordinate {
    startX = 0;
    startY = 0;
    mouseX = 0;
    mouseY = 0;
    existingLines = [];
    intersectionResult = [];

    constructor() { }

    get startX() {
        return this.startX
    }

    get startY() {
        return this.startY
    }

    get mouseX() {
        return this.mouseX
    }

    get mouseY() {
        return this.mouseY
    }

    setDinamicValue(coordinate, value) {
        switch (coordinate) {
            case 'startX':
                this.startX = value;
                break;
            case 'startY':
                this.startY = value;
                break;
            case 'mouseX':
                this.mouseX = value;
                break;
            case 'mouseY':
                this.mouseY = value;
                break;

            default:
                break;
        }
    }

    setExistingLines() {
        this.existingLines.push({
            firsttX: this.startX,
            firstY: this.startY,
            secondX: this.mouseX,
            secondY: this.mouseY
        });
    }

    setIntersectionResult(coordinates) {
        this.intersectionResult = [...this.intersectionResult, ...coordinates]
    }

    get existingLines() {
        return this.existingLines;
    }

    get intersectionResult() {
        return this.intersectionResult;
    }

    removeExistingLines() {
        this.existingLines = []
    }

    removeIntersectionResult() {
        this.intersectionResult = []
    }
}

