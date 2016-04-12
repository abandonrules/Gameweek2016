(function(){

	var game = {};

	function init()
	{
		game = new Phaser.Game(800,600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create});
	}

	function preload () 
	{

	}

	function create()
	{
		console.log("main");
		
		game.state.add('Boot', Main.Boot);
		game.state.add('Preloader', Main.Preloader);
		game.state.add('MainMenu', Main.MainMenu);
		game.state.add('Play', Main.Play);

		game.state.start('Boot');
	}

	window.onload = init;
	
})();