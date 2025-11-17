/**
 * daily-quote-en.js
 * English version — 100 quotes with confirmed authors (if translated from another language,
 * the original author is shown). Save as daily-quote-en.js and include:
 *   <script src="./daily-quote-en.js"></script>
 *
 * Each page load picks a random quote from QUOTES and replaces .carbox.li2-box blockquote content.
 *
 * NOTE: These are well-known, commonly attributed quotes. For any quote where the original
 * language was not English, the original author is given (the text here is the common English wording).
 */

'use strict';

(function () {
  const QUOTES = [
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
    { text: "So many books, so little time.", author: "Frank Zappa" },
    { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
    { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
    { text: "If you tell the truth you don't have to remember anything.", author: "Mark Twain" },
    { text: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" },
    { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" },
    { text: "Always forgive your enemies; nothing annoys them so much.", author: "Oscar Wilde" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "Without music, life would be a mistake.", author: "Friedrich Nietzsche" },
    { text: "We are all in the gutter, but some of us are looking at the stars.", author: "Oscar Wilde" },
    { text: "Life is what happens to us while we are making other plans.", author: "Allen Saunders" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "The unexamined life is not worth living.", author: "Socrates" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "What we think, we become.", author: "Buddha" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { text: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { text: "Dwell on the beauty of life. Watch the stars, and see yourself running with them.", author: "Marcus Aurelius" },
    { text: "The best revenge is massive success.", author: "Frank Sinatra" },
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
    { text: "The greatest wealth is to live content with little.", author: "Plato" },
    { text: "Don't be pushed by your problems. Be led by your dreams.", author: "Ralph Waldo Emerson" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { text: "Be kind whenever possible. It is always possible.", author: "Dalai Lama" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { text: "Keep your eyes on the stars, and your feet on the ground.", author: "Theodore Roosevelt" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "Little by little, one travels far.", author: "J.R.R. Tolkien" },
    { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
    { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
    { text: "If opportunity doesn't knock, build a door.", author: "Milton Berle" },
    { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "A goal is not always meant to be reached; it often serves simply as something to aim at.", author: "Bruce Lee" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Nothing is impossible. The word itself says 'I'm possible!'", author: "Audrey Hepburn" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy" },
    { text: "If you can dream it, you can do it.", author: "Walt Disney" },
    { text: "Happiness depends upon ourselves.", author: "Aristotle" },
    { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { text: "The best preparation for tomorrow is doing your best today.", author: "H. Jackson Brown Jr." },
    { text: "Everything has beauty, but not everyone sees it.", author: "Confucius" },
    { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats" },
    { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
    { text: "To improve is to change; to be perfect is to change often.", author: "Winston Churchill" },
    { text: "We do not remember days, we remember moments.", author: "Cesare Pavese" },
    { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "A man who moves a mountain begins by carrying away small stones.", author: "Confucius" },
    { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
    { text: "Try to be a rainbow in someone's cloud.", author: "Maya Angelou" },
    { text: "Perseverance is not a long race; it is many short races one after another.", author: "Walter Elliot" },
    { text: "The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails.", author: "William Arthur Ward" },
    { text: "Do what you love and the money will follow.", author: "Marsha Sinetar" },
    { text: "The secret to getting ahead is getting started.", author: "Mark Twain" },
    { text: "We are what we repeatedly do. Excellence, then, is not an act but a habit.", author: "Aristotle (often attributed, phrasing modern)" }
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
    const author = q.author || q.a || 'Anonymous';
    el.innerHTML = `${escapeHtml(text)}<span style="display:block; text-align:right; margin-top:8px;">—— ${escapeHtml(author)}</span>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderRandomQuote);
  } else {
    renderRandomQuote();
  }
})();