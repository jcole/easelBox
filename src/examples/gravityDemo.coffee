class GravityDemo
  # to set up Easel-Box2d world
  pixelsPerMeter = 30
  gravityX = 0
  gravityY = 0
  # game-specific
  frameRate = 20
  gravitationalConstant = 1.5
  
  constructor: (canvas, debugCanvas, statsCanvas) ->    
    @world = new EaselBoxWorld(this, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter)
    
    @objects = [@world.addEntity(
      new EaselBoxCircle({
        xPixels: canvas.width / 2,
        yPixels: canvas.height / 2,
        angularVelRadians: 1
      }),
      'dynamic',
      )]
    
    #   @world.createEntity(
    #     'circle',
    #     'dynamic',
    #     {
    #       xPixels: canvas.width * 3 / 4,
    #       yPixels: canvas.height * 1 / 2,
    #     }),
    # 
    # @world.createEntity(
    #    'circle',
    #    'dynamic',
    #    {
    #      imgSrc: '/img/exorcist_40x50.png',
    #      radiusPixels: 20,
    #      xPixels: canvas.width * 1 / 4,
    #      yPixels: canvas.height * 1 / 2,
    #    }),
    #        
    #  customRenderBall = @world.createEntity(
    #   'circle',
    #   'dynamic',
    #   {
    #     radiusPixels: 15,
    #     xPixels: canvas.width / 4,
    #     yPixels: canvas.height / 4,
    #     angularVelRadians: -1,
    #     xVelPixels: -6,
    #     yVelPixels: 8
    #   }),
    #   
    #   @world.createEntity(
    #    'rectangle',
    #    'dynamic',
    #    {
    #      widthPixels: 30,
    #      heightPixels: 20,
    #      xPixels: canvas.width * 3 / 4,
    #      yPixels: canvas.height * 3 / 4,
    #      xVelPixels: 10,
    #      yVelPixels: -15,
    #      angularVelRadians: 2,
    #    }),]

    customRenderBall.easelObj.graphics.beginRadialGradientFill(["#000", "#00fa4b"], [0.1, .9], 0, 0, 0, 0, 0, 15).drawCircle(0, 0, 15).beginFill("#FFF").drawRect(0, -1, 15, 2) 
     
    # optional: set up frame rate display
    @stats = new Stats()
    statsCanvas.appendChild @stats.domElement
     
  tick: () ->
    @stats.update()
    for object1 in @objects
      for object2 in @objects
        applyGravities object1, object2 unless object1 == object2

  # # some low-level Box2d action here
  applyGravities = (obj1, obj2) ->
    pos1 = obj1.body.GetWorldCenter()
    pos2 = obj2.body.GetWorldCenter()
    diffVec = pos2.Copy()
    diffVec.Subtract(pos1)
    distSq = diffVec.LengthSquared()
    forceMagnitude = gravitationalConstant * obj1.body.GetMass() * obj2.body.GetMass() / distSq
    diffVec.Normalize()    
    diffVec.Multiply(forceMagnitude)
    obj1.body.ApplyForce(diffVec, pos1)
    
    
