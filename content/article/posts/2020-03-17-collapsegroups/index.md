---
title: "GASでスプレッドシートのグループ化された行・列を一括で折りたたむ方法"
description: "Google Apps Script（GAS）を使用して、スプレッドシートのグループ化された行や列を効率的に折りたたむ`collapseGroups()`メソッドの使い方を解説します。基本的な構文から、条件に応じた折りたたみ、実用的な応用例まで、サンプルコード付きで分かりやすく紹介。業務の自動化と効率化を目指す方におすすめです。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "collapseGroups()", "業務効率化"]
date: "2020-03-17T13:03:09.000Z"
url: "/gas/collapsegroups"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年3月"]
lastmod: "2025-11-26T17:39:26+09:00"
---

Google Apps Script（GAS）の`collapseGroups()`メソッドは、スプレッドシートのグループ化された行や列を操作する際に非常に便利な機能です。大量のデータを扱う際、このメソッドを使って関連する行や列を折りたたむことで、シートの可読性を大幅に向上させることができます。しかし、具体的な使い方や活用シーンがわからず、難しく感じている方もいるかもしれません。

本記事では、`collapseGroups()`メソッドの基本的な使い方から、実用的な実装例までを分かりやすく解説します。この記事を読めば、あなたもスプレッドシートのグループ管理を自動化し、業務効率を向上させることができるでしょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `collapseGroups()`メソッドとは？

`collapseGroups()`は、Google Apps Scriptの`Range`クラスに属するメソッドで、スプレッドシート上でグループ化された行や列をプログラムで折りたたむために使用します。このメソッドを活用することで、手動で操作することなく、特定のグループを非表示にし、シート全体を整理できます。

### 基本的な使い方

メソッドの基本的な構文は非常にシンプルです。以下のコードのように、折りたたみたい範囲（Range）に対して`collapseGroups()`を呼び出すだけで実行できます。

```javascript
function collapseActiveGroups() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange(); // 現在アクティブなセル範囲を取得
  range.collapseGroups(); // 範囲内のグループを折りたたむ
}
```

このスクリプトを実行すると、ユーザーが選択している範囲内に含まれるすべてのグループが折りたたまれます。

## 実装例と活用方法

### 1. グループ作成と同時に折りたたむ

グループを作成した直後に、そのグループを折りたたむ処理も簡単です。以下のコードは、指定した範囲に行と列のグループを作成し、即座に折りたたむ例です。

```javascript
function createAndCollapseGroup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const targetRange = sheet.getRange("B2:D5");
  
  // 範囲に対して行グループを作成
  targetRange.shiftRowGroupDepth(1);
  
  // 範囲に対して列グループを作成
  targetRange.shiftColumnGroupDepth(1);
  
  // 作成したグループを折りたたむ
  targetRange.collapseGroups();
}
```

この処理により、`B2:D5`の範囲をグループ化した後、自動的にそのグループが折りたたまれた状態になります。

### 2. 特定の条件でグループを折りたたむ

より実用的な使い方として、特定の条件に合致する行のグループのみを折りたたむ方法が考えられます。例えば、A列に「非表示」というステータスが入力されている行を対象とするスクリプトは以下のようになります。

```javascript
function conditionalCollapse() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  values.forEach((row, index) => {
    // A列の値が「非表示」の場合
    if (row[0] === "非表示") {
      const targetRange = sheet.getRange(index + 1, 1);
      // その行がグループ化されているか確認
      if (targetRange.getRowGroupDepth() > 0) {
        targetRange.collapseGroups(); // グループを折りたたむ
      }
    }
  });
}
```

このスクリプトを使えば、特定の条件を持つ行グループを自動的に非表示にでき、データのフィルタリングが容易になります。

## 応用事例：大規模なデータセットの管理

大量のデータを含むレポートなどで、初期表示では概要のみを見せ、詳細は折りたたんでおくと非常に見やすくなります。例えば、シートが開かれた際に特定の詳細セクションを自動で折りたたむスクリプトです。

```javascript
function initializeReportView() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("年度レポート");
  const detailSections = ["B8:B20", "D8:D15", "F5:F30"];
  
  detailSections.forEach(rangeAddress => {
    const range = sheet.getRange(rangeAddress);
    range.shiftRowGroupDepth(1); // グループ化
    range.collapseGroups();      // 折りたたみ
  });
}
```

このスクリプトをトリガー（例：シートを開いた時）に設定しておくことで、ユーザーは常に整理された状態でレポートを閲覧でき、必要な情報に素早くアクセスできます。

## トラブルシューティング

`collapseGroups()`を使用する際には、いくつかの一般的なエラーに遭遇する可能性があります。

### よくあるエラーと原因

*   **範囲指定の誤り**: メソッドを呼び出す範囲が、グループ全体を完全に含んでいない場合にエラーが発生します。
*   **グループ階層の制限**: スプレッドシートのグループ階層は最大8階層までです。これを超えてグループ化しようとするとエラーになります。
*   **権限不足**: スクリプトがスプレッドシートを編集する権限を持っていない場合、実行が失敗します。

### デバッグのヒント

*   `getRowGroupDepth()`や`getColumnGroupDepth()`メソッドを使い、対象範囲のグループ階層の深さをログに出力して確認しましょう。
*   `getA1Notation()`メソッドで範囲のアドレスを確認し、意図した通りの範囲が指定できているかデバッグします。

## まとめ

`collapseGroups()`メソッドは、Googleスプレッドシートの視覚的な整理とデータ管理を大幅に効率化する強力なツールです。基本的な使い方から条件に応じた応用まで、様々なシーンで活用できます。特に、日常的に大量のデータを扱う方にとって、このメソッドは業務の自動化と生産性向上に大きく貢献するでしょう。

ぜひ本記事を参考に、`collapseGroups()`をあなたのスプレッドシート管理に取り入れてみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}} 
  
{{< blog-card "https://caymezon.com/gas-group-collapse-expand/" >}} 
  
{{< blog-card "https://note.com/mir4545/n/ne44ba86db5b2" >}}

この記事が役に立ったと感じたら、ぜひ他の方にもシェアしてください。
