var Main = Main || {};
 Main.GameOver = function(game)
 {
 	this.btn_startOver = null;

 	this.bg = null;
 	this.idPlayer = 2;
 };
 
 Main.GameOver.prototype.preload = function()
 {
 	this.game.load.image('btn_startOver', 'assets/controller/btn_add_action.png');
 	this.debugWesh();	
 };
 
 Main.GameOver.prototype.create = function()
 {

 	console.log(Main.BGS);
 	console.log(Main.playerID);

	 
 	var textGameOver = this.add.text(this.game.world.centerX, 200  , "Vous avez perdu!", Main.styleTextInfo);
 	textGameOver.anchor.set(0.5);
 
 	console.log(textGameOver);
 
 	var textReplay = this.add.text(this.game.world.centerX, 300, "voulez-vous rejouer ?", Main.styleTextInfo);
 	textReplay.anchor.set(0.5);
 
 	this.btn_startOver = this.game.add.sprite(this.game.world.centerX-150, 400, 'btn_startOver');
 //    this.btn_startOver.inputEnabled = true;
     this.btn_startOver.anchor.set(0.5);
 //    this.btn_startOver.events.onInputDown.add(this.startGame, this);

  	this.btn_startOver = this.game.add.sprite(this.game.world.centerX+150, 400, 'btn_startOver');
 //    this.btn_startOver.inputEnabled = true;
     this.btn_startOver.anchor.set(0.5);
 }

Main.GameOver.prototype.debugWesh = function()
{
	this.bg = this.add.sprite(0, 0, 'bg_play',this.idPlayer);
}
 