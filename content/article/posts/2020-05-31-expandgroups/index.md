---
title: GASでスプレッドシートのグループ化された折りたたみを展開する方法
author: arukayies
date: 2020-05-31T11:56:24+00:00
excerpt: GASでスプレッドシートのグループ化された折りたたみを展開する方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1590926185
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
tags:
  - "GAS"
tags:
  - expandGroups()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年5月"]
---
どーも！今日はGoogle Apps Script（GAS）を使ってスプレッドシートのグループ化された行や列を展開する`expandGroups()`メソッドについて話していくばい！

スプレッドシートでグループ化を使うと、データを折りたたんでスッキリ整理できるっちゃけど、 一括で展開したい時にポチポチ手動でやるのはめんどいさね。そこで、`expandGroups()`を使えば一発で展開できるんじゃ！


<hr class="wp-block-separator has-alpha-channel-opacity" />

## expandGroups()って何するメソッドけ？

`expandGroups()`は、指定した範囲のグループをすべて展開するメソッドたい。 つまり、「この範囲のグループを全部開いてね！」って指示を出す感じじゃ。

例えば、次のコードを実行すると、&#8221;A1:D10&#8243; の範囲にあるグループが展開されるばい！

<pre class="wp-block-code"><code>const range = sheet.getRange("A1:D10");
range.expandGroups();
</code></pre>

GASの公式ドキュメントにも書いてあるけど、このメソッドは`Range`クラスに属していて、 呼び出した範囲のグループを展開する動作をするっちゃ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## expandGroups()の実装手順ば紹介するばい！

### 1. シート全体のグループを展開する

<pre class="wp-block-code"><code>function expandAllGroups() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const dataRange = sheet.getDataRange();
  
  dataRange.expandGroups();
  SpreadsheetApp.flush();
}
</code></pre>

このスクリプトを実行すると、アクティブなシートのすべてのグループが展開されるばい！ `SpreadsheetApp.flush();`を使うことで、すぐに反映されるっちゃね。

### 2. 選択範囲だけグループを展開する

<pre class="wp-block-code"><code>function expandSelectedGroups() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const selection = sheet.getSelection();
  const activeRange = selection.getActiveRange();
  
  activeRange.expandGroups();
}
</code></pre>

これは、ユーザーが選択した範囲のグループだけを展開するスクリプトじゃ。 「ここだけ開きたい！」って時に便利ばい。

### 3. onEditトリガーで自動展開する

<pre class="wp-block-code"><code>function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  
  if (range.getA1Notation() === "A1" && e.value === "TRUE") {
    sheet.getRange("B2:F20").expandGroups();
  }
}
</code></pre>

これは、セルA1の値が`TRUE`に変わったら、指定範囲のグループを展開するスクリプトたい。 チェックボックスと組み合わせると、簡単に開閉を制御できるさ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## expandGroups()を使う時の注意点

<ol class="wp-block-list">
  <li>
    <strong>展開するグループがない場合は何も起こらん</strong>
  </li>
  <li>
    <strong>管理者権限が必要な場合がある</strong>（組織のGAS設定を確認しよう）
  </li>
  <li>
    <strong>範囲の指定ミスに注意</strong>（存在しない範囲を指定するとエラーが出るばい）
  </li>
</ol>

エラーが出た時の対処としては、こんな風に`try-catch`を使うといいっちゃね。

<pre class="wp-block-code"><code>function safeExpandGroups() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("A1:D10").expandGroups();
  } catch (e) {
    console.error("エラー発生: " + e.message);
    SpreadsheetApp.getUi().alert("グループ展開に失敗しました");
  }
}
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## まとめ

`expandGroups()`を使えば、スプレッドシートのグループを効率的に管理できるばい！

<ul class="wp-block-list">
  <li>
    シート全体のグループを展開する
  </li>
  <li>
    選択範囲だけ展開する
  </li>
  <li>
    onEditトリガーを活用して自動展開する
  </li>
  <li>
    try-catchを使ってエラー処理をする
  </li>
</ul>

こんな感じで、GASを活用すれば作業がグッと楽になるけん、ぜひ試してみてばい！


<hr class="wp-block-separator has-alpha-channel-opacity" />

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/v90b15eef664021f94a1ab8a4ca14c533325a9006d6183b165fb79714a6fcd6a0/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/v90b15eef664021f94a1ab8a4ca14c533325a9006d6183b165fb79714a6fcd6a0/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
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
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-group-collapse-expand/" title="【GAS】スプレッドシートの行列グループ化・解除・折りたたみ・展開機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/group.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/group.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートの行列グループ化・解除・折りたたみ・展開機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートの行列グループ化・解除・折りたたみ・展開機能をすべてまとめました。どうでもいいデータ行なんだけど削除はしたくない、ポチっと押すだけですぐ見えるようにしたい、という場面でグループ化は大いに役立ちますね。そんな
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-group-collapse-expand/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-group-collapse-expand/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://note.com/taraco123/n/nbebeb2f2ff47" title="【視聴者リクエスト】Googleスプレッドシートでグループ化したい！！【Google Apps Script（GAS）】｜事務職たらこ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/61882500/rectangle_large_type_2_c87f9941aba903fb40db4fc4cb8019e8.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/61882500/rectangle_large_type_2_c87f9941aba903fb40db4fc4cb8019e8.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【視聴者リクエスト】Googleスプレッドシートでグループ化したい！！【Google Apps Script（GAS）】｜事務職たらこ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Googleアプリ操作の自動化が簡単にできるGoogle Apps Script（GAS） これを抑えておけば業務効率がグッとアップします🙆‍♀️ 今回はスプレッドシートでグループを作成＆操作する方法を解説しました！是非これを機会にGAS習...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/taraco123/n/nbebeb2f2ff47" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/taraco123/n/nbebeb2f2ff47" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a>
</div>
