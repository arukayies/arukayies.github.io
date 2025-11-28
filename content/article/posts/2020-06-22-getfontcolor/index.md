---
title: "GASで文字色を判定・取得！getFontColorObjectで条件分岐を自動化する方法"
description: "「セルの文字が赤色だったら、自動で処理を実行したい」をGASで実現！推奨メソッドgetFontColorObject()を使い、文字色をトリガーに条件分岐するスクリプトを解説。複数セルの色一括取得や、色を使ったデータ分析など、実用的なテクニックが満載です。"
tags: ["GAS", "getFontColorObject", "Google Apps Script", "スプレッドシート", "文字色", "条件付き書式", "自動化", "Color Object"]
date: "2020-06-21T16:38:04.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontcolor"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
---

スプレッドシートでタスク管理をする際、「緊急の項目は赤文字にする」といったルールを使っている方は多いでしょう。しかし、その赤文字の項目を手作業でリストアップするのは面倒です。Google Apps Script (GAS) を使えば、「**セルの文字色をトリガーにして、処理を自動化する**」ことが可能です。

この記事では、GASで文字色を取得するための最新推奨メソッド **`getFontColorObject()`** を中心に、基本的な使い方から、色を条件に処理を分岐させる応用テクニックまで詳しく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## 文字色取得の新常識: `getFontColorObject()` を使おう

GASで文字色を取得するメソッドには旧と新の2つがあります。

- `getFontColor()`: **旧式**。`#ff0000` のような16進数の文字列を返す。
- **`getFontColorObject()`**: **新・推奨**。色情報を柔軟に扱える `Color` オブジェクトを返す。

**`getFontColorObject()` が推奨される最大の理由は、テーマカラーに対応している点**です。スプレッドシートのテーマで定義された色（例: "見出し1のテキスト色"）も正確に扱えるため、より汎用性の高いスクリプトが書けます。

### `Color`オブジェクトとは？

`Color`オブジェクトは、色に関する様々な情報を取り出せる便利なオブジェクトです。

| 主要メソッド | 説明 | 返り値の例 |
|:--- |:--- |:--- |
| `asHexString()` | 色を16進数カラーコードの文字列で返す | `"#ff0000"` |
| `asRgbColor()` | RGB値を持つ `RgbColor` オブジェクトを返す | `RgbColor` オブジェクト |
| `getColorType()` | 色の種類（RGBかテーマカラーか）を返す | `SpreadsheetApp.ColorType.RGB` |
| `asThemeColor()`| テーマカラーの種類を返す | `SpreadsheetApp.ThemeColorType.TEXT` |

`asRgbColor()` を経由すれば、`getRed()` `getGreen()` `getBlue()` でRGBの各成分値も取得できます。

## GASで文字色を取得・活用する実践コード

### 1. 基本: 単一セルの文字色を取得する

`B2`セルの文字色を16進数とRGB値で取得する基本コードです。

```javascript
function getSingleCellFontColor() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const targetCell = sheet.getRange("B2");
  
  // Colorオブジェクトを取得
  const colorObject = targetCell.getFontColorObject();
  
  // RgbColorオブジェクトに変換してから16進数文字列を取得
  const hexCode = colorObject.asRgbColor().asHexString();
  console.log("16進数コード:", hexCode);
  
  // RgbColorオブジェクトから各色成分を取得
  const rgbColor = colorObject.asRgbColor();
  console.log(`RGB値: R=${rgbColor.getRed()}, G=${rgbColor.getGreen()}, B=${rgbColor.getBlue()}`);
}
```

### 2. 高速化: 複数セルの文字色を一括取得する (`getFontColorObjects`)

`for`ループでセルを一つずつ調べるより、`getFontColorObjects()` (複数形) で一括取得する方が圧倒的に高速です。

```javascript
function getMultipleCellFontColors() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:C5");
  // Colorオブジェクトの二次元配列を取得
  const fontColorObjects = range.getFontColorObjects();
  
  fontColorObjects.forEach((row, rowIndex) => {
    row.forEach((colorObject, colIndex) => {
      const cellAddress = range.getCell(rowIndex + 1, colIndex + 1).getA1Notation();
      const hexCode = colorObject.asRgbColor().asHexString();
      console.log(`セル ${cellAddress} の色: ${hexCode}`);
    });
  });
}
```

## 応用テクニック: 文字色をトリガーに処理を自動化する

### 1. 「赤文字のセル」をリストアップする

シート内をスキャンし、文字色が赤 (`#ff0000`) のセルの値とアドレスを自動でリストアップします。

```javascript
function listUpRedFontCells() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const fontColors = range.getFontColorObjects();
  const values = range.getValues();
  const redFontCells = [];

  fontColors.forEach((row, rowIndex) => {
    row.forEach((color, colIndex) => {
      if (color.asRgbColor().asHexString() === "#ff0000") {
        const cellAddress = range.getCell(rowIndex + 1, colIndex + 1).getA1Notation();
        redFontCells.push({
          address: cellAddress,
          value: values[rowIndex][colIndex]
        });
      }
    });
  });

  console.log("赤文字のセル一覧:", redFontCells);
}
```

### 2. 文字色に応じて隣のセルにステータスを自動入力

A列の文字色を判定し、赤ならB列に「要対応」、青なら「完了」と自動で入力するスクリプトです。

```javascript
function setStatusByFontColor() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const targetRange = sheet.getRange("A2:A" + sheet.getLastRow());
  const colors = targetRange.getFontColorObjects();

  colors.forEach((row, index) => {
    const colorHex = row[0].asRgbColor().asHexString();
    const statusCell = targetRange.offset(index, 1); // 隣のセル(B列)

    switch (colorHex) {
      case "#ff0000": // 赤色
        statusCell.setValue("要対応");
        break;
      case "#0000ff": // 青色
        statusCell.setValue("完了");
        break;
      default:
        statusCell.clearContent();
        break;
    }
  });
}
```

## 注意点: リッチテキストには使えない

このメソッドは、セル全体の文字色が均一である場合に有効です。セル内の一部の文字だけ色が違う**リッチテキスト**の場合、セルの先頭文字の色が返されます。リッチテキストの各部分の色を取得するには、`getRichTextValue()` を使ったより複雑な処理が必要です。

## まとめ

`getFontColorObject()` を使えば、これまで手作業で行っていた色に基づく判断をGASで自動化できます。

-   **推奨メソッドは `getFontColorObject()`**: `Color`オブジェクトで柔軟な色操作が可能。
-   **複数セルは `getFontColorObjects()` で一括取得**: パフォーマンスが劇的に向上。
-   **色をトリガーに自動化**: 特定の色のセルを抽出したり、ステータスを更新したりできる。

このテクニックをマスターして、あなたのスプレッドシート業務をさらにスマートに効率化しましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontcolorobject" >}} 
  
{{< blog-card "https://tonari-it.com/gas-spreadsheet-font-color/" >}}
