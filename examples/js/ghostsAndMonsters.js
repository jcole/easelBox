var GhostsAndMonstersGame;

GhostsAndMonstersGame = (function() {
  var PIXELS_PER_METER, forceMultiplier, frameRate, gravityX, gravityY;

  PIXELS_PER_METER = 30;

  gravityX = 0;

  gravityY = 10;

  frameRate = 20;

  forceMultiplier = 5;

  function GhostsAndMonstersGame(canvas, debugCanvas, statsCanvas) {
    var blockHeight, blockWidth, ghost, ground, groundLevelPixels, height, i, initHeadXPixels, j, leftPyamid, levels, myBlock, topOfPyramid, width, worldHeightPixels, worldWidthPixels, x, y, _ref,
      _this = this;
    this.world = new EaselBoxWorld(this, frameRate, canvas, debugCanvas, gravityX, gravityY, PIXELS_PER_METER);
    this.stats = new Stats();
    statsCanvas.appendChild(this.stats.domElement);
    worldWidthPixels = canvas.width;
    worldHeightPixels = canvas.height;
    initHeadXPixels = 100;
    groundLevelPixels = worldHeightPixels - (37 / 2);
    this.world.addImage("/img/sky.jpg", {
      scaleX: 1.3,
      scaleY: 1.3
    });
    this.world.addImage("/img/trees.png", {
      scaleX: 0.5,
      scaleY: 0.5,
      y: worldHeightPixels - 400 * 0.55
    });
    this.world.addImage("/img/mountains.png", {
      scaleX: 1,
      scaleY: 1,
      y: worldHeightPixels - 254 * 1
    });
    ground = this.world.addEntity(new EaselBoxRectangle(width = 1024, height = 37, {
      imgSrc: '/img/ground-cropped.png'
    }), 'static', {
      xPixels: 0,
      yPixels: groundLevelPixels
    });
    this.world.addImage("/img/catapult_50x150.png", {
      x: initHeadXPixels - 30,
      y: worldHeightPixels - 160
    });
    this.head = this.world.addEntity(new EaselBoxCircle(20, {
      imgSrc: '/img/exorcist_40x50.png'
    }), 'static', {
      xPixels: initHeadXPixels,
      yPixels: groundLevelPixels - 140
    });
    this.head.selected = false;
    this.head.easelObj.onPress = function(eventPress) {
      _this.head.selected = true;
      _this.head.initPositionXpixels = eventPress.stageX;
      _this.head.initPositionYpixels = eventPress.stageY;
      eventPress.onMouseMove = function(event) {
        return _this.head.setState({
          xPixels: event.stageX,
          yPixels: event.stageY
        });
      };
      return eventPress.onMouseUp = function(event) {
        var forceX, forceY;
        _this.head.selected = false;
        _this.head.setType("dynamic");
        forceX = (_this.head.initPositionXpixels - event.stageX) * forceMultiplier;
        forceY = (_this.head.initPositionYpixels - event.stageY) * forceMultiplier;
        return _this.head.body.ApplyImpulse(_this.world.vector(forceX, forceY), _this.world.vector(_this.head.body.GetPosition().x, _this.head.body.GetPosition().y));
      };
    };
    blockWidth = 15;
    blockHeight = 60;
    leftPyamid = 300;
    levels = 3;
    topOfPyramid = groundLevelPixels - levels * (blockHeight + blockWidth) + 26;
    for (i = 0; 0 <= levels ? i < levels : i > levels; 0 <= levels ? i++ : i--) {
      for (j = 0, _ref = i + 1; 0 <= _ref ? j <= _ref : j >= _ref; 0 <= _ref ? j++ : j--) {
        x = leftPyamid + (j - i / 2) * blockHeight;
        y = topOfPyramid + i * (blockHeight + blockWidth);
        myBlock = this.world.addEntity(new EaselBoxRectangle(width = blockWidth, height = blockHeight, {
          imgSrc: '/img/block1_15x60.png'
        }), 'dynamic', {
          xPixels: x,
          yPixels: y
        });
        if (j <= i) {
          myBlock = this.world.addEntity(new EaselBoxRectangle(width = blockWidth, height = blockHeight, {
            imgSrc: '/img/block1_15x60.png'
          }), 'dynamic', {
            xPixels: x + blockHeight / 2,
            yPixels: y - (blockHeight + blockWidth) / 2,
            angleDegrees: 90
          });
          ghost = this.world.addEntity(new EaselBoxRectangle(width = 30, height = 36, {
            imgSrc: '/img/ghost_30x36.png'
          }), 'dynamic', {
            xPixels: x + (blockHeight / 2),
            yPixels: y + 11
          });
        }
      }
    }
  }

  GhostsAndMonstersGame.prototype.tick = function() {
    return this.stats.update();
  };

  return GhostsAndMonstersGame;

})();
