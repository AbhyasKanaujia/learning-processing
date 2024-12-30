let lastUpdateTime = 0;
let currentFrameRate = 0;

function showFrameRate() {
    const now = millis();
    if(now - lastUpdateTime > 1000) {
        lastUpdateTime = now;
        currentFrameRate = Math.floor(frameRate());
    }

    rectMode(CENTER)
    fill("white");
    rect(30, 10, 40, 20);
    fill("black")
    textAlign(CENTER, CENTER);
    text(currentFrameRate + " fps", 30, 10);
}