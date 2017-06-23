function leftRightPattern() {
	var pattern = {
		switchDirection: false,

		logic: function(ship) {
    		if(!this.switchDirection) {
                ship.right = true;
                ship.left = false;
                if(ship.x + ship.xspeed < canvas.width)
                    ship.x = ship.x + ship.xspeed;
                else
                    this.switchDirection = true;
            }
            else {
                ship.right = false;
                ship.left = true;
                if(ship.x - ship.xspeed > 0)
                    ship.x = ship.x - ship.xspeed;
                else
                    this.switchDirection = false;
            }
            if(ship.y + ship.yspeed > canvas.height)
                ship.dead = true;
            else
               ship.y += ship.yspeed;
	   }
	}
	return pattern;
}