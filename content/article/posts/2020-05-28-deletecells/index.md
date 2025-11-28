---
title: "GASのdeleteCellsメソッドでセルを削除し、行や列をシフトする方法"
description: "Google Apps Script（GAS）のdeleteCells(shiftDimension)メソッドを使い、スプレッドシートの指定したセル範囲を削除し、後続のセルを上または左にシフトする方法を解説。具体的な使い方からエラー対策、他の削除メソッドとの違いまで紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "スプレッドシート", "deleteCells", "Range"]
date: "2020-05-28T14:23:24.000Z"
url: "/gas/deletecells"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年5月"]
lastmod: "2025-11-25T14:55:00+09:00"
---

Google Apps Script (GAS) を使ってスプレッドシートのデータを整理する際、単にセルの内容をクリアするだけでなく、セル自体を削除して後続のデータを詰めたい場面がよくあります。`deleteCells(shiftDimension)` メソッドは、まさにそのための機能を提供し、データ整理を柔軟かつ効率的に自動化します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## deleteCells(shiftDimension)メソッドとは？

`deleteCells()` は `Range` オブジェクトに属するメソッドで、指定したセル範囲を削除します。最大の特徴は、引数 `shiftDimension` を指定することで、削除後に後続のセルを**上方向**または**左方向**にシフト（詰める）できる点です。

### 基本的な構文

```javascript
range.deleteCells(shiftDimension);
```

*   `range`: 削除したいセル範囲を指定する `Range` オブジェクト。
*   `shiftDimension`: 以下のいずれかの `Dimension` Enumを指定します。
    *   `SpreadsheetApp.Dimension.ROWS`: 下の行のセルが上にシフトされます。
    *   `SpreadsheetApp.Dimension.COLUMNS`: 右の列のセルが左にシフトされます。

例えば、`B2:C3` の範囲を削除する場合、`ROWS` を指定すれば4行目以降が上に詰められ、`COLUMNS` を指定すればD列以降が左に詰められます。

## シフト方向の選び方

どちらの方向にシフトするかは、シートのデータ構造によって決まります。

### `SpreadsheetApp.Dimension.ROWS` （上へシフト）が適しているケース
*   **行単位のレコード**: 顧客リストやアンケート結果など、1行で1つのデータが完結している場合。不要な行を削除し、リストを詰めるのに適しています。

### `SpreadsheetApp.Dimension.COLUMNS` （左へシフト）が適しているケース
*   **列単位のデータ**: 時系列データやプロジェクトのタスクリストなど、列ごとに意味があるデータ構造の場合。不要な期間や項目を削除するのに適しています。

## deleteCellsの実践的な活用例

### 1. 特定の範囲を削除して上へシフトする

最も基本的な使い方です。`B2:D4` の範囲を削除し、5行目以降のデータを上に詰めます。

```javascript
function deleteAndShiftUp() {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange("B2:D4").deleteCells(SpreadsheetApp.Dimension.ROWS);
}
```

### 2. 複数の離れた範囲を一度に削除する

`getRangeList()` を使うと、複数の離れた範囲を対象に一括で処理できます。

```javascript
function deleteMultipleRanges() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const rangesToDelete = ["A1:B2", "D5:E6", "G8:H9"];
  
  sheet.getRangeList(rangesToDelete).getRanges().forEach(range => {
    // この例では、各範囲を削除して左にシフト
    range.deleteCells(SpreadsheetApp.Dimension.COLUMNS);
  });
}
```

### 3. シートの端のセルを削除する際のエラーを防ぐ

シートの最終列を削除して左にシフトしようとするなど、シフト先にセルが存在しない操作はエラーになります。`try...catch` を使ってエラーをハンドリングするのが安全です。

```javascript
function safelyDeleteEdgeCell() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastColRange = sheet.getRange(1, sheet.getLastColumn());
  
  try {
    // 最終列を削除して左にシフトしようとするとエラーが発生する可能性がある
    lastColRange.deleteCells(SpreadsheetApp.Dimension.COLUMNS);
  } catch (e) {
    console.error(`最終列の削除中にエラーが発生しました: ${e.message}`);
    // エラーが発生した場合、セルの内容だけをクリアするなどの代替処理
    lastColRange.clearContent();
  }
}
```

## 他の削除メソッドとの違い

GASには他にも行や列を削除するメソッドがありますが、それぞれに特徴があります。

| メソッド | 対象 | シフト制御 | パフォーマンス |
| :--- | :--- | :--- | :--- |
| `deleteCells()` | 指定したセル範囲 | **可能** (上下/左右) | 中 |
| `deleteRow()` / `deleteRows()` | 行全体 | **不可** (常に上にシフト) | 高速 |
| `deleteColumn()` / `deleteColumns()` | 列全体 | **不可** (常に左にシフト) | 高速 |

**結論**: 行全体や列全体を削除する場合は `deleteRow(s)` や `deleteColumn(s)` の方がシンプルで高速です。一方、**範囲内の一部のセルのみを削除し、シフト方向を制御したい場合**は `deleteCells()` が最適な選択肢となります。

## まとめ

`deleteCells(shiftDimension)` メソッドは、スプレッドシートのデータをプログラムで柔軟に整形・削除するための強力なツールです。

*   `Dimension.ROWS` と `Dimension.COLUMNS` を使い分けることで、シフト方向を自由に制御できます。
*   大量のデータを削除する場合は、ループの順番（逆順ループなど）やエラーハンドリングを考慮することが重要です。
*   行・列全体を削除する他のメソッドと適切に使い分けることで、より効率的なスクリプトを作成できます。

このメソッドをマスターして、GASによるデータ整理・自動化のレベルを一段階アップさせましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range#deletecellsdimension" >}} 

{{< blog-card "https://techuplife.tech/gas-ss-rinsertdelete/" >}}
