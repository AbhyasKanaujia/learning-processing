class Grid {
    constructor(gridWidth = width, gridHeight = height, unitSize = 40, gridColor = color(200)) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.unitSize = unitSize;
        this.gridColor = gridColor;
    }

    display() {
        push();
        stroke(this.gridColor);
        for (let i = 0; i <= this.gridWidth; i += this.unitSize) {
            line(i, 0, i, this.gridHeight);
        }

        for (let j = 0; j <= this.gridHeight; j += this.unitSize) {
            line(0, j, this.gridWidth, j);
        }
        pop();
    }
}