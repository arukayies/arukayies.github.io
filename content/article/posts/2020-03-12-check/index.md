---
title: GASでスプレッドシートのチェックボックスを一括でオンにする方法
author: arukayies
type: post
date: 2020-03-12T12:52:11+00:00
excerpt: GASでスプレッドシートのチェックボックスをオンにする方法を紹介します！
url: /gas/check
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
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1247043260691828736";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1247043260691828736";s:5:"pDate";s:19:"2020-04-06 06:07:37";}}";
last_modified:
  - 2025-03-07 22:42:23
categories:
  - GAS
tags:
  - check()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）を使うと、Googleスプレッドシート上でチェックボックスを簡単に操作できるようになるばい。これをうまく活用すれば、データ管理がぐっと楽になるけん、ぜひ試してみてほしいな。今回は、チェックボックスを操作するための基本的なメソッドや使い方を、やさしく解説していくけ。

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

## チェックボックスの基本

まず、Googleスプレッドシートで使えるチェックボックスは、**TRUE（チェックされている）** と **FALSE（チェックされていない）** という値を使って動作するんよ。これを理解しておけば、チェックボックスを使った操作はスムーズにできるけ。

### メソッドの分類

GASで使えるチェックボックス操作のメソッドは大きく分けて3つのカテゴリがあるばい。

<ol class="wp-block-list">
  <li>
    <strong>状態設定メソッド</strong>：<code>check()</code>, <code>uncheck()</code>, <code>toggle()</code>
  </li>
  <li>
    <strong>状態確認メソッド</strong>：<code>isChecked()</code>
  </li>
  <li>
    <strong>バリデーションメソッド</strong>：<code>getDataValidations()</code>, <code>createCheckboxValidation()</code>
  </li>
</ol>

特に、`check()`メソッドを使えば、指定した範囲内のチェックボックスを一気にチェックできるんよ。このメソッドを使いこなすことができれば、タスク管理やデータ処理が効率化されるけ。

## check()メソッドの使い方

例えば、`check()`メソッドを使うことで、特定の範囲内のチェックボックスを一括で選択できるんよ。こんな感じで使うばい。

<pre class="wp-block-code"><code>const range = sheet.getRange('A2:A10');
range.check(); // 範囲内のチェックボックスを全選択
</code></pre>

このコードを実行すれば、`A2`から`A10`までのセルにあるチェックボックスを一気にチェックできるけ。ただし、範囲にチェックボックスがないセルが含まれていると、そのセルは無視されるけん、範囲を正確に指定することが大事じゃ。

## 実際の使い方：タスク管理システム

たとえば、タスク管理のシステムを作りたい場合、以下のようにチェックボックスを一括でチェックすることができるんよ。

