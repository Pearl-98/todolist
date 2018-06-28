var mysql = require('mysql');
var db = require('../db.js');
var Str = require('../common/string');

//登录验证
module.exports.login = function(req, res, next) {
	let data = req.params;
	let dataJson =  JSON.parse(data.data);
	let name= dataJson.userName;
    let password = dataJson.password;
	let sql = 'select * from userlogin where userlogin.name = "'+name+'" and userlogin.password = "'+password+'"';
    console.log(sql);
    let users = [];
    db.query(sql,function(err,rows){
        if(err){
            return res.json({"status":0,"message":err});
        }else{
            rows.forEach(item=>{
                users.push({
                    'name':item.name,
                    'password':item.password
                })
            });
            console.log(users[0]);
            if(users[0]==undefined){
                 res.json({"status":0});
            }else{
                 res.json({"status":1,"info":users[0]});
            }
        }
    })
};