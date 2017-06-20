function stage(screenWidth, screenHeight) {
	var stage = {
        width: screenWidth,
        height: screenHeight,
        scrollY: 0,
		render: function(ctx) {
			ctx.clearRect(0, 0, this.width, this.height);

            // Draw parallex background //
            var img = document.getElementById("background");
            ctx.drawImage(img,  0, this.scrollY, this.width, this.height);
            ctx.drawImage(img, 0, this.scrollY + this.height, this.width, this.height);
            // var img = new Image();
            // img.onload = function () {
            //     ctx.drawImage(img,  0, this.scrollY, this.width, this.height);
            //     ctx.drawImage(img, 0, -this.height + this.scrollY, this.width, this.height);
            // }
            // img.src = "assests/images/spaceBackground.png ";
            
            
            // Draw enemies //
            // for(int i = 0; i != enemy.length; i++)
            // {
            //     Sprite target = null;
            //     if(enemy[i] != null)
            //     {
            //         target = enemy[i];
            //         if(!waveCleared)
            //             enemy[i].render(g, ship);
            //     }
                
                actor.render(ctx);
            // }
            
            // Game over //
            // if(ship.dead)
            // {
            //     ctx.setColor(Color.WHITE);
            //     ctx.setFont(new Font("Monospaced", Font.BOLD, gameOverFontSize));
            //     ctx.drawString("Game Over", 640 - 80, 400 - 25);
            //     ctx.drawString("Hit Escape", 640 - 85, 400);
            //     if(gameOverFontSize != 20)
            //         gameOverFontSize = gameOverFontSize - 5;
            // }
            
            // Draw Life/stamina bars //
            var result = actor.minHp / actor.maxHp;
            var barLine = 25 + (500 * result);
            var barY =(this.height-120) + (50 * result);
            
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.moveTo(25, this.height-20);
            ctx.lineTo(25, this.height-120);
            ctx.lineTo(barLine, barY);
            ctx.lineTo(barLine, this.height-20);
            ctx.closePath();
            ctx.fill();

            var grd=ctx.createLinearGradient(0,0,170,0);
            grd.addColorStop(0,"gray");
            grd.addColorStop(1,"lightgray");
            ctx.strokeStyle = grd;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(25, this.height-20);
            ctx.lineTo(25, this.height-120);
            ctx.lineTo(525, this.height-70);
            ctx.lineTo(525, this.height-20);
            ctx.closePath();
            ctx.stroke();
            ctx.lineWidth = 1;
            
            // Draw stamina bar //
            result = actor.gun.heatGenerated / actor.gun.heatTolerance;
            barLine = 1225 - (500 * result);
            barY = (this.height-120) + (50 * result);
              
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(1225, this.height-20);
            ctx.lineTo(1225, this.height-120);
            ctx.lineTo(barLine, barY);
            ctx.lineTo(barLine, this.height-20);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = 'gray';
            ctx.beginPath();
            ctx.moveTo(725, this.height-20);
            ctx.lineTo(725, this.height-70);
            ctx.lineTo(1225, this.height-120);
            ctx.lineTo(1225, this.height-20);
            ctx.closePath();
            ctx.stroke();
            
            // Draw Score
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px monospaced';
            ctx.fillText("Score", 600, this.height-55);
            ctx.fillText(actor.score, 600, this.height-20);

            // Menu Filling //
            var x = 550;
            var y = this.height-130;
            var width = 50;
            var height = 50;
            

            // if(ship.selectedGun == 0)
            //     ctx.setColor(Color.BLUE);
            // else
            //     ctx.setColor(Color.BLACK);
            
            ctx.fillStyle = 'white';
            ctx.fillRect(x, y, width, height);
            //ctx.drawImage(ship.guns[0].icon, x, y, null);
             // Menu Border //
            ctx.fillStyle = 'rgb((116, 116, 116)';
            ctx.lineWidth = 6;
            roundRect(ctx, x, y, width, height, 8);
            ctx.fillStyle = 'white';
            ctx.lineWidth = 3;
            roundRect(ctx, x - 2, y - 1, width + 3, height, 8);
            
            // if(ship.selectedGun == 1)
            //     ctx.setColor(Color.BLUE);
            // else
            //     ctx.setColor(Color.BLACK);
            
            ctx.fillRect(x + 100, y, width, height);
            //ctx.drawImage(ship.guns[1].icon, x + 100, y, null);
            ctx.fillStyle = 'rgb((116, 116, 116)'; // Menu Border //
            ctx.lineWidth = 6;
            roundRect(ctx, x + 100, y, width, height, 8);
            ctx.fillStyle = 'white';
            ctx.lineWidth = 3;
            roundRect(ctx, x - 2 + 100, y - 1, width + 3, height, 8);
            
            // Stage Completed //
            // if(waveCleared)
            // {
            //     ctx.setColor(Color.BLUE);
            //     ctx.fillRect(415, 180, 400, 400);
            //     ctx.setColor(Color.WHITE);
            //     ctx.drawRect(415, 180, 400, 400);
                
            //     double div1 = minHp;
            //     double div2 = maxHp;
            //     double results = (div1 / div2) * 100;
            //     double lifeScore = (results / 100) * 1000;
                
            //     double acc1 = ship.hits;
            //     double acc2 = ship.shots;
            //     double accuracy = (acc1 / acc2) * 100;
            //     double accResult = (accuracy / 100) * 1000;
                
            //     ctx.drawString("Stage Cleared!", 550, 225);
            //     ctx.drawString("Base Score ", 440, 275); ctx.drawString(": " + baseScore, 575, 275);
            //     ctx.drawString("Enemy Kills", 440, 300); ctx.drawString(": " + ship.kills + " X 66 = " + ship.kills * 66, 575, 300);
            //     ctx.drawString("Accuracy ", 440, 325); ctx.drawString(": " + (int)accuracy + "% / 1000 = " + (int)accResult, 575, 325);
            //     ctx.drawString("Life left ", 440, 350); ctx.drawString(": " + (int)results + "% / 1000 = " + (int)lifeScore, 575, 350);
            //     ctx.drawString("Times Died ", 440, 375); ctx.drawString(": " + ship.deaths + " / -1000 = " + ship.deaths * -1000, 575, 375);
                
            //     int finalScore = baseScore + (ship.kills * 66) + (int)(accResult) + (int)lifeScore + (ship.deaths * -1000);
            //     ctx.drawString("Final Score ", 440, 550); ctx.drawString(": " + finalScore, 585, 550);
            // }
        },

        logic: function() {
            if(this.scrollY != -this.height)
                this.scrollY--;
            else
                this.scrollY = 0;

            actor.logic();
        }
    }

    return stage;
}