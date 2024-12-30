class Girl {
    constructor({
                    name,
                    emoji = "❤",
                    height = 400,
                    posX = 200,
                    posY = 300,
                    hairColor = "#111111",
                    skinColor = color(190, 145, 103),
                    dressColor = color("pink"),
                    armsAngle = PI / 7,
                    dressAngle = PI / 7,
                    socksPrimaryColor = color("white"),
                    socksSecondaryColor = color("black"),
                    shoesColor = color("pink")
                }) {
        this.name = name;
        this.emoji = emoji;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.hairColor = hairColor;
        this.skinColor = skinColor;
        this.dressColor = dressColor;
        this.armsAngle = armsAngle;
        this.dressAngle = dressAngle;
        this.socksPrimaryColor = socksPrimaryColor;
        this.socksSecondaryColor = socksSecondaryColor;
        this.shoesColor = shoesColor;
    }

    show() {
        // Hair
        fill(this.hairColor);
        const faceCenterX = this.posX;
        const faceCenterY = this.posY - this.height / 4;
        const faceRadius = this.height / 4;
        const hairRadius = faceRadius / 2;
        const hairXOffset = faceRadius * 4 / 5;
        const hairYOffset = faceRadius * 4 / 5;

        circle(faceCenterX, faceCenterY, faceRadius * 2);
        line(faceCenterX, faceCenterY, faceCenterX, faceCenterY - hairRadius * 2);
        circle(faceCenterX - hairXOffset, faceCenterY + hairYOffset, hairRadius * 2);
        circle(faceCenterX + hairXOffset, faceCenterY + hairYOffset, hairRadius * 2);

        // Face
        fill(this.skinColor);
        noStroke();

        // Face - forehead
        noStroke();
        const faceTriangleWidth = faceRadius * 2 * 0.8;
        const faceTriangleHeight = faceRadius * 2 * 0.2;
        // point order: top, bottom-right, bottom-left.
        triangle(faceCenterX, faceCenterY, faceCenterX + faceTriangleWidth / 2, faceCenterY + faceTriangleHeight, faceCenterX - faceTriangleWidth / 2, faceCenterY + faceTriangleHeight);
        // Face - middle part
        const faceRectShrink = faceTriangleWidth * 0.1;
        const faceRectWidth = faceTriangleWidth - faceRectShrink;
        const faceRectHeight = faceRadius - faceTriangleHeight * 2;
        rect(faceCenterX - faceRectWidth / 2, faceCenterY + faceTriangleHeight - 1, faceRectWidth, faceRectHeight + 2);
        // Face - chin
        const faceArcCenterX = faceCenterX;
        const faceArcCenterY = faceCenterY + faceTriangleHeight + faceRectHeight;
        const faceArcHeight = faceTriangleHeight * 2;
        arc(faceArcCenterX, faceArcCenterY, faceRectWidth, faceArcHeight, 0, PI);
        // Face - Eyes
        stroke(0);
        arc(faceCenterX - faceRectWidth / 4, faceCenterY + faceTriangleHeight + faceRectHeight / 2, faceRectWidth / 4, faceTriangleHeight / 2, PI, 2 * PI);
        arc(faceCenterX + faceRectWidth / 4, faceCenterY + faceTriangleHeight + faceRectHeight / 2, faceRectWidth / 4, faceTriangleHeight / 2, PI, 2 * PI);
        // Face - mouth
        arc(faceCenterX, faceCenterY + faceTriangleHeight + faceRectHeight + faceArcHeight / 7, faceRectWidth / 4, faceTriangleHeight / 2, 0, PI);

        // Neck
        fill(this.skinColor);
        noStroke();
        const neckTopLeftX = faceCenterX - faceRadius / 16;
        const neckTopLeftY = faceCenterY + faceRadius;
        const neckWidth = faceRadius / 8;
        const neckHeight = neckWidth / 1.618;
        rect(neckTopLeftX, neckTopLeftY, neckWidth, neckHeight);

        // Body
        fill(this.dressColor);
        const bodyTopLeftX = faceCenterX - faceRadius / 4;
        const bodyTopLeftY = neckTopLeftY + neckHeight;
        const bodyWidth = faceRadius / 2;
        const bodyHeight = bodyWidth / 1.618;
        rect(bodyTopLeftX, bodyTopLeftY, bodyWidth, bodyHeight);
        textAlign(CENTER, CENTER);
        textSize(bodyHeight / 2);
        fill(this.hairColor)
        text(this.emoji, bodyTopLeftX + bodyWidth / 2, bodyTopLeftY + bodyHeight / 2);

        // Left Arms
        fill(this.dressColor)
        const armLength = this.height / 6 - neckHeight;
        const armWidth = neckWidth;
        translate(bodyTopLeftX, bodyTopLeftY);
        rotate(this.armsAngle);
        rect(0, 0, armWidth, armLength);

        // Left Hand
        fill(this.skinColor);
        circle(armWidth / 2, armLength, armWidth);

        // Reset transform
        rotate(-this.armsAngle);
        translate(-bodyTopLeftX, -bodyTopLeftY);

        // Right Arms
        fill(this.dressColor)
        translate(bodyTopLeftX + bodyWidth, bodyTopLeftY);
        rotate(-this.armsAngle);
        let rightArmTopRightX = 0;
        let rightArmTopRightY = 0;
        let rightArmBottomLeftX = rightArmTopRightX - armWidth;
        let rightArmBottomLeftY = rightArmTopRightY + armLength;
        rect(rightArmTopRightX, rightArmTopRightY, rightArmBottomLeftX, rightArmBottomLeftY);


        // Right Hand
        fill(this.skinColor);
        circle(-armWidth / 2, armLength, armWidth);

        // Reset transform
        rotate(this.armsAngle);
        translate(-bodyTopLeftX - bodyWidth, -bodyTopLeftY);

        // Dress
        fill(this.dressColor)
        const dressTopLeftX = bodyTopLeftX;
        const dressTopLeftY = bodyTopLeftY + bodyHeight;
        const dressTopWidth = bodyWidth;
        const dressHeight = bodyHeight * 1.618;
        const dressExcess = dressHeight * tan(this.dressAngle);
        quad(
            dressTopLeftX, dressTopLeftY,
            dressTopLeftX + dressTopWidth, dressTopLeftY,
            dressTopLeftX + dressTopWidth + dressExcess, dressTopLeftY + dressHeight,
            dressTopLeftX - dressExcess, dressTopLeftY + dressHeight
        );

        // legs
        fill(this.skinColor);
        const legWidth = armWidth;
        const leftLegTopLeftX = this.posX - (legWidth * 3 / 2);
        const leftLegTopLeftY = dressTopLeftY + dressHeight;
        const legHeight = this.posY + this.height / 2 - leftLegTopLeftY;
        rect(leftLegTopLeftX, leftLegTopLeftY, legWidth, legHeight, 0, 0, 10, 10);

        const rightLegTopLeftX = this.posX + (legWidth / 2);
        const rightLegTopLeftY = dressTopLeftY + dressHeight;
        rect(rightLegTopLeftX, rightLegTopLeftY, legWidth, legHeight, 0, 0, 10, 10);

        // socks
        fill(this.socksPrimaryColor);
        const leftSockTopLeftX = leftLegTopLeftX;
        const leftSockTopLeftY = leftLegTopLeftY + legHeight / 2;
        rect(leftSockTopLeftX, leftSockTopLeftY, legWidth, legHeight / 2, 0, 0, 10, 10);

        const rightSockTopLeftX = rightLegTopLeftX;
        const rightSockTopLeftY = rightLegTopLeftY + legHeight / 2;
        rect(rightSockTopLeftX, rightSockTopLeftY, legWidth, legHeight / 2, 0, 0, 10, 10);

        fill(this.socksSecondaryColor);
        const leftSockStripeTopLeftX = leftSockTopLeftX;
        const leftSockStripeTopLeftY = leftSockTopLeftY + legHeight / 16;
        rect(leftSockStripeTopLeftX, leftSockStripeTopLeftY, legWidth, legWidth / 3);

        const rightSockStripeTopLeftX = rightSockTopLeftX;
        const rightSockStripeTopLeftY = rightSockTopLeftY + legHeight / 16;
        rect(rightSockStripeTopLeftX, rightSockStripeTopLeftY, legWidth, legWidth / 3);

        // shoe
        fill(this.shoesColor);
        const leftShoeTopLeftX = leftLegTopLeftX;
        const leftShoeTopLeftY = leftLegTopLeftY + legHeight - legWidth;
        rect(leftShoeTopLeftX, leftShoeTopLeftY, legWidth, legWidth, 0, 0, 10, 10);

        const rightShoeTopLeftX = rightLegTopLeftX;
        const rightShoeTopLeftY = rightLegTopLeftY + legHeight - legWidth;
        rect(rightShoeTopLeftX, rightShoeTopLeftY, legWidth, legWidth, 0, 0, 10, 10);
    }
}