---
title: GASでスプレッドシートのメタデータを柔軟に検索する方法
author: arukayies
type: post
date: 2020-05-24T16:17:43+00:00
excerpt: GASでスプレッドシートのメタデータを検索する方法を紹介します！
url: /gas/createdevelopermetadatafinder
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
  - 1590337064
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-03-07 22:52:12
categories:
  - GAS
tags:
  - createDeveloperMetadataFinder()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年5月"]
---
Google Apps Script（GAS）の`createDeveloperMetadataFinder()`メソッド、これ、スプレッドシート内のメタデータ管理においてかなり便利な機能ばい。簡単に言うと、スプレッドシート内のデータに「タグ」を付けて、後でそのタグを使って効率よくデータを探したり、管理したりできるってわけ。今回は、初心者でも使いやすいように、このメソッドの基本から活用法までわかりやすく紹介するけん、参考にしてみてね！

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

## メタデータって何？

メタデータって、スプレッドシートに付ける追加情報のことやけど、例えばセルやシートに「これは重要なデータだよ」ってタグをつけるイメージやな。これによって、後でその情報をすぐに検索したり、特定のデータを絞り込んだりできるんよ。メタデータは、基本的に以下のような特徴があるんや。

<ul class="wp-block-list">
  <li>
    <strong>不変性</strong>：一度付けたメタデータは、削除しない限りそのまま残る
  </li>
  <li>
    <strong>階層性</strong>：スプレッドシート→シート→行/列→セルの順で、データを細かく分類して管理できる
  </li>
  <li>
    <strong>可視性制御</strong>：誰がそのメタデータを見ることができるかを、設定できる
  </li>
</ul>

こんなふうに、スプレッドシート内のデータに「タグ」を付けることで、後から検索や管理が簡単にできるけん、めちゃくちゃ便利なんだよ。

## createDeveloperMetadataFinder()メソッドの基本

`createDeveloperMetadataFinder()`メソッドは、スプレッドシート、シート、または特定の範囲内でメタデータを検索するためのものやけん、使い方が簡単なんよ。例えば、スプレッドシート全体からメタデータを検索したいときは、こんな感じで使う。

<pre class="wp-block-code"><code>const spreadsheetFinder = SpreadsheetApp.getActive()
  .createDeveloperMetadataFinder();
</code></pre>

もし特定のシートだけから検索したいなら、以下のように書けるんよ。

<pre class="wp-block-code"><code>const sheetFinder = SpreadsheetApp.getActiveSheet()
  .createDeveloperMetadataFinder();
</code></pre>

さらに、特定の範囲を指定して検索することもできるけん、便利やろ？

<pre class="wp-block-code"><code>const rangeFinder = SpreadsheetApp.getActive()
  .getRange("A1:D10")
  .createDeveloperMetadataFinder();
</code></pre>

## 高度な検索条件の使い方

`createDeveloperMetadataFinder()`メソッドを使うと、検索条件をチェーン式に組み合わせることができるけん、かなり柔軟に検索ができるんよ。例えば、「優先度」というキーに「高」という値がついているメタデータを探すときは、こんな感じやな。

<pre class="wp-block-code"><code>const results = spreadsheetFinder
  .withKey("優先度")
  .withValue("高")
  .find();
</code></pre>

さらに、検索条件を絞り込むために、**メタデータの種類**や**可視性**を指定することもできるけん、より精度の高い検索ができるんよ。具体的には、こんなメソッドを使うんやけど。<figure class="wp-block-table">

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド名
    </th>
    
    <th>
      機能
    </th>
    
    <th>
      パラメータ例
    </th>
  </tr>
  
  <tr>
    <td>
      withKey()
    </td>
    
    <td>
      キー完全一致検索
    </td>
    
    <td>
      &#8220;category&#8221;
    </td>
  </tr>
  
  <tr>
    <td>
      withValue()
    </td>
    
    <td>
      値部分一致検索
    </td>
    
    <td>
      &#8220;urgent&#8221;
    </td>
  </tr>
  
  <tr>
    <td>
      withLocationType()
    </td>
    
    <td>
      メタデータ種別指定
    </td>
    
    <td>
      <code>DeveloperMetadataLocationType.COLUMN</code>
    </td>
  </tr>
  
  <tr>
    <td>
      withVisibility()
    </td>
    
    <td>
      可視性レベル指定
    </td>
    
    <td>
      <code>DeveloperMetadataVisibility.DOCUMENT</code>
    </td>
  </tr>
</table></figure> 

こんな感じで、条件を組み合わせることで、かなり細かい検索ができるようになるんよ。

## 実践的な使い方

実際にプロジェクトで使うとき、こんなふうにメタデータを活用できるばい！

### 動的な列参照システム

例えば、スプレッドシートの列位置が変わっても影響を受けないように、列にメタデータを設定しておくことができるんよ。これによって、列の位置が変わっても、その列を参照するコードを変える必要がないんよ！

<pre class="wp-block-code"><code>function initializeSheet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()&#91;0];

  headers.forEach((header, index) =&gt; {
    sheet.getRange(1, index + 1)
      .addDeveloperMetadata("column_id", header);
  });
}

