var Main = Main || {};
Main.etatPlay = function(game)
{
	console.log("state Play");
	this.btn_finish = null;
};

Main.etatPlay.prototype.preload = function()
{
//	this.game.load.image('imgActionBackground', 'assets/controller/actionBackground.png');
//	this.game.load.image('imgPV', 'assets/controller/actionBackground.png');
//	this.game.load.image('btn_finish', 'assets/controller/btn_finish.png');
};

Main.etatPlay.prototype.create = function()
{
	var style = { font: "30px Arial", fill: "#ff0044", align: "center" };

	var text = this.add.text(0, 0, "PV :", style);

	

	console.log(this.game);

//	text.anchor.set(0.5);

//	this.btn_finish = this.game.add.sprite(this.game.world.height - 10, this.game.world.width - 50, 'btn_finish');
}