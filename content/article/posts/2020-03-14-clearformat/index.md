---
title: "GASのclearFormat()でスプレッドシートの書式を一括リセットする方法"
description: "Google Apps Script (GAS) を使って、スプレッドシートのセルの書式（背景色、フォント、罫線など）のみを一括でクリアする clearFormat() メソッドを解説。データや数式は保持したまま、見た目だけをリセットする具体的な方法や、他のclear系メソッドとの違いも紹介します。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "clearFormat()", "書式リセット", "業務効率化"]
date: "2020-03-14T07:37:29.000Z"
url: "/gas/clearformat"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年3月"]
lastmod: "2025-11-26T22:05:25+09:00"
---

Google Apps Script (GAS) を使ってスプレッドシートを操作していると、セルの書式だけをリセットしたい場面がよくあります。例えば、定期レポートのテンプレートを初期化したり、手動で設定されたバラバラな書式を統一したりする場合です。

そんな時に役立つのが `clearFormat()` メソッドです。この記事では、`clearFormat()` の基本的な使い方から、他の類似メソッドとの違い、実践的な活用法までを詳しく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `clearFormat()`メソッドとは？

`clearFormat()` は、指定した範囲の**セルの書式設定のみを削除**するメソッドです。背景色、フォントスタイル（太字、斜体）、文字サイズ、罫線などの視覚的な装飾をすべてクリアしますが、**セルに入力されている値や数式には一切影響を与えません。**

```javascript
// A1からC10の範囲の書式をクリアするサンプルコード
const sheet = SpreadsheetApp.getActiveSheet();
const range = sheet.getRange("A1:C10");
range.clearFormat();
```

このコードを実行すると、`A1:C10` の範囲の見た目がデフォルトの状態に戻りますが、データはそのまま保持されます。

## 他のクリア系メソッドとの違い

GASには `clearFormat()` と似た名前のメソッドが存在します。それぞれの違いを理解し、目的に応じて使い分けることが重要です。

| メソッド         | 削除対象                         | 主な用途                                     |
| ---------------- | -------------------------------- | -------------------------------------------- |
| `clear()`        | **値、数式、書式、メモなどすべて** | 範囲を完全に初期状態に戻したい場合           |
| `clearContent()` | **値、数式のみ**                   | 書式は残したまま、データだけを削除したい場合 |
| `clearFormat()`  | **書式のみ**                       | データは残したまま、見た目だけをリセットしたい場合 |

## 動的範囲に適用する方法

データ量が変動するシートでは、範囲を固定で指定するのではなく、`getLastRow()` や `getLastColumn()` を使って動的に範囲を取得するのがベストプラクティスです。

```javascript
function dynamicClearFormat() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('売上データ');
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  // ヘッダー行（1行目）を除いたデータ範囲の書式をクリア
  if (lastRow > 1) {
    const dataRange = sheet.getRange(2, 1, lastRow - 1, lastColumn);
    dataRange.clearFormat();
  }
}
```
このスクリプトなら、データが追加・削除されても常に正しい範囲の書式をリセットできます。

## 他のメソッドとの組み合わせによる高度な活用

`clearFormat()` は他のメソッドと組み合わせることで、より複雑な処理を自動化できます。例えば、月次レポートのテンプレートを準備する際、古いデータを消去し、書式をリセットした上で、新しいデフォルト書式を設定する、といった一連の流れをスクリプト化できます。

```javascript
function setupMonthlyReportTemplate() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('月次レポート');
  const dataRange = sheet.getRange("B2:M50");
  
  // 1. 既存データを削除
  dataRange.clearContent();
  
  // 2. 古い書式をリセット
  dataRange.clearFormat();
  
  // 3. 新しい基本書式を設定
  dataRange.setBackground('#ffffff')
           .setFontFamily('Arial')
           .setHorizontalAlignment('center');
}
```

## 実践的なユースケース：レポートの書式統一

複数の担当者が入力したデータなど、書式が不揃いになりがちなシートを定期的にクリーンアップするのに `clearFormat()` は最適です。

```javascript
function standardizeSalesReport() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('売上実績');
  if (sheet.getLastRow() < 2) return; // データがなければ終了

  const reportRange = sheet.getRange("A2:M" + sheet.getLastRow());
  
  // 一旦すべての書式をクリア
  reportRange.clearFormat();
  
  // 統一フォーマットを再適用
  reportRange.setNumberFormat("#,##0")
             .setBorder(true, true, true, true, true, true, '#cccccc', SpreadsheetApp.BorderStyle.SOLID);
}
```
このスクリプトをトリガーで定期実行すれば、レポートの見た目を常に統一された状態に保つことができます。

## まとめ

`clearFormat()` メソッドは、スプレッドシートのデータと書式を分離して管理するための重要なツールです。値はそのままに見た目だけをリセットできるため、レポート作成の自動化やデータメンテナンスの効率を大幅に向上させます。

他の `clear` 系メソッドとの違いをしっかり理解し、`clearFormat()` を活用して、あなたのスプレッドシート管理をよりスマートにしましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
