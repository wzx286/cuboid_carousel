
var picbox = document.getElementById("picBox");

var rot = {//方块旋转角度
	x:0,
	y:30,
	z:0
};

(function cutBox(num){
	var styleAll = document.createElement("style");

	var style1 = ' #picBox ul li>div{width:'+(100/(num))+'%;} ';

	var List = document.querySelectorAll('.pic-box ul li');

	var picSrcName=1;

	styleAll.rel = 'stylesheet';
	styleAll.type = 'text/css';	

	Array.prototype.forEach.call(List,function(i){//切割块
		
		var newChildren = "",
			interval = 0.5,
			delay = 2*interval/num;

		for(var j = 0 ; j < num ; j ++){

			newChildren += '<div></div>';

			style1 += ' .pic-box ul li>div:nth-child('+(j+1)+'){background-position:-'+((picbox.offsetWidth/num)*j)+'px;-webkit-transition: -webkit-transform '+interval+'s '+j*delay+'s;-o-transition: -o-transform '+interval+'s '+j*delay+'s;transition: transform '+interval+'s '+j*delay+'s; } ';//'+(1/num*j)+'					
		}
		style1 += '.pic-box ul li:nth-child('+picSrcName+')>div{background-image:url("imgs/'+picSrcName+'.jpg")}';

		i.innerHTML = newChildren;

		picSrcName += 1;	
	});		

	style1 += ' .pic-box ul li>div{background-size: '+num*100+'% 100%;';			
	styleAll.innerHTML = style1;
	document.getElementsByTagName('head').item(0).appendChild(styleAll);

})(10);

function moveTo(n){
	var allDiv = document.querySelectorAll('.pic-box ul li>div');
	var btnArr = document.querySelectorAll('.btn-area .btn-i');
	[].forEach.call(allDiv,function(item){
		doRotate(item,'rotateX('+(90*(n-1))+'deg)');				
	});
	[].forEach.call(btnArr,function(i){
		i.className = i.className.replace(/(\s|^)btn-active/,'');
	});
	btnArr[n-1].className += " btn-active";
}

var doRotate = function(obj,str){

	var oStr = obj.style.transform;

	if(str.indexOf("rotateX(")!=-1&&oStr.indexOf("rotateX(")!=-1){
		oStr = oStr.replace(/rotateX\(\-?[0-9]{1,}deg\)/,str);
	}else if(str.indexOf("rotateY(")!=-1&&oStr.indexOf("rotateY(")!=-1){
		oStr = oStr.replace(/rotateY\(\-?[0-9]{1,}deg\)/,str);
	}else if(str.indexOf("rotateZ(")!=-1&&oStr.indexOf("rotateZ(")!=-1){
		oStr = oStr.replace(/rotateZ\(\-?[0-9]{1,}deg\)/,str);
	}else{
		oStr = str;
	}

	obj.style.transform = oStr;
}

function doReset(){
	rot.x = 0;
	rot.y = 30;
	rot.z = 0;
	picbox.style.transform = "rotateX("+rot.x+"deg) rotateY("+rot.y+"deg) rotateZ("+rot.z+"deg)";
}

document.onkeydown = function(e){//转动方块
	if(e.keyCode == 37){
		rot.y -= 1;
		doRotate(picbox,'rotateY('+rot.y+'deg)');
	}
	else if(e.keyCode == 38){
		rot.x += 1;
		doRotate(picbox,'rotateX('+rot.x+'deg)');
	}
	else if(e.keyCode == 39){
		rot.y += 1;
		doRotate(picbox,'rotateY('+rot.y+'deg)');
	}
	else if(e.keyCode == 40){
		rot.x -= 1;
		doRotate(picbox,'rotateX('+rot.x+'deg)');
	}
}
