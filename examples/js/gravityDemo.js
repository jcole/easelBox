var GravityDemo;

GravityDemo = (function() {
  var applyGravities, frameRate, gravitationalConstant, gravityX, gravityY, pixelsPerMeter;

  pixelsPerMeter = 30;

  gravityX = 0;

  gravityY = 0;

  frameRate = 20;

  gravitationalConstant = 1.5;

  function GravityDemo(canvas, debugCanvas, statsCanvas) {
    this.world = new EaselBoxWorld(this, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter);
    this.objects = [
      this.world.addEntity(new EaselBoxCircle({
        xPixels: canvas.width / 2,
        yPixels: canvas.height / 2,
        angularVelRadians: 1
      }), 'dynamic')
    ];
    customRenderBall.easelObj.graphics.beginRadialGradientFill(["#000", "#00fa4b"], [0.1, .9], 0, 0, 0, 0, 0, 15).drawCircle(0, 0, 15).beginFill("#FFF").drawRect(0, -1, 15, 2);
    this.stats = new Stats();
    statsCanvas.appendChild(this.stats.domElement);
  }

  GravityDemo.prototype.tick = function() {
    var object1, object2, _i, _len, _ref, _results;
    this.stats.update();
    _ref = this.objects;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      object1 = _ref[_i];
      _results.push((function() {
        var _j, _len2, _ref2, _results2;
        _ref2 = this.objects;
        _results2 = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          object2 = _ref2[_j];
          if (object1 !== object2) {
            _results2.push(applyGravities(object1, object2));
          } else {
            _results2.push(void 0);
          }
        }
        return _results2;
      }).call(this));
    }
    return _results;
  };

  applyGravities = function(obj1, obj2) {
    var diffVec, distSq, forceMagnitude, pos1, pos2;
    pos1 = obj1.body.GetWorldCenter();
    pos2 = obj2.body.GetWorldCenter();
    diffVec = pos2.Copy();
    diffVec.Subtract(pos1);
    distSq = diffVec.LengthSquared();
    forceMagnitude = gravitationalConstant * obj1.body.GetMass() * obj2.body.GetMass() / distSq;
    diffVec.Normalize();
    diffVec.Multiply(forceMagnitude);
    return obj1.body.ApplyForce(diffVec, pos1);
  };

  return GravityDemo;

})();
