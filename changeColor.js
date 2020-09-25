class ChangeColor {
	constructor(x, y, size, off) {
		this.x = x
		this.y = y
		this.size = size
		this.off = off
		this.relY = y
	}

	update() {
		this.y = this.relY + offY - this.off;
		//circle(this.x, this.y, this.size)
		
		if (this.y > max - this.size / 2 - radius / 2) {
			player.changeColor()
			changeColors.shift()
		} else {
			image(symbols[0], this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
		}

	}
}