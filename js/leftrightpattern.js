function leftRightPattern() {
	var pattern = {
		switchDirection: false,

		logic: function(ship) {
		if(!this.switchDirection) {
            ship.right = true;
            ship.left = false;
            if(ship.x + ship.speed < canvas.width)
                ship.x = ship.x + ship.speed;
            else
                this.switchDirection = true;
        }
        else {
            ship.right = false;
            ship.left = true;
            if(ship.x - ship.speed > 0)
                ship.x = ship.x - ship.speed;
            else
                this.switchDirection = false;
        }
        if(ship.y + 1 > canvas.height)
            ship.dead = true;
        else
           ship.y += 1;
	   }
	}
	return pattern;
}