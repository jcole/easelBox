var EaselBox2dImage,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

EaselBox2dImage = (function(_super) {

  __extends(EaselBox2dImage, _super);

  function EaselBox2dImage(imgSrc, staticDynamicType, pixelsPerMeter, options) {
    var bMap, box2dShape, heightMeters, heightPixels, radiusMeters, widthMeters, widthPixels;
    bMap = new Bitmap(imgSrc);
    if (options.imgRadiusPixels) {
      radiusMeters = options.imgRadiusPixels / pixelsPerMeter;
      box2dShape = new Box2D.Collision.Shapes.b2CircleShape(radiusMeters);
      bMap.regX = options.imgRadiusPixels;
      bMap.regY = options.imgRadiusPixels;
    } else {
      widthPixels = options.imgWidthPixels;
      heightPixels = options.imgHeightPixels;
      bMap.regX = widthPixels / 2;
      bMap.regY = heightPixels / 2;
      widthMeters = (widthPixels / 2) / pixelsPerMeter;
      heightMeters = (heightPixels / 2) / pixelsPerMeter;
      box2dShape = new Box2D.Collision.Shapes.b2PolygonShape.AsBox(widthMeters, heightMeters);
    }
    EaselBox2dImage.__super__.constructor.call(this, bMap, box2dShape, staticDynamicType, pixelsPerMeter, options);
  }

  return EaselBox2dImage;

})(EaselBox2dObject);
