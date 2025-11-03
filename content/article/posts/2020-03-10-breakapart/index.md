---
title: GASでスプレッドシートのセル結合を解除してデータ操作を効率化する方法
author: arukayies
type: post
date: 2020-03-10T13:05:26+00:00
excerpt: GASでスプレッドシートの結合を解除する方法を紹介します！
url: /gas/breakapart
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
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1246673303978119169";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1246673303978119169";s:5:"pDate";s:19:"2020-04-05 05:37:32";}}";
last_modified:
  - 2025-03-07 22:40:42
categories:
  - GAS
tags:
  - breakApart()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）でスプレッドシートを操作していると、セルの結合を解除したい場面がよくあるばい。その際に便利なのが、`breakApart()`メソッドなんだけど、このメソッドを使うと、セルの結合解除が簡単にプログラムでできるけん。今回はその使い方や、注意点をわかりやすく解説するけ、最後まで読んでいってね。

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

## breakApart()メソッドの基本

まず、`breakApart()`って何かっていうと、GASの`Range`クラスにあるメソッドで、指定した範囲内のセル結合を解除するためのものじゃ。使い方はシンプルで、対象のセル範囲を指定して、このメソッドを実行するだけ。

### 基本の使い方

<pre class="wp-block-code"><code>targetRange.breakApart();
</code></pre>

ここで`targetRange`は、`getRange()`メソッドなどで取得したセル範囲のオブジェクトじゃ。これを実行すると、その範囲内の結合されたセルが解除されるけ、まるでスプレッドシートのUIで「結合解除」をクリックしたのと同じ結果になるんだ。

## 結合解除をする際の注意点

でも、注意すべき点もあるけ。結合解除をするには、**対象の範囲が結合されたセルを完全に含んでいる**必要があるんだ。例えば、A1:B2が結合されてるときに、A1だけを指定して解除しようとしてもエラーが出てしまうけ。

### エラーメッセージ

<pre class="wp-block-code"><code>結合/結合解除するには、結合範囲のすべてのセルを選択する必要があります
</code></pre>

これを避けるために、事前に`getMergedRanges()`メソッドで、どの範囲が結合されているかをチェックしてから処理することが重要だっちゃ。

## 実際のコード例

### 単一範囲の解除

<pre class="wp-block-code"><code>function basicBreakApart() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const targetRange = sheet.getRange('B2:E6');
  
  // 結合状態の確認
  const mergedRanges = targetRange.getMergedRanges();
  if (mergedRanges.length === 0) {
    console.log('結合セルがありません');
    return;
  }
  
  targetRange.breakApart();
  console.log(`${mergedRanges.length}箇所の結合を解除しました`);
}
</code></pre>

このコードでは、範囲内に結合セルがあれば解除して、その後結合を解除した数をログに出力するようにしているんじゃ。

### 複数範囲の解除

さらに、複数の範囲を一度に解除したい場合には、`RangeList`オブジェクトを使うと便利だよ。

<pre class="wp-block-code"><code>function batchBreakApart() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const rangeList = sheet.getRangeList(&#91;'A1:C3', 'E5:G7', 'I9:K11']);
  
  rangeList.breakApart();
  console.log('3つの領域の結合を一括解除しました');
}
</code></pre>

このコードだと、3つの範囲を一括で解除できるから、大量の範囲をまとめて解除する際に便利ばい。

## エラー処理とデバッグ

結合解除をする際にはエラーが出ることもあるけど、その際に役立つのがエラーハンドリングじゃ。例えば、範囲指定を誤っている場合にエラーをキャッチして適切に対応することができるんだ。

### エラー処理の例

<pre class="wp-block-code"><code>function safeBreakApart(rangeSpec) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange(rangeSpec);
  const merged = range.getMergedRanges();
  
  if (merged.length === 0) throw new Error('結合セルが存在しません');
  if (!merged.some(r =&gt; range.getA1Notation() === r.getA1Notation())) {
    throw new Error('範囲指定が不正確です');
  }
  
  range.breakApart();
}
</code></pre>

このコードは、結合セルがない場合や範囲指定が不正確な場合にエラーを投げて、処理を中断するようになっとるけ。エラーメッセージを見ながら、どこで問題が起きているのかを確認できるので便利だっちゃ。

### デバッグの方法

デバッグする時は、`Logger.log`や`console.log`を使って、結合状態を確認したり、処理の進捗を確認することができるんだ。

<pre class="wp-block-code"><code>function debugBreakApart() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange('A1:D4');
  
  console.log('処理前の結合状態:');
  console.log(range.getMergedRanges().map(r =&gt; r.getA1Notation()));
  
  range.breakApart();
  
  console.log('処理後の結合状態:');
  console.log(range.getMergedRanges().map(r =&gt; r.getA1Notation()));
}
</code></pre>

これで、結合を解除する前後の状態をログに出力して、実際にどう変化したのかを目で確認できるんだ。

