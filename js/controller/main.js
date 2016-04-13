(function(){

	var game = {};

	function init()
	{
		//game = new Phaser.Game(1920,1080, Phaser.CANVAS, 'gameContainer', { preload: preload, create: create, update:update });
		game = new Phaser.Game(800,600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update:update });
	}

	function preload () 
	{

	}

	function create()
	{

		game.world.setBounds(0, 0, 800, 1800); 
		Main.numeroJoueur;
		// var iMax = 3;
		// var jMax = 2;
		// var infos = new Array();

		// for (i=0; i<iMax; i++) 
		// {
		// 	infos[i]=new Array();
		//  	for (j=0; j<jMax; j++) 
		//  	{
		//   		infos[i][j] = "";
		//  	}
		// }
		// console.log(infos);

		Main.styleTextInfo = { font: '50px norse', fill : '#ff0044', align: 'center',wordWrap: true, wordWrapWidth: 450};

		console.log("main");
		//Main.game.canvas.id = 'canvas';

		game.state.add('Boot', Main.Boot);
		game.state.add('Preloader', Main.Preloader);
		game.state.add('MainMenu', Main.MainMenu);
		game.state.add('etatPlay', Main.etatPlay);
	//	game.state.add('etatChoixAction', Main.etatChoixAction);

		game.state.start('Boot');
	}

	function update()
	{

	}

	window.onload = init;
	
})();