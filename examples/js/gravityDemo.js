(function() {

  window.GravityDemo = (function() {
    var applyGravities, frameRate, gravitationalConstant, gravityX, gravityY, pixelsPerMeter;

    pixelsPerMeter = 30;

    gravityX = 0;

    gravityY = 0;

    frameRate = 20;

    gravitationalConstant = 1.5;

    function GravityDemo(canvas, debugCanvas, statsCanvas) {
      var i, j, obj, x, xVel, y, yVel,
        _this = this;
      this.world = new EaselBoxWorld(this, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter);
      this.world.addImage("/img/space.jpg");
      this.world.addEntity({
        radiusPixels: 20,
        scaleX: 0.25,
        scaleY: 0.25,
        imgSrc: 'img/Earth.png',
        frames: {
          width: 213,
          height: 160,
          count: 13,
          regX: 106,
          regY: 82
        },
        xPixels: canvas.width * 2 / 3,
        yPixels: canvas.height * 2 / 3,
        angleRadians: 45,
        angularVelRadians: 2
      });
      obj = this.world.addEntity({
        widthPixels: 99,
        heightPixels: 152,
        density: 0.5,
        scaleX: 0.5,
        scaleY: 0.5,
        imgSrc: "/img/scooter-sprite-99.png",
        frames: {
          width: 99,
          height: 152
        },
        startFrame: 0,
        xPixels: canvas.width * 1 / 4,
        yPixels: canvas.height * 1 / 2,
        angularVelRadians: -1
      });
      for (i = 0; i <= 4; i++) {
        for (j = 0; j <= 3; j++) {
          x = -40 + Math.floor(Math.random() * 80) + canvas.width * i / 4;
          y = -40 + Math.floor(Math.random() * 80) + canvas.height * j / 3;
          xVel = -10 + Math.floor(Math.random() * 20);
          yVel = -10 + Math.floor(Math.random() * 20);
          this.addSparkle(x, y, xVel, yVel);
        }
      }
      this.stats = new Stats();
      statsCanvas.appendChild(this.stats.domElement);
      canvas.onclick = function(event) {
        return _this.addSparkle(event.offsetX, event.offsetY, 0, 0);
      };
    }

    GravityDemo.prototype.addSparkle = function(spX, spY, xVel, yVel) {
      return this.world.addEntity({
        radiusPixels: 4,
        imgSrc: '/img/sparkle_21x23.png',
        frames: {
          width: 21,
          height: 23,
          regX: 10,
          regY: 11
        },
        startFrame: Math.random() * 13,
        xPixels: spX,
        yPixels: spY,
        xVelPixels: xVel,
        yVelPixels: yVel
      });
    };

    GravityDemo.prototype.tick = function() {
      var object1, object2, _i, _len, _ref, _results;
      this.stats.update();
      _ref = this.world.objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        object1 = _ref[_i];
        _results.push((function() {
          var _j, _len2, _ref2, _results2;
          _ref2 = this.world.objects;
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

}).call(this);
