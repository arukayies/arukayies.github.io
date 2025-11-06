---
title: GASでスプレッドシートの値や書式を柔軟に削除する方法
author: arukayies
type: post
date: 2020-03-14T05:09:10+00:00
excerpt: GASでスプレッドシートの値を指定されたオプションで 削除する方法を紹介します！
url: /gas/clearoptions
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
snapEdIT:
  - 1
last_modified:
  - 2025-03-07 22:44:00
categories:
  - GAS
tags:
  - clear(options)
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）って、スプレッドシートを便利に操作できるツールばい。その中でも`clear(options)`メソッドは、特定の範囲からデータや書式を選んで消すことができる機能なんよ。この記事では、このメソッドの使い方や実際の活用例を詳しく解説するけん、ぜひ参考にしてみてな。

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

## clear(options)メソッドの基本的な使い方

`clear(options)`メソッドは、スプレッドシートの「範囲」に適用することで、選択したデータだけを消せるんだよ。このメソッドは、以下のように呼び出して使うばい。

<pre class="wp-block-code"><code>range.clear({
  contentsOnly: true,   // 値と数式のみ
  formatOnly: true,     // 書式だけ
  commentsOnly: true,   // コメントだけ
  validationsOnly: true,// データ検証だけ
  skipFilteredRows: true // フィルタで非表示の行はスキップ
});
</code></pre>

オプションを組み合わせることで、必要なデータだけを削除できるから、スプレッドシートを効率的に操作できるんよ。

### オプションの詳細

<table class="has-fixed-layout">
  <tr>
    <th>
      オプション
    </th>
    
    <th>
      影響範囲
    </th>
    
    <th>
      補足
    </th>
  </tr>
  
  <tr>
    <td>
      <code>contentsOnly</code>
    </td>
    
    <td>
      セルの値や数式
    </td>
    
    <td>
      数式自体ではなく結果を削除
    </td>
  </tr>
  
  <tr>
    <td>
      <code>formatOnly</code>
    </td>
    
    <td>
      フォントや背景色などの書式
    </td>
    
    <td>
      条件付き書式は削除されない
    </td>
  </tr>
  
  <tr>
    <td>
      <code>commentsOnly</code>
    </td>
    
    <td>
      セルに紐づくコメント
    </td>
    
    <td>
      コメントは完全に削除される
    </td>
  </tr>
  
  <tr>
    <td>
      <code>validationsOnly</code>
    </td>
    
    <td>
      データ検証規則
    </td>
    
    <td>
      ドロップダウンリストなどを解除
    </td>
  </tr>
  
  <tr>
    <td>
      <code>skipFilteredRows</code>
    </td>
    
    <td>
      フィルタ適用された行
    </td>
    
    <td>
      非表示の行を処理から除外
    </td>
  </tr>
</table></figure> 

例えば、値とコメントだけ消したい場合は、次のように書くんよ。

<pre class="wp-block-code"><code>range.clear({
  contentsOnly: true, 
  commentsOnly: true
});
</code></pre>

こんなふうに、消したい部分を自由に選べるけん、便利やろ？

## 実際に使ってみよう！活用例

ここからは、具体的な使用例をいくつか紹介するけん、実践的なシーンでどう活用できるか見ていこうばい。

### 1. フォームのリセット

データ入力フォームのリセットをしたいとき、ユーザーが入力した値を消しつつ、ドロップダウンリストなどの設定を残す場合には、以下のように使えるばい。

<pre class="wp-block-code"><code>function resetForm() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('入力フォーム');
  const inputRange = sheet.getRange('B2:F10');
  
  inputRange.clear({
    contentsOnly: true,
    validationsOnly: false // ドロップダウンリストは残す
  });
}
</code></pre>

これでフォームを簡単にリセットできるけど、リストなどのUI部分はそのまま保たれるけん、便利やろ？

### 2. レポートテンプレートの初期化

レポートの書式をリセットしたいけど、データはそのままにしたい時には、こんな感じで使えるよ。

<pre class="wp-block-code"><code>function initializeTemplate() {
  const templateSheet = SpreadsheetApp.getActive().getSheetByName('月次レポート');
  const formatArea = templateSheet.getRange('A1:M50');
  
  formatArea.clear({
    formatOnly: true,
    skipFilteredRows: true // 非表示のサマリー行は保持
  });
}
</code></pre>

