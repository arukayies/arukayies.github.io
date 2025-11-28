---
title: "【GASスプレッドシート】getTextRotation()でテキスト回転を効率的に取得・SEO最適化"
description: "Google Apps Script (GAS)の`getTextRotation()`メソッドを徹底解説。スプレッドシートの指定セルのテキスト回転設定を効率的に取得する方法を、具体的なコード例で紹介します。`getTextRotations()`での複数セル一括取得、特定角度のセルをハイライト、書式複製といった実践的な応用例を通じて、GASによるスプレッドシート自動化と視覚的改善に役立つ情報満載です。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getTextRotation", "getTextRotations", "テキスト回転", "TextRotation", "セル書式", "自動化", "効率化", "プログラム", "開発", "UI/UX"]
date: "2020-09-22T02:17:08.000Z"
lastmod: "2025-11-20T00:00:00.000Z"
url: "/gas/gettextrotation"
share: true
toc: true
categories: "gas"
archives: ["2020年9月"]
---

Google Apps Script (GAS) を用いてスプレッドシートを操作する際、データの視認性やレポートのレイアウトを向上させるために、**セルのテキストを回転させる**ことがあります。`getTextRotation()`メソッドは、このようなセルのテキスト回転設定をプログラムで正確に取得するための基本的ながら強力な機能です。

本記事では、GASの`Range.getTextRotation()`メソッドを徹底解説します。単一セルのテキスト回転角度取得の基本から、複数セルの回転情報を効率的に一括取得できる`getTextRotations()`との違い、さらには**特定の角度に回転したセルを自動でハイライトする機能**や、書式設定の複製といった実践的な応用例まで、具体的なコードを交えて分かりやすく紹介します。

GAS初心者から、スプレッドシートの視覚的表現と自動化の効率をさらに高めたい上級者まで、すべての方に役立つ情報が満載です。

{{< affsearch keyword="GAS スプレッドシート テキスト回転 自動化 書式" img="/gas.jpg">}}

## `getTextRotation()`メソッドとは？GASでセルのテキスト回転を取得する基本

`Range.getTextRotation()`メソッドは、Google Apps Scriptにおいて、**指定したセル範囲（Rangeオブジェクト）の「左上のセル」に設定されているテキスト回転情報**を`TextRotation`オブジェクトとして取得するための機能です。

`TextRotation`オブジェクトには、以下の主要なプロパティが含まれています。

*   **`getDegrees()`**: テキストの回転角度を-90度から90度の範囲の整数値で返します。
*   **`isVertical()`**: テキストが縦書きに設定されているかどうかを真偽値（`true`/`false`）で返します。

このメソッドを使用することで、プログラム内でセルのテキストがどのように回転表示されるように設定されているかを詳細に識別できます。

### 基本的な使用例：B2セルのテキスト回転設定を取得する

以下のスクリプトは、アクティブなシートの`B2`セルを指定し、そのテキスト回転角度と縦書き状態を取得してログに出力する最も基本的な例です。

```javascript
/**
 * アクティブなシートのB2セルのテキスト回転設定を取得し、ログに出力する関数。
 */
function getSingleCellTextRotation() {
  const sheet = SpreadsheetApp.getActiveSheet(); // アクティブなシートを取得
  const cell = sheet.getRange("B2");           // B2セルをRangeオブジェクトとして取得
  const textRotation = cell.getTextRotation();  // B2セルのTextRotationオブジェクトを取得
  
  // TextRotationオブジェクトから回転角度と縦書き状態を取得しログに出力
  Logger.log(`B2セルのテキスト回転角度: ${textRotation.getDegrees()}度`);
  Logger.log(`B2セルの縦書き状態: ${textRotation.isVertical() ? "有効" : "無効"}`);
}
```
このコードを実行すると、`B2`セルに設定されているテキストの回転角度と縦書き状態がログに表示されます。

### テキスト回転角度の仕組みと注意点

*   **角度の範囲**: スプレッドシートでは、テキストの回転角度は通常-90度から90度の間で設定されます。
*   **縦書きと角度**: `isVertical()`が`true`（縦書き設定）の場合、`getDegrees()`で取得される角度は**常に0度**となります。これは、縦書き設定が優先され、個別の回転角度設定は無視されるためです。縦書きのテキストをさらに回転させたい場合は、`isVertical(false)`で縦書きを解除してから角度を設定する必要があります。

## `getTextRotation()`と`getTextRotations()`の違い：一括処理の重要性

GASには、セルのテキスト回転に関連する情報を取得するための類似メソッドとして`getTextRotations()`も存在します。それぞれの違いを理解し、目的と状況に応じて適切に使い分けることが、効率的で堅牢なスクリプト開発に繋がります。

| メソッド名 | 戻り値の型 | 対象範囲 | API呼び出し効率 |
| :--- | :--- | :--- | :--- |
| `getTextRotation()` | `TextRotation`オブジェクト | 指定範囲の**左上の単一セル**のみ | 単一セル向け |
| `getTextRotations()` | `TextRotation[][]`オブジェクトを含む二次元配列 | 指定範囲内の**全セル** | 複数セルの一括処理に最適 |

**パフォーマンスの観点**:
複数のセルのテキスト回転設定を取得したい場合、`getTextRotation()`をループ内で繰り返し呼び出すのは**非効率的**です。GASのベストプラクティスとして、API呼び出し回数を削減するために、**`getTextRotations()`を使用して一括で二次元配列として取得するバッチ処理**を強く推奨します。

