---
title: GASでスプレッドシートの書式設定を別範囲に効率的にコピーする方法
author: arukayies
type: post
date: 2020-03-18T12:46:37+00:00
excerpt: GASでスプレッドシートの書式設定のみをコピーする方法を紹介します！
url: /gas/copyformattorange
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
  - 1584535599
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1248812552835850240";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1248812552835850240";s:5:"pDate";s:19:"2020-04-11 03:18:09";}}";
last_modified:
  - 2025-03-07 22:49:21
categories:
  - GAS
tags:
  - copyFormatToRange()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）を使ってスプレッドシートを効率的に操作できるんよ、そんな中でも注目すべきメソッドが「`copyFormatToRange`」ばい。これ、スプレッドシートの書式を他の範囲にコピーするための強力なツールさ。ここでは、このメソッドの使い方をわかりやすく解説するけん、ぜひ参考にしてくれ。

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

## copyFormatToRangeメソッドの基本

まず、このメソッドの基本から確認していくけ。以下がその構文やけど、ちょっと詳しく説明するけん、しっかり押さえてな。

<pre class="wp-block-code"><code>range.copyFormatToRange(gridId, column, columnEnd, row, rowEnd);
</code></pre>

### パラメータの説明

<ul class="wp-block-list">
  <li>
    <strong>gridId</strong>: コピー先のシートID（整数値で指定）
  </li>
  <li>
    <strong>column</strong>: コピー先の開始列番号（1から始まる）
  </li>
  <li>
    <strong>columnEnd</strong>: コピー先の終了列番号
  </li>
  <li>
    <strong>row</strong>: コピー先の開始行番号（1から始まる）
  </li>
  <li>
    <strong>rowEnd</strong>: コピー先の終了行番号
  </li>
</ul>

これを使うと、ある範囲の書式設定を別のシートやセル範囲に簡単にコピーできるけん、作業がぐっと楽になるんよ。

## 基本的な使い方

基本的な使い方として、例えば「テンプレートシートの書式を報告書シートに転送する」場合、こんな風に使うんよ。

<pre class="wp-block-code"><code>function basicCopyFormat() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName('テンプレート');
  const targetSheet = ss.getSheetByName('報告書');
  
  const sourceRange = sourceSheet.getRange('A1:F10');
  const targetGridId = targetSheet.getSheetId();
  
  sourceRange.copyFormatToRange(
    targetGridId,
    1, // 開始列
    6, // 終了列
    1, // 開始行
    10 // 終了行
  );
}
</code></pre>

こんな感じで、書式を転送するだけじゃなくて、範囲を指定して他のシートに適用できるんよ。これ、仕事の効率化にめっちゃ便利じゃけ、覚えといてな。

## 実践的なテクニック

次に、ちょっと高度な使い方を紹介するけん。これを使いこなすと、さらにスプレッドシートの操作が楽になるんよ。

### 動的範囲指定

例えばデータ量が変動する場合、以下のように動的に範囲を設定して書式をコピーすることができるけ。

<pre class="wp-block-code"><code>function dynamicRangeCopy() {
  const ss = SpreadsheetApp.getActive();
  const template = ss.getSheetByName('テンプレート');
  const report = ss.getSheetByName('月次報告');
  
  const lastRow = template.getLastRow();
  const lastCol = template.getLastColumn();
  
  template.getRange(1, 1, lastRow, lastCol)
    .copyFormatToRange(
      report.getSheetId(),
      1, lastCol,
      1, lastRow
    );
}
</code></pre>

このように、`getLastRow()`や`getLastColumn()`を使って、データが変わるたびに範囲を自動的に調整できるんよ。これで、毎月レポートを作成する時に役立つんじゃ。

### 条件付き書式のコピー

書式コピーだけじゃなくて、条件付き書式も転送できるんよ。例えば、こんな感じでやるんよ。

<pre class="wp-block-code"><code>function copyConditionalFormatting() {
  const ss = SpreadsheetApp.getActive();
  const source = ss.getSheetByName('基準データ');
  const target = ss.getSheetByName('分析結果');
  
  source.getRange('B2:D10').copyFormatToRange(
    target.getSheetId(),
    2, 4, 
    2, 10
  );
}
</code></pre>

条件付き書式も問題なくコピーできるけど、コピー先のデータ範囲に気をつけないと、思わぬエラーが出ることがあるけん、そこだけ注意してな。

## よくあるトラブルとその解決法

<ul class="wp-block-list">
  <li>
    <strong>Invalid gridIdエラー</strong>: シートIDが間違ってる場合は、<code>getSheetId()</code>で正しいIDを取得することが重要じゃけ。
  </li>
  <li>
    <strong>範囲サイズ不一致</strong>: コピー元とコピー先の範囲が異なると、書式が繰り返し適用されることがあるけん、範囲指定はしっかり確認してな。
  </li>
</ul>

もし何か不具合があったら、範囲やIDの指定をもう一度見直すとええけ。

## 最後に

Google Apps Scriptを使うと、手間をかけずにスプレッドシートの書式設定を一貫性を持ってコピーできるけん、特にテンプレート管理やレポート作成に強力なツールじゃ。最初はちょっと慣れが要るかもしれんけど、慣れればめっちゃ便利ばい。

書式だけじゃなくて、AI技術とかを使って、さらに効率的な作業ができる日が来るかもしれんけん、今からでもしっかり使いこなしておくと、未来の自分が楽になるかもしれんよ。

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
  
  <br /> <a rel="noopener" href="https://coporilife.com/379/" title="【GAS】CopyTo、行列コピー、スプレッドシートで自動コピーまとめ【Google Apps Script】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://coporilife.com/wp-content/uploads/2022/05/5b3b5b436fa1110245caa5a9039c2924.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://coporilife.com/wp-content/uploads/2022/05/5b3b5b436fa1110245caa5a9039c2924.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】CopyTo、行列コピー、スプレッドシートで自動コピーまとめ【Google Apps Script】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        スプレッドシートのGASでCopyToを使用して行列コピーしたり、自動で別シートにコピーや値のみコピーなど、CopyToでできることをまとめて解説しています。複数行にコピーする時の範囲指定など、なるべくわかりやすく解説してみたいと思います。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://coporilife.com/379/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://coporilife.com/379/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          coporilife.com
        </div>
      </div>
    </div>
  </div></a>
</div>
