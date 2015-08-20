/*TMODJS:{"version":1,"md5":"7165a4efd73d42aca5ce3b47287817f2"}*/
template('header',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,avatar=$data.avatar,username=$data.username,$out='';$out+='<div class="header"> <div class="header-logo"> <h2><span>[ </span>QED<span> ]</span></h2> </div> <div class="header-nav"> <div class="nav-left"></div> <div class="nav-right"> <div class="user-menu"> <a href="#/user/home" class="bar"> <img src="';
$out+=$escape(avatar);
$out+='" class="avatar"> <div class="name"> <span>';
$out+=$escape(username);
$out+='</span> <span class="caret"></span> </div> </a> <ul class="list"> <li> <a href="#/user/profile" class="text-icon"> <span class="icon icon-user"></span> <span>我的资料</span> </a> </li> <li> <a href="#/user/task/unread" class="text-icon"> <span class="icon icon-tasks"></span><span>我的任务</span> </a> </li> <li> <a href="#/logout" class="text-icon"> <span class="icon icon-off"></span><span>退出</span> </a> </li> </ul> </div> </div> </div> </div> ';
return new String($out);
});