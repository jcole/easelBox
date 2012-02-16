var EaselBox2dImage, EaselBox2dObject, EaselBox2dWorld,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

EaselBox2dObject = (function() {
  var body, getType;

  body = null;

  function EaselBox2dObject(easelObj, box2dShape, staticDynamicType, pixelsPerMeter, options) {
    var angleDegrees, xMeters, xPixels, yMeters, yPixels;
    this.easelObj = easelObj;
    this.pixelsPerMeter = pixelsPerMeter;
    xMeters = options.initXMeters;
    yMeters = options.initYMeters;
    xPixels = xMeters * this.pixelsPerMeter;
    yPixels = yMeters * this.pixelsPerMeter;
    angleDegrees = options.angleDegrees || 0;
    this.easelObj.x = xPixels;
    this.easelObj.y = yPixels;
    this.easelObj.rotation = angleDegrees;
    this.fixDef = new Box2D.Dynamics.b2FixtureDef;
    this.fixDef.density = options.density || 1;
    this.fixDef.friction = options.friction || 0.5;
    this.fixDef.restitution = options.restitution || 0.2;
    this.fixDef.shape = box2dShape;
    this.bodyDef = new Box2D.Dynamics.b2BodyDef;
    this.bodyDef.position.x = xMeters;
    this.bodyDef.position.y = yMeters;
    this.bodyDef.angle = Math.PI * angleDegrees / 180;
    this.bodyDef.angularVelocity = options.angularVelocity || 0;
    this.bodyDef.linearVelocity = new Box2D.Common.Math.b2Vec2(options.initXVelocity || 0, options.initYVelocity || 0);
    if ('dynamic' === staticDynamicType) {
      this.bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    } else if ('static' === staticDynamicType) {
      this.bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
    } else if ('kinematic' === staticDynamicType) {
      this.bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
    }
  }

  EaselBox2dObject.prototype.update = function() {
    this.easelObj.x = this.body.GetPosition().x * this.pixelsPerMeter;
    this.easelObj.y = this.body.GetPosition().y * this.pixelsPerMeter;
    return this.easelObj.rotation = this.body.GetAngle() * (180 / Math.PI);
  };

  EaselBox2dObject.prototype.setPosition = function(xMeters, yMeters) {
    this.easelObj.x = xMeters * this.pixelsPerMeter;
    this.easelObj.y = yMeters * this.pixelsPerMeter;
    this.body.GetPosition().x = xMeters;
    return this.body.GetPosition().y = yMeters;
  };

  EaselBox2dObject.prototype.setType = function(type) {
    return this.body.SetType(getType(type));
  };

  getType = function(type) {
    if ('dynamic' === type) {
      return Box2D.Dynamics.b2Body.b2_dynamicBody;
    } else if ('static' === type) {
      return Box2D.Dynamics.b2Body.b2_staticBody;
    } else if ('kinematic' === type) {
      return Box2D.Dynamics.b2Body.b2_kinematicBody;
    }
  };

  return EaselBox2dObject;

})();

EaselBox2dImage = (function(_super) {

  __extends(EaselBox2dImage, _super);

  function EaselBox2dImage(imgSrc, staticDynamicType, pixelsPerMeter, options) {
    var bMap, box2dShape, heightMeters, heightPixels, radiusMeters, widthMeters, widthPixels;
    bMap = new Bitmap(imgSrc);
    if (options.imgRadiusPixels) {
      radiusMeters = options.imgRadiusPixels / pixelsPerMeter;
      box2dShape = new Box2D.Collision.Shapes.b2CircleShape(radiusMeters);
      bMap.regX = options.imgRadiusPixels;
      bMap.regY = options.imgRadiusPixels;
    } else {
      widthPixels = options.imgWidthPixels;
      heightPixels = options.imgHeightPixels;
      bMap.regX = widthPixels / 2;
      bMap.regY = heightPixels / 2;
      widthMeters = (widthPixels / 2) / pixelsPerMeter;
      heightMeters = (heightPixels / 2) / pixelsPerMeter;
      box2dShape = new Box2D.Collision.Shapes.b2PolygonShape.AsBox(widthMeters, heightMeters);
    }
    EaselBox2dImage.__super__.constructor.call(this, bMap, box2dShape, staticDynamicType, pixelsPerMeter, options);
  }

  return EaselBox2dImage;

})(EaselBox2dObject);

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
