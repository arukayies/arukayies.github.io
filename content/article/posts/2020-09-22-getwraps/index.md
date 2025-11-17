---
title: GASでスプレッドシートの折り返し設定を一括取得！制御する方法
description: "Google Apps ScriptのgetWraps()で、指定範囲のテキスト折り返し設定を一括取得・判定し、列幅の自動調整や高速化のためのキャッシュ活用、例外処理まで実践的に解説します。"
tags: ["Google Apps Script", "GAS", "スプレッドシート", "折り返し", "getWraps", "自動化", "範囲操作", "列幅調整", "パフォーマンス最適化"]
date: 2020-09-22T09:29:47+00:00
excerpt: GASでスプレッドシートの指定範囲すべてがテキストの折り返しか取得する方法を紹介します！
url: /gas/getwraps
share: true
toc: true
lastmod: 2025-11-17T00:00:00+00:00
categories: "gas"
archives: ["2020年9月"]
---
Google Apps Script（GAS）でスプレッドシートを操作する際、`getWraps()`メソッドはセルのテキスト折り返し設定を取得するのに非常に便利です。

このメソッドを使うと、特にデータ量が多い場合でも折り返しの状態を一括で取得でき、効率的に状況を把握できます。

この記事では、初心者にもわかりやすく`getWraps()`の基本から実践的な使い方まで解説します。

{{< affsearch keyword="詳解！Ｇｏｏｇｌｅ　Ａｐｐｓ　Ｓｃｒｉｐｔ完全入門 ＧｏｏｇｌｅアプリケーションとＧｏｏｇｌｅ　Ｗｏｒ 第３版/秀和システム/高橋宣成" img="/gas.jpg">}}

## getWraps()とは？基本の使い方

まず、`getWraps()`メソッドは、セル範囲に対してテキストの折り返しが有効かどうかを二次元の真偽値配列で返すメソッドです。

スプレッドシートの可読性に直結する折り返し設定の状態を、コードから素早く確認できます。

たとえば、指定範囲の各セルについて、折り返しが有効なら`true`、無効なら`false`が返ってきます。

```js
const wrapStatus = range.getWraps();
console.log(wrapStatus);
```

このコードで、各セルの折り返し状態を簡単に確認できます。

## 使い方のコツと実践的な例

実務では、大量のセルにまたがる折り返し状態をまとめて確認したい場面がよくあります。

以下の例は、`B2:E20`の範囲に対して折り返し状態をログ出力します。

```js
function checkWraps() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SalesData');
  const dataRange = sheet.getRange('B2:E20');
  const wrapStatus = dataRange.getWraps();

  wrapStatus.forEach((row, rowIndex) =&gt; {
    row.forEach((isWrapped, colIndex) =&gt; {
      const cellAddress = `${String.fromCharCode(66 + colIndex)}${rowIndex + 2}`;
      console.log(`${cellAddress}: ${isWrapped ? 'WRAPPED' : 'NOT WRAPPED'}`);
    });
  });
}
```

このコードにより、折り返しが有効なセルと無効なセルを一覧化でき、レイアウトの見直しや整備に役立ちます。

## 応用例：自動でカラム幅を調整する方法

折り返し状態が取得できたら、それを基にカラム幅を自動調整することも可能です。

例えば、折り返しが無効で内容が長いときに、列幅を段階的に広げるといった制御ができます。

```js
function autoAdjustColumnWidth() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName('CustomerList');
  const addressRange = sheet.getRange('D2:D100');
  const wraps = addressRange.getWraps();

  wraps.flat().forEach((isWrapped, index) =&gt; {
    if (!isWrapped) {
      const currentWidth = sheet.getColumnWidth(4);
      const contentLength = addressRange.getCell(index + 1, 1).getValue().length;

      if (contentLength &gt; 30 && currentWidth &lt; 150) {
        sheet.setColumnWidth(4, currentWidth + 50);
      }
    }
  });
}
```

このように、折り返しの有無や文字数に応じて列幅を調整することで、一覧性と可読性を両立できます。

## 効率化のためのキャッシュ活用法

大規模範囲に対して`getWraps()`を繰り返し実行すると時間がかかる場合があります。

`CacheService`を活用して結果を短時間キャッシュすることで、不要な再計算を避けられます。

```js
const cache = CacheService.getScriptCache();
const cachedWraps = cache.get('wrapSettings');

if (!cachedWraps) {
  const freshData = range.getWraps();
  cache.put('wrapSettings', JSON.stringify(freshData), 600); // 10分間キャッシュ
}
```

同一範囲・短時間での参照が多い処理では、キャッシュ利用で体感速度を大きく改善できます。

## エラー処理とデバッグのヒント

スクリプトの保守性を高めるために、範囲指定ミスなどを考慮した例外処理を組み込みましょう。

下記は無効な範囲指定の例を想定したパターンです。

```js
try {
  const invalidRange = sheet.getRange('NonExistingSheet!A1:B2');
  const wraps = invalidRange.getWraps();  // エラー発生
} catch (e) {
  console.error(`範囲指定エラー: ${e.message}`);
  // アクティブ範囲を使ってエラー回避
  const safeRange = sheet.getActiveRange();
}
```

このように例外を適切に扱うことで、処理が途中で停止せず、ログから原因を追跡しやすくなります。

## 最後に

`getWraps()`は、スプレッドシートのテキスト折り返し設定を可視化・制御するうえで強力な手段です。

大量データのレイアウト確認や、列幅の動的調整など、実務でも応用範囲が広いメソッドです。

この記事のサンプルを起点に、用途に合わせて処理を拡張してみてください。

{{< affsearch keyword="詳解！Ｇｏｏｇｌｅ　Ａｐｐｓ　Ｓｃｒｉｐｔ完全入門 ＧｏｏｇｌｅアプリケーションとＧｏｏｇｌｅ　Ｗｏｒ 第３版/秀和システム/高橋宣成" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}

{{< blog-card "https://gsuiteguide.jp/sheets/getwraps/" >}}

{{< blog-card "https://techuplife.tech/gas-ss-rtextwrap/" >}}