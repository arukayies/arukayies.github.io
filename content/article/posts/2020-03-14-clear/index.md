---
title: "【GAS】Spreadsheetの指定範囲を完全にクリアするclear()メソッドの使い方"
description: "Google Apps Script（GAS）でスプレッドシートの指定範囲のデータと書式を完全に削除するclear()メソッドの基本的な使い方から、clearContent()やclearFormat()との違い、実用的な応用例までを初心者向けに分かりやすく解説します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "clear", "clearContent", "clearFormat"]
date: "2020-03-14T01:49:01.000Z"
url: "/gas/clear"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年3月"]
lastmod: "2025-11-27T09:18:32+09:00"
---

Google Apps Script (GAS) を用いてスプレッドシートを操作する際、`clear()`メソッドは非常に強力な機能です。このメソッドを使いこなすことで、データの初期化や書式設定の管理が劇的に効率化されます。本記事では、`clear()`メソッドの基本的な使い方から、実務で役立つ応用例までを初心者にも分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## clear()メソッドの基本

### clear()とは？

`clear()`メソッドは、スプレッドシートの指定した範囲に含まれる**値と書式の両方**を完全に削除する機能を提供します。これにより、セル範囲を初期状態に戻すことができます。

```js
function clearRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // A1:B2の範囲の値と書式をすべてクリア
  sheet.getRange("A1:B2").clear();
}
```

このコードを実行すると、`A1:B2`の範囲がクリアされます。`clear()`メソッドは、クリアした範囲の`Range`オブジェクトを返すため、メソッドチェーンを利用した連続操作も可能です。

### clearContent(), clearFormat()との違い

`clear()`と似たメソッドに`clearContent()`と`clearFormat()`があります。これらは削除対象が異なるため、用途に応じて使い分けることが重要です。

-   **`clearContent()`**: セルの**値のみ**を削除します。書式（背景色やフォントスタイルなど）は保持されます。
-   **`clearFormat()`**: セルの**書式のみ**を削除します。値はそのまま残ります。

| メソッド | 削除対象 | 使用例 |
| :--- | :--- | :--- |
| `clear()` | 値と書式 | 範囲を完全に初期化したい場合 |
| `clearContent()` | 値のみ | データを消去し、書式テンプレートは残したい場合 |
| `clearFormat()` | 書式のみ | 入力されたデータはそのままに、スタイルをリセットしたい場合 |

### 実用的なコード例

実際に`clear()`メソッドを使用して、さまざまな範囲をクリアするサンプルコードを見ていきましょう。

```js
function clearExamples() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // 1. 単一セル（A1）をクリア
  sheet.getRange("A1").clear();
  
  // 2. 連続した範囲（B2:D5）をクリア
  sheet.getRange("B2:D5").clear();
  
  // 3. 複数の非連続範囲（F列, H列, J列）をクリア
  const rangesToClear = ["F1:F10", "H1:H10", "J1:J10"];
  rangesToClear.forEach(rangeString => {
    sheet.getRange(rangeString).clear();
  });
}
```

### 条件に基づいてセルをクリアする方法

特定の条件に一致するセルだけをクリアすることも可能です。例えば、シート内で数値が50以上のセルのみをクリアする場合は、以下のように記述します。

```js
function clearCellsBasedOnCondition() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      // セルの値が数値型かつ50以上の場合
      if (typeof values[i][j] === 'number' && values[i][j] >= 50) {
        // getRangeの行・列は1から始まるため+1する
        sheet.getRange(i + 1, j + 1).clear();
      }
    }
  }
}
```
このスクリプトは、シート全体のデータをループ処理し、条件に合致するセルを個別にクリアします。

## 実務での応用例

### テンプレートの書式をリセット

月次報告書など、定期的に更新するテンプレートで`clearFormat()`は特に役立ちます。データを保持したまま、書式だけをリセットできます。

```js
function resetTemplateFormat() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  
  // 1. 既存の書式をすべてクリア
  range.clearFormat();
  
  // 2. 新しい書式を統一して設定
  range.setBackground("#f0f0f0")
       .setFontFamily("Arial")
       .setFontSize(10);
}
```

### パフォーマンスの最適化

大量のセルを操作する場合、`clear()`の実行時間に配慮が必要です。一度に広範囲をクリアする方が、個別に何度も`clear()`を呼び出すよりも効率的です。

例えば、複数の範囲をクリアする場合、`getRangeList()`を使用してまとめて処理することで、API呼び出し回数を減らし、パフォーマンスを向上させることができます。

```js
function efficientClear() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const rangeList = ["A1:B10", "D1:E10"];
  
  // 複数の範囲をまとめてクリア
  sheet.getRangeList(rangeList).clear();
}
```

## まとめ

`clear()`メソッドは、スプレッドシートのデータと書式を効率的に管理するための基本かつ重要な機能です。`clearContent()`や`clearFormat()`との違いを正しく理解し、状況に応じて使い分けることで、GASによる自動化処理の幅が大きく広がります。本記事で紹介したテクニックを活用し、日々の業務を効率化させましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://note.com/kujiride0621/n/n393944b97fb1" >}} 
  
{{< blog-card "https://rinyan-7.com/gas/range_clear/" >}} 
  
{{< blog-card "https://technical.verybestcbp.com/gas4/" >}} 
  
{{< blog-card "https://kujiride.com/2024/04/11/google-apps-script-gas-how-to-delete-values-in-a-sheet/" >}}
