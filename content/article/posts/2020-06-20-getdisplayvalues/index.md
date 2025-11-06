---
title: GASでスプレッドシートの指定範囲から表示形式の値を一括取得する方法
author: arukayies
date: 2020-06-19T16:16:41+00:00
excerpt: GASでスプレッドシートの指定範囲の表示されている値すべてを取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1592583402
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
  - getDisplayValues()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）を使ってスプレッドシートの操作をしてると、「表示値」を扱う場面がよくあるばい。特に、日付や通貨、パーセンテージなど、フォーマットが大事なデータを取り扱うときには、`getDisplayValues()`メソッドが大活躍するんじゃ。今回はそのメソッドの使い方を、初心者にもわかりやすく解説していくけん、ぜひ参考にしてみてや！


## getDisplayValues()とは？

まず、`getDisplayValues()`ってどんなメソッドかって話をしとくばい。Googleスプレッドシートでは、セルに入力されたデータは「表示値」としてユーザーに見えるけど、その裏側では実際には異なるデータ型が使われていることが多いんだよ。例えば、「2023/04/02」って日付が表示されているけど、実際にはそのセルには「UNIX時間」って数値が格納されとるわけよ。

そこで、このメソッドを使うことで、表示されている「フォーマットされた値」をそのまま文字列として取得できるんよ。これが何で便利かっていうと、例えばレポートにそのまま表示形式を保ったデータを渡したいときに、とっても助かるんじゃ。

## getValues()とどう違う？

`getValues()`との違いを理解することも大事ばい。`getValues()`はセルの「基盤データ」を返すんだけど、`getDisplayValues()`はそのデータを「表示形式のまま文字列で返す」んじゃ。例えば、数値が「1,000円」って表示されている場合、`getValues()`で取得すると「1000」って数値が返されるけど、`getDisplayValues()`だと「1,000円」って文字列で返されるわけさ。

こんなふうに、表示形式が重要な時に`getDisplayValues()`は役立つんよ！

## getDisplayValues()の使い方

### 基本の使い方

まずは基本的なコードから見ていこうか。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート名');
const range = sheet.getRange('A1:B10');  // A1からB10までの範囲を指定
const displayValues = range.getDisplayValues();
Logger.log(displayValues);  // 結果をログに表示
</code></pre>

こんな感じで、範囲を指定してそのセルの表示値を一気に取得できるんじゃ。

### 実際の使い方

次に、業務でよく使うようなシナリオを考えてみるけん。例えば、販売レポートを作るとき、商品の価格や日付が「¥1,000」や「2023/04/02」ってフォーマットされているとするじゃん？そのまま見栄えよくデータを取り出して、メールで送るスクリプトを作る場合、`getDisplayValues()`が便利ばい。

<pre class="wp-block-code"><code>function sendSalesReport() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SalesData');
  const dataRange = sheet.getRange('A2:E100');
  const displayData = dataRange.getDisplayValues();
  
  let report = '最新販売レポート\n\n';
  displayData.forEach(row =&gt; {
    report += `${row&#91;0]} | 数量: ${row&#91;1]} | 単価: ${row&#91;2]} | 合計: ${row&#91;3]}\n`;
  });
  
  MailApp.sendEmail('report@example.com', '日次販売レポート', report);
}
</code></pre>

このコードで、フォーマットされたデータ（例えば、「¥1,000」など）がそのままレポートに使われるわけよ。これなら、フォーマットを気にせずにデータを処理できるけん、すごく便利じゃろ？

## メリットとデメリット

### メリット

<ul class="wp-block-list">
  <li>
    <strong>フォーマットがそのまま取得できる</strong>：日付や通貨など、フォーマットをそのまま使えるので、レポートや通知メールが見やすくなるんじゃ。
  </li>
  <li>
    <strong>柔軟なデータ処理</strong>：表示値を文字列として扱うことで、データ処理が柔軟になるけん、後から数値に変換することもできるばい。
  </li>
</ul>

### デメリット

<ul class="wp-block-list">
  <li>
    <strong>型変換の必要がある</strong>：<code>getDisplayValues()</code>で取得するデータはすべて文字列だから、数値や日付が必要なときは型変換をする必要があるけん、ちょっと手間がかかることもある。
  </li>
</ul>

## まとめ

Google Apps Scriptの`getDisplayValues()`メソッドは、スプレッドシートの「表示されている値」をそのまま取得できる便利なメソッドじゃ。特にレポートや通知メールでフォーマットを維持したいときには大活躍するばい！ただし、型変換に気をつけながら使う必要があるけん、その点だけ覚えておけばバッチリじゃね。


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://hajiritsu.com/spreadsheet-gas-getdisplayvalues/" title="&#12475;&#12523;&#12398;&#34920;&#31034;&#20516;&#12434;&#21462;&#24471;&#12377;&#12427; | getDisplayValue()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getdisplayvalues%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getdisplayvalues%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12475;&#12523;&#12398;&#34920;&#31034;&#20516;&#12434;&#21462;&#24471;&#12377;&#12427; | getDisplayValue()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getdisplayvalues/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getdisplayvalues/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://blog.take-it-easy.site/gas/gas-getdisplayvalues/" title="Google Apps Scriptでスプレッドシートの複数セルの値を表示形式の文字列で取得する方法" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://blog.take-it-easy.site/images/eyecatch-3482.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://blog.take-it-easy.site/images/eyecatch-3482.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Scriptでスプレッドシートの複数セルの値を表示形式の文字列で取得する方法
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Scriptでスプレッドシートの表示形式のままの値を文字列で取得する方法を解説。getValuesとの違いやgetDisplayValuesの使い方も詳しく紹介。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://blog.take-it-easy.site/gas/gas-getdisplayvalues/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://blog.take-it-easy.site/gas/gas-getdisplayvalues/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          blog.take-it-easy.site
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://stackoverflow.com/questions/34691425/difference-between-getvalue-and-getdisplayvalue-on-google-app-script" title="Difference between getValue() and getDisplayValue() on google app script" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Difference between getValue() and getDisplayValue() on google app script
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        What is the difference of range.getDisplayValue() and range.getValue() on Google Apps Script?var ss = SpreadsheetApp.get...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/34691425/difference-between-getvalue-and-getdisplayvalue-on-google-app-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/34691425/difference-between-getvalue-and-getdisplayvalue-on-google-app-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a>
</div>
