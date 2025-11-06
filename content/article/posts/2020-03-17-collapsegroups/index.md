---
title: GASでスプレッドシートのグループ化された行・列を一括で折りたたむ方法
author: arukayies
date: 2020-03-17T13:03:09+00:00
excerpt: GASでスプレッドシートのグループ化されている行・列を折りたたむ方法を紹介します！
toc: true
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
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1248329110880837632";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1248329110880837632";s:5:"pDate";s:19:"2020-04-09 19:17:07";}}";
tags:
  - "GAS"
tags:
  - collapseGroups()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）の`collapseGroups()`メソッドって、スプレッドシートを効率的に管理するのにめっちゃ便利なツールばい。特に、グループ化した行や列を一気に折りたたむことで、視覚的に整理整頓できるんよ。でも、使い方を知らんと結構難しく感じるけど、しっかり理解すればめっちゃ簡単に活用できるけ。

この記事では、`collapseGroups()`メソッドを使う方法をわかりやすく解説するけ、グループ管理を楽にしたい人にピッタリやけ。さらに、実際にどう使うかを具体例を交えて紹介するけ、ぜひ最後まで読んでいってな！


## collapseGroups()メソッドとは？

`collapseGroups()`は、Google Apps Scriptの`Range`クラスにあるメソッドで、スプレッドシートでグループ化された行や列を折りたたむために使うんよ。このメソッドを使うことで、シートがすっきりして、見やすくなるけ。

### 基本の使い方

まず、メソッドの基本的な使い方やけど、こんな感じでコードを書くと簡単にグループを折りたためるんよ。

<pre class="wp-block-code"><code>function collapseActiveGroups() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  range.collapseGroups();
}
</code></pre>

これで、ユーザーが選んだ範囲にあるグループを折りたたむことができるんよ。

## 実装例と活用方法

### 1. グループを作ったら即折りたたみ

例えば、グループを作ったらすぐに折りたたむ処理も簡単にできるんよ。こんな感じでコードを書けば、グループ化して即座に折りたたむことができるけ。

<pre class="wp-block-code"><code>function createAndCollapseGroup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const targetRange = sheet.getRange("B2:D5");
  
  // 行グループを作成
  targetRange.shiftRowGroupDepth(1);
  
  // 列グループを作成
  targetRange.shiftColumnGroupDepth(1);
  
  // グループを折りたたみ
  targetRange.collapseGroups();
}
</code></pre>

これで、B2からD5の範囲をグループ化した後、自動的に折りたたむことができるけ。

### 2. 特定の条件で折りたたみ

もっと高度な使い方として、条件に合わせてグループを折りたたむ方法もあるんよ。例えば、A列に「非表示」と書かれた行だけを折りたたむコードはこんな感じ。

<pre class="wp-block-code"><code>function conditionalCollapse() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  values.forEach((row, index) =&gt; {
    if (row&#91;0] === "非表示") {
      const targetRange = sheet.getRange(index + 1, 1);
      if (targetRange.getRowGroupDepth() &gt; 0) {
        targetRange.collapseGroups();
      }
    }
  });
}
</code></pre>

これで、A列に「非表示」と書かれている行のグループを折りたたむことができるんよ。便利じゃろ？

## 応用事例

### 大きなデータセットの管理

大量のデータがある場合、最初から詳細なデータを折りたたんで、必要な部分だけ表示することでシートがスッキリするけ。例えば、次のようにして、特定のセクションを折りたたむことができるんよ。

<pre class="wp-block-code"><code>function initializeReportView() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("年度レポート");
  const detailSections = &#91;"B8:B20", "D8:D15", "F5:F30"];
  
  detailSections.forEach(rangeAddress =&gt; {
    const range = sheet.getRange(rangeAddress);
    range.shiftRowGroupDepth(1);
    range.collapseGroups();
  });
}
</code></pre>

これを使えば、レポートを開いたときに補助データが非表示になって、主要なデータに集中できる環境が整うんよ。

## トラブルシューティング

`collapseGroups()`を使う時に、うまく動かんこともあるかもしれんけ、よくあるエラーとその解決方法を紹介するけ。

### よくあるエラー

<ul class="wp-block-list">
  <li>
    <strong>範囲指定が誤っている</strong>：指定した範囲にグループが完全に含まれていない場合。
  </li>
  <li>
    <strong>グループ階層が深すぎる</strong>：最大8階層を超えているとエラーになるけ。
  </li>
  <li>
    <strong>権限不足</strong>：スクリプトが必要な権限を持っていない場合、エラーが発生することがあるけ。
  </li>
</ul>

### デバッグ方法

<ul class="wp-block-list">
  <li>
    <code>getRowGroupDepth()</code>や<code>getColumnGroupDepth()</code>を使って、グループの深さを確認しよう。
  </li>
  <li>
    範囲が正しいかどうか、<code>getA1Notation()</code>を使って確認してみてな。
  </li>
</ul>

## 結論

`collapseGroups()`メソッドは、スプレッドシートの管理を効率的にしてくれるすごい機能なんよ。グループ化した行や列を一気に折りたたむことで、データの可視化が簡単になるけ。特に、業務で大量のデータを扱う人には超便利なツールやけ、ぜひ使ってみてな！


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
  
  <br /> <a rel="noopener" href="https://note.com/mir4545/n/ne44ba86db5b2" title="Googleスプレッドシート 行グループ・列グループで表をスッキリ！（GAS/ショートカット）｜mir" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/148684298/rectangle_large_type_2_bc0a809cec361a1d4219fc12f9a854df.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/148684298/rectangle_large_type_2_bc0a809cec361a1d4219fc12f9a854df.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Googleスプレッドシート 行グループ・列グループで表をスッキリ！（GAS/ショートカット）｜mir
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        今回はGoogleスプレッドシートの機能「行グループ・列グループ」について書きます。（予定変更しました） あんまよい表じゃないけど、こういう表の作成依頼は多い Googleスプレッドシートで ↑ こんな表を作る時に便利なのが、行や列のグルー...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/mir4545/n/ne44ba86db5b2" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/mir4545/n/ne44ba86db5b2" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a>
</div>

このブログが役に立ったら、ぜひシェアしてな！
