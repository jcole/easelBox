var Game;

Game = (function() {
  var drawDot, forceMultiplier;

  forceMultiplier = 10;

  function Game(box2dWorld, easelStage) {
    var blockHeight, blockWidth, catapult, ghost, ground, groundLevelMeters, i, initHeadXPixels, j, leftPyamid, levels, mountainScale, mountains, myBlock, sky, skyScale, topOfPyramid, treeScale, trees, x, y, _ref,
      _this = this;
    this.box2dWorld = box2dWorld;
    this.easelStage = easelStage;
    skyScale = 1.3;
    sky = new Bitmap("/img/sky.jpg");
    sky.scaleX = skyScale;
    sky.scaleY = skyScale;
    this.easelStage.addChild(sky);
    treeScale = 0.5;
    trees = new Bitmap("/img/trees.png");
    trees.y = WORLD_HEIGHT_PIXELS - 400 * treeScale;
    trees.scaleX = treeScale;
    trees.scaleY = treeScale;
    this.easelStage.addChild(trees);
    mountainScale = 1;
    mountains = new Bitmap("/img/mountains.png");
    mountains.y = WORLD_HEIGHT_PIXELS - 254 * mountainScale;
    mountains.scaleX = mountainScale;
    mountains.scaleY = mountainScale;
    this.easelStage.addChild(mountains);
    groundLevelMeters = WORLD_HEIGHT_METERS - ((37 / 2) / PIXELS_PER_METER);
    ground = new EaselBox2dImage(this.box2dWorld, this.easelStage, 'static', '/img/ground-cropped.png', {
      initXMeters: (1024 / 2) / PIXELS_PER_METER,
      initYMeters: groundLevelMeters,
      imgWidthPixels: 1024,
      imgHeightPixels: 37
    });
    initHeadXPixels = 100;
    catapult = new Bitmap("/img/catapult_50x150.png");
    catapult.x = initHeadXPixels - 30;
    catapult.y = WORLD_HEIGHT_PIXELS - 160;
    this.easelStage.addChild(catapult);
    this.dynamicObjects = [];
    this.head = new EaselBox2dImage(this.box2dWorld, this.easelStage, 'static', '/img/exorcist_40x50.png', {
      initXMeters: initHeadXPixels / PIXELS_PER_METER,
      initYMeters: groundLevelMeters - 140 / PIXELS_PER_METER,
      imgRadiusPixels: 20
    });
    this.dynamicObjects.push(this.head);
    this.head.selected = false;
    this.head.easelObj.onPress = function(eventPress) {
      _this.head.selected = true;
      _this.head.initPositionXpixels = eventPress.stageX;
      _this.head.initPositionYpixels = eventPress.stageY;
      eventPress.onMouseMove = function(event) {
        _this.head.movedPositionXpixels = event.stageX;
        return _this.head.movedPositionYpixels = event.stageY;
      };
      return eventPress.onMouseUp = function(event) {
        var forceX, forceY;
        _this.head.selected = false;
        _this.head.body.SetType(Box2D.Dynamics.b2Body.b2_dynamicBody);
        forceX = (_this.head.initPositionXpixels - event.stageX) * forceMultiplier;
        forceY = (_this.head.initPositionYpixels - event.stageY) * forceMultiplier;
        return _this.head.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(forceX, forceY), new Box2D.Common.Math.b2Vec2(_this.head.body.GetPosition().x, _this.head.body.GetPosition().y));
      };
    };
    blockWidth = 15;
    blockHeight = 60;
    levels = 2;
    topOfPyramid = groundLevelMeters - (1 + levels) * (blockHeight + blockWidth) / PIXELS_PER_METER + (blockHeight / 2 - 4) / PIXELS_PER_METER;
    leftPyamid = 300. / PIXELS_PER_METER;
    for (i = 0; 0 <= levels ? i <= levels : i >= levels; 0 <= levels ? i++ : i--) {
      for (j = 0, _ref = i + 1; 0 <= _ref ? j <= _ref : j >= _ref; 0 <= _ref ? j++ : j--) {
        x = leftPyamid + (j - i / 2) * blockHeight / PIXELS_PER_METER;
        y = topOfPyramid + i * (blockHeight + blockWidth) / PIXELS_PER_METER;
        myBlock = new EaselBox2dImage(this.box2dWorld, this.easelStage, 'dynamic', '/img/block1_15x60.png', {
          imgWidthPixels: blockWidth,
          imgHeightPixels: blockHeight,
          initXMeters: x,
          initYMeters: y
        });
        this.dynamicObjects.push(myBlock);
        if (j <= i) {
          myBlock = new EaselBox2dImage(this.box2dWorld, this.easelStage, 'dynamic', '/img/block1_15x60.png', {
            imgWidthPixels: blockWidth,
            imgHeightPixels: blockHeight,
            initXMeters: x + (blockHeight / 2) / PIXELS_PER_METER,
            initYMeters: y - (blockHeight / 2 + blockWidth / 2) / PIXELS_PER_METER,
            angleDegrees: 90
          });
          this.dynamicObjects.push(myBlock);
          ghost = new EaselBox2dImage(this.box2dWorld, this.easelStage, 'dynamic', '/img/ghost_30x36.png', {
            imgWidthPixels: 30,
            imgHeightPixels: 36,
            initXMeters: x + (blockHeight / 2) / PIXELS_PER_METER,
            initYMeters: y + 11 / PIXELS_PER_METER
          });
          this.dynamicObjects.push(ghost);
        }
      }
    }
  }

  Game.prototype.update = function() {
    var object, _i, _len, _ref;
    _ref = this.dynamicObjects;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      object = _ref[_i];
      object.update();
    }
    if (this.head.selected) {
      return this.head.setRenderPosition(this.head.movedPositionXpixels, this.head.movedPositionYpixels);
    }
  };

  drawDot = function(stage, x, y) {
    var shape;
    shape = new Shape();
    shape.graphics.beginFill("#CC0000").drawCircle(x, y, 3);
    return stage.addChild(shape);
  };

  return Game;

})();
