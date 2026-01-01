(function () {
  // Try to request 2D contexts with willReadFrequently by default to avoid
  // repeated getImageData readback warnings in some browsers. This wraps
  // HTMLCanvasElement.prototype.getContext but falls back silently if not supported.
  try {
    const _origGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type) {
      if (type === '2d') {
        try {
          return _origGetContext.call(this, type, { willReadFrequently: true });
        } catch (e) {
          // Browser may not accept options — fall back to original
        }
      }
      return _origGetContext.apply(this, arguments);
    };
  } catch (e) {
    // Ignore in environments that don't expose HTMLCanvasElement
  }

  initActive()
  bindEvenInit()
  var mycard = $('#mycard')

  let mycardTop = mycard && mycard.offset() && mycard.offset().top;
  // let height=$('.header').height()
  // console.log(mycardTop,height)
  window.onscroll = function () {
    var e = e || window.event;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollTop)
    if (scrollTop > mycardTop) {
      mycard.addClass('scroll')
    } else {
      mycard.removeClass('scroll')
    }
  }

  /**
   * giscus 主题同步相关
   * - 通过 postMessage 向 giscus iframe 发送 setConfig 请求，动态切换 theme
   * - 支持页面上多个 .giscus 容器（会遍历所有 iframe）
   */
  function waitForGiscusIframes(timeout = 8000) {
    const wraps = document.querySelectorAll('.giscus');
    if (!wraps || wraps.length === 0) return Promise.reject('no .giscus container found');

    // 如果已有 iframe，立即返回
    const existing = Array.from(document.querySelectorAll('.giscus iframe.giscus-frame, .giscus iframe'));
    if (existing.length) return Promise.resolve(existing);

    return new Promise((resolve, reject) => {
      const start = Date.now();
      const mo = new MutationObserver(() => {
        const found = Array.from(document.querySelectorAll('.giscus iframe.giscus-frame, .giscus iframe'));
        if (found.length) {
          mo.disconnect();
          resolve(found);
        } else if (Date.now() - start > timeout) {
          mo.disconnect();
          reject('timeout waiting for giscus iframe');
        }
      });
      // Observe body subtree for inserted iframes
      mo.observe(document.body, { childList: true, subtree: true });
    });
  }

  function postGiscusTheme(themeName) {
    // 如果页面没有任何 .giscus 容器，直接返回（静默处理）
    const wraps = document.querySelectorAll('.giscus');
    if (!wraps || wraps.length === 0) return;

    // themeName can be 'dark'/'light' or any giscus-supported theme name or a CSS URL
    waitForGiscusIframes().then(iframes => {
      iframes.forEach(iframe => {
        try {
          iframe.contentWindow.postMessage({
            giscus: {
              setConfig: {
                theme: themeName
              }
            }
          }, 'https://giscus.app');
        } catch (e) {
          // 可能因跨域访问抛错，捕获并记录
          console.warn('Failed to postMessage to giscus iframe', e);
        }
      });
    }).catch(err => {
      // 如果没有 iframe 或等待超时，使用 debug 级别记录（避免噪音）
      console.debug('giscus iframe not ready:', err);
    });
  }

  // 根据当前页面 UI 状态判断主题，并发送给 giscus
  function syncGiscusThemeFromUI() {
    try {
      // 你的逻辑里 #myRadio 有 .active 代表黑色主题
      const isDark = document.querySelector('#myRadio') && document.querySelector('#myRadio').classList.contains('active');
      const theme = isDark ? 'dark' : 'light';
      postGiscusTheme(theme);
    } catch (e) {
      console.warn('syncGiscusThemeFromUI error', e);
    }
  }

  // 暴露全局方法以便手动触发（控制台或其他脚本）
  window.syncGiscusThemeFromUI = syncGiscusThemeFromUI;

  function initActive () {
    let root = document.querySelector(':root')
    var active = sessionStorage.getItem('wttandroid')

    if (active && active == 'true') { // 非第一次登录 且是开灯(白色)
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

    } else { // 第一次登录或是黑色时 默认变成黑色
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

    // 尝试同步 giscus 的主题到当前 UI（如果 iframe 存在，会生效）
    // 延迟一点以提高 giscus script 插入 iframe 的成功率
    setTimeout(syncGiscusThemeFromUI, 200);
  }

  $('#myRadio').click(function () {
    // h1
    let root = document.querySelector(':root')

    // 封装背景图片切换
    function updateNavigationBg() {
      const nav = document.querySelector('.navigation');
      if (!nav) return;
      if (nav.classList.contains('active')) {
        // 黑色主题
        const imgBlack = new Image();
        imgBlack.src = "/img/back/black_background_progressive.jpg";
        imgBlack.onload = () => {
          nav.style.backgroundImage = `url('${imgBlack.src}')`;
        };
      } else {
        // 白色主题
        const imgWhite = new Image();
        imgWhite.src = "/img/back/white_background_progressive.jpg";
        imgWhite.onload = () => {
          nav.style.backgroundImage = `url('${imgWhite.src}')`;
        };
      }
    }

    if ($('#myRadio').hasClass('active')) { // 现在黑色变成白色
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

      updateNavigationBg();

    } else {// 现在白色变成黑色
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

      updateNavigationBg();
    }

    // 在主题切换完成后，立即同步 giscus 主题（把当前 UI 主题转换为 giscus 的 'dark' / 'light'）
    // 使用短延迟确保 DOM/class 已更新
    setTimeout(syncGiscusThemeFromUI, 50);
  })

  $('#zhezhao>.close').click(function () {
    // console.log('遮罩层')
    if ($('#zhezhao').hasClass('active')) {
      $('#zhezhao').removeClass('active')
      var v = document.getElementById('videoResumeC');
      if (v && typeof v.pause === 'function') v.pause();
    } else {
      $('#zhezhao').addClass('active')
    }
  })

  $('#minmenu').click(function () {
    // console.log('遮罩层')
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
      timer = opacity && setInterval(() => {
        opacity -= 0.1
        $('.lodding-wrap').css('opacity', opacity);
        // console.log(opacity)
        if (opacity <= 0) {
          $('.lodding-wrap').css('display', 'none');
          clearInterval(timer)
        }
      }, 100);

    }
  }

  // 锚点定位初始化
  function bindEvenInit() {
    $('.navbtn').bind("click touch", function () {
      // scrollTop 滚动到 $(this).attr('href')锚点关联id所在位置
      $('html,body').animate({ scrollTop: ($($(this).attr('href')).offset().top - 100) }, 500)
      return false
    })
  }
})();

