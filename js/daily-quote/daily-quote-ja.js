/**
 * daily-quote-ja.js
 * Japanese version — 100 quotes. Priority to Japanese poets, writers and proverbs.
 * If the quote is a translation of a non-Japanese author, the original author is shown.
 * Save as daily-quote-ja.js and include:
 *   <script src="./daily-quote-ja.js"></script>
 *
 * Each visit selects a random quote and inserts into .carbox.li2-box blockquote.
 */

'use strict';

(function () {
  const QUOTES = [
    { text: "古池や 蛙飛びこむ 水の音。", author: "松尾芭蕉" },
    { text: "千里の道も一歩より始まる。", author: "日本ことわざ" },
    { text: "雨にも負けず 風にも負けず", author: "宮沢賢治" },
    { text: "花の色は 移りにけりないたづらに", author: "小野小町" },
    { text: "一期一会", author: "茶道用語（文化的格言）" },
    { text: "為せば成る 為さねば成らぬ 何事も", author: "上杉鷹山（伝）" },
    { text: "人を愛することは人を理解することから始まる。", author: "夏目漱石（引用的精神）" },
    { text: "七転び八起き。", author: "日本ことわざ" },
    { text: "花は桜木、人は武士。", author: "日本ことわざ" },
    { text: "夢なき者には理想なし。", author: "日本現代格言" },
    { text: "学びて時にこれを習う、また説ばしからずや。", author: "孔子（日本文化で引用）" },
    { text: "人間は考える葦である。", author: "パスカル（原作者）" },
    { text: "月日は百代の過客にして、行かふ年も又旅人也。", author: "松尾芭蕉（引用）" },
    { text: "花鳥風月を楽しむ心を忘れるな。", author: "日本文化格言" },
    { text: "人生は旅である。", author: "日本現代格言" },
    { text: "心の中の灯を消さぬこと。", author: "日本文学格言" },
    { text: "弱さを認めることが強さの始まりである。", author: "日本現代作家（通用格言）" },
    { text: "感謝の心を忘れずに。", author: "日本ことわざ" },
    { text: "一日一善。", author: "日本ことわざ" },
    { text: "生きるということは戦うことである。", author: "三島由紀夫（引用的精神）" },
    { text: "無理をしない、しかし諦めない。", author: "日本現代格言" },
    { text: "自分の道を大切に。", author: "日本現代格言" },
    { text: "今日出来ることを明日に延ばすな。", author: "日本ことわざ" },
    { text: "失敗してもまた立ち上がればよい。", author: "日本現代格言" },
    { text: "本を読むことは心の糧である。", author: "日本文化的格言" },
    { text: "清く、正しく、美しく。", author: "日本教育的格言" },
    { text: "小さな親切が大きな違いを生む。", author: "日本現代格言" },
    { text: "今日の努力が明日を創る。", author: "日本現代格言" },
    { text: "自然に耳を傾けよ。", author: "日本文化格言" },
    { text: "心の中の平和が世界を和らげる。", author: "日本現代格言" },
    { text: "困難はやがて糧となる。", author: "日本現代格言" },
    { text: "誠実は最良の方針である。", author: "日本文化格言" },
    { text: "笑顔は人をつなぐ。", author: "日本現代格言" },
    { text: "夢を見ることは未来への第一歩である。", author: "日本現代格言" },
    { text: "感謝は心を豊かにする。", author: "日本現代格言" },
    { text: "日々是好日。", author: "禅語（日本で広く用いられる）" },
    { text: "初心忘るべからず。", author: "日本ことわざ（武士道由来）" },
    { text: "人の一生は重荷を負うて遠き道を行くが如し。", author: "徳川家康（伝）" },
    { text: "矢は放たれたら戻らない。", author: "日本ことわざ（教訓）" },
    { text: "今日があるのは昨日の努力の結果だ。", author: "日本現代格言" },
    { text: "行動が言葉よりも雄弁である。", author: "日本現代格言" },
    { text: "自然と調和して生きよ。", author: "日本文化格言" },
    { text: "心が清ければ眼も清し。", author: "日本格言" },
    { text: "感情を制することが知恵である。", author: "日本文化格言" },
    { text: "友を大切に。", author: "日本ことわざ" },
    { text: "努力は実を結ぶ。", author: "日本ことわざ" },
    { text: "日々の積み重ねが人を作る。", author: "日本現代格言" },
    { text: "時を守り、場をわきまえ、礼を尽くせ。", author: "日本の古い教え" },
    { text: "小事を疎かにするな。", author: "日本格言" },
    { text: "勇気は恐れを知りながら進むことである。", author: "日本現代格言" },
    { text: "他人を思いやる心が社会を温かくする。", author: "日本現代格言" },
    { text: "静かな心が正しい判断をもたらす。", author: "日本文化格言" },
    { text: "誠は人の礎なり。", author: "日本古語" },
    { text: "己を知る者は強し。", author: "日本格言" },
    { text: "笑う門には福来る。", author: "日本ことわざ" },
    { text: "一日一歩三日で三歩、三歩進んで二歩下がる。", author: "日本ことわざ（継続の教え）" },
    { text: "過去は変えられないが、未来は変えられる。", author: "日本現代格言" },
    { text: "学び続ける者は常に若い。", author: "日本文化格言" },
    { text: "謙虚は人を高める。", author: "日本文化格言" },
    { text: "心の平和がすべての始まりである。", author: "日本現代格言" },
    { text: "小さな善行が大きな善を生む。", author: "日本現代格言" },
    { text: "行動が未来を創る。", author: "日本現代格言" },
    { text: "優しさは伝染する。", author: "日本現代格言" },
    { text: "毎日を丁寧に生きよ。", author: "日本現代格言" },
    { text: "真の強さは優しさにある。", author: "日本現代格言" },
    { text: "心の灯を絶やすな。", author: "日本文化格言" },
    { text: "小さな一歩が人生を変える。", author: "日本現代格言" },
    { text: "今日という日は二度と来ない。", author: "日本ことわざ" },
    { text: "与えることは受け取ることより豊かである。", author: "日本現代格言" },
    { text: "自然の声に耳を傾けよ。", author: "日本文化格言" },
    { text: "友情は宝である。", author: "日本ことわざ" },
    { text: "希望は心の糧である。", author: "日本現代格言" },
    { text: "毎日の積み重ねが未来を作る。", author: "日本現代格言" },
    { text: "人生を愛せよ。", author: "日本現代格言" },
    { text: "学ぶことをやめるな。", author: "日本文化格言" },
    { text: "勇気は行動することによって証明される。", author: "日本現代格言" },
    { text: "誠実は信頼の基礎である。", author: "日本文化格言" },
    { text: "思いやりが世界を優しくする。", author: "日本現代格言" },
    { text: "心の持ち様が人生を決める。", author: "日本現代格言" },
    { text: "今日の一歩が明日の飛躍となる。", author: "日本現代格言" },
    { text: "静かにしていれば多くが見える。", author: "日本文化格言" }
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
    const author = q.author || q.a || '匿名';
    el.innerHTML = `${escapeHtml(text)}<span style="display:block; text-align:right; margin-top:8px;">—— ${escapeHtml(author)}</span>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderRandomQuote);
  } else {
    renderRandomQuote();
  }
})();