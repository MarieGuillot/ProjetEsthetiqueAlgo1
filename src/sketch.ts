// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Seed: 0,
    Long : -30,
    Download_Image: () => save(),
}
gui.add(params, "Seed", 0, 255, 1)
gui.add(params, "Long", -100, 0, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function smallLine () {
    line(0,0,0,params.Long)
}

function divisePlant (stop) {
    push();
    let maxI = random(0,3);
    for (let i=0; i< maxI; i++) {
        push();
        let angle = random(-PI/8, PI/8);
        rotate(angle);
        smallLine();
        translate(0,params.Long);
        if (stop>1) {
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
    translate(width/2, 4*height/5);
    push();
    divisePlant(15);
    

}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}