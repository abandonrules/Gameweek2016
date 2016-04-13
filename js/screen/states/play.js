var Main = Main || {};
Main.Play = function(game)
{
    this.timerByTurn = 10;
    this.players = [];
    //MAP
    this.HEIGHT_MAP = 10;
    this.WIDTH_MAP = 10;
    this.map;
    this.bonus;
    this.collision;
    this.holes;
    this.layer;
    this.tiles;
    this.background;
    this.tilesList;
    this.group_players;
    //TIMER
    //this.delay = this.time.now() + 10;
    this.timer;
    Main.Play.isReady = true;
    
    // HUD Général
    this.infoChrono;
    
    this.infoNamePlayer1;
    this.infoLifePlayer1;
    this.infoReadyPlayer1;
    
    this.infoNamePlayer2;
    this.infoLifePlayer2;
    this.infoReadyPlayer2;
    
    this.infoNamePlayer3;
    this.infoLifePlayer3;
    this.infoReadyPlayer3;
    
    this.infoNamePlayer4;
    this.infoLifePlayer4;
    this.infoReadyPlayer4;
};

Main.Play.prototype.create = function()
{
    console.log("Play");
    //DEBUG
    this.add.text(16, 16, "PLAY STATE", { font: "16px norse", fill: "#ffffff" });
	this.setupConsole();

    //Créer UI_Manager
    //Créer la map
    this.createMap();
    //Créer les players
    this.setupPlayers();
    //Setup timer
    this.setupTimer();
    // Affichage HUD
    this.UIManager();
}

Main.Play.prototype.update = function()
{
    //console.log(this.time.elapsed);
    this.infoChrono.text = ""+(this.timerByTurn-(Math.round(this.timer.ms/1000)));
}

Main.Play.prototype.setupGame = function()
{
    this.map = new Array();
    this.collision = new Array();
    this.bonus = new Array();
    this.holes = new Array();

    //MAP
    for(var y = 0; y < 10; y++)
    {
        this.map[y] = new Array();
        this.collision[y] = new Array();
        this.bonus[y] = new Array();
        this.holes[y] = new Array();

        for(var x = 0; x < 10; x++)
        {
            this.map[y][x] = 0;
            this.collision[y][x] = 0;
            this.bonus[y][x] = 0;
            this.holes[y][x] = 0;
        }
    }
}

Main.Play.prototype.setupConsole = function()
{

	//Si un joueur ce connecte
    Main.airconsole.onConnect = function(device_id) 
    {
       console.log('onConnect');
       that.checkFourPlayer();
    };

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
        var player = Main.airconsole.convertDeviceIdToPlayerNumber(device_id);
        if(player != undefined)
        {
            //GET VALIDATION
            if(data.validation !== undefined)
            {
                this.getActionsPLayer(data.validation);
            }
        }
    }
}

Main.Play.prototype.setupTimer = function()
{
    this.timer = this.time.create(true);
    this.timer.add(10000, this.endTurn, this);
    this.timer.start();
}

Main.Play.prototype.setupPlayers = function()
{   
    //créer le group player
    this.group_players = this.add.group();
    this.group_players.x = 620;
    this.group_players.y = 245;
    //créer le player 1
    //on sotck dans players
    this.players['1'] = new Player(this,this.tilesList[0+'_'+0].position.x,this.tilesList[0+'_'+0].position.y,0);
    this.players['1'].id = 1;
    this.group_players.add(this.players['1']);
    //on envoie les infos du player aux controller correspondant
    
    //créer le player 2
    //on stock dans  players
    this.players['2'] = new Player(this,this.tilesList[9+'_'+0].position.x,this.tilesList[9+'_'+0].position.y,1);
    this.players['2'].id = 2;
    this.group_players.add(this.players['2']);
    //on evnoie les infos du player aux controller correspondant

    //créer le player 3
    //on stock dans  players
    this.players['3'] = new Player(this,this.tilesList[9+'_'+9].position.x,this.tilesList[9+'_'+9].position.y,2);
    this.players['3'].id = 3;
    this.group_players.add(this.players['3']);
    //on evnoie les infos du player aux controller correspondant

    //créer le player 4
    //on stock dans  players
    this.players['4'] = new Player(this,this.tilesList[0+'_'+9].position.x,this.tilesList[0+'_'+9].position.y,3);
    this.players['4'].id = 4;
    this.group_players.add(this.players['4']);
    //on evnoie les infos du player aux controller correspondant

    //on ajoute le group à l'affichage
    this.add.existing(this.group_players);
}

Main.Play.prototype.checkFourPlayer = function()
{
    console.log('checkFourPlayer');
    var active_players = Main.airconsole.getActivePlayerDeviceIds();
    var connected_controllers = Main.airconsole.getControllerDeviceIds();

    if(active_players.length == 0)
    {
        //on change l'état à MainMenu
        this.state.start('MainMenu');
    }
    else if(active_players.length < 4)
    {
        //on mets le jeu en pause

        //si le nombre de controller connecté est >= 4
        if(connected_controllers >= 4)
        {
            //on set les 4 premiers controller en player active
            Main.airconsole.setActivePlayers(4);
            //on enléve la pause

        }
        else
        {
            //on affiche le nombre de joueur manquant

        }
        
    }
}

