class Star {
	constructor(x, y, size, off, dead = false, delay = 0, speed = 0) {
		console.log(this)
		this.x = x
		this.y = y
		this.size = size
		this.off = off
		this.dead = dead
		this.delay = delay
		this.speed = speed
		this.relY = y
		this.opacity = dead? 0: 255
	}

	update(i = 0) {
		this.y = this.relY + offY - this.off;
		//circle(this.x, this.y, this.size)
		if (this.dead) {
			if (millis() > this.delay) {
				this.opacity += this.speed
				if (this.opacity > 255) {
					this.opacity = 255
					this.speed = -this.speed
				}
				if(this.opacity < 0) stars2.splice(i, 1)
			}
			console.log(this, millis())
        }


		if (this.y > max - this.size / 3 - radius / 2) {
			if (!this.dead) {
				this.death()
				stars.shift()
			}
		} else {
			//console.log('star')
			tint(255, this.opacity);
			image(symbols[1], this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
			noTint()
		}

	}

	death() {
		for (let i = 0; i < 20; i++) {
			//console.log('star2 ' + i)
			stars2.push(new Star(this.x + floor(random(-10, 10)), this.y + floor(random(-10, 10)), floor(random(5, 20)), this.off, true,  random(1) * 1000 + millis(), 20))
        }
    }
}