function getColumnByHeader(header) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const meta = sheet.createDeveloperMetadataFinder()
    .withKey("column_id")
    .withValue(header)
    .find();

  if (meta.length &gt; 0) {
    return meta&#91;0].getLocation().getColumn();
  }
  throw new Error(`Column ${header} not found`);
}
</code></pre>

この方法なら、列の順番が変わってもメタデータを使って正しい列を取得できるんよ。

### 動的データ検証ルール

また、データの検証ルールを動的に管理することもできるんよ。メタデータを活用して、入力データに対する検証ルールを設定できるんやけど、例えば「日付」や「リスト」の検証を以下のように管理できるばい。

<pre class="wp-block-code"><code>function applyDynamicValidation() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const validationRules = sheet.createDeveloperMetadataFinder()
    .withKey("validation_rule")
    .find();

  validationRules.forEach(rule =&gt; {
    const range = rule.getLocation().getRange();
    const ruleType = rule.getValue().split(':')&#91;0];
    const ruleValue = rule.getValue().split(':')&#91;1];

    switch(ruleType) {
      case 'DATE':
        applyDateValidation(range, ruleValue);
        break;
      case 'LIST':
        applyListValidation(range, ruleValue.split(','));
        break;
      // 他の検証タイプを追加...
    }
  });
}
</code></pre>

これなら、検証ルールを動的に変更できるけん、柔軟なデータ管理ができるんだよ。

## 結論

`createDeveloperMetadataFinder()`メソッドを使いこなすことで、スプレッドシート内のデータ管理が格段に楽になるばい。特に、大規模なデータを扱う場合や、動的にデータの位置が変わるようなシチュエーションでは、このメソッドがめっちゃ役立つんよ。ぜひ、実際のプロジェクトで試してみて、メタデータを活用した効率的なシステムを作り上げてほしいな！

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
  <a rel="noopener" href="https://hajiritsu.com/spreadsheet-gas-createdevelopermetadatafinder/" title="Google&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12398;&#12513;&#12479;&#12487;&#12540;&#12479;&#12434;&#26908;&#32034;&#12377;&#12427;&#26041;&#27861; | createDeveloperMetadataFinder&#38306;&#25968; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-createdevelopermetadatafinder%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-createdevelopermetadatafinder%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12398;&#12513;&#12479;&#12487;&#12540;&#12479;&#12434;&#26908;&#32034;&#12377;&#12427;&#26041;&#27861; | createDeveloperMetadataFinder&#38306;&#25968; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-createdevelopermetadatafinder/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-createdevelopermetadatafinder/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/ume3003/items/1554a95f524b1595a1c0" title="GAS DeveloperMetadata【３月２０日修正】 - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRmF2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tJTJGdSUyRjc2MTYzMSUzRnYlM0QzP2l4bGliPXJiLTQuMC4wJmFyPTElM0ExJmZpdD1jcm9wJm1hc2s9ZWxsaXBzZSZiZz1GRkZGRkYmZm09cG5nMzImcz1hOWRiOTRiYzk3OWU1YWMzNWYwMWQ3ODg2YmMwMjY5Ng%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3Dfb0b4c1657ab12e36bc5ec7fb460d509?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R0FTJTIwRGV2ZWxvcGVyTWV0YWRhdGElRTMlODAlOTAlRUYlQkMlOTMlRTYlOUMlODglRUYlQkMlOTIlRUYlQkMlOTAlRTYlOTclQTUlRTQlQkYlQUUlRTYlQUQlQTMlRTMlODAlOTEmdHh0LWFsaWduPWxlZnQlMkN0b3AmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT01NiZ0eHQtcGFkPTAmcz05MWU5NjdlYzliZDhhYjRjOTZlNzlhOGZiYmEwODgxMg&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDB1bWUzMDAzJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LXBhZD0wJnM9N2UwZDhkOWUzNjFjOGRjYTAwNGUwNGUyYWVkOWM2ZDI&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=e7c5f0481e35ac82e3fc98b26e7ae5a4" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GAS DeveloperMetadata【３月２０日修正】 - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        とある理由で、PropertiesやCache以外でデータを保存する方法を検討しました MetadataFinderを使わないと見つけられないのでソース修正しました 1.PropertiesとCache どちらも、そのスクリプト内でしか利用...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/ume3003/items/1554a95f524b1595a1c0" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/ume3003/items/1554a95f524b1595a1c0" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://stackoverflow.com/questions/53974041/practical-use-case-of-developermetadata-in-gas" title="Practical use case of DeveloperMetadata in GAS" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Practical use case of DeveloperMetadata in GAS
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        I recently found published new Classes and methods of Spreadsheet related to DeveloperMetadata, and I am seeking code ex...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/53974041/practical-use-case-of-developermetadata-in-gas" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/53974041/practical-use-case-of-developermetadata-in-gas" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
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
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" title="Spreadsheet Service  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        Spreadsheet Service  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a>
</div>