// 语言切换功能（改为在根目录的语言文件夹之间进行跳转）
(function() {
  // 语言与文件夹映射（value -> folder）
  const folderMap = {
    cn: 'zh-CN',
    en: 'en-US',
    kr: 'ko-KR',
    jp: 'ja-JP',
    de: 'de-DE'
  };

  // 从当前 pathname 推断当前语言 value（cn/en/kr/jp/de）
  function detectLangFromPath() {
    try {
      const m = location.pathname.match(/^\/(zh-CN|en-US|ko-KR|ja-JP|de-DE)(?:\/|$)/);
      if (m && m[1]) {
        const folder = m[1];
        for (const key in folderMap) {
          if (folderMap[key] === folder) return key;
        }
      }
    } catch (e) { /* ignore */ }
    // fallback to saved value or cn
    return localStorage.getItem('wtt-language') || 'cn';
  }

  // 构造目标 URL：将当前路径替换为目标语言文件夹下的同名路径
  function buildTargetUrl(targetLangValue) {
    const targetFolder = folderMap[targetLangValue] || folderMap['en'];
    let pathname = location.pathname || '/';

    // 保留 search + hash
    const search = location.search || '';
    const hash = location.hash || '';

    // 去掉开头的斜杠以方便拼接
    let stripped = pathname.replace(/^\//, '');

    // 如果当前路径以已知语言文件夹开头，去掉该段
    stripped = stripped.replace(/^(zh-CN|en-US|ko-KR|ja-JP|de-DE)(\/|$)/, '');

    // 当 stripped 为空或为目录时，保留为 index.html
    if (!stripped || stripped.endsWith('/')) {
      stripped = stripped || 'index.html';
      // 如果原路径以 /folder/ 结尾且没有明确文件名，保留 index.html
    }

    // 构造新路径
    const newPath = '/' + targetFolder + '/' + stripped.replace(/^\//, '');
    return location.origin + newPath + search + hash;
  }

  // 切换语言：将页面跳转到对应语言文件夹下的同名文件
  function switchLanguageToFolder(langValue) {
    if (!langValue) return;
    // 保存语言选择
    localStorage.setItem('wtt-language', langValue);

    const targetUrl = buildTargetUrl(langValue);
    // 直接跳转到目标页面
    if (targetUrl !== location.href) {
      window.location.href = targetUrl;
    }
  }

  // 初始化：根据 URL 或 localStorage 设置下拉框值
  function initLanguageSelect() {
    const detected = detectLangFromPath();
    $('#language-select').val(detected);
    // 同步头部显示的国旗（如果存在）
    try {
      var flag = document.getElementById('lang-flag');
      if (flag) {
        var map = { cn: 'cn', en: 'us', kr: 'kr', jp: 'jp', de: 'de' };
        var code = map[detected] || 'us';
        // 使用站点根路径，避免不同目录层级导致的相对路径错误
        flag.src = '/img/flag/' + code + '.svg';
      }
    } catch (e) { /* ignore */ }
  }

  // 绑定变化事件：跳转到对应文件夹
  $('#language-select').change(function() {
    const selected = $(this).val();
    // 更新头部国旗显示
    try {
      var flag = document.getElementById('lang-flag');
      if (flag) {
        var map = { cn: 'cn', en: 'us', kr: 'kr', jp: 'jp', de: 'de' };
        var code = map[selected] || 'us';
        // 使用站点根路径，避免不同目录层级导致的相对路径错误
        flag.src = '/img/flag/' + code + '.svg';
      }
    } catch (e) { /* ignore */ }

    // 移动端/平板：语言切换时自动关闭汉堡菜单
    try {
      var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      if (vw <= 1250) {
        var minmenu = document.getElementById('minmenu');
        var menuList = document.querySelector('.menu_list');
        if (minmenu && minmenu.classList.contains('active')) {
          minmenu.classList.remove('active');
        }
        if (menuList && menuList.classList.contains('active')) {
          menuList.classList.remove('active');
        }
      }
    } catch (e) { /* ignore */ }

    switchLanguageToFolder(selected);
  });

  // 页面加载时初始化选择器
  initLanguageSelect();
})();

window.addEventListener("load", () => {
  // 黑色主题
  const blackNav = document.querySelector(".navigation.active");
  if (blackNav) {
    const imgBlack = new Image();
    imgBlack.src = "/img/back/black_background_progressive.jpg"; // 高清图
    imgBlack.onload = () => {
      blackNav.style.backgroundImage = `url('${imgBlack.src}')`;
    };
  }

  // 白色主题
  const whiteNav = document.querySelector(".navigation:not(.active)");
  if (whiteNav) {
    const imgWhite = new Image();
    imgWhite.src = "/img/back/white_background_progressive.jpg"; // 高清图
    imgWhite.onload = () => {
      whiteNav.style.backgroundImage = `url('${imgWhite.src}')`;
    };
  }
});

// 微信号复制函数
document.addEventListener('DOMContentLoaded', function() {
  // attach to all elements that may (incorrectly) share this id
  var wechatEls = document.querySelectorAll('#wechat-copy');
  wechatEls.forEach(function(wechatBtn) {
    if (!wechatBtn) return;
    wechatBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var wechatId = 'Daniel_Qinghan';
      navigator.clipboard.writeText(wechatId).then(function() {
        alert('微信号已复制到剪贴板！');
      }, function() {
        alert('复制失败，请手动复制微信号：' + wechatId);
      });
    });
  });
});

