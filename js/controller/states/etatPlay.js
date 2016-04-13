var Main = Main || {};
Main.etatPlay = function(game)
{
	console.log("state Play");
	this.btn_finish = null;
	this.bg1 = null;
	this.bg2 = null;
	this.bg3 = null;
};

Main.etatPlay.prototype.preload = function()
{};

Main.etatPlay.prototype.create = function()
{
	this.bg1 = this.game.add.sprite(0,0, 'imageFond');
	this.bg2 = this.game.add.sprite(0,600, 'imageFond');
	this.bg3 = this.game.add.sprite(0,1200, 'imageFond');

	this.ecran1();

	this.ecran2();
};



Main.etatPlay.prototype.ecran1 = function()
{
	var width = 800;
	var height = 600;

	var stylePV = { font: "50px norse", fill: "#ff0044", align: "center" };
	var textPV = this.add.text(width, 0, "PV : 3", stylePV);
	textPV.anchor.set(1,0);
	console.log(Main);


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
    			img.events.onInputDown.add(this.wesh, this);
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

	this.btn_finish = this.game.add.button(width, height , 'button_valid', actionOnClick, this, null, 0,1,2);
	this.btn_finish.anchor.set(1,1);
};


Main.etatPlay.prototype.wesh = function(sprite, pointer)
{
	console.log("SALE PUTE");
	this.camera.setPosition(0,600);
}

function actionOnClick () {

   console.log("WESH");

}

Main.etatPlay.prototype.ecran2 = function()
{
	var width = 800;
	var height = 600;

	var stylePV = { font: "50px norse", fill: "#ff0044", align: "center" };
	var textPV = this.add.text(width, height +600, "PV : 3", stylePV);
	textPV.anchor.set(1,0);
	console.log(Main);


	var textInfo = this.add.text(width/2, height/4 +600, "GROS PD", Main.styleTextInfo);
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
				var img = this.game.add.sprite(width/2 - decalage + (j*decalage) , (height/2 + i * 150) + 600, 'btn_add_action');
    			img.inputEnabled = true;
    			img.events.onInputDown.add(this.wesh, this);
    			img.anchor.set(0.5);
    			nbButtonsAction ++;
			}
			else if(nbButtonsAction<4)
			{
				var img = this.game.add.sprite(width/2 - decalage + (j*decalage) ,(height/2 + i * 150) + 600, 'btn_no_action');
    		//	this.btn_start.inputEnabled = true;
    			img.anchor.set(0.5);
    			nbButtonsAction ++;
			}
			else if(nbButtonsAction == 4)
			{
				var img = this.game.add.sprite(width/2 + 74  , (height/2 + i * 150)+600, 'btn_no_action');
    		//	this.btn_start.inputEnabled = true;
    			img.anchor.set(0.5);
    			nbButtonsAction ++;
			}
		}
	}
}