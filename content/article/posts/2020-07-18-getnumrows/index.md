---
title: "【GAS】スプレッドシートの指定範囲の行数を取得！getNumRows()徹底解説"
description: "Google Apps Script (GAS) の`getNumRows()`メソッドで、スプレッドシートの「指定範囲の行数」を効率的に取得する方法を徹底解説。`getLastRow()`との違いから、動的なデータ範囲の把握、二次元配列との連携、パフォーマンス最適化まで、GASによるスプレッドシート操作の柔軟性を高める実践的テクニックを紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getNumRows", "行数取得", "データ範囲", "自動化", "getLastRow", "getNumColumns", "範囲操作"]
date: "2020-07-17T17:03:35.000Z"
lastmod: "2025-11-20T00:00:00.000Z"
url: "/gas/getnumrows"
share: true
toc: true
categories: "gas"
archives: ["2020年7月"]
---

Google Apps Script (GAS) を使ってスプレッドシートの自動化を行う際、指定した「範囲にいくつの行が含まれているか」を正確に把握することは、スクリプトの柔軟性と汎用性を高める上で不可欠です。`getNumRows()` メソッドは、この範囲の行数を簡単に取得し、動的なデータ処理やデータ検証を可能にする強力なツールです。

本記事では、GASの`getNumRows()`の基本的な使い方から、データ範囲の動的取得、`getLastRow()`との違い、二次元配列との連携、データフォーマットの検証と自動修正、さらにはパフォーマンス最適化まで、具体的なコードを交えて徹底解説します。`getNumRows()`をマスターし、スプレッドシートの自動化スクリプトをより堅牢で効率的なものに変えましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getNumRows() の基本的な使い方

`getNumRows()` は、`Range` オブジェクトに対して使用し、その範囲に含まれる行の総数を整数で返します。引数は必要なく、非常にシンプルに利用できます。

```javascript
function getRowCount() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // "B2:D5" の範囲を指定
  const range = sheet.getRange("B2:D5");
  
  // 範囲内の行数を取得
  const rowCount = range.getNumRows();
  
  console.log(rowCount); // 結果: 4
}
```
この例では、`B2:D5` の範囲（B2, B3, B4, B5）が4行にわたるため、`getNumRows()` は `4` を返します。重要なのは、**データが入力されているかどうかに関わらず、指定された範囲の物理的な行数を返す**という点です。

## getNumRows() と他のメソッドとの比較

`getNumRows()` は他のメソッドと組み合わせて使うことで、より柔軟な処理が可能になります。

### `getHeight()` と `getLastRow()` の違い

GASには、行数に関連する複数のメソッドが存在し、それぞれ異なる目的で使われます。

*   **`getNumRows()`**: **指定したRangeオブジェクトに含まれる物理的な行数**を返します。データが空のセルや結合セルであっても、指定範囲の「高さ」を行数として数えます。
*   **`getHeight()`**: 指定範囲の物理的な高さを**ピクセル単位**で返します。デザイン調整や画像配置などの際に利用されます。
*   **`getLastRow()`**: **シート全体でデータが入力されている最終行の行番号**を返します。データの増減に対応した処理で頻繁に用いられます。

このように、それぞれのメソッドが返す情報の種類と用途を理解し、適切に使い分けることが重要です。

### `getLastRow()` との違い

`getLastRow()` は、シート全体で**データが入力されている最終行の行番号**を返します。一方、`getNumRows()` は**指定した範囲の行数**を返します。

この2つを組み合わせることで、1行目からデータの最終行までの範囲を動的に取得し、その総行数を数えるといった処理が可能です。

```javascript
function processUntilLastRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  // 1行目から最終行までのデータ範囲を取得 (A列からC列まで)
  const dataRange = sheet.getRange(1, 1, lastRow, 3);
  
  // データ範囲全体の行数を取得
  const totalRows = dataRange.getNumRows(); // この場合、lastRowと同じ値になる
  console.log(totalRows);
}
```

## 実用的な活用方法

### 1. 動的なデータ範囲の行数を取得

データが日々増減するシートでは、`getDataRange()` と組み合わせるのが定番です。`getDataRange()` はデータが存在する範囲全体を自動で取得してくれるため、非常に便利です。

```javascript
function getTotalDataRows() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const rowCount = dataRange.getNumRows();
  
  console.log(`このシートのデータは全部で ${rowCount} 行あります。`);
}
```

### 2. 二次元配列と連携したループ処理

`getValues()` で取得した二次元配列の長さ（`array.length`）は、`getNumRows()` の結果と常に一致します。これを利用して、範囲内のデータを効率的にループ処理できます。

```javascript
function loopThroughRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:C10");
  const values = range.getValues();
  const numRows = range.getNumRows(); // values.length と同じ

  for (let i = 0; i < numRows; i++) {
    // values[i] は各行のデータ配列
    console.log(`行 ${i + 1}: ${values[i].join(", ")}`);
  }
}
```

## 注意点とパフォーマンス

-   **範囲指定の誤り**: `sheet.getRange(startRow, startCol, numRows, numCols)` の第3引数は「終了行番号」ではなく「取得する行数」です。間違いやすいため注意しましょう。
-   **パフォーマンス**: ループ処理の中で何度も `getNumRows()` を呼び出すと、不要なAPI呼び出しが増えてパフォーマンスが低下します。ループの前に一度だけ呼び出し、変数に結果を格納しておくのがベストプラクティスです。
-   **結合セルの扱い**: `getNumRows()` はセルが結合されていても、物理的な行数を正確に返します。例えば、A1とA2が結合されていても、A1:A2の範囲に対しては `2` を返します。

## まとめ

`getNumRows()` は、GASでスプレッドシートの指定範囲の行数を効率的に取得し、データ処理を自動化するための重要なメソッドです。

*   **正確な行数取得**: 指定したRangeオブジェクトの物理的な行数を確実に取得。
*   **動的処理の実現**: `getLastRow()`や`getDataRange()`と組み合わせることで、データ範囲が変動する状況にも対応。
*   **効率的なデータ処理**: `getValues()`で取得した二次元配列との連携により、高速なループ処理が可能。
*   **データ検証**: 期待される行数と実際の行数を比較し、シート構造の整合性を検証。

このメソッドを正しく理解し、適切に活用することで、スプレッドシートのデータ管理と自動化をより高度かつ効率的に実現できます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}} 
  
{{< blog-card "https://gsuiteguide.jp/sheets/getnumrows/" >}}