// QQ号复制函数
document.addEventListener('DOMContentLoaded', function() {
  var qqEls = document.querySelectorAll('#qq-copy');
  qqEls.forEach(function(qqBtn) {
    if (!qqBtn) return;
    qqBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var qqId = '3301208605';
      navigator.clipboard.writeText(qqId).then(function() {
        alert('QQ号已复制到剪贴板！');
      }, function() {
        alert('复制失败，请手动复制QQ号：' + qqId);
      });
    });
  });
});

// kakao号复制函数
document.addEventListener('DOMContentLoaded', function() {
  var kakaoEls = document.querySelectorAll('#kakao-copy');
  kakaoEls.forEach(function(kakaoBtn) {
    if (!kakaoBtn) return;
    kakaoBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var kakaoId = 'Daniel_Qinghan';
      navigator.clipboard.writeText(kakaoId).then(function() {
        alert('Kakao号已复制到剪贴板！');
      }, function() {
        alert('复制失败，请手动复制Kakao号：' + kakaoId);
      });
    });
  });
});

// 完善的话题筛选和搜索功能
function initTopicFilter() {
  // 话题筛选按钮点击事件
  document.querySelectorAll('.topic-filter li').forEach(item => {
    item.addEventListener('click', function() {
      // 移除所有active类
      document.querySelectorAll('.topic-filter li').forEach(li => {
        li.classList.remove('active');
      });

      // 添加active类到当前点击的项
      this.classList.add('active');

      // 应用筛选
      applyFilters();
    });
  });
}

// 搜索功能
function initSearch() {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  if (!searchButton || !searchInput) return;

  // 搜索按钮点击事件
  searchButton.addEventListener('click', function() {
    applyFilters();
  });

  // 输入框实时搜索
  searchInput.addEventListener('input', function() {
    applyFilters();
  });
}

