---
title: GASでスプレッドシートの指定セルの文字線設定を取得する方法徹底解説
author: arukayies
date: 2020-06-27T13:44:16+00:00
excerpt: GASでスプレッドシートの指定セルの文字線(下線,取り消し線)を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1593265456
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
  - getFontLine()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）は、Googleスプレッドシートの自動化に便利なツールばい。今回はその中でも、テキスト装飾を取得できる`getFontLine()`メソッドについて詳しく掘り下げていくけ！


## getFontLine()メソッドとは？

`getFontLine()`は、スプレッドシート内の特定のセルや範囲のテキスト装飾（下線や取り消し線）を取得するためのメソッドじゃ。

### メソッドの構文

<pre class="wp-block-code"><code>range.getFontLine();
</code></pre>

### 戻り値の種類

このメソッドは以下の3種類の値を返すばい。

<ul class="wp-block-list">
  <li>
    <code>'underline'</code>（下線あり）
  </li>
  <li>
    <code>'line-through'</code>（取り消し線あり）
  </li>
  <li>
    <code>'none'</code>（装飾なし）
  </li>
</ul>

## getFontLine()の基本的な使い方

### 単一セルの装飾を取得する

<pre class="wp-block-code"><code>function checkSingleCellDecoration() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SalesData');
  const targetCell = sheet.getRange('B2');
  Logger.log(`B2セルの装飾状態: ${targetCell.getFontLine()}`);
}
</code></pre>

このコードを実行すると、B2セルの装飾状態がログに出力されるばい。

## 複数セルの装飾を一括取得

複数セルをまとめて処理したい場合は`getFontLines()`メソッドを使うと便利じゃ。

<pre class="wp-block-code"><code>function checkRangeDecorations() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inventory');
  const dataRange = sheet.getRange('A1:C5');
  const decorationMatrix = dataRange.getFontLines();

  decorationMatrix.forEach((row, rowIndex) =&gt; {
    row.forEach((cellStatus, colIndex) =&gt; {
      console.log(`セル ${String.fromCharCode(65 + colIndex)}${rowIndex + 1}: ${cellStatus}`);
    });
  });
}
</code></pre>

`getFontLines()`は二次元配列で装飾情報を取得できるばい。大規模なデータを扱う時に便利じゃ。

## getFontLine()の実践的な活用例

### 注文管理システムでの活用

取り消し線が付いたセルを見つけて、注文キャンセル処理を実行する例ばい。

<pre class="wp-block-code"><code>function validateOrderEntries() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Orders');
  const validationRange = sheet.getRange('D2:D100');
  const cancellationFlags = validationRange.getFontLines();

  cancellationFlags.flat().forEach((status, index) =&gt; {
    if (status === 'line-through') {
      console.warn(`行 ${index + 2} の注文が取り消し済みばい！`);
    }
  });
}
</code></pre>

## パフォーマンス最適化のポイント

### バッチ処理の活用

`getFontLines()`を使うとAPI呼び出し回数を減らせるけ。

<pre class="wp-block-code"><code>function optimizedBatchProcessing() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const fullRange = sheet.getDataRange();
  const fontData = fullRange.getFontLines();
  
  fontData.forEach((row, r) =&gt; {
    const noteText = row.map(status =&gt; status === 'none' ? '未処理' : '処理済み').join(',');
    sheet.getRange(r + 1, 1).setNote(noteText);
  });
}
</code></pre>

## まとめ

`getFontLine()`メソッドを使えば、Googleスプレッドシートの装飾情報を簡単に取得できるばい。注文管理やデータ解析など、いろんな場面で活用できるけ、試してみるといいじゃ！


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
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/getfontline/" title="セルの文字装飾(取り消し線、下線)を取得する：getFontLine()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        セルの文字装飾(取り消し線、下線)を取得する：getFontLine()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        getFontLine() セルの文字装飾(取り消し線、下線)を取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreadsheet(); // ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getfontline/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getfontline/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a>
</div>
