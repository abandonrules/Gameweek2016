var Main = Main || {};
Main.Play = function(game)
{
    //GAMEBOARD

    //INFO PLAYER
	this.numberPlayer = 1;
    this.hp = 3;
    this.pa = this.base_pa = 3;
    this.timer = 0;
    this.actions = new Array();
    this.bonus = new Array();
    this.isDead = false;

     //ACTION
    this.id_actionCurrent = undefined;

    //VERSION 2
    this.bg = null;
    this.slotAction = new Array();
    this.btns_dir = new Array();
    this.btns_actions = new Array();
    this.display_pa = null;

    this.dirCurrent = {
        x:null,
        y:null
    }
}

Main.Play.prototype.create = function()
{
	console.log("Play");
    //setup game
    this.setupGame();

    this.setupConsole();
    Main.airconsole.message(AirConsole.SCREEN, {action: "get_info_player"});

    //DEBUG
    //this.refreshBG();
    //this.newTurn();
}

Main.Play.prototype.update = function()
{
   //console.log("hello");
   if(this.display_pa !== null)
   {
        this.display_pa.text = "PA: "+this.pa;
   }
}

Main.Play.prototype.getInfos = function(data)
{
    console.log(data.info_player);
    this.base_pa = this.pa = data.info_player.pa || 3;
    this.hp = data.info_player.hp || 3;
    this.bonus = data.info_player.bonus || [];
    this.numberPlayer = data.info_player.number_player;

    //console.log(data.info_player.number_player);
    //console.log(this.numberPlayer);

    this.refreshBG();
    this.newTurn();
}

Main.Play.prototype.newTurn = function()
{
    this.unlockAction();
    this.hideSlotAction();
    this.actions = new Array();

}

Main.Play.prototype.setupConsole = function()
{
    var that = this;
    Main.airconsole.onMessage = function(from, data) 
    {
       console.log(data);
       
        if(data.info_player !== undefined && !that.isDead)
        {
            that.getInfos(data);
        }
       
        if(data.action === "end_turn")
        {
             that.lockAction();
        }

        if(data.action === "end_game")
        {
            this.state.start('Gameover');
        }

        if(data.action === "game_over")
        {
           that.isDead = true;
           that.displayGameover();
           that.lockAction();
           that.hideSlotAction();
        }
    }
}

Main.Play.prototype.setupGame = function()
{
    //DEBUG

    this.bg = this.add.sprite(0, 0, 'bg_play',this.numberPlayer*2);
    this.display_pa = this.add.text(60, 60, "", Main.styleTextInfo);
    this.display_pa.anchor.set(0.5);

    this.setup_slotAction();
    this.setup_btnDirection();
    this.setup_btnActions();
}

Main.Play.prototype.setup_slotAction = function()
{
    this.slotAction = [];
    for(var i = 0; i < 3; i++)
    {
        var btn_action = this.add.sprite(200 + (128* i), 128, 'btn_action',0);
        btn_action.visible = false;
        this.slotAction.push(btn_action);
    }
}

Main.Play.prototype.visibleSlotAction = function()
{
    console.log('visibleSlotAction');
    console.log( this.actions);

    for(var i = 0; i < this.actions.length; i++)
    {
        if(this.actions[i].id_action !== undefined)
        {
            this.slotAction[i].visible = true;
            this.slotAction[i].frame = this.actions[i].id_action;
        }
    }
}

Main.Play.prototype.hideSlotAction = function()
{
    for(var i = 0; i < this.slotAction.length; i++)
    {
    
        this.slotAction[i].visible = false;
        this.slotAction[i].frame = 0;
        
    }
}

Main.Play.prototype.setup_btnDirection = function()
{
    this.btns_dir = [];

    //UP
    var btn_pos = this.add.sprite(140, 270, 'btn_dir',1);
    btn_pos.posX =  0;
    btn_pos.posY = -1;
    btn_pos.scale.setTo(0.8,0.8);
    btn_pos.inputEnabled = false;
    btn_pos.visible = false;
    btn_pos.events.onInputDown.add(this.onChoseDirection, this);
    this.btns_dir.push(btn_pos);
    

    //DOWN
    var btn_pos = this.add.sprite(140, 320+(64*2), 'btn_dir',2);
    btn_pos.posX = 0;
    btn_pos.posY = 1;
    btn_pos.scale.setTo(0.8,0.8);
    btn_pos.inputEnabled = false;
    btn_pos.visible = false;
    btn_pos.events.onInputDown.add(this.onChoseDirection, this);
    this.btns_dir.push(btn_pos);

    //LEFT
    var btn_pos = this.add.sprite(32, 360, 'btn_dir',3);
    btn_pos.posX = -1;
    btn_pos.posY = 0;
    btn_pos.scale.setTo(0.8,0.8);
    btn_pos.inputEnabled = false;
    btn_pos.visible = false;
    btn_pos.events.onInputDown.add(this.onChoseDirection, this);
    this.btns_dir.push(btn_pos);

    //RIGHT
    var btn_pos = this.add.sprite(240, 360, 'btn_dir',0);
    btn_pos.posX = 1;
    btn_pos.posY = 0;
    btn_pos.scale.setTo(0.8,0.8);
    btn_pos.inputEnabled = false;
    btn_pos.visible = false;
    btn_pos.events.onInputDown.add(this.onChoseDirection, this);
    this.btns_dir.push(btn_pos);

}

