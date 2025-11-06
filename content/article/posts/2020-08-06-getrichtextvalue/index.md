---
title: GASでスプレッドシートのセルからリッチテキスト情報を取得する方法
author: arukayies
type: post
date: 2020-08-06T13:32:05+00:00
excerpt: GASでスプレッドシートの指定セルのリッチテキストを取得する方法を紹介します！
url: /gas/getrichtextvalue
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1596720727
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
  - 2025-03-07 21:37:19
categories:
  - GAS
tags:
  - GAS
  - getRichTextValue()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年8月"]
---
みんな、スプレッドシートでリッチテキストを扱ったことあるかい？普通の`getValue()`じゃ取得できない文字の装飾やリンク情報を、プログラムで操作したいってこと、あるよね？そんなときに活躍するのが`getRichTextValue()`メソッドばい！

今回は、このメソッドの使い方や応用テクニックを、わかりやすくまとめてみたけん、一緒に学んでいこうじゃ！

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

## そもそもリッチテキストって？

Googleスプレッドシートのセルに入力するテキストは、単なる文字列じゃなくて、**太字・斜体・色付き・リンク付き** なんかの装飾をつけることができるっちゃね。こういう装飾付きの文字を「リッチテキスト」って呼ぶんじゃ。

でも、`getValue()`でセルの値を取得すると、装飾が消えてしまうっちゃ。ここで登場するのが`getRichTextValue()`メソッドたい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getRichTextValue()の基本

このメソッドを使えば、セル内のリッチテキスト情報を`RichTextValue`オブジェクトとして取得できるっちゃ。実際にコードを書いてみよう。

<pre class="wp-block-code"><code>const range = SpreadsheetApp.getActiveSheet().getRange("A1");
const richText = range.getRichTextValue();
console.log(richText.getText()); // 純粋なテキスト
console.log(richText.getTextStyle().isBold()); // 太字かどうか
</code></pre>

`getText()`を使えば普通の文字列を取得できるし、`getTextStyle()`を使えば装飾の詳細が取れるっちゃ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 部分的なスタイルを取得する方法

リッチテキストのすごいところは、セル内の一部だけに装飾を適用できることじゃね。例えば、**「GAS」だけ太字** みたいなことができるばい。

<pre class="wp-block-code"><code>const style = richText.getTextStyle(1, 4);
console.log(style.getFontSize()); // 2-4文字目のフォントサイズ
</code></pre>

オフセット（開始位置）と長さを指定すると、その範囲だけのスタイルを取得できるっちゃ。これは細かいデザイン制御をしたいときに便利ばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## ハイパーリンクの取得方法

スプレッドシートのセルにURLを貼り付けると、リンクになるばい。`getRichTextValue()`を使うと、そのリンク情報も取れるっちゃ。

<pre class="wp-block-code"><code>const linkUrl = richText.getLinkUrl();
if (linkUrl) {
  console.log(`リンク先: ${linkUrl}`);
}
</code></pre>

でもね、セル内に複数のリンクがあると`getLinkUrl()`は`null`を返すんじゃ。その場合は、`getRuns()`を使って個別に取得する方法もあるばい！

<pre class="wp-block-code"><code>richText.getRuns().forEach((run, index) =&gt; {
  console.log(`ラン${index+1}: ${run.getText()}`);
  console.log(`　URL: ${run.getLinkUrl()}`);
});
</code></pre>

`getRuns()`を使うと、装飾ごとに分割された「ラン」を配列で取得できるっちゃ。これを活用すれば、細かくリッチテキストを解析できるばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## ちょっとした落とし穴と対策

### 1. 日付や数値は取得できない

`getRichTextValue()`は、**日付や数値が入ったセルではnullを返す** ことがあるんじゃ。これを回避するには、一時的にセルのフォーマットを変更するといいばい。

<pre class="wp-block-code"><code>function handleDateCell() {
  const range = SpreadsheetApp.getActive().getRange('A1');
  const originalFormat = range.getNumberFormat();
  
  range.setNumberFormat('@'); // 文字列フォーマットに変更
  const richText = range.getRichTextValue();
  console.log(richText.getText());
  
  range.setNumberFormat(originalFormat); // 元のフォーマットに戻す
}
</code></pre>

