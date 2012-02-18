var KitchenSinkDemo;

KitchenSinkDemo = (function() {
  var applyGravities, frameRate, gravitationalConstant, gravityX, gravityY, pixelsPerMeter;

  pixelsPerMeter = 30;

  gravityX = 0;

  gravityY = 0;

  frameRate = 20;

  gravitationalConstant = 1.5;

  function KitchenSinkDemo(canvas, debugCanvas, statsCanvas) {
    var customCircle, customRectangle, height, i, obj, radius, width,
      _this = this;
    this.world = new EaselBoxWorld(this, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter);
    obj = this.world.addEntity(new EaselBoxCircle(radius = 30), 'dynamic', {
      xPixels: canvas.width / 2,
      yPixels: canvas.height / 2,
      angleRadians: 45,
      angularVelRadians: 2
    });
    obj.easelObj.onPress = function(eventPress) {
      return alert('I am a standard circle');
    };
    obj = this.world.addEntity(new EaselBoxCircle(radius = 20, {
      imgSrc: '/img/exorcist_40x50.png'
    }), 'dynamic', {
      xPixels: canvas.width * 3 / 4,
      yPixels: canvas.height * 3 / 4
    });
    obj.easelObj.onPress = function(eventPress) {
      return alert('I am a circle with a bitmap');
    };
    for (i = 0; i <= 5; i++) {
      obj = this.world.addEntity(new EaselBoxCircle(radius = 4, {
        imgSrc: '/img/sparkle_21x23.png',
        frames: {
          width: 21,
          height: 23,
          regX: 10,
          regY: 11
        }
      }), 'dynamic', {
        xPixels: canvas.width * i / 5,
        yPixels: 10
      });
      obj.easelObj.onPress = function(eventPress) {
        return alert('I am an animated bitmap');
      };
    }
    customCircle = new EaselBoxCircle(radius = 15);
    customCircle.easelObj.graphics.beginRadialGradientFill(["#000", "#00fa4b"], [0.1, .9], 0, 0, 0, 0, 0, 15).drawCircle(0, 0, 15).beginFill("#FFF").drawRect(0, -1, 15, 2);
    obj = this.world.addEntity(customCircle, 'dynamic', {
      xPixels: canvas.width * 3 / 4,
      yPixels: canvas.height * 1 / 4,
      angularVelRadians: -1
    });
    obj.easelObj.onPress = function(eventPress) {
      return alert('I am a circle with custom rendering');
    };
    obj = this.world.addEntity(new EaselBoxRectangle(width = 30, height = 20), 'dynamic', {
      xPixels: canvas.width * 1 / 4,
      yPixels: canvas.height * 3 / 4,
      xVelPixels: 10,
      yVelPixels: -15,
      angularVelRadians: 2
    });
    obj.easelObj.onPress = function(eventPress) {
      return alert('I am a standard rectangle');
    };
    customRectangle = new EaselBoxRectangle(width = 50, height = 150, {
      imgSrc: "/img/catapult_50x150.png"
    });
    obj = this.world.addEntity(customRectangle, 'dynamic', {
      xPixels: canvas.width * 5 / 6,
      yPixels: canvas.height * 1 / 2
    });
    obj.easelObj.onPress = function(eventPress) {
      return alert('I am a rectangle with a bitmap');
    };
    this.stats = new Stats();
    statsCanvas.appendChild(this.stats.domElement);
  }

  KitchenSinkDemo.prototype.tick = function() {
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

  return KitchenSinkDemo;

})();
