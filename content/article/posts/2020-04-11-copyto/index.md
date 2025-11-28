---
title: "【GAS】copyToメソッドでシートをコピー・複製する基本から応用まで解説"
description: "Google Apps Script (GAS) の `copyTo` メソッドを使って、スプレッドシートのシートを効率的にコピー・複製する方法を解説します。基本的な使い方から、複数シートの一括コピー、エラーハンドリング、実用的な応用例まで、サンプルコード付きで詳しく紹介。業務効率化に繋がるテクニックが満載です。"
tags: ["GAS","Google Apps Script","スプレッドシート", "copyTo"]
date: "2020-04-11T10:15:48.000Z"
url: "/gas/copyto"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年4月"]
lastmod: "2025-11-25T23:18:00.000Z"
---

Google Apps Script（GAS）でスプレッドシートを操作する際、`copyTo()`メソッドは非常に強力で便利な機能です。このメソッドを活用することで、シートの複製や別スプレッドシートへのデータコピーが簡単に行え、定型業務の自動化や効率化に大きく貢献します。

この記事では、`copyTo()`メソッドの基本的な使い方から、複数シートの一括コピー、エラー処理を組み込んだ応用テクニックまで、実用的なサンプルコードを交えて分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `copyTo()`メソッドの基本構文

はじめに、`copyTo()`メソッドの基本的な構文を確認しましょう。

```javascript
// 指定したスプレッドシートにシートをコピーする
Sheet.copyTo(spreadsheet);
```

このメソッドは、`Sheet`オブジェクト（コピー元のシート）を、引数で指定した`spreadsheet`オブジェクト（コピー先のスプレッドシート）に複製します。コピー先のシートは新しく作成され、元のシートのデータや書式設定、保護範囲などもすべて引き継がれるため、テンプレートからのシート生成などに非常に便利です。

### 同じスプレッドシート内でシートを複製する

最も基本的な使い方として、現在開いているスプレッドシート内でシートを複製する例を見てみましょう。

```javascript
function duplicateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const templateSheet = ss.getSheetByName('テンプレート');

  // テンプレートシートを同じスプレッドシート内にコピー
  const newSheet = templateSheet.copyTo(ss);

  // 分かりやすいように新しいシートに名前を付ける
  const formattedDate = Utilities.formatDate(new Date(), 'JST', 'yyyyMMdd');
  newSheet.setName(`データ_${formattedDate}`);
}
```

このスクリプトを実行すると、「テンプレート」という名前のシートが複製され、「データ_（今日の日付）」という名前の新しいシートが作成されます。

## 応用的な使い方

基本的な使い方を理解したところで、より実用的な応用例をいくつか紹介します。

### 複数シートを一括でコピーする

複数のシートを一度にコピーしたい場合は、ループ処理を利用します。以下の関数は、シート名の配列を受け取り、指定したスプレッドシートに一括でコピーします。

```javascript
function batchCopySheets(sheetNames, destinationSpreadsheet) {
  const sourceSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  sheetNames.forEach((name, index) => {
    const sourceSheet = sourceSpreadsheet.getSheetByName(name);
    if (sourceSheet) {
      // コピーを実行
      const newSheet = sourceSheet.copyTo(destinationSpreadsheet);
      newSheet.setName(`${name}_COPY_${index + 1}`);
      
      // GASの実行時間制限を避けるため、適宜スリープを挟む
      if ((index + 1) % 5 === 0) {
        Utilities.sleep(1000); // 1秒待機
      }
    }
  });
}
```

大量のシートをコピーする際は、GASの実行時間制限（通常6分）に注意が必要です。`Utilities.sleep()`を挟むことで、サーバーへの負荷を軽減し、タイムアウトエラーを防ぐことができます。

### エラーハンドリングを組み込んだ安全なコピー処理

実務でスクリプトを運用する際には、予期せぬエラーへの対策が不可欠です。「テンプレートシートが存在しなかった」「コピー先のシート名が重複していた」といったケースを想定し、`try...catch`ブロックでエラーハンドリングを実装しましょう。

```javascript
function safeCopySheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const templateSheet = ss.getSheetByName('テンプレート');
    
    // テンプレートシートの存在チェック
    if (!templateSheet) {
      throw new Error('「テンプレート」シートが見つかりません。');
    }
    
    const newSheet = templateSheet.copyTo(ss);
    
    // 重複しないシート名を生成
    let sheetName = 'コピーシート';
    let counter = 1;
    while (ss.getSheetByName(sheetName)) {
      sheetName = `コピーシート_${counter}`;
      counter++;
    }
    newSheet.setName(sheetName);

  } catch (e) {
    // エラー内容をログに出力し、ユーザーに通知する
    console.error(`エラーが発生しました: ${e.message}`);
    SpreadsheetApp.getUi().alert(`処理に失敗しました: ${e.message}`);
  }
}
```

このように堅牢なエラー処理を実装することで、スクリプトが意図せず停止するのを防ぎ、安定した運用が可能になります。

## まとめ

`copyTo()`メソッドは、GASにおけるスプレッドシート操作の基本でありながら、非常に奥の深い機能です。基本的な使い方をマスターするだけで作業効率は格段に向上し、応用テクニックを組み合わせることで、より複雑な業務プロセスの自動化も実現できます。

今回紹介したサンプルコードを参考に、ぜひご自身の業務改善に`copyTo()`メソッドを活用してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://kuronn.com/article/sheetcopy-gas/" >}} 
  
{{< blog-card "https://coporilife.com/423/" >}} 
  
{{< blog-card "https://coporilife.com/379/" >}} 
  
{{< blog-card "https://auto-worker.com/blog/?p=2401" >}} 
  
{{< blog-card "https://for-dummies.net/gas-noobs/how-to-make-a-copy-of-files/" >}} 
  
{{< blog-card "https://blog.take-it-easy.site/gas/gas-copyto/" >}} 
  
{{< blog-card "https://strong-engineer.com/gas/google-drive-folder-copy/" >}} 
  
{{< blog-card "https://techuplife.tech/gas-ss-rmovecopyclear/" >}}
