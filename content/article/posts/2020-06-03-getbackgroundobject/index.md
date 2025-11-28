---
title: "【GAS】getBackgroundObject()でセルの背景色をRGB値で詳細に操作する方法"
description: "GASの`getBackgroundObject()`でセルの背景色を`Color`オブジェクトとして取得する方法を解説。`getBackground()`との違い、RGB値の個別取得、`getBackgroundObjects()`によるバッチ処理でのパフォーマンス最適化、条件付き書式との連携など、高度な色操作テクニックをコード付きで紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getBackgroundObject", "Color", "RGB", "パフォーマンス"]
date: "2020-06-02T16:30:31.000Z"
url: "/gas/getbackgroundobject"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-25T14:42:00+09:00"
---

Google Apps Script (GAS)でセルの背景色を扱う際、`#ffffff`のような16進数文字列だけでなく、より詳細な色情報が必要になる場面があります。この記事では、`getBackgroundObject()`メソッドを使ってセルの背景色を`Color`オブジェクトとして取得し、RGB値の個別操作やパフォーマンスを最適化する高度なテクニックを解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getBackgroundObject() とは？ getBackground()との違い

`getBackgroundObject()`は、セルの背景色情報を、単なる文字列ではなく**`Color`オブジェクト**として取得するメソッドです。

| メソッド | 戻り値の型 | 特徴 |
|:---|:---|:---|
| `getBackground()` | 文字列 (String) | `#ff0000` のような16進数文字列を返す。シンプル。 |
| `getBackgroundObject()` | オブジェクト (Color) | RGB値やテーマカラー情報など、より詳細な情報を持つオブジェクトを返す。高度な操作向き。 |

`Color`オブジェクトを使うことで、色のRGB値を個別に取得したり、スプレッドシートのテーマカラーと連携したりといった、より柔軟なプログラミングが可能になります。

### ColorオブジェクトからRGB値を取得する方法

`Color`オブジェクトの`asRgbColor()`メソッドを使うことで、色のRGB成分（赤・緑・青）を0〜255の数値として個別に取得できます。

```javascript
function getRgbValues() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const cell = sheet.getRange("B5");
  
  // Colorオブジェクトを取得
  const colorObj = cell.getBackgroundObject();
  
  // RgbColorオブジェクトに変換
  const rgbColor = colorObj.asRgbColor();
  
  // 各色成分をログに出力
  console.log(`Red: ${rgbColor.getRed()}`);   // 0-255
  console.log(`Green: ${rgbColor.getGreen()}`); // 0-255
  console.log(`Blue: ${rgbColor.getBlue()}`);  // 0-255
}
```
色を数値として扱えるため、「赤成分が200以上のセルだけ処理する」といった複雑な条件分岐も簡単です。

## パフォーマンスの鍵：getBackgroundObjects()によるバッチ処理

大量のセルを扱う場合、`getBackgroundObject()`をループ内で何度も呼び出すのは非常に非効率です。パフォーマンスを最適化するためには、複数形の**`getBackgroundObjects()`**を使い、範囲全体の`Color`オブジェクトを一括で取得するのが鉄則です。

```javascript
function processColorsInBatch() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:C1000");

  // ① Colorオブジェクトの二次元配列を一括で取得（API呼び出しは1回）
  const colorObjects = range.getBackgroundObjects();

  // ② メモリ上でデータを処理
  for (let i = 0; i < colorObjects.length; i++) {
    for (let j = 0; j < colorObjects[i].length; j++) {
      const rgb = colorObjects[i][j].asRgbColor();
      // 青成分が250以上のセル（ほぼ青）を処理
      if (rgb.getBlue() > 250) {
        console.log(`セル (${i + 1}, ${j + 1}) は青系の色です。`);
      }
    }
  }
}
```
このバッチ処理により、API呼び出し回数が劇的に減り、スクリプトの実行速度が大幅に向上します。

## 実践例：色情報に基づいた動的な条件付き書式

`getBackgroundObject()`で取得した詳細な色情報を基に、新しい条件付き書式ルールを動的に生成・適用することも可能です。

以下の例では、「赤成分が強いセル（RGBのR値 > 200）に自動で太字の書式を適用する」というルールを作成しています。

```javascript
function applyConditionalFormatByRgb() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const backgroundObjects = range.getBackgroundObjects();
  
  const rules = sheet.getConditionalFormatRules();
  
  backgroundObjects.forEach((row, i) => {
    row.forEach((color, j) => {
      // 赤色の成分が200より大きいセルを対象
      if (color.asRgbColor().getRed() > 200) {
        const cell = sheet.getRange(i + 1, j + 1);
        const rule = SpreadsheetApp.newConditionalFormatRule()
          .whenCellNotEmpty()
          .setBold(true) // 太字に設定
          .setRanges([cell])
          .build();
        rules.push(rule);
      }
    });
  });
  
  // シートに新しいルールセットを設定
  sheet.setConditionalFormatRules(rules);
}
```

## まとめ

`getBackgroundObject()`と`getBackgroundObjects()`を使いこなすことで、GASによるスプレッドシートの色操作は格段に高度になります。

-   **RGB値の個別取得**で、柔軟な条件分岐や計算が可能に。
-   **`getBackgroundObjects()`**でのバッチ処理で、パフォーマンスを劇的に改善。
-   **条件付き書式**との連携で、より動的なシート操作を実現。

これらのテクニックを駆使して、日々の業務自動化をさらにレベルアップさせてみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/color?hl=ja" >}} 

{{< blog-card "https://hajiritsu.com/spreadsheet-gas-getbackground/" >}} 

{{< blog-card "https://yagisanatode.com/clear-and-set-conditional-formatting-rules-to-a-specific-range-in-google-sheets-with-apps-script/" >}}
