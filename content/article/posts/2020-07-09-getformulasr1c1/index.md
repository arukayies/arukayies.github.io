---
title: GASでスプレッドシートの指定範囲から数式をR1C1形式で取得する方法
author: arukayies
date: 2020-07-08T17:12:12+00:00
excerpt: GASでスプレッドシートの指定範囲すべての数式(R1C1表記)を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1594228332
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
  - getFormulasR1C1()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）でスプレッドシートの数式を扱うときに役立つのが `getFormulasR1C1()` メソッドばい。このメソッドを使うと、セル範囲内の数式を **R1C1表記** で取得できるっちゃね。今回は、その基礎から応用までをわかりやすく解説するばい。


## R1C1表記とは？

R1C1表記は、行（Row）と列（Column）の位置を基準にして、相対的にセルを参照する書き方ばい。たとえば、

<ul class="wp-block-list">
  <li>
    <code>R[3]C[-1]</code> → <strong>現在のセルから3行下、1列左</strong>
  </li>
  <li>
    <code>R1C1</code> → <strong>絶対参照（A1セル）</strong>
  </li>
</ul>

この方式の最大のメリットは、数式をコピーしても参照がズレにくいことさ。

A1表記（`A1` みたいな書き方）と違って、数式をコードで扱うときに便利ばい。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getFormulasR1C1() メソッドの使い方

### 基本構文

<pre class="wp-block-code"><code>Range.getFormulasR1C1()
</code></pre>

### 戻り値

`getFormulasR1C1()` は、**2次元配列（String[][]）** を返すっちゃ。

<ul class="wp-block-list">
  <li>
    数式があるセル → <strong>R1C1表記の数式</strong>
  </li>
  <li>
    数式がないセル → <strong>空文字（&#8221;&#8221;）</strong>
  </li>
</ul>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getFormulasR1C1() を実装してみよう！

### 基本の取得方法

<pre class="wp-block-code"><code>function getFormulasExample() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('データ');
  const range = sheet.getRange('B2:D10');
  const formulas = range.getFormulasR1C1();
  
  formulas.forEach((row, rowIndex) =&gt; {
    row.forEach((formula, colIndex) =&gt; {
      Logger.log(`Cell R${rowIndex+2}C${colIndex+2}: ${formula}`);
    });
  });
}
</code></pre>

### 応用例：数式の監査

財務データの数式をチェックするスクリプトじゃ。

<pre class="wp-block-code"><code>function auditFinancialFormulas() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('月次報告');
  const range = sheet.getRange('C5:F20');
  const formulas = range.getFormulasR1C1();
  
  formulas.forEach((row, r) =&gt; {
    row.forEach((formula, c) =&gt; {
      if (formula) {
        Logger.log(`数式 @ R${r+5}C${c+3}: ${formula}`);
      }
    });
  });
}
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getFormulasR1C1() を活用するテクニック

### ① 大量データの処理を効率化

<pre class="wp-block-code"><code>const range = sheet.getDataRange();
const formulas = range.getFormulasR1C1();
</code></pre>

データ範囲を動的に取得して、一括で処理するばい。

### ② getFormulas() との違い

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド
    </th>
    
    <th>
      表記方式
    </th>
    
    <th>
      戻り値型
    </th>
    
    <th>
      空セル処理
    </th>
    
    <th>
      最適用途
    </th>
  </tr>
  
  <tr>
    <td>
      getFormulas()
    </td>
    
    <td>
      A1
    </td>
    
    <td>
      String[][]
    </td>
    
    <td>
      空文字
    </td>
    
    <td>
      見やすさ重視
    </td>
  </tr>
  
  <tr>
    <td>
      getFormulasR1C1()
    </td>
    
    <td>
      R1C1
    </td>
    
    <td>
      String[][]
    </td>
    
    <td>
      空文字
    </td>
    
    <td>
      プログラム処理
    </td>
  </tr>
</table></figure> 

### ③ 数式バージョン管理

<pre class="wp-block-code"><code>class FormulaVersionControl {
  constructor(sheetName, rangeSpec) {
    this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    this.range = this.sheet.getRange(rangeSpec);
    this.versionHistory = &#91;];
  }
  
  snapshot() {
    this.versionHistory.push({
      timestamp: new Date(),
      formulas: this.range.getFormulasR1C1()
    });
  }
}
</code></pre>

スプレッドシートの数式変更を記録するシステムばい。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## まとめ

`getFormulasR1C1()` は、スプレッドシートの数式をプログラムで扱うときにめちゃくちゃ便利なメソッドばい。特に、大量データの管理や監査、動的な数式処理をするなら、絶対に覚えておくべき機能っちゃ！


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
  
  <br /> <a rel="noopener" href="https://hajiritsu.com/spreadsheet-gas-getformula/" title="&#12475;&#12523;&#12398;&#25968;&#24335;&#12434;&#21462;&#24471;&#12377;&#12427; | getFormula()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getformula%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getformula%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12475;&#12523;&#12398;&#25968;&#24335;&#12434;&#21462;&#24471;&#12377;&#12427; | getFormula()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getformula/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getformula/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a>
</div>
