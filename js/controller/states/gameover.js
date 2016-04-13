var Main = Main || {};
Main.GameOver = function(game)
{
	this.btn_startOver = null;
};

Main.GameOver.prototype.preload = function()
{
	this.game.load.image('btn_startOver', 'assets/controller/btn_add_action.png');
};

Main.GameOver.prototype.create = function()
{
	console.log("wesh wesh");

	console.log(Main.styleTextInfo);

	var textGameOver = this.add.text(this.game.world.centerX, 200  , "Vous avez perdu!", Main.styleTextInfo);
	textGameOver.anchor.set(0.5);

	console.log(textGameOver);

	var textReplay = this.add.text(this.game.world.centerX, 300, "voulez-vous rejouer ?", Main.styleTextInfo);
	textReplay.anchor.set(0.5);

	this.btn_startOver = this.game.add.sprite(this.game.world.centerX, 400, 'btn_startOver');
//    this.btn_startOver.inputEnabled = true;
    this.btn_startOver.anchor.set(0.5);
//    this.btn_startOver.events.onInputDown.add(this.startGame, this);
}
