var Main = Main || {};
Main.Preloader = function(game)
{
	
};

Main.Preloader.prototype.init = function()
{
	console.log("Preloader");

	var box = this.make.graphics(0, 0);
	box.lineStyle(8, 0xFF0000, 0.8);
	box.beginFill(0xFF700B, 1);
	box.drawRect(-50, -50, 100, 100);
	box.endFill();

	this.spinner = this.add.sprite(
		this.world.centerX,
		this.world.centerY,
		box.generateTexture()
	);
	this.spinner.anchor.set(0.5);
	var style = {
	font: "32px Arial",
	fill: "#ffffff",
	align: "center" };
	this.text = this.add.text(400, 300, "Loading: 0%", style);
	this.text.anchor.x = 0.5;

}

Main.Preloader.prototype.preload = function()
{
	this.game.load.spritesheet('button_valid', 'assets/controller/btn_valid.png', 128,128);
	this.game.load.spritesheet('bg_play','assets/controller/bg_play.png',800,600);
	this.game.load.spritesheet('btn_action','assets/controller/btn_action.png',128,128);
	this.game.load.spritesheet('btn_start','assets/controller/btn_start_2.png',200,100);
	this.game.load.spritesheet('btn_ready','assets/controller/btn_ready.png',200,100);
	this.game.load.spritesheet('btn_dir','assets/controller/btn_dir.png',128,128);
	
	this.game.load.image('bg_title', 'assets/controller/bg_title.jpg');
    this.game.load.image('bg_gameover', 'assets/controller/bg_gameover.jpg');
    
	//this.game.load.image('logo_gameweek', 'assets/screen/logo_gameweek.png');
}

Main.Preloader.prototype.fileLoaded = function(progress)
{
	this.text.text = "Loading: " + progress + "%";
}

Main.Preloader.prototype.loadUpdate = function()
{
	this.spinner.rotation += 0.05;
}


Main.Preloader.prototype.create = function()
{
	var that = this;
	var tween = this.add.tween(this.spinner.scale).to({ x: 0, y: 0 }, 1000, "Elastic.easeIn", true, 250);
	this.add.tween(this.text).to({ alpha: 0 }, 1000, "Linear", true);

	tween.onComplete.add(that.onStart, this);
}

Main.Preloader.prototype.onStart = function()
{
	this.state.start('MainMenu');
}