<pre class="wp-block-code"><code>function completeTasks() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Tasks');
  const taskRange = sheet.getRange('B2:B');
  const checkboxes = taskRange.getDataValidations()
    .map((row, i) =&gt; &#91;row&#91;0] && row&#91;0].getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX, i+2])
    .filter((&#91;isCheckbox]) =&gt; isCheckbox)
    .map((&#91;, row]) =&gt; sheet.getRange(`A${row}`));
  
  checkboxes.forEach(checkbox =&gt; checkbox.check());
  SpreadsheetApp.getUi().alert('選択可能タスクを全て完了済みに更新しました');
}
</code></pre>

このスクリプトは、B列にチェックボックスバリデーションが設定されている行のA列チェックボックスを全て選択するものじゃ。`getDataValidations()`を使ってチェックボックスの範囲を動的に取得できるけん、柔軟な操作が可能になるんよ。

## isChecked()メソッドの使い方

次は、チェックボックスがチェックされているかどうかを確認する`isChecked()`メソッドについても触れておくけ。これを使うことで、チェックボックスの状態を簡単に確認できるんじゃ。

<pre class="wp-block-code"><code>function validateCheckboxes() {
  const sheet = SpreadsheetApp.getActive().getActiveSheet();
  const range = sheet.getRange('A2:A10');
  const values = range.getValues();
  
  values.forEach((&#91;checkboxValue], rowIndex) =&gt; {
    const cell = range.getCell(rowIndex + 1, 1);
    if (cell.isChecked() === null) {
      throw new Error(`行 ${rowIndex + 2} はチェックボックスではありません`);
    }
  });
}
</code></pre>

このコードでは、`isChecked()`を使って、チェックボックスの状態を確認し、不正なセルを検出してエラーを投げてるんよ。これでデータの整合性が保たれるけん、大事な部分じゃ。

## 応用的な使い方

`check()`メソッドと`uncheck()`メソッドを組み合わせることで、データの選択状態を動的に制御することもできるけん、在庫管理などでも活用できるよ。例えば、以下のようにチェックボックスの選択状態を条件に応じて変更することができるんじゃ。

<pre class="wp-block-code"><code>function smartCheck(threshold = 0.8) {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Inventory');
  const dataRange = sheet.getDataRange();
  const checkboxCol = 1;
  
  const checkStates = dataRange.getValues().map(row =&gt; row&#91;checkboxCol - 1]);
  const total = checkStates.filter(state =&gt; typeof state === 'boolean').length;
  const checkedCount = checkStates.filter(state =&gt; state === true).length;
  
  if (checkedCount / total &gt;= threshold) {
    dataRange.uncheck();
  } else {
    dataRange.check();
  }
}
</code></pre>

このコードは、チェックされた項目の割合が指定された閾値を超えたら、全てのチェックボックスを解除する、という処理をしているんよ。逆に、閾値を下回った場合は、全て選択するようになってるばい。

## デバッグとエラー処理

スクリプトを使う上で、エラー処理やデバッグは欠かせんけん、しっかりチェックしておく必要があるばい。以下のコードで、個々のセルの状態をログに出力して、デバッグしやすくしてるんよ。

<pre class="wp-block-code"><code>function debugCheckboxBehavior() {
  const cell = SpreadsheetApp.getActive().getRange('A1');
  console.log({
    value: cell.getValue(),
    isCheckbox: cell.getDataValidation()?.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX,
    isChecked: cell.isChecked()
  });
}
</code></pre>

このように、`console.log()`を使うことで、チェックボックスの状態や種類を確認できるけ、デバッグ作業が楽になるんじゃ。

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
  <a rel="noopener" href="https://zumilog.org/checkbox_gas" title="スプレッドシートのチェックボックスの値を判定し処理を実行する方法【GAS】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://zumilog.assets.newt.so/v1/f1a708bb-ba87-4728-b3c3-5d71570ca420/checkbox_gas-940x539.jpg?width=1200&#038;height=630&#038;format=png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://zumilog.assets.newt.so/v1/f1a708bb-ba87-4728-b3c3-5d71570ca420/checkbox_gas-940x539.jpg?width=1200&#038;height=630&#038;format=png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        スプレッドシートのチェックボックスの値を判定し処理を実行する方法【GAS】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        本記事ではGoogleスプレッドシートのチェックボックスの値を判定して処理を実行する方法を解説しています。実際の例を交えてわかりやすく解説していますのでご覧くださいませ
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://zumilog.org/checkbox_gas" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://zumilog.org/checkbox_gas" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          zumilog.org
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://yagisanatode.com/google-apps-script-how-to-check-if-there-is-a-tick-box-check-box-in-a-cell-or-range/" title="https://yagisanatode.com/google-apps-script-how-to-check-if-there-is-a-tick-box-check-box-in-a-cell-or-range/" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fyagisanatode.com%2Fgoogle-apps-script-how-to-check-if-there-is-a-tick-box-check-box-in-a-cell-or-range%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fyagisanatode.com%2Fgoogle-apps-script-how-to-check-if-there-is-a-tick-box-check-box-in-a-cell-or-range%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        https://yagisanatode.com/google-apps-script-how-to-check-if-there-is-a-tick-box-check-box-in-a-cell-or-range/
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://yagisanatode.com/google-apps-script-how-to-check-if-there-is-a-tick-box-check-box-in-a-cell-or-range/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://yagisanatode.com/google-apps-script-how-to-check-if-there-is-a-tick-box-check-box-in-a-cell-or-range/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          yagisanatode.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://note.com/lssa/n/ne2f5043a9b60" title="[GAS]ドキュメントからデータ取得 #9｜Y.Yamada" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/92292490/rectangle_large_type_2_7a8d01a79b0589baa0874f59502e520c.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/92292490/rectangle_large_type_2_7a8d01a79b0589baa0874f59502e520c.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]ドキュメントからデータ取得 #9｜Y.Yamada
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        これまではGASとGmailだけを利用して「メール送信」や「検索結果の取得」、「メール一括削除」などを学んできました。GASは、他にもGoogleドキュメントやGoogleスプレッドシートのデータをGmailと組み合わせることもできます。 ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/lssa/n/ne2f5043a9b60" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/lssa/n/ne2f5043a9b60" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://note.com/mir4545/n/na62fe8eb1dd9" title="【GAS】Googleスプレッドシート自作関数で シート情報を取得する -1｜mir" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/89869144/rectangle_large_type_2_d9eb7a1ad83901195b090644fe76cb71.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/89869144/rectangle_large_type_2_d9eb7a1ad83901195b090644fe76cb71.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】Googleスプレッドシート自作関数で シート情報を取得する -1｜mir
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        これは本編のシリーズネタとは別で、旬の話題や Googleスプレッドシート、GoogleWorkspace関連でランダムに気になったことを書いていく雑談記事です。土日に新しい記事を出していこうかなと思います。 前回の記事 【LAMBDA /...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/mir4545/n/na62fe8eb1dd9" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/mir4545/n/na62fe8eb1dd9" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/ytsuyuzaki/items/a5d8881a6703abe934e1" title="GASで実装した死活監視コードの紹介、あるいはclasp管理の設定例 - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnMzLWFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkZxaWl0YS1pbWFnZS1zdG9yZSUyRjAlMkY2NDA2JTJGYTA4NzA1YzhlOTM4Yjk0ZWIwNzg0ZWU4OWY1ZDdhZmVkNjFiN2QzMyUyRnhfbGFyZ2UucG5nJTNGMTcxNjk2MDE5MD9peGxpYj1yYi00LjAuMCZhcj0xJTNBMSZmaXQ9Y3JvcCZtYXNrPWVsbGlwc2UmYmc9RkZGRkZGJmZtPXBuZzMyJnM9NzExYmFkYzE3MTNjNzhiZjdkODRlN2NhN2JjMmI1Nzg%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3De19aaa62d3cc383fa0f39b10391815a6?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R0FTJUUzJTgxJUE3JUU1JUFFJTlGJUU4JUEzJTg1JUUzJTgxJTk3JUUzJTgxJTlGJUU2JUFEJUJCJUU2JUI0JUJCJUU3JTlCJUEzJUU4JUE2JTk2JUUzJTgyJUIzJUUzJTgzJUJDJUUzJTgzJTg5JUUzJTgxJUFFJUU3JUI0JUI5JUU0JUJCJThCJUUzJTgwJTgxJUUzJTgxJTgyJUUzJTgyJThCJUUzJTgxJTg0JUUzJTgxJUFGY2xhc3AlRTclQUUlQTElRTclOTAlODYlRTMlODElQUUlRTglQTglQUQlRTUlQUUlOUElRTQlQkUlOEImdHh0LWFsaWduPWxlZnQlMkN0b3AmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT01NiZ0eHQtcGFkPTAmcz04ZDM3NWQ5OWMyNzgxZjM5ZDIyNjhlM2JhYWFiZGVhMg&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDB5dHN1eXV6YWtpJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LXBhZD0wJnM9NGU1ZWRkYzc4YjllYTNmMjkzZDliYTg5MjU0MGM1Nzk&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=2e4dce83a3c59120411e1d3e15f93280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASで実装した死活監視コードの紹介、あるいはclasp管理の設定例 - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        webサイトの死活監視をGoogleAppsScript(GAS)で実装してみました。 soramugi/gas-health-check: GooglaAppsScriptで死活監視 1分毎にhttpステータスコードを確認して、ステータス...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/ytsuyuzaki/items/a5d8881a6703abe934e1" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/ytsuyuzaki/items/a5d8881a6703abe934e1" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://zenn.dev/gas/articles/e90b891ea39667" title="【GAS】配列操作を極める：基本から応用まで" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://res.cloudinary.com/zenn/image/upload/s--Siu9sX9S--/c_fit%2Cg_north_west%2Cl_text:notosansjp-medium.otf_55:%25E3%2580%2590GAS%25E3%2580%2591%25E9%2585%258D%25E5%2588%2597%25E6%2593%258D%25E4%25BD%259C%25E3%2582%2592%25E6%25A5%25B5%25E3%2582%2581%25E3%2582%258B%25EF%25BC%259A%25E5%259F%25BA%25E6%259C%25AC%25E3%2581%258B%25E3%2582%2589%25E5%25BF%259C%25E7%2594%25A8%25E3%2581%25BE%25E3%2581%25A7%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Cl_text:notosansjp-medium.otf_37:GAS%25E3%2581%25AE%25E5%25AE%259F%25E8%25A3%2585%25E3%2583%25BB%25E9%2596%258B%25E7%2599%25BA%25E3%2582%2592%25E3%2582%25B5%25E3%2583%259D%25E3%2583%25BC%25E3%2583%2588%25E3%2581%2597%25E3%2581%25BE%25E3%2581%2599%2Cx_203%2Cy_121/g_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3plbm4tdXNlci11cGxvYWQvYXZhdGFyLzM5Nzg5YzgyMTUuanBlZw==%2Cr_max%2Cw_90%2Cx_87%2Cy_95/v1627283836/default/og-base-w1200-v2.png?_a=BACAGSGT" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://res.cloudinary.com/zenn/image/upload/s--Siu9sX9S--/c_fit%2Cg_north_west%2Cl_text:notosansjp-medium.otf_55:%25E3%2580%2590GAS%25E3%2580%2591%25E9%2585%258D%25E5%2588%2597%25E6%2593%258D%25E4%25BD%259C%25E3%2582%2592%25E6%25A5%25B5%25E3%2582%2581%25E3%2582%258B%25EF%25BC%259A%25E5%259F%25BA%25E6%259C%25AC%25E3%2581%258B%25E3%2582%2589%25E5%25BF%259C%25E7%2594%25A8%25E3%2581%25BE%25E3%2581%25A7%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Cl_text:notosansjp-medium.otf_37:GAS%25E3%2581%25AE%25E5%25AE%259F%25E8%25A3%2585%25E3%2583%25BB%25E9%2596%258B%25E7%2599%25BA%25E3%2582%2592%25E3%2582%25B5%25E3%2583%259D%25E3%2583%25BC%25E3%2583%2588%25E3%2581%2597%25E3%2581%25BE%25E3%2581%2599%2Cx_203%2Cy_121/g_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3plbm4tdXNlci11cGxvYWQvYXZhdGFyLzM5Nzg5YzgyMTUuanBlZw==%2Cr_max%2Cw_90%2Cx_87%2Cy_95/v1627283836/default/og-base-w1200-v2.png?_a=BACAGSGT" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】配列操作を極める：基本から応用まで
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://zenn.dev/gas/articles/e90b891ea39667" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://zenn.dev/gas/articles/e90b891ea39667" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          zenn.dev
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://note.com/mir4545/n/na688f0525968" title="【チェックボックス2】厳密な 一括 ON/OFF切り替え  【GASでやろう】｜mir" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/90675569/rectangle_large_type_2_131309f54722b777a05434cab6b1a70a.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/90675569/rectangle_large_type_2_131309f54722b777a05434cab6b1a70a.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【チェックボックス2】厳密な 一括 ON/OFF切り替え 【GASでやろう】｜mir
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        前回のチェックボックスネタの続きです。今回も GAS回です。土日更新の方も今のシリーズはGASなんで、タイミングがかぶっちゃいましたね。。 前回の記事 Googleスプレッドシートの チェックボックスをGASで制御する 前回リージョンという...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/mir4545/n/na688f0525968" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/mir4545/n/na688f0525968" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://spreadsheet.dev/working-with-checkboxes-in-google-sheets-using-google-apps-script" title="Working with Checkboxes in Google Sheets using Google Apps Script" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fspreadsheet.dev%2Fworking-with-checkboxes-in-google-sheets-using-google-apps-script?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fspreadsheet.dev%2Fworking-with-checkboxes-in-google-sheets-using-google-apps-script?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Working with Checkboxes in Google Sheets using Google Apps Script
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Learn how to insert, remove and work with checkboxes in Google Sheets using Google Apps Script.
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://spreadsheet.dev/working-with-checkboxes-in-google-sheets-using-google-apps-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://spreadsheet.dev/working-with-checkboxes-in-google-sheets-using-google-apps-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          spreadsheet.dev
        </div>
      </div>
    </div>
  </div></a>
</div>

GASを使えば、Googleスプレッドシートをもっと便利に使いこなせるようになるけん、ぜひ今回紹介したメソッドを活用してみてほしいな。業務の効率化が進むばい。
