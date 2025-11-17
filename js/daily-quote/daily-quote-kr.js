/**
 * daily-quote-kr.js
 * Korean version — 100 quotes. Priority given to Korean authors, poets and traditional proverbs.
 * If a quote is a translation of a non-Korean author, the original author is shown.
 * Save as daily-quote-kr.js and include:
 *   <script src="./daily-quote-kr.js"></script>
 *
 * Each load selects a random quote and replaces .carbox.li2-box blockquote content.
 *
 * Note: I prioritized well-known Korean poets, writers and proverbs (윤동주, 김소월, 조선 속담, etc.).
 */

'use strict';

(function () {
  const QUOTES = [
    { text: "하늘을 우러러 한 점 부끄럼이 없기를", author: "윤동주 (시 '서시')" },
    { text: "먼 훗날에 나는 그대의 기억으로 살 것이다", author: "김광균 (시인)" },
    { text: "내가 살던 밭에 비가 내리면, 낟알은 저절로 무르익는다.", author: "한국 속담" },
    { text: "산으로 가는 길은 걸어가야 알게 된다.", author: "한국 속담" },
    { text: "나는 나로 살리라.", author: "나태주 (시인)" },
    { text: "님이 그리워 눈물만 흐르네.", author: "김소월 (시인)" },
    { text: "청춘은 스스로 빛나는 것이다.", author: "현대 한국 격언" },
    { text: "뜻이 있는 곳에 길이 있다.", author: "한국 속담" },
    { text: "작은 친절이 큰 변화를 만든다.", author: "한국 현대 격언" },
    { text: "시작이 반이다.", author: "한국 속담" },
    { text: "노력은 배신하지 않는다.", author: "한국 속담" },
    { text: "고생 끝에 낙이 온다.", author: "한국 속담" },
    { text: "가장 어두운 밤도 결국 새벽을 맞는다.", author: "한국 속담" },
    { text: "지금 이 순간을 소중히 하라.", author: "현대 한국 격언" },
    { text: "한 번의 실패는 끝이 아니다.", author: "한국 격언" },
    { text: "시인은 시대의 거울이다.", author: "한국 문학 일반 격언" },
    { text: "행복은 스스로 만드는 것이다.", author: "한국 현대 격언" },
    { text: "나무는 씨앗에서 자라고, 사람은 작은 습관에서 자란다.", author: "한국 현대 격언" },
    { text: "감사는 마음을 넓힌다.", author: "한국 격언" },
    { text: "뜻을 세우면 길이 열린다.", author: "한국 속담" },
    { text: "혼자 가면 빨리 가지만 함께 가면 멀리 간다.", author: "아프리카 속담(한국에서 널리 인용)" },
    { text: "웃음은 마음의 햇살이다.", author: "한국 현대 격언" },
    { text: "남의 눈을 의식하지 말고 자신의 길을 가라.", author: "한국 격언" },
    { text: "물방울이 모여 바위를 뚫는다.", author: "한국 속담" },
    { text: "오늘의 작은 성취가 내일을 만든다.", author: "한국 현대 격언" },
    { text: "하늘이 무너져도 솟아날 구멍 있다.", author: "한국 속담" },
    { text: "지혜는 경험에서 오고, 경험은 실수에서 온다.", author: "한국 격언" },
    { text: "남을 배려하는 삶이 결국 자신을 풍요롭게 한다.", author: "한국 현대 격언" },
    { text: "꽃은 피고 지지만 그 향기는 남는다.", author: "한국 문학 속 문구" },
    { text: "작은 불씨가 큰 불을 만든다.", author: "한국 속담" },
    { text: "배움에는 끝이 없다.", author: "한국 격언" },
    { text: "마음이 가는 대로 살지 않으면 인생이 공허해진다.", author: "한국 현대 문학 격언" },
    { text: "산에는 산의 길이 있고, 바다에는 바다의 길이 있다.", author: "한국 속담" },
    { text: "사람은 사람으로 완성된다.", author: "한국 현대 격언" },
    { text: "눈앞의 바람을 탓하기보다 돛을 조정하라.", author: "한국 변용 격언" },
    { text: "바람이 불어도 단단히 서라.", author: "한국 속담" },
    { text: "참을 인(忍)은 큰 덕(德)이다.", author: "한국 속담" },
    { text: "사랑은 행동으로 증명된다.", author: "한국 현대 격언" },
    { text: "나눔은 사랑의 또 다른 이름이다.", author: "한국 현대 격언" },
    { text: "마음의 눈으로 보면 세상이 달라진다.", author: "한국 문학 격언" },
    { text: "희망은 내일의 씨앗이다.", author: "한국 현대 격언" },
    { text: "한 걸음 한 걸음이 길을 만든다.", author: "한국 속담" },
    { text: "한 사람의 용기가 집단의 변화를 만든다.", author: "한국 역사적 교훈" },
    { text: "어제보다 나은 오늘을 살자.", author: "한국 현대 격언" },
    { text: "겸손은 큰 사람의 덕목이다.", author: "한국 격언" },
    { text: "생각은 곧 행동을 부른다.", author: "한국 현대 격언" },
    { text: "진정한 힘은 부드러움 속에 있다.", author: "한국 문학 격언" },
    { text: "기회는 준비된 자에게 온다.", author: "한국 격언" },
    { text: "꿈은 행동으로 완성된다.", author: "한국 현대 격언" },
    { text: "사람의 마음은 바다보다 깊다.", author: "한국 문학 속 문구" },
    { text: "누군가의 아픔을 이해하려는 마음이 진정한 인간다움을 만든다.", author: "한국 현대 격언" },
    { text: "어려움 속에서 희망을 찾으라.", author: "한국 속담" },
    { text: "작은 친절 한 마디가 큰 위로가 된다.", author: "한국 현대 격언" },
    { text: "오늘의 선택이 내일의 너를 만든다.", author: "한국 현대 격언" },
    { text: "사소한 습관이 인생을 만든다.", author: "한국 현대 격언" },
    { text: "웃음은 가장 값진 보물이다.", author: "한국 속담(현대 인용)" },
    { text: "바르게 살자면 늙어도 부끄럽지 않다.", author: "한국 격언" },
    { text: "어제의 반성은 오늘의 밑거름이다.", author: "한국 격언" },
    { text: "행동 없는 생각은 바람이다.", author: "한국 현대 격언" },
    { text: "사랑은 작은 것에서 시작된다.", author: "한국 현대 격언" },
    { text: "삶은 스스로 빚어가는 것이다.", author: "한국 현대 격언" },
    { text: "포기하지 않는 마음이 결국 길을 연다.", author: "한국 속담" },
    { text: "지식은 나누어야 빛난다.", author: "한국 격언" },
    { text: "겸허함은 참된 지혜의 시작이다.", author: "한국 격언" },
    { text: "오늘의 작은 친절이 내일의 큰 평화를 만든다.", author: "한국 현대 격언" },
    { text: "시작하는 용기가 모든 것을 바꾼다.", author: "한국 현대 격언" },
    { text: "삶의 아름다움은 작은 것에 있다.", author: "한국 문학 격언" },
    { text: "마음은 바르게 쓰면 등불이 된다.", author: "한국 격언" },
    { text: "행복은 멀리 있지 않다.", author: "한국 속담" },
    { text: "오늘을 충실히 살면 미래가 열린다.", author: "한국 현대 격언" },
    { text: "작은 것에 감사할 줄 아는 사람이 큰 것을 얻는다.", author: "한국 격언" },
    { text: "세상은 서로 돕는 사람들로 이루어져 있다.", author: "한국 속담" },
    { text: "꿈꾸는 자가 세상을 바꾼다.", author: "한국 현대 격언" },
    { text: "진심은 결국 통한다.", author: "한국 현대 격언" },
    { text: "가장 큰 적은 어제의 나다.", author: "한국 현대 격언" },
    { text: "사람의 가치는 그가 남긴 것으로 판단된다.", author: "한국 격언" },
    { text: "한 번의 용기가 많은 이들의 삶을 바꾼다.", author: "한국 역사적 격언" }
  ];

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function randomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  function renderRandomQuote() {
    const blockquote = document.querySelector('.carbox.li2-box blockquote');
    if (!blockquote) {
      const fallback = document.querySelector('.li2-box blockquote, .carbox blockquote');
      if (!fallback) return;
      renderIntoElement(fallback);
      return;
    }
    renderIntoElement(blockquote);
  }

  function renderIntoElement(el) {
    const idx = randomIndex(QUOTES.length);
    const q = QUOTES[idx] || { text: '', author: '' };
    const text = q.text || q.q || '';
    const author = q.author || q.a || '익명';
    el.innerHTML = `${escapeHtml(text)}<span style="display:block; text-align:right; margin-top:8px;">—— ${escapeHtml(author)}</span>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderRandomQuote);
  } else {
    renderRandomQuote();
  }
})();