---
title: "GASでスプレッドシートの指定セルから文字色の詳細情報を取得する方法"
description: "Google Apps Script（GAS）の`getFontColorObject()`メソッドを使い、スプレッドシートのセルの文字色をColorオブジェクトとして詳細に取得する方法を解説します。RGB値の取得、16進数カラーコードへの変換、複数セルの一括処理など、具体的なコードを交えて詳しく紹介します。"
tags: ["GAS", "getFontColorObject()", "Google Apps Script", "スプレッドシート", "ColorObject"]
date: "2020-06-22T12:07:22.000Z"
lastmod: "2025-11-21T00:00:00.000Z"
url: "/gas/getfontcolorobject"
share: true
toc: true
categories: "gas"
archives: ["2020年6月"]
---

Google Apps Script（GAS）でスプレッドシートの書式を操作する際、セルの文字色を詳細に扱いたい場面があります。本記事では、従来の`getFontColor()`メソッドよりも高機能な`getFontColorObject()`メソッドに焦点を当て、その基本的な使い方から応用テクニックまでを初心者にも分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getFontColorObject()メソッドとは？

`getFontColorObject()`は、指定したセルのフォントカラーを`Color`オブジェクトとして取得するメソッドです。従来の`getFontColor()`が16進数のカラーコード文字列（例: `#ff0000`）を返すのに対し、このメソッドは色をオブジェクトとして返すため、RGB値や透明度（アルファ値）といった、より詳細な情報にアクセスできます。

```js
function getFontColorAsObject() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1");
  const colorObject = range.getFontColorObject();
  
  // Colorオブジェクトから16進数文字列（#RRGGBB形式）に変換
  const hexCode = colorObject.asRgbColor().asHexString(); 
  Logger.log(hexCode);
}
```
**注意:** `getFontColorObject()`は単一セル（範囲指定の場合は左上のセル）の色情報を返します。

## RGB値の取得と活用

`Color`オブジェクトの大きな利点は、色を構成するRGB（赤・緑・青）の各成分値を個別に取得できることです。これにより、色に基づいたより複雑な条件分岐や計算が可能になります。

以下の例では、B2セルのフォントカラーを取得し、そのRGB値をC2セルに書き出します。

```js
function getSingleCellRGB() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  const range = sheet.getRange("B2");
  const color = range.getFontColorObject().asRgbColor();
  
  const rgbValues = {
    red: color.getRed(),
    green: color.getGreen(),
    blue: color.getBlue()
  };
  
  const rgbString = `RGB(${rgbValues.red}, ${rgbValues.green}, ${rgbValues.blue})`;
  sheet.getRange("C2").setValue(rgbString);
}
```

## 16進数カラーコードへの変換

Web開発など他のシステムと連携する場合、16進数形式（`#RRGGBB`）のカラーコードが必要になることがよくあります。`Color`オブジェクトの`asHexString()`メソッドを使えば、簡単に変換できます。

```js
function convertFontColorToHex() {
  const cell = SpreadsheetApp.getActiveSpreadsheet().getRange('A1');
  const hex = cell.getFontColorObject().asRgbColor().asHexString();
  
  Logger.log(`A1セルの16進数カラーコード: ${hex}`);
  return hex;
}
```

## 複数セルのフォントカラーを一括取得する方法

多数のセルを扱う場合、一つずつ処理するのは非効率です。`getFontColorObjects()`（複数形）メソッドを使用すれば、指定範囲全体のフォントカラーを`Color`オブジェクトの二次元配列として一括で取得できます。

以下のスクリプトは、指定範囲内で文字色が赤（`#ff0000`）のセルを検出し、自動で「要確認」というメモを追加します。

```js
function processRangeColorsInBulk() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SalesData');
  const dataRange = sheet.getRange("A2:F100");
  const colorMatrix = dataRange.getFontColorObjects();
  
  colorMatrix.forEach((row, rowIndex) => {
    row.forEach((colorObj, colIndex) => {
      if (colorObj.asRgbColor().asHexString() === '#ff0000') {
        sheet.getRange(rowIndex + 2, colIndex + 1)
          .setNote('要確認: 赤文字の項目です');
      }
    });
  });
}
```

## getFontColor()との比較

`getFontColor()`と`getFontColorObject()`の主な違いは、取得できる情報の粒度です。

| メソッド               | 取得できる情報                                      | 主な用途                                     |
| ---------------------- | --------------------------------------------------- | -------------------------------------------- |
| `getFontColor()`       | 16進数カラーコードの文字列（例: `#ff0000`）         | 単純な色の比較や設定。                       |
| `getFontColorObject()` | `Color`オブジェクト（RGB値、透明度などを含む） | 詳細な色情報の分析、複雑な条件分岐、計算。 |

既存のコードを`getFontColor()`から移行する場合は、以下のように`asHexString()`を追加するだけで簡単に行えます。

```js
// 旧方式
const oldColor = range.getFontColor(); // '#ff0000'

// 新方式
const newColor = range.getFontColorObject().asRgbColor().asHexString();
```

## トラブルシューティング

### デフォルトカラーの扱い

ユーザーが明示的に色を設定していないセルの場合、`getFontColorObject()`はデフォルトの色（通常は黒）を返します。テーマなどによって色が異なる場合もあるため、特定の色を期待する処理では注意が必要です。

## まとめ

`getFontColorObject()`メソッドを使いこなすことで、スプレッドシートのフォントカラーをより柔軟かつ詳細に扱うことができます。

**このメソッドは以下のような場面で特に役立ちます:**
*   色分けされたデータの分析や自動処理
*   条件付き書式と連携した動的なデータ表現
*   WebアプリケーションやCSSと連携したカラーマネジメント

GASの強力な機能を活用して、日々のスプレッドシート業務をさらに効率化しましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}} 
  
{{< blog-card "https://kuronn.com/article/getfontcolorobject-gas/" >}} 
  
{{< blog-card "https://gsuiteguide.jp/sheets/getfontcolor/" >}}
