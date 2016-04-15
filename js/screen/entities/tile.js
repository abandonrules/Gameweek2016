function Tile(game, x, y, frame)
{
	Phaser.Sprite.call(this, game, x, y, 'tiles', frame);
	this.hp = frame;
	this.anchor.setTo(0.5, 0.5);
	this.playerHere = null;
	this.bonus = false;
	this.isDead = false;
	//console.log(Main);
}

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;

Tile.prototype.updateFrame = function()
{

}

Tile.prototype.update = function()
{
	if(this.hp >= 0)
	{
		this.frame = this.hp;
	}
	else if(!this.isDead)
	{
		this.isDead = true;
		var cellX = this.position.x / 80;
		var cellY = this.position.y / 80;
		Main.Play.tilesList[cellX+'_'+cellY] = null;
		this.animationFall();
	}
}

Tile.prototype.animationFall = function()
{
	var tween = this.game.add.tween(this.scale).to({x:0,y:0},1000, Phaser.Easing.Linear.None,true,0);
	tween.onComplete.addOnce(this.kill, this);
}
