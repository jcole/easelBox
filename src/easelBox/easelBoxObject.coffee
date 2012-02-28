class window.EaselBoxObject
  
  constructor: (@easelObj, box2dShape, options) -> 
    density = (options and options.density) or 1
    friction = (options and options.friction) or 0.5
    restitution = (options and options.restitution) or 0.2
         
    # for Box2d
    @fixDef = new Box2D.Dynamics.b2FixtureDef
    @fixDef.density = density
    @fixDef.friction = friction
    @fixDef.restitution = restitution
    @fixDef.shape = box2dShape
  
    @bodyDef = new Box2D.Dynamics.b2BodyDef
    @body = null
  
  # update canvas position based on physical position
  update: ->
    @easelObj.x = @body.GetPosition().x * PIXELS_PER_METER
    @easelObj.y = @body.GetPosition().y * PIXELS_PER_METER
    @easelObj.rotation = @body.GetAngle() * (180 / Math.PI)
    
  setType: (type) ->
    @body.SetType(getType(type))
  
  setState: (options) ->
    # let's do all the conversions here for you, so you can specify properties in either 
    # pixels or meters, and degrees or radians

    if options and options.xPixels
      xPixels = options.xPixels
      xMeters = xPixels / PIXELS_PER_METER
    else if options and options.Xmeters
      xMeters = options.Xmeters
      xPixels = xMeters * PIXELS_PER_METER
    else
      xMeters = 0
      xPixels = 0
      
    if options and options.yPixels
      yPixels = options.yPixels
      yMeters = yPixels / PIXELS_PER_METER
    else if options and options.Xmeters
      yMeters = options.Ymeters
      yPixels = YMeters * PIXELS_PER_METER
    else
      yMeters = 0
      yPixels = 0
    
    if options and options.xVelPixels
      xVelPixels = options.xVelPixels
      xVelMeters = xVelPixels / PIXELS_PER_METER
    else if options and options.xVelMeters
      xVelMeters = options.xVelMeters
      xVelPixels = xVelMeters * PIXELS_PER_METER
    else
      xVelMeters = 0
      xVelPixels = 0
          
    if options and options.yVelPixels
      yVelPixels = options.yVelPixels
      yVelMeters = yVelPixels / PIXELS_PER_METER
    else if options and options.yVelMeters
      yVelMeters = options.yVelMeters
      yVelPixels = yVelMeters * PIXELS_PER_METER
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
    
    # for Easel
    @easelObj.x = xPixels
    @easelObj.y = yPixels
    @easelObj.rotation = angleDegrees

    # for box2d
    @body.GetPosition().x = xMeters
    @body.GetPosition().y = yMeters
    @body.SetAngle(angleRadians)
    @body.SetAngularVelocity(angularVelRadians)
    @body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(xVelMeters, yVelMeters))
    
  getType = (type) ->
    if 'dynamic' == type
      Box2D.Dynamics.b2Body.b2_dynamicBody
    else if 'static' == type
      Box2D.Dynamics.b2Body.b2_staticBody
    else if 'kinematic' == type
      Box2D.Dynamics.b2Body.b2_kinematicBody
    