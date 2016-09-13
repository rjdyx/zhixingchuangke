$(function() {
	setInterval(drawAnimate,700);
	bodyHeight = window.screen.height;
	var py = 0;
	var timer=null;
	$(window).scroll(function(){
		py = $(window).scrollTop();
		var city1Offset = $("#city1").offset().top - py;
		var city2Offset = $("#city2").offset().top - py;
		var city4Offset = $("#city4").offset().top - py;
		var city5Offset = $("#city5").offset().top - py;
		var gainFlag = $("#gain-flag").offset().top - py;
		var imgNew = $("#img-new").offset().top - py;

		if(py == 0){
			$("#up").css("display","none");
		}

		if(bodyHeight>city1Offset && 1.0*city1Offset/bodyHeight < 0.3){
			$("#up").css("display","block");
			$("#city1 div.city").css({
				display:"block",
				animation: "up 0.6s cubic-bezier(0.68, 0.03, 0.99, 1)",
				'animation-fill-mode': 'forwards'
			});
		}

		if(bodyHeight>city2Offset && 1.0*city2Offset/bodyHeight < 0.3){
			$("#city2 div.city").css({
				display:"block",
				animation: "up 0.6s cubic-bezier(0.68, 0.03, 0.99, 1)",
				'animation-fill-mode': 'forwards'
			});
			$("#city3 div.city").css({
				display:"block",
				animation: "up 0.6s cubic-bezier(0.68, 0.03, 0.99, 1) 0.2s",
				'animation-fill-mode': 'forwards'
			});
		}

		if(bodyHeight>city4Offset && 1.0*city4Offset/bodyHeight < 0.5){
			$("#city4 div.city").css({
				display:"block",
				animation: "up 0.6s cubic-bezier(0.68, 0.03, 0.99, 1)",
				'animation-fill-mode': 'forwards'
			});
			$("#city4 .city .job").css({
				animation: "flagDown 0.6s cubic-bezier(0.68, 0.03, 0.99, 1) 0.6s",
    			"animation-fill-mode": "forwards"
			});
		}

		if(bodyHeight>city5Offset && 1.0*city5Offset/bodyHeight < 0.3){
			$("#city5 div.city").css({
				display:"block",
				animation: "up 0.6s cubic-bezier(0.68, 0.03, 0.99, 1)",
				'animation-fill-mode': 'forwards'
			});
		}

		if(bodyHeight>gainFlag && 1.0*gainFlag/bodyHeight < 0.3){
			beginFootAnimate = 1
		}

		if(bodyHeight>imgNew && 1.0*imgNew/bodyHeight < 0.3){
			for(var i = 1; i <=5; i++){
				$("#img-fly"+i).css({
					animation: "flyUp" + i + " 0.5s linear " + (0.5 * (i - 1)) + "s",
					'animation-fill-mode': 'forwards'
				});
				$("#img-flag-flow"+i).css({
					animation: "flagUp" + i + " 0.5s linear " + (0.5 * (i - 1)) + "s",
					'animation-fill-mode': 'forwards'
				});
			}
		}
	});

	$("#up-wrap").on("click","div",function(){
		clearInterval(timer);
		timer=setInterval(function(){
			var now=py;
			var speed=(0-now)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(py==0){
				clearInterval(timer);
			}
			$(window).scrollTop(py+speed);
		}, 30);
	});
	
})

var beginFootAnimate = 0;
var leftFoot = [0,0,0,0,0,0,0];	//左脚印数组
var rightFoot = [0,0,0,0,0,0,0];	//右脚印数组
var indexFoot = 0;
var flag = 0;	//先走哪只脚，0：右脚，1：左脚
var star = [0,0,0,0,0,0,0];
var starRandom = [0,1,2,3,4,5,6];
var delay = 0;	//让星星闪烁推迟一个周期

//初始化函数
function init() {
	starRandom.sort(function(){ return 0.5 - Math.random() });
}

//随机产生闪烁的星星
function starChoose(){
	//随机产生闪烁的个数
	var count = Math.round(Math.random()*1);
	for(i = 0 ; i < count ; i++){
		//随机选择哪个星星闪烁
		index = Math.round(Math.random()*6);
		star = [0,0,0,0,0,0,0];
		star[index] = 1;
	}
}

//给选中的星星
function starShine(){
	starChoose();
	for(i = 0; i < 7; i++){
		if(star[i] == 0){
			$("#img-star"+i).css('animation','');
		}else {
			$("#img-star"+i).css('animation','starLit 3s linear alternate');
		}
	}
}

//让星星随机出现
function randomStar(){
	debugger;
	for(i = 0 ; i < starRandom.length ; i++){
		$("#img-star"+i).css({
			'display':'inline-block',
			'animation':'starShow' + starRandom[i] + ' 0.3s linear ' + (0.3*i) + 's',
			'animation-fill-mode': 'forwards'
		});
	}
}

//动态修复两个foot数组
function synFoot() {
		if(indexFoot <=6){
			if(indexFoot%2 == 0){
				rightFoot[indexFoot] = 1;
			}else {
				leftFoot[indexFoot] = 1;
			}
		}
		// else {
		// 	if(indexFoot%2 == 0){
		// 		rightFoot[indexFoot%6] = 0;
		// 	}else {
		// 		leftFoot[indexFoot%6] = 0;
		// 	}
		// }
	
	indexFoot++;
	// if(indexFoot == 12){
	// 	indexFoot = 0;
	// }
}

//画脚步
function drawFeet() {
	synFoot();
	for(i = 0; i < 7 ; i++){
		if(leftFoot[i] == 0) {
			$("#left-foot"+i).css("display","none");
		}else {
			$("#left-foot"+i).css("display","block");
		}
		if(rightFoot[i] == 0) {
			$("#right-foot"+i).css("display","none");
		}else {
			$("#right-foot"+i).css("display","block");
		}
	}
}

//动画绘制
function drawAnimate(){
	if(delay == 0){
		starShine();
	}
	delay++;
	if(delay == 4){
		delay = 0;
	}

	if(beginFootAnimate == 1 && indexFoot < 7){
		drawFeet();
	}
}
