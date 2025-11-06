---
title: GASでスプレッドシートの指定セルから太字設定を取得する方法
author: arukayies
type: post
date: 2020-07-03T12:48:22+00:00
excerpt: GASでスプレッドシートの指定セルの太字を取得する方法を紹介します！
url: /gas/getfontweight
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1593780502
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
  - 2025-03-07 21:55:31
categories:
  - GAS
tags:
  - GAS
  - getFontWeight()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
みんな、スプレッドシートで「このセルだけ太字にしたい！」ってことあるばい？そんなときに便利なのが、Google Apps Script（GAS）の `getFontWeight()` メソッドじゃ！

この記事では、`getFontWeight()` の基本から応用まで、しっかり解説するけ。最後まで読めば、セルのフォントを自由自在に操れるようになるばい！

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

## getFontWeight() とは？

`getFontWeight()` は、Googleスプレッドシートの特定セルの**太字設定を取得**するメソッドじゃ。

**戻り値は2種類**

<ul class="wp-block-list">
  <li>
    <code>"bold"</code> → セルの文字が太字
  </li>
  <li>
    <code>"normal"</code> → 太字じゃない
  </li>
</ul>

使い方はこんな感じさ。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const fontWeight = sheet.getRange("A1").getFontWeight();
console.log(`A1のフォントウエイト: ${fontWeight}`);
</code></pre>

これを実行すると、A1セルが太字なら `bold`、そうでなければ `normal` ってログに出るばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getFontWeight() の活用テクニック

### ① 複数セルのフォントウエイトを取得する

`getFontWeights()` を使えば、**範囲内のすべてのセルのフォントウエイトを配列**で取れるばい！

<pre class="wp-block-code"><code>const range = sheet.getRange("A1:C3");
const fontWeights = range.getFontWeights();
console.log(fontWeights);
</code></pre>

配列の形で、`[["bold", "normal", "normal"], ["bold", "bold", "normal"], ...]` みたいに取得できるけ、ループで処理しやすいじゃ。

### ② 太字セルだけ色を変える

<pre class="wp-block-code"><code>function highlightBoldCells() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const fontWeights = range.getFontWeights();
  
  fontWeights.forEach((row, rowIndex) =&gt; {
    row.forEach((weight, colIndex) =&gt; {
      if (weight === "bold") {
        range.getCell(rowIndex + 1, colIndex + 1).setBackground("yellow");
      }
    });
  });
}
</code></pre>

これを実行すれば、シート内の太字セルだけが黄色くハイライトされるばい！

### ③ ヘッダーの統一チェック

スプレッドシートのヘッダーって、統一されとる？

<pre class="wp-block-code"><code>function checkHeaderFormat() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const header = sheet.getRange("A1:Z1").getFontWeights()&#91;0];
  header.forEach((weight, index) =&gt; {
    if (weight !== "bold") {
      console.warn(`列${index + 1}のヘッダーが太字じゃないばい！`);
    }
  });
}
</code></pre>

ヘッダー行のフォント設定をチェックして、バラつきをなくせるじゃ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getFontWeight() を使うときの注意点

### ① 範囲指定時の動作に注意

例えば `sheet.getRange("A1:C3").getFontWeight()` を使うと、**左上のセル（A1）だけの太字設定しか取得できん**ばい！範囲内のすべてのセルをチェックしたいなら、`getFontWeights()` を使うのが正解さ。

### ② パフォーマンスに気をつけろ！

例えば、1000セル分 `getFontWeight()` をループで回すと、スクリプトの実行時間がめっちゃ長くなるばい。`getFontWeights()` で一括取得することで、処理速度がグンと上がるけ。

### ③ セルが存在しないとエラーになる

<pre class="wp-block-code"><code>try {
  const fontWeight = sheet.getRange("Z10000").getFontWeight();
  console.log(fontWeight);
} catch (error) {
  console.error("エラー発生: " + error.message);
}
</code></pre>

エラー処理をしっかり書いとけば、スクリプトが途中で止まるのを防げるばい。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## まとめ

<ul class="wp-block-list">
  <li>
    <code>getFontWeight()</code> はセルの太字状態を取得するメソッド
  </li>
  <li>
    <code>getFontWeights()</code> を使えば、範囲内のセルすべてのフォントウエイトを取得できる
  </li>
  <li>
    太字セルのハイライトやヘッダーの書式チェックに活用できる
  </li>
  <li>
    パフォーマンスを考慮して、一括取得やエラーハンドリングを意識しよう
  </li>
</ul>

