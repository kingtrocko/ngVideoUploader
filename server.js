var express = require('express');
var path    = require('path');
var app     = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.resolve(__dirname, 'public')));


app.listen(app.get('port'), function(){
  console.log('This App is running on localhost:',app.get('port'));
})
