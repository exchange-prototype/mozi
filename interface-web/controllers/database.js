var mysql = require('mysql');

var connectionState = false;
var connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database:'',
    port: 3306
});

connection.on('close', function (err) {
  console.log('mysqldb conn close');
  connectionState = false;
});
connection.on('error', function (err) {
  console.log('mysqldb error: ' + err);
  connectionState = false;
});

function attemptConnection(connection) {
  if(!connectionState){
    connection.connect(function (err) {
      // connected! (unless `err` is set)
      if (err) {
        console.log('mysql db unable to connect: ' + err);
        connectionState = false;
      } else {
        console.log('mysql connect!');
        connectionState = true;
      }
    });
    connection.on('close', function (err) {
        console.log('mysqldb conn close');
      connectionState = false;
    });
    connection.on('error', function (err) {
        console.log('mysqldb error: ' + err);

      if (!err.fatal) {
        //throw err;
        connectionState = false;
      }
      if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
        //throw err;
        connectionState = false;
      } else {
        connectionState = false;
      }

    });
  }
}

attemptConnection(connection);

var dbConnChecker = setInterval(function(){
  if(!connectionState){
    console.log('not connected, attempting reconnect');
    attemptConnection(connection);
  }
  else{
    console.log('mysql link connected');
  }
},1800000);

var query = function(sql,params,callback){
  if(connectionState) {
    connection.query(sql, params, function (err, rows) {
       callback(err,rows);
    });
  } else {
    callback('MySQL not connected', null);
  }
}

module.exports = query;