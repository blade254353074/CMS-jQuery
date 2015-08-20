var $ = require('jquery'),
    template = require('../public/helper'),
    global = require('../public/global');

module.exports = function() {
    var hdData = {
        avatar: '/assets/imgs/avatar.png',
        username: 'SebastianBlade'
    }
    var $header = $(global.$header.html(template('./header', hdData)));
    return $header;
}
