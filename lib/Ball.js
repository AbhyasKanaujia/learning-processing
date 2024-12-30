class Ball {
    constructor(posX = width / 2, posY = height / 2, radius = 20, ballFill = color(255), ballStroke = color(0)) {
        this.posX = posX;
        this.posY = posY;
        this.pPosX = posX;
        this.pPosY = posY;
        this.radius = radius;
        this.ballFill = ballFill;
        this.ballStroke = ballStroke;
    }

    display() {
        push();
        fill(this.ballFill);
        stroke(this.ballStroke);
        circle(this.posX, this.posY, this.radius * 2);
        pop();
    }

    moveRight(horizontalDistance) {
        this.move(this.posX + horizontalDistance, this.posY);
    }

    moveLeft(horizontalDistance) {
        this.move(this.posX - horizontalDistance, this.posY);
    }

    moveUp(verticalDistance) {
        this.move(this.posX, this.posY - verticalDistance);
    }

    moveDown(verticalDistance) {
        this.move(this.posX, this.posY + verticalDistance);
    }

    setSize(newRadius) {
        this.radius = newRadius;
    }

    move(posX, posY) {
        this.pPosX = this.posX;
        this.pPosY = this.posY;
        this.posX = posX;
        this.posY = posY;
    }
}

class BouncingBall extends Ball {
    constructor(posX = width / 2, posY = height / 2, speedX = 0.5, speedY = 0.7, radius = 20, ballFill = color(255), ballStroke = color(0)) {
        super(posX, posY, radius, ballFill, ballStroke);
        this.speedX = speedX;
        this.speedY = speedY;
    }

    move() {
        super.move(this.posX + this.speedX, this.posY + this.speedY);

        if (this.posX + this.radius > width || this.posX - this.radius < 0) {
            this.speedX *= -1;
        }

        if (this.posY + this.radius > height || this.posY - this.radius < 0) {
            this.speedY *= -1;
        }
    }
}

class PerlinBall extends Ball {
    constructor(
        perlinXIncrement = 0.001,
        perlinYIncrement = 0.001,
        posX = width / 2,
        posY = height / 2,
        perlinXTime = 0,
        perlinYTime = 0,
        radius = 20,
        ballFill = color(255),
        ballStroke = color(0)
    ) {
        super(posX, posY, radius, ballFill, ballStroke);

        // Initialize Perlin times
        this.perlinXTime = perlinXTime;
        this.perlinYTime = perlinYTime;

        // Set increments for smooth transitions
        this.perlinXIncrement = perlinXIncrement;
        this.perlinYIncrement = perlinYIncrement;

        // Calculate offsets to align Perlin noise values with user-specified starting position
        this.offsetX = posX - this.mapNoise(this.perlinXTime, radius, width - radius);
        this.offsetY = posY - this.mapNoise(this.perlinYTime, radius, height - radius);
    }

    // Generalized method to calculate position
    getPositionByTime(perlinTime, increment, offset, minBound, maxBound) {
        const newPosition = this.mapNoise(perlinTime, minBound, maxBound) + offset;
        perlinTime += increment; // Increment Perlin time
        return { position: constrain(newPosition, minBound, maxBound), perlinTime };
    }

    // Helper method to map Perlin noise to canvas bounds
    mapNoise(time, minBound, maxBound) {
        return map(noise(time), 0, 1, minBound, maxBound);
    }

    // Override the move method
    move() {
        const xResult = this.getPositionByTime(
            this.perlinXTime,
            this.perlinXIncrement,
            this.offsetX,
            this.radius,
            width - this.radius
        );
        this.perlinXTime = xResult.perlinTime; // Update Perlin time for X
        const yResult = this.getPositionByTime(
            this.perlinYTime,
            this.perlinYIncrement,
            this.offsetY,
            this.radius,
            height - this.radius
        );
        this.perlinYTime = yResult.perlinTime; // Update Perlin time for Y

        super.move(xResult.position, yResult.position);
    }
}