class EaselBoxImage extends EaselBoxObject   
  
  constructor: (imgSrc, staticDynamicType, pixelsPerMeter, options) ->    
    # init the Easel shape
    bMap = new Bitmap(imgSrc)

    if options.imgRadiusPixels
      radiusMeters = options.imgRadiusPixels / pixelsPerMeter      
      # init the Box2d physics entity      
      box2dShape = new Box2D.Collision.Shapes.b2CircleShape(radiusMeters) 

      bMap.regX = options.imgRadiusPixels
      bMap.regY = options.imgRadiusPixels
    else
      widthPixels = options.imgWidthPixels
      heightPixels = options.imgHeightPixels

      bMap.regX = widthPixels / 2
      bMap.regY = heightPixels / 2
      
      widthMeters = (widthPixels / 2) / pixelsPerMeter
      heightMeters = (heightPixels / 2) / pixelsPerMeter
      box2dShape = new Box2D.Collision.Shapes.b2PolygonShape.AsBox(widthMeters, heightMeters)
    
    super(bMap, box2dShape, staticDynamicType, pixelsPerMeter, options)     
