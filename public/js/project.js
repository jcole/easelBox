var EaselBox2dImage, EaselBox2dObject, Game, Main, PIXELS_PER_METER, WORLD_HEIGHT_METERS, WORLD_HEIGHT_PIXELS, WORLD_WIDTH_METERS, WORLD_WIDTH_PIXELS,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

PIXELS_PER_METER = 30;

WORLD_WIDTH_PIXELS = 500;

WORLD_HEIGHT_PIXELS = 400;

WORLD_WIDTH_METERS = WORLD_WIDTH_PIXELS / PIXELS_PER_METER;

WORLD_HEIGHT_METERS = WORLD_HEIGHT_PIXELS / PIXELS_PER_METER;

Main = (function() {
  var framesPerSecond, gravityX, gravityY;

  framesPerSecond = 20;

  gravityX = 0;

  gravityY = 10;

  function Main(canvasID, debugCanvasID) {
    var debugCanvas, debugDraw;
    this.canvas = document.getElementById(canvasID);
    this.canvas.height = WORLD_HEIGHT_PIXELS;
    this.canvas.width = WORLD_WIDTH_PIXELS;
    this.box2dWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(gravityX, gravityY), true);
    this.easelStage = new Stage(this.canvas);
    Ticker.addListener(this);
    Ticker.setFPS(framesPerSecond);
    this.stats = new Stats();
    document.getElementById('footer').appendChild(this.stats.domElement);
    debugCanvas = document.getElementById(debugCanvasID);
    debugCanvas.height = WORLD_HEIGHT_PIXELS;
    debugCanvas.width = WORLD_WIDTH_PIXELS;
    debugDraw = new Box2D.Dynamics.b2DebugDraw();
    debugDraw.SetSprite(debugCanvas.getContext("2d"));
    debugDraw.SetDrawScale(PIXELS_PER_METER);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
    this.box2dWorld.SetDebugDraw(debugDraw);
    this.game = new Game(this.box2dWorld, this.easelStage);
  }

  Main.prototype.tick = function() {
    this.box2dWorld.Step(1 / Ticker.getMeasuredFPS(), 10, 10);
    this.game.update();
    this.easelStage.update();
    this.box2dWorld.DrawDebugData();
    this.box2dWorld.ClearForces();
    return this.stats.update();
  };

  return Main;

})();

EaselBox2dObject = (function() {

  function EaselBox2dObject(b2dWorld, easelStage, static_dynamic_type, attributes, easelObj, box2dShape) {
    var angleDegrees, bodyDef, fixDef, xMeters, xPixels, yMeters, yPixels;
    this.easelObj = easelObj;
    xMeters = attributes.initXMeters;
    yMeters = attributes.initYMeters;
    xPixels = xMeters * PIXELS_PER_METER;
    yPixels = yMeters * PIXELS_PER_METER;
    angleDegrees = attributes.angleDegrees || 0;
    this.easelObj.x = xPixels;
    this.easelObj.y = yPixels;
    this.easelObj.rotation = angleDegrees;
    easelStage.addChild(this.easelObj);
    fixDef = new Box2D.Dynamics.b2FixtureDef;
    fixDef.density = attributes.density || 1;
    fixDef.friction = attributes.friction || 0.5;
    fixDef.restitution = attributes.restitution || 0.2;
    fixDef.shape = box2dShape;
    bodyDef = new Box2D.Dynamics.b2BodyDef;
    bodyDef.position.x = xMeters;
    bodyDef.position.y = yMeters;
    bodyDef.angle = Math.PI * angleDegrees / 180;
    bodyDef.angularVelocity = attributes.angularVelocity || 0;
    bodyDef.linearVelocity = new Box2D.Common.Math.b2Vec2(attributes.initXVelocity, attributes.initYVelocity);
    if ('dynamic' === static_dynamic_type) {
      bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    } else if ('static' === static_dynamic_type) {
      bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
    } else if ('kinematic' === static_dynamic_type) {
      bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
    }
    this.body = b2dWorld.CreateBody(bodyDef);
    this.body.CreateFixture(fixDef);
  }

  EaselBox2dObject.prototype.update = function() {
    this.easelObj.x = this.body.GetPosition().x * PIXELS_PER_METER;
    this.easelObj.y = this.body.GetPosition().y * PIXELS_PER_METER;
    return this.easelObj.rotation = this.body.GetAngle() * (180 / Math.PI);
  };

  EaselBox2dObject.prototype.setRenderPosition = function(xPixels, yPixels) {
    this.easelObj.x = xPixels;
    return this.easelObj.y = yPixels;
  };

  return EaselBox2dObject;

})();

EaselBox2dImage = (function(_super) {

  __extends(EaselBox2dImage, _super);

  function EaselBox2dImage(b2dWorld, easelStage, body_type, img_src, attributes) {
    var bMap, box2dShape, heightMeters, heightPixels, radiusMeters, widthMeters, widthPixels;
    bMap = new Bitmap(img_src);
    if (attributes.imgRadiusPixels) {
      radiusMeters = attributes.imgRadiusPixels / PIXELS_PER_METER;
      box2dShape = new Box2D.Collision.Shapes.b2CircleShape(radiusMeters);
      bMap.regX = attributes.imgRadiusPixels;
      bMap.regY = attributes.imgRadiusPixels;
    } else {
      widthPixels = attributes.imgWidthPixels;
      heightPixels = attributes.imgHeightPixels;
      bMap.regX = widthPixels / 2;
      bMap.regY = heightPixels / 2;
      widthMeters = (widthPixels / 2) / PIXELS_PER_METER;
      heightMeters = (heightPixels / 2) / PIXELS_PER_METER;
      box2dShape = new Box2D.Collision.Shapes.b2PolygonShape.AsBox(widthMeters, heightMeters);
    }
    EaselBox2dImage.__super__.constructor.call(this, b2dWorld, easelStage, body_type, attributes, bMap, box2dShape);
  }

  return EaselBox2dImage;

})(EaselBox2dObject);

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