// 更完善且独立的 blog 搜索逻辑
function normalizeTextForSearch(str) {
  if (!str) return '';
  // 转小写
  let s = String(str).toLowerCase();
  // 保留中日韩汉字、拉丁字母和数字，其他字符替换为空格（去除标点）
  s = s.replace(/[^0-9a-zA-Z\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7a3\s]/g, ' ');
  // 合并连续空白
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function applyBlogFilters() {
  const raw = (document.getElementById('search-input') && document.getElementById('search-input').value) || '';
  const keyword = normalizeTextForSearch(raw);

  const activeLi = document.querySelector('.topic-filter li.active');
  const activeTopic = activeLi ? activeLi.getAttribute('data-topic') : 'all';
  const articles = document.querySelectorAll('.li3-box');

  articles.forEach(article => {
    // 收集可能包含标题/摘要的所有文字节点
    let parts = [];
    const h3 = article.querySelector('h3');
    const a = article.querySelector('a');
    const p = article.querySelector('p');
    const topicAttr = article.getAttribute('data-topics') || '';
    const articleTopicSpan = article.querySelector('.article-topic');

    if (h3) parts.push(h3.textContent);
    if (a) parts.push(a.textContent);
    if (p) parts.push(p.textContent);
    if (articleTopicSpan) parts.push(articleTopicSpan.textContent);
    if (topicAttr) parts.push(topicAttr);

    const hay = normalizeTextForSearch(parts.join(' '));

    // 话题匹配（保持与原逻辑一致）
    const topics = article.getAttribute('data-topics');
    const matchesTopic = activeTopic === 'all' || (topics && topics.includes(activeTopic));

    // 搜索匹配：如果关键字为空则通过；否则判断规范化后的文本是否包含关键字
    const matchesSearch = !keyword || hay.indexOf(keyword) !== -1;

    if (matchesTopic && matchesSearch) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
}

function initBlogSearch() {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  if (!searchButton || !searchInput) return;

  // 点击与输入均触发 blog 专用过滤
  searchButton.addEventListener('click', function() {
    applyBlogFilters();
  });
  searchInput.addEventListener('input', function() {
    applyBlogFilters();
  });

  // 也在话题切换时调用，保持同步
  document.querySelectorAll('.topic-filter li').forEach(item => {
    item.addEventListener('click', function() {
      // slight delay to allow active class to update
      setTimeout(applyBlogFilters, 10);
    });
  });
}

// 综合应用筛选条件
function applyFilters() {
  const keyword = (document.getElementById('search-input') && document.getElementById('search-input').value || '').toLowerCase().trim();
  const activeLi = document.querySelector('.topic-filter li.active');
  const activeTopic = activeLi ? activeLi.getAttribute('data-topic') : 'all';
  const articles = document.querySelectorAll('.li3-box');

  articles.forEach(article => {
    const titleEl = article.querySelector('a');
    const pEl = article.querySelector('p');
    const title = titleEl ? titleEl.textContent.toLowerCase() : '';
    const content = pEl ? pEl.textContent.toLowerCase() : '';
    const topics = article.getAttribute('data-topics');

    // 检查话题筛选条件
    const matchesTopic = activeTopic === 'all' || (topics && topics.includes(activeTopic));

    // 检查搜索条件
    const matchesSearch = !keyword || title.includes(keyword) || content.includes(keyword);

    // 同时满足话题筛选和搜索条件才显示
    if (matchesTopic && matchesSearch) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
}

// 在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  try {
    initTopicFilter();
    // 如果页面是 blog（存在 .content-li.li3 或 topic-filter），使用更完善的 blog 搜索逻辑
    const isBlogLike = !!document.querySelector('.content-li.li3') || !!document.querySelector('.topic-filter');
    if (isBlogLike) {
      initBlogSearch();
    } else {
      initSearch();
    }
    // 填充文章列表中的话题标签（从每个 .li3-box 的 data-topics 读取）
    initArticleTopics();
  } catch (e) {
    // ignore
  }
});

// 将每篇文章的 data-topics 写入对应的 .article-topic 元素
function initArticleTopics() {
  document.querySelectorAll('.li3-box').forEach(box => {
    const topics = box.getAttribute('data-topics');
    if (!topics) return;

    // 优先寻找显式的占位 span.article-topic
    let span = box.querySelector('.article-topic');
    if (span) {
      for (const topic of topics.split(',').map(t => t.trim())) {
        const topicSpan = document.createElement('span');
        topicSpan.textContent = '#' + topic;
        span.appendChild(topicSpan);
      }
      return;
    }

    // 兜底：如果没有 article-topic，则把最后一个 .address-left 内的 span 更新为话题
    const left = box.querySelector('.address-left');
    if (left) {
      const last = left.querySelector('span:last-of-type');
      if (last) last.textContent = '#' + topics;
    }
  });
}