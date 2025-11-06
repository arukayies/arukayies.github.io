---
title: GASでスプレッドシートのセル範囲をアクティブに設定する方法
author: arukayies
type: post
date: 2020-03-08T01:22:47+00:00
excerpt: GASでスプレッドシートの指定範囲をアクティブにする方法を紹介します！
url: /gas/activate
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
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1245574127341068290";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1245574127341068290";s:5:"pDate";s:19:"2020-04-02 04:49:48";}}";
last_modified:
  - 2025-03-07 22:34:52
categories:
  - GAS
tags:
  - activate()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）でよく使われる`activate()`メソッド、みんな使ったことあるかい？今回は、このメソッドがどんなふうにスプレッドシートの操作を便利にしてくれるかを、具体的なコード例とともに解説していくけんね。どんな初心者でも、スムーズに使えるようになる方法を伝授するけ！参考にした情報源も載せとくけ、ぜひチェックしてみてや。

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

## activate()メソッドって何？

まずは、`activate()`メソッドの基本的な動きについて理解しておこう。簡単に言うと、`activate()`はシートをアクティブ化するためのメソッドで、どんなシートをアクティブにするかを指定することができるんだ。これを使うことで、シートの切り替えが簡単になるけ、スプレッドシートの操作がとても便利になるよ。

例えば、特定のシートをアクティブにするコードはこんな感じだっちゃ。

<pre class="wp-block-code"><code>const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
const targetSheet = spreadsheet.getSheetByName('月次報告');
targetSheet.activate();  // 月次報告シートをアクティブ化
</code></pre>

これで、`月次報告`シートが表示されるようになるばい。シートが切り替わるだけで、内容が変わることはないけど、操作の流れがスムーズになるんじゃ。

## 活用例: シートの切り替え

次に、`activate()`をどう活用するかを見てみよう。例えば、営業データを管理するシートに切り替えたい場合はどうするか？

<pre class="wp-block-code"><code>function activateSalesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const salesSheet = ss.getSheetByName('営業データ');
  
  if (salesSheet) {
    salesSheet.activate();
    Logger.log(`アクティブシート: ${salesSheet.getName()}`);
  } else {
    Logger.log('指定シートが存在しません');
  }
}
</code></pre>

こうすれば、`営業データ`シートがアクティブになり、その後の処理に使うことができるんだわ。しっかりエラーハンドリングもできるから、もしシートがないときも問題ないようになっとるんじゃ。

## 高度な使い方: 条件付きでシートをアクティブ化

さらに、条件によってシートを切り替える高度な使い方もできるんじゃ。たとえば、`日次レポート`シートが、`生データ`シートに100行以上データがあったらアクティブにする、なんてこともできるさ。

<pre class="wp-block-code"><code>function conditionalActivation() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const reportSheet = ss.getSheetByName('日次レポート');
  const dataSheet = ss.getSheetByName('生データ');
  
  const lastRow = dataSheet.getLastRow();
  if (lastRow &gt; 100) {
    reportSheet.activate();
    generateSummaryReport();
  }
}
</code></pre>

これで、一定の条件を満たす場合だけシートを切り替えることができるんじゃ。たとえば、データ量が増えてレポートを作成する必要があるときに便利やね。

## トリガーやマルチユーザーでの注意点

ただし、注意点もあるけんね。`activate()`を使うとき、`onEdit()`や`onChange()`といったイベントトリガーで使うと、画面の切り替えが即座に反映されないことがあるんじゃ。これは、スクリプトが実行されるタイミングとブラウザの描画がズレるから、こればっかりは注意が必要だっちゃ。

<pre class="wp-block-code"><code>function onEdit(e) {
  // 編集イベントでシート切り替えを試みるが動作しない場合がある
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName('ログ').activate();
}
</code></pre>

あと、共有スプレッドシートでは、ユーザーごとにアクティブなシートが異なることもあるけ。自分がアクティブ化しても、他のユーザーには影響しないからその点も覚えといてな。

## より効率的にシートを扱う方法

シートがたくさんある場合、どんどんシートをアクティブ化していると、操作が遅くなることがあるけど、これを防ぐ方法もあるよ。たとえば、操作をバッチでまとめて行う方法や、よく使うシートをキャッシュしておく方法を使えば、処理速度がグッと早くなるんじゃ。

<pre class="wp-block-code"><code>function batchSheetOperations() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  
  // 非アクティブシートに対する操作
  sheets.forEach(sheet =&gt; {
    if (sheet.getName() !== 'ダッシュボード') {
      sheet.hideSheet();
    }
  });
  
  // 最終的にアクティブ化
  ss.getSheetByName('ダッシュボード').activate();
}
</code></pre>

こんなふうに、シートをまとめて操作することで、スムーズに進めることができるんだわ。

## セキュリティ面の注意

最後に、セキュリティに関しても気をつけときたいポイントがあるけ。たとえば、ユーザーごとにアクセスできるシートを制限するような方法もあるけんね。これで、権限がないユーザーが特定のシートをアクティブにするのを防げるんじゃ。

