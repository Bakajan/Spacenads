function title(screenWidth, screenHeight) {
    var title = {
        width: screenWidth,
        height: screenHeight,
        titleFontSize: 2000,
        titleX: -360,
        titles: [],
        counter: 0,
        color: '',
        color2: '',
        colorCounter: 0,
        startCounter: 0,
        done: false,
        starting: false,
        fade: 255,
        isButtonPressed: false,

        logic: function() {

        },

        render: function(ctx) {
            if(this.counter == 5)
                this.titleFontSize = 200;
            // if(this.titleFontSize == 2000)
            //     Spacenads.titleSound.play();
            if(this.starting) {
                if(this.fade != 0)
                    this.fade = this.fade - 5;
                else
                    this.done = true;
            }
            if(this.counter > 0) {
                if(this.counter == 1)
                    this.color = 'red';
                else if(this.counter == 2)
                    this.color = 'blue';
                else if(this.counter == 3)
                    this.color = 'green';
                else if(this.counter == 4)
                    this.color = 'yellow';
                else if(this.counter == 5 && !this.starting) {
                    if(this.colorCounter != 8)
                        this.colorCounter++;
                    else
                    {
                        this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
                        this.colorCounter = 0;
                    }
                }
                else if(this.counter == 5 && this.starting)
                    this.color = 'rgba(255,255,255,' + this.fade + ')';

                if(this.counter == 5) ctx.clearRect(0, 0, this.width, this.height);
                ctx.fillStyle = this.color;
                ctx.font = 'bold 200px monospaced';
                ctx.fillText("Spacenads", 130, 300);
            }
            
            if(this.counter == 0)
                this.color = 'red';
            if(this.counter == 1)
                this.color = 'blue';
            if(this.counter == 2)
                this.color = 'green';
            if(this.counter == 3)
                this.color = 'yellow';
            if(this.counter == 4)
                this.color = 'magenta';
            
                
            ctx.fillStyle = this.color;
            if(this.titleFontSize != 200 && this.counter != 5)
            {
                ctx.shadowColor = "white";
                ctx.shadowOffsetX = 5; 
                ctx.shadowOffsetY = 5; 
                ctx.shadowBlur = 7;
                ctx.font = 'bold ' + this.titleFontSize  + 'px monospaced';
                ctx.fillText("Spacenads", this.titleX, 300);
                this.titleFontSize = this.titleFontSize - 40;
                this.titleX = this.titleX + 11;
            }
            else if(this.counter != 5)
            {
                this.titleFontSize = 2000;
                this.titleX = -360;
                this.counter++;
                ctx.clearRect(0, 0, this.width, this.height);
            }
            
            if(this.counter == 5)
            {
                if(this.startCounter != 10)
                    this.startCounter++;
                else
                    this.startCounter = 0;
                
                if(this.startCounter > 6 && !this.starting)
                {
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 40px monospaced';
                    ctx.fillText("Press Spacebar", 500, 500);
                }
                else if(this.starting)
                {
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 40px monospaced';
                    ctx.fillText("Press Spacebar", 500, 500);
                }
            }

            if(buttonsPressed) {
                if(buttonsPressed.includes(accept))
                {
                    if(!this.isButtonPressed && this.counter != 5 && !this.starting)
                    {
                        counter = 5;
                        this.isButtonPressed = true;
                    }
                    if(!this.isButtonPressed && this.counter == 5  && !this.starting)
                    {
                        this.starting = true;
                        //Spacenads.titleSound.play();
                        this.isButtonPressed = true;
                    }
                }
                else
                    this.isButtonPressed = false;
            }

            if(this.done) {
                ctx.shadowOffsetX = 0; 
                ctx.shadowOffsetY = 0; 
                ctx.shadowBlur = 0;
                screen = stage(this.width, this.height);
            }
        }
    }

    return title;
}