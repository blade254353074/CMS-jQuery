/*TMODJS:{"version":1,"md5":"10ed8f166372bd63b8c3fcd97f634c6d"}*/
template('navigation',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,menu=$data.menu,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,item=$data.item,$out='';$out+='<ul class="nav"> ';
$each(menu,function($value,$index){
$out+=' <li class="nav-item"> <a> <span class="icon ';
$out+=$escape($value.icon);
$out+='"></span> <span>';
$out+=$escape($value.title);
$out+='</span> <span class="symbol"></span> </a> ';
if($value.list.length !== 0){
$out+=' <ul class="sub-nav"> ';
$each($value.list,function(item,$index){
$out+=' <li class=\'sub-list\'> <a class="sub-item" href="';
$out+=$escape(item.hash);
$out+='" data-root="';
$out+=$escape(item.root);
$out+='"> <span>';
$out+=$escape(item.title);
$out+='</span> </a> </li> ';
});
$out+=' </ul> ';
}
$out+=' </li> ';
});
$out+=' </ul> ';
return new String($out);
});