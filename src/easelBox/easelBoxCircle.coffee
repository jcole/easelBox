class EaselBoxCircle extends EaselBoxObject   
  
  constructor: (staticDynamicType, pixelsPerMeter, options=null) ->  
    if options and options.radiusMeters
      radiusMeters = options.radiusMeters
      radiusPixels = radiusMeters * pixelsPerMeter
    else if options and options.radiusPixels
      radiusPixels = options.radiusPixels
      radiusMeters = radiusPixels / pixelsPerMeter
    else
      radiusMeters = 1
      radiusPixels = radiusMeters * pixelsPerMeter
      
    # init the Box2d physics entity
    box2dShape = new Box2D.Collision.Shapes.b2CircleShape(radiusMeters) 

    # init the Easel shape
    object = null
    if options and options.imgSrc
      object = new Bitmap(options.imgSrc)
      object.regX = radiusPixels
      object.regY = radiusPixels
    else
      object = new Shape()
      object.graphics.beginRadialGradientFill(["#F00","#00F"], [0.1, .9], 0, 0, 0, 0, 0, radiusPixels).drawCircle(0, 0, radiusPixels).beginFill("#FFF").drawRect(0, -1, radiusPixels, 2)
    
    super(object, box2dShape, staticDynamicType, pixelsPerMeter, options)     
