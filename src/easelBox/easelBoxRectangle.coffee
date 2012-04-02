class window.EaselBoxRectangle extends EaselBoxObject   
  
  constructor: (widthPixels, heightPixels, options=null) ->  
    widthMeters = widthPixels / PIXELS_PER_METER
    heightMeters = heightPixels / PIXELS_PER_METER
      
    # init the Box2d physics entity
    box2dShape = new Box2D.Collision.Shapes.b2PolygonShape.AsBox(widthMeters / 2, heightMeters / 2)

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
      
      object.regX = widthPixels / 2
      object.regY = heightPixels / 2
    else
      object = new Shape()
      object.graphics.beginLinearGradientFill(["#F00","#00F"], [0, 0.5], -widthPixels/2, 0, widthPixels, 0).drawRect(-widthPixels/2, -heightPixels/2, widthPixels, heightPixels)      
    
    super(object, box2dShape, options)    
