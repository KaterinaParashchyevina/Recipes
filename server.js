var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 9000));

app.use('/', express.static(__dirname));

app.listen(app.get('port'), function(){
	console.log("Server started: " + app.get('port'));
})