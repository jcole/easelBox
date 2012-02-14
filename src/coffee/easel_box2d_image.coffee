class EaselBox2dImage extends EaselBox2dObject   
  
  constructor: (b2dWorld, easelStage, body_type, img_src, attributes) ->    
    # init the Easel shape
    bMap = new Bitmap(img_src)

    if attributes.imgRadiusPixels
      radiusMeters = attributes.imgRadiusPixels / PIXELS_PER_METER      
      # init the Box2d physics entity      
      box2dShape = new Box2D.Collision.Shapes.b2CircleShape(radiusMeters) 

      bMap.regX = attributes.imgRadiusPixels
      bMap.regY = attributes.imgRadiusPixels
    else
      widthPixels = attributes.imgWidthPixels
      heightPixels = attributes.imgHeightPixels

      bMap.regX = widthPixels / 2
      bMap.regY = heightPixels / 2
      
      widthMeters = (widthPixels / 2) / PIXELS_PER_METER
      heightMeters = (heightPixels / 2) / PIXELS_PER_METER
      box2dShape = new Box2D.Collision.Shapes.b2PolygonShape.AsBox(widthMeters, heightMeters)
    
    super(b2dWorld, easelStage, body_type, attributes, bMap, box2dShape)     
