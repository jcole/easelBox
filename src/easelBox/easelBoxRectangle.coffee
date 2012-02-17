class EaselBoxRectangle extends EaselBoxObject   
  
  constructor: (staticDynamicType, pixelsPerMeter, options=null) ->  
    if options and options.widthMeters
      widthMeters = options.widthMeters
      widthPixels = widthMeters * pixelsPerMeter
    else if options and options.widthPixels
      widthPixels = options.widthPixels
      widthMeters = widthPixels / pixelsPerMeter
    else
      widthMeters = 1
      widthPixels = widthMeters * pixelsPerMeter
     
    if options and options.heightMeters
      heightMeters = options.heightMeters
      heightPixels = heightMeters * pixelsPerMeter
    else if options and options.heightPixels
      heightPixels = options.heightPixels
      heightMeters = heightPixels / pixelsPerMeter
    else
      heightMeters = 1
      heightPixels = heightMeters * pixelsPerMeter
      
    # init the Box2d physics entity
    box2dShape = new Box2D.Collision.Shapes.b2PolygonShape.AsBox(widthMeters / 2, heightMeters / 2)

    # init the Easel shape
    shape = new Shape()
    shape.graphics.beginLinearGradientFill(["#F00","#00F"], [0, 0.5], -widthPixels/2, 0, widthPixels, 0).drawRect(-widthPixels/2, -heightPixels/2, widthPixels, heightPixels)
    
    super(shape, box2dShape, staticDynamicType, pixelsPerMeter, options)     
