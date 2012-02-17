class EaselBoxObject
  body = null
  
  constructor: (@easelObj, box2dShape, staticDynamicType, @pixelsPerMeter, options) -> 
    # let's do all the conversions here for you, so you can specify properties in either 
    # pixels or meters, and degrees or radians
    
    if options and options.xPixels
      xPixels = options.xPixels
      xMeters = xPixels / @pixelsPerMeter
    else if options and options.Xmeters
      xMeters = options.Xmeters
      xPixels = xMeters * @pixelsPerMeter
    else
      xMeters = 0
      xPixels = 0
      
    if options and options.yPixels
      yPixels = options.yPixels
      yMeters = yPixels / @pixelsPerMeter
    else if options and options.Xmeters
      yMeters = options.Ymeters
      yPixels = YMeters * @pixelsPerMeter
    else
      yMeters = 0
      yPixels = 0
    
    if options and options.xVelPixels
      xVelPixels = options.xVelPixels
      xVelMeters = xVelPixels / @pixelsPerMeter
    else if options and options.xVelMeters
      xVelMeters = options.xVelMeters
      xVelPixels = xVelMeters * @pixelsPerMeter
    else
      xVelMeters = 0
      xVelPixels = 0
          
    if options and options.yVelPixels
      yVelPixels = options.yVelPixels
      yVelMeters = yVelPixels / @pixelsPerMeter
    else if options and options.yVelMeters
      yVelMeters = options.yVelMeters
      yVelPixels = yVelMeters * @pixelsPerMeter
    else
      yVelMeters = 0
      yVelPixels = 0
      
    if options and options.angleDegrees
      angleDegrees = options.angleDegrees
      angleRadians = Math.PI * angleDegrees / 180 
    else if options and options.angleRadians
      angleRadians = options.angleRadians
      angleDegrees = 180 * angleRadians / Math.PI
    else
      angleRadians = 0
      angleDegrees = 0
      
    if options and options.angularVelRadians
      angularVelRadians = options.angularVelRadians
      angularVelDegrees = 180 * angularVelRadians / Math.PI
    else if options and options.angularVelDegrees
      angularVelDegrees = options.angularVelDegrees
      angularVelRadians = Math.PI * angularVelDegrees / 180 
    else
      angularVelDegrees = 0
      angularVelRadians = 0     

    density = (options and options.density) or 1
    friction = (options and options.friction) or 0.5
    restitution = (options and options.restitution) or 0.2
     
    # for Easel
    @easelObj.x = xPixels
    @easelObj.y = yPixels
    @easelObj.rotation = angleDegrees
    
    # for Box2d
    @fixDef = new Box2D.Dynamics.b2FixtureDef
    @fixDef.density = density
    @fixDef.friction = friction
    @fixDef.restitution = restitution
    @fixDef.shape = box2dShape
  
    @bodyDef = new Box2D.Dynamics.b2BodyDef
    @bodyDef.position.x = xMeters
    @bodyDef.position.y = yMeters
    @bodyDef.angle = angleRadians
    @bodyDef.angularVelocity = angularVelRadians
    @bodyDef.linearVelocity = new Box2D.Common.Math.b2Vec2(xVelMeters, yVelMeters)
    
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
    