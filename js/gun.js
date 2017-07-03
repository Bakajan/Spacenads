function gun(direction = 0, bullets) {
	var gun = {
		heat: 10,
		heatGenerated: 0,
		heatTolerance: 100,
		bulletTimer: 0,
		bulletDelay: 20,
		ammo: bullets,
		selectedBullet: 0,
		bullets: [],
		timer: 10,
		coolRate: 2,
		direction: direction,

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
			var fired = false;
			var bullet = this.ammo[this.selectedBullet].make(xStart, yStart, this.direction);
			if(this.heatGenerated + bullet.heat < this.heatTolerance && this.bulletTimer == this.bulletDelay) {
        		this.bullets.push(bullet);
        		this.heatGenerated = (this.heatGenerated + this.bullets[this.bullets.length-1].heat > this.heatTolerance) ?  
        			this.heatTolerance : 
        			this.heatGenerated + this.bullets[this.bullets.length-1].heat;
        		this.bulletTimer = 0;
        		fired = true;
        	}

        	return fired;
		},

		changeAmmo: function() {
			if(this.selectedBullet < this.ammo.length-1)
				this.selectedBullet++;
			else
				this.selectedBullet = 0;
		}
	}

	return gun;
}