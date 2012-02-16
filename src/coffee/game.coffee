class Game
  # to set up Easel-Box2d world
  pixelsPerMeter = 30
  gravityX = 0
  gravityY = 10
  # game-specific
  frameRate = 20
  forceMultiplier = 5
  
  constructor: (canvas, debugCanvas, statsCanvas) ->    
    @world = new EaselBox2dWorld(this, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter)
    
    # optional: set up frame rate display
    @stats = new Stats()
    statsCanvas.appendChild @stats.domElement

    worldWidthPixels = canvas.width
    worldHeightPixels = canvas.height
    worldWidthMeters = worldWidthPixels / pixelsPerMeter
    worldHeightMeters = worldHeightPixels / pixelsPerMeter
    initHeadXPixels = 100
    groundLevelMeters = worldHeightMeters - ((37/2) / pixelsPerMeter)
    
    @world.addImage("/img/sky.jpg", {scaleX: 1.3, scaleY: 1.3})    
    @world.addImage("/img/trees.png", {scaleX: 0.5, scaleY: 0.5, y: worldHeightPixels - 400 * 0.55})
    @world.addImage("/img/mountains.png", {scaleX: 1, scaleY: 1, y: worldHeightPixels - 254 * 1})
        
    ground = @world.addEntity(
      'bitmap',
      'static',
      {
        imgSrc: '/img/ground-cropped.png',
        initXMeters: (1024 / 2) / pixelsPerMeter, 
        initYMeters: groundLevelMeters,
        imgWidthPixels: 1024,
        imgHeightPixels: 37,
      })   
      
    @world.addImage("/img/catapult_50x150.png", {x: initHeadXPixels - 30, y:  worldHeightPixels - 160})

    # setup head
    @head = @world.addEntity(
      'bitmap',
      'static',
      {
        imgSrc: '/img/exorcist_40x50.png',
        initXMeters: initHeadXPixels / pixelsPerMeter, 
        initYMeters: groundLevelMeters - 140 / pixelsPerMeter, 
        imgRadiusPixels: 20
      }) 
    @head.selected = false
    @head.easelObj.onPress = (eventPress) =>
      @head.selected = true
      @head.initPositionXpixels = eventPress.stageX
      @head.initPositionYpixels = eventPress.stageY
      
      eventPress.onMouseMove = (event) =>
        @head.setPosition(event.stageX / pixelsPerMeter, event.stageY / pixelsPerMeter)

      eventPress.onMouseUp = (event) =>
        @head.selected = false
        @head.setType "dynamic"  
        forceX = (@head.initPositionXpixels - event.stageX) * forceMultiplier
        forceY = (@head.initPositionYpixels - event.stageY) * forceMultiplier
        @head.body.ApplyImpulse(
          EaselBox2dWorld.vector(forceX, forceY),
          EaselBox2dWorld.vector(@head.body.GetPosition().x, @head.body.GetPosition().y)
        )    
    
    # draw pyramid    
    blockWidth = 15 
    blockHeight = 60 
    levels = 3
    topOfPyramid = groundLevelMeters - levels *  (blockHeight + blockWidth) / pixelsPerMeter + 26 / pixelsPerMeter
    leftPyamid = (300) / pixelsPerMeter
    for i in [0...levels]
      for j in [0..i+1]
          x =  leftPyamid + (j-i/2) * blockHeight / pixelsPerMeter
          y = topOfPyramid + i * (blockHeight + blockWidth) / pixelsPerMeter
          myBlock =  @world.addEntity(
            'bitmap',
            'dynamic', 
            {
              imgSrc: '/img/block1_15x60.png', 
              imgWidthPixels: blockWidth, 
              imgHeightPixels: blockHeight,
              initXMeters: x, 
              initYMeters: y 
            })        
          if j <= i
            myBlock = @world.addEntity(
              'bitmap',
              'dynamic', 
              {
                imgSrc: '/img/block1_15x60.png', 
                imgWidthPixels: blockWidth, 
                imgHeightPixels: blockHeight, 
                initXMeters: x + (blockHeight/2) / pixelsPerMeter,
                initYMeters: y - (blockHeight/2 + blockWidth/2) / pixelsPerMeter,
                angleDegrees: 90
              })
            ghost = @world.addEntity(
              'bitmap',
              'dynamic', 
              {
                imgSrc: '/img/ghost_30x36.png', 
                imgWidthPixels: 30, 
                imgHeightPixels: 36, 
                initXMeters: x + (blockHeight/2) / pixelsPerMeter,
                initYMeters: y + 11 / pixelsPerMeter
              })

  # optional: a callback for each EaselBox2dWorld tick()
  step: () ->
    @stats.update()
    
                  