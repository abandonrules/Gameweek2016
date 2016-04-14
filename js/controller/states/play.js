var Main = Main || {};
Main.Play = function(game)
{
    //GAMEBOARD

    //INFO PLAYER
	this.numberPlayer = 1;
    this.hp = 3;
    this.pa = this.base_pa = 3;
    this.timer = 0;
    this.actions = [3];
    this.bonus = [3];
    //BG
    this.bgs = [];

    //STATE
    this.state = 0;

    //ACTION
    this.id_actionCurrent = 0;
    this.id_slotActionCurrent = 0;
    this.id_typeAction = 0;

    //BTN ADD ACTION
    this.btnsAction = [];

    //BTN BONUS ACTION
    this.btnsBonus = [];
    this.btnsBaseChose = [];

    //BTN DIR 
    this.btnsPosType_1 = new Array();
    this.btnsPosType_2 = new Array();

    //BTN VALIDATION
    this.btnValidation = null;
}


Main.Play.prototype.create = function()
{
	console.log("Play");
    //setup game
    this.setupGame();
    this.setupConsole();
    Main.airconsole.message(AirConsole.SCREEN, {action: "get_info_player"});

    var truc = this.game.add.button(0, 0 , 'button_valid', this.PD, this, null, 0,1,2);
}

Main.Play.prototype.PD = function()
{
    this.state.start('GameOver');
}

Main.Play.prototype.update = function()
{
   //console.log("hello");
}

Main.Play.prototype.getInfos = function(data)
{
    console.log(data.info_player);
    this.base_pa = this.pa = data.info_player.pa || 3;
    this.hp = data.info_player.hp || 3;
    this.bonus = data.info_player.bonus || [3];
    this.numberPlayer = data.info_player.number_player;
    console.log(data.info_player.number_player);
    console.log(this.numberPlayer);

    this.refreshBG();
    this.newTurn();
}

Main.Play.prototype.newTurn = function()
{
    this.resetBTNAction();
}

Main.Play.prototype.setupConsole = function()
{
    var that = this;
    Main.airconsole.onMessage = function(from, data) 
    {
       //console.log(data);
       
        if(data.info_player !== undefined)
        {
            that.getInfos(data);
            //that.newTurn();
        }

        if(from == Main.airconsole.SCREEN && data.info_player !== undefined)
        {
            that.getInfos(data);
            that.newTurn();
        }

        if(from == Main.airconsole.SCREEN && data.action === "end_turn")
        {
             that.lockBTNAction();
        }

        if(from == Main.airconsole.SCREEN && data.action === "new_game")
        {
            that.getInfos(data.info_player);
            that.newTurn();
        }
    }
}

Main.Play.prototype.setupGame = function()
{
    //envoie d'un message pour avoir les infos du joueur
    //setup screens
    this.world.setBounds(0, 0, 800, 1800);

    this.bgs = [];
    
    for(var i = 0; i < 3; i++)
    {
        this.bgs.push(this.add.sprite(0, i*600, 'bg_play',this.numberPlayer));
    }
    this.setup_screen_1();
    this.setup_screen_2();
    this.setup_screen_3();

    //DEBUG
    //this.resetBTNAction();
    /*
    this.bgs.inputEnabled = true;
    this.arrow_right.anchor.set(0.5);
    this.arrow_right.events.onInputOver.add(this.onRight, this);
    */
}

Main.Play.prototype.setup_screen_1 = function()
{
    var textInfo = this.add.text(400, 150, "Ajoute des actions pour ce tour", Main.styleTextInfo);
    textInfo.anchor.set(0.5);

    this.btnsAction = [];

    this.btnValidation =  this.game.add.button(740, 550 , 'button_valid', this.onValidation, this, null, 0,1,2);
    this.btnValidation.anchor.set(1,1);
    this.btnValidation.inputEnabled = false;
    this.btnValidation.visible = false;

    for(var i = 0; i < 3; i++)
    {
        var btn_action = this.add.sprite(200 + (128* i), 250, 'btn_action',0);
        btn_action.id_slot_action = i;
        btn_action.action_id = 0;
        btn_action.inputEnabled = false;
        btn_action.events.onInputDown.add(this.onAddAction, this);
        this.btnsAction.push(btn_action);
    }

    for(var i = 0; i < 2; i++)
    {
        var btn_action = this.add.sprite(264 + (128* i), 400, 'btn_action',0);
        btn_action.id_slot_action = i+3;
        btn_action.action_id = 0;
        btn_action.inputEnabled = false;
        btn_action.events.onInputDown.add(this.onAddAction, this);
        this.btnsAction.push(btn_action);
    }

}

