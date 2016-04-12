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

Main.Preloader.prototype.create = function()
{
	this.state.start('MainMenu');
}

Main.Preloader.prototype.update = function()
{
	
}