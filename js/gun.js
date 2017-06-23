function gun(direction = 0) {
	var gun = {
		heat: 10,
		heatGenerated: 0,
		heatTolerance: 100,
		bulletTimer: 0,
		bulletDelay: 20,
		bullets: [],
		timer: 10,
		coolRate: 2,

		render: function(ctx, targets) {
			for(var i = this.bullets.length -1; i >= 0; i--) {
	        	if(this.bullets[i]) {
		        	this.bullets[i].logic(targets);
		        	this.bullets[i].render(ctx);
		        	if(this.bullets[i].done) this.bullets.splice(i, 1);
	        	}
	        }

	        if(this.timer == 10) {
	        	if(this.heatGenerated > 0)
	        		this.heatGenerated = (this.heatGenerated - this.coolRate < 0) ? 0 : this.heatGenerated - this.coolRate;
	        	this.timer = 0;
	        }
	        else 
	        	this.timer++;

	        if(this.bulletTimer != this.bulletDelay)
	        	this.bulletTimer++;
		},

		fireBullet: function(xStart, yStart) {
			if((this.heatGenerated + this.heat) < this.heatTolerance && this.bulletTimer == this.bulletDelay) {
				console.log('sdsdd')
        		this.heatGenerated = (this.heatGenerated + this.heat > this.heatTolerance) ?  this.heatTolerance : this.heatGenerated + this.heat;
        		this.bullets.push(bullet(xStart, yStart));
        		this.bulletTimer = 0;
        	}
		}
	}

	return gun;
}