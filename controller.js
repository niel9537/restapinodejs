'use strict'; //kode js tetap dan ketat

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req,res){
    response.ok("Aplikasi REST API berjalan",res)
};

//menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function(req,res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res)
        }
    });
};

//menampilkan semua data mahasiswa berdasarkan id
exports.tampilberdasarkanid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                response.ok(rows, res);
            }
        });
};

//menambahkan data mahasiswa 
exports.tambahmahasiswa = function(req,res){
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
        [nim,nama,jurusan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                response.ok("Berhasil menambahkan data",res)
            }
        });
};

//mengubah data berdasarkan id
exports.ubahmahasiswa = function(req,res){
    var id = req.body.id_mahasiswa; 
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan; 
    
    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim,nama,jurusan,id],
        function(error,rows,fields){
            if(error){
                console.log(error);
            }else{
                response.ok('Berhasil mengubah data', res)
            }
        });
};

//hapus data mahasiswa
exports.hapusmahasiswa = function(req,res){
    var id = req.body.id_mahasiswa;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?',[id],
    function(error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok('Berhasil hapus data',res);
        }
    });
};

//menampilkan matakuliah group
exports.tampilgroupmatakuliah = function(req,res){
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa', 
    function(error, rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.oknested(rows, res)
        }
    });
};
