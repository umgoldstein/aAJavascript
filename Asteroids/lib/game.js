(function (){
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Game = Asteroids.Game = function (){
    this.addAsteroids();
    this.ship = new Asteroids.Ship({ pos: this.randomPosition(), game: this })
    this.bullets = [];
  };

  Asteroids.DIM_X = window.innerWidth - 100;
  Asteroids.DIM_Y = window.innerHeight - 50;
  Asteroids.NUM_ASTEROIDS = 2;

  Game.prototype.allObjects = function () {
    return this.asteroids.slice().concat([this.ship]).concat(this.bullets.slice());
  };

  Game.prototype.addAsteroids = function () {
    this.asteroids = [];
    for (var i = 0; i < Asteroids.NUM_ASTEROIDS; i++) {
      var asteroid = new Asteroids.Asteroid({ pos: this.randomPosition(), game: this });
      this.asteroids.push(asteroid);
    }

    return this.asteroids;
  };

  Game.prototype.randomPosition = function() {
    var x = Math.floor(Math.random() * Asteroids.DIM_X);
    var y = Math.floor(Math.random() * Asteroids.DIM_Y);

    return [x, y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Asteroids.DIM_X, Asteroids.DIM_Y);
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].move();
    }
  }

  Game.prototype.checkX = function (x) {
    if (x < 0) {
      return Asteroids.DIM_X;
    } else if (x > Asteroids.DIM_X) {
      return 0;
    } else {
      return x;
    }
  };

  Game.prototype.checkY = function (y) {
    if (y < 0) {
      return Asteroids.DIM_Y;
    } else if (y > Asteroids.DIM_Y) {
      return 0;
    } else {
      return y
    }
  };

  Game.prototype.wrap = function (pos) {
    return [this.checkX(pos[0]), this.checkY(pos[1])];
  };

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.allObjects().length; i++){
      el1 = this.allObjects()[i]
      for(var j = (i + 1); j < this.allObjects().length; j++){
        el2 = this.allObjects()[j]
        if(el1.isCollidedWith(el2)){
          el1.collideWith(el2);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.checkCollisions();
    this.moveObjects();
  };

  Game.prototype.remove = function (asteroid) {
    var temp = [];

    this.asteroids.forEach(function (el) {
      if (el === asteroid) {

      } else {
        temp.push(el);
      }
    });
    this.asteroids = temp;
  };

})();
