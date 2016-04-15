function Player(game,x,y,frame,score)
{
	//color : 0,1,2,3
	Phaser.Sprite.call(this, game, x, y, 'players', frame);
	this.hp = 3;
	this.actions = new Array();
	this.bonus = new Array();
	this.device_id = null;
	this.number = null;
	this.base_pa = this.pa = 3;
	this.state = "normal";
	this.anchor.setTo(0.5, 0.5);
	this.score = score || 0;
	this.isDead = false;
	//console.log(Main.Play.tilesList);
	this.signal = new Phaser.Signal();
	//console.log(this.signal);
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.todo = function(action)
{
	var oldCellX = this.position.x/80;
	var oldCellY = this.position.y/80;

	//ajout de la direction
	var newCellX = oldCellX + (action.x);
	var newCellY = oldCellY + (action.y);

	//corriger le bug de sortie d'arrene


	if(Main.Play.tilesList[newCellX+'_'+newCellY] !== undefined)
	{
		//RANGE 1
		if(action.type === 1)
		{	
			//MOVE
			if(!this.checkHole(newCellX,newCellY) && action.id_action === 5)
			{
				if(this.checkPLayer(newCellX,newCellY))
				{
					
					this.pushPlayer(newCellX,newCellY,oldCellX,oldCellY);
				}
				else
				{
					this.move(newCellX,newCellY,oldCellX,oldCellY);
				}
			}
			else if(!this.checkHole(newCellX,newCellY) && action.id_action === 2) //attack
			{
				this.attackPlayer(newCellX,newCellY);
			}
			else
			{
				this.endTurn();
			}
		}

		//RANGE 3
		if(action.type === 2)
		{
			//this.attackPlayer(cellX,cellY);
			this.endTurn();
		}
	}	
}

Player.prototype.move = function(cellX,cellY,oldX,oldY)
{
	Main.Play.tilesList[oldX+'_'+oldY].playerHere = null;
	Main.Play.tilesList[oldX+'_'+oldY].hp-= 1;

	var newX = cellX * 80;
	var newY = cellY * 80;

	//console.log("Player Move");
	//console.log(newX +'_'+newY);

	var tween = this.game.add.tween(this.position).to({x:newX,y:newY},1000, Phaser.Easing.Linear.None,true,0);
	tween.onComplete.addOnce(function(){this.endTurn(cellX,cellY)}, this);
}

Player.prototype.pushPlayer = function(cellX,cellY,oldX,oldY)
{
	console.log('pushPlayer');

	var newX = cellX * 80;
	var newY = cellY * 80;

	var number_other_player = Main.Play.tilesList[cellX+'_'+cellY].playerHere;
	var canMove = false;

	console.log(cellX+'_'+cellY);
	var dirX = oldX - cellX;
	var dirY = oldY - cellY;

	var newCellX_OtherPlayer = cellX;
	var newCellY_OtherPlayer = cellY;

	console.log("direction");
	console.log(dirX+'_'+dirY);

	if(dirX === 1)
	{
		console.log('right');
		if(cellX-1 < 10)
		{
			//Main.players[''+ number_other_player].move(cellX-1,cellY,cellX,cellY);
			newCellX_OtherPlayer -=1;
			canMove = true;
		}
			
	}
	else if(dirX === -1)
	{
		console.log('left');
		if(cellX+1 >= 0)
		{
			//ain.players[''+ number_other_player].move(cellX+1,cellY,cellX,cellY);
			newCellX_OtherPlayer +=1;
			canMove = true;
		}
		
	}
	else if(dirY === 1)
	{
		console.log('down');
		if(cellY-1 < 10)
		{
			//Main.players[''+ number_other_player].move(cellX,cellY-1,cellX,cellY);
			newCellY_OtherPlayer -= 1;
			canMove = true;
		}
		
	}
	else if(dirY === -1)
	{
		console.log('up');
		if(cellY +1 >= 0)
		{
			//Main.players[''+ number_other_player].move(cellX,cellY+1,cellX,cellY);
			newCellY_OtherPlayer += 1;
			canMove = true;
		}
	}

	if(canMove)
	{
		Main.Play.tilesList[cellX+'_'+cellY].playerHere = null;
		Main.Play.tilesList[cellX+'_'+cellY].hp-= 1;

		var newX = newCellX_OtherPlayer * 80;
		var newY = newCellY_OtherPlayer * 80;

		var tween = this.game.add.tween(Main.players[''+ number_other_player].position).to({x:newX,y:newY},500, Phaser.Easing.Linear.None,true,0);
		tween.onComplete.addOnce(function(){this.endPushPlayer(cellX,cellY,oldX,oldY,newCellX_OtherPlayer,newCellY_OtherPlayer,number_other_player)}, this);

		//this.move(cellX,cellY,oldX,oldY);
	}
	else
	{
		this.endTurn();
	}
}

Player.prototype.endPushPlayer = function(cellX,cellY,oldX,oldY,newCellX_OtherPlayer,newCellY_OtherPlayer,number_other_player)
{
	if(this.checkDead(newCellX_OtherPlayer,newCellY_OtherPlayer))
	{
		Main.players[''+ number_other_player].dead();
	}
	else
	{
		Main.Play.tilesList[newCellX_OtherPlayer+'_'+newCellY_OtherPlayer].playerHere = number_other_player;
	}

	if(!this.checkHole(cellX,cellY))
	{
		this.move(cellX,cellY,oldX,oldY);
	}
	else
	{
		this.endTurn();
	}
	
}

Player.prototype.attackPlayer = function(cellX,cellY)
{
	var oldCellX = this.position.x/80;
	var oldCellY = this.position.y/80;

	var newX = cellX * 80;
	var newY = cellY * 80;

	if(this.checkPLayer(cellX,cellY))
	{
		//lancer l'animation
		//animation
		var tween = this.game.add.tween(this.position).to({x:newX,y:newY},200, Phaser.Easing.Linear.None,true,0);
		tween.onComplete.addOnce(function(){this.endAttackPlayer(cellX,cellY,oldCellX,oldCellY);}, this);
	}
	else
	{
		this.endTurn();
	}
	
	
}

Player.prototype.endAttackPlayer = function(cellX,cellY,oldCellX,oldCellY)
{
	
	var number_other_player = Main.Play.tilesList[cellX+'_'+cellY].playerHere;
	Main.players[''+ number_other_player].takeDamage();
	
	var newX = oldCellX * 80;
	var newY = oldCellY * 80;

	var tween = this.game.add.tween(this.position).to({x:newX,y:newY},200, Phaser.Easing.Linear.None,true,0);
	tween.onComplete.addOnce(this.endTurn, this);
}

Player.prototype.takeDamage = function()
{
	this.hp--;
	if(this.hp <= 0)
	{
		this.dead();
	}
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
	if(Main.Play.tilesList[x+'_'+y].playerHere !== null)
	{
		return true;
	}
	return false;
}

Player.prototype.checkBonus = function(x,y)
{
	return Main.Play.tilesList[x+'_'+y].bonus;
}

Player.prototype.checkDead = function(cellX,cellY)
{
	if(Main.Play.tilesList[cellX+'_'+cellY] === null)
	{
		return true;
	}
	else if(this.hp <= 0)
	{
		return true;
	}

	return false;
}

Player.prototype.endTurn = function()
{
	console.log('endTurn player');

	var cellX = this.position.x/80;
	var cellY = this.position.y/80;

	if(this.checkDead(cellX,cellY))
	{
		this.dead();
	}
	else
	{
		Main.Play.tilesList[cellX+'_'+cellY].playerHere = this.number;
	}

	/*
	if(this.checkBonus(cellX,cellY))
	{
		takeBonus();
	}
	*/

	Main.isReady = true;
}

Player.prototype.dead = function()
{
	this.isDead = true;
	this.kill();

	console.log(this.number);
	var player_deviceID = Main.airconsole.convertPlayerNumberToDeviceId(this.number);
	Main.airconsole.message(player_deviceID, {action : "game_over"});
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

Player.prototype.reset = function()
{
	switch(this.state)
	{
		case "normal":
			this.pa = this.base_pa;
			break;

		case "pa-1":
			this.pa = 2;
			break;

		case "pa-2":
			this.pa = 1;
			break;

		case "pa-3":
			this.pa = 0;
			break;
	}

	this.state = "normal";
}
