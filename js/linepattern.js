function linePattern() {
	var pattern = {
		logic: function(ship) {
			if(ship.y + ship.yspeed > 800)
	            ship.dead = true;
	        else
	            ship.y = ship.y + ship.yspeed;
		}
	}

	return pattern;
}