function Player(game,x,y,frame)
{
	//color : 0,1,2,3
	Phaser.Sprite.call(this, game, x, y, 'players', frame);
	this.hp = 3;
	this.actions = [];
	this.bonus = [3];
	this.device_id = null;
	this.number = null;
	this.base_pa = this.pa = 3;
	this.bonus = "normal";
	this.anchor.setTo(0.5, 0.5);

	//console.log(Main.Play.tilesList);
	
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.todo = function(action)
{
	if(action.type === "Move")
	{
		if(!checkHole(action.x,action.y))
		{
			this.move(action.x,action.y);
		}
	}

	if(action.type === "Spell")
	{

	}
}

Player.prototype.move = function(x,y)
{
	console.log(Main.Play.tilesList);
	var cellX = this.position.x/80;
	var cellY = this.position.y/80;

	Main.Play.tilesList[cellX+'_'+cellY].playerHere = false;
	Main.Play.tilesList[cellX+'_'+cellY].hp-= 1;

	console.log(Main.Play.tilesList);

	var newX = x * 80;
	var newY = y * 80;

	var tween = this.game.add.tween(this.position).to({x:newX,y:newY},1000, Phaser.Easing.Linear.None,true,0);
	tween.onComplete.addOnce(this.endTurn, this);
}

Player.prototype.checkHole = function(x,y)
{
	if(Main.Play.tilesList[x+'_'+y] === null)
	{
		return true
	}

	return false;
}

Player.prototype.checkPLayer = function(x,y)
{
	return Main.Play.tilesList[x+'_'+y].playerHere;
}

Player.prototype.checkBonus = function(x,y)
{
	return Main.Play.tilesList[x+'_'+y].bonus;
}

Player.prototype.endTurn = function()
{
	var cellX = this.position.x/80;
	var cellY = this.position.y/80;

	console.log(cellX);
	Main.Play.tilesList[cellX+'_'+cellY].playerHere = true;

	if(this.checkBonus(cellX,cellY))
	{
		takeBonus();
	}
}

Player.prototype.takeBonus = function()
{
	if(this.bonus.length < 3)
	{
		var randNum = Math.floor(Math.random() * ((Main.Play.bonusList.length-1) - 0)) + 0;
		var bonusRand = Main.Play.bonusList[randNum];
		this.bonus.push(bonusRand);
	}
}