<pre class="wp-block-code"><code>function secureActivation() {
  const userEmail = Session.getActiveUser().getEmail();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (isAdmin(userEmail)) {
    ss.getSheetByName('管理画面').activate();
  } else {
    ss.getSheetByName('一般画面').activate();
  }
}

function isAdmin(email) {
  const admins = &#91;'admin@example.com', 'supervisor@example.com'];
  return admins.includes(email);
}
</code></pre>

これで、管理者だけがアクセスできるシートを設定することができるけ。

## まとめ

`activate()`メソッドは、GASを使ってスプレッドシートを操作する際に欠かせない機能じゃ。シートをアクティブにするだけで、作業の流れがスムーズになるし、条件に応じたシート切り替えや、パフォーマンスの最適化も簡単にできるんだわ。

うまく使いこなすことで、スプレッドシートをより効率的に活用できるようになるけ、ぜひ試してみてや！

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
  <a rel="noopener" href="https://spreadsheet.dev/activate-sheet-in-google-sheets-using-google-apps-script" title="Activate a sheet in Google Sheets using Google Apps Script" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fspreadsheet.dev%2Factivate-sheet-in-google-sheets-using-google-apps-script?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fspreadsheet.dev%2Factivate-sheet-in-google-sheets-using-google-apps-script?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Activate a sheet in Google Sheets using Google Apps Script
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Learn how to programmatically activate a sheet using Apps Script.
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://spreadsheet.dev/activate-sheet-in-google-sheets-using-google-apps-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://spreadsheet.dev/activate-sheet-in-google-sheets-using-google-apps-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          spreadsheet.dev
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://note.com/mir4545/n/na5f1defd5464" title="Googleスプレッドシート GASを使って、あしたへジャンプ！ (GASで日付を扱うポイント他)｜mir" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/99067718/rectangle_large_type_2_a04a3e529e47a0ce6f8d441ce80bbf87.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/99067718/rectangle_large_type_2_a04a3e529e47a0ce6f8d441ce80bbf87.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Googleスプレッドシート GASを使って、あしたへジャンプ！ (GASで日付を扱うポイント他)｜mir
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        前回の XMATCH 超応用例 から派生した小ネタです。 ちなみに「あしたへジャンプ」は 1990年代前半に NHKの教育テレビで放送されていた 小学校高学年向けの道徳ドラマです。 あしたへジャンプ - Wikipediaja.wikipe...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/mir4545/n/na5f1defd5464" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/mir4545/n/na5f1defd5464" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://jp.tdsynnex.com/blog/google/gas-trigger/" title="Google Apps Scriptのトリガーについて – TD SYNNEX BLOG" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://jp.tdsynnex.com/blog/wp-content/uploads/2021/09/gas-trigger-jpg.webp" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://jp.tdsynnex.com/blog/wp-content/uploads/2021/09/gas-trigger-jpg.webp" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Scriptのトリガーについて – TD SYNNEX BLOG
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script（GAS）は、Googleのさまざまなサービス（Gmail、Google Sheets、Google
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://jp.tdsynnex.com/blog/google/gas-trigger/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://jp.tdsynnex.com/blog/google/gas-trigger/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          jp.tdsynnex.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://teratail.com/questions/192168" title="GASのgetActiveCell()が動作しない" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://teratail.com/img/ogpImages/imgFacebookShare.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://teratail.com/img/ogpImages/imgFacebookShare.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASのgetActiveCell()が動作しない
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GoogleAppsScriptの『getActivecell()』について質問です。昨日まで正常に動作していましたが、今日は正常に動作せず、大変困っています。GASに何か不具合等が発生し
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://teratail.com" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://teratail.com" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          teratail.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://net-trouble.portal.jp.net/archives/41770" title="GAS&#12456;&#12521;&#12540;&#12434;&#35299;&#28040;&#12377;&#12427;&#12383;&#12417;&#12398;&#20855;&#20307;&#30340;&#12394;&#25163;&#38918;&#12399;&#20309;&#12391;&#12377;&#12363;&#65311; - &#12493;&#12483;&#12488;&#12488;&#12521;&#12502;&#12523;&#12509;&#12540;&#12479;&#12523;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fnet-trouble.portal.jp.net%2Farchives%2F41770?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fnet-trouble.portal.jp.net%2Farchives%2F41770?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GAS&#12456;&#12521;&#12540;&#12434;&#35299;&#28040;&#12377;&#12427;&#12383;&#12417;&#12398;&#20855;&#20307;&#30340;&#12394;&#25163;&#38918;&#12399;&#20309;&#12391;&#12377;&#12363;&#65311; - &#12493;&#12483;&#12488;&#12488;&#12521;&#12502;&#12523;&#12509;&#12540;&#12479;&#12523;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://net-trouble.portal.jp.net/archives/41770" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://net-trouble.portal.jp.net/archives/41770" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          net-trouble.portal.jp.net
        </div>
      </div>
    </div>
  </div></a>
</div>