## 大規模データの処理とパフォーマンス最適化

大きなデータを処理するときには、パフォーマンスを考慮することが重要じゃ。特に、大量の結合セルがあるシートでは、結合解除処理に時間がかかることもあるから、バッチ処理やメモリ管理に気をつけることが必要だっちゃ。

### バッチ処理の例

<pre class="wp-block-code"><code>function optimizeLargeData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const mergedRanges = dataRange.getMergedRanges();
  
  // バッチ更新開始
  SpreadsheetApp.flush();
  console.time('結合解除処理');
  
  mergedRanges.forEach(range =&gt; {
    range.breakApart();
    console.log(`処理済み: ${range.getA1Notation()}`);
  });
  
  console.timeEnd('結合解除処理');
}
</code></pre>

こうすることで、処理を効率よく行い、パフォーマンスの低下を防ぐことができるんだ。

## 結論

`breakApart()`メソッドをうまく使うことで、セルの結合解除を簡単にプログラムで制御できるけ。特に、大規模なデータ処理や複数範囲を扱う場合に、このメソッドの利便性を感じることができるよ。エラーハンドリングやデバッグをきちんと実装して、安全に処理を行うことが大切じゃ。

実際に使う際は、事前に結合状態を確認するようにして、エラーを未然に防いでね。これでスプレッドシート操作がもっと効率的にできるようになるんじゃないかな？

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
  <a rel="noopener" href="https://auto-worker.com/blog/?p=1990" title="Google Apps Scriptで結合セルを解除する方法(breakApartメソッド) | AutoWorker〜Google Apps Script(GAS)とSikuliで始める業務改善入門" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://auto-worker.com/blog/wp-content/uploads/2020/11/20201115_auto_001.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://auto-worker.com/blog/wp-content/uploads/2020/11/20201115_auto_001.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Scriptで結合セルを解除する方法(breakApartメソッド) | AutoWorker〜Google Apps Script(GAS)とSikuliで始める業務改善入門
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script(GAS)でセルを結合する方法を前回紹介しましたが、今回は逆に結合セルを解除する方法を解説します。 結合セルの解除では、breakApartメソ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://auto-worker.com/blog/?p=1990" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://auto-worker.com/blog/?p=1990" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          auto-worker.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://coporilife.com/341/" title="【GAS】switchのcaseで複数処理、GASのswitchで複数分岐まとめ【サンプルコード】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://coporilife.com/wp-content/uploads/2022/05/910469e52ec8ae66b00ba3a4f7aac38c-1.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://coporilife.com/wp-content/uploads/2022/05/910469e52ec8ae66b00ba3a4f7aac38c-1.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】switchのcaseで複数処理、GASのswitchで複数分岐まとめ【サンプルコード】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GASでswitchのcaseのダウンロードサンプルコード公開しています。GASでswitch文は条件分岐を複数処理したい時に、シンプルに書くことができて便利です。caseで複数分岐も、switch文ならわかりやすくなります。この記事で説明
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://coporilife.com/341/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://coporilife.com/341/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          coporilife.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-merge/" title="【GAS】スプレッドシートの結合機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/merge.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/merge.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートの結合機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートの結合機能をすべてまとめました。表を作成する際、同じ値のセルを結合して１セルで表示したい時ってありますよね。横方向に結合、縦方向に結合、結合確認や解除などです。必要な場面で柔軟に結合してみてください。結合に
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-merge/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-merge/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://vba-gas.info/gas-merge-breakapart" title="【Google Apps Script(GAS)】セルの結合と解除" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://vba-gas.info/wp-content/uploads/2020/02/GAS.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://vba-gas.info/wp-content/uploads/2020/02/GAS.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【Google Apps Script(GAS)】セルの結合と解除
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        今回は、Google Apps Scriptでスプレッドシート上のセルを結合するmergeと、結合を解除するbreakApartについてご紹介します。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://vba-gas.info/gas-merge-breakapart" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://vba-gas.info/gas-merge-breakapart" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          vba-gas.info
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-rmerge/" title="[GAS]セルの結合・分割や、存在する結合セルを取得する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-7.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-7.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]セルの結合・分割や、存在する結合セルを取得する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲のセルを結合・分割したり、存在する結合セルを取得する方法
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rmerge/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rmerge/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://coporilife.com/519/" title="【GAS】コピペで使えるswitch、case、複数条件【サンプルコード】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://coporilife.com/wp-content/uploads/2022/06/01.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://coporilife.com/wp-content/uploads/2022/06/01.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】コピペで使えるswitch、case、複数条件【サンプルコード】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GASのswitchメソッドをコピペで使えるサンプルコードを公開しています。ダウンロードして使用できるGASのswitchコードも公開中です。GASのswitch基本形switch(条件に使用する値){　case 10:　　//値が10だっ
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://coporilife.com/519/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://coporilife.com/519/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          coporilife.com
        </div>
      </div>
    </div>
  </div></a>
</div>
