function Player(game,x,y,frame)
{
	//color : 0,1,2,3
	Phaser.Sprite.call(this, game, x, y, 'players', frame);
	this.hp = 3;
	this.actions = [];
	this.device_id = null;
	this.id = null;
	this.base_pa = this.pa = 3;
	this.bonus = "normal";
	this.anchor.setTo(0.5, 0.5);
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.todo = function(action)
{
	if(action.type === "Move")
	{

	}

	if(action.type === "Spell")
	{

	}
}

Player.prototype.move = function(dir)
{

}

Player.prototype.checkHole = function()
{

}

Player.prototype.checkPLayer = function()
{

}

