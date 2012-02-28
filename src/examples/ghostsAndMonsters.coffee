class window.GhostsAndMonstersGame
  # to set up Easel-Box2d world
  PIXELS_PER_METER = 30
  gravityX = 0
  gravityY = 10
  # game-specific
  frameRate = 20
  forceMultiplier = 5
  
  constructor: (canvas, debugCanvas, statsCanvas) ->    
    @world = new EaselBoxWorld(this, frameRate, canvas, debugCanvas, gravityX, gravityY, PIXELS_PER_METER)
    
    # optional: set up frame rate display
    @stats = new Stats()
    statsCanvas.appendChild @stats.domElement

    worldWidthPixels = canvas.width
    worldHeightPixels = canvas.height
    initHeadXPixels = 100
    groundLevelPixels = worldHeightPixels - (37/2)
    
    @world.addImage("/img/sky.jpg", {scaleX: 1.3, scaleY: 1.3})    
    @world.addImage("/img/trees.png", {scaleX: 0.5, scaleY: 0.5, y: worldHeightPixels - 400 * 0.55})
    @world.addImage("/img/mountains.png", {scaleX: 1, scaleY: 1, y: worldHeightPixels - 254 * 1})
        
    ground = @world.addEntity(
      widthPixels: 1024,
      heightPixels: 37,
      imgSrc: '/img/ground-cropped.png',
      type: 'static',
      xPixels: 0, 
      yPixels: groundLevelPixels)   

    @world.addImage("/img/catapult_50x150.png", {x: initHeadXPixels - 30, y:  worldHeightPixels - 160})

    # setup head
    @head = @world.addEntity(
      radiusPixels: 20,
      imgSrc: '/img/exorcist_40x50.png',
      type: 'static',
      xPixels: initHeadXPixels, 
      yPixels: groundLevelPixels - 140) 

    @head.selected = false
    @head.easelObj.onPress = (eventPress) =>
      @head.selected = true
      @head.initPositionXpixels = eventPress.stageX
      @head.initPositionYpixels = eventPress.stageY
      
      eventPress.onMouseMove = (event) =>
        @head.setState(xPixels: event.stageX, yPixels: event.stageY)
    
      eventPress.onMouseUp = (event) =>
        @head.selected = false
        @head.setType "dynamic"  
        forceX = (@head.initPositionXpixels - event.stageX) * forceMultiplier
        forceY = (@head.initPositionYpixels - event.stageY) * forceMultiplier
        @head.body.ApplyImpulse(
          @world.vector(forceX, forceY),
          @world.vector(@head.body.GetPosition().x, @head.body.GetPosition().y)
        )    

    # draw pyramid    
    blockWidth = 15 
    blockHeight = 60 
    leftPyamid = 300
    levels = 3
    topOfPyramid = groundLevelPixels - levels *  (blockHeight + blockWidth) + 26
    for i in [0...levels]
      for j in [0..i+1]
          x =  leftPyamid + (j-i/2) * blockHeight 
          y = topOfPyramid + i * (blockHeight + blockWidth)
          myBlock =  @world.addEntity(
            widthPixels: blockWidth,
            heightPixels: blockHeight,
            imgSrc: '/img/block1_15x60.png',
            xPixels: x, 
            yPixels: y)        

          if j <= i
            myBlock = @world.addEntity(
              widthPixels: blockWidth,
              heightPixels: blockHeight,
              imgSrc: '/img/block1_15x60.png',             
              xPixels: x + blockHeight / 2,
              yPixels: y - (blockHeight + blockWidth) / 2
              angleDegrees: 90)

            ghost = @world.addEntity(
              widthPixels: 30,
              heightPixels: 36,
              imgSrc: '/img/ghost_30x36.png',
              xPixels: x + (blockHeight / 2),
              yPixels: y + 11)

  # optional: a callback for each EaselBox2dWorld tick()
  tick: () ->
    @stats.update()
    
                  