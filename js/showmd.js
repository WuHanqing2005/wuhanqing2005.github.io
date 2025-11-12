(function(){
  'use strict';

  function getQuery(name){
    try{ const params = new URLSearchParams(window.location.search); return params.get(name);}catch(e){return null;}
  }

  const container = document.getElementById('md-embed-container');
  const mdTarget = document.getElementById('md-embed');
  if(!container || !mdTarget){
    console.warn('showmd: md-embed container or target not found');
    return;
  }

  let mdPath = container.getAttribute('data-md') || getQuery('mdfile');
  const q = getQuery('mdfile'); if(q) mdPath = q;

  if(!mdPath){ mdTarget.innerHTML = '<p class="md-loading">未指定 Markdown 文件，请设置 data-md 或在 URL 中加 ?mdfile=...</p>'; return; }

  // Extract math blocks and replace them with placeholders so marked won't mangle them.
  function extractMath(src){
    const blocks = [];
    // Preserve fenced code blocks first to avoid accidental math extraction inside them
    const codeBlocks = [];
    src = src.replace(/```[\s\S]*?```/g, function(m){ const id = '%%CODE' + codeBlocks.length + '%%'; codeBlocks.push({id:id, text:m}); return id; });

    // block math $$...$$ (multi-line)
    src = src.replace(/\$\$([\s\S]*?)\$\$/g, function(m, g1){ const id = '%%MATHBLOCK' + blocks.length + '%%'; blocks.push({id:id, text:g1, display:true}); return id; });

    // inline math $...$ (non-greedy). Avoid matching when there's a space next to $ (simple heuristic)
    src = src.replace(/\$(?!\s)(.+?)(?<!\s)\$/g, function(m,g1){ const id = '%%MATHINLINE' + blocks.length + '%%'; blocks.push({id:id, text:g1, display:false}); return id; });

    // restore code blocks placeholders to original
    src = src.replace(/%%CODE(\d+)%%/g, function(m, g1){ return codeBlocks[parseInt(g1,10)].text; });

    return { src: src, blocks: blocks };
  }

  function renderMarkdown(mdText){
    // small normalization
    mdText = mdText.replace(/```mssql/g, '```sql').replace(/```mysql/g,'```sql');

    const extracted = extractMath(mdText);
    let html = (window.marked && typeof window.marked.parse === 'function') ? window.marked.parse(extracted.src) : (window.marked ? window.marked(extracted.src) : ('<pre><code>marked.js not loaded</code></pre>'));

    html = html.replace(/<table/g, "<table class='tableStyle'");
    html = html.replace(/<pre/g, "<pre class='line-numbers'");

    // Replace math placeholders with KaTeX-rendered HTML
    extracted.blocks.forEach(function(b){
      try{
        if(window.katex && typeof window.katex.renderToString === 'function'){
          const rendered = window.katex.renderToString(b.text, { displayMode: !!b.display, throwOnError: false });
          html = html.split(b.id).join(rendered);
        } else {
          // leave delimiters if katex isn't available
          const fallback = b.display ? '$$' + b.text + '$$' : '$' + b.text + '$';
          html = html.split(b.id).join('<code>' + fallback + '</code>');
        }
      }catch(e){
        console.error('showmd: KaTeX render error', e);
        const fallback = b.display ? '$$' + b.text + '$$' : '$' + b.text + '$';
        html = html.split(b.id).join('<code>' + fallback + '</code>');
      }
    });

    mdTarget.innerHTML = html;

    // Prism highlighting
    try{
      if(window.Prism && typeof window.Prism.highlightElement === 'function'){
        mdTarget.querySelectorAll('pre code').forEach(function(el){ window.Prism.highlightElement(el); });
      }
    }catch(e){ console.warn('showmd: Prism highlight error', e); }
    
    // Post-process rendered content to improve mobile/narrow-screen behavior
    try{
      // helper to wrap an element with a div.wrapper of given class
      function wrapElement(el, wrapperClass){
        if(!el || !el.parentNode) return null;
        // if already wrapped, return the existing wrapper so callers can style it
        if(el.parentNode.classList && el.parentNode.classList.contains(wrapperClass)) return el.parentNode;
        var wrapper = document.createElement('div');
        wrapper.className = wrapperClass;
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        // enable convenient keyboard scrolling for code blocks
        if(wrapperClass === 'md-code-wrap'){ wrapper.setAttribute('tabindex', '0'); }
        return wrapper;
      }

      // Wrap code blocks (pre) so they can be horizontally scrolled on touch devices
      mdTarget.querySelectorAll('pre').forEach(function(pre){ wrapElement(pre, 'md-code-wrap'); });

      // Wrap tables to allow horizontal scrolling on small screens
      mdTarget.querySelectorAll('table').forEach(function(tbl){ wrapElement(tbl, 'md-table-wrap'); });

      // Wrap KaTeX elements (rendered math) so long formulas can scroll instead of causing overflow.
      // Important: only wrap block/display math. Inline math should remain inline to avoid forced line breaks.
      mdTarget.querySelectorAll('.katex').forEach(function(k){
        try{
          var parent = k.parentNode;
          // skip if already wrapped in a scrolling container
          if(parent && parent.classList && (parent.classList.contains('md-katex-wrap') || parent.classList.contains('md-code-wrap'))) return;

          // KaTeX adds the class 'katex-display' for display-mode (block) math.
          var isDisplay = k.classList && k.classList.contains('katex-display');

          if(isDisplay){
            // For display-mode math, wrap the nearest block ancestor (e.g. <p>, <div>, <li>, <blockquote>, <td>, <th>)
            // Wrapping the block ancestor avoids creating invalid markup (div inside p) which can cause layout reflow
            // that allows the formula to escape the card. Use Element.closest to find a sensible block to wrap.
            var blockAncestor = null;
            try{ blockAncestor = k.closest && k.closest('p, div, li, blockquote, td, th, pre'); }catch(e){}
            var targetToWrap = blockAncestor && blockAncestor !== mdTarget ? blockAncestor : k;
            var wrapper = wrapElement(targetToWrap, 'md-katex-wrap');
            // ensure the wrapper is constrained to parent's width and enables touch scrolling
            try{
              if(wrapper){
                wrapper.style.overflowX = 'auto';
                wrapper.style.webkitOverflowScrolling = 'touch';
                wrapper.style.width = '100%';
                wrapper.style.boxSizing = 'border-box';
                wrapper.style.maxWidth = '100%';
                  // enforce single-line scrolling behavior and hide vertical overflow
                  try{ wrapper.style.whiteSpace = 'nowrap'; wrapper.style.overflowY = 'hidden'; }catch(e){}
              }
            }catch(e){}
          } else {
            // inline math: ensure it stays inline and doesn't force a newline
            try{ k.style.display = 'inline-block'; k.style.verticalAlign = 'baseline'; }catch(e){}
          }
        }catch(e){ /* defensive */ }
      });

      // Ensure images and iframes are block-level and responsive (CSS also covers this, but make sure to set attributes where helpful)
      mdTarget.querySelectorAll('img').forEach(function(img){ img.setAttribute('loading','lazy'); });

      // Extra safeguard: detect any child element that still visually overflows the md container
      // and wrap it so overflow is constrained to an internal scroller instead of the page.
      try{
        var mdWidth = (mdTarget.clientWidth && mdTarget.clientWidth > 0) ? mdTarget.clientWidth : mdTarget.getBoundingClientRect().width;
        if(mdWidth && mdWidth > 0){
          var suspects = mdTarget.querySelectorAll('.katex, pre, table, img, iframe, code, blockquote');
          suspects.forEach(function(el){
            try{
              var rect = el.getBoundingClientRect();
              // if element's rendered width exceeds the md container, wrap it
              if(rect.width > mdWidth + 1){
                var tag = (el.tagName || '').toLowerCase();
                var wrapClass = 'md-katex-wrap';
                if(tag === 'pre' || tag === 'code') wrapClass = 'md-code-wrap';
                if(tag === 'table') wrapClass = 'md-table-wrap';
                var wrapper = wrapElement(el, wrapClass);
                if(wrapper){
                  wrapper.style.overflowX = 'auto';
                  wrapper.style.webkitOverflowScrolling = 'touch';
                  wrapper.style.width = '100%';
                  wrapper.style.boxSizing = 'border-box';
                  wrapper.style.maxWidth = '100%';
                  // enforce nowrap for katex wrappers to keep block formulas on one line
                  try{ if(wrapClass === 'md-katex-wrap'){ wrapper.style.whiteSpace = 'nowrap'; wrapper.style.overflowY = 'hidden'; } }catch(e){}
                }
              }
            }catch(e){}
          });
        }
      }catch(e){/* ignore measurement errors */}

      // Final pass: enforce conservative constraints on all .md-katex-wrap elements and their children
      try{
        mdTarget.querySelectorAll('.md-katex-wrap').forEach(function(wrap){
          try{
            wrap.style.display = wrap.style.display || 'block';
            wrap.style.width = '100%';
            wrap.style.maxWidth = wrap.style.maxWidth || 'calc(100% - 6px)';
            wrap.style.boxSizing = 'border-box';
            wrap.style.paddingRight = wrap.style.paddingRight || '6px';
            wrap.style.overflowX = 'auto';
            wrap.style.overflowY = 'hidden';
            wrap.style.whiteSpace = 'nowrap';
            wrap.style.webkitOverflowScrolling = 'touch';
            // ensure katex internals do not exceed wrapper
            wrap.querySelectorAll('.katex, .katex *').forEach(function(c){ try{ c.style.maxWidth = '100%'; c.style.boxSizing = 'border-box'; }catch(e){} });
          }catch(e){}
        });
      }catch(e){}

    }catch(e){ console.warn('showmd: post-process responsive wrapper error', e); }
  }

  // Fetch markdown file
  fetch(mdPath).then(function(res){ if(!res.ok) throw new Error('无法加载 ' + mdPath + ' — HTTP ' + res.status); return res.text(); }).then(function(data){ renderMarkdown(data); }).catch(function(err){ mdTarget.innerHTML = '<p class="md-loading">加载失败：' + (err.message || err) + '</p>'; console.error(err); });

  // Optional: observe changes to CSS variables (theme) and reapply KaTeX color override if needed.
  // CSS variables update automatically; KaTeX-generated DOM inherits color via CSS rules in showmd.css.
})();
