EASEL_BOX_PIXELS_PER_METER = 30

class EaselBoxWorld
  minFPS = 10 # weird stuff happens when we step through the physics when the frame rate is lower than this
  
  constructor: (@callingObj, frameRate, canvas, debugCanvas, gravityX, gravityY, @pixelsPerMeter) -> 
    EASEL_BOX_PIXELS_PER_METER = @pixelsPerMeter
    
    Ticker.addListener this # set up timing loop -- obj must supply a tick() method
    Ticker.setFPS frameRate
                 
    # set up Box2d
    @box2dWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(gravityX, gravityY), true)

    # set up EaselJS
    @easelStage = new Stage(canvas)        

    # array of entities to update later
    @objects = []

    # Set up Box2d debug drawing
    debugDraw = new Box2D.Dynamics.b2DebugDraw()
    debugDraw.SetSprite debugCanvas.getContext("2d")
    debugDraw.SetDrawScale @pixelsPerMeter
    debugDraw.SetFillAlpha 0.3
    debugDraw.SetLineThickness 1.0
    debugDraw.SetFlags Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit
    @box2dWorld.SetDebugDraw debugDraw
      
  createEntity: (type, staticDynamicType, options) -> 
    object = null
    if type == 'bitmap'
      object = new EaselBoxImage(options.imgSrc, staticDynamicType, @pixelsPerMeter, options)
    else if type == 'circle'
      object = new EaselBoxCircle(staticDynamicType, @pixelsPerMeter, options)
    else if type == 'rectangle'
      object = new EaselBoxRectangle(staticDynamicType, @pixelsPerMeter, options)

    @easelStage.addChild object.easelObj
    object.body = @box2dWorld.CreateBody(object.bodyDef)
    object.body.CreateFixture(object.fixDef)
    @objects.push(object)
    return object
      
  addImage: (imgSrc, options) ->
    obj = new Bitmap(imgSrc)
    for property, value of options
      obj[property] = value
    @easelStage.addChild obj

  tick: ->
    if Ticker.getMeasuredFPS() > minFPS
      @box2dWorld.Step (1 / Ticker.getMeasuredFPS()), 10, 10 
      @box2dWorld.ClearForces()
      for object in @objects
        object.update()
    
    # check to see if main object has a callback for each tick
    if typeof @callingObj.tick == 'function'
      @callingObj.tick()
      
    @easelStage.update()
    @box2dWorld.DrawDebugData()
  
  vector: (x, y) ->
    new Box2D.Common.Math.b2Vec2(x, y)  