function vbullet(xStart, yStart, direction = 0) {
	var bullet = {
		x: xStart,
		y: yStart,
		x2: xStart,
		y2: yStart,

		speed: 10,
		done: false,
		targetHit: false,
		down: direction,

		done1: false,
		done2: false,

		imageLeft: document.getElementsByClassName('shotLeft'),
		imageRight: document.getElementsByClassName('shotRight'),
		animationTimer: 0,
		frame: 0,
		dead: false,
		dying: false,

		render: function(ctx) {
			if(!this.done2)
				ctx.drawImage(this.imageLeft[this.frame], this.x2, this.y2);
			if(!this.done1)
				ctx.drawImage(this.imageRight[this.frame], this.x, this.y);
		},

		logic: function(targets) {
			// Only check if hasn't hit target //
			if(!this.done) {
				/// Check if target is hit //
				for(var i = 0; i != targets.length; i++) {
					var bulletRight =  {x: this.x, y: this.y, width: this.getWidth(), height: this.getHeight()};
					if(targets[i].collisionCheck(this)) {
						if(!targets[i].dead && !targets[i].dying) {
							targets[i].hit(1);
		        			this.done1 = true;
	        			}
					}
				}
				for(var i = 0; i != targets.length; i++) {
					var bulletLeft =  {x: this.x2, y: this.y2, width: this.getWidth(), height: this.getHeight()};
					if(targets[i].collisionCheck(this)) {
						if(!targets[i].dead && !targets[i].dying) {
							targets[i].hit(1);
		        			this.done2 = true;
	        			}
					}
				}

				// Move bullet //
				if(!this.down) // Moving up
		        {
		            //////////////////////// Right Bullet ///////////////////////////////
		            if(this.y - this.speed <= 0)
		                this.done1 = true;
		            else
		                this.y = this.y - this.speed;
		            if(this.x + this.speed >= canvas.width)
		                this.done1 = true;
		            else
		                this.x = this.x + this.speed;
		            
		            //////////////////////// Left Bullet ///////////////////////////////
		            if(this.y2 - this.speed <= 0)
		                this.done2 = true;
		            else
		                this.y2 = this.y2 - this.speed;
		            if(this.x2 - this.speed <= 0)
		                this.done2 = true;
		            else
		                this.x2 = this.x2 - this.speed;
		        }
		        else
		        {
		            //////////////////////// Right Bullet ///////////////////////////////
		            if(this.y + this.speed >= canvas.width)
		                this.done1 = true;
		            else
		                this.y = this.y + this.speed;
		            if(this.x + this.speed >= canvas.height/2)
		                this.done1 = true;
		            else
		                this.x = this.x + this.speed;
		            
		            //////////////////////// Left Bullet ///////////////////////////////
		            if(this.y2 - this.speed >= 800)
		                this.done2 = true;
		            else
		                this.y2 = this.y2 - this.speed;
		            if(this.x2 - this.speed <= 0)
		                this.done2 = true;
		            else
		                this.x2 = this.x2 - this.speed;
		        }
		        
		        if(this.done1 && this.done2)
		            this.done = true;
			}
		},

		getWidth: function() {
	    	return this.imageLeft[this.frame].width;
	    },
	    getHeight: function() {
	    	return this.imageLeft[this.frame].height;
	    },
	}

	return bullet;
}