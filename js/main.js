
$(function(){
	// $("#rgb_R").val(0);
	// $("#rgb_G").val(0);
	// $("#rgb_B").val(0);
	window.timer = 0;
	$('section :input').fancyInput()[0];	
	init("255","#rgb_R");
	init("255","#rgb_G");
	init("255","#rgb_B");
	$("#hsv_convert").click(function(){
		convertFromHsv();
	});
	$("#rgb_convert").click(function(){
		convertFromRgb();
	});
	$("#cmyk_convert").click(function(){
		convertFromCmyk();
	});
	$(".color_form div.fancyInput input").focusout(function(e){
		updateOneColor(e);
	});
})


function init(str, id){
	str = str.toString();
	$(id).val('');
	var input = $(id).val('')[0],
		s = str.split('').reverse(),
		len = s.length-1,
		e = $.Event('keypress');
			
			var	initInterval = setInterval(function(){
					if( s.length ){
						var c = s.pop();
						fancyInput.writer(c, input, len-s.length).setCaret(input);
						input.value += c;
					}
					else{ 
						window.timer++;
						clearInterval(initInterval);
						if(window.timer==3){
							convertFromRgb();
						}
					}
			},90);
}


var convertFromHsv = function() {
	if(validateHsv()){
		var hsv = new HSV($("#hsv_H").val(), $("#hsv_S").val(), $("#hsv_V").val());
		var rgb = ColorConverter.toRGB(hsv);
		var cmyk = ColorConverter.toCMYK(hsv);
		$("#rgb_form div.fancyInput div span").remove();
		$("#cmyk_form div.fancyInput div span").remove();
		init(rgb.r,"#rgb_R");
		init(rgb.g,"#rgb_G");
		init(rgb.b,"#rgb_B");
		init(cmyk.c,"#cmyk_C");
		init(cmyk.m,"#cmyk_M");
		init(cmyk.y,"#cmyk_Y");
		init(cmyk.k,"#cmyk_K");
		$(".color").css('background-color','rgb('+rgb.r+','+rgb.g+','+rgb.b+')');
	}
}

var validateHsv = function(){
	if($("#hsv_H").val().match(/\b([0-9]{1,2}|[12][0-9]{2}|3[0-5][0-9]|360)\b/) != null
		&&
		$("#hsv_S").val().match(/\b(0?[0-9]?[0-9]|1[0-1][0-9]|100)\b/) != null
		&&
		$("#hsv_V").val().match(/\b(0?[0-9]?[0-9]|1[0-1][0-9]|100)\b/) != null
		)
		return true;
	return false;
}

var convertFromRgb = function(){
	if(validateRgb()){
		var r = $("#rgb_R").val();
		var g = $("#rgb_G").val();
		var b = $("#rgb_B").val();
		var rgb = new RGB(r,g,b);
		var hsv = ColorConverter.toHSV(rgb);
		var cmyk = ColorConverter.toCMYK(rgb);
		$("#hsv_form div.fancyInput div span").remove();
		$("#cmyk_form div.fancyInput div span").remove();
		init(hsv.h,"#hsv_H");
		init(hsv.s,"#hsv_S");
		init(hsv.v,"#hsv_V");
		init(cmyk.c,"#cmyk_C");
		init(cmyk.m,"#cmyk_M");
		init(cmyk.y,"#cmyk_Y");
		init(cmyk.k,"#cmyk_K");
		$(".color").css('background-color','rgb('+rgb.r+','+rgb.g+','+rgb.b+')')
	}
}

var validateRgb = function(){
	if($("#rgb_R").val().match(/\b([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\b/) != null
		&&
		$("#rgb_G").val().match(/\b([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\b/) != null
		&&
		$("#rgb_B").val().match(/\b([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\b/) != null)
		return true;
	return false;
}

var validateCmyk = function(){
	if($("#cmyk_C").val().match(/\b([0-9]{1,2}|[12][0-9]{2}|3[0-5][0-9])\b/) != null
		&&
		$("#cmyk_M").val().match(/\b([0-9]{1,2}|[12][0-9]{2}|3[0-5][0-9])\b/) != null
		&&
		$("#cmyk_Y").val().match(/\b([0-9]{1,2}|[12][0-9]{2}|3[0-5][0-9])\b/) != null
		&&
		$("#cmyk_K").val().match(/\b([0-9]{1,2}|[12][0-9]{2}|3[0-5][0-9])\b/) != null)
		return true;
	return false;
}

var convertFromCmyk = function(){
	if(validateCmyk()){
		var c = $("#cmyk_C").val();
		var m = $("#cmyk_M").val();
		var y = $("#cmyk_Y").val();
		var k = $("#cmyk_K").val();
		var cmyk = new CMYK(c,m,y,k);
		var hsv = ColorConverter.toHSV(cmyk);
		var rgb = ColorConverter.toRGB(cmyk);
		$("#hsv_form div.fancyInput div span").remove();
		$("#rgb_form div.fancyInput div span").remove();
		init(hsv.h,"#hsv_H");
		init(hsv.s,"#hsv_S");
		init(hsv.v,"#hsv_V");
		init(rgb.r,"#rgb_R");
		init(rgb.g,"#rgb_G");
		init(rgb.b,"#rgb_B");
		$(".color").css('background-color','rgb('+rgb.r+','+rgb.g+','+rgb.b+')');
	}
}

var updateOneColor = function(e){
	if(e.target.id.match(/rgb/) != null){
		updateRgbColor();
	}
	else if(e.target.id.match(/hsv/)!=null){
		updateHsvColor();
	}
	else updateCmykColor();
}

var updateRgbColor = function(){
	if(validateRgb()){
		var r = $("#rgb_R").val();
		var g = $("#rgb_G").val();
		var b = $("#rgb_B").val();
		var rgb = new RGB(r,g,b);
		$("#rgb_color").css('background-color','rgb('+rgb.r+','+rgb.g+','+rgb.b+')');
	}
}

var updateHsvColor = function(){
	var hsv = new HSV($("#hsv_H").val(), $("#hsv_S").val(), $("#hsv_V").val());
	var rgb = ColorConverter.toRGB(hsv);
	$("#hsv_color").css('background-color','rgb('+rgb.r+','+rgb.g+','+rgb.b+')')
}

var updateCmykColor = function(){
	var c = $("#cmyk_C").val();
		var m = $("#cmyk_M").val();
		var y = $("#cmyk_Y").val();
		var k = $("#cmyk_K").val();
		var cmyk = new CMYK(c,m,y,k);;
		var rgb = ColorConverter.toRGB(cmyk);
		$("#cmyk_color").css('background-color','rgb('+rgb.r+','+rgb.g+','+rgb.b+')')
}
