---
title: GASでスプレッドシートの外部連携用ソースURLを取得する方法
author: arukayies
type: post
date: 2020-06-11T14:50:07+00:00
excerpt: GASを使って、外部連携用にスプレッドシートのソースURLを取得する方法を紹介します！
url: /gas/getdatasourceurl
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1591887007
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
  - 2025-03-07 22:18:03
categories:
  - GAS
tags:
  - GAS
  - getDataSourceUrl()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
こんにちは！今日は、Google Apps Script（GAS）の`getDataSourceUrl()`メソッドについて詳しく解説するばい。このメソッド、スプレッドシートのデータを外部からアクセスできるようにするために使える、めっちゃ便利な機能なんよ。もし、データを外部システムと連携させたいとか、リアルタイムでデータ可視化したいって考えているなら、ぜひ覚えておきたいところやけ。

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

## 基本的な使い方と仕様

### getDataSourceUrl()メソッドって何？

まず、`getDataSourceUrl()`は、Google スプレッドシート内の指定した範囲のデータを、外部からアクセス可能なURLに変換するためのメソッドなんよ。簡単に言うと、このURLを使えば、スプレッドシート内のデータにアクセスして、JSON形式でデータを取得できるんやけど、スプレッドシートの公開設定が必要な点に気をつけてね。

### 実行の条件は？

<ol class="wp-block-list">
  <li>
    スプレッドシートを「リンクを知っている全員」に公開する必要があるんよ。
  </li>
  <li>
    スクリプトに適切な権限を与える必要がある。
  </li>
  <li>
    データ範囲はきちんと指定することが大切やけ、<code>getRange()</code>を使って正確に設定せんとあかん。
  </li>
</ol>

<pre class="wp-block-code"><code>// 基本的なコード例
function generateDataSourceUrl() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('売上データ');
  const dataRange = sheet.getRange('A2:F100');
  
  const sourceUrl = dataRange.getDataSourceUrl();
  console.log('生成されたデータソースURL:', sourceUrl);
}
</code></pre>

このように、スプレッドシート内の範囲を指定して、`getDataSourceUrl()`を使うと、URLが生成されるんよ。

## 実践的な活用方法

### 外部システムと連携する方法

`getDataSourceUrl()`を使うと、Webアプリケーションやクラウドサービスにデータを連携させることができるばい。例えば、外部のWebアプリからデータを取得したいときは、こんな感じでURLを使うことができるんやけ。

<pre class="wp-block-code"><code>fetch(dataSourceUrl)
  .then(response =&gt; response.json())
  .then(data =&gt; {
    const rows = data.table.rows;
    rows.forEach(row =&gt; {
      console.log(row.c.map(cell =&gt; cell.v));
    });
  });
</code></pre>

こんなふうに、データをJSON形式で受け取って、それを利用することができるんやけど、いろんなサービスとの連携が簡単にできるけん、応用が効くよ。

### クラウドサービスとの連携

たとえば、Google BigQueryにデータを定期的に取り込むとか、Google Data Studioで可視化したいときにもこのURLが役立つんよ。特に、スプレッドシートをデータソースに使いたい場合、`getDataSourceUrl()`があると便利やね。

## パフォーマンスを最適化する方法

大きなデータセットを扱うときは、パフォーマンスの最適化が重要やけ。ここでは、キャッシュを使って効率的にデータを管理する方法を紹介するけど、`CacheService`を使えばURLをキャッシュして、何度も同じURLを取得せんでもよくなるんよ。

<pre class="wp-block-code"><code>const cache = CacheService.getScriptCache();
const cachedUrl = cache.get('dataSourceUrl');
  
if (!cachedUrl) {
  const newUrl = range.getDataSourceUrl();
  cache.put('dataSourceUrl', newUrl, 21600); // 6時間キャッシュ
}
</code></pre>

こんなふうにキャッシュをうまく使うことで、パフォーマンスを改善できるけん、大きなデータを扱う際には試してみる価値ありよ。

## セキュリティの注意点

スプレッドシートのデータを外部システムと共有するときは、セキュリティにも注意せなあかんよ。特に、URLが漏れると誰でもアクセスできてしまうから、共有設定をしっかり見直すことが大切やけ。

<ul class="wp-block-list">
  <li>
    <strong>URLの有効期限を短く設定する</strong>：URLを定期的に再生成して、漏洩リスクを減らすんやけ。
  </li>
  <li>
    <strong>アクセス制御</strong>：編集者やオーナー以外の人には閲覧専用にして、データ改ざんを防ぐ。
  </li>
</ul>

## 実装のヒントとトラブルシューティング

### よくあるエラー

<ul class="wp-block-list">
  <li>
    <strong>403 Forbiddenエラー</strong>：権限が不足している場合に発生するけん、スプレッドシートの共有設定やOAuthスコープを確認してみてね。
  </li>
  <li>
    <strong>データフォーマット不一致</strong>：<code>type</code>プロパティと実際のデータが一致していないときは、データ型を確認して修正する必要があるけ。
  </li>
</ul>

### デバッグ方法

もし、うまくいかんときは、`UrlFetchApp`を使って直接レスポンスを確認する方法があるよ。エラーメッセージをきちんと見ることで、問題を素早く解決できるけ。

<pre class="wp-block-code"><code>function debugDataSource() {
  const range = sheet.getRange('A1:C10');
  console.log('範囲情報:', range.getA1Notation());
  
  try {
    const url = range.getDataSourceUrl();
    const response = UrlFetchApp.fetch(url);
    console.log('レスポンス:', response.getContentText());
  } catch (e) {
    console.error('エラー発生:', e.message);
  }
}
</code></pre>

こんなふうに、エラーメッセージをチェックしながら問題を解決することができるんよ。

## 結論

`getDataSourceUrl()`は、Google Apps Scriptでデータを外部システムと連携させるために非常に強力なツールやけ。正しく実装すれば、スプレッドシートのデータを効率的に活用して、さまざまなシステムと連携できるようになるんよ。セキュリティとパフォーマンスの最適化に注意しながら、活用していこうね！

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
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/v542d3325b8c925a6e7dd14f19a8348c865acec191636e2a431745f59e1ae1e12/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/v542d3325b8c925a6e7dd14f19a8348c865acec191636e2a431745f59e1ae1e12/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
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
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a>
</div>
