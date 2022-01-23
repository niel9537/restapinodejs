'use strict'; //kode js tetap dan ketat

exports.ok = function(values, res){
    var data = {
        'status':200,
        'values':values
    };
    res.json(data);
    res.end();
}
