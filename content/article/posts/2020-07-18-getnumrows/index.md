---
title: GASでスプレッドシートの指定範囲から行数を取得する方法徹底解説
author: arukayies
date: 2020-07-17T17:03:35+00:00
excerpt: GASでスプレッドシートの指定範囲の行数を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1595005417
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
  - getNumRows()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）は、Googleスプレッドシートを使う上で非常に便利な自動化ツールやけど、その中でも`getNumRows()`メソッドは重要な役割を持ってるばい。これを使うことで、シートの特定の範囲の行数を効率よく取得できるんだ。今回は、このメソッドの基本的な使い方から、実際のシナリオでどんな活用ができるかを解説していくけ。


## getNumRows()の基本的な使い方

まずは、`getNumRows()`メソッドの基本的な使い方を説明するけ。このメソッドは、指定した範囲の行数を返すだけで、特別な引数を渡す必要がないんだよ。例えば、こんな感じ。

<pre class="wp-block-code"><code>const range = sheet.getRange("B2:D5");
const rowCount = range.getNumRows();
Logger.log(rowCount); // 4が出力される
</code></pre>

この例では、範囲`B2:D5`が4行を含んでいるから、`getNumRows()`は4を返すんじゃ。ちなみに、行数というのは、実際に指定された範囲内に存在する行の数を指すばい。

## getNumRows()と他のメソッドの違い

### getHeight()との違い

`getNumRows()`と似たメソッドに`getHeight()`があるけど、こっちは行の高さをピクセル単位で返すんじゃ。例えば、行の高さが変わったとしても、`getNumRows()`には影響がないんだよ。

<pre class="wp-block-code"><code>const range = sheet.getRange("A1:B2");
console.log(range.getNumRows()); // 2
console.log(range.getHeight());  // ピクセル値（デフォルト21）
</code></pre>

### getLastRow()と組み合わせる

`getLastRow()`はシート内で最後にデータが入力されている行番号を返してくれるけど、`getNumRows()`と組み合わせて使うと、範囲のデータ量を動的に処理できるんだ。

<pre class="wp-block-code"><code>const lastRow = sheet.getLastRow();
const dataRange = sheet.getRange(1, 1, lastRow, 3);
const totalRows = dataRange.getNumRows();
</code></pre>

## 実践的な活用方法

### 動的範囲の処理

シートのデータは常に変動するから、`getDataRange()`と組み合わせて、動的に範囲を処理するのが便利じゃ。これにより、データが増減しても問題なく対応できるんだ。

<pre class="wp-block-code"><code>const fullData = sheet.getDataRange();
const rowCount = fullData.getNumRows();
const columnCount = fullData.getNumColumns();
</code></pre>

### 二次元配列との連動

スプレッドシートのデータを二次元配列で取得する場合、`getValues()`を使うことが多いけど、この配列の長さと`getNumRows()`の結果が一致するから、データの整合性をチェックするのにも使えるんだ。

<pre class="wp-block-code"><code>const range = sheet.getRange("A1:C");
const values = range.getValues();
if(values.length !== range.getNumRows()) {
  throw new Error("データ不整合が発生");
}
</code></pre>

## よくあるエラーとその対処法

### 範囲指定の誤り

範囲指定でよくあるミスは、行数と列数を間違えることじゃ。例えば、第3引数は終了行ではなく、行数を指定しないといけない点に注意が必要やけ。

<pre class="wp-block-code"><code>// 誤った指定
sheet.getRange(2,1,4,3); // 実際には4行分取得
// 正しい指定
sheet.getRange(2,1,3,3); // 3行分取得
</code></pre>

### 非連続範囲の扱い

`getNumRows()`は、連続した範囲に対してしか正しい結果を返してくれんけ。もし非連続の範囲を扱う場合は、個別に処理する必要があるんだ。

## パフォーマンスの最適化方法

### バッチ処理の活用

大量のデータを一度に処理する時、`getNumRows()`をループ内で何度も呼び出すとパフォーマンスが悪くなるけど、事前に変数に保持することで、処理速度を上げることができるばい。

<pre class="wp-block-code"><code>// 非効率的な例
for(let i = 0; i &lt; 1000; i++) {
  // 行数取得と処理を繰り返す
}
</code></pre>

こうした処理はできるだけまとめて行うようにしようね。

## 特殊ケースへの対応

### 空の範囲の扱い

データが何も入ってない範囲でも、`getNumRows()`は物理的に行数を返すんだよ。例えば、見出しだけがある場合でも1行としてカウントされるけ。

<pre class="wp-block-code"><code>const emptyRange = sheet.getRange("A1000:B1000");
console.log(emptyRange.getNumRows()); // 1（物理的な行数）
</code></pre>

### 結合セルの扱い

結合セルがある場合でも、`getNumRows()`はそのまま正確な行数を返してくれるんだ。ただし、結合セルの情報を知りたければ、`isPartOfMerge()`を使うといいばい。

<pre class="wp-block-code"><code>const mergedRange = sheet.getRange("A1:B2");
console.log(mergedRange.getNumRows()); // 2
console.log(mergedRange.isPartOfMerge()); // true
</code></pre>