Main.Play.prototype.getActionsPLayer = function(action,player)
{

}

Main.Play.prototype.endTurn = function()
{
    console.log("endTurn");
    //resolution des actions
    //on envoie à chacun des controlleurs des pa correspondants

    this.setupTimer();
}

Main.Play.prototype.createMap = function()
{

    //BACKGROUND
    this.background = this.add.image(0, 0, 'bg');

    //MAP
    this.map = this.add.tilemap('map');
    
    //DEBUG
    /*
    var layer_background = this.map.layers[0];
    var layer_items = this.map.layers[1];
    var layers_spawners = this.map.layers[2];
    var tile_id = this.map.getTile(0,0,'background');
    //this.layer = this.map.createLayer('background');
    //this.layer.resizeWorld();
    console.log(tile_id.index);
    console.log(this.map);
    */

    //GROUP TILE
    this.tiles = this.add.group();
    this.tiles.x = 620;
    this.tiles.y = 245;

    this.tilesList = new Array();
    for(var y = 0; y < this.HEIGHT_MAP; y++)
    {
        
        for(var x = 0; x < this.WIDTH_MAP; x++)
        {
            var tile = new Tile(this,x*80,y*80,Math.round(Math.random()*3));
            this.tiles.add(tile);
            this.tilesList[x+'_'+y] = tile;
        }
    }
    this.add.existing(this.tiles);
    console.log(this.tilesList[1+'_'+0].position);
    //pointer
    Main.Play.tilesList = this.tilesList;
    
    //DEBUG
    /*
    console.log(this.tiles);
    this.tiles.children[0].animationFall();
    var tile = this.tiles.getRandom();
    tile.animationFall();
    */
}

Main.Play.prototype.UIManager = function()
{
    var textSpace = 75;         // Espace entre le texte joueur et vie
    var textOffset = 25;        // Espace entre le bord gauche de l'écran et les texte de gauche
    var textPosRight = 1600;    // Position des textes à droite de l'écran
    var textPosBottom = 925;    // Position des textes en bas de l'écran
    
    // HUD
    this.infoChrono = this.add.text(0, 0, this.timer.ms, { font: "128px norse", fill: "#ffffff" });
    this.infoChrono.setTextBounds(960, textOffset, 0, 0);

    this.infoNamePlayer1 = this.add.text(0, 0, "Joueur 1", { font: "48px norse", fill: "#9759d8" });
    this.infoNamePlayer1.setTextBounds(textOffset, textOffset, 0, 0);
    
    //this.infoLifePlayer1 = this.add.text(0, 0, "Vie : "+this.players[1].hp, { font: "32px norse", fill: "#9759d8" });
    //this.infoLifePlayer1.setTextBounds(textOffset, textOffset+textSpace, 0, 0);
    this.infoLifePlayer1 = this.add.sprite(textOffset, textSpace, "hearts");
    this.infoLifePlayer1.scale.setTo(0.4, 0.4);
    this.infoLifePlayer1.frame = 3;
    
    this.infoReadyPlayer1 = this.add.sprite(200, textOffset, "hud_valid");
    this.infoReadyPlayer1.visible = false;
    
    this.infoNamePlayer2 = this.add.text(0, 0, "Joueur 2", { font: "48px norse", fill: "#4ea4e3" });
    this.infoNamePlayer2.setTextBounds(textPosRight, textOffset, 0, 0);
    this.infoLifePlayer2 = this.add.sprite(textPosRight, textSpace, "hearts");
    this.infoLifePlayer2.scale.setTo(0.4, 0.4);
    this.infoLifePlayer2.frame = 7;
    this.infoReadyPlayer2 = this.add.sprite(textPosRight + 175, textOffset, "hud_valid");
    this.infoReadyPlayer2.visible = false;
    
    this.infoNamePlayer3 = this.add.text(0, 0, "Joueur 3", { font: "48px norse", fill: "#ff9933" });
    this.infoNamePlayer3.setTextBounds(textOffset, textPosBottom, 0, 0);
    this.infoLifePlayer3 = this.add.sprite(textOffset, textPosBottom + 50, "hearts");
    this.infoLifePlayer3.scale.setTo(0.4, 0.4);
    this.infoLifePlayer3.frame = 11;
    this.infoReadyPlayer3 = this.add.sprite(200, textPosBottom, "hud_valid");
    this.infoReadyPlayer3.visible = false;
    
    this.infoNamePlayer4 = this.add.text(0, 0, "Joueur 4", { font: "48px norse", fill: "#1fd866" });
    this.infoNamePlayer4.setTextBounds(textPosRight, textPosBottom, 0, 0);
    this.infoLifePlayer3 = this.add.sprite(textPosRight, textPosBottom + 50, "hearts");
    this.infoLifePlayer3.scale.setTo(0.4, 0.4);
    this.infoLifePlayer3.frame = 15;
    this.infoReadyPlayer4 = this.add.sprite(textPosRight + 175, textPosBottom, "hud_valid");
    this.infoReadyPlayer4.visible = false;
}