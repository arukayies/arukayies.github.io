---
title: "【GAS】getCell()で範囲内の特定セルを操作する方法｜getRange()との違いも解説"
description: "GASの基本的なメソッド`getCell()`の使い方を初心者向けに解説します。`getRange()`との違い、範囲内での相対的な位置指定、そして`for`ループと組み合わせた実践的なデータ処理方法まで、具体的なコードを交えて分かりやすく紹介。スプレッドシート操作の自動化に必須の知識です。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getCell", "getRange", "forループ", "初心者"]
date: "2020-06-06T05:52:57.000Z"
url: "/gas/getcell"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-25T14:28:00+09:00"
---

Google Apps Script (GAS)でスプレッドシートを操作する上で、`getCell(row, column)`は`getRange()`と並んで非常によく使われる基本的なメソッドです。特に、**特定の範囲内をループで処理する**際に絶大な効果を発揮します。

この記事では、`getCell()`の基本から`getRange()`との使い分け、実践的な活用法までを分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getCell()とは？

`getCell(row, column)`は、**すでにある範囲（Rangeオブジェクト）の中**で、指定した行・列番号（インデックス）に該当する**単一のセル**を取得するメソッドです。

```javascript
const sheet = SpreadsheetApp.getActiveSheet();

// ① 親となる範囲をまず取得
const parentRange = sheet.getRange("B2:D10"); 

// ② 親範囲の中の (1行目, 1列目) のセルを取得 → B2セル
const targetCell = parentRange.getCell(1, 1); 

console.log(targetCell.getA1Notation()); // "B2"
```

### 重要なポイント：座標は「相対的」

`getCell()`の行・列番号は、シート全体での絶対的な位置ではなく、**親範囲の左上を(1, 1)とする相対的な位置**であることに注意が必要です。

- `parentRange.getCell(1, 1)` → B2セル
- `parentRange.getCell(2, 3)` → D3セル (B2から見て2行目、3列目)

インデックスは`1`から始まるので、`getCell(0, 0)`はエラーになります。

### getRange()との違い

`getRange(row, column)`もセルを取得するメソッドですが、こちらはシートを基準とした**絶対座標**でセルを取得します。

| メソッド | 基準 | 戻り値 | 主な用途 |
|:---|:---|:---|:---|
| `sheet.getRange(2, 2)` | シート | `Range` | シート上の特定のセルを直接指定する。 |
| `range.getCell(1, 1)` | 範囲 | `Range` | **範囲内をループ処理する**。 |

`getCell()`は、特定の範囲を起点として処理を行う場合に非常に便利です。

## 実践例：範囲内のデータをループで処理する

`getCell()`が最も輝くのは、`for`ループと組み合わせて特定の範囲内のデータを1行ずつ処理するシナリオです。

以下の例では、「ステータス」列が「完了」の行のタスク名をグレーアウト（取り消し線を追加）します。

```javascript
function processTasks() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // A2からC列の最終行までを処理範囲とする
  const taskRange = sheet.getRange("A2:C" + sheet.getLastRow());

  // 範囲内の行数だけループ
  for (let i = 1; i <= taskRange.getNumRows(); i++) {
    
    // i行目の各セルをgetCell()で取得
    const taskCell = taskRange.getCell(i, 1);     // 範囲内の1列目 (タスク名)
    const statusCell = taskRange.getCell(i, 3);    // 範囲内の3列目 (ステータス)

    // ステータスが「完了」なら
    if (statusCell.getValue() === "完了") {
      // タスク名のセルに取り消し線を設定
      taskCell.setFontLine("line-through");
    }
  }
}
```
このように、最初に`getRange()`で処理対象の全体範囲を一度だけ取得し、ループの中では`getCell()`を使って各行のセルにアクセスするのが、効率的で可読性の高い書き方です。

## エラーハンドリング

`getCell()`で親範囲を超えるインデックスを指定するとエラーになります。例えば、3行しかない範囲に対して`getCell(4, 1)`を呼び出すと失敗します。

スクリプトの安定性を高めるためには、`getNumRows()`や`getNumColumns()`で範囲の大きさを確認し、ループの範囲を正しく設定することが重要です。

```javascript
const maxRows = range.getNumRows();
const maxCols = range.getNumColumns();

// この範囲を超えるgetCell()はエラーになる
const cell = range.getCell(maxRows + 1, maxCols); // エラー
```

## まとめ

`getCell()`は、GASでスプレッドシートを操作する上で欠かせない基本メソッドです。

-   **範囲内の相対的なセル**を取得する。
-   `for`ループと組み合わせることで、**特定の範囲内のデータを効率的に処理**できる。
-   `getRange()`で全体の範囲を定義し、`getCell()`で個々のセルを操作するのが王道パターン。

このメソッドをマスターして、日々の定型業務をどんどん自動化していきましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}} 
  
{{< blog-card "https://stackoverflow.com/questions/44024096/get-cell-value-by-row-and-column-number-using-google-script" >}}
