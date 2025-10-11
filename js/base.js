(function () {
  initActive()
  bindEvenInit()
  var mycard = $('#mycard')
  
    let mycardTop = mycard&&mycard.offset()&&mycard.offset().top;
    // let height=$('.header').height()
    // console.log(mycardTop,height)
    window.onscroll = function () {
      var e = e || window.event;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      console.log(scrollTop)
      if (scrollTop > mycardTop) {
        mycard.addClass('scroll')
      } else {
        mycard.removeClass('scroll')
      }
    }

  function initActive () {
    let root = document.querySelector(':root')
    var active = sessionStorage.getItem('wttandroid')
    
    
    if (active && active == 'true') { //非第一次登录 且是开灯(白色)
      $('#myRadio').removeClass('active')
      $('.navigation').removeClass('active')

      root.style.setProperty('--backColor', '#fff')
      root.style.setProperty('--borderline', '#fff')
      root.style.setProperty('--headerCOlor', '#fff')
      root.style.setProperty('--headerhover', 'rgb(255, 255, 255,.8)')
      root.style.setProperty('--headerFont', '#00283A' )
      root.style.setProperty('--fontColor', '#fff' )
      root.style.setProperty('--mainColor', '#ff8181' )
      root.style.setProperty('--bagColor', '#f4f5f7')
    } else { //第一次登录或是黑色时 默认变成黑色
      $('#myRadio').addClass('active')
      $('.navigation').addClass('active')
      
      root.style.setProperty('--backColor', '#fff')
      root.style.setProperty('--borderline', '#00283A')
      root.style.setProperty('--headerCOlor', '#00283A')
      root.style.setProperty('--headerhover', 'rgb(0, 40, 58,.8)')
      root.style.setProperty('--headerFont', '#fff' )
      root.style.setProperty('--fontColor', '#00283A' )
      root.style.setProperty('--mainColor', '#ff8181' )
      root.style.setProperty('--bagColor','#02162b' )
    }
  }



  $('#myRadio').click(function () {
    // h1
    let root = document.querySelector(':root')

    if ($('#myRadio').hasClass('active')) { //现在黑色变成白色
      sessionStorage.setItem('wttandroid', true)
      
      $('#myRadio').removeClass('active')
      $('.navigation').removeClass('active')

      root.style.setProperty('--backColor', '#fff')
      root.style.setProperty('--borderline', '#fff')
      root.style.setProperty('--headerCOlor', '#fff')
      root.style.setProperty('--headerhover', 'rgb(255, 255, 255,.8)')
      root.style.setProperty('--headerFont', '#00283A' )
      root.style.setProperty('--fontColor', '#fff' )
      root.style.setProperty('--mainColor', '#ff8181' )
      root.style.setProperty('--bagColor', '#f4f5f7')

    } else {//现在白色变成黑色
      sessionStorage.setItem('wttandroid', false)
      
      $('#myRadio').addClass('active')
      $('.navigation').addClass('active')
      
      root.style.setProperty('--backColor', '#fff')
      root.style.setProperty('--borderline', '#00283A')
      root.style.setProperty('--headerCOlor', '#00283A')
      root.style.setProperty('--headerhover', 'rgb(0, 40, 58,.8)')
      root.style.setProperty('--headerFont', '#fff' )
      root.style.setProperty('--fontColor', '#00283A' )
      root.style.setProperty('--mainColor', '#ff8181' )
      root.style.setProperty('--bagColor','#02162b' )
    }
})

  

   
$('#zhezhao>.close').click(function () {
  console.log('遮罩层')
  if ($('#zhezhao').hasClass('active')) {
    $('#zhezhao').removeClass('active')
    document.getElementById('videoResumeC').pause();
  } else {
    $('#zhezhao').addClass('active')
  }
})
  
$('#minmenu').click(function () {
  console.log('遮罩层')
  if ($('#minmenu').hasClass('active')) {
    $('#minmenu').removeClass('active');
    $('.menu_list').removeClass('active');
    
  } else {
    $('#minmenu').addClass('active')
    $('.menu_list').addClass('active')
  }
})
  
  

  
  
  // loadding
  document.onreadystatechange = function () {
    if (document.readyState == 'complete') {
      let opacity = $('.lodding-wrap').css('opacity');
      let timer = null;
      timer = opacity&&setInterval(() => {
        opacity-=0.1
        $('.lodding-wrap').css('opacity', opacity);
        console.log(opacity)
        if (opacity <= 0) {
          $('.lodding-wrap').css('display','none');
          timer && clearInterval(timer);   // 只有 timer 存在时才清
          timer = null;                    // 清完立即置空，防止重复清
        }
      }, 100);
     
    }
  }

  //锚点定位初始化
  function bindEvenInit(){
    $('.navbtn').bind("click touch",function () {
      //scrollTop 滚动到  $(this).attr('href')锚点关联id所在位置
      $('html,body').animate({scrollTop:($($(this).attr('href')).offset().top-100)},500)
      return false
    })
  }
})();

// 语言切换功能
(function() {
  // 初始化语言
  function initLanguage() {
    const savedLang = localStorage.getItem('wtt-language') || 'cn';
    $('#language-select').val(savedLang);
    switchLanguage(savedLang);
  }
  
  // 切换语言
  function switchLanguage(lang) {
    // 隐藏所有语言元素
    $('[data-lang]').hide();
    
    // 显示选定语言的元素
    $(`[data-lang="${lang}"]`).show();
    
    // 保存语言选择
    localStorage.setItem('wtt-language', lang);
  }
  
  // 绑定语言选择事件
  $('#language-select').change(function() {
    const selectedLang = $(this).val();
    switchLanguage(selectedLang);
  });
  
  // 初始化语言
  initLanguage();
})();

window.addEventListener("load", () => {
  // 黑色主题
  const blackNav = document.querySelector(".navigation.active");
  if (blackNav) {
    const imgBlack = new Image();
    imgBlack.src = "../img/back/black_background_progressive.jpg"; // 高清图
    imgBlack.onload = () => {
      blackNav.style.backgroundImage = `url('${imgBlack.src}')`;
    };
  }

  // 白色主题
  const whiteNav = document.querySelector(".navigation:not(.active)");
  if (whiteNav) {
    const imgWhite = new Image();
    imgWhite.src = "../img/back/white_background_progressive.jpg"; // 高清图
    imgWhite.onload = () => {
      whiteNav.style.backgroundImage = `url('${imgWhite.src}')`;
    };
  }
});

// 微信号复制函数
document.addEventListener('DOMContentLoaded', function() {
  var wechatBtn = document.getElementById('wechat-copy');
  if (wechatBtn) {
    wechatBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var wechatId = 'Daniel_Qinghan';
      navigator.clipboard.writeText(wechatId).then(function() {
        alert('微信号已复制到剪贴板！');
      }, function() {
        alert('复制失败，请手动复制微信号：' + wechatId);
      });
    });
  }
});

// QQ号复制函数
document.addEventListener('DOMContentLoaded', function() {
  var wechatBtn = document.getElementById('qq-copy');
  if (wechatBtn) {
    wechatBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var wechatId = '3301208605';
      navigator.clipboard.writeText(wechatId).then(function() {
        alert('QQ号已复制到剪贴板！');
      }, function() {
        alert('复制失败，请手动复制微信号：' + wechatId);
      });
    });
  }
});
