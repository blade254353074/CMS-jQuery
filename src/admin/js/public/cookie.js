module.exports = {
    setCookie: function(c_name, value, expireseconds) {
        var exdate = new Date()
        exdate.setTime(exdate.getTime() + expireseconds * 1000)
        document.cookie = c_name + "=" + escape(value) +
            ((expireseconds == null) ? "" : ";expires=" + exdate.toGMTString())
    },
    getCookie: function(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) {
                    c_end = document.cookie.length
                }
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    },
    delCookie: function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }
};
