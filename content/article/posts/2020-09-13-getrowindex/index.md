---
title: Google Apps Script における getRowIndex() メソッドの徹底解説ばい！
author: arukayies
type: post
date: 2020-09-13T12:19:50+00:00
excerpt: GASでスプレッドシートの指定セルの行の位置を取得する方法を紹介します！
url: /gas/getrowindex
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1599999591
page_type:
  - default
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 2.5
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-03-06 09:03:15
categories:
  - GAS
tags:
  - GAS
  - getRowIndex()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
どもども！GAS（Google Apps Script）を使っとると、スプレッドシートの行番号を取得する場面が結構あるっちゃね。今回は、その中でも **`getRowIndex()` メソッド** にフォーカスして、基本的な使い方から応用テクまで、がっつり解説していくばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 1. getRowIndex() って何さ？

このメソッドは、スプレッドシートの `Range` クラスに属しとって、**指定した範囲の最初の行番号を取得する** ためのメソッドたい。

<pre class="wp-block-code"><code>const rowNumber = range.getRowIndex();
</code></pre>

引数は不要で、指定したセル範囲の **先頭行の番号** を整数値で返すんじゃ。

### 例えばこんな感じ！

<pre class="wp-block-code"><code>function basicExample() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("C3");
  const rowNumber = range.getRowIndex();
  Logger.log(rowNumber); // 3 が出力されるばい！
}
</code></pre>

C3セルを指定したら、その行番号「3」が返ってくるっちゃね！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 2. getRowIndex() と他の行取得メソッドの違い

「行番号を取得する」ってだけなら、他にも色々なメソッドがあるけん、違いをまとめとくばい！<figure class="wp-block-table">

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド名
    </th>
    
    <th>
      戻り値
    </th>
    
    <th>
      説明
    </th>
  </tr>
  
  <tr>
    <td>
      <code>getRowIndex()</code>
    </td>
    
    <td>
      整数
    </td>
    
    <td>
      指定範囲の<strong>先頭行</strong>の番号を取得
    </td>
  </tr>
  
  <tr>
    <td>
      <code>getRow()</code>
    </td>
    
    <td>
      整数
    </td>
    
    <td>
      <code>getRowIndex()</code> とほぼ同じ動作
    </td>
  </tr>
  
  <tr>
    <td>
      <code>getLastRow()</code>
    </td>
    
    <td>
      整数
    </td>
    
    <td>
      データが入っとる最終行を取得
    </td>
  </tr>
  
  <tr>
    <td>
      <code>getNumRows()</code>
    </td>
    
    <td>
      整数
    </td>
    
    <td>
      指定範囲内の行数を取得
    </td>
  </tr>
</table></figure> 

たとえば、B2:D5 を対象にすると、

<pre class="wp-block-code"><code>function rangeBehavior() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("B2:D5");
  console.log(range.getRowIndex()); // 2 を出力
  console.log(range.getNumRows());  // 4 を出力
}
</code></pre>

複数行指定しとる場合でも、`getRowIndex()` は「開始行」を返すけん、注意ばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 3. 実践！ getRowIndex() を活用するテクニック

### (1) 動的に範囲を指定して行番号を取得

<pre class="wp-block-code"><code>function dynamicRangeExample() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const dataRange = sheet.getRange(2, 1, lastRow-1, 3);
  const startRow = dataRange.getRowIndex();
  Logger.log(`データ範囲開始行: ${startRow}`); 
}
</code></pre>

データがある範囲の最初の行を取得するときに便利やけん、覚えておくといいばい！

### (2) 条件付きで行を特定する

<pre class="wp-block-code"><code>function conditionalRowDetection() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  values.forEach((row, index) =&gt; {
    if (row&#91;0] === "重要") {
      const targetRange = sheet.getRange(index + 1, 1);
      console.log(`重要マーク行: ${targetRange.getRowIndex()}`);
    }
  });
}
</code></pre>

A列に「重要」って書いてある行の番号を取得するスクリプトばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 4. getRowIndex() を使うときの注意点

### (1) 存在しない範囲へのアクセスはエラーになる

<pre class="wp-block-code"><code>const invalidRange = sheet.getRange("XFD1048576");
console.log(invalidRange.getRowIndex()); // エラー！
</code></pre>

**最大行数・最大列数を超えた範囲を指定するとエラーになるばい！**

### (2) 非アクティブなシートを参照するとエラー！

<pre class="wp-block-code"><code>const inactiveSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("存在しないシート");
const range = inactiveSheet.getRange("A1"); // エラー発生！
</code></pre>

`getSheetByName()` で null が返る可能性があるけん、チェックすること！

<pre class="wp-block-code"><code>if (inactiveSheet) {
  const range = inactiveSheet.getRange("A1");
  console.log(range.getRowIndex());
} else {
  console.log("シートが存在しません！");
}
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 5. まとめ

**`getRowIndex()` は「指定した範囲の先頭行」を取得する便利なメソッド** ばい！

### 💡 ポイントまとめ！

✅ `getRowIndex()` は範囲の**開始行**を取得する ✅ `getRow()` とほぼ同じやけど、コードの意図を明確にできる ✅ `getLastRow()` や `getNumRows()` と組み合わせるとさらに便利！ ✅ **バッチ処理を意識したコーディングで高速化を図ろう！**

これで `getRowIndex()` をフル活用できるようになったばい！ GAS でのスプレッドシート操作がもっと楽しくなるけん、ぜひ試してみてね！

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
  
  <br /> <a rel="noopener" href="https://rinyan-7.com/gas/range_getrow/" title="&#12304;getRow&#12513;&#12477;&#12483;&#12489;&#12434;&#20351;&#12356;&#12371;&#12394;&#12381;&#12358;&#65281;&#12305;&#21177;&#29575;&#30340;&#12394;&#34892;&#30058;&#21495;&#21462;&#24471;&#27861;&#12392;&#23455;&#29992;&#30340;&#12394;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_getrow%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_getrow%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12304;getRow&#12513;&#12477;&#12483;&#12489;&#12434;&#20351;&#12356;&#12371;&#12394;&#12381;&#12358;&#65281;&#12305;&#21177;&#29575;&#30340;&#12394;&#34892;&#30058;&#21495;&#21462;&#24471;&#27861;&#12392;&#23455;&#29992;&#30340;&#12394;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_getrow/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_getrow/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          rinyan-7.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a href="https://techuplife.tech/gas-ss-rtextwrap/"><a href="https://caymezon.com/gas-row-col-pnt-num-get/%EF%BC%89">https://caymezon.com/gas-row-col-pnt-num-get/</a></a>
</div>
