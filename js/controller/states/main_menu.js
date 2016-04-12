var Main = Main || {};
Main.MainMenu = function(game)
{
	this.btn_start = null;
};

Main.MainMenu.prototype.preload = function()
{
	this.game.load.image('btn_start', 'assets/controller/btn_start.png');
}

Main.MainMenu.prototype.create = function()
{
	this.btn_start = this.game.add.sprite(this.game.world.height/2+128, 256, 'btn_start');
    this.btn_start.inputEnabled = true;
    this.btn_start.anchor.set(0.5);
    this.btn_start.events.onInputDown.add(this.startGame, this);

    var that = this;
    Main.airconsole.onMessage = function(from, data) 
    {
        if(data.action == "Play")
        {
        	that.state.start('Play');
        }

    };
    
}

Main.MainMenu.prototype.update = function()
{
	
}

Main.MainMenu.prototype.startGame = function(sprite, pointer)
{
	Main.airconsole.message(AirConsole.SCREEN, {action: "Start"});
}

