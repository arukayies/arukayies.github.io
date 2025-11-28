---
title: "【GAS】スプレッドシートの行数を効率的に取得！getHeight()メソッド徹底解説"
description: "Google Apps Script (GAS) でスプレッドシートの指定範囲の行数を取得する`getHeight()`メソッドを徹底解説。`getLastRow()`と連携した動的なデータ範囲の把握から、条件付き書式やデータ分析への応用まで、効率的なスプレッドシート自動化を実現する実践的なコード例を紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getHeight", "行数取得", "データ範囲", "自動化"]
date: "2020-07-17T12:11:38.000Z"
lastmod: "2025-11-20T00:00:00.000Z"
url: "/gas/getheight"
share: true
toc: true
categories: "gas"
archives: ["2020年7月"]
---

Google Apps Script (GAS) を用いたスプレッドシートの自動化において、データの「行数」を正確に把握することは極めて重要です。特に、データ量に応じて動的に処理範囲を変えたい場合に役立つのが `getHeight()` メソッドです。

本記事では、`getHeight()` の基本的な使い方から、`getLastRow()` と組み合わせた実践的な応用例、さらに条件付き書式やデータ分析への活用方法までを、具体的なコードを交えて徹底解説します。`getHeight()` をマスターし、GASによるスプレッドシート作業の効率化を加速させましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getHeight()メソッドとは？

`getHeight()` メソッドは、GASで指定したセル範囲の「高さ」、つまり**行数がいくつあるか**を取得するための機能です。

例えば、`B2:D4` という範囲に対してこのメソッドを使用した場合、この範囲には2行目、3行目、4行目の**3行**が含まれるため、戻り値は `3` となります。

```javascript
function sampleGetHeight() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("B2:D4");
  
  // コンソールに "3" を出力
  Logger.log(range.getHeight());
}
```

## getHeight()と類似メソッドとの違い

GASには行数や列数を取得するためのメソッドがいくつか存在します。それぞれの違いを理解しておくと、目的に応じて最適なものを選択できます。

| メソッド名 | 取得できる情報 | 主な用途 |
| --- | --- | --- |
| `getHeight()` | 指定範囲の **行数** | 範囲の縦の長さを確認したい場合 |
| `getWidth()` | 指定範囲の **列数** | 範囲の横の長さを確認したい場合 |
| `getLastRow()` | データが含まれる **最終行の番号** | シート全体のデータ量を把握したい場合 |
| `getNumRows()` | シート全体の **物理的な総行数** | シート自体のサイズを知りたい場合 |

`getHeight()` はあくまで**指定した範囲内**の行数を返す点がポイントです。

## getHeight() の基本的な使い方

スプレッドシートの行数を取得する基本的な使い方を2つのパターンで紹介します。

### 1. 静的な範囲の行数を取得する

あらかじめ決められた範囲の行数を取得する最もシンプルな例です。

```javascript
function getStaticRangeHeight() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const dataRange = sheet.getRange("A2:C10");
  
  // "選択範囲の行数: 9" と出力
  Logger.log(`選択範囲の行数: ${dataRange.getHeight()}`);
}
```
このスクリプトは、`A2:C10` の範囲に含まれる行数（10 - 2 + 1 = 9行）を取得します。

### 2. データ量に応じた動的な範囲の行数を取得する

`getLastRow()` と組み合わせることで、データの増減に柔軟に対応できるスクリプトを作成できます。

```javascript
function getDynamicRangeHeight() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow(); // データのある最終行を取得
  
  // ヘッダー行を除いたデータ範囲を動的に指定
  if (lastRow > 1) {
    const dataRange = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
    Logger.log(`データ範囲の行数: ${dataRange.getHeight()}`);
  } else {
    Logger.log("データがありません。");
  }
}
```

この方法なら、データの量が変わってもスクリプトを修正する必要がありません。

## getHeight() の実践的な応用例

`getHeight()` を活用することで、より高度な自動化が可能になります。

### 1. データの行数に応じてセルの背景色を変更する

取得した行数を条件分岐に利用し、特定の行数を超えた場合に警告として背景色を設定する例です。

```javascript
function applyConditionalFormattingByHeight() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const rowCount = dataRange.getHeight();
  
  // データ行数が100行を超えたら背景を薄い赤色に設定
  if (rowCount > 100) {
    dataRange.setBackground("#FFEBEE");
  } else {
    dataRange.setBackground("#E8F5E9");
  }
}
```
これにより、データ量を視覚的に把握しやすくなります。

### 2. 複数のデータセットの行数を比較分析する

異なる範囲の行数をそれぞれ取得し、比較することで簡単なデータ分析ができます。

```javascript
function compareDatasetHeights() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range2023 = sheet.getRange("A2:A100"); // 仮の範囲
  const range2024 = sheet.getRange("B2:B150"); // 仮の範囲

  const height2023 = range2023.getHeight();
  const height2024 = range2024.getHeight();

  Logger.log(`2023年のデータ行数: ${height2023}`);
  Logger.log(`2024年のデータ行数: ${height2024}`);
  Logger.log(`増減: ${height2024 - height2023}行`);
}
```

## 注意点とベストプラクティス

### 1. 結合されたセルの扱い

範囲内に結合されたセルがある場合、`getHeight()` は**結合範囲全体の行数**を返します。例えば、`A2:A4` が一つのセルに結合されている範囲に対して `getHeight()` を実行すると、結果は `3` となります。意図しない結果を招く可能性があるため、結合セルの扱いには注意が必要です。

### 2. 空白範囲の挙動

データが存在しない空白の範囲（例: `A1000:B1000`）を指定した場合でも、その範囲は**1行**としてカウントされ、`getHeight()` は `1` を返します。

## まとめ

`getHeight()` は、スプレッドシートの指定範囲内の行数を取得するためのシンプルかつ強力なメソッドです。

-   **基本**: `range.getHeight()` で簡単に範囲の行数を取得できます。
-   **応用**: `getLastRow()` と組み合わせることで、動的なデータ量に対応できます。
-   **活用**: 取得した行数を使って、条件付き書式やデータ分析など、さまざまな処理に応用可能です。

GASでスプレッドシートの操作を自動化する上で欠かせないメソッドの一つなので、ぜひマスターして効率的なスクリプト開発に役立ててください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getheight" >}}
