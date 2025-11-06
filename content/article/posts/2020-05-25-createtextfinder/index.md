---
title: GASでスプレッドシート内の文字列を効率的に検索する方法
author: arukayies
date: 2020-05-25T14:16:04+00:00
excerpt: GASでスプレッドシートのテキスト検索を行う方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1590416165
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
  - createTextFinder(findText)
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年5月"]
---
Google Apps Script（GAS）を使うと、スプレッドシート内のテキスト検索や置換を一発で自動化できるばい！特に`createTextFinder`メソッドを使うと、シート全体を対象にしたり、特定の範囲内でピンポイントに検索したりすることができるっちゃね。

今回は、その基本的な使い方から応用テクニックまで、実践的に解説するばい！


<hr class="wp-block-separator has-alpha-channel-opacity" />

## createTextFinderとは？

簡単に言うと、スプレッドシート内の特定の文字列を探すためのメソッドたい。使い方はシンプルで、以下のように書けばすぐに検索できるっちゃね。

<pre class="wp-block-code"><code>const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
const textFinder = spreadsheet.createTextFinder('検索ワード');
</code></pre>

このメソッドは`TextFinder`オブジェクトを返すけん、そこから`.findAll()`や`.replaceAllWith()`を使って検索結果を取得したり、置換したりできるとよ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## スプレッドシート内の文字列を検索する

検索した結果を取得する方法はいくつかあるばい！

<ul class="wp-block-list">
  <li>
    <strong><code>findAll()</code></strong> → 一致するすべてのセルを取得
  </li>
  <li>
    <strong><code>findNext()</code></strong> → 次の一致するセルを取得
  </li>
  <li>
    <strong><code>findPrevious()</code></strong> → 前の一致するセルを取得
  </li>
</ul>

例えば、スプレッドシート内のすべての「重要」という文字を探して、セルの位置をログに出すならこんな感じになるばい。

<pre class="wp-block-code"><code>const ranges = textFinder.findAll();
ranges.forEach(range =&gt; {
  console.log(`行: ${range.getRow()}, 列: ${range.getColumn()}`);
});
</code></pre>

これで、一致したセルの行と列を簡単に取得できるっちゃね！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 文字列を置換する

検索した文字を置換するのもめっちゃ簡単たい！

<pre class="wp-block-code"><code>spreadsheet.createTextFinder('旧ワード')
  .replaceAllWith('新ワード');
</code></pre>

これで、スプレッドシート内の「旧ワード」がすべて「新ワード」に変わるっちゃん。

もし、置換された件数を知りたい場合は、以下のように書けばOKばい！

<pre class="wp-block-code"><code>const replacementCount = textFinder.replaceAllWith('新データ');
console.log(`${replacementCount}件の置換を実行しましたばい！`);
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 応用編: 高度な検索オプション

`createTextFinder`には便利なオプションがたくさんあるばい！

<pre class="wp-block-code"><code>textFinder
  .matchCase(true) // 大文字小文字を区別
  .matchEntireCell(true) // 完全一致のみ検索
  .useRegularExpression(true) // 正規表現を利用
  .ignoreDiacritics(true); // 発音記号を無視
</code></pre>

例えば、電話番号のような特定のパターンを検索する場合は、正規表現を使うと一発でいけるとよ！

<pre class="wp-block-code"><code>const regexFinder = spreadsheet.createTextFinder('\d{3}-\d{4}')
  .useRegularExpression(true)
  .findAll();
</code></pre>

これで、000-0000 の形式の電話番号をすべて検索できるばい。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 複数シートで検索・置換する方法

「全シートの特定の単語を一気に置換したい！」ってときは、以下のコードを使えばOKたい。

<pre class="wp-block-code"><code>function replaceAcrossAllSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = spreadsheet.getSheets();
  
  sheets.forEach(sheet =&gt; {
    sheet.createTextFinder('変更前')
      .replaceAllWith('変更後');
  });
}
</code></pre>

シートごとに処理が実行されるけん、複数シートをまたいで処理するときに便利ばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## まとめ

