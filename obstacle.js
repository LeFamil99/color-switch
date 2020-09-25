//Purple: #ad2af7
//Pink: #f72a78
//Yellow: #f7f02a
//Blue: #2af7f2
class Obstacle {
    constructor(x, y, type, size, speed, spacing, off = 0) {
        this.x = x
        this.y = y
        this.type = type
        this.size = size
        this.speed = speed
        this.spacing = spacing
        this.relY = y
        this.angle = 0;
        this.nextSpawned = false
        this.colorChanged = false
        this.off = off
        this.nextSize = floor(random(250, 450))
        changeColors.push(new ChangeColor(x, y - size / 2 - spacing / 2, 50, off))
        stars.push(new Star(x, y, 50, off))
    }

    updateBox() {
        if (this.y > height + this.size / 2) {
            obstacle.unshift()
        }
        
        this.y = this.relY + offY - this.off;
        this.angle = (this.angle + this.speed * frameLength) % 360
        //console.log(this.x, this.y, this.relY)
        //fill('black');
        translate(this.x, this.y);
        rotate((PI / 180) * this.angle)
        image(obstacleImg[0], -this.size / 2, -this.size / 2, this.size, this.size);
        //translate(0, 0)
        if (this.y > 0 / 2 && !this.nextSpawned) {
            this.nextSpawned = true
            obstacle.push(new Obstacle(300, this.relY, 0, this.nextSize, random(2.0, 3.0), this.spacing, this.off + this.spacing + this.size / 2 + this.nextSize / 2))
            console.log(obstacle[obstacle.length - 1], offY)
        }
        resetMatrix()
    }

    /*update() {
        fill('red');
        //translate(this.x, this.y);
        rotate((PI / 180) * this.angle + currentColor * 90)
        image(obstacleImg[0][0], -this.size / 2, -this.size / 2, this.size, this.size);
    }*/
}