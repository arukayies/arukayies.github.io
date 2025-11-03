---
title: GASでスプレッドシートのセル書式を一括クリアする方法
author: arukayies
type: post
date: 2020-03-14T07:37:29+00:00
excerpt: GASでスプレッドシートの指定範囲の書式のみを 削除する方法を紹介します！
url: /gas/clearformat
share: true
toc: true
comment: true
page_type:
  - default
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1
last_modified:
  - 2025-03-07 22:44:55
categories:
  - GAS
tags:
  - clearFormat()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
こんにちは！Google Apps Script（GAS）でスプレッドシートを使っているあなたに、便利なメソッド「`clearFormat()`」の使い方を紹介するばい。これを使うことで、スプレッドシートの書式設定をリセットできるんじゃ。データの視覚的な装飾を一括で消したいときや、定型フォーマットを整えたいときにすごく役立つんだ。

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

<hr class="wp-block-separator has-alpha-channel-opacity" />

## clearFormat()メソッドって何？

簡単に言うと、`clearFormat()`はスプレッドシートの**セルの書式設定**を消すメソッドばい。でもね、値や数式には影響を与えないんだよ。たとえば、赤い背景色や太字で表示された数字があったとしても、これを使うと背景色や太字だけが消えて、数字自体はそのまま残るってわけ。

<pre class="wp-block-code"><code>// A1からC10の範囲の書式をクリアするサンプルコード
const sheet = SpreadsheetApp.getActiveSheet();
sheet.getRange("A1:C10").clearFormat();
</code></pre>

このコードを実行すれば、A1からC10の範囲に適用されている書式が全てクリアされるけど、データ自体はそのままだよ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 他のメソッドとの違い

`clearFormat()`とよく似たメソッドに、`clear()`や`clearContent()`があるんじゃけど、それぞれの違いを理解しておくと便利だよ。

### 1. clear()

<ul class="wp-block-list">
  <li>
    <strong>作用対象</strong>: データも書式も両方クリア
  </li>
  <li>
    <strong>使用例</strong>: テンプレートの完全リセット
  </li>
</ul>

<pre class="wp-block-code"><code>range.clear(); // 値と書式の完全削除
</code></pre>

### 2. clearContent()

<ul class="wp-block-list">
  <li>
    <strong>作用対象</strong>: データ（値や数式）のみクリア
  </li>
  <li>
    <strong>使用例</strong>: データだけ更新したいとき
  </li>
</ul>

<pre class="wp-block-code"><code>range.clearContent(); // 値だけ削除
</code></pre>

### 3. clearFormat()

<ul class="wp-block-list">
  <li>
    <strong>作用対象</strong>: 書式設定のみクリア
  </li>
  <li>
    <strong>使用例</strong>: 視覚的なリセットだけしたいとき
  </li>
</ul>

<pre class="wp-block-code"><code>range.clearFormat(); // 書式だけ削除
</code></pre>

それぞれ、用途によって使い分けるといいけんね。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 動的範囲指定での活用法

固定範囲ではなく、動的に範囲を設定して書式をクリアする方法もあるけん。例えば、データが増減するシートの場合、`getLastRow()`メソッドを使うことで、最新のデータ範囲を自動で取得できるんよ。

<pre class="wp-block-code"><code>function dynamicClearFormat() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SalesData');
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  // ヘッダー行を除いて、データ範囲の書式をクリア
  if(lastRow > 1) {
    sheet.getRange(2, 1, lastRow-1, lastColumn).clearFormat();
  }
}
</code></pre>

これで、データが追加されても自動で範囲を取得して書式リセットができるんじゃ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 他のメソッドとの組み合わせ

`clearFormat()`を使うだけでも便利だけど、他のメソッドと組み合わせることで、もっと便利に使えるけんね。たとえば、月次レポートを更新する場合、データを消したり書式をリセットしたりするだけでなく、新しい書式を一括で設定できるんじゃ。

<pre class="wp-block-code"><code>function monthlyReportReset() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MonthlyReport');
  const dataRange = sheet.getRange("B2:M50");
  
  // 段階的なクリア処理
  dataRange.clearContent();  // 既存データ削除
  dataRange.clearFormat();   // 書式リセット
  
  // 新規書式設定
  dataRange.setBackground('#ffffff');
  dataRange.setFontFamily('Arial');
  dataRange.setHorizontalAlignment('center');
}
</code></pre>

このように、データと書式を分けてクリアした後、必要な書式を新たに設定できるけん、効率的だよ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## パフォーマンス最適化

大量のデータを扱う場合、パフォーマンスが気になることがあるけん、最適化を考える必要があるんよ。たとえば、バッチ処理を使って一度に大量の書式を処理することで、スクリプトの実行速度が向上するんだ。

<pre class="wp-block-code"><code>function optimizePerformance() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:Z1000");
  
  // 書式プロパティの一括取得
  const formats = range.getTextStyles();
  
  // 変更処理（例：太字の解除）
  formats.forEach(row => row.forEach(cell => cell.setBold(false)));
  
  // 一括設定
  range.setTextStyles(formats);
}
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 実践的なユースケース

例えば、販売データの書式を統一したいときなんかに`clearFormat()`は大活躍するんよ。

<pre class="wp-block-code"><code>function standardizeSalesReport() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sales');
  const reportRange = sheet.getRange("A2:M" + sheet.getLastRow());
  
  reportRange.clearFormat();
  reportRange.setNumberFormat("#,##0");
  reportRange.setBorder(true, true, true, true, true, true);
}
</code></pre>

これで、毎月新しいデータが追加されても、書式が統一されるから便利だね。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 結論

`clearFormat()`は、Google Apps Scriptでスプレッドシートを効率的に管理するために欠かせないメソッドばい。データの視覚的一貫性を保ちながら、書式のリセットや最適化を行えるから、プロジェクトの運営やレポート作成の効率がグッと上がるよ。

これを活用すれば、作業がラクになるし、スプレッドシートの管理がしやすくなるけん、ぜひ試してみてけ！

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
<task_progress>
- [x] Analyze requirements
- [ ] Examine search implementation
- [x] Check for search index file
- [x] Trigger Hugo build
- [x] Read problematic content file
- [x] Correct YAML front matter
- [x] Re-run Hugo build
- [x] Investigate new file path error
- [x] Read the actual problematic file
- [x] Read the next problematic file
- [x] Read the next problematic file
- [ ] Verify search index generation
- [ ] Fix search functionality
- [ ] Incorporate latest changes
- [ ] Merge changes
- [ ] Commit changes
</task_progress>
</write_to_file>
