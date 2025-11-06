---
title: GASでスプレッドシートの指定セルから数式をR1C1形式で取得する方法
author: arukayies
date: 2020-07-07T16:19:33+00:00
excerpt: GASでスプレッドシートの指定セルの数式(R1C1表記)を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1594138775
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
  - getFormulaR1C1()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Googleスプレッドシートを自動化するとき、「セルの数式を取得して処理したい！」ってことあるよね？ そんなときに役立つのが `getFormulaR1C1()` ばい！ 今回は、これをどう活用するか、わかりやすく解説するさ。


## getFormulaR1C1()って何？

スプレッドシートのセルには、計算式が設定できるけど、それをスクリプトから取得したいときに使うメソッドが `getFormulaR1C1()` じゃ。普通の `getFormula()` との違いは、数式を **R1C1表記** で取得できること。

### A1表記とR1C1表記の違い

<table class="has-fixed-layout">
  <tr>
    <th>
      表記方法
    </th>
    
    <th>
      A1表記
    </th>
    
    <th>
      R1C1表記
    </th>
  </tr>
  
  <tr>
    <td>
      例
    </td>
    
    <td>
      <code>B5</code>
    </td>
    
    <td>
      <code>R5C2</code>
    </td>
  </tr>
  
  <tr>
    <td>
      相対参照
    </td>
    
    <td>
      <code>B2</code>
    </td>
    
    <td>
      <code>R[-3]C</code>
    </td>
  </tr>
</table></figure> 

`R1C1` は **行（Row）と列（Column）を数値で指定する方法** で、相対参照を使うと動的な範囲指定ができるさ。

## getFormulaR1C1()の基本的な使い方

<pre class="wp-block-code"><code>function getFormulaExample() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const cell = sheet.getRange("B5");
  const formula = cell.getFormulaR1C1();
  Logger.log(formula);
}
</code></pre>

例えば、B5セルに `=SUM(A2:A4)` が入ってる場合、`getFormulaR1C1()` で取得すると `=SUM(R[-3]C[-1]:R[-1]C[-1])` って返ってくるばい。

## 範囲の数式を一括取得する方法

セルが1つだけじゃなくて、複数のセル範囲の数式を一気に取得するには、 `getFormulasR1C1()` を使うといいち。

<pre class="wp-block-code"><code>function getMultipleFormulas() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("B5:C6");
  const formulas = range.getFormulasR1C1();
  Logger.log(formulas);
}
</code></pre>

この方法を使うと、2次元配列で数式が返ってくるから、効率的に処理できるばい。

## getFormulaR1C1()の応用

### 1. 数式を監視して変更をログに記録

<pre class="wp-block-code"><code>function trackFormulaChanges() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:Z100");
  const formulas = range.getFormulasR1C1();
  
  formulas.forEach((row, rowIndex) =&gt; {
    row.forEach((formula, colIndex) =&gt; {
      if (formula.includes("IMPORTRANGE")) {
        Logger.log(`外部参照が R${rowIndex+1}C${colIndex+1} にあるばい: ${formula}`);
      }
    });
  });
}
</code></pre>

### 2. 動的な数式を挿入

<pre class="wp-block-code"><code>function insertDynamicFormulas() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const startRow = 5;
  const numRows = 30;
  
  const baseFormula = "=SUM(R&#91;0]C&#91;-3]:R&#91;0]C&#91;-1])";
  const formulas = Array(numRows).fill(&#91;baseFormula]);
  
  sheet.getRange(startRow, 4, numRows, 1)
       .setFormulasR1C1(formulas);
}
</code></pre>

このスクリプトを実行すると、指定範囲のセルに動的な数式を一括設定できるっちゃ。

## getFormulaR1C1()を活用するとできること

✅ 相対参照を活用したダイナミックな数式処理  
✅ 範囲の数式を一括取得・設定して処理を効率化  
✅ 変更監視システムを作って数式の異常をチェック

GASでスプレッドシートをもっと便利に使いたいなら、`getFormulaR1C1()` は覚えておくべき機能ばい！


{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}
{{< blog-card "https://caymezon.com/gas-formula/" >}}