### 2. 大量のデータを扱うと処理が遅くなる

大量のセルを1つずつ処理すると、スクリプトの実行時間が長くなってしまうっちゃ。こういうときは、**バッチ処理** を活用するといいばい。

<pre class="wp-block-code"><code>function batchProcessing() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getRange('A1:C100');
  const richTextValues = dataRange.getRichTextValues();
  
  const processedData = richTextValues.map(row =&gt;
    row.map(cell =&gt; ({
      text: cell.getText(),
      hasLink: !!cell.getLinkUrl()
    }))
  );
  
  console.log(processedData);
}
</code></pre>

`getRichTextValues()`を使って、一気に取得すれば高速に処理できるっちゃ！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## まとめ

`getRichTextValue()`を使えば、スプレッドシートの装飾付きテキストをプログラムで自由に扱えるばい。特に、

<ul class="wp-block-list">
  <li>
    <strong>文字の装飾を取得する</strong>
  </li>
  <li>
    <strong>ハイパーリンクを抜き出す</strong>
  </li>
  <li>
    <strong>ラン単位でテキストを解析する</strong>
  </li>
  <li>
    <strong>バッチ処理で高速化する</strong>
  </li>
</ul>

こんなことができるのが強みじゃね！

これを活用すれば、デザイン校正ツールや自動レポート生成ツールなんかも作れるばい。ぜひ、色々試してみてちょうだい！

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
  
  <br /> <a rel="noopener" href="https://qiita.com/matsukatsu/items/9a96650194b39795a816" title="Google SpreadSheet: 複数のリッチテキストからURLを抽出する - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnFpaXRhLWltYWdlLXN0b3JlLnMzLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkYwJTJGNDIzNTA2JTJGcHJvZmlsZS1pbWFnZXMlMkYxNTU4NzIxNTAwP2l4bGliPXJiLTQuMC4wJmFyPTElM0ExJmZpdD1jcm9wJm1hc2s9ZWxsaXBzZSZiZz1GRkZGRkYmZm09cG5nMzImcz05OTQ0NDAyMjg2YWEzYjMyZTFlNGQ0ZWQ1ZjU5OWNlNA%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3Dedee0a469085b29f6c3bdd1025c7dd2b?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R29vZ2xlJTIwU3ByZWFkU2hlZXQlM0ElMjAlRTglQTQlODclRTYlOTUlQjAlRTMlODElQUUlRTMlODMlQUElRTMlODMlODMlRTMlODMlODElRTMlODMlODYlRTMlODIlQUQlRTMlODIlQjklRTMlODMlODglRTMlODElOEIlRTMlODIlODlVUkwlRTMlODIlOTIlRTYlOEElQkQlRTUlODclQkElRTMlODElOTklRTMlODIlOEImdHh0LWFsaWduPWxlZnQlMkN0b3AmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT01NiZ0eHQtcGFkPTAmcz00Mzk1NDgzOTllYzg4N2E0M2JkNDkyMDE1YWY3OWI5Yw&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBtYXRzdWthdHN1JnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LXBhZD0wJnM9NTEwNmM0MWNkMThmYjRmMGY3NmM1ZTFlOTJhOWVkNTM&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=aae2132b172ccb40d99faccd0ad666e1" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google SpreadSheet: 複数のリッチテキストからURLを抽出する - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        以前 Google SpreadSheet: ハイパーリンクを一括抽出する という記事を書いたのですが、これではうまくいかないケースがあったので、ちょっと調べて別の手段を講じましたので、紹介しておきます。 SpreadSheet でセル全体...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/matsukatsu/items/9a96650194b39795a816" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/matsukatsu/items/9a96650194b39795a816" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://stackoverflow.com/questions/67715023/i-cant-get-text-from-richtextvalue" title="Attention Required! | Cloudflare" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstackoverflow.com%2Fquestions%2F67715023%2Fi-cant-get-text-from-richtextvalue?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstackoverflow.com%2Fquestions%2F67715023%2Fi-cant-get-text-from-richtextvalue?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Attention Required! | Cloudflare
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/67715023/i-cant-get-text-from-richtextvalue" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/67715023/i-cant-get-text-from-richtextvalue" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a>
</div>

みんなも`getRichTextValue()`を使いこなして、スプレッドシートのプロになろうばい！
