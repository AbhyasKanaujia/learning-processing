class Zoog {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.pPosX = posX;
        this.pPosY = posY;
    }

    move(posX, posY) {
        this.pPosX = this.posX;
        this.pPosY = this.posY;
        this.posX = posX;
        this.posY = posY;
    }

    display() {
        push();
        ellipseMode(CENTER);
        rectMode(CENTER);

        // Draw Zoog's body
        stroke(0);
        fill(150);
        rect(this.posX, this.posY, 20, 100);

        // Draw Zoog's head
        fill(255);
        ellipse(this.posX, this.posY - 30, 60, 60);

        // Draw Zoog's eyes
        fill(0);
        ellipse(this.posX - 19, this.posY - 30, 16, 32);
        ellipse(this.posX + 19, this.posY - 30, 16, 32);

        // Draw Zoog's legs
        line(this.posX - 10, this.posY + 50, this.posX - 20, this.posY + 60);
        line(this.posX + 10, this.posY + 50, this.posX + 20, this.posY + 60);

        // Draw Zoog's arms
        line(this.posX - 10, this.posY , this.posX - 40, this.posY);
        line(this.posX + 10, this.posY, this.posX + 40, this.posY);

        pop();
    }
}