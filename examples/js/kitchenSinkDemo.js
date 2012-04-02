(function() {

  window.KitchenSinkDemo = (function() {
    var frameRate, gravitationalConstant, gravityX, gravityY, pixelsPerMeter;

    pixelsPerMeter = 30;

    gravityX = 0;

    gravityY = 0;

    frameRate = 20;

    gravitationalConstant = 1.5;

    function KitchenSinkDemo(canvas, debugCanvas, statsCanvas) {
      var i, obj,
        _this = this;
      this.world = new EaselBoxWorld(this, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter);
      obj = this.world.addEntity({
        type: 'dynamic',
        radiusPixels: 30,
        xPixels: canvas.width / 2,
        yPixels: canvas.height / 2,
        angleRadians: 45,
        angularVelRadians: 2
      });
      obj.easelObj.onPress = function(eventPress) {
        return alert('I am a standard circle');
      };
      obj = this.world.addEntity({
        radiusPixels: 20,
        imgSrc: '/img/exorcist_40x50.png',
        xPixels: canvas.width * 3 / 4,
        yPixels: canvas.height * 5 / 6,
        xVelPixels: -5
      });
      obj.easelObj.onPress = function(eventPress) {
        return alert('I am a circle with a bitmap');
      };
      for (i = 0; i <= 13; i++) {
        obj = this.world.addEntity({
          radiusPixels: 4,
          imgSrc: '/img/sparkle_21x23.png',
          frames: {
            width: 21,
            height: 23,
            regX: 10,
            regY: 11
          },
          startFrame: i,
          xPixels: 20 + (canvas.width - 20) * i / 10,
          yPixels: 20,
          yVelPixels: 10
        });
      }
      obj.easelObj.onPress = function(eventPress) {
        return alert('I am a circle with an animated bitmap');
      };
      obj = this.world.addEntity({
        radiusPixels: 15,
        xPixels: canvas.width * 3 / 4,
        yPixels: canvas.height * 1 / 2,
        angularVelRadians: -1
      });
      obj.easelObj.onPress = function(eventPress) {
        return alert('I am a circle with custom rendering');
      };
      obj.easelObj.graphics.beginRadialGradientFill(["#000", "#00fa4b"], [0.1, .9], 0, 0, 0, 0, 0, 15).drawCircle(0, 0, 15).beginFill("#FFF").drawRect(0, -1, 15, 2);
      obj = this.world.addEntity({
        widthPixels: 30,
        heightPixels: 20,
        xPixels: canvas.width * 1 / 4,
        yPixels: canvas.height * 3 / 4,
        xVelPixels: 10,
        yVelPixels: -15,
        angularVelRadians: 2
      });
      obj.easelObj.onPress = function(eventPress) {
        return alert('I am a standard rectangle');
      };
      obj = this.world.addEntity({
        widthPixels: 50,
        heightPixels: 150,
        imgSrc: "/img/catapult_50x150.png",
        xPixels: canvas.width * 5 / 6,
        yPixels: canvas.height * 1 / 2,
        angularVelRadians: -1
      });
      obj.easelObj.onPress = function(eventPress) {
        return alert('I am a rectangle with a bitmap');
      };
      obj = this.world.addEntity({
        widthPixels: 99,
        heightPixels: 152,
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
      obj.easelObj.onPress = function(eventPress) {
        return alert('I am a rectangle with an animated bitmap');
      };
      this.stats = new Stats();
      statsCanvas.appendChild(this.stats.domElement);
    }

    KitchenSinkDemo.prototype.tick = function() {
      return this.stats.update();
    };

    return KitchenSinkDemo;

  })();

}).call(this);
