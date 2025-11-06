---
title: GASでスプレッドシートの交互背景色設定を効率的に取得する方法
author: arukayies
type: post
date: 2020-06-06T05:36:49+00:00
excerpt: GASでスプレッドシートの交互の背景色情報を取得する方法を紹介します！
url: /gas/getbandings
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1591421811
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
  - 2025-03-07 22:24:03
categories:
  - GAS
tags:
  - GAS
  - getBandings()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
どげんね、Googleスプレッドシートを使いこなしたかね？今回は、Google Apps Script（GAS）で使える `getBandings()` メソッドについて詳しく話していくばい！バンディング（交互の色分け）をプログラムで操作できる強力な機能じゃけ、しっかり押さえておくと、スプレッドシートの見栄えやデータ整理が一気に楽になるっちゃ！

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

## getBandings() とは？

`getBandings()` メソッドは、スプレッドシートの「バンディング情報」を取得するための機能さ。スプレッドシートのセルを「縞模様」にする機能があるっちゃろ？それをプログラムで扱うためのメソッドじゃ。

このメソッドには `Sheet.getBandings()` と `Range.getBandings()` の2種類があるばい。

<ul class="wp-block-list">
  <li>
    <code>Sheet.getBandings()</code>：シート全体のバンディングを取得する
  </li>
  <li>
    <code>Range.getBandings()</code>：特定の範囲に適用されているバンディングを取得する
  </li>
</ul>

要するに、スプレッドシート全体の装飾ルールを取得するか、選択した範囲の装飾だけを取得するかの違いじゃな。

## 基本的な使い方

まずはシンプルな使い方を見てみるばい。

<pre class="wp-block-code"><code>// シート全体のバンディング情報を取得
const sheetBandings = SpreadsheetApp.getActiveSheet().getBandings();

// 選択範囲のバンディング情報を取得
const rangeBandings = SpreadsheetApp.getActiveRange().getBandings();
</code></pre>

ポイントは、**このメソッドは引数を一切受け取らん**ってことさ。対象範囲はメソッドを呼び出すオブジェクト（`Sheet` または `Range`）によって決まるけん、使い方を間違えんように気をつけるばい。

## 取得できる情報

この `getBandings()` メソッドを使って取得できる `Banding` オブジェクトには、以下の情報が含まれとるばい。

<ul class="wp-block-list">
  <li>
    <strong>適用範囲</strong>：<code>getRange()</code> で取得
  </li>
  <li>
    <strong>バンディングの色</strong>： <ul class="wp-block-list">
      <li>
        ヘッダー行の色 → <code>getHeaderRowColor()</code>
      </li>
      <li>
        フッター行の色 → <code>getFooterRowColor()</code>
      </li>
      <li>
        奇数行の色 → <code>getFirstRowColor()</code>
      </li>
      <li>
        偶数行の色 → <code>getSecondRowColor()</code>
      </li>
    </ul>
  </li>
  
  <li>
    <strong>バンディングテーマ</strong>：<code>getBandingTheme()</code> で取得
  </li>
</ul>

例えば、取得したバンディング情報をログに出力するスクリプトはこんな感じになるばい。

<pre class="wp-block-code"><code>function analyzeBandings() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const bandings = sheet.getBandings();
  
  bandings.forEach((banding, index) =&gt; {
    console.log(`Banding ${index + 1}:`);
    console.log(`- Range: ${banding.getRange().getA1Notation()}`);
    console.log(`- Theme: ${banding.getBandingTheme().toString()}`);
    console.log(`- Header Color: ${banding.getHeaderRowColor()}`);
    console.log(`- First Band: ${banding.getFirstRowColor()}`);
    console.log(`- Second Band: ${banding.getSecondRowColor()}`);
  });
}
</code></pre>

これを実行すると、適用されているバンディングの色や範囲がコンソールに出力されるばい。

## getBandings() の活用例

### 1. バンディングの条件付き変更

データの量によってバンディングのテーマを変更するスクリプトを作ってみるばい。

<pre class="wp-block-code"><code>function applyDynamicBanding() {
  const range = SpreadsheetApp.getActiveRange();
  const dataValues = range.getValues();
  
  const theme = dataValues.length &gt; 20 ? 
    SpreadsheetApp.BandingTheme.LIGHT_GREY :
    SpreadsheetApp.BandingTheme.CYAN;
  
  const existingBandings = range.getBandings();
  existingBandings.forEach(banding =&gt; banding.remove());
  
  const newBanding = range.applyRowBanding(theme, true, false);
  Logger.log(`Applied ${theme.toString()} to ${range.getA1Notation()}`);
}
</code></pre>

このスクリプトを実行すると、データが20行を超えていたらグレーのバンディング、それ以下ならシアンのバンディングを適用するようになるばい。

### 2. エラーハンドリング

GASでは、権限不足や無効な範囲にアクセスするとエラーが出るけん、安全なスクリプトにするならエラーハンドリングを組み込むとよかばい。

<pre class="wp-block-code"><code>function safeGetBandings() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const bandings = sheet.getBandings();
    
    if (!bandings || bandings.length === 0) {
      throw new Error("No bandings found in active sheet");
    }
    
    return bandings.map(banding =&gt; ({
      range: banding.getRange().getA1Notation(),
      theme: banding.getBandingTheme().toString(),
      colors: {
        header: banding.getHeaderRowColor(),
        first: banding.getFirstRowColor(),
        second: banding.getSecondRowColor()
      }
    }));
    
  } catch (error) {
    console.error(`Banding retrieval failed: ${error.message}`);
    console.error(`Stack trace: ${error.stack}`);
    return &#91;];
  }
}
</code></pre>

## まとめ

`getBandings()` メソッドを使えば、スプレッドシートの視覚構造をプログラムで管理できるようになるばい。バンディング情報の取得・解析・変更まで、色々と応用ができるけん、ぜひ活用してみてくれんね！

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
  
  <br /> <a rel="noopener" href="https://hajiritsu.com/spreadsheet-gas-getbandings/" title="Google Spreadsheet&#12398;GAS&#38306;&#25968;getBandings&#12434;&#12510;&#12473;&#12479;&#12540;&#12377;&#12427; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getbandings%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getbandings%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Spreadsheet&#12398;GAS&#38306;&#25968;getBandings&#12434;&#12510;&#12473;&#12479;&#12540;&#12377;&#12427; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getbandings/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getbandings/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a>
</div>
