class EaselBox2dObject
  constructor: (b2dWorld, easelStage, static_dynamic_type, attributes, @easelObj, box2dShape) -> 
    xMeters = attributes.initXMeters
    yMeters = attributes.initYMeters
    xPixels = xMeters * PIXELS_PER_METER
    yPixels = yMeters * PIXELS_PER_METER
    angleDegrees = attributes.angleDegrees or 0

    # for Easel
    @easelObj.x = xPixels
    @easelObj.y = yPixels
    @easelObj.rotation = angleDegrees
    easelStage.addChild @easelObj
    
    # for Box2d
    fixDef = new Box2D.Dynamics.b2FixtureDef
    fixDef.density = (attributes.density or 1)
    fixDef.friction = (attributes.friction or 0.5)
    fixDef.restitution = (attributes.restitution or 0.2)
    fixDef.shape = box2dShape
    
    bodyDef = new Box2D.Dynamics.b2BodyDef
    bodyDef.position.x = xMeters
    bodyDef.position.y = yMeters
    bodyDef.angle = Math.PI * angleDegrees / 180 
    bodyDef.angularVelocity = (attributes.angularVelocity or 0)
    bodyDef.linearVelocity = new Box2D.Common.Math.b2Vec2(attributes.initXVelocity, attributes.initYVelocity)
    if 'dynamic' == static_dynamic_type
      bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody
    else if 'static' == static_dynamic_type
      bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody
    else if 'kinematic' == static_dynamic_type
      bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody
    
    @body = b2dWorld.CreateBody(bodyDef)
    @body.CreateFixture fixDef
    
  update: ->
    @easelObj.x = @body.GetPosition().x * PIXELS_PER_METER
    @easelObj.y = @body.GetPosition().y * PIXELS_PER_METER
    @easelObj.rotation = @body.GetAngle() * (180 / Math.PI)
  
