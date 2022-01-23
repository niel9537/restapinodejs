'use strict'; //kode js tetap dan ketat

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req,res){
    response.ok("Aplikasi REST API berjalan",res)
};