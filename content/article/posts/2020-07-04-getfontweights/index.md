---
title: GASでスプレッドシートの指定範囲から太字設定を一括取得する方法
author: arukayies
date: 2020-07-04T12:38:21+00:00
excerpt: GASでスプレッドシートの指定範囲すべての太字を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1593866302
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
  - getFontWeights()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）って知っとる？ スプレッドシートを自動化できる強力なツールじゃけ、これを使いこなせば作業効率が爆上がりするばい！

今回紹介するのは、`getFontWeights()`メソッド。 これを使うと、セル範囲のフォントの太字設定をまとめて取得できるっちゃ。


### getFontWeights()って何すると？

`getFontWeights()`は指定したセル範囲の太字情報を取得するメソッド。 戻り値は二次元配列になっとって、

<ul class="wp-block-list">
  <li>
    <code>"bold"</code>（太字）
  </li>
  <li>
    <code>"normal"</code>（通常）
  </li>
</ul>

のどちらかが返ってくる仕組みたい。

例えば、スプレッドシートの`B2:D4`のセル範囲を対象にすると、

<pre class="wp-block-code"><code>const range = SpreadsheetApp.getActiveSpreadsheet().getRange('B2:D4');
const fontWeights = range.getFontWeights();
</code></pre>

こんな感じで、セルの太字設定を一気に取得できるけ。

### getFontWeight()との違い

`getFontWeight()` っていう似たメソッドもあるんやけど、 こっちは「単一セルのみ」のフォント太字設定を取得するもの。

一方、`getFontWeights()`なら「複数セルをまとめて」取得できるとばい。 大規模なデータを扱うときは断然こっちが便利さ。

### 実践！セル範囲の太字情報を取得してみる

次のサンプルコードでは、指定した範囲の太字設定をコンソールに表示するばい。

<pre class="wp-block-code"><code>function sampleGetFontWeights() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('データシート');
  const range = sheet.getRange('B2:D4');
  const weights = range.getFontWeights();

  weights.forEach((row, rowIndex) =&gt; {
    row.forEach((cellValue, colIndex) =&gt; {
      console.log(`セル ${String.fromCharCode(66 + colIndex)}${rowIndex + 2}: ${cellValue}`);
    });
  });
}
</code></pre>

このコードを実行すると、セルのフォント状態が`bold`か`normal`か分かるばい。

### 太字のセルだけ色を変えてみる

例えば、太字になっとるセルの背景色を黄色にするなら、こんなコードを書けばよかばい。

<pre class="wp-block-code"><code>function highlightBoldCells() {
  const range = SpreadsheetApp.getActiveSheet().getRange('A1:C10');
  const weights = range.getFontWeights();
  const backgrounds = weights.map(row =&gt; 
    row.map(cell =&gt; cell === 'bold' ? '#FFFF00' : null)
  );
  range.setBackgrounds(backgrounds);
}
</code></pre>

このスクリプトを実行すると、太字のセルだけ黄色になるっちゃ。

### 大量のデータを扱うときの注意点

スプレッドシートには「1シートあたり500万セルまで」という制限があるっちゃ。 データが増えてくると処理が遅くなるけ、

<ul class="wp-block-list">
  <li>
    必要な範囲だけ取得する
  </li>
  <li>
    <code>getValues()</code>と組み合わせて効率化する
  </li>
</ul>

みたいな工夫が必要じゃ。

例えば、500行ずつ処理するときはこんな感じで書くとよかばい。

<pre class="wp-block-code"><code>function processLargeData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const totalRows = sheet.getLastRow();
  const batchSize = 500;

  for (let i = 1; i &lt;= totalRows; i += batchSize) {
    const range = sheet.getRange(i, 1, Math.min(batchSize, totalRows - i + 1), 10);
    const weights = range.getFontWeights();
    console.log(weights);
  }
}
</code></pre>

これで、スプレッドシートのデータを少しずつ処理できるけ、 動作がスムーズになるばい。

### まとめ

`getFontWeights()`メソッドを使えば、

<ul class="wp-block-list">
  <li>
    スプレッドシートの太字設定を一括取得できる
  </li>
  <li>
    <code>getFontWeight()</code>よりも効率的
  </li>
  <li>
    背景色変更やデータ分析にも応用できる
  </li>
</ul>

といったメリットがあるっちゃ。

大規模データを扱うときは、処理速度を意識しながら工夫して使ってみてね！


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
</div>
