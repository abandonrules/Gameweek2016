(function(){

	var game = {};

	function init()
	{
		//game = new Phaser.Game(1920,1080, Phaser.CANVAS, 'gameContainer', { preload: preload, create: create, update:update });
		game = new Phaser.Game(800,600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create});
	}

	function preload () 
	{

	}

	function create()
	{

		//game.world.setBounds(0, 0, 800, 2400); 
		//Main.numeroJoueur;
		Main.styleTextInfo = { font: '50px norse', fill : '#ff0044', align: 'center',wordWrap: true, wordWrapWidth: 450};

		game.state.add('Boot', Main.Boot);
		game.state.add('Preloader', Main.Preloader);
		game.state.add('MainMenu', Main.MainMenu);
		//game.state.add('etatPlay', Main.etatPlay);
		game.state.add('Play', Main.Play);

		game.state.start('Boot');
	}

	window.onload = init;
	
})();