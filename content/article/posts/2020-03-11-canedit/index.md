---
title: GASでスプレッドシートの指定範囲の編集権限を確認する方法
author: arukayies
type: post
date: 2020-03-11T14:48:29+00:00
excerpt: GASでスプレッドシートの指定範囲における編集権限があるかどうか確認する方法を紹介します！
url: /gas/canedit
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
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1246863944733487104";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1246863944733487104";s:5:"pDate";s:19:"2020-04-05 18:15:04";}}";
last_modified:
  - 2025-03-07 22:41:29
categories:
  - GAS
tags:
  - canEdit()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）を使うと、スプレッドシートの自動化や管理が簡単になるばい。でも、セキュリティや権限管理の問題に直面することもしばしばじゃ。今回は、`canEdit()`メソッドの使い方を具体的に紹介しながら、権限管理について詳しく解説していくけん。特に初心者でも理解しやすいように説明するけど、すでに少し経験がある人にも役立つ内容を盛り込んどるけ。

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

## canEdit()メソッドの基本

`canEdit()`メソッドは、スプレッドシートの特定の範囲や保護範囲に対して「編集できるか」を判定するメソッドじゃ。例えば、範囲を選んで「この範囲にアクセスしてもいいのか？」って確認することができるんだよね。

<pre class="wp-block-code"><code>const protection = range.protect();
if (protection.canEdit()) {
  // 権限があれば編集できる
  protection.remove();
}
</code></pre>

このコードでは、指定した範囲が編集可能かどうかをチェックして、権限があればその保護を解除するんだよね。これで、管理者だけが編集できるようにするなど、権限の管理が簡単にできるばい。

## canEdit()の応用方法

### 役職別の権限管理

大きな組織では、部署ごとや役職ごとに異なる権限を与えたくなるけ。そこで、`canEdit()`を使って動的に権限を設定できるんだよ。例えば、部門管理者だけが特定の範囲を編集できるようにするコード例を紹介するけ。

<pre class="wp-block-code"><code>function onEdit(e) {
  const protectedRange = e.source.getRange('財務データ!B2:D10');
  if (!protectedRange.canEdit()) {
    e.source.toast('編集権限がありません');
    e.range.setValue(e.oldValue);
    return;
  }
  
  // 権限があれば承認プロセスを開始
  initiateApprovalProcess(e);
}
</code></pre>

これで、部門管理者だけが「財務データ」の特定範囲を編集できるように制御できるんだよね。

### マルチテナント環境での活用

複数の企業が同じスプレッドシートを使っているようなシステム（例えばSaaS）では、テナントごとに編集権限を分けることが大事け。この場合も`canEdit()`をうまく使って、ドメインごとに権限を設定することができるんだよ。

<pre class="wp-block-code"><code>function configureTenantAccess(tenantDomain) {
  const protection = sheet.protect();
  protection.setDomainEdit(true);
  protection.removeEditors(protection.getEditors());
  protection.addEditors(getTenantAdmins(tenantDomain));
  
  if (protection.canEdit()) {
    Logger.log(`テナント${tenantDomain}の権限設定が完了`);
  }
}
</code></pre>

これで、テナントごとに異なる編集権限を与えることができるけ。

## 実践的な権限管理のコツ

### シート保護と権限管理の競合

シートには複数の保護設定ができるけ、例えば「シート全体」「範囲指定」「名前付き範囲」など。それぞれの保護設定がどのように優先されるのかを理解することが大事なんだよね。例えば、シート全体が保護されている場合、個別の範囲を編集できても、その範囲がシートの保護設定に従うため、編集できない場合があるんだよ。

### 条件付き書式とcanEdit()の連携

条件付き書式を使う際、`canEdit()`の結果と連携させる場合には、権限を確認した後で書式設定を適用するように気をつけるべきじゃ。例えば、権限がない範囲で書式を変更しようとすると、保護設定が解除されてしまう可能性があるけ。

