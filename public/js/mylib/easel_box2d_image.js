var EaselBox2dImage,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

EaselBox2dImage = (function(_super) {

  __extends(EaselBox2dImage, _super);

  function EaselBox2dImage(b2dWorld, easelStage, body_type, img_src, attributes) {
    var bMap, box2dShape, heightMeters, heightPixels, radiusMeters, widthMeters, widthPixels;
    bMap = new Bitmap(img_src);
    if (attributes.imgRadiusPixels) {
      radiusMeters = attributes.imgRadiusPixels / PIXELS_PER_METER;
      box2dShape = new Box2D.Collision.Shapes.b2CircleShape(radiusMeters);
      bMap.regX = attributes.imgRadiusPixels;
      bMap.regY = attributes.imgRadiusPixels;
    } else {
      widthPixels = attributes.imgWidthPixels;
      heightPixels = attributes.imgHeightPixels;
      bMap.regX = widthPixels / 2;
      bMap.regY = heightPixels / 2;
      widthMeters = (widthPixels / 2) / PIXELS_PER_METER;
      heightMeters = (heightPixels / 2) / PIXELS_PER_METER;
      box2dShape = new Box2D.Collision.Shapes.b2PolygonShape.AsBox(widthMeters, heightMeters);
    }
    EaselBox2dImage.__super__.constructor.call(this, b2dWorld, easelStage, body_type, attributes, bMap, box2dShape);
  }

  return EaselBox2dImage;

})(EaselBox2dObject);
