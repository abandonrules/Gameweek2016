var Main = Main || {};
Main.Preloader = function(game)
{
	this.spinner = null;
	this.text = null;
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
	this.text = this.add.text(960, 540, "Loading: 0%", style);
	this.text.anchor.x = 0.5;

}

Main.Preloader.prototype.preload = function()
{
	
    //this.game.load.spritesheet('dude', 'assets/screen/dude.png', 32, 48);
    this.game.load.image('tileset', 'assets/screen/tileset.png');
    this.game.load.tilemap('map', 'assets/screen/Map_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.spritesheet('tiles', 'assets/screen/tiles.png', 80, 80);
    this.game.load.spritesheet('players', 'assets/screen/players.png', 80, 80);
    this.game.load.image('bg', 'assets/screen/bg.jpg');

    this.load.onFileComplete.add(this.fileLoaded, this);
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
	//this.state.start('MainMenu');
	this.state.start('Play');
}