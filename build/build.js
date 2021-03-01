var gui = new dat.GUI();
var params = {
    Seed: 0,
    Long: -30,
    Download_Image: function () { return save(); },
};
gui.add(params, "Seed", 0, 255, 1);
gui.add(params, "Long", -100, 0, 1);
gui.add(params, "Download_Image");
function smallLine() {
    line(0, 0, 0, params.Long);
}
function divisePlant(stop) {
    push();
    var maxI = random(0, 3);
    for (var i = 0; i < maxI; i++) {
        push();
        var angle = random(-PI / 8, PI / 8);
        rotate(angle);
        smallLine();
        translate(0, params.Long);
        if (stop > 1) {
            push();
            stop--;
            divisePlant(stop);
            pop();
        }
        pop();
    }
    pop();
}
function draw() {
    randomSeed(params.Seed);
    background("#F4EAD3");
    noFill();
    stroke("#136428");
    translate(width / 2, 4 * height / 5);
    push();
    divisePlant(15);
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map