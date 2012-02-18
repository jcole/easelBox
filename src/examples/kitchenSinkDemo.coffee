class KitchenSinkDemo
  # to set up Easel-Box2d world
  pixelsPerMeter = 30
  gravityX = 0
  gravityY = 0
  # game-specific
  frameRate = 20
  gravitationalConstant = 1.5
  
  constructor: (canvas, debugCanvas, statsCanvas) ->    
    @world = new EaselBoxWorld(this, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter)
    
    @world.addEntity( 
      new EaselBoxCircle(radius=30), 
      'dynamic',
      {
        xPixels: canvas.width / 2,
        yPixels: canvas.height / 2,
        angleRadians: 45,
        angularVelRadians: 2
      })    

    
    @world.addEntity( 
      new EaselBoxCircle(radius=20, imgSrc: '/img/exorcist_40x50.png'), 
      'dynamic',
      {
        xPixels: canvas.width * 3 / 4,
        yPixels: canvas.height * 3 / 4,
      })

    for i in [0..5]
      @world.addEntity( 
        new EaselBoxCircle(radius=4, {imgSrc: '/img/sparkle_21x23.png', frames: {width:21, height:23, regX:10, regY:11}}), 
        'dynamic',
        {
          xPixels: canvas.width * i / 5,
          yPixels: 10,
        })

    customCircle = new EaselBoxCircle(radius=15)      
    customCircle.easelObj.graphics.beginRadialGradientFill(["#000", "#00fa4b"], [0.1, .9], 0, 0, 0, 0, 0, 15).drawCircle(0, 0, 15).beginFill("#FFF").drawRect(0, -1, 15, 2) 
    @world.addEntity( 
      customCircle, 
      'dynamic',
      {
       xPixels: canvas.width * 3 / 4,
       yPixels: canvas.height * 1 / 4,
       angularVelRadians: -1
      })        
 
    @world.addEntity(
     new EaselBoxRectangle(width=30, height=20),
     'dynamic',
     {
       xPixels: canvas.width * 1 / 4,
       yPixels: canvas.height * 3 / 4,
       xVelPixels: 10,
       yVelPixels: -15,
       angularVelRadians: 2,
     })
     
    customRectangle = new EaselBoxRectangle(width=50, height=150, imgSrc: "/img/catapult_50x150.png")
    @world.addEntity(
      customRectangle,
      'dynamic',
      {
        xPixels: canvas.width * 5 / 6,
        yPixels: canvas.height * 1 / 2,
      })
     
  
    # optional: set up frame rate display
    @stats = new Stats()
    statsCanvas.appendChild @stats.domElement
  
  tick: () ->
    @stats.update()
    for object1 in @world.objects
      for object2 in @world.objects
        applyGravities object1, object2 unless object1 == object2

  # some low-level Box2d action here
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
    
    
