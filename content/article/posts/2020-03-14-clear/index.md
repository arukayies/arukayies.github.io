---
title: GASでスプレッドシートの指定範囲を完全クリアする方法
author: arukayies
type: post
date: 2020-03-14T01:49:01+00:00
excerpt: GASでスプレッドシートの指定範囲の値をすべて 削除する方法を紹介します！
url: /gas/clear
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
  - 2025-03-07 22:43:16
categories:
  - GAS
tags:
  - clear()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）を使ってスプレッドシートの管理をする時、`clear()`メソッドはかなり便利な機能なんだよね。これをうまく使いこなすことで、データのクリアや書式設定の管理がとっても効率的になるばい。今回は、この`clear()`メソッドの使い方を初心者でも分かりやすく解説するけど、実際にどう活用すれば良いのかも紹介していくけん、しっかり覚えておいてね！

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

## clear()メソッドの基本

### どんなメソッドなのか？

まず、`clear()`メソッドは、スプレッドシート内の指定した範囲のセルを「全部クリア」してくれるメソッドなんよ。具体的には、セルの中身（値）や書式（フォント、背景色、罫線など）を全部削除できるんだよね。これを使うことで、まるで新しく始めたような状態に戻すことができるばい。

<pre class="wp-block-code"><code>function clearRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange("A1:B2").clear(); // A1:B2のセルをクリア
}
</code></pre>

このコードを実行すると、A1からB2のセルの値と書式が全部削除されるんよ。戻り値として、クリアした範囲の`Range`オブジェクトが返されるので、メソッドチェーンも可能なんだってさ！

### clear()と他のメソッドの違い

`clear()`メソッドは、セルの中身と書式の両方を削除するけど、似たようなメソッドに`clearContent()`や`clearFormat()`があるんよ。これらは、削除する内容に違いがあるから、それぞれのメソッドをうまく使い分けることが大事なんだよね。

<ul class="wp-block-list">
  <li>
    <strong><code>clearContent()</code></strong>：セルの値だけを削除するメソッドやけど、書式はそのまま残る。
  </li>
  <li>
    <strong><code>clearFormat()</code></strong>：書式だけを削除して、セルの値はそのまま保持するんよ。
  </li>
</ul>

### 実際に使ってみよう！

じゃあ、実際にいくつかの範囲をクリアしてみるコードを見てみるけん！

<pre class="wp-block-code"><code>function clearExample() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // 単一セルをクリア
  sheet.getRange("A1").clear();
  
  // 範囲を指定してクリア
  sheet.getRange("B2:D5").clear();
  
  // 複数の非連続範囲をクリア
  const ranges = &#91;"F1:F10", "H1:H10", "J1:J10"];
  ranges.forEach(range => sheet.getRange(range).clear());
}
</code></pre>

このコードだと、まずA1セルをクリアしたり、B2からD5の範囲をクリアしたり、さらには非連続範囲も一気にクリアできるようになってるんだよ。

### 条件付きでクリアする場合

もし、特定の条件に合ったセルだけをクリアしたい場合は、`getValues()`でセルの値を取得して、条件に合ったものを消すこともできるんよ。例えば、数値が50以上のセルだけを消す場合はこんな感じ。

<pre class="wp-block-code"><code>function clearBasedOnCondition() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  values.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (typeof cell === "number" && cell >= 50) {
        sheet.getRange(rowIndex + 1, colIndex + 1).clear();
      }
    });
  });
}
</code></pre>

このコードだと、シート内のすべてのセルを見て、50以上の数値が入っているセルをクリアすることができるんよ。

## 実務で役立つ活用法

### テンプレートを使う

例えば、月次報告書などを更新する時に、データを保持しつつ書式だけをリセットしたいことがあるよね。そんな時に`clearFormat()`を使うと便利なんだよ。

<pre class="wp-block-code"><code>function resetTemplate() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  
  // 書式だけクリア
  range.clearFormat();
  
  // 新しい書式を設定
  range.setBackground("#f0f0f0").setFontFamily("Arial");
}
</code></pre>

