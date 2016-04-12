var Main = Main || {};
Main.Play = function(game)
{
	//this.airconsole     = null;

    this.arrow_up       = null;
    this.arrow_down     = null;
    this.arrow_left     = null;
    this.arrow_right    = null;

    this.pad            = null;
    this.stick          = null;
};

Main.Play.prototype.preload = function()
{
	
}

Main.Play.prototype.create = function()
{
	console.log("Play");
    //this.airconsole = new AirConsole({"orientation": "landscape"});
    this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

    /*
    this.arrow_up = this.game.add.sprite(this.game.world.height/2+128, 128, 'arrow_up');
    this.arrow_up.inputEnabled = true;
    this.arrow_up.anchor.set(0.5);
    this.arrow_up.events.onInputOver.add(this.onUp, this);

    this.arrow_down = this.game.add.sprite(this.game.world.height/2+128, 384, 'arrow_down');
    this.arrow_down.inputEnabled = true;
    this.arrow_down.anchor.set(0.5);
    this.arrow_down.events.onInputOver.add(this.onDown, this);

    this.arrow_left = this.game.add.sprite(256, 256, 'arrow_left');
    this.arrow_left.inputEnabled = true;
    this.arrow_left.anchor.set(0.5);
    this.arrow_left.events.onInputOver.add(this.onLeft, this);

    this.arrow_right = this.game.add.sprite(this.game.world.height, 256, 'arrow_right');
    this.arrow_right.inputEnabled = true;
    this.arrow_right.anchor.set(0.5);
    this.arrow_right.events.onInputOver.add(this.onRight, this);
    */
    /*
    this.arrow_up = this.pad.addButton(this.game.world.height/2+128, 128, 'generic', 'button1-up', 'button1-down');
    this.arrow_up.repeatRate = 100;
    this.arrow_up.onDown.add(this.onUp, this);

    this.arrow_up = this.pad.addButton(this.game.world.height/2+128, 128, 'generic', 'button1-up', 'button1-down');
    this.arrow_up.repeatRate = 100;
    this.arrow_up.onDown.add(this.onUp, this);

    this.arrow_up = this.pad.addButton(this.game.world.height/2+128, 128, 'generic', 'button1-up', 'button1-down');
    this.arrow_up.repeatRate = 100;
    this.arrow_up.onDown.add(this.onUp, this);

    this.arrow_up = this.pad.addButton(this.game.world.height/2+128, 128, 'generic', 'button1-up', 'button1-down');
    this.arrow_up.repeatRate = 100;
    this.arrow_up.onDown.add(this.onUp, this);
    */

    this.stick = this.pad.addDPad(this.game.world.height/2+100, this.game.world.width/2-100, 200, 'dpad');
}

Main.Play.prototype.update = function()
{
	if(this.stick.isDown)
    {
        if (this.stick.direction === Phaser.LEFT)
        {
           this.move("left");
        }
        else if (this.stick.direction === Phaser.RIGHT)
        {
            this.move("right");
        }
        else if (this.stick.direction === Phaser.UP)
        {
           this.move("up");
        }
    }
    else
    {
        this.move("stop");
    }
}

Main.Play.prototype.quitGame = function()
{
	
}

Main.Play.prototype.onUp = function(sprite, pointer)
{
    console.log("this.arrow_up");
    this.move("up");
}

Main.Play.prototype.onDown = function(sprite, pointer)
{
    console.log("this.arrow_down");
    this.move("down");
}

Main.Play.prototype.onLeft = function(sprite, pointer)
{
    console.log("this.arrow_left");
    this.move("left");
}

Main.Play.prototype.onRight = function(sprite, pointer)
{
    console.log("this.arrow_right");
    this.move("right");
}

Main.Play.prototype.move = function(direction)
{
    Main.airconsole.message(AirConsole.SCREEN, {dir: direction})
}
