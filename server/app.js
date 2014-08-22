var PORT = 3000;
var APP_ROOT = __dirname + '/../examples/';

var express = require('express');
var app = express();

app.use(express.static(APP_ROOT));
app.set('port', process.env.PORT || PORT);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
