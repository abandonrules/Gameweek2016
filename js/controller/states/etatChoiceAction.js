var Main = Main || {};
Main.EtatChoixAction = function(game)
{

};

Main.EtatChoixAction.prototype.preload = function() {
	
};

Main.EtatChoixAction.prototype.create = function()
{
	var textInfo = this.add.Text(this.game.world.centerX, this.game.world.height/4, "Choisissez une action", Main.styleTextInfo);
	textInfo.anchor.set(0.5);

	for(i=0; i < 2; i++)
	{
		for(j = 0; j < 3; j++)
		{
			
			var img = this.game.add.sprite(this.game.world.centerX - 150 + (j*150) , this.game.world.centerY + i * 150, 'btn_add_action');
    	//	this.btn_start.inputEnabled = true;
    		img.anchor.set(0.5);
    		nbButtonsAction ++;
			
		}
	}

}