これで書式だけをきれいにリセットできるけん、便利に使ってみてな。

## パフォーマンスを最適化する方法

処理が遅くならないように、効率よく`clear`メソッドを使うことも大事やけん、以下のポイントを押さえておこう。

<ol class="wp-block-list">
  <li>
    <strong>バッチ処理の活用</strong>： 何回も<code>clear()</code>を呼び出すよりも、まとめて処理したほうが効率的なんよ。 <code>sheet.getRangeList(['A1:B10', 'D1:E10']).getRanges() .forEach(r =&gt; r.clear({ contentsOnly: true }));</code>
  </li>
  <li>
    <strong>不要なオプションを避ける</strong>： オプションが増えると、処理に時間がかかる場合があるけん、必要ないものは指定しないようにしよう。
  </li>
  <li>
    <strong>スクリプトプロパティとの連携</strong>： 設定を外部から読み込むことで、柔軟にオプションを変えることができるよ。 <code>const clearSettings = PropertiesService.getScriptProperties().getProperty('CLEAR_OPTIONS'); range.clear(JSON.parse(clearSettings));</code>
  </li>
</ol>

これらを活用して、より効率的にデータを管理できるようになるばい。

## セキュリティ面も忘れずに

データを消すときには、セキュリティにも気をつけんといけんよね。操作履歴をログとして記録したり、権限を設定して不正な操作を防ぐことも重要やけん、以下のようにしてみよう。

<pre class="wp-block-code"><code>function loggedClear(range, options) {
  const auditSheet = SpreadsheetApp.getActive().getSheetByName('監査ログ');
  
  auditSheet.appendRow(&#91;
    new Date(),
    Session.getActiveUser().getEmail(),
    JSON.stringify(options),
    range.getA1Notation()
  ]);
  
  range.clear(options);
}
</code></pre>

こんなふうにログを取っておくことで、誰がどんな操作をしたか確認できるけん、安全やろ？

## 結論

`clear(options)`メソッドは、Google Apps Scriptでスプレッドシートの管理を効率化する強力なツールばい。オプションを上手に使うことで、データや書式の削除を柔軟に行えるけん、日々の業務にも活用できるばい。ただし、大規模なデータや複雑な処理になると、パフォーマンスが低下することもあるけん、そのあたりはしっかり最適化して使ってほしいんよ。

もし今すぐにでも使いたいなら、まずは簡単なスクリプトから試してみて、少しずつ慣れていくといいよ。試行錯誤しながら、自分の作業を効率化していこうね！

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

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://kujiride.com/2024/04/11/google-apps-script-gas-how-to-delete-values-in-a-sheet/" title="Google Apps Script (GAS) シートの値を削除する方法 | くじらいどブログ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://kujiride.com/wp-content/uploads/2024/04/18.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://kujiride.com/wp-content/uploads/2024/04/18.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Script (GAS) シートの値を削除する方法 | くじらいどブログ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GASを使用してシートの値を削除するには、clear()メソッドを使用します。 シートに値を入力するsetValue()についての記事もありますのでぜひ！ function clear() { // 現在アクティブなスプレッドシートのシート
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://kujiride.com/2024/04/11/google-apps-script-gas-how-to-delete-values-in-a-sheet/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://kujiride.com/2024/04/11/google-apps-script-gas-how-to-delete-values-in-a-sheet/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          kujiride.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/v90b15eef664021f94a1ab8a4ca14c533325a9006d6183b165fb79714a6fcd6a0/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/v90b15eef664021f94a1ab8a4ca14c533325a9006d6183b165fb79714a6fcd6a0/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Class Range  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/clearoptions/" title="オプションを指定してセル範囲にある全ての値と書式をクリアする：clear(options)【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="http://gsuiteguide.jp/wp-content/uploads/cover_googlespreadsheet-486x290.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="http://gsuiteguide.jp/wp-content/uploads/cover_googlespreadsheet-486x290.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        オプションを指定してセル範囲にある全ての値と書式をクリアする：clear(options)【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        clear(options) オプションを指定してセル範囲にある全ての値と書式をクリアする。 サンプルコード // 現在アクティブなシートにある指定のセル範囲のデータを値だけ全て削除 SpreadsheetApp.getActiveShee...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/clearoptions/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/clearoptions/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a>
</div>
