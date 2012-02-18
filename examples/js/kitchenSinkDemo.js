var KitchenSinkDemo;

KitchenSinkDemo = (function() {
  var frameRate, gravitationalConstant, gravityX, gravityY, pixelsPerMeter;

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
      yPixels: canvas.height * 5 / 6,
      xVelPixels: -5
    });
    obj.easelObj.onPress = function(eventPress) {
      return alert('I am a circle with a bitmap');
    };
    for (i = 0; i <= 13; i++) {
      obj = this.world.addEntity(new EaselBoxCircle(radius = 4, {
        imgSrc: '/img/sparkle_21x23.png',
        frames: {
          width: 21,
          height: 23,
          regX: 10,
          regY: 11
        },
        startFrame: i
      }), 'dynamic', {
        xPixels: 20 + (canvas.width - 20) * i / 10,
        yPixels: 20,
        yVelPixels: 10
      });
      obj.easelObj.onPress = function(eventPress) {
        return alert('I am an animated bitmap');
      };
    }
    customCircle = new EaselBoxCircle(radius = 15);
    customCircle.easelObj.graphics.beginRadialGradientFill(["#000", "#00fa4b"], [0.1, .9], 0, 0, 0, 0, 0, 15).drawCircle(0, 0, 15).beginFill("#FFF").drawRect(0, -1, 15, 2);
    obj = this.world.addEntity(customCircle, 'dynamic', {
      xPixels: canvas.width * 3 / 4,
      yPixels: canvas.height * 1 / 2,
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
      yPixels: canvas.height * 1 / 2,
      angularVelRadians: -1
    });
    obj.easelObj.onPress = function(eventPress) {
      return alert('I am a rectangle with a bitmap');
    };
    this.stats = new Stats();
    statsCanvas.appendChild(this.stats.domElement);
  }

  KitchenSinkDemo.prototype.tick = function() {
    return this.stats.update();
  };

  return KitchenSinkDemo;

})();
