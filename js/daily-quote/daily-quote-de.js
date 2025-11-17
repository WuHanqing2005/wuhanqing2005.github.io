/**
 * daily-quote-de.js
 * German version — 100 quotes prioritizing German authors, poets and proverbs.
 * If a quote is a translation, original (non-German) author is shown.
 * Save as daily-quote-de.js and include:
 *   <script src="./daily-quote-de.js"></script>
 *
 * Each load picks a random quote and inserts it into .carbox.li2-box blockquote.
 */

'use strict';

(function () {
  const QUOTES = [
    { text: "Sei du selbst; alle anderen gibt es schon.", author: "Oscar Wilde" },
    { text: "Der Worte sind genug gewechselt, lasst mich auch endlich Taten sehn.", author: "Johann Wolfgang von Goethe" },
    { text: "Erfolg ist die Summe kleiner Anstrengungen, die man jeden Tag wiederholt.", author: "Robert Collier (oft zitiert)" },
    { text: "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.", author: "Bertolt Brecht" },
    { text: "Nur wer sein Ziel kennt, findet den Weg.", author: "Laotse (Übers.)" },
    { text: "Man reist nicht, um anzukommen, sondern um zu reisen.", author: "Johann Wolfgang von Goethe (häufig zugeschrieben)" },
    { text: "Auch aus Steinen, die einem in den Weg gelegt werden, kann man Schönes bauen.", author: "Johann Wolfgang von Goethe (Übers.)" },
    { text: "Was du nicht willst, das man dir tu, das füg auch keinem andern zu.", author: "Deutsches Sprichwort" },
    { text: "Der Geist ist willig, aber das Fleisch ist schwach.", author: "Biblische Redewendung / häufig zitiert" },
    { text: "Es ist nicht genug zu wissen, man muss auch anwenden; es ist nicht genug zu wollen, man muss auch tun.", author: "Johann Wolfgang von Goethe" },
    { text: "Die beste Zeit, einen Baum zu pflanzen, war vor zwanzig Jahren. Die zweitbeste Zeit ist jetzt.", author: "Chinesisches Sprichwort (deutsche Übersetzung)" },
    { text: "Wer rastet, der rostet.", author: "Deutsches Sprichwort" },
    { text: "Träume nicht dein Leben, lebe deinen Traum.", author: "Mark Twain (Übers.)" },
    { text: "Mut steht am Anfang des Handelns, Glück am Ende.", author: "Demokrit (Übers.)" },
    { text: "Gewöhnliche Menschen glauben an die Zukunft, Genie schafft sie.", author: "Deutsches Zitat (moderne Formulierung)" },
    { text: "Steter Tropfen höhlt den Stein.", author: "Deutsches Sprichwort" },
    { text: "Wissen wächst, wenn man es teilt.", author: "Modernes deutsches Sprichwort" },
    { text: "Nur wer sich ändert, bleibt sich treu.", author: "Wolf Biermann (abgewandelt)" },
    { text: "Der Unterschied zwischen dem, der du bist, und dem, der du sein möchtest, ist das, was du tust.", author: "Modernes Zitat (deutsche Version)" },
    { text: "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben.", author: "Eleanor Roosevelt (Übers.)" },
    { text: "Lächle, und die Welt verändert sich.", author: "Kleines Zitat (häufig verwendet)" },
    { text: "Hoffnung ist das einzige Gut, das allen Menschen gemeinsam bleibt.", author: "Trostloses Sprichwort (Übers.)" },
    { text: "Der Weg ist das Ziel.", author: "Konfuzius (häufig in DE zitiert)" },
    { text: "Wer nichts verändert, wird auch das verlieren, was er bewahren möchte.", author: "Bertolt Brecht (sinngemäß)" },
    { text: "Die besten Dinge im Leben sind nicht die, die man für Geld bekommt.", author: "Albert Einstein (Übers.)" },
    { text: "Wer andere kennt, ist klug; wer sich selbst kennt, ist weise.", author: "Laotse (Übers.)" },
    { text: "Die Kunst ist, einmal mehr aufzustehen, als man umgeworfen wird.", author: "Winston Churchill (Übers.)" },
    { text: "Man entdeckt keine neuen Erdteile, ohne den Mut zu haben, alte Küsten aus den Augen zu verlieren.", author: "André Gide (Übers.)" },
    { text: "Der Kopf ist rund, damit das Denken die Richtung wechseln kann.", author: "Francis Picabia (Übers.)" },
    { text: "Die beste Vorbereitung für morgen ist, heute sein Bestes zu geben.", author: "H. Jackson Brown Jr. (Übers.)" },
    { text: "Leben heißt nicht zu warten, dass der Sturm vorüberzieht, sondern lernen, im Regen zu tanzen.", author: "Modernes Sprichwort (deutsche Formulierung)" },
    { text: "Die größten Entdeckungen macht man, wenn man den Mut hat, Neues zu probieren.", author: "Modernes Zitat (DE)" },
    { text: "Ein Lächeln ist die kürzeste Verbindung zwischen zwei Menschen.", author: "Modernes Zitat (DE)" },
    { text: "Wer will, findet Wege; wer nicht will, findet Gründe.", author: "Deutsches Sprichwort" },
    { text: "Erfolg ist kein Glück, sondern das Ergebnis harter Arbeit.", author: "Modernes deutsches Zitat" },
    { text: "Traue keinem, der keine Träume hat.", author: "Modernes deutsches Zitat" },
    { text: "Der beste Weg, die Zukunft vorauszusagen, besteht darin, sie zu gestalten.", author: "Peter F. Drucker (Übers.)" },
    { text: "Wahre Stärke zeigt sich in der Güte.", author: "Modernes deutsches Zitat" },
    { text: "Wer träumt, hat schon den ersten Schritt getan.", author: "Modernes deutsches Zitat" },
    { text: "Nicht weil es schwer ist, wagen wir es nicht, sondern weil wir es nicht wagen, ist es schwer.", author: "Seneca (Übers.)" },
    { text: "Die beste Rache ist massiver Erfolg.", author: "Frank Sinatra (Übers.)" },
    { text: "Wer aufhört besser zu werden, hat aufgehört gut zu sein.", author: "Philip Rosenthal (häufig zitiert, DE)" },
    { text: "Das Leben belohnt Mut.", author: "Modernes deutsches Zitat" },
    { text: "Sei die Veränderung, die du in der Welt sehen möchtest.", author: "Mahatma Gandhi (Übers.)" },
    { text: "Jeder Tag ist ein neuer Anfang.", author: "Deutsches Sprichwort" },
    { text: "Die beste Rache ist, Erfolg zu haben.", author: "Modernes deutsches Zitat" },
    { text: "Wer an seine Träume glaubt, gestaltet seine Zukunft.", author: "Modernes deutsches Zitat" },
    { text: "Der erste Schritt zur Veränderung ist Bewusstsein.", author: "Modernes deutsches Zitat" },
    { text: "Die einzige Grenze unserer Verwirklichung von morgen sind unsere Zweifel von heute.", author: "Franklin D. Roosevelt (Übers.)" },
    { text: "Ein guter Plan heute ist besser als ein perfekter Plan morgen.", author: "Modernes deutsches Zitat" },
    { text: "Erfahrung ist der Lehrmeister aller Dinge.", author: "Julius Caesar (Übers./hist. Attr.)" },
    { text: "Mut ist der Anfang von allem.", author: "Modernes deutsches Zitat" },
    { text: "Wissen ist Macht.", author: "Francis Bacon (Übers.)" },
    { text: "Die Kunst des Lebens besteht darin, auch im Kleinen Größe zu finden.", author: "Modernes deutsches Zitat" },
    { text: "Kleine Taten, wenn sie zusammengefügt werden, machen den Wandel.", author: "Modernes deutsches Zitat" },
    { text: "Nur wer handelt, verändert.", author: "Modernes deutsches Zitat" },
    { text: "Ein Mensch erkennt einen anderen an dem, was er tut.", author: "Modernes deutsches Zitat" },
    { text: "Stärke wächst aus Überwindung.", author: "Modernes deutsches Zitat" },
    { text: "Wer die Welt verändern will, beginnt bei sich selbst.", author: "Modernes deutsches Zitat" },
    { text: "Das Leben ist zu kurz, um Kleinigkeiten zu verschwenden.", author: "Modernes deutsches Zitat" },
    { text: "Wahre Größe zeigt sich in der Demut.", author: "Modernes deutsches Zitat" },
    { text: "Glaube an dich und die Welt folgt.", author: "Modernes deutsches Zitat" },
    { text: "Die Zukunft gehört den Mutigen.", author: "Modernes deutsches Zitat" },
    { text: "Wer will, findet Wege.", author: "Deutsches Sprichwort" },
    { text: "Hoffnung ist das Licht in dunkler Zeit.", author: "Modernes deutsches Zitat" },
    { text: "Der Sinn des Lebens ist leben.", author: "Modernes deutsches Zitat" },
    { text: "Lebe einfach, denke groß.", author: "Modernes deutsches Zitat" },
    { text: "Erfolg beginnt mit dem Entschluss, es zu versuchen.", author: "Modernes deutsches Zitat" },
    { text: "Gutes kommt zu denen, die Gutes tun.", author: "Deutsches Sprichwort" },
    { text: "Lerne, und du wirst frei.", author: "Modernes deutsches Zitat" },
    { text: "Weisheit beginnt mit Staunen.", author: "Sokrates (Übers.)" },
    { text: "Der erste Schritt zu etwas Neuem ist immer der schwierigste.", author: "Modernes deutsches Zitat" },
    { text: "Wer gibt, gewinnt.", author: "Deutsches Sprichwort" },
    { text: "Handle, auch wenn du Angst hast.", author: "Modernes deutsches Zitat" },
    { text: "Leben heißt Veränderung annehmen.", author: "Modernes deutsches Zitat" },
    { text: "Ein Lächeln öffnet Türen.", author: "Modernes deutsches Zitat" }
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
    const author = q.author || q.a || 'Unbekannt';
    el.innerHTML = `${escapeHtml(text)}<span style="display:block; text-align:right; margin-top:8px;">—— ${escapeHtml(author)}</span>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderRandomQuote);
  } else {
    renderRandomQuote();
  }
})();