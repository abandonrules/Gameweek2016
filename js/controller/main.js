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
		console.log("main");
		//Main.game.canvas.id = 'canvas';

		game.state.add('Boot', Main.Boot);
		game.state.add('Preloader', Main.Preloader);
		game.state.add('MainMenu', Main.MainMenu);
		game.state.add('Play', Main.Play);

		game.state.start('Boot');
	}

	function update()
	{

	}

	window.onload = init;
	
})();