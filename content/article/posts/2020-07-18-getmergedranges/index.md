---
title: GASでスプレッドシートの指定範囲から結合セルを効率的に取得する方法
author: arukayies
type: post
date: 2020-07-17T16:03:20+00:00
excerpt: GASでスプレッドシートの指定範囲の結合セルを取得する方法を紹介します！
url: /gas/getmergedranges
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1595001802
page_type:
  - default
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 5
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-03-07 23:08:42
categories:
  - GAS
tags:
  - GAS
  - getMergedRanges()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）の`getMergedRanges()`メソッドは、スプレッドシートの結合セルを効率よく管理するために欠かせない機能だっちゃ。このメソッドを使えば、スプレッドシート内の結合セルを簡単に把握でき、データ処理を大幅にスムーズにすることができるんだよ。今回は、このメソッドの基本から応用まで、実際の使用例を交えながら、詳しく説明していくけんね。

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="20010009784798064741_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >詳解！Ｇｏｏｇｌｅ　Ａｐｐｓ　Ｓｃｒｉｐｔ完全入門 ＧｏｏｇｌｅアプリケーションとＧｏｏｇｌｅ　Ｗｏｒ 第３版/秀和システム/高橋宣成</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3Dgoogle%2520apps%2520script%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3Dgoogle%2520apps%2520script" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

## 結合セルとは？

スプレッドシートで「結合セル」っていうのは、複数のセルを一つにまとめたもの。これって、データの見栄えを良くするためや、複雑な表を整理するためには大事な機能なんだよね。Google Apps Scriptでは、結合セルの範囲を管理するために、`merge()`、`mergeAcross()`、`mergeVertically()`といったメソッドがあるんだが、これを使った後、`getMergedRanges()`を使って、その結合セルを取り出すことができるわけさ。

## getMergedRanges()メソッドってどんなもの？

`getMergedRanges()`は、特定の範囲内で結合されているセルの範囲を配列として返してくれるメソッドだっちゃ。公式の定義によると、結合セルの範囲を表す`Range`オブジェクトの配列を返すんだよ。例えば、A1からF10までの範囲を指定すると、その範囲内に結合されているセルの位置や値をリストアップできるんだよね。

### 基本的な使い方

<pre class="wp-block-code"><code>function getSampleMergedRanges() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('サンプルシート');
  const targetRange = sheet.getRange('A1:F10');
  const mergedAreas = targetRange.getMergedRanges();
  
  mergedAreas.forEach((range, index) =&gt; {
    console.log(`結合領域 ${index + 1}: ${range.getA1Notation()}`);
    console.log(`保持値: ${range.getDisplayValue()}`);
  });
}
</code></pre>

このコードでは、A1:F10範囲内の結合領域を検出し、それぞれの位置と表示されている値をコンソールに出力しているんだ。これだけで、結合セルの状態を簡単にチェックできるんだよ。

### 実践的な活用例

#### 動的レポート生成

例えば、月次の販売レポートで、ヘッダー部分が結合されている場合、その結合セルを自動で抽出して、データ処理を行うことができるんだ。

<pre class="wp-block-code"><code>function extractReportHeaders() {
  const reportSheet = SpreadsheetApp.getActive().getSheetByName('月次レポート');
  const headerRange = reportSheet.getRange('A1:Z5');
  const mergedHeaders = headerRange.getMergedRanges();
  
  const headerData = mergedHeaders.map(range =&gt; ({
    title: range.getDisplayValue(),
    position: range.getA1Notation(),
    columnSpan: range.getNumColumns()
  }));
  
  // ヘッダー構造に基づくデータ処理を実装
  processReportData(headerData);
}
</code></pre>

結合セルのタイトルや位置、列の幅を取得して、さらにそのデータを元に処理を進めることができるんだよ。

#### 結合セルの状態確認

<pre class="wp-block-code"><code>function validateMergedStructure() {
  const templateSheet = SpreadsheetApp.openById('テンプレートID').getSheetByName('フォーマット');
  const requiredMerges = &#91;
    { address: 'B2:D2', expectedValue: '部門別集計' },
    { address: 'F3:H5', expectedValue: '四半期比較' }
  ];

  requiredMerges.forEach(({ address, expectedValue }) =&gt; {
    const range = templateSheet.getRange(address);
    const merged = range.getMergedRanges();
    
    if (merged.length === 0 || merged&#91;0].getDisplayValue() !== expectedValue) {
      throw new Error(`テンプレート構造が不正です: ${address}`);
    }
  });
}
</code></pre>

テンプレートの結合構造が正しいかどうか、事前にチェックしておくこともできるんだよ。

## 注意点とベストプラクティス

`getMergedRanges()`を使う際に気を付けたいポイントがいくつかあるんだよ。

### 取得順序

このメソッドで取得される結合セルの順序は、必ずしもスプレッドシート上の順番通りではないんだよ。もし順番が大事な場合は、ソートをかけるといいさ。

<pre class="wp-block-code"><code>const mergedRanges = range.getMergedRanges()
  .sort((a, b) =&gt; a.getRow() - b.getRow() || a.getColumn() - b.getColumn());
</code></pre>

### 処理の最適化

大量のデータを処理する際は、`getDataRange()`と組み合わせることで効率的に処理ができるんだ。例えば、すべての結合セルを一括で取得する方法だね。

<pre class="wp-block-code"><code>function processAllMergedCells() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const allMerged = sheet.getDataRange().getMergedRanges();
  // 処理を最適化するためにバッチ処理などを実装
}
</code></pre>

## まとめ

`getMergedRanges()`は、Google Apps Scriptを使ったスプレッドシートの操作で、結合セルを効率的に扱うために非常に便利なメソッドだっちゃ。これをうまく活用すれば、レポート作成やデータ分析がグッと楽になるさ。最初は少し難しいかもしれんけど、実際に試してみると、その便利さがよくわかるけんね！

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="20010009784798064741_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >詳解！Ｇｏｏｇｌｅ　Ａｐｐｓ　Ｓｃｒｉｐｔ完全入門 ＧｏｏｇｌｅアプリケーションとＧｏｏｇｌｅ　Ｗｏｒ 第３版/秀和システム/高橋宣成</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3Dgoogle%2520apps%2520script%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3Dgoogle%2520apps%2520script" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

{{< blog-card "https://caymezon.com/gas-merge/" >}}
{{< blog-card "https://auto-worker.com/blog/?p=1986" >}}
{{< blog-card "https://techuplife.tech/gas-ss-rmerge/" >}}
{{< blog-card "https://teratail.com/questions/l1s3uj20zw048c" >}}
{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}
