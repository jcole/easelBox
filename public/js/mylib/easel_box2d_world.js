var EaselBox2dWorld;

EaselBox2dWorld = (function() {
  var minFPS;

  minFPS = 10;

  function EaselBox2dWorld(gameObj, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter) {
    var debugDraw;
    this.gameObj = gameObj;
    this.pixelsPerMeter = pixelsPerMeter;
    Ticker.addListener(this);
    Ticker.setFPS(frameRate);
    this.box2dWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(gravityX, gravityY), true);
    this.easelStage = new Stage(canvas);
    this.objects = [];
    debugDraw = new Box2D.Dynamics.b2DebugDraw();
    debugDraw.SetSprite(debugCanvas.getContext("2d"));
    debugDraw.SetDrawScale(this.pixelsPerMeter);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
    this.box2dWorld.SetDebugDraw(debugDraw);
  }

  EaselBox2dWorld.prototype.addEntity = function(type, staticType, options) {
    var object;
    object = null;
    if (type === 'bitmap') {
      object = new EaselBox2dImage(options.imgSrc, staticType, this.pixelsPerMeter, options);
    }
    this.easelStage.addChild(object.easelObj);
    object.body = this.box2dWorld.CreateBody(object.bodyDef);
    object.body.CreateFixture(object.fixDef);
    this.objects.push(object);
    return object;
  };

  EaselBox2dWorld.prototype.addImage = function(imgSrc, options) {
    var obj, property, value;
    obj = new Bitmap(imgSrc);
    for (property in options) {
      value = options[property];
      obj[property] = value;
    }
    return this.easelStage.addChild(obj);
  };

  EaselBox2dWorld.prototype.tick = function() {
    var object, _i, _len, _ref;
    if (Ticker.getMeasuredFPS() > minFPS) {
      this.box2dWorld.Step(1 / Ticker.getMeasuredFPS(), 10, 10);
      this.box2dWorld.ClearForces();
      _ref = this.objects;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        object = _ref[_i];
        object.update();
      }
    }
    if (typeof this.gameObj.step === 'function') this.gameObj.step();
    this.easelStage.update();
    return this.box2dWorld.DrawDebugData();
  };

  EaselBox2dWorld.vector = function(x, y) {
    return new Box2D.Common.Math.b2Vec2(x, y);
  };

  return EaselBox2dWorld;

})();
