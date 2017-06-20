function actor(xStart, yStart) {
	var idle = document.getElementsByClassName('actorIdle');
	var left = document.getElementsByClassName('actorLeft');
	var right = document.getElementsByClassName('actorRight');

	var actor = {
		x: xStart,
	    y: yStart,
	    width: 0,
	    height: 0,
	    speed: 10,
	    minHp: 10,
	    maxHp: 10,
	    minHeat: 0,
	    maxHeat: 100,
	    
	    hit: false,
	    dead: false,
	    dying: false,
	    score: 0,
	    gun: [],
	    guns:[],
	    selectedGun: 0,
	    deaths: 0,

		bulletDelay: 0,
	    deathAnimationCounter: 0,
	    heatTimer: 0,
		animationTimer:0,
		bullets: [],
	    inventory: [],
	    image: idle,
	    shots: 0,
	    hits: 0,
	    kills: 0,
		buttonPress: false,
		frame: 0,

		gun: gun(),

		render: function(ctx, target) {
	        if(!this.dead && !this.dying) {
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

	            if(buttonsPressed.reverse().includes(leftButton)) {
	            	this.image = left;
	            	if(this.x - this.speed > 0)
	                    this.x = this.x - this.speed;
	            }
	            else if(buttonsPressed.reverse().includes(rightButton)) {
	            	this.image = right;
	            	if(this.x + this.image[this.frame].width + this.speed < canvas.width)
	                    this.x = this.x + this.speed;
	            }
	            if(!buttonsPressed.includes(leftButton) && !buttonsPressed.includes(rightButton)){
	            	this.image = idle;
	            }

	            if(buttonsPressed.includes(fireButton)) {
	            	this.gun.fireBullet(this.x + (this.image[this.frame].width / 2), this.y);
	            }

	            ctx.drawImage(this.image[this.frame], this.x, this.y);
	        }
	        else if(dying && !dead)
	        {
	            // ctx.fillRect(x + (getWidth() / 2) - 5 - deathAnimationCounter, y + (getHeight() / 2), 5, 2); // Left Line
	            // ctx.fillRect(x + (getWidth() / 2) + 5 + deathAnimationCounter, y + (getHeight() / 2), 5, 2); // Right Line
	            // ctx.fillRect(x + (getWidth() / 2), y + (getHeight() / 2) - 5 - deathAnimationCounter, 5, 2); // Top Line
	            // ctx.fillRect(x + (getWidth() / 2), y + (getHeight() / 2) + 5 + deathAnimationCounter, 5, 2); // Bottom Line
	        }

	        if(this.gun) this.gun.render(ctx);
        
	        // for(var i = 0; i != bullets.length; i++)
	        // {
	        //     if(bullets[i] != null)
	        //     {
	        //         if(target != null)
	        //             if(!target.dying && !target.dead)
	        //             {
	        //                 if(bullets[i].collided(target))
	        //                 {
	        //                     bullets[i].done = true;
	        //                     target.hit = true;
	        //                     target.minHp = target.minHp - 1;
	        //                     hits++;
	        //                     if(target.minHp <= 0)
	        //                     {
	        //                         target.minHp = 0;
	        //                         if(minHeat + 10 > maxHeat)
	        //                             minHeat = maxHeat;
	        //                         else
	        //                             minHeat = minHeat + 10;
	        //                         kills++;
	        //                     }
	        //                     Spacenads.explosion.play();
	        //                 }
	        //             }
	                
	        //         bullets[i].render(g);
	                
	        //     }
	        // }
    	},
    
	    logic: function() {
	        // for(var i = 0; i != bullets.length; i++)
	        // {
	        //     if(bullets[i] != null)
	        //     {
	        //         bullets[i].logic();
	        //         if(bullets[i].done)
	        //             bullets[i] = null;
	        //     }
	        // }
	        // if(bulletDelay > 0)
	        //     bulletDelay--;
	        
	        // if(animationTimer == 10)
	        //     animationTimer = 0;
	        // else 
	        //     animationTimer++;
	        
	        // if(!dead && !dying)
	        // {
	        //     if(Spacenads.LEFT)
	        //     {
	        //         if(x - speed > 0)
	        //             x= x - speed;
	        //     }
	        //     if(Spacenads.RIGHT)
	        //     {
	        //         if(x + getWidth() + speed < 1280)
	        //             x= x + speed;
	        //     }
	        //     if(Spacenads.ACCEPT)
	        //     {
	        //         if(bulletDelay == 0)
	        //         {
	        //             if(minHeat > 5)
	        //             {
	        //                 shoot();
	        //                 minHeat = minHeat - 5;
	        //             }
	        //         }
	        //     }
	        //     if(Spacenads.TAB)
	        //     {
	        //         if(selectedGun == 0 && !buttonPress)
	        //         {
	        //             selectedGun = 1;
	        //             buttonPress = true;
	        //         }
	        //         else if(selectedGun == 1 && !buttonPress)
	        //         {
	        //             selectedGun = 0;
	        //             buttonPress = true;
	        //         }
	        //     }
	        //     else
	        //         buttonPress = false;
	            
	        //     if(minHp <= 0)
	        //         dying = true;
	            
	        //     if(heatTimer == 16)
	        //     {
	        //         heatTimer = 0;
	        //         if(minHeat != maxHeat)
	        //             minHeat++;
	        //     }
	        //     else
	        //         heatTimer++;
	        // }
	        // if(dying)
	        // {
	        //     if(deathAnimationCounter != 16)
	        //         deathAnimationCounter++;
	        //     else
	        //         dead = true;
	        // }
	    }
    }

    return actor;
}

actor = actor(65, window.innerHeight - 200);