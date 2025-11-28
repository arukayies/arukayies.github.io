---
title: "【GASスプレッドシート】getRichTextValues()でリッチテキストを一括取得・編集・SEO最適化"
description: "Google Apps Script (GAS) の`getRichTextValues()`メソッドを徹底解説。スプレッドシートの指定範囲から太字、色、リンクなどのリッチテキスト情報を効率的に一括取得・編集する方法を、具体的なコード例で紹介します。`RichTextValue`オブジェクトの構造、`setRichTextValue()`での設定、スタイルを保持したテキスト置換、パフォーマンス最適化まで、GASによる高度なスプレッドシート自動化に役立つ情報満載です。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getRichTextValues", "RichTextValue", "リッチテキスト", "書式設定", "ハイパーリンク", "getTextStyle", "getRuns", "setRichTextValue", "一括取得", "自動化", "データ編集", "効率化", "プログラム", "開発"]
date: "2020-08-06T14:31:40.000Z"
lastmod: "2025-11-20T00:00:00.000Z"
url: "/gas/getrichtextvalues"
share: true
toc: true
categories: "gas"
archives: ["2020年8月"]
---

Googleスプレッドシートのセルに、**太字、色付け、ハイパーリンクなどのリッチな書式情報**を含めることは、データの視認性と伝達力を大幅に向上させます。しかし、通常の`getValues()`メソッドでは、これらの書式情報は取得できません。Google Apps Script (GAS) でリッチテキスト情報をプログラム的に管理するには、`getRichTextValues()`メソッドが不可欠です。

本記事では、スプレッドシートの指定範囲からリッチテキスト情報を効率的に一括取得・編集するための`getRichTextValues()`メソッドを徹底解説します。`RichTextValue`オブジェクトの構造、`setRichTextValue()`によるスタイルの設定、さらには**スタイルを保持したままテキストを置換する高度なテクニック**や、GASにおけるパフォーマンス最適化のヒントまで、具体的なコード例を交えて詳しく紹介します。

GASを活用して、スプレッドシートの高度な自動化とデータ表現力の向上を実現したいすべての方に役立つ情報を提供します。

{{< affsearch keyword="GAS スプレッドシート リッチテキスト 一括取得 編集" img="/gas.jpg">}}

## リッチテキストとは？GASにおける書式付きテキストの操作

Googleスプレッドシートのセルには、単なる文字列である「プレーンテキスト」だけでなく、以下のような様々なスタイル情報を持つことができる「リッチテキスト」が入力されます。

