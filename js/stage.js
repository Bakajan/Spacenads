function stage(screenWidth, screenHeight) {
	var stage = {
        width: screenWidth,
        height: screenHeight,
        scrollY: 0,
        enemies: [
            enemy(roll(0, canvas.width - 100), roll(0, -200),linePattern(), 'fred'), 
            enemy(roll(0, canvas.width - 100), roll(0, -200),leftRightPattern(false), 'flintstone')
        ],

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
            if(this.enemies.length == 0) {
                var test = 4;
                for(var i = 0; i != test; i++) {
                    if(i%2 == 0)
                        this.enemies.push(enemy(roll(0, canvas.width - 100), roll(0, -200),linePattern(), 'fred'));
                    else
                         this.enemies.push(enemy(roll(0, canvas.width - 100), roll(0, -200),leftRightPattern(), 'flintstone'));
                }
            }
            this.enemies.forEach(function(enemy, index, array) {
                if(enemy.dead) array.splice(index, 1);
                enemy.logic();
                enemy.render(ctx);
            });
            
            actor.render(ctx);
            ctx.fillStyle = 'white';
            ctx.fillText("Shots:" + actor.shots, 0, 25);
            ctx.fillText("hits:" + actor.hits, 0, 50);
            ctx.fillText("Kills:" + actor.kills, 0, 75);

            this.UIrender(ctx);

            // Game over //
            if(actor.dead)
            {
                ctx.fillStyle = 'blue';
                ctx.fillRect(415, 180, 400, 400);
                ctx.fillStyle = 'white';
                ctx.strokeRect(415, 180, 400, 400);
                
                var div1 = actor.minHp;
                var div2 = actor.maxHp;
                var results = (div1 / div2) * 100;
                var lifeScore = (results / 100) * 1000;
                
                var acc1 = actor.hits;
                var acc2 = actor.shots;
                var accuracy = (isNaN(acc1/acc2)) ? 0 : (acc1 / acc2) * 100;
                var accResult = (isNaN(accuracy)) ? 0 : (accuracy / 100) * 1000;
                
                ctx.fillText("Stage Cleared!", 550, 225);
                ctx.fillText("Base Score ", 440, 275); ctx.fillText(": " + actor.score, 575, 275);
                ctx.fillText("Enemy Kills", 440, 300); ctx.fillText(": " + actor.kills + " X 66 = " + actor.kills * 66, 575, 300);
                ctx.fillText("Accuracy ", 440, 325); ctx.fillText(": " + parseInt(accuracy) + "% / 1000 = " + parseInt(accResult), 575, 325);
                //ctx.fillText("Life left ", 440, 350); ctx.fillText(": " + parseInt(results) + "% / 1000 = " + parseInt(lifeScore), 575, 350);
                //ctx.drawString("Times Died ", 440, 375); ctx.drawString(": " + ship.deaths + " / -1000 = " + ship.deaths * -1000, 575, 375);
                
                //var finalScore = baseScore + (ship.kills * 66) + (int)(accResult) + (int)lifeScore + (ship.deaths * -1000);
                var finalScore = actor.score + (actor.kills * 66) + parseInt(accResult);
                ctx.fillText("Final Score ", 440, 550); ctx.fillText(": " + finalScore, 585, 550);

                ctx.fillStyle = 'white';
                ctx.font = 'bold ' + this.gameOverFontSize + 'px monospaced';
                ctx.fillText("Game Over", 640 - 80, 150 - 25);
                ctx.fillText("Hit Escape", 640 - 85, 150);
                if(this.gameOverFontSize != 20)
                    this.gameOverFontSize = this.gameOverFontSize - 5;
            }
        },

        logic: function() {
            if(this.scrollY != -this.height)
                this.scrollY--;
            else
                this.scrollY = 0;

            actor.logic();
        },

        UIrender: function(ctx) {
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

            // Selected ammo //
            // base coords //
            var x = 550;
            var y = this.height-130;
            var width = 50;
            var height = 50;

            if(actor.gun.selectedBullet == 0)
                 ctx.fillStyle = 'blue';
            else
                ctx.fillStyle = 'black';

            // X Space between icons //
            var iconXOffset = 100;
            for(var i = 0; i != actor.gun.ammo.length; i++) {
                // Highlight selected ammo //
                if(actor.gun.selectedBullet == i)
                    ctx.fillStyle = 'blue';
                else 
                    ctx.fillStyle = 'black';
                ctx.fillRect(x + (iconXOffset * i), y, width, height);

                // Draw ammo icon //
                ctx.drawImage(actor.gun.ammo[i].icon, x + (iconXOffset * i), y);

                 // Menu Border //
                ctx.fillStyle = 'rgb((116, 116, 116)';
                ctx.lineWidth = 6;
                roundRect(ctx, x, y, width, height, 8);
                ctx.fillStyle = 'white';
                ctx.lineWidth = 3;
                roundRect(ctx, x - 2 + (iconXOffset * i), y - 1, width + 3, height, 8);
            }
        }
    }

    return stage;
}