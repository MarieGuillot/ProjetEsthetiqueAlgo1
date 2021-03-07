var gui = new dat.GUI();
var params = {
    Seed: 0,
    Long: -30,
    Angle: 0.39,
    Download_Image: function () { return save(); },
};
gui.add(params, "Seed", 0, 255, 1);
gui.add(params, "Long", -1000, 0, 1);
gui.add(params, "Angle", 0, 1.7, 0.001);
gui.add(params, "Download_Image");
function smallLine() {
    var j = 0;
    while (j < 2) {
        line(0, 0, 0, params.Long);
        push();
        var angle = ((PI / 12) - j * (PI / 7));
        rotate(angle);
        line(0, 0, 0, (2 - j) * (2 / 3) * params.Long);
        pop();
        translate(0, params.Long);
        j++;
    }
    line(0, 0, 0, (1 / 3) * params.Long);
    translate(0, (1 / 3) * params.Long);
}
function divisePlant(stop) {
    push();
    if (stop > 1) {
        var angle = random(-1 * params.Angle, params.Angle);
        rotate(angle);
        smallLine();
        push();
        divisePlant(stop - 1);
        pop();
        push();
        divisePlant(stop - 2);
        pop();
    }
    if (stop == 0) {
        var angle = random(-1 * params.Angle, params.Angle);
        rotate(angle);
        smallLine();
    }
    if (stop == 1) {
        var angle = random(-1 * params.Angle, params.Angle);
        rotate(angle);
        smallLine();
        smallLine();
    }
    pop();
}
function draw() {
    randomSeed(params.Seed);
    background("#F4EAD3");
    noFill();
    var B = 255;
    stroke("#136428");
    translate(width / 2, 4 * height / 5);
    push();
    var longueurArbre = 5;
    divisePlant(longueurArbre);
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