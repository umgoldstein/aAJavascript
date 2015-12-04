(function (){
  var Asteroids = window.Asteroids = window.Asteroids || {}

  var GameView = Asteroids.GameView = function(ctx, game) {
    this.ctx = ctx;
    this.game = game;
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.bindKeyHandlers()

    window.setInterval(function () {
      gameView.game.draw(gameView.ctx);
      gameView.game.step();
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var gv = this;

    key("left", function (){
      gv.game.ship.power([-5,0])
    });

    key("right", function (){
      gv.game.ship.power([5,0])
    });

    key("up", function (){
      gv.game.ship.power([0,-5])
    });

    key("down", function (){
      gv.game.ship.power([0,5])
    });

    key("space", function (){
      gv.game.ship.fireBullet();
    });

  };

})();