`createTextFinder`メソッドを使うと、スプレッドシート内のテキスト検索や置換を自動化できるばい！基本の検索・置換だけでなく、正規表現を使った高度な検索や、複数シートを横断する処理もできるっちゃね。

この機能を活用すれば、手作業での検索・置換の手間が大幅に減って、業務効率が爆上がりするけん、ぜひ試してみてね！


<hr class="wp-block-separator has-alpha-channel-opacity" />

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://hajiritsu.com/spreadsheet-gas-createtextfinder/" title="Google Spreadsheet&#12391;&#12486;&#12461;&#12473;&#12488;&#12434;&#26908;&#32034;&#12539;&#32622;&#25563;&#12377;&#12427;&#26041;&#27861;&#12304;GAS&#12398;&#38306;&#25968;createTextFinder&#12434;&#20351;&#12387;&#12390;&#12415;&#12383;&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-createtextfinder%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-createtextfinder%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Spreadsheet&#12391;&#12486;&#12461;&#12473;&#12488;&#12434;&#26908;&#32034;&#12539;&#32622;&#25563;&#12377;&#12427;&#26041;&#27861;&#12304;GAS&#12398;&#38306;&#25968;createTextFinder&#12434;&#20351;&#12387;&#12390;&#12415;&#12383;&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-createtextfinder/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-createtextfinder/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/wezardnet/items/210eafa0530ec0c4a2c7" title="Google Apps Script でスプレッドシート内の文字列を検索する TextFinder を試してみる - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnFpaXRhLWltYWdlLXN0b3JlLnMzLmFtYXpvbmF3cy5jb20lMkYwJTJGMTIwMjMlMkZwcm9maWxlLWltYWdlcyUyRjE0NzM2ODIyNTA_aXhsaWI9cmItNC4wLjAmYXI9MSUzQTEmZml0PWNyb3AmbWFzaz1lbGxpcHNlJmJnPUZGRkZGRiZmbT1wbmczMiZzPWQwMDg5ZDdkZmYzYWRjOWY4Y2ZjZTZjYTYwOGI2YWU3%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D48a2c39e73b9c1b2c0e513d33484440a?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R29vZ2xlJTIwQXBwcyUyMFNjcmlwdCUyMCVFMyU4MSVBNyVFMyU4MiVCOSVFMyU4MyU5NyVFMyU4MyVBQyVFMyU4MyU4MyVFMyU4MyU4OSVFMyU4MiVCNyVFMyU4MyVCQyVFMyU4MyU4OCVFNSU4NiU4NSVFMyU4MSVBRSVFNiU5NiU4NyVFNSVBRCU5NyVFNSU4OCU5NyVFMyU4MiU5MiVFNiVBNCU5QyVFNyVCNCVBMiVFMyU4MSU5OSVFMyU4MiU4QiUyMFRleHRGaW5kZXIlMjAlRTMlODIlOTIlRTglQTklQTYlRTMlODElOTclRTMlODElQTYlRTMlODElQkYlRTMlODIlOEImdHh0LWFsaWduPWxlZnQlMkN0b3AmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT01NiZ0eHQtcGFkPTAmcz02MDYzZWUxNGZiM2I4MWRlMjdmOWViNjc1MDcwZWJmNw&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDB3ZXphcmRuZXQmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtcGFkPTAmcz04ZGEwZmNhOWYyZGQ0OWRmNWVjNzIyNWY1NjI3ZjMzNA&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=dc911417e04fe9801e09b95f7f8d9d80" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Script でスプレッドシート内の文字列を検索する TextFinder を試してみる - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        こんにちは。プライベートではいろいろ模索中の @wezardnet です👻 それはさておき Google Apps Script(GAS) エキスパートの @soundTricker さんが何やらつぶやいていたので目を留めて見ると、やっと ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/wezardnet/items/210eafa0530ec0c4a2c7" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/wezardnet/items/210eafa0530ec0c4a2c7" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a>
</div>
