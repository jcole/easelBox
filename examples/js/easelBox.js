var EASEL_BOX_PIXELS_PER_METER, EaselBoxCircle, EaselBoxImage, EaselBoxObject, EaselBoxRectangle, EaselBoxWorld,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

EaselBoxObject = (function() {
  var body, getType;

  body = null;

  function EaselBoxObject(easelObj, box2dShape, staticDynamicType, pixelsPerMeter, options) {
    var angleDegrees, angleRadians, angularVelDegrees, angularVelRadians, density, friction, restitution, xMeters, xPixels, xVelMeters, xVelPixels, yMeters, yPixels, yVelMeters, yVelPixels;
    this.easelObj = easelObj;
    this.pixelsPerMeter = pixelsPerMeter;
    if (options && options.xPixels) {
      xPixels = options.xPixels;
      xMeters = xPixels / this.pixelsPerMeter;
    } else if (options && options.Xmeters) {
      xMeters = options.Xmeters;
      xPixels = xMeters * this.pixelsPerMeter;
    } else {
      xMeters = 0;
      xPixels = 0;
    }
    if (options && options.yPixels) {
      yPixels = options.yPixels;
      yMeters = yPixels / this.pixelsPerMeter;
    } else if (options && options.Xmeters) {
      yMeters = options.Ymeters;
      yPixels = YMeters * this.pixelsPerMeter;
    } else {
      yMeters = 0;
      yPixels = 0;
    }
    if (options && options.xVelPixels) {
      xVelPixels = options.xVelPixels;
      xVelMeters = xVelPixels / this.pixelsPerMeter;
    } else if (options && options.xVelMeters) {
      xVelMeters = options.xVelMeters;
      xVelPixels = xVelMeters * this.pixelsPerMeter;
    } else {
      xVelMeters = 0;
      xVelPixels = 0;
    }
    if (options && options.yVelPixels) {
      yVelPixels = options.yVelPixels;
      yVelMeters = yVelPixels / this.pixelsPerMeter;
    } else if (options && options.yVelMeters) {
      yVelMeters = options.yVelMeters;
      yVelPixels = yVelMeters * this.pixelsPerMeter;
    } else {
      yVelMeters = 0;
      yVelPixels = 0;
    }
    if (options && options.angleDegrees) {
      angleDegrees = options.angleDegrees;
      angleRadians = Math.PI * angleDegrees / 180;
    } else if (options && options.angleRadians) {
      angleRadians = options.angleRadians;
      angleDegrees = 180 * angleRadians / Math.PI;
    } else {
      angleRadians = 0;
      angleDegrees = 0;
    }
    if (options && options.angularVelRadians) {
      angularVelRadians = options.angularVelRadians;
      angularVelDegrees = 180 * angularVelRadians / Math.PI;
    } else if (options && options.angularVelDegrees) {
      angularVelDegrees = options.angularVelDegrees;
      angularVelRadians = Math.PI * angularVelDegrees / 180;
    } else {
      angularVelDegrees = 0;
      angularVelRadians = 0;
    }
    density = (options && options.density) || 1;
    friction = (options && options.friction) || 0.5;
    restitution = (options && options.restitution) || 0.2;
    this.easelObj.x = xPixels;
    this.easelObj.y = yPixels;
    this.easelObj.rotation = angleDegrees;
    this.fixDef = new Box2D.Dynamics.b2FixtureDef;
    this.fixDef.density = density;
    this.fixDef.friction = friction;
    this.fixDef.restitution = restitution;
    this.fixDef.shape = box2dShape;
    this.bodyDef = new Box2D.Dynamics.b2BodyDef;
    this.bodyDef.position.x = xMeters;
    this.bodyDef.position.y = yMeters;
    this.bodyDef.angle = angleRadians;
    this.bodyDef.angularVelocity = angularVelRadians;
    this.bodyDef.linearVelocity = new Box2D.Common.Math.b2Vec2(xVelMeters, yVelMeters);
    if ('dynamic' === staticDynamicType) {
      this.bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    } else if ('static' === staticDynamicType) {
      this.bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
    } else if ('kinematic' === staticDynamicType) {
      this.bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
    }
  }

  EaselBoxObject.prototype.update = function() {
    this.easelObj.x = this.body.GetPosition().x * this.pixelsPerMeter;
    this.easelObj.y = this.body.GetPosition().y * this.pixelsPerMeter;
    return this.easelObj.rotation = this.body.GetAngle() * (180 / Math.PI);
  };

  EaselBoxObject.prototype.setPosition = function(xMeters, yMeters) {
    this.easelObj.x = xMeters * this.pixelsPerMeter;
    this.easelObj.y = yMeters * this.pixelsPerMeter;
    this.body.GetPosition().x = xMeters;
    return this.body.GetPosition().y = yMeters;
  };

  EaselBoxObject.prototype.setType = function(type) {
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

  return EaselBoxObject;

})();

EaselBoxImage = (function(_super) {

  __extends(EaselBoxImage, _super);

  function EaselBoxImage(imgSrc, staticDynamicType, pixelsPerMeter, options) {
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
    EaselBoxImage.__super__.constructor.call(this, bMap, box2dShape, staticDynamicType, pixelsPerMeter, options);
  }

  return EaselBoxImage;

})(EaselBoxObject);

EaselBoxCircle = (function(_super) {

  __extends(EaselBoxCircle, _super);

  function EaselBoxCircle(staticDynamicType, pixelsPerMeter, options) {
    var box2dShape, object, radiusMeters, radiusPixels;
    if (options == null) options = null;
    if (options && options.radiusMeters) {
      radiusMeters = options.radiusMeters;
      radiusPixels = radiusMeters * pixelsPerMeter;
    } else if (options && options.radiusPixels) {
      radiusPixels = options.radiusPixels;
      radiusMeters = radiusPixels / pixelsPerMeter;
    } else {
      radiusMeters = 1;
      radiusPixels = radiusMeters * pixelsPerMeter;
    }
    box2dShape = new Box2D.Collision.Shapes.b2CircleShape(radiusMeters);
    object = null;
    if (options && options.imgSrc) {
      object = new Bitmap(options.imgSrc);
      object.regX = radiusPixels;
      object.regY = radiusPixels;
    } else {
      object = new Shape();
      object.graphics.beginRadialGradientFill(["#F00", "#00F"], [0.1, .9], 0, 0, 0, 0, 0, radiusPixels).drawCircle(0, 0, radiusPixels).beginFill("#FFF").drawRect(0, -1, radiusPixels, 2);
    }
    EaselBoxCircle.__super__.constructor.call(this, object, box2dShape, staticDynamicType, pixelsPerMeter, options);
  }

  return EaselBoxCircle;

})(EaselBoxObject);

EaselBoxRectangle = (function(_super) {

  __extends(EaselBoxRectangle, _super);

  function EaselBoxRectangle(staticDynamicType, pixelsPerMeter, options) {
    var box2dShape, heightMeters, heightPixels, shape, widthMeters, widthPixels;
    if (options == null) options = null;
    if (options && options.widthMeters) {
      widthMeters = options.widthMeters;
      widthPixels = widthMeters * pixelsPerMeter;
    } else if (options && options.widthPixels) {
      widthPixels = options.widthPixels;
      widthMeters = widthPixels / pixelsPerMeter;
    } else {
      widthMeters = 1;
      widthPixels = widthMeters * pixelsPerMeter;
    }
    if (options && options.heightMeters) {
      heightMeters = options.heightMeters;
      heightPixels = heightMeters * pixelsPerMeter;
    } else if (options && options.heightPixels) {
      heightPixels = options.heightPixels;
      heightMeters = heightPixels / pixelsPerMeter;
    } else {
      heightMeters = 1;
      heightPixels = heightMeters * pixelsPerMeter;
    }
    box2dShape = new Box2D.Collision.Shapes.b2PolygonShape.AsBox(widthMeters / 2, heightMeters / 2);
    shape = new Shape();
    shape.graphics.beginLinearGradientFill(["#F00", "#00F"], [0, 0.5], -widthPixels / 2, 0, widthPixels, 0).drawRect(-widthPixels / 2, -heightPixels / 2, widthPixels, heightPixels);
    EaselBoxRectangle.__super__.constructor.call(this, shape, box2dShape, staticDynamicType, pixelsPerMeter, options);
  }

  return EaselBoxRectangle;

})(EaselBoxObject);

EASEL_BOX_PIXELS_PER_METER = 30;

EaselBoxWorld = (function() {
  var minFPS;

  minFPS = 10;

  function EaselBoxWorld(callingObj, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter) {
    var debugDraw;
    this.callingObj = callingObj;
    this.pixelsPerMeter = pixelsPerMeter;
    EASEL_BOX_PIXELS_PER_METER = this.pixelsPerMeter;
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

  EaselBoxWorld.prototype.createEntity = function(type, staticDynamicType, options) {
    var object;
    object = null;
    if (type === 'bitmap') {
      object = new EaselBoxImage(options.imgSrc, staticDynamicType, this.pixelsPerMeter, options);
    } else if (type === 'circle') {
      object = new EaselBoxCircle(staticDynamicType, this.pixelsPerMeter, options);
    } else if (type === 'rectangle') {
      object = new EaselBoxRectangle(staticDynamicType, this.pixelsPerMeter, options);
    }
    this.easelStage.addChild(object.easelObj);
    object.body = this.box2dWorld.CreateBody(object.bodyDef);
    object.body.CreateFixture(object.fixDef);
    this.objects.push(object);
    return object;
  };

  EaselBoxWorld.prototype.addImage = function(imgSrc, options) {
    var obj, property, value;
    obj = new Bitmap(imgSrc);
    for (property in options) {
      value = options[property];
      obj[property] = value;
    }
    return this.easelStage.addChild(obj);
  };

  EaselBoxWorld.prototype.tick = function() {
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
    if (typeof this.callingObj.tick === 'function') this.callingObj.tick();
    this.easelStage.update();
    return this.box2dWorld.DrawDebugData();
  };

  EaselBoxWorld.prototype.vector = function(x, y) {
    return new Box2D.Common.Math.b2Vec2(x, y);
  };

  return EaselBoxWorld;

})();
