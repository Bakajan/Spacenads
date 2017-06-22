function linePattern() {
	var pattern = {
		logic: function(ship) {
			if(ship.y + 2 > 800)
	            ship.dead = true;
	        else
	            ship.y = ship.y + 2;
		}
	}

	return pattern;
}