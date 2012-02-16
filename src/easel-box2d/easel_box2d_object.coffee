class EaselBox2dObject
  body = null
  
  constructor: (@easelObj, box2dShape, staticDynamicType, @pixelsPerMeter, options) -> 
    xMeters = options.initXMeters
    yMeters = options.initYMeters
    xPixels = xMeters * @pixelsPerMeter
    yPixels = yMeters * @pixelsPerMeter
    angleDegrees = options.angleDegrees or 0

    # for Easel
    @easelObj.x = xPixels
    @easelObj.y = yPixels
    @easelObj.rotation = angleDegrees
    
    # for Box2d
    @fixDef = new Box2D.Dynamics.b2FixtureDef
    @fixDef.density = (options.density or 1)
    @fixDef.friction = (options.friction or 0.5)
    @fixDef.restitution = (options.restitution or 0.2)
    @fixDef.shape = box2dShape
    
    @bodyDef = new Box2D.Dynamics.b2BodyDef
    @bodyDef.position.x = xMeters
    @bodyDef.position.y = yMeters
    @bodyDef.angle = Math.PI * angleDegrees / 180 
    @bodyDef.angularVelocity = (options.angularVelocity or 0)
    @bodyDef.linearVelocity = new Box2D.Common.Math.b2Vec2(options.initXVelocity or 0, options.initYVelocity or 0)
    
    if 'dynamic' == staticDynamicType
      @bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody
    else if 'static' == staticDynamicType
      @bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody
    else if 'kinematic' == staticDynamicType
      @bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody
        
  update: ->
    @easelObj.x = @body.GetPosition().x * @pixelsPerMeter
    @easelObj.y = @body.GetPosition().y * @pixelsPerMeter
    @easelObj.rotation = @body.GetAngle() * (180 / Math.PI)
  
  setPosition: (xMeters, yMeters) ->
    @easelObj.x = xMeters * @pixelsPerMeter
    @easelObj.y = yMeters * @pixelsPerMeter
    @body.GetPosition().x = xMeters
    @body.GetPosition().y = yMeters
    
  setType: (type) ->
    @body.SetType(getType(type))
    
  getType = (type) ->
    if 'dynamic' == type
      Box2D.Dynamics.b2Body.b2_dynamicBody
    else if 'static' == type
      Box2D.Dynamics.b2Body.b2_staticBody
    else if 'kinematic' == type
      Box2D.Dynamics.b2Body.b2_kinematicBody
    