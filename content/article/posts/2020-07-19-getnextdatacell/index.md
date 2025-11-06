---
title: GASでスプレッドシートの指定方向にあるデータセルを効率的に取得する方法
author: arukayies
date: 2020-07-19T04:30:26+00:00
excerpt: GASでスプレッドシートの指定方向の次のセルを取得する方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1595133026
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
  - getNextDataCell(direction)
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
どげん？ Google スプレッドシートを使いこなしたかばってん、データの終わりを見つけるのが面倒くさいっちゃろ？ そこで便利なのが `getNextDataCell(direction)` メソッドばい！

このメソッドを使えば、データの境界をサクッと見つけてくれるけん、自動化スクリプトには欠かせん機能じゃね。


<hr class="wp-block-separator has-alpha-channel-opacity" />

## 1. getNextDataCell(direction) って何ね？

これは Google Apps Script (GAS) の `Range` オブジェクトに用意されたメソッドで、指定した方向（上下左右）に向かってデータのあるセルを探してくれる機能ばい。

<ul class="wp-block-list">
  <li>
    <code>UP</code>（上方向）
  </li>
  <li>
    <code>DOWN</code>（下方向）
  </li>
  <li>
    <code>PREVIOUS</code>（左方向）
  </li>
  <li>
    <code>NEXT</code>（右方向）
  </li>
</ul>

まるで Excel の「Ctrl + 矢印キー」みたいな動きをするっちゃね！

### ▼ 基本的な使い方

<pre class="wp-block-code"><code>const direction = SpreadsheetApp.Direction.DOWN;
const edgeCell = currentRange.getNextDataCell(direction);
</code></pre>

このコードを実行すると、`currentRange` から下方向にデータの終端を探し、最初に空白セルにぶつかる手前のセルを返してくれるばい。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 2. どんなときに使うと便利か？

### ✅ データの範囲を自動で取得

<pre class="wp-block-code"><code>function getDataRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const startCell = sheet.getRange('A1');
  
  const bottomCell = startCell.getNextDataCell(SpreadsheetApp.Direction.DOWN);
  console.log(`データ最終行: ${bottomCell.getRow()}`);
}
</code></pre>

→ スプレッドシートのデータがどこまで続いているかを取得できるけん、範囲指定の手間が省けるばい！

### ✅ データのブロックを動的に検出

<pre class="wp-block-code"><code>function detectDataBlocks() {
  const sheet = SpreadsheetApp.getActiveSheet();
  let currentCell = sheet.getRange('A2');
  
  while (true) {
    const blockStart = currentCell;
    const blockEnd = blockStart.getNextDataCell(SpreadsheetApp.Direction.DOWN);
    
    if (blockEnd.getValue() === "") break;
    
    console.log(`データブロック: ${blockStart.getA1Notation()} 〜 ${blockEnd.getA1Notation()}`);
    currentCell = blockEnd.offset(1, 0);
  }
}
</code></pre>

→ 複数のデータブロックを順番に探し出すのに使えるけん、実務でも役立つばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 3. 応用テクニック

### 🔹 上下左右にデータの境界を探す

<pre class="wp-block-code"><code>function searchAllDirections() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const startCell = sheet.getRange('B2');
  
  const top = startCell.getNextDataCell(SpreadsheetApp.Direction.UP);
  const bottom = startCell.getNextDataCell(SpreadsheetApp.Direction.DOWN);
  const left = startCell.getNextDataCell(SpreadsheetApp.Direction.PREVIOUS);
  const right = startCell.getNextDataCell(SpreadsheetApp.Direction.NEXT);
  
  console.log(`データ範囲: 上${top.getA1Notation()} 〜 下${bottom.getA1Notation()} 左${left.getA1Notation()} 〜 右${right.getA1Notation()}`);
}
</code></pre>

→ これを使えば、スプレッドシートのデータの「枠」を一発で取得できるばい！

### 🔹 大規模データの処理最適化

データ行数が多い場合、`getNextDataCell(direction)` で最終行を探すのと `getLastRow()` を比較すると、前者のほうが軽量な場合もあるとよ！

<pre class="wp-block-code"><code>function optimizedLastRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const startCell = sheet.getRange('A1');
  const lastCell = startCell.getNextDataCell(SpreadsheetApp.Direction.DOWN);
  
  console.log(`最終行: ${lastCell.getRow()}`);
}
</code></pre>

→ `getLastRow()` はシート全体をスキャンするけん、無駄な計算を減らしたいときに `getNextDataCell()` を試してみるとよかばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 4. 使うときの注意点

✅ **フィルタが適用されたシートでは要注意**

フィルタで非表示になっているデータは `getNextDataCell()` では検出できんとよ。こういうときは `getLastRow()` と併用するのがオススメばい。

✅ **空のシートではエラーになる場合がある**

空のセルに `getNextDataCell()` を適用すると `No matching cell found` というエラーが出ることがあるけん、try-catch で対策しとくと安心じゃね。

<pre class="wp-block-code"><code>try {
  const edgeCell = startCell.getNextDataCell(SpreadsheetApp.Direction.DOWN);
  console.log(`データの終端: ${edgeCell.getA1Notation()}`);
} catch (e) {
  console.warn('データが空っぽじゃ！');
}
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 5. まとめ

`getNextDataCell(direction)` は、スプレッドシートのデータをスマートに扱うのに超便利なメソッドばい！

<ul class="wp-block-list">
  <li>
    データ範囲の特定が簡単
  </li>
  <li>
    大規模データの処理を軽量化
  </li>
  <li>
    応用次第でデータ解析や管理に活用可能
  </li>
</ul>

ただし、フィルタや空白データの扱いにはちょっと工夫が必要じゃね。今回紹介した方法を試して、効率的なスプレッドシート運用をしてみてくれんね！


<hr class="wp-block-separator has-alpha-channel-opacity" />

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
  
  <br /> <a rel="noopener" href="https://sskshogo.com/2023/03/14/4682/" title="【GAS】データのある最終行、最終列を取得する方法（スプレッドシート）" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://sskshogo.com/wp-content/uploads/2023/03/image-20.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://sskshogo.com/wp-content/uploads/2023/03/image-20.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】データのある最終行、最終列を取得する方法（スプレッドシート）
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        今日はスプレッドシートに紐付いているGoogle Apps Script（GAS）でデータのある最終行と最終列を取得する方法とその注意点の説明です。急ぎの人は解説すっ飛ばしてコピペください。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://sskshogo.com/2023/03/14/4682/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://sskshogo.com/2023/03/14/4682/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          sskshogo.com
        </div>
      </div>
    </div>
  </div></a>
</div>
