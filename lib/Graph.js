class Graph {
    constructor(data, x = 0, y = 0, width = window.width, height = window.height, padding = 10) {
        this.data = data;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.padding = padding;
    }
}

class LineGraph extends Graph {
    constructor(data, x = 0, y = 0, width = window.width, height = window.height, color = "magenta", strokeWeight = 2, showAxes = true, showTicks = true) {
        super(data, x, y, width, height, 10);
        this.color = color;
        this.strokeWeight = strokeWeight;
        this.min = Math.min(...data);
        this.max = Math.max(...data);
        this.showAxes = showAxes;
        this.showTicks = showTicks;
        this.unitSize = width / data.length;
    }

    drawAxes() {
        if (!this.showAxes) return;
        stroke("black");
        strokeWeight(1);
        // X-Axis
        line(this.x + this.padding, this.y + this.height - this.padding * 2, this.x + this.width - this.padding, this.y + this.height - this.padding * 2);
        // Y-Axis
        line(this.x + this.padding * 2, this.y + this.padding, this.x + this.padding * 2, this.y + this.height - this.padding);
    }

    drawLabels() {
        textAlign(CENTER);
        text("0", this.x + this.padding * 1.5, this.y + this.height - this.padding);
        textAlign(RIGHT);
        text(this.data.length - 1, this.x + this.width - this.padding, this.y + this.height - this.padding);
        push();
        translate(this.x + this.padding * 1.5, this.y + this.padding);
        rotate(-HALF_PI);
        text(Math.round(this.max), 0, 0);
        pop();
    }

    drawLine() {
        stroke(this.color);
        strokeWeight(this.strokeWeight);
        let prevX, prevY;
        for (let i = 0; i < this.data.length; i++) {
            const posX = this.x + this.padding * 2 + map(i, 0, this.data.length - 1, 0, this.width - this.padding * 3);
            const posY = this.y + this.height - this.padding * 2 - map(this.data[i], this.min, this.max, 0, this.height - this.padding * 3);
            if (prevX !== undefined) line(prevX, prevY, posX, posY);
            [prevX, prevY] = [posX, posY];
        }
    }

    display() {
        push();
        this.drawAxes();
        this.drawLabels();
        this.drawLine();
        pop();
    }
}

window.Graph = Graph;
window.LineGraph = LineGraph;