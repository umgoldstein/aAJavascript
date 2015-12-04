(function (){
  var Asteroids = window.Asteroids = window.Asteroids || {}

  var Util = Asteroids.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function() {};

    Surrogate.prototype = ParentClass.prototype;

    ChildClass.prototype = new Surrogate();

    ChildClass.prototype.constructor = ChildClass;
  };

  Util.randomVec = function (length) {
    var randomX = (Math.random() - 0.5) * length * 2;
    var randomY = Math.sqrt(length * length - randomX * randomX);
    if (Math.random() > 0.5){
      randomY *= -1
    }
    return [randomX, randomY];
  };

  Util.distance = function (pos1, pos2) {
    return Math.sqrt((pos1[0] - pos2[0]) * (pos1[0] - pos2[0]) +
      (pos1[1] - pos2[1]) * (pos1[1] - pos2[1]));
  }


})();
