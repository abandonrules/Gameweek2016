var Main = Main || {};
Main.etatPlay = function(game)
{
	console.log("state Play");
	this.btn_finish = null;
	this.bg1 = null;
	this.bg2 = null;
	this.bg3 = null;
	this.bg4 = null;
};

Main.etatPlay.prototype.preload = function()
{

};

Main.etatPlay.prototype.create = function()
{
	this.bg1 = this.game.add.sprite(0,0, 'imgBackgroundBlue');
	this.bg2 = this.game.add.sprite(0,600, 'imgBackgroundBlue');
	this.bg3 = this.game.add.sprite(0,1200, 'imgBackgroundBlue');
	this.bg3 = this.game.add.sprite(0,1800, 'imgBackgroundBlue');

	this.ecran1();

	this.ecran2();

	this.ecran3Mvt();

	this.ecran3Sort();
};



Main.etatPlay.prototype.ecran1 = function()
{
	var width = 800;
	var height = 600;


	var textInfo = this.add.text(width/2, height/4, "Choisis tes actions pour ce tour", Main.styleTextInfo);
	textInfo.anchor.set(0.5);

	var nbActions = 3;
	var nbButtonsAction = 0;

	for(i=0; i < 2; i++)
	{
		for(j = 0; j < 3; j++)
		{

			if(i==0)
				decalage = 150;
			else 
				decalage = 75;

			if(nbButtonsAction < nbActions)
			{
				var img = this.game.add.sprite(width/2 - decalage + (j*decalage) , height/2 + i * 150, 'btn_add_action');
    			img.inputEnabled = true;
    			img.events.onInputDown.add(this.choixAction, this);
    			img.anchor.set(0.5);
    			nbButtonsAction ++;
			}
			else if(nbButtonsAction<4)
			{
				var img = this.game.add.sprite(width/2 - decalage + (j*decalage) , height/2 + i * 150, 'btn_no_action');
    		//	this.btn_start.inputEnabled = true;
    			img.anchor.set(0.5);
    			nbButtonsAction ++;
			}
			else if(nbButtonsAction == 4)
			{
				var img = this.game.add.sprite(width/2 + 74  , height/2 + i * 150, 'btn_no_action');
    		//	this.btn_start.inputEnabled = true;
    			img.anchor.set(0.5);
    			nbButtonsAction ++;
			}
		}
	}

	this.btn_finish = this.game.add.button(width-60, height-50 , 'button_valid', this.actionOnClick, this, null, 0,1,2);
	this.btn_finish.anchor.set(1,1);
};


Main.etatPlay.prototype.choixAction = function(sprite, pointer)
{
	console.log("Choix de l'action");
	this.camera.setPosition(0,600);
};

Main.etatPlay.prototype.actionOnClick = function()
{
	console.log("click sur validation");
}

Main.etatPlay.prototype.choixDirection1 = function(sprite, pointer)
{
	console.log("Choix de la direction Sort");
	this.camera.setPosition(0,1200);
};

Main.etatPlay.prototype.choixDirection2 = function(sprite, pointer)
{
	console.log("Choix de la direction mouvement ou attaque");
	this.camera.setPosition(0,1800);
};

Main.etatPlay.prototype.retourEcran1 = function(sprite, pointer)
{
	console.log("retour ecran 1");
	this.camera.setPosition(0,0);
};


Main.etatPlay.prototype.ecran2 = function()
{
	var width = 800;
	var height = 600;

	var textInfo = this.add.text(width/2, height/4 +600, "Choisissez une action", Main.styleTextInfo);
	textInfo.anchor.set(0.5);

	var nbActions = 3;
	var nbButtonsAction = 0;

	for(i=0; i < 2; i++)
	{
		for(j = 0; j < 3; j++)
		{

			if(i==0)
				decalage = 150;
			else 
				decalage = 75;

			if(nbButtonsAction !=5)
			{
				if(i == 0)
				{
					var img = this.game.add.sprite(width/2 - decalage + (j*decalage) , (height/2 + i * 150) + 600, 'btn_add_action');
    				img.inputEnabled = true;
	    			img.events.onInputDown.add(this.choixDirection1, this);
    				img.anchor.set(0.5);
    				nbButtonsAction ++;
				}
				else if( i == 1 ) // on est sur la deuxieme ligne réservé a l'attaque et au mouvement
				{
					if(nbButtonsAction == 3)
					{
						var img = this.game.add.sprite(width/2 - 75  , (height/2 + i * 150)+600, 'btn_add_action');
    					img.inputEnabled = true;
    					img.events.onInputDown.add(this.choixDirection2, this);
  		  				img.anchor.set(0.5);
   	 					nbButtonsAction ++;
					}
					else
					{
						var img = this.game.add.sprite(width/2 + 75  , (height/2 + i * 150)+600, 'btn_add_action');
    					img.inputEnabled = true;
    					img.events.onInputDown.add(this.choixDirection2, this);
  		  				img.anchor.set(0.5);
   	 					nbButtonsAction ++;
					}
					
				}
			
			}
		}
	}
};

Main.etatPlay.prototype.ecran3Mvt = function()
{
	var width = 800;
	var height = 600;


	var textInfo = this.add.text(width/2, height/4 + 1800, "Choisissez une direction vers laquelle avancer ou frapper", Main.styleTextInfo);
	textInfo.anchor.set(0.5);


	var img = this.game.add.sprite(width/2, height/2 + 1800, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.anchor.set(0.5);

	var img = this.game.add.sprite(width/2, height/2 + 1800 + 128, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.anchor.set(0.5);

	var img = this.game.add.sprite(width/2 - 128, height/2 + 1800 + 128, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.anchor.set(0.5);

	var img = this.game.add.sprite(width/2 + 128, height/2 + 1800 + 128, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.anchor.set(0.5);
};

Main.etatPlay.prototype.ecran3Sort = function()
{
	var width = 800;
	var height = 600;


	var textInfo = this.add.text(width/2, height/4 + 1200, "Choisissez une direction vers laquelle alancer le sort", Main.styleTextInfo);
	textInfo.anchor.set(0.5);


	var img = this.game.add.sprite(width/2, height/2 + 1200-32, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2, height/2 + 1200, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2, height/2 + 1200+32, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2, height/2 + 1200+64, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);

	
	var img = this.game.add.sprite(width/2, height/2 + 1200+128, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2, height/2 + 1200+160, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2, height/2 + 1200+192, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2, height/2 + 1200+224, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);


	var img = this.game.add.sprite(width/2-32, height/2 + 1200+96, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2-64, height/2 + 1200+96, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2-96, height/2 + 1200+96, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2-128, height/2 + 1200+96, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);


	var img = this.game.add.sprite(width/2+32, height/2 + 1200+96, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2+64, height/2 + 1200+96, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2+96, height/2 + 1200+96, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
	var img = this.game.add.sprite(width/2+128, height/2 + 1200+96, 'btn_add_action');
	img.inputEnabled = true;
	img.events.onInputDown.add(this.retourEcran1, this);
	img.scale.setTo(0.25,0.25);
	img.anchor.set(0.5);
};