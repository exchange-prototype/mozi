var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/',indexRouter);
app.use('/users',usersRouter);

app.set('view engine','ejs');

app.use(express.static('./public'));

todoController(app);

app.listen(58887);
console.log('you are listening to port 58887');