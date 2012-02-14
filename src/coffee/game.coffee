class Game
  forceMultiplier = 10
  ticks = 0
  
  constructor: (@box2dWorld, @easelStage) ->
    skyScale = 1.3
    sky = new Bitmap("/img/sky.jpg")
    sky.scaleX = skyScale
    sky.scaleY = skyScale
    @easelStage.addChild sky    

    treeScale = 0.5
    trees = new Bitmap("/img/trees.png")
    trees.y = WORLD_HEIGHT_PIXELS - 400 * treeScale
    trees.scaleX = treeScale
    trees.scaleY = treeScale
    @easelStage.addChild trees

    mountainScale = 1
    mountains = new Bitmap("/img/mountains.png")
    mountains.y = WORLD_HEIGHT_PIXELS - 254 * mountainScale
    mountains.scaleX = mountainScale
    mountains.scaleY = mountainScale
    @easelStage.addChild mountains  	

    groundLevelMeters = WORLD_HEIGHT_METERS - ((37/2) / PIXELS_PER_METER)
    ground = new EaselBox2dImage(@box2dWorld, @easelStage, 
      'static',
      '/img/ground-cropped.png',
      {
        initXMeters: (1024 / 2) / PIXELS_PER_METER, 
        initYMeters: groundLevelMeters,
        imgWidthPixels: 1024,
        imgHeightPixels: 37,
      })   
    
    initHeadXPixels = 100
    catapult = new Bitmap("/img/catapult_50x150.png")
    catapult.x = initHeadXPixels - 30
    catapult.y = WORLD_HEIGHT_PIXELS - 160
    @easelStage.addChild catapult
  
    @dynamicObjects = [] 
      
    @head = new EaselBox2dImage(@box2dWorld, @easelStage, 
      'static',
      '/img/exorcist_40x50.png',
      {
        initXMeters: initHeadXPixels / PIXELS_PER_METER, 
        initYMeters: groundLevelMeters - 140 / PIXELS_PER_METER, 
        imgRadiusPixels: 20
      }) 
    
    @head.selected = false
    @head.easelObj.onPress = (eventPress) =>
      @head.selected = true
      @head.initPositionXpixels = eventPress.stageX
      @head.initPositionYpixels = eventPress.stageY
      eventPress.onMouseMove = (event) =>
        @head.movedPositionXpixels = event.stageX
        @head.movedPositionYpixels = event.stageY
      eventPress.onMouseUp = (event) =>
        @head.selected = false
        @head.body.SetType Box2D.Dynamics.b2Body.b2_dynamicBody
        forceX = (@head.initPositionXpixels - event.stageX) * forceMultiplier
        forceY = (@head.initPositionYpixels - event.stageY) * forceMultiplier
        @head.body.ApplyImpulse(
          new Box2D.Common.Math.b2Vec2(forceX, forceY),
          new Box2D.Common.Math.b2Vec2(@head.body.GetPosition().x, @head.body.GetPosition().y)
        )    
        
    blockWidth = 15 
    blockHeight = 60 
    levels = 3
    topOfPyramid = groundLevelMeters - levels *  (blockHeight + blockWidth) / PIXELS_PER_METER + 26 / PIXELS_PER_METER
    leftPyamid = (300) / PIXELS_PER_METER
    for i in [0...levels]
      for j in [0..i+1]
          x =  leftPyamid + (j-i/2) * blockHeight / PIXELS_PER_METER
          y = topOfPyramid + i * (blockHeight + blockWidth) / PIXELS_PER_METER
          myBlock = new EaselBox2dImage(@box2dWorld, @easelStage, 
            'static', 
            '/img/block1_15x60.png', 
            {
              imgWidthPixels: blockWidth, 
              imgHeightPixels: blockHeight,
              initXMeters: x, 
              initYMeters: y 
            })        
          @dynamicObjects.push(myBlock)
          if j <= i
            myBlock = new EaselBox2dImage(@box2dWorld, @easelStage, 
              'static', 
              '/img/block1_15x60.png', 
              {
                imgWidthPixels: blockWidth, 
                imgHeightPixels: blockHeight, 
                initXMeters: x + (blockHeight/2) / PIXELS_PER_METER,
                initYMeters: y - (blockHeight/2 + blockWidth/2) / PIXELS_PER_METER,
                angleDegrees: 90
              })
            @dynamicObjects.push(myBlock)

            ghost = new EaselBox2dImage(@box2dWorld, @easelStage, 
              'static', 
              '/img/ghost_30x36.png', 
              {
                imgWidthPixels: 30, 
                imgHeightPixels: 36, 
                initXMeters: x + (blockHeight/2) / PIXELS_PER_METER,
                initYMeters: y + 11 / PIXELS_PER_METER
              })
            @dynamicObjects.push(ghost)

                             
  update: ->
    ticks += 1
    for object in @dynamicObjects
      object.update() 
      if ticks == 20
        object.body.SetType Box2D.Dynamics.b2Body.b2_dynamicBody
        
    @head.update() 
    if @head.selected
      @head.setPosition(@head.movedPositionXpixels / PIXELS_PER_METER, @head.movedPositionYpixels / PIXELS_PER_METER)
      
  drawDot = (stage, x, y) ->
    # draw red dot for debugging positioning
    shape = new Shape()
    shape.graphics.beginFill("#CC0000").drawCircle(x, y, 3)
    stage.addChild shape
  