var Main = Main || {};

Main.Gameover = function(game)
{
	this.btn_start = null;
	this.bg = null;
};

Main.Gameover.prototype.preload = function()
{
	this.game.load.image('btn_start', 'assets/controller/btn_start.png');
}

Main.Gameover.prototype.create = function()
{
	this.bg = this.game.add.sprite(0, 0, 'bg_gameover');

	this.btn_start = this.game.add.sprite(this.game.world.height/2+128, 256, 'btn_ready',0);
    this.btn_start.inputEnabled = true;
    this.btn_start.anchor.set(0.5);
    this.btn_start.events.onInputDown.add(this.startGame, this);

    var that = this;
    Main.airconsole.onMessage = function(from, data) 
    {
        //console.log(data);
        if(data.action == "Play")
        {
        	that.state.start('Play');
        }
    };
}

Main.Gameover.prototype.startGame = function(sprite, pointer)
{
	Main.airconsole.message(AirConsole.SCREEN, {action: "Start"});
}
