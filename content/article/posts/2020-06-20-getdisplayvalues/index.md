---
title: "GAS getDisplayValues()で表示値を一括取得！高速処理の鉄則を解説"
description: "GASで大量のセルの表示値を扱うならgetDisplayValues()が必須！getValues()との違い、forループ処理との圧倒的なパフォーマンス差、取得した二次元配列を実践的に加工する方法まで、業務で使えるコードと共に徹底解説します。"
tags: ["GAS", "getDisplayValues", "Google Apps Script", "スプレッドシート", "一括取得", "パフォーマンス", "高速化", "二次元配列"]
date: "2020-06-19T16:16:41.000Z"
url: "/gas/getdisplayvalues"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-28T00:00:00+00:00"
---

Google Apps Script (GAS) でスプレッドシートのデータを扱う際、日付や通貨などのフォーマットを維持したまま、**しかも高速に**値を取得したい場面は非常に多いです。そんな時に絶大な効果を発揮するのが `getDisplayValues()` メソッドです。

この記事では、`getDisplayValues()` を使って**複数セルの表示値を一括で取得する**方法に焦点を当て、その基本からパフォーマンスの重要性、実践的なデータ加工テクニックまでを詳しく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `getDisplayValues()` とは？ - 見たままの値をまとめて取得

`getDisplayValues()` は、指定した範囲のセルに**表示されている値（表示値）**を、そのままのフォーマットで**二次元配列**として一括で取得するメソッドです。

`getValue()` がセルの内部的な値（例: `1000`）を取得するのに対し、`getDisplayValues()` は表示されている文字列（例: `"¥1,000"`）を取得します。レポート作成や外部連携など、見た目が重要なデータを効率的に扱いたい場合に最適です。

| メソッド | 取得範囲 | 取得できる値 | データ型 |
|:--- |:--- |:--- |:--- |
| `getValues()` | 複数セル | 内部的な元の値 | 二次元配列 (数値, Date等) |
| **`getDisplayValues()`** | **複数セル** | **画面に見えている表示値** | **二次元配列 (文字列)** |

## なぜ `getDisplayValues()` を使うべきか？パフォーマンスの重要性

複数セルの値を取得する際、`for` ループの中で `getDisplayValue()` (単数形) を何度も呼び出すのは**最悪のアンチパターン**です。

```javascript
// 【非推奨】遅いコードの例
function slowMethod() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:B100");
  const values = [];
  for (let i = 1; i <= 100; i++) {
    const rowValues = [];
    for (let j = 1; j <= 2; j++) {
      // ループのたびにAPI呼び出しが発生し、非常に遅い
      rowValues.push(range.getCell(i, j).getDisplayValue());
    }
    values.push(rowValues);
  }
  return values;
}

// 【推奨】高速なコードの例
function fastMethod() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:B100");
  // API呼び出しは1回だけ！
  const values = range.getDisplayValues();
  return values;
}
```

スプレッドシートへのアクセス（API呼び出し）は、回数が増えるほどスクリプトの実行時間が長くなります。`getDisplayValues()` を使えば、この呼び出しが**たった1回**で済むため、処理が劇的に高速になります。

## `getDisplayValues()` の使い方とデータ加工

### 基本的な使い方

`getRange()` で取得した範囲に対してメソッドを呼び出すだけで、表示値が格納された二次元配列が返ってきます。

```javascript
function fetchDisplayValues() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('売上データ');
  // A1からC10までの範囲を指定
  const range = sheet.getRange('A1:C10');
  // 指定範囲の表示値を一括取得
  const displayValues = range.getDisplayValues();
  
  // 取得した二次元配列をログに出力
  console.log(displayValues);
}
```

### 実践テクニック：取得した配列を加工する

`getDisplayValues()` で取得したデータは、そのままでは使いにくいことがあります。`filter` や `map` といった配列メソッドを組み合わせることで、必要なデータだけに整形できます。

**▼ 在庫がある商品データだけを抽出し、オブジェクトの配列に変換する**

```javascript
function processSalesData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange(); // シート全体のデータを取得
  const values = range.getDisplayValues();
  
  const header = values.shift(); // 1行目（ヘッダー）を取り出す
  
  const salesObjects = values
    .filter(row => row[2] !== '0') // 在庫数(3列目)が'0'でない行だけをフィルタリング
    .map(row => {
      // 配列を扱いやすいオブジェクトに変換
      return {
        productName: row[0], // 商品名
        price: row[1],       // 価格 (例: "¥1,500")
        stock: row[2],       // 在庫数
        lastUpdated: row[3]  // 最終更新日 (例: "2025/12/25")
      };
    });
    
  console.log(salesObjects);
  /*
    実行結果の例:
    [
      { productName: 'リンゴ', price: '¥150', stock: '10', lastUpdated: '2025/12/25' },
      ...
    ]
  */
}
```
このように加工することで、JSONとして外部APIに送信したり、別のシートに書き出したりするのが非常に楽になります。

## 注意点：すべてが「文字列」になる

`getDisplayValues()` を使う上で最も重要な注意点は、取得した値が**すべて文字列型**になることです。

- **計算ができない**: `"¥1,500"` のような文字列はそのままでは計算に使えません。計算が必要な場合は、`getValues()` を使うか、文字列から不要な文字を削除して数値に変換する処理が必要です。
- **空のセルは空文字 `''`**: `getValues()` では空のセルは `null` ではありませんが、`getDisplayValues()` では空文字列 `''` として取得されます。

## まとめ

`getDisplayValues()` は、スプレッドシートの表示値を効率的に扱うための必須メソッドです。

- **パフォーマンスが命**: 複数セルの値を取得する際は、必ず一括取得を心がける。
- **見た目を維持**: レポート作成や通知など、フォーマット済みのデータが欲しい場合に最適。
- **データ加工とセットで**: `map` や `filter` と組み合わせることで、データの価値がさらに高まる。
- **文字列型を意識**: 取得した値で計算する場合は、型変換が必要。

これらのポイントを押さえて、GASでのデータ処理をより高速でスマートなものにしましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getdisplayvalues" >}}

{{< blog-card "https://hajiritsu.com/spreadsheet-gas-getdisplayvalues/" >}} 

{{< blog-card "https://note.com/praha_inc/n/n2b5a5c68b693" >}}
