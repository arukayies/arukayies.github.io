---
title: Google Apps ScriptのgetNumberFormat()を使いこなすばい！
author: arukayies
type: post
date: 2020-08-06T12:21:47+00:00
excerpt: GASでスプレッドシートの指定セルの数値の書式を取得する方法を紹介します！
url: /gas/getnumberformat
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1596716509
page_type:
  - default
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 5
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-03-06 11:30:30
categories:
  - GAS
tags:
  - GAS
  - getNumberFormat()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年8月"]
---
Google Apps Script（GAS）でスプレッドシートのデータを扱うとき、数値や日付の表示形式を取得したいことってあるばい？ そんなとき役立つのが`getNumberFormat()`メソッドたい。本記事では、その使い方から応用まで、しっかり解説するばい！

### getNumberFormat()って何するもん？

`getNumberFormat()`は、セルに設定されとる表示形式を取得するメソッドじゃ。例えば、`yyyy/MM/dd`の形式になっとる日付や、通貨のフォーマットを取得できるとさ。

#### 使い方はこればい！

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const cell = sheet.getRange("A1");
const format = cell.getNumberFormat();
Logger.log(format); // 例: "yyyy/MM/dd"
</code></pre>

### 範囲内のフォーマットを一括取得する方法

セルが1つなら`getNumberFormat()`を使うばってん、範囲を指定して複数セルのフォーマットを取得するには、`getNumberFormats()`を使うとよ。

<pre class="wp-block-code"><code>const formats = sheet.getRange("A1:B2").getNumberFormats();
// &#91;&#91;"#,##0.00", "0.00%"], &#91;"yyyy/MM/dd", "$#,##0.00"]]
</code></pre>

### 実践！数値フォーマットのチェック

たとえば、スプレッドシートのデータが正しいフォーマットになっとるかチェックする関数を作ってみるばい。

<pre class="wp-block-code"><code>function checkDateFormat() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("SalesData");
  const dateCell = sheet.getRange("C5");
  const currentFormat = dateCell.getNumberFormat();
  
  if (currentFormat !== "yyyy-MM-dd") {
    dateCell.setNumberFormat("yyyy-MM-dd");
  }
}
</code></pre>

### フォーマットの種類とその意味

<table class="has-fixed-layout">
  <tr>
    <th>
      フォーマット文字列
    </th>
    
    <th>
      表示例
    </th>
    
    <th>
      適用データ型
    </th>
  </tr>
  
  <tr>
    <td>
      &#8220;#,##0.00&#8221;
    </td>
    
    <td>
      12,345.67
    </td>
    
    <td>
      数値
    </td>
  </tr>
  
  <tr>
    <td>
      &#8220;0.00%&#8221;
    </td>
    
    <td>
      98.76%
    </td>
    
    <td>
      パーセント
    </td>
  </tr>
  
  <tr>
    <td>
      &#8220;yyyy-MM-dd&#8221;
    </td>
    
    <td>
      2025-03-06
    </td>
    
    <td>
      日付
    </td>
  </tr>
  
  <tr>
    <td>
      &#8220;[$¥-411]#,##0.00&#8221;
    </td>
    
    <td>
      ¥12,345.67
    </td>
    
    <td>
      通貨
    </td>
  </tr>
  
  <tr>
    <td>
      &#8220;0.0E+00&#8221;
    </td>
    
    <td>
      1.2E+03
    </td>
    
    <td>
      指数表記
    </td>
  </tr>
</table></figure> 

### まとめ

`getNumberFormat()`は、スプレッドシートのデータ管理をもっとスマートにする便利なメソッドたい。 表示形式を正しく扱えば、データの見やすさもグッと向上するけ！ GASでスプレッドシートを操作するときは、ぜひ活用してみるばい！

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
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/getnumberformat/" title="セルの書式(数値書式、日付書式)を取得する：getNumberFormat()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        セルの書式(数値書式、日付書式)を取得する：getNumberFormat()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        getNumberFormat() セルの書式(数値書式、日付書式)を取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreadsheet(); ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getnumberformat/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getnumberformat/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a href="https://techuplife.tech/gas-ss-rtextwrap/"> <a href="https://arukayies.com/gas/getnumberformat">https://arukayies.com/gas/getnumberformat</a></a>
</div>