スプレッドシートのフォーマット管理に `getFontWeight()` を活用して、業務をスマートにしようばい！

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
  <a rel="noopener" href="https://gsuiteguide.jp/sheets/getfontweight/" title="セルの文字装飾(太字)を取得する：getFontWeight()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        セルの文字装飾(太字)を取得する：getFontWeight()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        getFontWeight() セルの文字装飾(太字)を取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreadsheet(); // そのスプ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getfontweight/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getfontweight/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://pineplanter.moo.jp/non-it-salaryman/2019/07/20/gas-getfontinfo/" title="Google Apps Scriptでスプレッドシートのセルのフォント情報を取得する方法 | 非IT企業に勤める中年サラリーマンのIT日記" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://pineplanter.moo.jp/non-it-salaryman/wp-content/uploads/2019/07/fontinfo-eye.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://pineplanter.moo.jp/non-it-salaryman/wp-content/uploads/2019/07/fontinfo-eye.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Scriptでスプレッドシートのセルのフォント情報を取得する方法 | 非IT企業に勤める中年サラリーマンのIT日記
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Scriptでスプレッドシートのセルのフォントの情報を得る方法です。Rangeオブジェクトの下記メソッドからフォント情報を得ることが出来ます。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://pineplanter.moo.jp/non-it-salaryman/2019/07/20/gas-getfontinfo/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://pineplanter.moo.jp/non-it-salaryman/2019/07/20/gas-getfontinfo/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          pineplanter.moo.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/TooMe/items/d51624c85606aaecad9f" title="googleドキュメントに自動でフォントを変更する機能を実装 - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Fengineer-festa-ogp-background-074608b13b4bbe67c10ada41e7e2d292.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnMzLWFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkZxaWl0YS1pbWFnZS1zdG9yZSUyRjAlMkYzODIwMDc5JTJGMDdmYTI3NDE4MTg2MGRkNDhkYjNkMmZmOGU0MTY0ZWFjNDliNDc4NSUyRmxhcmdlLnBuZyUzRjE3NTE2OTAxNDk_aXhsaWI9cmItNC4wLjAmYXI9MSUzQTEmZml0PWNyb3AmbWFzaz1lbGxpcHNlJmJnPUZGRkZGRiZmbT1wbmczMiZzPWUzZGUxNzBiZmYyNTI1ZWI4ZTA0NjczZWZiMDE5MmEw%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D5e6c32130faca2b21b2ea604158fc666?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9Z29vZ2xlJUUzJTgzJTg5JUUzJTgyJUFEJUUzJTgzJUE1JUUzJTgzJUExJUUzJTgzJUIzJUUzJTgzJTg4JUUzJTgxJUFCJUU4JTg3JUFBJUU1JThCJTk1JUUzJTgxJUE3JUUzJTgzJTk1JUUzJTgyJUE5JUUzJTgzJUIzJUUzJTgzJTg4JUUzJTgyJTkyJUU1JUE0JTg5JUU2JTlCJUI0JUUzJTgxJTk5JUUzJTgyJThCJUU2JUE5JTlGJUU4JTgzJUJEJUUzJTgyJTkyJUU1JUFFJTlGJUU4JUEzJTg1JnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnR4dC1jb2xvcj0lMjNGRkZGRkYmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LXBhZD0wJnM9OThiZTAxNDFkM2ZjOTkwOTIzMjNkZjdmMmQ0ZTM1MmQ&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBUb29NZSZ0eHQtY29sb3I9JTIzRkZGRkZGJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTM2JnR4dC1wYWQ9MCZzPWJiMDlhMGRiNTJmYzRmZjVlZDM2MzdlOWEwZDMwNjFh&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=6e715feaac78ba95351aa6801fbf270c" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        googleドキュメントに自動でフォントを変更する機能を実装 - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        報告書や論文を執筆する時、英数字や記号は〇〇フォント、それ以外は△△フォント。みたいに指定される場合が多いと思います。 Microsoft Wordならそれらの設定を行えるのですが、Googleドキュメントではできません。 そこでGoogl...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/TooMe/items/d51624c85606aaecad9f" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/TooMe/items/d51624c85606aaecad9f" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-font/" title="【GAS】スプレッドシートのフォント機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/font.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/font.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートのフォント機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートのフォント機能をすべてまとめました。セルのデータを扱う時、フォントの色を変更したり、お気に入りの字体に変えたり、自由自在にオシャレに装飾できると素敵ですね。色、字体、太字、斜体、下線、サイズ設定と取得です。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-font/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-font/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