Main.Play.prototype.onChoseDirection = function(btn)
{
    console.log("onChoseDirection");


    this.dirCurrent.x = btn.posX;
    this.dirCurrent.y = btn.posY;

    console.log(this.dirCurrent);
    console.log(this.id_actionCurrent)

    if(this.checkValidation())
    {
       this.validationAction();
    }

}


Main.Play.prototype.setup_btnActions = function()
{
    this.btns_actions = [];

    //btn move
    var btn_move = this.add.sprite(388, 340, 'btn_action',5);
    btn_move.id_action = 5;
    btn_move.inputEnabled = false;
    btn_move.visible = false;
    btn_move.events.onInputDown.add(this.onTypeAction, this);
    this.btns_actions.push(btn_move);

    //btn fight
    var btn_fight = this.add.sprite(580, 340, 'btn_action',2);
    btn_fight.id_action = 2;
    btn_fight.inputEnabled = false;
    btn_fight.visible = false;
    btn_fight.events.onInputDown.add(this.onTypeAction, this);
    this.btns_actions.push(btn_fight);
}

Main.Play.prototype.onTypeAction = function(btn)
{
    console.log('onTypeAction');
    this.id_actionCurrent = btn.id_action;

    console.log(this.dirCurrent);
    console.log(this.id_actionCurrent)

    if(this.checkValidation())
    {
        this.validationAction();
    }
}

Main.Play.prototype.validationAction = function()
{
    console.log('validationAction');
    var action = new Action(1,this.dirCurrent.x,this.dirCurrent.y,this.id_actionCurrent);
    this.actions.push(action);
    this.resetAction();

    this.visibleSlotAction();
    //send data
    Main.airconsole.message(AirConsole.SCREEN, {action_list_player: this.actions});

    this.checkEndTurn();
}

Main.Play.prototype.checkValidation = function()
{
    console.log("checkValidation");

    if(this.dirCurrent.x !== null && this.dirCurrent.y !== null && this.id_actionCurrent !== undefined && this.pa > 0)
    {
        return true;
    }
    return false;
}

Main.Play.prototype.checkEndTurn = function()
{
    if(this.pa <= 0)
    {
        this.lockAction();
    }
}

Main.Play.prototype.resetAction = function()
{
    this.dirCurrent.x = null;
    this.dirCurrent.y = null;
    this.id_actionCurrent = undefined;
    this.pa --;
}

Main.Play.prototype.refreshBG = function()
{
    this.bg.frame = this.numberPlayer*2;
}

Main.Play.prototype.displayGameover = function()
{
    this.bg.frame = (this.numberPlayer*2)+1;
}

Main.Play.prototype.lockAction = function()
{
    for(var i = 0; i < this.btns_dir.length; i++)
    {
        this.btns_dir[i].inputEnabled = false;
        this.btns_dir[i].visible = false;
    }

    //LOCK BTN ACTIONS
    for(var i =0; i < this.btns_actions.length; i++)
    {
        this.btns_actions[i].inputEnabled = false;
        this.btns_actions[i].visible = false;
    }
}

Main.Play.prototype.unlockAction = function()
{
    for(var i = 0; i < this.btns_dir.length; i++)
    {
        this.btns_dir[i].inputEnabled = true;
        this.btns_dir[i].visible = true;
    }

    //LOCK BTN ACTIONS
    for(var i =0; i < this.btns_actions.length; i++)
    {
        this.btns_actions[i].inputEnabled = true;
        this.btns_actions[i].visible = true;
    }
}

function Action(type,x,y,id_action)
{
    this.type = type;
    this.id_action = id_action;
    this.x = x;
    this.y = y;
}