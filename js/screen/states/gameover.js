var Main = Main || {};


Main.GameOver = function()
{
    console.log("Coucou ! :)");
    this.title;
}

Main.GameOver.prototype.create = function()
{
    this.title = this.game.add.text(this.game.world.width/2, this.game.world.height / 2 - 100, "Le joueur X a gagné la partie !", { font: "128px norse", fill: "#ffffff" });
    this.title.anchor.x = 0.5;    
}