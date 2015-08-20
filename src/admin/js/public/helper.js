var template = require('../template');
template.helper('dateDiff', function(hisTime, nowTime) {
    if (!arguments.length) return '';
    var arg = arguments,
        now = arg[1] ? arg[1] : new Date().getTime(),
        diffValue = now - new Date(arg[0]).getTime(),
        result = '',

        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,

        _year = diffValue / year,
        _month = diffValue / month,
        _week = diffValue / (7 * day),
        _day = diffValue / day,
        _hour = diffValue / hour,
        _min = diffValue / minute;

    if (_year >= 1) result = parseInt(_year) + "年前";
    else if (_month >= 1) result = parseInt(_month) + "个月前";
    else if (_week >= 1) result = parseInt(_week) + "周前";
    else if (_day >= 1) result = parseInt(_day) + "天前";
    else if (_hour >= 1) result = parseInt(_hour) + "个小时前";
    else if (_min >= 1) result = parseInt(_min) + "分钟前";
    else result = "刚刚";
    return result;
});
/* {{#total | paging: page, '/#/product/list/'}} */
template.helper('paging', function(total, pn, link) {
    var html = '',
        max = parseInt(pn) + 4,
        p;
    if (link === undefined) {
        link = '#/link/';
    }
    if (total > 1) {
        if (pn <= 1) {
            html += '<li class="disabled"><a href="javascript:;" class="prev" aria-label="上一页"><span aria-hidden="true">&laquo; 上一页</span></a></li>\n';
        } else {
            html += '<li><a href="' + link + (parseInt(pn) - 1) + '" class="prev" aria-label="上一页"><span aria-hidden="true">&laquo; 上一页</span></a></li>\n';
        }
        if (total > 10) {
            if (pn <= 5) {
                max = 10;
                p = 1;
            } else {
                if (max >= total) {
                    max = total;
                }
                p = pn - 5;
            }

            for (p; p <= max; p++) {
                if (pn == p) {
                    html += '<li class="active"><a href="' + link + p + '" class="page-link" data-pn="' + p + '">' + p + ' <span class="sr-only">(当前页)</span></a></li>\n';
                } else {
                    html += '<li><a href="' + link + p + '" class="page-link" data-pn="' + p + '">' + p + ' </a></li>\n';
                }
            }
        } else {
            for (p = 1; p <= total; p++) {
                if (pn == p) {
                    html += '<li class="active"><a href="' + link + p + '" class="page-link" data-pn="' + p + '">' + p + ' <span class="sr-only">(当前页)</span></a></li>\n';
                } else {
                    html += '<li><a href="' + link + p + '" class="page-link" data-pn="' + p + '">' + p + ' </a></li>\n';
                }
            }
        }
        if (pn == total) {
            html += '<li class="disabled"><a href="javascript:;" class="next" aria-label="下一页"><span aria-hidden="true">下一页 &raquo;</span></a></li>\n';
        } else {
            html += '<li><a href="' + link + (parseInt(pn) + 1) + '" class="next" aria-label="下一页"><span aria-hidden="true">下一页 &raquo;</span></a></li>\n';
        }
    }
    return html;
});
module.exports = template;
