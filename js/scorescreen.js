function scoreScreen() {
	var screen = {
		highscores: '',
		logic: function() {
			if(buttonsPressed.includes(27)) {
	            location.reload(true);
        	}
		},

		render: function(ctx) {
			if(screen.highscores == '') {
				screen.highscores == 'loading';
				call('routes/scoring.php',
	                {action: 'get'},
	                function(data) {
	                    console.log('Get top scores');
	                    screen.highscores = JSON.parse(data.target.response);
	                    // Base Box coords //
			            var x = 415;
			            var y = 180;
			            var width = 400;
			            var height = 400;

			            ctx.fillStyle = 'blue';
			            ctx.fillRect(x, y, width, height);
			            ctx.fillStyle = 'white';
			            ctx.strokeRect(x, y, width, height);

			            var title = "High Scores";
			            var size = ctx.measureText(title).width; 
			            var center = (width / 2) - (size / 2);
			            var leftCol = x + 25;
			            var rightCol = x + 160
			            ctx.fillText(title, parseInt(x + center), y + 45);

			            ctx.fillText("Initials", leftCol, y + 95);
			            ctx.fillText("Scores", rightCol, y + 95);
			            ctx.fillText("Date", rightCol + 135, y + 95);

			            if(screen.highscores) {
			                for(var i = 0; i != screen.highscores.length; i++) {
			                    ctx.fillText(screen.highscores[i].initials, leftCol, y + 120 + (i * 25));
			                    ctx.fillText(screen.highscores[i].score, rightCol, y + 120 + (i * 25));
			                    ctx.fillText(screen.highscores[i].date, rightCol + 135, y + 120 + (i * 25));
			                }
			            }
	                },
	                function(xhr) {
	                    console.log('error 2');
	                }
	            );
			}
		}
	}

	return screen;
}