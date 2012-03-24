(function() {
  var PIXELS_PER_METER,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.EaselBoxObject = (function() {
    var getType;

    function EaselBoxObject(easelObj, box2dShape, options) {
      var density, friction, restitution;
      this.easelObj = easelObj;
      density = (options && options.density) || 1;
      friction = (options && options.friction) || 0.5;
      restitution = (options && options.restitution) || 0.2;
      this.fixDef = new Box2D.Dynamics.b2FixtureDef;
      this.fixDef.density = density;
      this.fixDef.friction = friction;
      this.fixDef.restitution = restitution;
      this.fixDef.shape = box2dShape;
      this.bodyDef = new Box2D.Dynamics.b2BodyDef;
      this.body = null;
    }

    EaselBoxObject.prototype.update = function() {
      this.easelObj.x = this.body.GetPosition().x * PIXELS_PER_METER;
      this.easelObj.y = this.body.GetPosition().y * PIXELS_PER_METER;
      return this.easelObj.rotation = this.body.GetAngle() * (180 / Math.PI);
    };

    EaselBoxObject.prototype.setType = function(type) {
      return this.body.SetType(getType(type));
    };

    EaselBoxObject.prototype.setState = function(options) {
      var angleDegrees, angleRadians, angularVelDegrees, angularVelRadians, xMeters, xPixels, xVelMeters, xVelPixels, yMeters, yPixels, yVelMeters, yVelPixels;
      if (options && options.xPixels) {
        xPixels = options.xPixels;
        xMeters = xPixels / PIXELS_PER_METER;
      } else if (options && options.Xmeters) {
        xMeters = options.Xmeters;
        xPixels = xMeters * PIXELS_PER_METER;
      } else {
        xMeters = 0;
        xPixels = 0;
      }
      if (options && options.yPixels) {
        yPixels = options.yPixels;
        yMeters = yPixels / PIXELS_PER_METER;
      } else if (options && options.Xmeters) {
        yMeters = options.Ymeters;
        yPixels = YMeters * PIXELS_PER_METER;
      } else {
        yMeters = 0;
        yPixels = 0;
      }
      if (options && options.xVelPixels) {
        xVelPixels = options.xVelPixels;
        xVelMeters = xVelPixels / PIXELS_PER_METER;
      } else if (options && options.xVelMeters) {
        xVelMeters = options.xVelMeters;
        xVelPixels = xVelMeters * PIXELS_PER_METER;
      } else {
        xVelMeters = 0;
        xVelPixels = 0;
      }
      if (options && options.yVelPixels) {
        yVelPixels = options.yVelPixels;
        yVelMeters = yVelPixels / PIXELS_PER_METER;
      } else if (options && options.yVelMeters) {
        yVelMeters = options.yVelMeters;
        yVelPixels = yVelMeters * PIXELS_PER_METER;
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
      this.easelObj.x = xPixels;
      this.easelObj.y = yPixels;
      this.easelObj.rotation = angleDegrees;
      this.body.GetPosition().x = xMeters;
      this.body.GetPosition().y = yMeters;
      this.body.SetAngle(angleRadians);
      this.body.SetAngularVelocity(angularVelRadians);
      return this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(xVelMeters, yVelMeters));
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

  window.EaselBoxCircle = (function(_super) {

    __extends(EaselBoxCircle, _super);

    function EaselBoxCircle(radiusPixels, options) {
      var bmpAnim, box2dShape, data, object, radiusMeters;
      if (radiusPixels == null) radiusPixels = 20;
      if (options == null) options = null;
      radiusMeters = radiusPixels / PIXELS_PER_METER;
      box2dShape = new Box2D.Collision.Shapes.b2CircleShape(radiusMeters);
      object = null;
      if (options && options.imgSrc) {
        if (options && options.frames) {
          data = {
            images: [options.imgSrc],
            frames: options.frames
          };
          bmpAnim = new BitmapAnimation(new SpriteSheet(data));
          object = bmpAnim.clone();
          object.gotoAndPlay(options.startFrame | 0);
        } else {
          object = new Bitmap(options.imgSrc);
        }
        object.scaleX = options.scaleX || 1;
        object.scaleY = options.scaleY || 1;
        object.regX = radiusPixels;
        object.regY = radiusPixels;
      } else {
        object = new Shape();
        object.graphics.beginRadialGradientFill(["#F00", "#00F"], [0.1, .9], 0, 0, 0, 0, 0, radiusPixels).drawCircle(0, 0, radiusPixels).beginFill("#FFF").drawRect(0, -1, radiusPixels, 2);
      }
      EaselBoxCircle.__super__.constructor.call(this, object, box2dShape, options);
    }

    return EaselBoxCircle;

  })(EaselBoxObject);

  window.EaselBoxRectangle = (function(_super) {

    __extends(EaselBoxRectangle, _super);

    function EaselBoxRectangle(widthPixels, heightPixels, options) {
      var box2dShape, heightMeters, object, widthMeters;
      if (options == null) options = null;
      widthMeters = widthPixels / PIXELS_PER_METER;
      heightMeters = heightPixels / PIXELS_PER_METER;
      box2dShape = new Box2D.Collision.Shapes.b2PolygonShape.AsBox(widthMeters / 2, heightMeters / 2);
      object = null;
      if (options && options.imgSrc) {
        object = new Bitmap(options.imgSrc);
        object.regX = widthPixels / 2;
        object.regY = heightPixels / 2;
      } else {
        object = new Shape();
        object.graphics.beginLinearGradientFill(["#F00", "#00F"], [0, 0.5], -widthPixels / 2, 0, widthPixels, 0).drawRect(-widthPixels / 2, -heightPixels / 2, widthPixels, heightPixels);
      }
      EaselBoxRectangle.__super__.constructor.call(this, object, box2dShape, options);
    }

    return EaselBoxRectangle;

  })(EaselBoxObject);

  PIXELS_PER_METER = 30;

  window.EaselBoxWorld = (function() {
    var minFPS;

    minFPS = 10;

    function EaselBoxWorld(callingObj, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter) {
      var debugDraw;
      this.callingObj = callingObj;
      this.pixelsPerMeter = pixelsPerMeter;
      PIXELS_PER_METER = this.pixelsPerMeter;
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

    EaselBoxWorld.prototype.addEntity = function(options) {
      var object;
      object = null;
      if (options.radiusPixels) {
        object = new EaselBoxCircle(options.radiusPixels, options);
      } else {
        object = new EaselBoxRectangle(options.widthPixels, options.heightPixels, options);
      }
      this.easelStage.addChild(object.easelObj);
      object.body = this.box2dWorld.CreateBody(object.bodyDef);
      object.body.CreateFixture(object.fixDef);
      object.setType(options.type || 'dynamic');
      object.setState(options);
      this.objects.push(object);
      return object;
    };

    EaselBoxWorld.prototype.removeEntity = function(object) {
      this.box2dWorld.DestroyBody(object.body);
      return this.easelStage.removeChild(object.easelObj);
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

}).call(this);