<pre class="wp-block-code"><code>function applyConditionalFormatting(range) {
  if (range.canEdit()) {
    const rule = SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaValid('=ISBLANK(A1)')
      .setBackground('#FF0000')
      .build();
    range.setConditionalFormatRules(&#91;rule]);
  }
}
</code></pre>

## 高度な権限管理

### 時間帯別のアクセス制限

特定の時間帯だけ編集を許可したい場合、`canEdit()`と時間チェックを組み合わせて、営業時間外の編集を防ぐことができるんだよ。例えば、こんな感じで実装できるけ。

<pre class="wp-block-code"><code>function timeBasedEditControl(e) {
  const businessHours = { start: 9, end: 17 };
  const now = new Date();
  const currentHour = now.getHours();
  
  if (currentHour &gt;= businessHours.start && currentHour &lt;= businessHours.end) {
    if (!e.range.canEdit()) {
      e.source.toast('営業時間外の編集は禁止されています');
      e.range.setValue(e.oldValue);
    }
  }
}
</code></pre>

このようにして、業務時間内だけ編集可能にすることができるけ。

## まとめ

`canEdit()`メソッドを使うことで、Google Apps Scriptを使ったスプレッドシートの権限管理が非常に柔軟になるんだよ。複雑な権限管理システムでも、ちょっとした工夫で実現できるけ。でも、権限管理は慎重に設計しないと、思わぬところで情報漏洩や不正アクセスが発生することもあるけん、しっかりテストをして運用することが大切じゃね。

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
  <a rel="noopener" href="https://caymezon.com/gas-protect/" title="【GAS】スプレッドシートの保護機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/protect.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/protect.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートの保護機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートの保護機能をすべてまとめました。GoogleスプレッドシートはWeb上のツールなので、セキュリティ面では気を付けたいところですね。外部に公開したい場合など、保護をかける場面もきっとあります。保護に関するメソ
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-protect/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-protect/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/STSHISHO/items/8cec8041951d182c937e" title="[GAS] onEditはできれば使いたくないが使わざるを得ない場合の注意点と対処例など - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnMzLWFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkZxaWl0YS1pbWFnZS1zdG9yZSUyRjAlMkYxMTExNjEzJTJGNGJiZjYwZGQ1Nzg5MGEzMTBjMzZkMTRlNzdlYWM0ZDRhMGNkMmQwZiUyRmxhcmdlLnBuZyUzRjE2MTMzNTI0Nzc_aXhsaWI9cmItNC4wLjAmYXI9MSUzQTEmZml0PWNyb3AmbWFzaz1lbGxpcHNlJmJnPUZGRkZGRiZmbT1wbmczMiZzPTViNTcyNWIwZGU3ODhmZmQ4MTA2MjQ5YTE5M2ExNTVm%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D497a88f06f6c730ce51d80afb9c6537e?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9JTVCR0FTJTVEJTIwb25FZGl0JUUzJTgxJUFGJUUzJTgxJUE3JUUzJTgxJThEJUUzJTgyJThDJUUzJTgxJUIwJUU0JUJEJUJGJUUzJTgxJTg0JUUzJTgxJTlGJUUzJTgxJThGJUUzJTgxJUFBJUUzJTgxJTg0JUUzJTgxJThDJUU0JUJEJUJGJUUzJTgyJThGJUUzJTgxJTk2JUUzJTgyJThCJUUzJTgyJTkyJUU1JUJFJTk3JUUzJTgxJUFBJUUzJTgxJTg0JUU1JUEwJUI0JUU1JTkwJTg4JUUzJTgxJUFFJUU2JUIzJUE4JUU2JTg0JThGJUU3JTgyJUI5JUUzJTgxJUE4JUU1JUFGJUJFJUU1JTg3JUE2JUU0JUJFJThCJUUzJTgxJUFBJUUzJTgxJUE5JnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LXBhZD0wJnM9NjM2NmY3ZDFjZjVkMGQ4ODZhMTQ5YjdlNTczOWFiMTM&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBTVFNISVNITyZ0eHQtY29sb3I9JTIzMUUyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTM2JnR4dC1wYWQ9MCZzPTM2NzIyYmM4ZWJlYTFmYzUyYzAxY2EzMzE5YTYxNzc1&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=d5817e921d03bdf902eb421a407e8d6a" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS] onEditはできれば使いたくないが使わざるを得ない場合の注意点と対処例など - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        はじめに ＧＡＳ案件のほぼ９割がスプレッドシート絡みですが、onOpen以外のSimpleTriggerを使うことはあまりありません。そのうようなご要望があった場合には、特定のケースを除き、できる限り代替案を提案します。その理由としては概ね...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/STSHISHO/items/8cec8041951d182c937e" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/STSHISHO/items/8cec8041951d182c937e" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
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
