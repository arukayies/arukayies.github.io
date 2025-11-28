---
title: "【GAS】getDataRegion(dimension)で行・列単位のデータ範囲を正確に取得する方法"
description: "GASの`getDataRegion()`に引数`dimension`を指定し、特定のセルを基点に「行方向」または「列方向」の連続したデータ範囲を正確に取得する方法を解説。複雑なレイアウトのシートから特定のデータ列・行だけを動的に抜き出す、実践的なスクリプトを紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getDataRegion", "Dimension", "行操作", "列操作"]
date: "2020-06-08T14:08:06.000Z"
url: "/gas/getdataregion-dimension"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-25T13:48:00+09:00"
---

Google Apps Script (GAS)で`getDataRegion()`を使うと連続したデータ範囲を取得できますが、引数`dimension`を指定することで、その能力をさらに高めることができます。この引数を使えば、**行方向**または**列方向**に限定してデータ範囲を取得することが可能です。

この記事では、`getDataRegion(dimension)`を使いこなし、複雑なシートから特定のデータ列や行だけをスマートに抜き出す方法を解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getDataRegion(dimension) の基本

`getDataRegion()`メソッドに`SpreadsheetApp.Dimension`という特別な引数を渡すことで、データ範囲の取得方向を制御できます。

- **`SpreadsheetApp.Dimension.ROWS`**: 指定したセルを基点に、**上下（行方向）**に連続するデータ範囲を取得します。
- **`SpreadsheetApp.Dimension.COLUMNS`**: 指定したセルを基点に、**左右（列方向）**に連続するデータ範囲を取得します。

引数を指定しない場合は、上下左右すべての方向が対象になります。

### 列方向の範囲を取得する (`COLUMNS`)

指定したセルが含まれる**行**の中で、データが連続している範囲を取得します。

```javascript
function getColumnDataRegion() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const startCell = sheet.getRange("B4");
  
  // B4セルを基点に「列方向（左右）」のデータ範囲を取得
  const columnDataRange = startCell.getDataRegion(SpreadsheetApp.Dimension.COLUMNS);
  
  // B4の左右にC4, D4までデータがあれば "B4:D4" が返る
  console.log(columnDataRange.getA1Notation());
}
```

### 行方向の範囲を取得する (`ROWS`)

指定したセルが含まれる**列**の中で、データが連続している範囲を取得します。

```javascript
function getRowDataRegion() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const startCell = sheet.getRange("B4");

  // B4セルを基点に「行方向（上下）」のデータ範囲を取得
  const rowDataRange = startCell.getDataRegion(SpreadsheetApp.Dimension.ROWS);

  // B4の上下にB2からB10までデータがあれば "B2:B10" が返る
  console.log(rowDataRange.getA1Notation());
}
```

## 実践例：特定の項目列全体に書式を設定する

`getDataRegion(SpreadsheetApp.Dimension.ROWS)`は、「特定のヘッダーを持つ列のデータ部分全体」を取得するのに非常に便利です。

以下の例では、「価格」というヘッダー（例: C2セル）を見つけ、その列のデータ全体に通貨形式の書式を適用します。

```javascript
function formatPriceColumn() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // ここでは簡単化のためC2セルをヘッダーと仮定
  const priceHeaderCell = sheet.getRange("C2"); 

  // C2セルを基点に、行方向（上下）のデータ範囲を取得
  const priceColumnRange = priceHeaderCell.getDataRegion(SpreadsheetApp.Dimension.ROWS);

  // ヘッダーを除いたデータ本体の範囲を取得
  const priceDataRange = priceColumnRange.offset(1, 0, priceColumnRange.getNumRows() - 1);

  // 通貨形式（円）の書式を設定
  priceDataRange.setNumberFormat("'¥'#,##0");

  console.log(`${priceDataRange.getA1Notation()} に通貨書式を設定しました。`);
}
```
このスクリプトなら、「価格」列のデータが何行あっても、常に正しい範囲に書式を適用できます。

## 応用例：ガントチャートのタスク期間をハイライトする

複数のプロジェクトが縦に並んでいるようなシートで、特定のプロジェクトの期間（横方向の範囲）だけを取得してハイライトする例です。

```javascript
function highlightTaskDuration() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // プロジェクトBの開始セルを基点とする
  const taskStartCell = sheet.getRange("B5"); 

  // B5セルを基点に、列方向（左右）のデータ範囲を取得
  const taskDurationRange = taskStartCell.getDataRegion(SpreadsheetApp.Dimension.COLUMNS);

  // 取得した範囲の背景色を変更
  taskDurationRange.setBackground("#d9ead3"); // 薄い緑色
  
  console.log(`タスク期間 ${taskDurationRange.getA1Notation()} をハイライトしました。`);
}
```

## まとめ

`getDataRegion(dimension)`を使いこなすことで、GASによるデータ範囲の取得は格段に柔軟かつ正確になります。

-   `Dimension.ROWS`で**列単位のデータ**を縦方向に取得。
-   `Dimension.COLUMNS`で**行単位のデータ**を横方向に取得。
-   複雑なレイアウトのシートでも、必要な部分だけを動的に抜き出せる。

データ量やレイアウトの変更に強い、メンテナンス性の高いスクリプトを作成するために、ぜひこのテクニックを活用してください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://www.lido.app/google-sheets/getdatarange" >}} 
  
{{< blog-card "https://spreadsheet.dev/reading-from-writing-to-range-in-google-sheets-using-apps-script" >}} 
  
{{< blog-card "https://rinyan-7.com/gas/sheet_getdatarange/" >}} 
  
{{< blog-card "https://www.youtube.com/watch?v=w9AXRfrhTCQ" >}} 
  
{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}} 
  
{{< blog-card "https://techuplife.tech/gas-ss-rcellrange/" >}}
