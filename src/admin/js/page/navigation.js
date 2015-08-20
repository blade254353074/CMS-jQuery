var $ = require('jquery'),
    template = require('../public/helper'),
    global = require('../public/global');

module.exports = function() {
    var navData = {
        menu: [{
            title: '成员',
            icon: 'icon-user',
            list: [{
                title: '添加',
                hash: '#/page/member/add',
                root: '#/page/member/add'
            }, {
                title: '列表',
                hash: '#/page/member/list/1',
                root: '#/page/member/list'
            }]
        }, {
            title: '产品',
            icon: 'icon-th',
            list: [{
                title: '添加',
                hash: '#/page/product/add',
                root: '#/page/product/add'
            }, {
                title: '列表',
                hash: '#/page/product/list/1',
                root: '#/page/product/list'
            }]
        }, {
            title: '文章',
            icon: 'icon-file',
            list: [{
                title: '列表',
                hash: '#/page/article/list/1',
                root: '#/page/article/list'
            }]
        }, {
            title: '界面配置',
            icon: 'icon-scale',
            list: [{
                title: '设置',
                hash: '#/page/option/setup',
                root: '#/page/option/setup'
            }]
        }]
    }
    var $navigation = $(template('./navigation', navData));
    //navigation初始化
    var $subList = $navigation.find('li.sub-list');
    var hash = location.hash;
    if (hash !== '#/page') {
        var hashLink = hash.match(/^#\/page(\/[^\/]+){2}/)[0];
        console.log(hashLink);
        $subList.find('a[data-root="' + hashLink + '"]').parent('li').addClass('active').closest('.nav-item').addClass('open');
    }
    //navigation事件绑定

    $navigation.on('click', 'a', function() {
        var $this = $(this),
            $li = $this.parent('li');
        if ($li.hasClass('nav-item')) {
            $li.toggleClass('open').siblings('.open').removeClass('open');
        } else {
            $subList.filter('.active').removeClass('active');
            $li.addClass('active');
        }
    });
    return $navigation;
}
