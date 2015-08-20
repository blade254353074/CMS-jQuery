var $ = require('jquery'),
    template = require('../public/helper'),
    global = require('../public/global');

module.exports = function() {
    if (!global.frameLoad) {
        // header
        var $header = require('./header');
        // navigation
        var $navigation = require('./navigation');
        // page
        var $page = $(template('./page', {}))
        global.$app.html($header).append($navigation).append($page);
        // frame加载完成
        global.frameLoad = true;
    }
}