```javascript
/**
 * 複数範囲のセルのテキスト回転情報を一括取得し、ログに出力する関数。
 * getRange("B2:D4") の場合、[[B2の回転, C2の回転, D2の回転], [B3の回転, ...]] の形式で返されます。
 */
function getRangeTextRotations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("B2:D4"); // 対象範囲をB2:D4に設定
  const rotations = range.getTextRotations(); // 範囲内の全セルのTextRotationオブジェクトを一括取得
  
  Logger.log(`B2:D4範囲のテキスト回転情報:\n${JSON.stringify(rotations.map(row => row.map(r => ({degrees: r.getDegrees(), vertical: r.isVertical()}))), null, 2)}`);

  // 各セルのアドレスと共に回転角度と縦書き状態を出力する例
  rotations.forEach((rowRotations, rowIndex) => {
    rowRotations.forEach((cellRotation, colIndex) => {
      // getCell(row, column) は1から始まるインデックス
      const cellAddress = range.getCell(rowIndex + 1, colIndex + 1).getA1Notation();
      Logger.log(`セル ${cellAddress}: 角度 ${cellRotation.getDegrees()}度, 縦書き ${cellRotation.isVertical() ? "有効" : "無効"}`);
    });
  });
}
```

## `getTextRotation()`の実践的な応用テクニック

`getTextRotation()`とその関連メソッドは、スプレッドシートの視覚的表現を自動化し、データ分析やレポート作成を支援する多岐にわたる場面で真価を発揮します。

### 1. 特定の角度に回転したセルを自動でハイライトする

特定の回転角度を持つセルを自動で検出し、背景色を変更することで視覚的に強調する機能は、レビューやデータ分析で非常に役立ちます。

```javascript
/**
 * 45度に回転したセルを自動で検索し、特定の背景色でハイライトする関数。
 */
function highlightSpecificRotations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange(); // シート内のデータが存在する全範囲を取得
  const rotations = dataRange.getTextRotations(); // 全範囲のテキスト回転情報を一括取得
  
  Logger.log("45度回転のセルを検索し、ハイライト中...");

  rotations.forEach((rowRotations, rowIndex) => {
    rowRotations.forEach((cellRotation, colIndex) => {
      // getDegrees()で回転角度をチェック
      if (cellRotation.getDegrees() === 45) {
        // 該当セルをハイライト (例: 薄い黄色)
        sheet.getRange(dataRange.getRowIndex() + rowIndex, dataRange.getColumnIndex() + colIndex)
          .setBackground("#FFF2CC"); // setBackground() で背景色を設定
        Logger.log(`セル ${sheet.getRange(dataRange.getRowIndex() + rowIndex, dataRange.getColumnIndex() + colIndex).getA1Notation()} をハイライトしました (45度)。`);
      }
    });
  });
  Logger.log("ハイライト処理が完了しました。");
}
```

### 2. 特定のセルの回転書式を別の範囲に複製する

既存のセルのテキスト回転設定を、別の複数のセルに一括でコピーしたい場合、`getTextRotation()`と`setTextRotation()`を組み合わせることで簡単に実現できます。

```javascript
/**
 * 特定のセルのテキスト回転書式を、別のセル範囲に複製する関数。
 * 例: E5セルの回転設定をB2:D4範囲に適用します。
 */
function copyTextRotationFormat() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const sourceCell = sheet.getRange("E5"); // コピー元となるセル
  const targetRange = sheet.getRange("B2:D4"); // コピー先となる範囲
  
  const rotationTemplate = sourceCell.getTextRotation(); // コピー元のTextRotationオブジェクトを取得
  targetRange.setTextRotation(rotationTemplate); // コピー先の範囲に一括で設定
  Logger.log(`セル ${sourceCell.getA1Notation()} のテキスト回転設定を、範囲 ${targetRange.getA1Notation()} に複製しました。`);
}
```
これにより、統一されたレイアウトを効率的に適用できます。

## まとめ：`getTextRotation()`でGASスプレッドシートの視覚的表現を自動化

Google Apps Scriptの`getTextRotation()`および`getTextRotations()`メソッドは、スプレッドシートのテキスト回転設定をプログラムで効率的に管理するための、非常に強力なツールです。

*   **正確なテキスト回転情報の取得**: `getTextRotation()`で単一セルの回転角度や縦書き状態を、`getTextRotations()`で複数セルの情報を一括で取得できます。縦書き設定時の角度の挙動に注意が必要です。
*   **視覚的表現の自動化**: 特定の条件（例: 回転角度）に基づいてセルをハイライトしたり、既存の書式設定を効率的に複製したりすることで、データ分析レポートの視認性を向上させ、手間を削減できます。
*   **効率的なスクリプト開発**: バッチ処理（`getTextRotations()`, `setTextRotations()`）を徹底することで、API呼び出し回数を減らし、スクリプトのパフォーマンスを最大化できます。

本記事で紹介した知識と実践例を活用し、あなたのGASスクリプトをより高度で柔軟なスプレッドシート自動化ツールへと進化させてください。テキスト回転の細かな制御は、スプレッドシートの表現力を高め、ユーザーエクスペリエンスの向上に大きく貢献します。

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range" >}} 
  
{{< blog-card "https://gsuiteguide.jp/sheets/gettextrotation/" >}}

{{< blog-card "https://developers.google.com/apps-script/guides/support/best-practices" >}}
