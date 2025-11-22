(function () {
  // 获取宽度（防御性处理，避免在不存在元素时抛错）
  var witdhDefual = 0;
  var $li5car = $('.li5box-car');
  if ($li5car.length) {
    var widthCss = $li5car.css('width') || '0px';
    var parsedWidth = parseFloat((widthCss + '').replace(/[^0-9\-,]/g, '')) || 0;
    witdhDefual = parsedWidth + 7;
  }
  let num = $('.li5box-ul .li5box-car').length || 0;
  if (num > 0 && witdhDefual > 0) {
    $('.li5box-ul').css('width', (num) * witdhDefual + 'px');
  }
  var MAX = (num - 1) * witdhDefual;


  $('#leftimg').click(function () {
    // 获取当前的偏移量（防御性处理：当 transform 不存在时使用默认矩阵）
    var transformCss = $('#li5boxul').css('transform') || 'matrix(1,0,0,1,0,0)';
    var transformNums = (transformCss + '').replace(/[^0-9\-,]/g, '').split(',');
    var value = 0;
    if (transformNums.length >= 5 && transformNums[4] !== '') {
      value = parseFloat(transformNums[4]) || 0;
    }

    if (value <= 0) {
      value = value * -1
    }

    if (value >= MAX) {
      return false
    }

    // 转移下一个偏移量
    let result = parseFloat(value + witdhDefual) * -1
    $('#li5boxul').css('transform', 'translate3d(' + result + 'px,0px,0px)');

  })
  $('#rightimg').click(function () {
    // 获取当前的偏移量（防御性处理）
    var transformCssR = $('#li5boxul').css('transform') || 'matrix(1,0,0,1,0,0)';
    var transformNumsR = (transformCssR + '').replace(/[^0-9\-,]/g, '').split(',');
    var value = 0;
    if (transformNumsR.length >= 5 && transformNumsR[4] !== '') {
      value = parseFloat(transformNumsR[4]) || 0;
    }
    if (value >= 0 || value < MAX * -1) {
      return false
    }

    // 转移下一个偏移量
    let result = parseFloat(value + witdhDefual)
    $('#li5boxul').css('transform', 'translate3d(' + result + 'px,0px,0px)')
  })


  $('#playbuttom').click(function () {
    $('#zhezhao').addClass('active')
    document.getElementById('videoResumeC').play();
  })

  $('#musicwrap').click(function () {
    console.log(14563)
    if ($(this).hasClass('paused')) {
      $(this).removeClass('paused')
      $('#play1')[0].play()
    } else {
      $(this).addClass('paused')
      $('#play1')[0].pause()
    }
  })


  // //一段正则，匹配所有_min.的图片src属性
	// var test = /_min\./
	// //遍历所有的图片节点
	// $("img").each(function(index,obj){	
	// 	if(test.test($(this).attr("src"))){
	// 		var reSrc = $(this).attr("src").replace(test,".");
	// 		$(this).attr("src",reSrc)
	// 	}		
	// })

})()
