
var bodyParser = require('body-parser')
var query = require('./database')
var hardcodeuserid='0001'

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

	app.post('/tradepair',urlencodedParser,function(req,res){
		console.log('get tradepair');
		console.log(req.body);
		var addSqlParams=[req.body.currency,req.body.partyb,req.body.currency,req.body.partyb];
		var sql = "select t.Currency1,t.Currency2,t.exchange from tradepair t where (t.Currency1=? AND t.Currency2=?) OR (t.Currency2=? AND t.Currency1=?)";
		query(sql,addSqlParams,function(err,result){
			if(err){
				console.log('[SELECT ERROR] - ',err.message);
				res.json(err.message);
			}
			else{
				console.log('--------------------------SELECT----------------------------');
				console.log('SELECT ID:',result);     
				console.log('-----------------------------------------------------------------\n\n');
				res.json(result);
			}
		});
	});

	app.get('/exchange',function(req,res){
		console.log('get exchange');
		var sql = "select t.Currency1,t.Currency2, t.exchange from tradepair t where (t.Currency1='TRX' AND t.Currency2='BTC') OR (t.Currency2='TRX' AND t.Currency1='BTC')";
		query(sql,null,function(err,result){
			if(err){
				console.log('[SELECT ERROR] - ',err.message);
				res.json(err.message);
			}
			else{
				console.log('--------------------------SELECT----------------------------');
				console.log('SELECT ID:',result);     
				console.log('-----------------------------------------------------------------\n\n');
				res.json(result);
			}
		});
	});

	// by Xueyuan, displayOrders or Trans
	app.get('/displayOrders',function(req,res){
			console.log('display Orders');
			var addSqlParams=[hardcodeuserid]
			var sql = "select * from orders t where t.userid=?";
			query(sql,null,function(err,result){
				if(err){
					console.log('[SELECT ERROR] - ',err.message);
					res.json(err.message);
				}
				else{
					console.log('--------------------------SELECT----------------------------');
					console.log('SELECT order:',result);     
					console.log('-----------------------------------------------------------------\n\n');
					res.json(result);
				}
			});
		});

	app.post('/sell',urlencodedParser,function(req,res){
		console.log(req.body);
		var addSqlParams=[
			hardcodeuserid,req.body.Address,req.body.Currency,req.body.QuantityEntered,req.body.PartyB,req.body.PriceEntered
		];
		var addSql="insert into orders(UserID,Address,Currency,QuantityEntered,PartyB,PriceEntered) VALUES (?,?,?,?,?,?)";
		query(addSql,addSqlParams,function (err, result) {
			if(err){
			 console.log('[INSERT ERROR] - ',err.message);
			 res.json(err.message);
			}
			else{
				console.log('--------------------------INSERT----------------------------');
				console.log('INSERT ID:',result);     
				console.log('-----------------------------------------------------------------\n\n');
				res.json("1");
			}

		});
		
	});



}
