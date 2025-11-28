---
title: "【GAS】数式をR1C1形式で取得するgetFormulasR1C1()を徹底解説"
description: "Google Apps Script (GAS) でスプレッドシートの数式をR1C1形式で取得する`getFormulasR1C1()`メソッドを徹底解説。数式の動的な操作、監査、バックアップに役立つR1C1表記の基本から応用まで、具体的なコード例を交えて初心者にも分かりやすく紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "R1C1", "数式", "Excel"]
date: "2020-07-08T17:12:12.000Z"
lastmod: "2025-11-20T00:00:00.000Z"
url: "/gas/getformulasr1c1"
share: true
toc: true
categories: "gas"
archives: ["2020年7月"]
---

Google Apps Script (GAS) を使ってスプレッドシートの数式をプログラムで自在に操りたいですか？ `getFormulasR1C1()` メソッドは、数式をR1C1形式で効率的に取得し、動的な操作や一括監査を可能にする強力なツールです。

本記事では、`getFormulasR1C1()` の基本的な使い方から、数式を監査・管理する実用的な応用例まで、GAS初心者の方でも理解できるよう、具体的なコードを交えて徹底解説します。R1C1表記のメリットを最大限に活かし、スプレッドシート作業の自動化・効率化を加速させましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## R1C1表記法とは？

通常、スプレッドシートではセルを「A1」や「B2」といった **A1表記** で参照しますが、**R1C1表記**は行（Row）と列（Column）の番号を使ってセルを表現する方法です。

R1C1表記には、絶対参照と相対参照の2種類があります。

-   `R1C1`: **絶対参照**。シートの1行目・1列目のセル（A1セル）を常に指します。
-   `R[1]C[-2]`: **相対参照**。現在のセルから見て、**1行下、2列左**のセルを指します。`[]`内の数値が相対的な位置を示します。

このR1C1表記の最大のメリットは、**数式をコピー＆ペーストしても参照関係が崩れにくい**点にあり、特にGASで数式を生成したり解析したりする際に非常に便利です。

## getFormulasR1C1() の基本的な使い方

### メソッドの構文

```javascript
const formulas = Range.getFormulasR1C1();
```

指定した `Range` オブジェクト内のすべての数式をR1C1形式で取得します。

### 戻り値

戻り値は、範囲内の構造を維持した**文字列の二次元配列 (`String[][]`)** です。

-   数式が入力されているセル: R1C1表記の数式文字列（例: `=R[-1]C+R[-2]C`）
-   数式がなく、値や空白のセル: **空文字 (`""`)**

## getFormulasR1C1() の実装例

### 1. 指定範囲の数式をすべて取得する

まずは、指定した範囲内の数式をすべて取得し、ログに出力する基本的なスクリプトです。

```javascript
function logAllFormulasInR1C1() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('データシート');
  const range = sheet.getRange('B2:D10');
  const formulas = range.getFormulasR1C1();
  
  // 取得した二次元配列をループ処理
  for (let i = 0; i < formulas.length; i++) {
    for (let j = 0; j < formulas[i].length; j++) {
      if (formulas[i][j]) { // 数式が存在する場合のみログに出力
        const cellAddress = range.getCell(i + 1, j + 1).getA1Notation();
        Logger.log(`セル ${cellAddress} の数式: ${formulas[i][j]}`);
      }
    }
  }
}
```

### 2. 応用例: 数式の監査（チェック）

特定の文字列を含む数式がないか、シート全体を監査する実用的な例です。例えば、古い関数や特定の参照が残っていないかを確認する際に役立ちます。

```javascript
function auditFormulas() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('月次報告');
  const range = sheet.getDataRange(); // データ範囲全体を取得
  const formulas = range.getFormulasR1C1();
  
  const targetFormulaPart = "SUMIF"; // 監査したい数式の一部
  
  formulas.forEach((row, rowIndex) => {
    row.forEach((formula, colIndex) => {
      if (formula.includes(targetFormulaPart)) {
        const cellAddress = sheet.getRange(rowIndex + 1, colIndex + 1).getA1Notation();
        Logger.log(`警告: セル ${cellAddress} にターゲット数式 (${targetFormulaPart}) が含まれています。`);
      }
    });
  });
}
```

## `getFormulas()` と `getFormulasR1C1()` の違い

GASにはよく似た `getFormulas()` というメソッドも存在します。それぞれの違いを理解し、用途に応じて使い分けることが重要です。

| メソッド | 表記形式 | 戻り値の型 | 空セルの扱い | 主な用途 |
| --- | --- | --- | --- | --- |
| `getFormulas()` | **A1表記** (`=A1+B1`) | `String[][]` | 空文字 | 人間が読みやすい形式で数式を確認したい場合 |
| `getFormulasR1C1()` | **R1C1表記** (`=RC[-1]+RC[-2]`) | `String[][]` | 空文字 | プログラムで数式の構造を解析・操作したい場合 |

**プログラムによる自動処理にはR1C1表記が適しています。**

## まとめ

`getFormulasR1C1()` は、スプレッドシート内の数式をプログラムで体系的に扱うための強力なメソッドです。

-   **R1C1表記**で数式を取得するため、相対参照の扱いに優れている。
-   戻り値は**二次元配列**で、範囲内の数式を一括で取得・処理できる。
-   数式の**一括監査**、**動的な生成**、**バックアップ**など、高度な自動化に応用可能。

GASで複雑な数式処理を行う際には、このメソッドをぜひ活用してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getformulasr1c1" >}}
