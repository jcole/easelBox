var Main, PIXELS_PER_METER, WORLD_HEIGHT_METERS, WORLD_HEIGHT_PIXELS, WORLD_WIDTH_METERS, WORLD_WIDTH_PIXELS;

PIXELS_PER_METER = 30;

WORLD_WIDTH_PIXELS = 500;

WORLD_HEIGHT_PIXELS = 400;

WORLD_WIDTH_METERS = WORLD_WIDTH_PIXELS / PIXELS_PER_METER;

WORLD_HEIGHT_METERS = WORLD_HEIGHT_PIXELS / PIXELS_PER_METER;

Main = (function() {
  var framesPerSecond, gravityX, gravityY;

  framesPerSecond = 20;

  gravityX = 0;

  gravityY = 10;

  function Main(canvasID, debugCanvasID, statsDivId) {
    var debugCanvas, debugDraw;
    this.canvas = document.getElementById(canvasID);
    this.canvas.height = WORLD_HEIGHT_PIXELS;
    this.canvas.width = WORLD_WIDTH_PIXELS;
    this.box2dWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(gravityX, gravityY), true);
    this.easelStage = new Stage(this.canvas);
    Ticker.addListener(this);
    Ticker.setFPS(framesPerSecond);
    this.stats = new Stats();
    document.getElementById(statsDivId).appendChild(this.stats.domElement);
    debugCanvas = document.getElementById(debugCanvasID);
    debugCanvas.height = WORLD_HEIGHT_PIXELS;
    debugCanvas.width = WORLD_WIDTH_PIXELS;
    debugDraw = new Box2D.Dynamics.b2DebugDraw();
    debugDraw.SetSprite(debugCanvas.getContext("2d"));
    debugDraw.SetDrawScale(PIXELS_PER_METER);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
    this.box2dWorld.SetDebugDraw(debugDraw);
    this.game = new Game(this.box2dWorld, this.easelStage);
  }

  Main.prototype.tick = function() {
    this.box2dWorld.Step(1 / Ticker.getMeasuredFPS(), 10, 10);
    this.game.update();
    this.easelStage.update();
    this.box2dWorld.DrawDebugData();
    this.box2dWorld.ClearForces();
    return this.stats.update();
  };

  return Main;

})();
