var Main = Main || {};

Main.Gameover = function(game)
{
	this.title = null;
    this.infoNeedMorePlayer = null;
    this.numActionStart = [];
    this.bg = null;
}

Main.Gameover.prototype.create = function()
{
    console.log("Gameover");

    this.bg = this.game.add.sprite(0, 0, 'bg_gameover');
    //affichage du titre
    //this.title = this.game.add.text(this.game.world.width/2-250, 64, 'RETARDED BATTLE REVENGE', { fontSize: '32px', fill: '#fff' });
    this.infoNeedMorePlayer = this.game.add.text(0, 0, '', { fontSize: '32px', fill: '#fff', boundsAlignH: "center", boundsAlignV: "middle" });
    this.infoNeedMorePlayer.setTextBounds(0, 300, 800, 100);
	
    var that = this;
    //Si un joueur ce connecte
    Main.airconsole.onConnect = function(device_id) 
    {
       console.log('onConnect');
       that.checkFourPlayer();
    }
    
    //Si un joueur ce déconnecte
    Main.airconsole.onDisconnect = function(device_id) 
    {
        console.log('onDisconnect');
        var player = Main.airconsole.convertDeviceIdToPlayerNumber(device_id);

        if (player != undefined) 
        {
            // Player that was in game left the game.
            // Setting active players to length 0.
            Main.airconsole.setActivePlayers(0);
        }
        that.checkFourPlayer();
    };

    
	Main.airconsole.onMessage = function(device_id, data) 
    {
    	if(data.action === "Start")
    	{
            var player = Main.airconsole.convertDeviceIdToPlayerNumber(device_id);
            
            if(player != undefined)
            {
                that.numActionStart[player] = device_id;
                console.log(that.numActionStart);
                that.infoNeedMorePlayer.text = "Start : "+that.numActionStart.length;
            }
            
            
            if(that.numActionStart.length >= 4)
            {
                Main.airconsole.broadcast({action:"Play"});
                that.state.start('Play');
            }
            
    	}
       
    };
}

Main.MainMenu.prototype.checkFourPlayer = function()
{
    console.log('checkFourPlayer');
    //on récupére le nombre de joueur active
    var active_players = Main.airconsole.getActivePlayerDeviceIds();
    //on récupére le nombre de controller connecté
    var connected_controllers = Main.airconsole.getControllerDeviceIds();
    
    //si le nombre de joueur active est == 0
    if(active_players.length === 0)
    {
        //si le nombre de controller est supérieur ou équal à 4
        if(connected_controllers.length >= 4)
        {
            this.numActionStart = [];
            //on set les 4 premiers controller en player active
            Main.airconsole.setActivePlayers(4);
            this.infoNeedMorePlayer.text = "Press Start";
            //on envoie à chacun des controlleurs le changmeent d'état
            //Main.airconsole.broadcast({action:"Play"});

            //DEBUG
            //on change d'état à Play
           
        }
        else if(connected_controllers.length === 3)//sinon si le nombre de controlleur est == 3
        {
            //on affiche qu'il manque 1 joueurs
            this.infoNeedMorePlayer.text = "Besoin de 1 joueur supplémentaire !";
        }
        else if(connected_controllers.length === 2)//etc
        {
            //on affiche qu'il manque 2 joueurs
            this.infoNeedMorePlayer.text = "Besoin de 2 joueurs supplémentaire !";
        }
        else if(connected_controllers.length === 1)//etc
        {
            //on affiche qu'il manque 3 joueurs
            this.infoNeedMorePlayer.text = "Besoin de 3 joueurs supplémentaire !";
        }
    }
}
