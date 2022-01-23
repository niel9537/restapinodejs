'use strict'; //kode js tetap dan ketat

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);
    app.route('/tampil')
        .get(jsonku.tampilsemuamahasiswa);    
}