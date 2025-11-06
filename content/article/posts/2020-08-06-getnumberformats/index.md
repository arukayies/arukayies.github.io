---
title: GASでスプレッドシートの指定範囲から数値フォーマットを一括取得する方法
author: arukayies
date: 2020-08-06T12:29:38+00:00
excerpt: GASでスプレッドシートの指定範囲すべての数値の書式を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1596716988
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
  - getNumberFormats()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年8月"]
---
GoogleスプレッドシートをGAS（Google Apps Script）で操作する時、セルの数値フォーマットを一括取得したいことってあるばい？ そんな時に便利なのが `getNumberFormats()` メソッドさ！

今回は、この `getNumberFormats()` の基本から応用まで、わかりやすく解説していくけんね！


## 1. getNumberFormats() ってどんなメソッド？

### メソッドの概要

このメソッドを使えば、指定した範囲内の数値フォーマットや日付フォーマットを一括取得できるばい。データの整合性チェックやフォーマットの統一にも使えるけん、便利さ！

### 基本構文

<pre class="wp-block-code"><code>const formats = range.getNumberFormats();
</code></pre>

この `range` には `SpreadsheetApp.getActiveSheet().getRange()` で取得したセル範囲を指定すればよかばい。

### 返り値の形式

戻り値は**二次元配列**になっていて、各セルのフォーマットが `String` で格納されるっちゃね。

例えば、B2からC3までの範囲を取得すると、

<pre class="wp-block-code"><code>&#91;
  &#91;'#,##0', 'yyyy/MM/dd'],
  &#91;'0.00%', 'General']
]
</code></pre>

こんな感じで返ってくるばい。

## 2. getNumberFormats() の基本的な使い方

### シンプルなサンプルコード

<pre class="wp-block-code"><code>function sampleGetNumberFormats() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('データシート');
  const range = sheet.getRange('B2:D5');
  const formats = range.getNumberFormats();
  
  formats.forEach((row, rowIndex) =&gt; {
    row.forEach((format, colIndex) =&gt; {
      console.log(`セル ${String.fromCharCode(66 + colIndex)}${rowIndex + 2}: ${format}`);
    });
  });
}
</code></pre>

このコードを実行すると、セルごとのフォーマット情報がコンソールに表示されるばい。

### フォーマットの具体例

<table class="has-fixed-layout">
  <tr>
    <th>
      フォーマット種別
    </th>
    
    <th>
      例
    </th>
    
    <th>
      表示
    </th>
  </tr>
  
  <tr>
    <td>
      数値
    </td>
    
    <td>
      <code>#,##0.00</code>
    </td>
    
    <td>
      12,345.67
    </td>
  </tr>
  
  <tr>
    <td>
      パーセンテージ
    </td>
    
    <td>
      <code>0.00%</code>
    </td>
    
    <td>
      98.76%
    </td>
  </tr>
  
  <tr>
    <td>
      日付
    </td>
    
    <td>
      <code>yyyy/MM/dd</code>
    </td>
    
    <td>
      2025/03/06
    </td>
  </tr>
  
  <tr>
    <td>
      通貨
    </td>
    
    <td>
      <code>[$¥-411]#,##0.00</code>
    </td>
    
    <td>
      ¥12,345.67
    </td>
  </tr>
</table></figure> 

## 3. 応用例：フォーマット整合性チェック

データのフォーマットがちゃんと統一されているか確認したい？ そんな時はこのスクリプトを使えばよかばい！

<pre class="wp-block-code"><code>function validateColumnFormats() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('売上データ');
  const formatRules = {
    3: 'yyyy/MM/dd',
    4: '#,##0',
    5: '&#91;$¥-411]#,##0.00'
  };

  const range = sheet.getRange(2, 3, sheet.getLastRow() - 1, 3);
  const formats = range.getNumberFormats();

  formats.forEach((row, rowIndex) =&gt; {
    Object.keys(formatRules).forEach(colOffset =&gt; {
      const expected = formatRules&#91;colOffset];
      const actual = row&#91;colOffset - 1];
      if (actual !== expected) {
        console.error(`エラー: ${String.fromCharCode(64 + 3 + parseInt(colOffset))}${rowIndex + 2} 期待:${expected} 実際:${actual}`);
      }
    });
  });
}
</code></pre>

このスクリプトを実行すれば、フォーマットが異なるセルを自動検出してくれるばい！

## 4. まとめ

`getNumberFormats()` メソッドを使えば、スプレッドシートのフォーマットを一括取得して、整合性チェックやデータのフォーマット統一が簡単にできるばい！

こんな活用法を試してみて、業務の自動化をどんどん進めてみるとよかばい！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://gsuiteguide.jp/sheets/getnumberformats/" title="セル範囲の書式(数値書式、日付書式)をセルごとに取得する：getNumberFormats()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        セル範囲の書式(数値書式、日付書式)をセルごとに取得する：getNumberFormats()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        getNumberFormats() セル範囲の書式(数値書式、日付書式)をセルごとに取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreads...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getnumberformats/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getnumberformats/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
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
