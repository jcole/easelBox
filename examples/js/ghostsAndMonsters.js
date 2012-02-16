var GhostsAndMonstersGame;

GhostsAndMonstersGame = (function() {
  var forceMultiplier, frameRate, gravityX, gravityY, pixelsPerMeter;

  pixelsPerMeter = 30;

  gravityX = 0;

  gravityY = 10;

  frameRate = 20;

  forceMultiplier = 5;

  function GhostsAndMonstersGame(canvas, debugCanvas, statsCanvas) {
    var blockHeight, blockWidth, ghost, ground, groundLevelMeters, i, initHeadXPixels, j, leftPyamid, levels, myBlock, topOfPyramid, worldHeightMeters, worldHeightPixels, worldWidthMeters, worldWidthPixels, x, y, _ref,
      _this = this;
    this.world = new EaselBoxWorld(this, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter);
    this.stats = new Stats();
    statsCanvas.appendChild(this.stats.domElement);
    worldWidthPixels = canvas.width;
    worldHeightPixels = canvas.height;
    worldWidthMeters = worldWidthPixels / pixelsPerMeter;
    worldHeightMeters = worldHeightPixels / pixelsPerMeter;
    initHeadXPixels = 100;
    groundLevelMeters = worldHeightMeters - ((37 / 2) / pixelsPerMeter);
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
    ground = this.world.addEntity('bitmap', 'static', {
      imgSrc: '/img/ground-cropped.png',
      initXMeters: (1024 / 2) / pixelsPerMeter,
      initYMeters: groundLevelMeters,
      imgWidthPixels: 1024,
      imgHeightPixels: 37
    });
    this.world.addImage("/img/catapult_50x150.png", {
      x: initHeadXPixels - 30,
      y: worldHeightPixels - 160
    });
    this.head = this.world.addEntity('bitmap', 'static', {
      imgSrc: '/img/exorcist_40x50.png',
      initXMeters: initHeadXPixels / pixelsPerMeter,
      initYMeters: groundLevelMeters - 140 / pixelsPerMeter,
      imgRadiusPixels: 20
    });
    this.head.selected = false;
    this.head.easelObj.onPress = function(eventPress) {
      _this.head.selected = true;
      _this.head.initPositionXpixels = eventPress.stageX;
      _this.head.initPositionYpixels = eventPress.stageY;
      eventPress.onMouseMove = function(event) {
        return _this.head.setPosition(event.stageX / pixelsPerMeter, event.stageY / pixelsPerMeter);
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
    levels = 3;
    topOfPyramid = groundLevelMeters - levels * (blockHeight + blockWidth) / pixelsPerMeter + 26 / pixelsPerMeter;
    leftPyamid = 300. / pixelsPerMeter;
    for (i = 0; 0 <= levels ? i < levels : i > levels; 0 <= levels ? i++ : i--) {
      for (j = 0, _ref = i + 1; 0 <= _ref ? j <= _ref : j >= _ref; 0 <= _ref ? j++ : j--) {
        x = leftPyamid + (j - i / 2) * blockHeight / pixelsPerMeter;
        y = topOfPyramid + i * (blockHeight + blockWidth) / pixelsPerMeter;
        myBlock = this.world.addEntity('bitmap', 'dynamic', {
          imgSrc: '/img/block1_15x60.png',
          imgWidthPixels: blockWidth,
          imgHeightPixels: blockHeight,
          initXMeters: x,
          initYMeters: y
        });
        if (j <= i) {
          myBlock = this.world.addEntity('bitmap', 'dynamic', {
            imgSrc: '/img/block1_15x60.png',
            imgWidthPixels: blockWidth,
            imgHeightPixels: blockHeight,
            initXMeters: x + (blockHeight / 2) / pixelsPerMeter,
            initYMeters: y - (blockHeight / 2 + blockWidth / 2) / pixelsPerMeter,
            angleDegrees: 90
          });
          ghost = this.world.addEntity('bitmap', 'dynamic', {
            imgSrc: '/img/ghost_30x36.png',
            imgWidthPixels: 30,
            imgHeightPixels: 36,
            initXMeters: x + (blockHeight / 2) / pixelsPerMeter,
            initYMeters: y + 11 / pixelsPerMeter
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
