---
title: GASでスプレッドシートの指定セルから文字色の詳細情報を取得する方法
author: arukayies
date: 2020-06-22T12:07:22+00:00
excerpt: GASでスプレッドシートのセルの文字色を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1592827643
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
  - getFontColorObject()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）を使ってスプレッドシートを操作しとると、文字色を取得したり、変更したりする場面に出くわすことがあるっちゃね。そんなときに便利なのが `getFontColorObject()` メソッドばい！

今回は、この `getFontColorObject()` の基本的な使い方から応用的な活用法まで、わかりやすく解説するけ。初心者でもしっかり理解できるようにまとめたばい！


## getFontColorObject() とは？

`getFontColorObject()` は、Googleスプレッドシートのセル内のフォントカラーをオブジェクト形式で取得できるメソッドじゃ。従来の `getFontColor()` では16進数の文字列（例：`#ff0000`）しか取得できんかったけど、新しいメソッドならRGB値やアルファ値（透明度）も扱えるとよ！

<pre class="wp-block-code"><code>const colorObj = range.getFontColorObject();
const hexCode = colorObj.asRgbColor().asHexString(); // #RRGGBB形式
</code></pre>

## RGB値の取得と活用

このメソッドを使えば、フォントの色をRGB（赤・緑・青）の各成分に分解して取得できるっちゃね。たとえば、B2セルのフォントカラーを取得して、C2セルにRGB値として表示する方法を紹介するばい！

<pre class="wp-block-code"><code>function getSingleCellRGB() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Data');
  const range = sheet.getRange("B2");
  const color = range.getFontColorObject().asRgbColor();
  
  const rgbValues = {
    red: color.getRed(),
    green: color.getGreen(),
    blue: color.getBlue()
  };
  
  sheet.getRange("C2").setValue(`RGB(${rgbValues.red},${rgbValues.green},${rgbValues.blue})`);
}
</code></pre>

## 16進数カラーコードへの変換

ウェブデザインとの連携を考えると、16進数形式（`#RRGGBB`）のカラーコードを扱うことも多いっちゃろう。その場合は、次のように `asHexString()` を使うと便利ばい！

<pre class="wp-block-code"><code>function convertToHex() {
  const cell = SpreadsheetApp.getActive().getRange('A1');
  const hex = cell.getFontColorObject().asHexString();
  
  Logger.log(`HEX Code: ${hex}`);
  return hex;
}
</code></pre>

## セル範囲のフォントカラーを一括取得

大規模データを扱う場合、セル1つ1つを処理するのは効率が悪かろう？そんなときは `getFontColorObjects()` を使うと、セル範囲全体のフォントカラーを一括で取得できるけ！

<pre class="wp-block-code"><code>function processRangeColors() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('SalesData');
  const dataRange = sheet.getRange("A2:F100");
  const colorMatrix = dataRange.getFontColorObjects();
  
  colorMatrix.forEach((row, rowIndex) =&gt; {
    row.forEach((colorObj, colIndex) =&gt; {
      if(colorObj.asHexString() === '#FF0000') {
        sheet.getRange(rowIndex+2, colIndex+1)
          .setNote('要確認: 赤文字項目');
      }
    });
  });
}
</code></pre>

このスクリプトを使えば、赤文字（`#FF0000`）のセルに自動で「要確認」のメモを追加できるっちゃね！

## getFontColor() との違い

`getFontColor()` では単純に `#ff0000` のようなカラーコードしか取得できんかったばってん、 `getFontColorObject()` ならより細かい情報が取れるばい。<figure class="wp-block-table">

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド
    </th>
    
    <th>
      取得できる情報
    </th>
  </tr>
  
  <tr>
    <td>
      getFontColor()
    </td>
    
    <td>
      16進数カラーコード（例：<code>#ff0000</code>）
    </td>
  </tr>
  
  <tr>
    <td>
      getFontColorObject()
    </td>
    
    <td>
      RGB値、透明度、オブジェクト操作可
    </td>
  </tr>
</table></figure> 

移行するなら、次のようなコードを使うとスムーズじゃ！

<pre class="wp-block-code"><code>// 旧方式
const oldColor = range.getFontColor(); // '#ff0000' など

// 新方式
const newColor = range.getFontColorObject().asHexString();
</code></pre>

## トラブルシューティング

### デフォルト色取得の問題

明示的に色を設定してないセルは `#ff000000`（完全不透明の黒）として扱われることがあるっちゃ。これを回避するには、アルファ値（透明度）を考慮した処理を加えるとよかばい！

<pre class="wp-block-code"><code>function handleDefaultColor() {
  const cell = SpreadsheetApp.getActive().getRange('A1');
  const color = cell.getFontColorObject().asRgbColor();
  
  // アルファ値を無視した処理
  const effectiveColor = color.asHexString().slice(0,7);
  Logger.log(effectiveColor);
}
</code></pre>

## まとめ

`getFontColorObject()` を使えば、スプレッドシートのフォントカラーをもっと柔軟に扱えるようになるばい。特に、大量のデータを処理するときや、色ごとにアクションを設定したい場合にはめちゃくちゃ便利じゃ！

**こんな場面で使えるばい！**

<ul class="wp-block-list">
  <li>
    色分けされたデータの自動処理
  </li>
  <li>
    条件付き書式と組み合わせた動的分析
  </li>
  <li>
    WebデザインやCSSと連携したカラーマネジメント
  </li>
</ul>

GASを活用して、もっとスマートなスプレッドシート運用をしていこうや！


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
  
  <br /> <a rel="noopener" href="https://kuronn.com/article/getfontcolorobject-gas/" title="【GAS】スプレッドシートで値・文字列の文字色を取得 | くろんの部屋" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://kuronn.com/wp-content/uploads/2023/09/10.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://kuronn.com/wp-content/uploads/2023/09/10.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートで値・文字列の文字色を取得 | くろんの部屋
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS（Google Apps Script）を用いて、スプレッドシートのセルに入力された値・文字列の文字色（カラーコード）を取得するメソッドは単一セルの場合は『getFontColorObjectメソッド』、範囲の場合は『getFontC
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://kuronn.com/article/getfontcolorobject-gas/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://kuronn.com/article/getfontcolorobject-gas/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          kuronn.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/getfontcolor/" title="セルの文字色を取得する：getFontColor()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        セルの文字色を取得する：getFontColor()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        getFontColor() セルの文字色を取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreadsheet(); // そのスプレッドシート...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getfontcolor/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getfontcolor/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a>
</div>
