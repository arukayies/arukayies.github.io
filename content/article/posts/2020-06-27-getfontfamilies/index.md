---
title: GASでスプレッドシートの指定範囲からフォントファミリーを一括取得する方法
author: arukayies
date: 2020-06-26T15:24:49+00:00
excerpt: GASでスプレッドシートの指定範囲すべてのフォント名を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1593185089
the_review_rate:
  - 5
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
tags:
  - "GAS"
tags:
  - GAS
  - getFontFamilies()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
どーも！今日はGoogle Apps Script（GAS）の `getFontFamilies()` メソッドについて話すけん、スプレッドシートのフォント情報を効率的に取得したいなら最後まで読んでいきんしゃい！


## getFontFamilies() とは？

GASの `getFontFamilies()` は、指定範囲のセルに設定されているフォントファミリーを一括取得できるメソッドじゃ。このメソッドを使えば、手作業でチェックせんでも、一瞬でフォントの情報を取得できるけん、便利な機能たい。

## 基本的な使い方

まず、どんな風に書くのか見てみるばい。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const range = sheet.getRange("B2:D4");
const fontData = range.getFontFamilies();

fontData.forEach((row, rowIndex) =&gt; {
  row.forEach((font, colIndex) =&gt; {
    Logger.log(`セル ${String.fromCharCode(66 + colIndex)}${2 + rowIndex}: ${font}`);
  });
});
</code></pre>

このスクリプトは `B2:D4` の範囲内のフォントを取得してログに出力するっちゃ。

## 応用テクニック

### フォントの異常検出

<pre class="wp-block-code"><code>function detectUnusualFonts() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const fonts = dataRange.getFontFamilies();
  
  const standardFont = 'Arial';
  const anomalies = &#91;];
  
  fonts.forEach((row, r) =&gt; {
    row.forEach((font, c) =&gt; {
      if(font !== standardFont) {
        anomalies.push(`R${r+1}C${c+1}: ${font}`);
      }
    });
  });
  
  if(anomalies.length &gt; 0) {
    Logger.log(`フォントの異常検出！\n${anomalies.join('\n')}`);
  }
}
</code></pre>

標準フォント（Arial）と違うフォントが使われとるセルをリストアップするスクリプトばい。

### フォント使用頻度のレポート作成

<pre class="wp-block-code"><code>function generateFontReport() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const fonts = sheet.getDataRange().getFontFamilies();
  const fontStats = {};

  fonts.flat().forEach(font =&gt; {
    fontStats&#91;font] = (fontStats&#91;font] || 0) + 1;
  });

  const reportSheet = SpreadsheetApp.getActive().insertSheet('Font Report');
  reportSheet.getRange('A1:B1').setValues(&#91;&#91;'Font Family', 'Count']]);
  
  const sortedData = Object.entries(fontStats)
    .sort((a, b) =&gt; b&#91;1] - a&#91;1])
    .map((&#91;font, count]) =&gt; &#91;font, count]);
  
  reportSheet.getRange(2, 1, sortedData.length, 2)
    .setValues(sortedData)
    .setFontFamily('Consolas');
}
</code></pre>

スプレッドシート内で使われてるフォントをカウントして、レポートを自動生成する関数たい。

## 気をつけるポイント

<ol class="wp-block-list">
  <li>
    <strong>未設定のセルはデフォルトのフォント（通常はArial）が返される</strong>
  </li>
  <li>
    <strong>フォント名はOSや環境によって異なることがある</strong>
  </li>
  <li>
    <strong>データ量が大きいと処理時間が長くなるので、範囲を絞ると良い</strong>
  </li>
</ol>

## まとめ

GASの `getFontFamilies()` メソッドを活用すると、スプレッドシートのフォント情報を一括取得できるばい。異常フォントの検出やレポート作成にも応用できるけん、作業効率をアップさせるツールとして活用してみんしゃい！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/v542d3325b8c925a6e7dd14f19a8348c865acec191636e2a431745f59e1ae1e12/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/v542d3325b8c925a6e7dd14f19a8348c865acec191636e2a431745f59e1ae1e12/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Class Range  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-font/" title="【GAS】スプレッドシートのフォント機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/font.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/font.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートのフォント機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートのフォント機能をすべてまとめました。セルのデータを扱う時、フォントの色を変更したり、お気に入りの字体に変えたり、自由自在にオシャレに装飾できると素敵ですね。色、字体、太字、斜体、下線、サイズ設定と取得です。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-font/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-font/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/katou_/items/0c294f566284bb7b6353" title="【GAS】Googleドキュメントで Noto Sans JP などの日本語Google Fontsを使う - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRmxoMy5nb29nbGV1c2VyY29udGVudC5jb20lMkZhLSUyRkFPaDE0R2d0QThJUnUyQWladmRKOHhpU2ZGbWRUOF8xdllXdnM5VUtqR1dJRnclM0RzNTA_aXhsaWI9cmItNC4wLjAmYXI9MSUzQTEmZml0PWNyb3AmbWFzaz1lbGxpcHNlJmJnPUZGRkZGRiZmbT1wbmczMiZzPThhMTY1OGY2YzNiODI0NjE3ZTI5NjlmYTNkMDc4NDI1%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D9b35a8d8443e1952e27c91636409646c?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9JUUzJTgwJTkwR0FTJUUzJTgwJTkxR29vZ2xlJUUzJTgzJTg5JUUzJTgyJUFEJUUzJTgzJUE1JUUzJTgzJUExJUUzJTgzJUIzJUUzJTgzJTg4JUUzJTgxJUE3JTIwTm90byUyMFNhbnMlMjBKUCUyMCVFMyU4MSVBQSVFMyU4MSVBOSVFMyU4MSVBRSVFNiU5NyVBNSVFNiU5QyVBQyVFOCVBQSU5RUdvb2dsZSUyMEZvbnRzJUUzJTgyJTkyJUU0JUJEJUJGJUUzJTgxJTg2JnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LXBhZD0wJnM9NmI1YjM3NzNkODE1M2ZlNGQ1ZTFmNDI1ZmM1ZmRmZDM&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBrYXRvdV8mdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtcGFkPTAmcz04MWM5ZTAxZTY3OTc4N2RlNTRmOGY1Nzg4YzdjZDRlOA&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=f53d6d589ba624d130c9b72b561cface" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】Googleドキュメントで Noto Sans JP などの日本語Google Fontsを使う - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Docsは共同編集が非常に便利なツールです。 しかし美しい・きれいなフォントが少ない、と感じたことはありませんか？ ググってみると、ブラウザの設定から表示されるフォントを変える方法は出てくるのですが、それだと印刷時やPDF書き...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/katou_/items/0c294f566284bb7b6353" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/katou_/items/0c294f566284bb7b6353" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a>
</div>
