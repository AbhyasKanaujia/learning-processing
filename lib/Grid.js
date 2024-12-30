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

        const unfitWidth = this.gridWidth % this.unitSize;
        const unfitHeight = this.gridHeight % this.unitSize;

        for (let i = -unfitWidth / 2; i <= this.gridWidth; i += this.unitSize) {
            line(i, 0, i, this.gridHeight);
        }

        for (let j = -unfitHeight / 2; j <= this.gridHeight; j += this.unitSize) {
            line(0, j, this.gridWidth, j);
        }
        pop();
    }
}