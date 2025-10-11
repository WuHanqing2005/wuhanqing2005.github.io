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
          clearInterval(timer)
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

/* ====== 7. 多语言视频映射 ====== */
const videoMap = {
  cn: 'fWzKn0nZQLc',
  en: 'ALSu_zG1gXE',
  kr: 'ALeqSgPfTaQ',
  jp: '93t0ab3fs4I',
  de: 'Ze13uWps_Yw'
};

/* ====== 7-A. 根据 ID 生成 iframe ====== */
function buildIframe(id) {
  return `
    <iframe width="100%" height="100%"
      src="https://www.youtube.com/embed/${id}?autoplay=0&mute=1&rel=0"
      title="视频简历"
      frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen>
    </iframe>`;
}

/* ====== 7-B. 首次加载视频 ====== */
function loadVideo(lang) {
  const box = document.getElementById('video-box'); // 统一容器
  if (!box) return;                                 // 节点不存在就退出
  box.innerHTML = buildIframe(videoMap[lang]);
}

document.addEventListener('DOMContentLoaded', () => {
  /* 你原来的语言初始化 */
  initLanguage();

  /* 新增：读上次语言 → 加载对应视频 */
  const lastLang = localStorage.getItem('wtt-language') || 'cn';
  loadVideo(lastLang);
});

function switchLanguage(lang) {
  /* ====== 你原来的代码 ====== */
  $('[data-lang]').hide();
  $(`[data-lang="${lang}"]`).show();
  localStorage.setItem('wtt-language', lang);

  /* ====== 新增：同时换视频 ====== */
  loadVideo(lang);
}

function loadVideoWithPoster(lang) {
  const id  = videoMap[lang];
  const box = document.getElementById('video-box');
  box.innerHTML = `
    <div class="video-poster" style="position:relative;cursor:pointer;">
      <img width="100%" height="100%"
           src="https://img.youtube.com/vi/${id}/maxresdefault.jpg"
           alt="封面">
      <div class="play-btn" style="position:absolute;top:50%;left:50%;
                   transform:translate(-50%,-50%);
                   width:68px;height:68px;background:rgba(0,0,0,.65);
                   border-radius:50%;color:#fff;font-size:24px;
                   display:flex;align-items:center;justify-content:center;">
        ▶
      </div>
    </div>`;
  box.querySelector('.video-poster').onclick = () => {
    box.innerHTML = buildIframe(id);   // 用户点了再插播放器
  };
}
