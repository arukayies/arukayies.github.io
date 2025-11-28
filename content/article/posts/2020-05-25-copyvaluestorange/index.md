---
title: "GASでスプレッドシートの値を高速コピーする方法"
description: "Google Apps Script（GAS）でスプレッドシートの特定範囲の「値のみ」を高速にコピーするcopyValuesToRangeメソッドを解説します。基本的な使い方から、動的な範囲指定、よくあるエラーの対処法まで、サンプルコード付きで分かりやすく紹介します。"
tags: ["GAS","Google Apps Script","スプレッドシート","copyValuesToRange"]
date: "2020-05-24T15:56:33.000Z"
url: "/gas/copyvaluestorange"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年5月"]
lastmod: "2025-11-25T15:22:08.000Z"
---

Google Apps Script（GAS）でスプレッドシートの操作を自動化する際、特定のセル範囲の「値のみ」を別の場所にコピーしたい場面は頻繁に発生します。その際に役立つのが`copyValuesToRange`メソッドです。

このメソッドは書式や数式を除外して純粋な値だけをコピーするため、データ転送やバックアップ処理を効率化できます。この記事では、`copyValuesToRange`の基本的な使い方から実践的な応用例までを詳しく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## copyValuesToRangeメソッドの基本

`copyValuesToRange`は、指定した範囲の値を、別のシートの特定の座標へコピーするためのメソッドです。数式やセルの書式はコピーせず、値だけを転送するのが最大の特徴です。

### 基本構文

```js
sourceRange.copyValuesToRange(gridId, column, columnEnd, row, rowEnd);
```

このメソッドは5つの引数を取ります。

*   **gridId**: (`Integer`) コピー先シートのID。`sheet.getSheetId()`で取得できます。
*   **column**: (`Integer`) コピー先の開始列番号（例: A列なら`1`、C列なら`3`）。
*   **columnEnd**: (`Integer`) コピー先の終了列番号。
*   **row**: (`Integer`) コピー先の開始行番号（例: 1行目なら`1`、5行目なら`5`）。
*   **rowEnd**: (`Integer`) コピー先の終了行番号。

### 簡単なコード例

以下のコードは、「SalesData」シートの`B2:E10`の値を、「Archive」シートの`C5`から始まる範囲にコピーします。

```js
function basicCopyExample() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName('SalesData');
  const targetSheet = ss.getSheetByName('Archive');

  // コピー元の範囲を取得
  const sourceRange = sourceSheet.getRange('B2:E10'); // 9行 x 4列

  // コピー先のシートIDを取得
  const targetGridId = targetSheet.getSheetId();

  // 値のみコピーを実行
  sourceRange.copyValuesToRange(
    targetGridId,
    3,  // 開始列: C列
    6,  // 終了列: F列 (C,D,E,Fの4列)
    5,  // 開始行: 5行目
    13  // 終了行: 13行目 (5〜13の9行)
  );
}
```

**注意点:** コピー元とコピー先の範囲の行数・列数が一致していないとエラーが発生します。

## 実践例：動的な範囲のデータをコピーする

データの量が変動する場合、`getLastRow()`メソッドなどを使って範囲を動的に取得するのが一般的です。

以下の例では、「Inventory」シートのA列からD列までの全データ（ヘッダー行を除く）を「Backup」シートの2行目以降にバックアップします。

```js
function dynamicRangeCopy() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName('Inventory');
  const targetSheet = ss.getSheetByName('Backup');

  // ヘッダー行（1行目）を除いた最終行を取得
  const lastRow = sourceSheet.getLastRow();
  if (lastRow < 2) return; // データがなければ終了

  // コピー元の範囲を動的に取得 (2行目から最終行まで、4列分)
  const sourceRange = sourceSheet.getRange(2, 1, lastRow - 1, 4);

  // コピーを実行
  sourceRange.copyValuesToRange(
    targetSheet.getSheetId(),
    1, // 開始列: A列
    4, // 終了列: D列
    2, // 開始行: 2行目
    lastRow // 終了行: 元データの最終行と同じ
  );
}
```

この方法なら、元データの行数が増減してもスクリプトを修正する必要がありません。

## よくあるエラーと対処法

### 1. パラメータの型が不一致

**エラーメッセージ:** `Exception: The parameters (String,number,number,number,number) don't match the method signature for Range.copyValuesToRange.`

**原因:** `gridId`にシート名（文字列）を渡しているなど、引数の型が間違っています。`gridId`は必ず`getSheetId()`で取得した数値でなければなりません。

### 2. コピー元とコピー先の範囲サイズが不一致

**エラーメッセージ:** `Exception: The coordinates or dimensions of the range are invalid.`

**原因:** コピー元とコピー先の行数または列数が一致していません。例えば、コピー元が10行 x 4列なのに、コピー先の指定が9行 x 4列になっている場合などに発生します。範囲の計算が正しいか確認してください。

## まとめ

`copyValuesToRange`メソッドは、スプレッドシート間のデータ転送、特に定期的なバックアップや実績データの記録といった作業を自動化する際に非常に役立ちます。

引数の指定が少し複雑ですが、範囲のサイズを正確に合わせることさえ意識すれば、シンプルかつ高速に値のコピーが実現できます。ぜひ日々の業務効率化に活用してください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://stackoverflow.com/questions/74161559/google-apps-script-copy-row-paste-as-values" >}} 

{{< blog-card "https://coporilife.com/379/" >}} 

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range" >}} 

{{< blog-card "https://techuplife.tech/gas-ss-rmovecopyclear/" >}} 

{{< blog-card "https://note.com/light_mimosa502/n/n7c707ec41748" >}} 

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}} 

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" >}}
