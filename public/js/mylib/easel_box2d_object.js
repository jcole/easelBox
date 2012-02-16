var EaselBox2dObject;

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
