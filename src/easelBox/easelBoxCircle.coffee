class window.EaselBoxCircle extends EaselBoxObject   
  
  constructor: (radiusPixels=20, options=null) ->  
    radiusMeters = radiusPixels / PIXELS_PER_METER
      
    # init the Box2d physics entity
    box2dShape = new Box2D.Collision.Shapes.b2CircleShape(radiusMeters) 

    # init the Easel shape
    object = null
    if options and options.imgSrc      
      if options and options.frames      
        data = {
                  images: [options.imgSrc],
                  frames: options.frames,
                }     
        bmpAnim = new BitmapAnimation(new SpriteSheet(data))
        object = bmpAnim.clone()
        object.gotoAndPlay(options.startFrame | 0);
      else
        object = new Bitmap(options.imgSrc)

      object.scaleX = options.scaleX || 1
      object.scaleY = options.scaleY || 1
      object.regX = radiusPixels
      object.regY = radiusPixels      
    else
      object = new Shape()
      object.graphics.beginRadialGradientFill(["#F00","#00F"], [0.1, .9], 0, 0, 0, 0, 0, radiusPixels).drawCircle(0, 0, radiusPixels).beginFill("#FFF").drawRect(0, -1, radiusPixels, 2)
    
    super(object, box2dShape, options)     
