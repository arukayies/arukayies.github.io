---
title: "【GAS】getFormulaとgetFormulasの違いとは？セルの数式を正しく取得する方法"
description: "GASでセルの数式そのものを文字列として取得したいですか？getValue()は計算結果を返しますが、getFormula()は「=SUM(A1:B1)」のような数式を取得します。単一セルと複数セルでの正しい使い方や、パフォーマンスを意識した一括取得の方法を解説します。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getFormula", "getFormulas", "数式", "getValue", "パフォーマンス", "一括取得"]
date: "2020-07-05T16:07:45.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getformula"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年7月"]
---

Google Apps Script (GAS)でスプレッドシートのセルを操作する際、「計算結果の値」ではなく「入力されている数式そのもの」を取得したい場面は頻繁にあります。例えば、シート内の数式を監査したり、一括でバックアップしたりする場合です。

そのために使うのが`getFormula()`や`getFormulas()`ですが、`getValue()`との違いや、複数セルを扱う際の注意点を理解しておくことが重要です。

この記事では、これらのメソッドの正しい使い分けと、GASのパフォーマンスを意識した実践的なテクニックを解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `getValue()` vs `getFormula()`: 根本的な違い

まず最初に、最も重要な違いを理解しましょう。

-   **`getValue()`**: セルに表示されている**計算結果の値**を取得します。セル`A1`に`=1+2`と入力されていれば、`3`という数値が返ります。
-   **`getFormula()`**: セルに入力されている**数式の文字列**そのものを取得します。セル`A1`に`=1+2`と入力されていれば、`"=1+2"`という文字列が返ります。
    - **重要**: もしセルに数式が入っていない場合、`getFormula()`は**空文字 (`""`)** を返します。

目的に応じて、この2つを明確に使い分ける必要があります。

## `getFormula()`の罠：複数範囲には使えない

`getFormula()`は**単一セル専用**のメソッドです。複数セルの範囲（例: `"A1:B2"`）に対して使用すると、**左上隅のセルの数式しか返さない**ので注意してください。

```javascript
// A1に"=SUM(C1:C2)"、B1に"=SUM(D1:D2)"が入っているとする
const range = SpreadsheetApp.getActiveSheet().getRange("A1:B1");
// A1の数式しか返ってこない
const formula = range.getFormula(); 
console.log(formula); // "=SUM(C1:C2)"
```

## `getFormulas()`による高速な一括取得

複数のセルの数式を正しく、かつ効率的に取得するための解決策が**`getFormulas()`**（複数形）です。

このメソッドは、指定した範囲の全セルの数式を**二次元配列 (`String[][]`)** として、たった1回のAPI呼び出しで取得します。数式が入っていないセルに対応する配列要素は、空文字 (`""`) になります。

```javascript
function fetchAllFormulas() {
  const range = SpreadsheetApp.getActiveSheet().getRange("A1:B2");
  const formulas = range.getFormulas();
  
  // 例: [["=SUM(C1:C2)", "=SUM(D1:D2)"], ["", "=A1*1.1"]]
  console.log(formulas); 
}
```
ループで`getFormula()`を何度も呼び出すのに比べて、パフォーマンスが劇的に向上します。

## A1表記 vs R1C1表記

GASには、数式を行と列の相対位置で示す「R1C1表記」で取得するメソッドもあります。

| メソッド名 | 対象範囲 | 表記法 | 戻り値の型 | 主な用途 |
| --- | --- | --- | --- | --- |
| `getFormula()` | **単一セル** | A1表記 | `String` | 特定1セルの数式を確認したい時 |
| `getFormulas()` | 複数セル | A1表記 | `String[][]` | 範囲内の数式を**見たままの形**で一括取得したい時 |
| `getFormulaR1C1()` | **単一セル** | R1C1表記 | `String` | 1セルの数式を**相対参照**で取得したい時 |
| `getFormulasR1C1()`| 複数セル | R1C1表記 | `String[][]`| 範囲内の数式を**相対参照**で一括取得し、**再利用**したい時 |

**R1C1表記**（例: `=SUM(R[0]C[-2]:R[0]C[-1])`）は、数式を別の場所にコピー＆ペーストするような処理をプログラムで実装する際に非常に強力です。

## 実践的コード例

### 1. シート全体の数式を別シートにバックアップ

`getFormulas()`と`setFormulas()`を組み合わせることで、数式のバックアップと復元が簡単に行えます。読み書き両方の一括処理がポイントです。

```javascript
function backupAllFormulas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getActiveSheet();
  const sourceRange = sourceSheet.getDataRange();
  
  // 範囲の数式を一括取得
  const formulas = sourceRange.getFormulas();

  let backupSheet = ss.getSheetByName(sourceSheet.getName() + '_数式バックアップ');
  if (!backupSheet) {
    backupSheet = ss.insertSheet(sourceSheet.getName() + '_数式バックアップ');
  }
  backupSheet.clear();
  
  // 取得した数式をバックアップシートに一括設定
  backupSheet.getRange(1, 1, formulas.length, formulas[0].length).setFormulas(formulas);
  
  SpreadsheetApp.getUi().alert('数式のバックアップが完了しました。');
}
```

### 2. 特定の関数（例: `VLOOKUP`）が使われているセルを特定

シート内で`VLOOKUP`関数が使われているセルをリストアップし、シートの監査に役立てます。

```javascript
function findCellsWithSpecificFunction() {
  const FUNCTION_NAME = "VLOOKUP";
  
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const formulas = range.getFormulas();
  
  const foundCells = [];

  formulas.forEach((row, r) => {
    row.forEach((formula, c) => {
      // toUpperCase()で大文字小文字を区別しないようにする
      if (formula.toUpperCase().includes(FUNCTION_NAME)) {
        foundCells.push(range.getCell(r + 1, c + 1).getA1Notation());
      }
    });
  });
  
  if (foundCells.length > 0) {
    console.log(`${FUNCTION_NAME}関数が使われているセル: ${foundCells.join(', ')}`);
  } else {
    console.log(`${FUNCTION_NAME}関数が使われているセルは見つかりませんでした。`);
  }
}
```

## まとめ

スプレッドシートの数式をGASで扱う際の要点は以下の通りです。

-   **計算結果**が欲しいなら `getValue()`、**数式の文字列**が欲しいなら `getFormula()` を使う。
-   **単一セル**の数式には `getFormula()` を使う。
-   **複数セル**の数式には、パフォーマンスのために必ず `getFormulas()` を使って一括取得する。

これらのメソッドを適切に使い分けることで、シートの分析、監査、バックアップといった高度な自動化を効率的に実装できます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getformula" >}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getformulas" >}}
