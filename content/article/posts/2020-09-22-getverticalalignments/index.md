---
title: GASでスプレッドシートのセル範囲から垂直配置設定を一括取得する方法
author: arukayies
date: 2020-09-22T09:02:02+00:00
excerpt: GASでスプレッドシートの指定範囲すべての垂直方向を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1600765324
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
  - getVerticalAlignments()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
Google スプレッドシートをカスタマイズするなら、Google Apps Script（GAS）は避けて通れんばい。今回は、その中でもセルの垂直配置を取得する `getVerticalAlignments()` について深掘りしていくけんね！


## getVerticalAlignments() って何ばい？

このメソッドは、指定した範囲内のセルの垂直配置を取得できる便利な関数たい。スプレッドシートでデータをきれいに整理するには欠かせんとよ。

**垂直配置の種類は以下の3つ:**

<ul class="wp-block-list">
  <li>
    <code>top</code>：セルの上側に寄せる
  </li>
  <li>
    <code>middle</code>：セルの中央に配置（デフォルト）
  </li>
  <li>
    <code>bottom</code>：セルの下側に寄せる
  </li>
</ul>

スプレッドシートのデフォルト設定は `bottom` になっとるけん、Excelとは違うとこに注意せんといかんばい。

## getVerticalAlignments() の基本構文

<pre class="wp-block-code"><code>range.getVerticalAlignments();
</code></pre>

### 戻り値

メソッドを実行すると、対象範囲のセルの垂直配置が**二次元配列**で返ってくるばい！

例えば、3行2列のセル範囲で `getVerticalAlignments()` を実行すると、こんな感じの配列が返ってくる

<pre class="wp-block-code"><code>&#91;
  &#91;'top', 'middle'],
  &#91;'bottom', 'top'],
  &#91;'middle', 'bottom']
]
</code></pre>

## getVerticalAlignments() の活用例

### 1. セルの垂直配置を取得する基本的なスクリプト

<pre class="wp-block-code"><code>function fetchVerticalAlignments() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('データシート');
  const targetRange = sheet.getRange('B2:D4');
  
  const alignments = targetRange.getVerticalAlignments();
  
  console.log('垂直配置データ:', alignments);
}
</code></pre>

### 2. 配列データを整理して表示する

<pre class="wp-block-code"><code>alignments.forEach((row, rowIndex) =&gt; {
  row.forEach((alignment, colIndex) =&gt; {
    console.log(`行 ${rowIndex+1}, 列 ${colIndex+1}: ${alignment}`);
  });
});
</code></pre>

### 3. すべてのセルの垂直配置を中央寄せに変更

<pre class="wp-block-code"><code>function standardizeVerticalAlignment() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const range = sheet.getDataRange();
  
  const alignments = range.getVerticalAlignments().map(row =&gt; row.map(() =&gt; 'middle'));
  
  range.setVerticalAlignments(alignments);
}
</code></pre>

## getVerticalAlignments() の応用シナリオ

### 条件付き書式設定と連携

たとえば、`bottom` になっているセルを `middle` に変更するといった動的書式設定もできるばい！

<pre class="wp-block-code"><code>function applyConditionalFormatting() {
  const range = SpreadsheetApp.getActiveRange();
  const alignments = range.getVerticalAlignments();
  
  const updatedAlignments = alignments.map(row =&gt;
    row.map(alignment =&gt; alignment === 'bottom' ? 'middle' : alignment)
  );
  
  range.setVerticalAlignments(updatedAlignments);
}
</code></pre>

### 編集履歴を記録するシステム

変更前後の垂直配置をログに保存する仕組みも簡単に作れるっちゃ！

<pre class="wp-block-code"><code>function monitorAlignmentChanges() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const historySheet = SpreadsheetApp.openById('履歴シートID').getSheetByName('ログ');
  
  const currentAlignments = sheet.getRange('A1:C10').getVerticalAlignments();
  const timestamp = new Date();
  
  historySheet.appendRow(&#91;timestamp, JSON.stringify(currentAlignments)]);
}
</code></pre>

## まとめ

<ul class="wp-block-list">
  <li>
    <code>getVerticalAlignments()</code> を使えば、セルの垂直配置を簡単に取得できる！
  </li>
  <li>
    データを整理するのに役立つし、動的な書式設定にも活用できる！
  </li>
  <li>
    <code>setVerticalAlignments()</code> と組み合わせることで、配置変更も自由自在！
  </li>
</ul>

GAS を使いこなせば、スプレッドシートがもっと便利になるばい！


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
  
  <br /> <a rel="noopener" href="https://stackoverflow.com/questions/54647812/google-app-scripts-how-to-get-cell-alignments-from-range" title="Google app scripts - how to get cell alignments from range" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        Google app scripts - how to get cell alignments from range
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        How do you get the alignments of a range of cells in Google App Scripts?I can see methods for getting colors, background...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/54647812/google-app-scripts-how-to-get-cell-alignments-from-range" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/54647812/google-app-scripts-how-to-get-cell-alignments-from-range" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/getverticalalignments/" title="セル範囲の垂直方向の配置(上寄せ、中央寄せ、下寄せ)をセルごとに取得する：getVerticalAlignments()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        セル範囲の垂直方向の配置(上寄せ、中央寄せ、下寄せ)をセルごとに取得する：getVerticalAlignments()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        getVerticalAlignments() セル範囲の垂直方向の配置(上寄せ、中央寄せ、下寄せ)をセルごとに取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.get...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getverticalalignments/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getverticalalignments/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a>
</div>
