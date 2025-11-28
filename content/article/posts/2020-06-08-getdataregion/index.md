---
title: "【GAS】getDataRegion()で連続したデータ範囲を自動取得する方法"
description: "GASの`getDataRegion()`を使い、指定したセルを基点に上下左右の連続したデータ範囲（データブロック）を自動で取得する方法を解説。`getDataRange()`との違いや、動的にサイズが変わる表を正確に扱う実践的なコードを紹介します。データ量の変動に強いスクリプト作成の必須スキルです。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getDataRegion", "データ範囲", "自動化", "動的"]
date: "2020-06-08T13:14:09.000Z"
url: "/gas/getdataregion"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-25T13:50:00+09:00"
---

Google Apps Script (GAS)で、データ量が日々変わるスプレッドシートを扱う際、「どうやって正確なデータ範囲を取得するか」は常に課題となります。`getDataRegion()`は、この課題を解決する非常にスマートなメソッドです。

この記事では、`getDataRegion()`の基本的な使い方から、`getDataRange()`との違い、そして動的なデータ処理への応用まで、分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getDataRegion()とは？

`getDataRegion()`は、指定した`Range`オブジェクト（単一セル）を基点として、**空白セルで区切られた連続したデータ範囲**を自動で検出して取得するメソッドです。

手動操作でいうところの `Ctrl + A` (Macなら `⌘ + A`) に似た挙動で、データのかたまりを一つの範囲として認識します。

```javascript
function basicUsage() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // 表の中のどこか一つのセルを指定
  const startingCell = sheet.getRange('B2');
  
  // B2セルを含むデータ範囲（データブロック）を取得
  const dataRange = startingCell.getDataRegion();
  
  // 取得した範囲のA1表記をログに出力
  console.log(dataRange.getA1Notation()); // 例: "A1:D50"
}
```
このメソッドを使えば、表の行数や列数が変わっても、スクリプトを修正することなく常に正しい範囲を取得できます。

### `getDataRange()`との違い

`getDataRange()`はシート全体のデータ範囲（A1セルから始まる、値を持つ最も右下のセルまでの範囲）を取得するのに対し、`getDataRegion()`は**指定したセルを起点**とする点が大きな違いです。

| メソッド | 基準 | 用途 |
|:---|:---|:---|
| `sheet.getDataRange()` | シート全体 | シートに表が一つしかない場合に便利。 |
| `range.getDataRegion()`| 指定したセル | シートに複数の表が点在する場合や、特定の表だけを対象にしたい場合に強力。 |

## 実践例：動的に増減する表のデータを処理する

日々の売上データなど、行が追加されていく表を扱う際に`getDataRegion()`は真価を発揮します。

以下の例では、表のヘッダー（A1セル）を基点にデータ範囲全体を取得し、`offset()`を使ってヘッダー行を除いたデータ部分だけを処理対象としています。

```javascript
function processDynamicTable() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const headerCell = sheet.getRange('A1');
  
  // A1セルを基点にデータ範囲全体を取得
  const wholeTable = headerCell.getDataRegion();
  
  // offset(1, 0) で1行下にずらし、ヘッダーを除外
  // getNumRows() - 1 でヘッダー分の1行を引く
  const dataBodyRange = wholeTable.offset(1, 0, wholeTable.getNumRows() - 1);

  console.log(`処理対象のデータ本体: ${dataBodyRange.getA1Notation()}`);
  
  const salesData = dataBodyRange.getValues();
  // これ以降で salesData に対する処理を行う
}
```

## 応用：行・列単位での範囲取得

`getDataRegion()`の引数に`SpreadsheetApp.Dimension`を指定することで、取得する範囲を**列方向**または**行方向**に限定できます。

```javascript
function getDimensionSpecificRegion() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const baseCell = sheet.getRange('C5');
  
  // C5セルを基点に、上下に連続するデータ範囲（C列の部分のみ）を取得
  const columnRegion = baseCell.getDataRegion(SpreadsheetApp.Dimension.COLUMNS);
  console.log(`列方向の範囲: ${columnRegion.getA1Notation()}`);
  
  // C5セルを基点に、左右に連続するデータ範囲（5行目の部分のみ）を取得
  const rowRegion = baseCell.getDataRegion(SpreadsheetApp.Dimension.ROWS);
  console.log(`行方向の範囲: ${rowRegion.getA1Notation()}`);
}
```
これにより、複雑なレイアウトのシートから特定のデータだけを正確に抜き出すことが可能です。

## 注意点：基点となるセルが空白の場合

`getDataRegion()`の基点となるセルが**空白**だった場合、そのセル自身（1x1の範囲）しか返しません。意図しない結果を避けるため、基点セルが空白でないことを確認する処理を入れると、より安定したスクリプトになります。

```javascript
const cell = sheet.getRange("A1");
if (cell.isBlank()) {
  console.log("基点セルが空です。処理を中断します。");
  return;
}
const dataRegion = cell.getDataRegion();
// ...
```

## まとめ

`getDataRegion()`は、GASで動的なデータを扱う上で非常に強力な武器となります。

-   指定したセルを含む**連続したデータのかたまり**を自動で検出。
-   `getDataRange()`と違い、シート内に**複数の表がある場合**でも正確に範囲を取得できる。
-   データの増減に強い、**メンテナンス性の高い**スクリプトを作成できる。

このメソッドを使いこなし、日々のスプレッドシート業務の自動化をさらに一歩進めましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://techuplife.tech/gas-ss-rcellrange/" >}} 
  
{{< blog-card "https://hajiritsu.com/gas-spreadsheet-getdatarange/" >}} 
  
{{< blog-card "https://technical.verybestcbp.com/gascheckcheck/" >}} 
  
{{< blog-card "https://jp.tdsynnex.com/blog/google/gas-select-range-of-spreadsheet/" >}}
