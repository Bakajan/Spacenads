function leftRightPattern(left) {
	var pattern = {
		switchDirection: (left) ? false : true,

		logic: function(ship) {
    		if(!this.switchDirection) {
                ship.image = ship.left;
                if(ship.x + ship.xspeed < canvas.width) {
                    ship.x = ship.x + ship.xspeed;
                    if(ship.collisionCheck(actor)) {
                        actor.hit(ship.minHp);
                        ship.hit(ship.minHp);
                    }
                }
                else
                    this.switchDirection = true;
            }
            else {
                ship.image = ship.right;
                if(ship.x - ship.xspeed > 0) {
                    ship.x = ship.x - ship.xspeed;
                    if(ship.collisionCheck(actor)) {
                        actor.hit(ship.minHp);
                        ship.hit(ship.minHp);
                    }
                }
                else
                    this.switchDirection = false;
            }
            if(ship.y + ship.yspeed > canvas.height)
                ship.dead = true;
            else {
               ship.y += ship.yspeed;
               if(ship.collisionCheck(actor)) {
                    actor.hit(ship.minHp);
                    ship.hit(ship.minHp);
                }
            }
	   },
	}
	return pattern;
}