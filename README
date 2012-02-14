= Angry Birds clone with EaselJS and Box2dWeb

This project is a clone of Angry Birds that integrates the Box2dWeb[http://code.google.com/p/box2dweb/] Javascript 
library with custom rendering in EaselJS[http://easeljs.com].   The artwork is stolen from the awesome 
{Seb Lee-Delisle's live coding example}[http://seb.ly/2012/01/live-iphone-coding-video-now-online/]
of the game "Ghosts and Monsters" using the Corona SDK for buildling iOS and Android apps.

Box2D is a lot of fun: you can build cool physics-based games with very little coding.  However, Box2D libraries
don't have custom rendering logic built in.  Other than simple debug output to a cavnas, you are left to your own
devices for figuring out how to render your objects.

For rendering Box2D objects in Javascript, you have only a couple options:

* ImpactJS, a proprietary Javascript game framework for building HTML5 games.  It lets you create
and manipulate entities that have both the Box2D physics, as well as custom rendering properties. 
ImpactJS has become quite popular in gaming, but it is closed and requires a paid license.

* boxbox[http://incompl.github.com/boxbox/], which I haven't tried yet.  It is an open-source JS project
with a simplified API that wraps both Box2D and rendering. It's not clear whether it exposes you to the full
methods and attributes of the Box2DWeb library.

With this project, I tried making my own wrappers for EaselJS and Box2dWeb, letting you create Bitmap and
cavas vector-model shapes in EaselJS that also have the underlying Box2D physics.

= Setup

  cd <project directory>
  npm install

= To run server

  node scripts/app.js  (go to http://localhost:3000)

= To compile coffeescript

  cake watch  


= Docs

EaselJS API
http://easeljs.com/docs/

Box2dWeb
http://code.google.com/p/box2dweb/

Box2d API
http://www.box2dflash.org/docs/2.1a/reference/
