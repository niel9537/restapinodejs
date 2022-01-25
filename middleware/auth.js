var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller untuk register
exports.registrasi = function(req,res){
    //array untuk menampung data yang mau ditambahkan
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }
    //cek email di db
    var query = "SELECT email FROM ?? WHERE ??";
    var table = ["user","email",post.email];
    //execute query
    query = mysql.format(query,table);

    connection.query(query, function(error,rows,fields){
        if(error){
            console.log(error);
        }else{
            //Jika belum ada email terdaftar
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                      if(error){
                          console.log(error);
                      }else{
                          response.ok("Berhasil menambahkan data user baru",res);
                      }
                });
            }else{
                response.ok("Email sudah terdaftar");
            }
        }
    })
}
