function bullet(xStart, yStart, direction = 0) {
	var bullet = {
		x: xStart,
		y: yStart,
		x2: 0,
		y2: 0,

		speed: 10,
		done: false,
		targetHit: false,
		down: direction,

		done1: false,
		done2: false,

		image: document.getElementsByClassName('shot'),
		animationTimer: 0,
		frame: 0,

		render: function(ctx) {
			if(!this.done) {
		        if(this.down)
		        {
		            ctx.translate(canvas.width, 0);
					ctx.scale(-1, 1);
		            ctx.drawImage(this.image[this.frame], this.x, this.y);
		        }
		        else
		            ctx.drawImage(this.image[this.frame], this.x, this.y);
	    	}
		},

		logic: function(targets) {
			// Only check if hasn't hit target //
			if(!this.done) {
				/// Check if target is hit //
				for(var i = 0; i != targets.length; i++) {
					var width = targets[i].image[targets[i].frame].width;
					var height = targets[i].image[targets[i].frame].height;

					if(this.y >= targets[i].y && this.y <= targets[i].y + width) {
	        			if(this.x >= targets[i].x && this.x <= targets[i].x + height) {
	        				targets[i].hit(1);
	        				console.log('hit');
	        				this.done = true;
	        			}
	        		}
				}

				// Move bullet //
				if(!this.down) // Moving up
		        {
		            if(this.y - this.speed <= 0)
		                this.done = true;
		            else
		                this.y = this.y - this.speed;
		        }
		        else
		        {
		            if(this.y + this.speed >= canvas.width)
		                this.done = true;
		            else
		                this.y = this.y + this.speed;
		        }
			}

			

	        if(this.animationTimer != 10) {
	            	this.animationTimer++;
            }
            else {
            	this.animationTimer = 0;
            	if(this.frame != this.image.length-1) {
            		this.frame++;
            	}
            	else
            		this.frame = 0;
            }
		}
	}

	return bullet;
}