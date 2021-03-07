// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Seed: 0,
    Long : -30,
    Angle : 0.39,
    Download_Image: () => save(),
}
gui.add(params, "Seed", 0, 255, 1)
gui.add(params, "Long", -1000, 0, 1)
gui.add(params, "Angle", 0, 1.7, 0.001)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function smallLine () {

    let j = 0;
    while (j<2) {
        line(0,0,0,params.Long); 
        push();
        let angle = ((PI/12) - j*(PI/7));
        rotate(angle); 
        line(0,0,0,(2-j)*(2/3)*params.Long); 
        pop();
        translate(0,params.Long);
        j++;
    }   
    line(0,0,0,(1/3)*params.Long);
    translate(0,(1/3)*params.Long);
    
}
/*
function fibonacci (n) {
    if (n<=1) {
        return n;
    } 
    else {
        return fibonacci(n-1)+fibonacci(n-2);
    }

}*/

function divisePlant (stop) {
    
    push();
        
        if (stop>1) {

            let angle = random(-1*params.Angle, params.Angle);
            rotate(angle);
            smallLine();

            push();
            divisePlant(stop-1);
            pop();  
            push();
            divisePlant(stop-2);
            pop(); 

        }
        if (stop==0) {
            let angle = random(-1*params.Angle, params.Angle);
            rotate(angle);
            smallLine();
        }
        if (stop==1) {
            let angle = random(-1*params.Angle, params.Angle);
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
    let B=255;
    stroke("#136428");
    translate(width/2, 4*height/5);
    push();
    let longueurArbre = 5;
    divisePlant(longueurArbre);
    

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