*   **太字**、*斜体*、<u>下線</u>などの文字スタイル
*   <font color="#FF0000">文字の色</font>、背景色、フォントの種類やサイズ
*   [埋め込みハイパーリンク](https://www.google.com/)

GASの`Range.getValues()`メソッドでは、これらの書式情報は失われ、純粋な文字列のみが二次元配列として返されます。しかし、`Range.getRichTextValues()`メソッドを使用することで、**書式情報を含んだ`RichTextValue`オブジェクトの二次元配列**としてセルデータを取得できます。これにより、スクリプトによる詳細な書式解析、動的なスタイル変更、ハイパーリンク操作など、より高度なテキスト操作が可能になります。

### getRichTextValues() の基本的な使い方：範囲内のリッチテキストを一括取得

`getRichTextValues()`メソッドは、指定した`Range`オブジェクトの全セルから`RichTextValue`オブジェクトを一括で取得し、二次元配列として返します。これは、多数のセルを一つずつ処理するよりもはるかに効率的で、GASの実行速度を最適化するための重要なベストプラクティスです。

```javascript
/**
 * アクティブなシートの指定範囲（A1:C3）からリッチテキスト情報を一括取得し、
 * 各セルのプレーンテキストをログに出力する関数。
 */
function fetchAllRichTextData() {
  const sheet = SpreadsheetApp.getActiveSheet(); // アクティブなシートを取得
  const range = sheet.getRange("A1:C3");      // 対象範囲をA1:C3に設定
  
  // 指定範囲の各セルのRichTextValueオブジェクトを二次元配列として一括取得
  const richTextValues = range.getRichTextValues();

  // 取得した二次元配列をループ処理
  richTextValues.forEach((row, rowIndex) => {
    row.forEach((richTextValue, colIndex) => {
      const cellAddress = sheet.getRange(rowIndex + 1, colIndex + 1).getA1Notation();
      if (richTextValue) {
        // RichTextValueオブジェクトからプレーンテキストを取得
        Logger.log(`セル ${cellAddress} のプレーンテキスト: "${richTextValue.getText()}"`);
      } else {
        Logger.log(`セル ${cellAddress} にはリッチテキスト情報がありません（空白または数値/日付）。`);
      }
    });
  });
}
```
このスクリプトは、指定された範囲内の各セルのリッチテキスト情報を一括で取得し、そのプレーンテキストをログに出力します。

## `RichTextValue`オブジェクトの詳細解析とスタイル操作

`getRichTextValues()`で取得した個々の`RichTextValue`オブジェクトは、テキスト内容とそれに適用されたスタイルを詳細に解析・操作するためのメソッドを提供します。

### 1. `getRuns()` でスタイル区間（ラン）を取得し、部分スタイルを解析

一つのセル内のテキストでも、部分的に異なるスタイルが適用されている場合があります（例: 「**重要**な情報です」）。このような複雑なリッチテキストを解析するには、`getRuns()`メソッドが非常に有効です。`getRuns()`は、スタイルの異なる区間（「ラン」と呼びます）ごとに`RichTextValue`オブジェクトの配列を返します。これにより、各ランに適用されているスタイル情報を個別に取得できます。

```javascript
/**
 * A1セルのリッチテキストをgetRuns()で解析し、各ランのテキストとスタイルをログに出力する関数。
 * 例: A1セルに「これは**重要な情報**です」と入力されている場合。
 */
function analyzeRichTextRuns() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const richTextValue = sheet.getRange("A1").getRichTextValue(); // A1セルのRichTextValueを取得

  if (richTextValue) {
    const runs = richTextValue.getRuns(); // スタイルが異なる区間ごとにRichTextValueオブジェクトを取得

    Logger.log(`A1セルのリッチテキストは ${runs.length} つのランに分割されました。`);

    runs.forEach((run, index) => {
      const runText = run.getText();         // 各ランのテキスト部分
      const runStyle = run.getTextStyle();     // 各ランに適用されたTextStyleオブジェクト
      const runLinkUrl = run.getLinkUrl();   // 各ランに設定されたハイパーリンクURL

      Logger.log(`--- ラン ${index + 1} ---`);
      Logger.log(`  テキスト: "${runText}"`);
      Logger.log(`  太字: ${runStyle.isBold() ? 'はい' : 'いいえ'}`);
      Logger.log(`  フォント色: ${runStyle.getForegroundColor() || 'なし'}`);
      if (runLinkUrl) {
        Logger.log(`  リンク先URL: ${runLinkUrl}`);
      }
      // 他にもgetTextStyle()で取得できる様々なスタイル情報（フォントサイズ、斜体など）を解析可能
    });
  } else {
    Logger.log(`A1セルにはリッチテキスト情報が見つかりませんでした。`);
  }
}
```
この解析により、各部分に適用されている太字、色、ハイパーリンクなどの詳細なスタイル情報を正確に把握できます。

## GASでリッチテキストを作成・編集する

GASでは、プログラムで新しいリッチテキストを生成したり、既存のリッチテキストを編集してセルに適用したりすることも可能です。

### 1. `newRichTextValue()` と `RichTextValueBuilder` でリッチテキストを構築

`SpreadsheetApp.newRichTextValue()` を使用して`RichTextValueBuilder`オブジェクトを作成し、テキストと様々なスタイルを段階的に設定することで、新しいリッチテキストをプログラムで構築できます。

```javascript
/**
 * 新しいリッチテキストをプログラムで作成し、A1セルに設定する関数。
 * 「Hello」を太字、「World!」を赤字で表示します。
 */
function createAndApplyRichText() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const cell = sheet.getRange("A1");

  // RichTextValueBuilderを作成し、テキストとスタイルを設定
  const richTextBuilder = SpreadsheetApp.newRichTextValue()
    .setText("Hello, World!")
    // テキストの一部（0文字目から5文字目「Hello」）を太字に設定
    .setTextStyle(0, 5, SpreadsheetApp.newTextStyle().setBold(true).build())
    // テキストの一部（7文字目から13文字目「World!」）を赤字に設定
    .setTextStyle(7, 13, SpreadsheetApp.newTextStyle().setForegroundColor("red").build());
  
  // 構築したRichTextValueオブジェクトをセルに適用
  cell.setRichTextValue(richTextBuilder.build());
  Logger.log("A1セルに新しいリッチテキストを設定しました。");
}
```
この方法により、「特定のキーワードだけを強調する」「自動生成したレポートに重要項目を色付けする」といった動的な書式設定が容易になります。

### 2. テキストの一部にハイパーリンクを設定する

`RichTextValueBuilder`の`setLinkUrl()`メソッドを使えば、テキストの特定の部分にハイパーリンクを埋め込むことができます。

```javascript
/**
 * セル内のテキストの一部にハイパーリンクを設定する関数。
 * B1セルに「詳しくはGoogle公式サイトへ」と表示し、「Google公式サイト」にリンクを設定します。
 */
function addHyperlinkToText() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const cell = sheet.getRange("B1");

  const richTextBuilder = SpreadsheetApp.newRichTextValue()
    .setText("詳しくはGoogle公式サイトへ")
    // テキストの一部（4文字目から12文字目「Google公式サイト」）にリンクを設定
    .setLinkUrl(4, 12, "https://www.google.com"); 

  cell.setRichTextValue(richTextBuilder.build());
  Logger.log("B1セルにハイパーリンク付きリッチテキストを設定しました。");
}
```

### 3. スタイルを維持したままテキスト内容を置換する（高度なテクニック）

既存のセルの書式（太字、色、リンクなど）を壊さずに、セル内のテキスト内容だけを置換したいという高度なケースがあります。これは`getRuns()`と`RichTextValueBuilder`を組み合わせることで実現できますが、置換によってテキスト長が変わる場合、スタイルの適用範囲（インデックス）の再計算が必要となるため、複雑なロジックが必要です。

以下は、あくまで概念的な例であり、本格的な実装には注意が必要です。

```javascript
/**
 * 指定されたテキストを検索し、スタイルを保持したまま新しいテキストに置換する関数。
 * ★注意: テキスト長が変わるとスタイルのインデックスがずれるため、本番利用には詳細なロジックが必要です。
 */
function replaceTextPreservingStyle(sheet, targetRange, searchText, replaceText) {
  const richTextValues = targetRange.getRichTextValues(); // 範囲のリッチテキストを一括取得
  const newRichTextValues = [];

  richTextValues.forEach((row, rowIndex) => {
    const newRow = [];
    row.forEach((richTextValue, colIndex) => {
      if (!richTextValue) { // リッチテキスト情報がない場合はそのまま
        newRow.push(richTextValue);
        return;
      }

      const originalText = richTextValue.getText();
      const newText = originalText.replace(new RegExp(searchText, "g"), replaceText);

      if (originalText !== newText) {
        const builder = SpreadsheetApp.newRichTextValue().setText(newText);
        let currentIndex = 0; // 新しいテキストでの現在のインデックス位置

        richTextValue.getRuns().forEach(run => {
          const runOriginalText = run.getText();
          const runOriginalLength = runOriginalText.length;
          const runNewText = runOriginalText.replace(new RegExp(searchText, "g"), replaceText);
          const runNewLength = runNewText.length;

          // TODO: ここで新しいテキストにおけるrunの開始/終了インデックスを正確に計算するロジックが必要
          // 現状の単純な計算では、searchTextの出現位置とreplaceTextの長さによってずれる
          const newStartIndex = currentIndex;
          const newEndIndex = currentIndex + runNewLength;
          
          builder.setTextStyle(newStartIndex, newEndIndex, run.getTextStyle());
          builder.setLinkUrl(newStartIndex, newEndIndex, run.getLinkUrl());
          currentIndex += runNewLength; // 次のランの開始位置を更新
        });
        newRow.push(builder.build());
      } else {
        newRow.push(richTextValue); // 変更がない場合は元のRichTextValueをそのまま使用
      }
    });
    newRichTextValues.push(newRow);
  });
  targetRange.setRichTextValues(newRichTextValues); // 新しいリッチテキストを一括設定
  Logger.log(`範囲 ${targetRange.getA1Notation()} 内のテキスト置換が完了しました。`);
}
```
上記のコードは、基本的な置換の概念を示していますが、`searchText`と`replaceText`の長さが異なる場合に正確なスタイル範囲を維持するには、より複雑なインデックス計算ロジックが必要です。実用的な利用には、この部分のロジックを慎重に設計する必要があります。

## まとめ：`getRichTextValues()` でGASスプレッドシートの表現力を最大化

Google Apps Scriptの`getRichTextValues()`メソッドは、スプレッドシートのセル内に設定された多様なリッチテキスト情報をプログラムで効率的に管理するための、非常に強力な基盤を提供します。

*   **リッチテキストの一括取得と解析**: `getRichTextValues()`でセル範囲のリッチテキストを高速に取得し、`getRuns()`で複雑なスタイルや複数のハイパーリンクを持つテキストを詳細に解析できます。
*   **動的なリッチテキストの作成と編集**: `newRichTextValue()`と`RichTextValueBuilder`を用いることで、プログラムから太字、色、ハイパーリンクなどを自由に設定したリッチテキストを生成し、セルに適用できます。
*   **高度なデータ管理の実現**: スタイルを保持したテキスト置換（インデックス調整に注意）など、より高度な操作も可能になり、自動レポートの視覚的な強化や、コンテンツの自動校正ツールなど、GASの活用範囲を大きく広げます。

本記事で紹介した`getRichTextValues()`とその関連メソッドの知識と実践例を活用し、あなたのGASスクリプトをよりスマートで表現力豊かなものへと進化させてください。スプレッドシートのデータを単なる数値や文字列としてだけでなく、視覚的な情報も含めて制御することで、業務の効率化と品質向上に大きく貢献できます。

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}

{{< blog-card "https://qiita.com/taniwaki/items/2f8f74a00508f7f2b90b" >}}
