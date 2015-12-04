(function (){
  var Asteroids = window.Asteroids = window.Asteroids || {};

  Asteroids.SHIP_COLOR = "red";
  Asteroids.SHIP_RADIUS = 15;

  var Ship = Asteroids.Ship = function (args) {
    args.color = Asteroids.SHIP_COLOR;
    args.radius = Asteroids.SHIP_RADIUS;
    args.vel = [0, 0]
    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0]
  };

  Ship.prototype.power = function (impulse) {
    var newX = this.vel[0] + impulse[0];
    var newY = this.vel[1] + impulse[1];
    this.vel = [ newX, newY ];
  }

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({ pos: this.pos, vel: [this.vel[0] * 2, this.vel[1] * 2], game: this.game })
    this.game.bullets.push(bullet)
  }

})();
