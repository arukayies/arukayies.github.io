---
title: "【GAS】getColumn()で範囲の開始列番号を取得する方法｜列単位のループ処理に応用"
description: "GASの`getColumn()`メソッドの基本を初心者向けに解説。指定した範囲の「開始列」の番号（A列=1）を返すこのメソッドの挙動と、`getWidth()`や`getLastColumn()`と組み合わせた列単位のループ処理など、実践的なスクリプトを紹介します。スプレッドシートの列操作を自動化する第一歩です。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getColumn", "forループ", "列操作", "初心者"]
date: "2020-06-07T04:45:44.000Z"
url: "/gas/getcolumn"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-25T13:53:00+09:00"
---

Google Apps Script (GAS)でスプレッドシートの特定の**列**に対して処理を行いたい時、`getColumn()`は欠かせない基本メソッドです。このメソッドを使えば、指定した範囲がどの列から始まっているかを数値で簡単に取得できます。

この記事では、`getColumn()`の基本的な使い方から、列単位で処理を繰り返す実践的なループ処理まで、分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getColumn()の基本的な使い方

`getColumn()`は`Range`オブジェクトに適用するメソッドで、その範囲の**一番左の列番号**を返します。
スプレッドシートの列はA列を`1`、B列を`2`、C列を`3`...という数値で管理されており、`getColumn()`はこの数値を返します。

### 単一セルの場合

```javascript
function getSingleColumnNumber() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // C5セルを取得
  const range = sheet.getRange("C5");
  
  // C列は3番目なので「3」が返る
  const columnNumber = range.getColumn();
  console.log(columnNumber); // 3
}
```

### 複数セルの範囲の場合

複数セルの範囲を指定した場合でも、返すのは**範囲の開始列（一番左の列）**の番号だけです。

```javascript
function getRangeColumnNumber() {
  const sheet = SpreadsheetApp.getActiveSheet();

  // 範囲 B2:D5 を取得
  const range = sheet.getRange("B2:D5");
  
  // 範囲の開始はB列（2番目）なので「2」が返る
  const startColumn = range.getColumn();
  console.log(startColumn); // 2
}
```
`D`列の番号である`4`は取得できない点に注意してください。範囲の列数を取得したい場合は、`getWidth()`メソッドを使います。

## 実践例：範囲内のすべての列をループ処理する

`getColumn()`は、範囲の開始列を特定し、そこから`getWidth()`（範囲の列数）分だけループ処理を行う際によく使われます。

以下の例では、選択した範囲（例: `B2:D5`）の各列のヘッダー（1行目）に背景色を設定します。

```javascript
function formatHeadersOfSelectedRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = SpreadsheetApp.getActiveRange(); // 現在選択している範囲

  if (!range) {
    console.log("範囲が選択されていません。");
    return;
  }

  const startCol = range.getColumn();    // 範囲の開始列
  const numCols = range.getWidth();      // 範囲の列数

  // 開始列から終了列までループ
  for (let i = 0; i < numCols; i++) {
    const currentCol = startCol + i;
    // 各列の1行目のセルに背景色を設定
    sheet.getRange(1, currentCol).setBackground("#d9ead3"); // 薄い緑色
  }
}
```
このスクリプトを実行すると、選択範囲のヘッダー部分だけを動的にフォーマットできます。

## 実践例2：シート全体の列を操作する

`getLastColumn()`と組み合わせることで、シート全体の列を対象とした処理も簡単に書けます。

```javascript
function setColumnWidthsForAll() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastColumn = sheet.getLastColumn(); // シートでデータが存在する最終列

  // 1列目 (A列) から最終列までループ
  for (let i = 1; i <= lastColumn; i++) {
    // i番目の列幅を100ピクセルに設定
    sheet.setColumnWidth(i, 100);
  }
}
```

## まとめ

`getColumn()`は、GASで列単位の操作を行う際の起点となる重要なメソッドです。

-   指定した`Range`の**開始列番号**（A=1）を返す。
-   複数セルの範囲の場合も、**一番左の列**の番号のみを返す。
-   `getWidth()`や`getLastColumn()`と組み合わせた`for`ループで、列単位の反復処理を簡単に実装できる。

このメソッドをマスターし、スプレッドシートの列操作を自由に自動化しましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://rinyan-7.com/gas/range_getcolumn/" >}} 
  
{{< blog-card "https://mebee.info/2023/07/24/post-65507/" >}} 
  
{{< blog-card "https://coporilife.com/460/" >}} 
  
{{< blog-card "https://www.tanukiblog.jp/gas-activecell/" >}} 
  
{{< blog-card "https://auto-worker.com/blog/?p=1344" >}} 
  
{{< blog-card "https://gsuiteguide.jp/sheets/getnumcolumns/" >}}