この方法なら、データはそのままで書式だけを新しく設定できるけん、テンプレートを毎月更新する時に便利だよ。

### パフォーマンスを意識する

データ量が多くなると、`clear()`メソッドの実行時間が気になることもあるよね。そんな時は、**キャッシュ機能**を活用することで、処理速度を改善できるんだって。

<pre class="wp-block-code"><code>function cacheClear() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const cache = new Map();
  
  const range = sheet.getRange("A1:B10");
  if (!cache.has("A1:B10")) {
    cache.set("A1:B10", range.getValues());
  }
  
  range.clear(); // キャッシュ前の状態に戻すこともできるんよ
}
</code></pre>

こうすることで、毎回データを取得するのではなく、前回の状態をキャッシュに保存しておいて、必要に応じて復元することができるんよ。

## 結論

`clear()`メソッドをうまく使うと、スプレッドシートのデータ管理がぐっと効率よくなるんだよね。基本的な使い方を理解して、条件付き削除やテンプレートの更新など、実務で役立つテクニックも覚えておこうね！これで、GASを使ったデータ管理がさらにスムーズになること間違いなしばい。

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
  <a rel="noopener" href="https://note.com/kujiride0621/n/n393944b97fb1" title="Google Apps Script (GAS) シートの値を削除する方法｜くじらいど" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/137823770/rectangle_large_type_2_420fa8ef521f08ba48f1c437fb04df06.jpeg?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/137823770/rectangle_large_type_2_420fa8ef521f08ba48f1c437fb04df06.jpeg?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Script (GAS) シートの値を削除する方法｜くじらいど
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GASを使用してシートの値を削除するには、clear()メソッドを使用します。 セルの値を削除するclear()についての記事もありますのでぜひ！ function clear() { // 現在アクティブなスプレッドシートのシートを取得す...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/kujiride0621/n/n393944b97fb1" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/kujiride0621/n/n393944b97fb1" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://rinyan-7.com/gas/range_clear/" title="&#12304;clear&#12513;&#12477;&#12483;&#12489;&#12398;&#39764;&#27861;&#12305;&#31777;&#21336;&#12394;&#20351;&#12356;&#26041;&#12363;&#12425;&#23455;&#36341;&#30340;&#12394;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12414;&#12391;&#12289;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12434;&#12473;&#12483;&#12461;&#12522;&#25972;&#29702;&#12377;&#12427;&#26041;&#27861;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_clear%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_clear%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12304;clear&#12513;&#12477;&#12483;&#12489;&#12398;&#39764;&#27861;&#12305;&#31777;&#21336;&#12394;&#20351;&#12356;&#26041;&#12363;&#12425;&#23455;&#36341;&#30340;&#12394;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12414;&#12391;&#12289;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12434;&#12473;&#12483;&#12461;&#12522;&#25972;&#29702;&#12377;&#12427;&#26041;&#27861;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_clear/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_clear/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          rinyan-7.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://technical.verybestcbp.com/gas4/" title="【GAS基礎講座 4. 】セルの値や属性をサクッと削除(clearFormat)" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://technical.verybestcbp.com/wp-content/uploads/2020/09/gas-4-1-e1677029257233.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://technical.verybestcbp.com/wp-content/uploads/2020/09/gas-4-1-e1677029257233.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS基礎講座 4. 】セルの値や属性をサクッと削除(clearFormat)
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS(Google Apps Script)でデータの削除や属性のみの削除ができるようになります。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://technical.verybestcbp.com/gas4/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://technical.verybestcbp.com/gas4/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          technical.verybestcbp.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://kujiride.com/2024/04/11/google-apps-script-gas-how-to-delete-values-in-a-sheet/" title="Google Apps Script (GAS) シートの値を削除する方法 | くじらいどブログ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
- [ ] Verify search index generation
- [ ] Fix search functionality
- [ ] Incorporate latest changes
- [ ] Merge changes
- [ ] Commit changes
</task_progress>
</write_to_file>
