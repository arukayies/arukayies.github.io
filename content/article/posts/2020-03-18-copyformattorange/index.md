---
title: "GASでスプレッドシートの書式設定を別範囲に効率的にコピーする方法"
description: "GASのcopyFormatToRangeメソッドを使用して、スプレッドシートの書式を効率的にコピーする方法を解説します。基本的な使い方から、動的な範囲指定や条件付き書式のコピーといった実践的なテクニックまで、サンプルコード付きで分かりやすく紹介します。"
tags: ["copyFormatToRange()","GAS","Google Apps Script","スプレッドシート"]
date: "2020-03-18T12:46:37.000Z"
url: "/gas/copyformattorange"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年3月"]
lastmod: "2025-11-25T23:25:00.000Z"
---

Google Apps Script（GAS）を利用すると、スプレッドシートの定型作業を自動化し、業務効率を大幅に向上させることができます。特に、スプレッドシートの書式を別の範囲にコピーする際に役立つのが「`copyFormatToRange`」メソッドです。

この記事では、`copyFormatToRange`メソッドの基本的な使い方から、より実践的なテクニックまでをサンプルコードを交えて分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## copyFormatToRangeメソッドの概要

`copyFormatToRange`は、指定したセルの書式（文字色、背景色、罫線、フォントサイズなど）を、別のシートやセル範囲にコピーするためのメソッドです。これにより、手作業で書式を再設定する手間を省き、一貫性のあるデザインを簡単に適用できます。

### 基本構文

以下が`copyFormatToRange`メソッドの基本構文です。

```js
range.copyFormatToRange(gridId, column, columnEnd, row, rowEnd);
```

### パラメータの詳細

| パラメータ  | 型     | 説明                               |
| :---------- | :----- | :--------------------------------- |
| `gridId`    | Integer| コピー先のシートIDを指定します。   |
| `column`    | Integer| コピー先の開始列番号を1から始まる整数で指定します。 |
| `columnEnd` | Integer| コピー先の終了列番号を指定します。 |
| `row`       | Integer| コピー先の開始行番号を1から始まる整数で指定します。 |
| `rowEnd`    | Integer| コピー先の終了行番号を指定します。 |

## 基本的な使い方

まずは、基本的な使い方を見ていきましょう。ここでは、'テンプレート'シートのA1:F10範囲の書式を、'報告書'シートの同じ範囲にコピーする例を紹介します。

```js
function copyFormatBasic() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName('テンプレート');
  const targetSheet = ss.getSheetByName('報告書');
  
  // コピー元の範囲を取得
  const sourceRange = sourceSheet.getRange('A1:F10');
  // コピー先のシートIDを取得
  const targetGridId = targetSheet.getSheetId();
  
  // 書式をコピー
  sourceRange.copyFormatToRange(
    targetGridId,
    1, // 開始列 (A列)
    6, // 終了列 (F列)
    1, // 開始行
    10 // 終了行
  );
}
```

このスクリプトを実行すると、`sourceRange`で指定した範囲の書式が、指定した`targetGridId`のシートの対応する範囲に適用されます。

## 実践的な使い方：動的範囲指定と条件付き書式

次に、より実用的なテクニックを紹介します。

### データの量に応じて範囲を動的に指定する

レポート作成など、データの量が毎回変動する場合、`getLastRow()`や`getLastColumn()`メソッドを使って範囲を動的に取得すると便利です。

```js
function copyFormatWithDynamicRange() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const templateSheet = ss.getSheetByName('テンプレート');
  const reportSheet = ss.getSheetByName('月次報告');
  
  // テンプレートシートのデータが存在する最終行・最終列を取得
  const lastRow = templateSheet.getLastRow();
  const lastCol = templateSheet.getLastColumn();
  
  // データ範囲全体の書式をコピー
  templateSheet.getRange(1, 1, lastRow, lastCol)
    .copyFormatToRange(
      reportSheet.getSheetId(),
      1,      // 開始列
      lastCol,// 終了列
      1,      // 開始行
      lastRow // 終了行
    );
}
```

これにより、元データのサイズが変わってもスクリプトを修正することなく、常に正しい範囲の書式をコピーできます。

### 条件付き書式もコピーする

`copyFormatToRange`メソッドは、通常の書式だけでなく**条件付き書式**も一緒にコピーできます。

```js
function copyConditionalFormatting() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName('基準データ');
  const targetSheet = ss.getSheetByName('分析結果');
  
  // B2:D10範囲の書式（条件付き書式を含む）をコピー
  sourceSheet.getRange('B2:D10').copyFormatToRange(
    targetSheet.getSheetId(),
    2, // 開始列 (B列)
    4, // 終了列 (D列)
    2, // 開始行
    10 // 終了行
  );
}
```
**注意点:** 条件付き書式のルールがコピー先のデータ範囲と適合しない場合、意図しない表示になることがあります。コピー元とコピー先のデータ構造を揃えておくことが重要です。

## よくあるエラーと対処法

- **`Invalid gridId` エラー**: `getSheetId()`で取得したシートIDが正しいか確認してください。シート名が変更されたり、存在しないシートを指定したりするとエラーが発生します。
- **範囲サイズの不一致**: コピー元とコピー先の範囲サイズが異なると、書式が繰り返し適用されたり、一部しか適用されなかったりすることがあります。範囲指定が正しいか、列番号・行番号をよく確認しましょう。

## まとめ

`copyFormatToRange`メソッドを活用することで、スプレッドシートの書式設定作業を大幅に効率化できます。特に、定期的に作成するレポートや、複数のシートで同じデザインを維持したい場合に非常に強力なツールです。

最初はパラメータの指定に戸惑うかもしれませんが、慣れれば手作業での書式設定が不要になり、より本質的な作業に集中できるようになります。ぜひ、この機会にマスターして、日々の業務改善に役立ててください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}} 
  
{{< blog-card "https://coporilife.com/379/" >}}
