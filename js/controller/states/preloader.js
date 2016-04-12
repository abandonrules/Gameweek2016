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
	this.game.load.image('arrow_up', 'assets/controller/arrow_up.png');
    this.game.load.image('arrow_down', 'assets/controller/arrow_down.png');
    this.game.load.image('arrow_left', 'assets/controller/arrow_left.png');
    this.game.load.image('arrow_right', 'assets/controller/arrow_right.png');

    //this.load.atlas('generic', 'assets/controller/generic-joystick.png', 'assets/controller/generic-joystick.json');
    this.load.atlas('dpad', 'assets/controller/dpad.png', 'assets/controller/dpad.json');
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
