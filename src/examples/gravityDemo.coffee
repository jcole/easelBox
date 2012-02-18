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
    
    @world.addEntity( 
      new EaselBoxCircle(radius=15), 
      'dynamic',
      {
        xPixels: canvas.width * 2 / 3,
        yPixels: canvas.height * 2 / 3,
        angleRadians: 45,
        angularVelRadians: 2
      })    

    for i in [0..10]
      for j in [0..10]
        x =  -40 + Math.floor(Math.random()*80) + canvas.width * i / 10
        y = -40 + Math.floor(Math.random()*80) + canvas.height * j / 10
        xVel = -10 + Math.floor(Math.random()*20)
        yVel = -10 + Math.floor(Math.random()*20)
        this.addSparkle x, y, xVel, yVel
  
    # optional: set up frame rate display
    @stats = new Stats()
    statsCanvas.appendChild @stats.domElement

    canvas.onclick = (event) =>
      this.addSparkle(event.offsetX, event.offsetY, 0, 0)

  addSparkle: (spX, spY, xVel, yVel) ->
    @world.addEntity(                     
      new EaselBoxCircle(radius=4, {
          imgSrc: '/img/sparkle_21x23.png', 
          frames: {width:21, height:23, regX:10, regY:11},
          startFrame: Math.random() * 13
          }), 
      'dynamic',
      {
        xPixels: spX,
        yPixels: spY,
        xVelPixels: xVel,
        yVelPixels: yVel
        })     
     
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
    
    
