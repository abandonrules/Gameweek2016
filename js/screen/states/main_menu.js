var Main = Main || {};
Main.MainMenu = function(game)
{
    this.title = null;
    this.info_device = null;
};

Main.MainMenu.prototype.create = function()
{
    console.log("MainMenu");

    this.title = this.game.add.text(this.game.world.height/2, this.game.world.width/2, 'MainMenu', { fontSize: '32px', fill: '#fff' });
    this.info_device = this.game.add.text(this.game.world.height/2, this.game.world.width/2-64, '', { fontSize: '32px', fill: '#fff' });

	var that = this;

    Main.airconsole.onConnect = function(device_id) 
    {
        that.info_device.text = "Device connect : "+device_id;
    }

	Main.airconsole.onMessage = function(device_id, data) 
    {
    	if(data.action === "Start")
    	{
    		Main.airconsole.message(device_id, {action: "Play"});
    		that.state.start('Play');
    	}
       
    };
}

Main.MainMenu.prototype.update = function()
{
	
}

Main.MainMenu.prototype.startGame = function(from)
{
	
}