Main.Play.prototype.setup_screen_2 = function()
{
    var textInfo = this.add.text(400, 150+600, "Choisi le type d'action", Main.styleTextInfo);
    textInfo.anchor.set(0.5);

    this.btnsBonus = [];
    this.btnsBaseChose = [];

    for(var i = 0; i < 3; i++)
    {
        var btn_bonus = this.add.sprite(200 + (128* i), 250+600, 'btn_action',0);
        btn_bonus.id_action = 0;
        btn_bonus.id_typeAction = 0;
        btn_bonus.inputEnabled = false;
        btn_bonus.events.onInputDown.add(this.onUseBonus, this);
        this.btnsBonus.push(btn_bonus);
    }

    //btn move
    var btn_move = this.add.sprite(264, 400+600, 'btn_action',5);
    btn_move.id_action = 5;
    btn_move.inputEnabled = true;
    btn_move.events.onInputDown.add(this.onMoveAction, this);
    this.btnsBaseChose.push(btn_move);

    //btn fight
    var btn_fight = this.add.sprite(264 + 128, 400+600, 'btn_action',2);
    btn_fight.id_action = 2;
    btn_fight.inputEnabled = true;
    btn_fight.events.onInputDown.add(this.onFightAction, this);
    this.btnsBaseChose.push(btn_fight);
}

Main.Play.prototype.setup_screen_3 = function()
{
    var textInfo = this.add.text(400, 50+1200, "Touch une direction", Main.styleTextInfo);
    textInfo.anchor.set(0.5);

    this.setup_btnPosType_1();
    this.setup_btnPosType_2();
}

//btn pos 1 portée
Main.Play.prototype.setup_btnPosType_1 = function()
{
    //UP
    
    var btn_pos = this.add.sprite(370, 1300+(64*2), 'btn_action',1);
    btn_pos.posX =  0;
    btn_pos.posY = -1;
    btn_pos.scale.setTo(0.4,0.4);
    btn_pos.inputEnabled = false;
    btn_pos.visible = false;
    btn_pos.events.onInputDown.add(this.onChosePosition, this);
    this.btnsPosType_1.push(btn_pos);
    

    //DOWN
    
    var btn_pos = this.add.sprite(370, 1556+(64*0), 'btn_action',1);
    btn_pos.posX = 0;
    btn_pos.posY = 1;
    btn_pos.scale.setTo(0.4,0.4);
    btn_pos.inputEnabled = false;
    btn_pos.visible = false;
    btn_pos.events.onInputDown.add(this.onChosePosition, this);
    this.btnsPosType_1.push(btn_pos);
    

    //LEFT

    var btn_pos = this.add.sprite(128+(64*3), 1492, 'btn_action',1);
    btn_pos.posX = -1;
    btn_pos.posY = 0;
    btn_pos.scale.setTo(0.4,0.4);
    btn_pos.inputEnabled = false;
    btn_pos.visible = false;
    btn_pos.events.onInputDown.add(this.onChosePosition, this);
    this.btnsPosType_1.push(btn_pos);
    

    //RIGHT
    var btn_pos = this.add.sprite(420+(64*0), 1492, 'btn_action',1);
    btn_pos.posX = 1;
    btn_pos.posY = 0;
    btn_pos.scale.setTo(0.4,0.4);
    btn_pos.inputEnabled = false;
    btn_pos.visible = false;
    btn_pos.events.onInputDown.add(this.onChosePosition, this);
    this.btnsPosType_1.push(btn_pos);
}

//btn pos 3 portée
Main.Play.prototype.setup_btnPosType_2 = function()
{
    //UP
    for(var i = 0; i < 3; i ++)
    {
        var btn_pos = this.add.sprite(370, 1300+(64*i), 'btn_action',1);
        btn_pos.posX =  0;
        btn_pos.posY = -(i +1);
        btn_pos.scale.setTo(0.4,0.4);
        btn_pos.inputEnabled = false;
        btn_pos.visible = false;
        btn_pos.events.onInputDown.add(this.onChosePosition, this);
        this.btnsPosType_2.push(btn_pos);
    }

    //DOWN
    for(var i = 0; i < 3; i ++)
    {
        var btn_pos = this.add.sprite(370, 1556+(64*i), 'btn_action',1);
        btn_pos.posX =  0;
        btn_pos.posY = (i +1);
        btn_pos.scale.setTo(0.4,0.4);
        btn_pos.inputEnabled = false;
        btn_pos.visible = false;
        btn_pos.events.onInputDown.add(this.onChosePosition, this);
        this.btnsPosType_2.push(btn_pos);
    }

    //LEFT
    for(var i = 0; i < 3; i ++)
    {
        var btn_pos = this.add.sprite(128+(64*i), 1492, 'btn_action',1);
        btn_pos.posX = -(i +1);
        btn_pos.posY = 0;
        btn_pos.scale.setTo(0.4,0.4);
        btn_pos.inputEnabled = false;
        btn_pos.visible = false;
        btn_pos.events.onInputDown.add(this.onChosePosition, this);
        this.btnsPosType_2.push(btn_pos);
    }

    //RIGHT
    for(var i = 0; i < 3; i ++)
    {
        var btn_pos = this.add.sprite(480+(64*i), 1492, 'btn_action',1);
        btn_pos.posX = (i +1);
        btn_pos.posY = 0;
        btn_pos.scale.setTo(0.4,0.4);
        btn_pos.inputEnabled = false;
        btn_pos.visible = false;
        btn_pos.events.onInputDown.add(this.onChosePosition, this);
        this.btnsPosType_2.push(btn_pos);
    }
}

