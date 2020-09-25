// JavaScript source code
let obstacleImg = [];
let symbols = []
function preload() {
    obstacleImg.push(loadImage("https://lefamil99.github.io/color-switch/images/circleObs.png"))
    symbols.push(loadImage("https://lefamil99.github.io/color-switch/images/changeColor.png"))
    symbols.push(loadImage("https://lefamil99.github.io/color-switch/images/Star.png"))
}

let player;
let obstacle = [];
let changeColors = [];
let stars = []
let stars2 = []
let offY = 0
const colors = ["#ad2af7", "#f72a78", "#2af7f2", "#f7f02a"]           //Purple, Pink, Blue, Yellow
let currentColor
let jumpStrength
let gravity
let radius
let milli
let frameLength;
let spacing
let max

function setup() {
    currentColor = floor(random(4))
    milli = millis();
    spacing = 200;
    jumpStrength = 10;
    gravity = 0.6;
    radius = 34;
    max = 450
    createCanvas(600, 900)
    player = new Player(300, 750, jumpStrength, color(colors[currentColor]), max, gravity, radius)
    obstacle.push(new Obstacle(300, 0, 0, 400, 3, spacing));
    //image(imaged, 0, 0)
    //console.log(imaged.get(10, 10))
}

function ballPixels(x, y, size, target) {
    let Z = []
    let Y = []
    let X = []
    loadPixels();
    //let d = pixelDensity();
    for (let i = 0; i <= size; i++)
        for (let j = 0; j <= size; j++) {
            Z.push(pixels[((y - size / 2) + i) * 4 * width + ((x - size / 2) + j) * 4])
            
            //if(i === 0 && j === 0)console.log(((y - size / 2) + i) * 4 * width + ((x - size / 2) + j) * 4)
            //set(((x - size / 2) + j), ((y - size / 2) + i),  color(0, 0, 255))
            //updatePixels();
            Z.push(pixels[(((y - size / 2) + i) * 4 * width + ((x - size / 2) + j) * 4) + 1])
            Z.push(pixels[(((y - size / 2) + i) * 4 * width + ((x - size / 2) + j) * 4) + 2])
            Z.push(pixels[(((y - size / 2) + i) * 4 * width + ((x - size / 2) + j) * 4) + 3])
            X.push([((y - size / 2) + i), ((x - size / 2) + j), Z[Z.length - 4], Z[Z.length - 3], Z[Z.length - 2]])
            //console.log(i, j, color(Z[Z.length - 4], Z[Z.length - 3], Z[Z.length - 2]), target)
            if (Z[Z.length - 4] === red(target) && Z[Z.length - 3] === green(target) && Z[Z.length - 2] === blue(target)) {
                Y.push(((y - size / 2) + i) * 4 * width + ((x - size / 2) + j) * 4)
                //set(((x - size / 2) + j), ((y - size / 2) + i), color(0, 0, 0))
                
            }
        }
    //updatePixels()
    //console.log(Z)

    return Y
}

function checkCollision(targetPlayer, obstacles) {
    let P = ballPixels(round(targetPlayer.x), round(targetPlayer.y), targetPlayer.radius, targetPlayer.color)
    //console.log(P)
    for (let i in obstacles) {
        obstacles[i].updateBox();
    }
    loadPixels();
    //let A = []
    for (let i in P) {
        //A.push([P[i], P[i] + 1 ,P[i] + 2])
        if (pixels[P[i]] !== red(targetPlayer.color) || pixels[P[i] + 1] !== green(targetPlayer.color) || pixels[P[i] + 2] !== blue(targetPlayer.color)) {
            //console.log(A)
            return true
        }
    }
    //console.log(A)
    return false
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------

function draw() {
    frameLength = (millis() - milli) / 17
    if(frameLength > 1.5)console.log(frameLength)
    milli = millis()
    //console.log(frameLength)
    background(50)
    
    player.update();
    for (let i in changeColors) {
        changeColors[i].update()
    }
    for (let i in stars) {
        //console.log('star')
        stars[i].update()
    }
    for (let i in stars2) {
        stars2[i].update(i)
    }
    
    //console.log(ballPixels(round(player.x), round(player.y), radius, color(255, 0, 0)))
    if (checkCollision(player, obstacle) && !player.dead) {
        console.log('dead')
        player.death()
    }
    
    //obstacle.update()
}

function keyTyped() {
    switch (key) {
        case ' ':
            player.jump()   
            break;
    }
}

function mousePressed() {
    player.jump()
}