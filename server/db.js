var mysql = require("mysql");
var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"todolist-user",
    port:'3306'
});

function query(sql,callback){
    pool.getConnection(function(err,connection){

          if(err) console.log("POOL ==> " + err);
        else{
            connection.query(sql,function(err,rows){
                callback(err,rows);
                connection.release();
            });
        }

    });
}
exports.query = query;

//node连接mysql数据库保存用户数据
//https://blog.csdn.net/ul646691993/article/details/52144006