Main.Play.prototype.visibleBTNPos_type1 = function()
{
    for(var i = 0; i < this.btnsPosType_1.length; i ++)
    {
        this.btnsPosType_1[i].visible = true;
        this.btnsPosType_1[i].inputEnabled = true;
    }
}

Main.Play.prototype.hideBTNPos_type1 = function()
{
    for(var i = 0; i < this.btnsPosType_1.length; i ++)
    {
        this.btnsPosType_1[i].visible = false;
        this.btnsPosType_1[i].inputEnabled = false;
    }
}

Main.Play.prototype.visibleBTNPos_type2 = function()
{
    for(var i = 0; i < this.btnsPosType_2.length; i ++)
    {
        this.btnsPosType_2[i].visible = true;
        this.btnsPosType_2[i].inputEnabled = true;
    }
}

Main.Play.prototype.hideBTNPos_type2 = function()
{
    for(var i = 0; i < this.btnsPosType_2.length; i ++)
    {
        this.btnsPosType_2[i].visible = false;
        this.btnsPosType_2[i].inputEnabled = false;
    }
}
Main.Play.prototype.refreshBG = function()
{
    console.log(this.bgs);
    for(var i = 0; i < 3; i++)
    {
        this.bgs[i].frame = this.numberPlayer;
    }
}

Main.Play.prototype.moveScreen = function(state)
{
    switch(state)
    {
        case "add_action":
            this.camera.setPosition(0,0);
            break;
        case "choise_type_action":
            this.camera.setPosition(0,600);
            break;
        case "choise_direction":
            this.camera.setPosition(0,1200);
            break;
    }
}

Main.Play.prototype.onValidation = function(btn)
{
    //Main.airconsole.message(AirConsole.SCREEN, )

    //lock les butons actions
    this.lockBTNAction();
    //on envoie les actions du joueur
    console.log(this.actions);
    Main.airconsole.message(AirConsole.SCREEN, {action_list_player: this.actions});
}

Main.Play.prototype.lockBTNAction = function()
{
    for(var i = 0; i < this.btnsAction; i++)
    {
        this.btnsAction[i].inputEnabled = false;
    }
    this.pa = 0;
    this.moveScreen("add_action");
}

Main.Play.prototype.onAddAction = function(btn)
{
    this.id_slotActionCurrent = btn.id_slot_action;
    this.moveScreen("choise_type_action");
}

Main.Play.prototype.onMoveAction = function(btn)
{
    this.id_typeAction = 1;
    this.id_actionCurrent = 5;
    this.visibleBTNPos_type1();
    this.moveScreen("choise_direction");

    console.log('onMoveAction');
}

Main.Play.prototype.onFightAction = function(btn)
{
    this.id_typeAction = 1;
    this.id_actionCurrent = 2;
    this.visibleBTNPos_type1();
    this.moveScreen("choise_direction");
}

Main.Play.prototype.onUseBonus = function(btn)
{
    this.id_typeAction = btn.id_typeAction;
    this.id_actionCurrent = btn.id_action;
    this.moveScreen("choise_direction");
}

Main.Play.prototype.onChosePosition = function(btn)
{
    if(this.id_typeAction === 1)
    {
        this.hideBTNPos_type1();
        this.actions[this.id_slotActionCurrent] = new Action(this.id_typeAction,btn.posX,btn.posY,this.id_actionCurrent);
    }
    else if(this.id_typeAction === 2)
    {
        this.hideBTNPos_type2();
    }

    this.btnsAction[this.id_slotActionCurrent].inputEnabled = false;
    this.btnsAction[this.id_slotActionCurrent].frame = this.id_actionCurrent;

    //on affiche le bouton de validation
    this.btnValidation.inputEnabled = true;
    this.btnValidation.visible = true;

    this.pa--;
    this.moveScreen("add_action");
}

Main.Play.prototype.resetBTNAction = function()
{
    this.actions = [3];
    var pa = this.pa;
    for(var i = 0; i < this.btnsAction.length; i++)
    {
        if(pa > 0)
        {
            this.btnsAction[i].inputEnabled = true;
            this.btnsAction[i].frame = 1;
            pa--;
        }
       
    }
    this.moveScreen("add_action");
}

function Action(type,x,y,id_action)
{
    this.type = type;
    this.id_action = id_action;
    this.x = x;
    this.y = y;
}