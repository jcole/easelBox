# Sets up the Easel stage for drawing, and Box2D world for physics.
# Sets a timer to step through the physics, and then update the Easel stage accordingly.

PIXELS_PER_METER = 30
WORLD_WIDTH_PIXELS = 500
WORLD_HEIGHT_PIXELS = 400
WORLD_WIDTH_METERS = WORLD_WIDTH_PIXELS / PIXELS_PER_METER # meters, for Box2d lib
WORLD_HEIGHT_METERS = WORLD_HEIGHT_PIXELS /  PIXELS_PER_METER# meters, for Box2d lib

class Main
  framesPerSecond = 20 # target frames per second
  gravityX = 0
  gravityY = 10
  
  constructor: (canvasID, debugCanvasID, statsDivId) ->
    # set up main canvas
    @canvas = document.getElementById(canvasID)
    @canvas.height = WORLD_HEIGHT_PIXELS
    @canvas.width = WORLD_WIDTH_PIXELS

    # set up Box2d
    @box2dWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(gravityX, gravityY), true)

    # set up EaselJS
    @easelStage = new Stage(@canvas)
    # @easelStage.scaleX = SCALE
    # @easelStage.scaleY = SCALE
        
    # set up timing loop
    Ticker.addListener this
    Ticker.setFPS framesPerSecond

    # set up stats
    @stats = new Stats()
    document.getElementById(statsDivId).appendChild @stats.domElement

    # Set up Box2d debug drawing
    debugCanvas = document.getElementById(debugCanvasID)
    debugCanvas.height = WORLD_HEIGHT_PIXELS
    debugCanvas.width = WORLD_WIDTH_PIXELS
    debugDraw = new Box2D.Dynamics.b2DebugDraw()
    debugDraw.SetSprite debugCanvas.getContext("2d")
    debugDraw.SetDrawScale PIXELS_PER_METER
    debugDraw.SetFillAlpha 0.3
    debugDraw.SetLineThickness 1.0
    debugDraw.SetFlags Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit
    @box2dWorld.SetDebugDraw debugDraw
            
    @game = new Game(@box2dWorld, @easelStage)

  tick: () ->
    # setup Box2d physics
    @box2dWorld.Step (1 / Ticker.getMeasuredFPS()), 10, 10
  
    # update game logic based on new physical state
    @game.update()
        
    # update rendering
    @easelStage.update()
    @box2dWorld.DrawDebugData()
    @box2dWorld.ClearForces()
    @stats.update()
    