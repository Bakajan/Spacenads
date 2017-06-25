function linePattern() {
	var pattern = {
		logic: function(ship) {
			if(ship.y + ship.yspeed > canvas.height)
	            ship.dead = true;
	        else {
	            ship.y = ship.y + ship.yspeed;
	            if(ship.collisionCheck(actor)) {
	            	actor.hit(ship.minHp);
	            	ship.hit(ship.minHp);
	            }
	        }
		}
	}

	return pattern;
}