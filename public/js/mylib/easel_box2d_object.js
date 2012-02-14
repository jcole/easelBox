var EaselBox2dObject;

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
    bodyDef.linearVelocity = new Box2D.Common.Math.b2Vec2(attributes.initXVelocity || 0, attributes.initYVelocity || 0);
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

  EaselBox2dObject.prototype.setPosition = function(xMeters, yMeters) {
    this.easelObj.x = xMeters * PIXELS_PER_METER;
    this.easelObj.y = yMeters * PIXELS_PER_METER;
    this.body.GetPosition().x = xMeters;
    return this.body.GetPosition().y = yMeters;
  };

  return EaselBox2dObject;

})();
