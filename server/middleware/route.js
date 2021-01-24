
'use strict';
module.exports = function(app) {
    app.use( config.baseUrl + '/student', require('../api/student/index'));
    
}