## 結論

`getNumRows()`は、Google Apps Scriptでスプレッドシートを操作する際に欠かせないメソッドじゃ。基本的な使い方から、実際のプロジェクトでの応用例、パフォーマンス最適化の方法まで、幅広く活用できるんだよね。パフォーマンスを重視しつつ、最適な実装を選ぶことが大事やけ。

これからスクリプトを組む時は、このメソッドをうまく活用して、効率的なシート操作を目指してみてな！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://caymezon.com/gas-row-col-pnt-num-get/" title="【GAS】スプレッドシートの行列位置と行列数取得機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/row-col_num.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/row-col_num.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートの行列位置と行列数取得機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートの行列位置と行列数取得機能をすべてまとめました。スプレッドシート内の行や列の位置や選択したセルの行数、列数を取得して様々な処理に応用する場面はしょっちゅうあるはずです。この行列位置と行列数は基本中の基本では
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-row-col-pnt-num-get/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-row-col-pnt-num-get/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://coporilife.com/214/" title="【GAS】スプレッドシートで行列取得まとめ、最終行列、getLastrow、getLastcol【Google Apps Script】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://coporilife.com/wp-content/uploads/2022/05/01028106111b9317b3a969ab36444f93.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://coporilife.com/wp-content/uploads/2022/05/01028106111b9317b3a969ab36444f93.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートで行列取得まとめ、最終行列、getLastrow、getLastcol【Google Apps Script】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        スプレッドシートで行、列を取得する方法をまとめています。最終行にデータを追加する応用編のサンプルデータも公開中です。この記事で解説しているメソッドgetLastRow()getLastColumn()getMaxRows()getMaxCo
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://coporilife.com/214/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://coporilife.com/214/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          coporilife.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/sakaimo/items/ba5594208c254fa528dc" title="GAS Spreadsheetの getRange(row, column, numRows, numColumns)を勘違いしていた - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnFpaXRhLWltYWdlLXN0b3JlLnMzLmFtYXpvbmF3cy5jb20lMkYwJTJGODYxMiUyRnByb2ZpbGUtaW1hZ2VzJTJGMTU0NDUzMTQwMz9peGxpYj1yYi00LjAuMCZhcj0xJTNBMSZmaXQ9Y3JvcCZtYXNrPWVsbGlwc2UmYmc9RkZGRkZGJmZtPXBuZzMyJnM9ZDZmNjZlMTFmNmY4NzAyYzRmNTA4YmUwZmE1OGMxYjc%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D57c741ef38ca6e89d71d95566097279f?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R0FTJTIwU3ByZWFkc2hlZXQlRTMlODElQUUlMjBnZXRSYW5nZSUyOHJvdyUyQyUyMGNvbHVtbiUyQyUyMG51bVJvd3MlMkMlMjBudW1Db2x1bW5zJTI5JUUzJTgyJTkyJUU1JThCJTk4JUU5JTgxJTk1JUUzJTgxJTg0JUUzJTgxJTk3JUUzJTgxJUE2JUUzJTgxJTg0JUUzJTgxJTlGJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LXBhZD0wJnM9ODU4Njk4MDIxMGY5MDNhYWVmNjgyZjgyNmVkN2VjYzA&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBzYWthaW1vJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LXBhZD0wJnM9NmZkYzY0ODU3OTYwMDkxZTg4YjA5ZTg4YjhlNWNmY2U&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=80a66e4f9118d342c52eea0c8bcb5eea" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GAS Spreadsheetの getRange(row, column, numRows, numColumns)を勘違いしていた - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        きっかけ GASでスプレッドシートを扱うときに getRange をよく使います。 普段は、 const sheet = SpreadsheetApp.getActiveSheet(); const data = sheet.getData...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/sakaimo/items/ba5594208c254fa528dc" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/sakaimo/items/ba5594208c254fa528dc" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://stackoverflow.com/questions/65215005/what-is-the-difference-between-getheight-and-getnumrows-in-google-apps-scrip" title="What is the difference between getHeight() and getNumRows() in Google Apps Script?" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        What is the difference between getHeight() and getNumRows() in Google Apps Script?
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Background:According to the documentation on Class Range, there are two separate methods for obtaining the number of row...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/65215005/what-is-the-difference-between-getheight-and-getnumrows-in-google-apps-scrip" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/65215005/what-is-the-difference-between-getheight-and-getnumrows-in-google-apps-scrip" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://gist.github.com/3881871" title="Get Column Range by Start Row Index, google script for spreadsheets" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Get Column Range by Start Row Index, google script for spreadsheets
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Get Column Range by Start Row Index, google script for spreadsheets - getcolrange.js
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gist.github.com/wskidmore/3881871" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gist.github.com/wskidmore/3881871" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gist.github.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://atmarkit.itmedia.co.jp/ait/articles/1702/09/news021_2.html" title="GASでGoogleスプレッドシートのセルの値、行数や列数を取得したり、セルに値を入力したりする基本" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://image.itmedia.co.jp/images/logo/1200x630_500x500_ait.gif" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://image.itmedia.co.jp/images/logo/1200x630_500x500_ait.gif" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASでGoogleスプレッドシートのセルの値、行数や列数を取得したり、セルに値を入力したりする基本
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Googleが提供するGoogle Apps Script（GAS）のプログラミングで、Google Apps（主にスプレッドシート）を操作する方法を解説していく連載。今回は、スプレッドシートのオブジェクトを整理し、セル操作に関する基本的な...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://atmarkit.itmedia.co.jp/ait/articles/1702/09/news021_2.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://atmarkit.itmedia.co.jp/ait/articles/1702/09/news021_2.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          atmarkit.itmedia.co.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/kokogento/items/a2aa79525b0b150c816f" title="【Google Apps Scriptとスプレッドシートで在庫管理】選択範囲の中で取得した値を使って、別シートで計算する - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnMzLWFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkZxaWl0YS1pbWFnZS1zdG9yZSUyRjAlMkYxNjcyMjAlMkY2ZWZiNjk3ODc2NzE0NWIwNTdhOGIyMzM5MzFlYTJkYjdiNzNkNmZkJTJGeF9sYXJnZS5wbmclM0YxNjkwODA4NDEwP2l4bGliPXJiLTQuMC4wJmFyPTElM0ExJmZpdD1jcm9wJm1hc2s9ZWxsaXBzZSZiZz1GRkZGRkYmZm09cG5nMzImcz05NGU1MjViYWNjMGUwOTY3ZTFmZmNhM2FhYWRjN2ZkYQ%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D841c6512bea76a5b7f7bbc1f87a65ee9?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9JUUzJTgwJTkwR29vZ2xlJTIwQXBwcyUyMFNjcmlwdCVFMyU4MSVBOCVFMyU4MiVCOSVFMyU4MyU5NyVFMyU4MyVBQyVFMyU4MyU4MyVFMyU4MyU4OSVFMyU4MiVCNyVFMyU4MyVCQyVFMyU4MyU4OCVFMyU4MSVBNyVFNSU5QyVBOCVFNSVCQSVBQiVFNyVBRSVBMSVFNyU5MCU4NiVFMyU4MCU5MSVFOSU4MSVCOCVFNiU4QSU5RSVFNyVBRiU4NCVFNSU5QiVCMiVFMyU4MSVBRSVFNCVCOCVBRCVFMyU4MSVBNyVFNSU4RiU5NiVFNSVCRSU5NyVFMyU4MSU5NyVFMyU4MSU5RiVFNSU4MCVBNCVFMyU4MiU5MiVFNCVCRCVCRiVFMyU4MSVBMyVFMyU4MSVBNiVFMyU4MCU4MSVFNSU4OCVBNSVFMyU4MiVCNyVFMyU4MyVCQyVFMyU4MyU4OCVFMyU4MSVBNyVFOCVBOCU4OCVFMiU4MCVBNiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZ0eHQtY29sb3I9JTIzMUUyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1wYWQ9MCZzPTA4NGFmYzQ4NjkwM2I3ZDM2YjZlMTdjNDliNzY2Y2E1&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBrb2tvZ2VudG8mdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtcGFkPTAmcz1kNmM4N2ViMjA4ZTMyNDg3MDMzZmQ5MGFlNmRkZmEwMA&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=0f690fab0d99efb30b4b5b1a90b7e87a" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【Google Apps Scriptとスプレッドシートで在庫管理】選択範囲の中で取得した値を使って、別シートで計算する - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        はじめに この動画を見ていただけると、大体何をやるのか理解していただけるかと。。 Google Apps Scriptで在庫管理】選択範囲の中で取得した値を使って、別シートで計算する pic.twitter.com/wDrpmCA9w3— ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/kokogento/items/a2aa79525b0b150c816f" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/kokogento/items/a2aa79525b0b150c816f" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/getnumrows/" title="セル範囲にある行の行数を取得する：getNumRows()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="http://gsuiteguide.jp/wp-content/uploads/cover_googlespreadsheet-486x290.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="http://gsuiteguide.jp/wp-content/uploads/cover_googlespreadsheet-486x290.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        セル範囲にある行の行数を取得する：getNumRows()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        セル範囲にある行の行数を取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreadsheet(); // そのスプレッドシートにある最初のシートを...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getnumrows/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getnumrows/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://matsukiyoshi.com/gas-getrange/" title="【スプレッドシート】GASで取得できるセル範囲の情報まとめ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://matsukiyoshi.com/wp-content/uploads/2022/07/student-g5f4750313_1920.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://matsukiyoshi.com/wp-content/uploads/2022/07/student-g5f4750313_1920.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【スプレッドシート】GASで取得できるセル範囲の情報まとめ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        この記事では「Rangeクラス」の機能のうち，セル範囲の情報の取得に関する機能をご紹介します．
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://matsukiyoshi.com/gas-getrange/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://matsukiyoshi.com/gas-getrange/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          matsukiyoshi.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
</div>
