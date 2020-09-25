class Player {
    constructor(x, y, jumpForce, color, max, gravity, radius, xVel = 0, yVel = 0, started = false) {
        this.x = x;
        this.y = y;
        this.jumpForce = jumpForce;
        this.color = color;
        this.max = max;
        this.gravity = gravity;
        this.radius = radius;
        this.yVel = yVel;
        this.xVel = xVel;
        this.dead = false;
        this.deadBalls = []
        this.started = started
    }

    update() {
        
        if (this.dead) {
            for (let i in this.deadBalls) {
                this.deadBalls[i].update()
            }
        } else {
            if (this.started) {
                this.yVel += this.gravity * frameLength;
                this.y += this.yVel * frameLength
                this.x += this.xVel * frameLength
                if (this.x > width || this.x < 0) {
                    this.x = this.x - this.x % width
                    this.xVel = -this.xVel
                }
                /*this.y = 21;
                this.x = 21;*/
                if (this.y < this.max) {
                    offY += this.max - this.y
                    this.y = this.max
                }
            }
            noStroke();
            noSmooth();
            fill(this.color)
            ellipse(this.x, this.y, this.radius, this.radius)
        }
    }

    jump() {
        this.yVel = -this.jumpForce
        this.started = true
    }

    death() {
        this.dead = true

        for (let i = 0; i < 500; i++) {
            let rand = floor(random(20, 60))
            this.deadBalls.push(new Player(this.x, this.y, 0, colors[floor(random(4))], -999999, this.gravity, this.radius * random(0.5), random(rand) - 20, random(rand) - 30, true))
        }
    }

    changeColor() {
        let prevR = red(this.color)
        let prevG = green(this.color)
        let prevB = blue(this.color)
        while (prevR === red(this.color) && prevG === green(this.color) && prevB === blue(this.color)) {
            console.log('Vlad')
            this.color = color(colors[floor(random(4))])
        }
    }
}