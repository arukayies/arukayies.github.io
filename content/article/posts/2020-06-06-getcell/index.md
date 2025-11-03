---
title: GASでスプレッドシートの特定セルを柔軟に操作する方法
author: arukayies
type: post
date: 2020-06-06T05:52:57+00:00
excerpt: GASでスプレッドシートの範囲内のセルを取得する方法を紹介します！
url: /gas/getcell
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1591422778
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
  - 2025-03-07 22:23:15
categories:
  - GAS
tags:
  - GAS
  - getCell()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）を使ってスプレッドシートを操作する時、`getCell(row, column)`メソッドはとても便利な機能なんだよ。この記事では、このメソッドを使いこなすための基本から応用まで、初心者にもわかりやすく説明するけん、ぜひ最後まで読んでみてね。

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

## 1. getCellメソッドの基本構造

まずは基本の使い方を見てみよう。

### 1-1. getCellメソッドの基本構文

`getCell(row, column)`メソッドは、スプレッドシートの特定のセルを指定するための方法だよ。親範囲（範囲指定されたセル群）の中で、相対的な位置を指定してセルを取得できるんだ。たとえば、次のコードを見てみて。

<pre class="wp-block-code"><code>const parentRange = sheet.getRange("B2:D4");
const targetCell = parentRange.getCell(1, 1); // B2セルを指す
</code></pre>

ここでは、`B2:D4`という範囲から、1行1列目のセル（つまりB2セル）を取得しているんだね。この時、行と列の指定は1から始まる点に注意してね。

### 1-2. 座標指定の特徴

`getCell`を使うとき、行番号や列番号の指定にはいくつかの特徴があるけん覚えておこう。

<ul class="wp-block-list">
  <li>
    行番号は親範囲の最上行から1をスタート。
  </li>
  <li>
    列番号は親範囲の最左列から1をスタート。
  </li>
  <li>
    範囲外の番号を指定するとエラーになるから注意してな。
  </li>
</ul>

たとえば、次のような指定だとどうなるか見てみよう。

<pre class="wp-block-code"><code>const range = sheet.getRange("C3:E5"); // 3行3列の範囲
const cell = range.getCell(2, 3); // 絶対位置E4（C3から2行下、3列右）
</code></pre>

この場合、`C3`から数えて2行下、3列右のE4セルが取得できるわけだよ。

## 2. 実践的なgetCellの使い方

実際に使う時の例を見てみよう。これでデータ処理がもっと楽になるけん。

### 2-1. テーブルデータの逐次処理

スプレッドシートに成績データがあるとして、90点以上の学生をハイライトしたい時、こんな感じで使えるよ。

<pre class="wp-block-code"><code>function processTableData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getRange("A2:C10");

  for (let i = 1; i &lt;= dataRange.getNumRows(); i++) {
    const scoreCell = dataRange.getCell(i, 3); // 成績が入ってる列
    const nameCell = dataRange.getCell(i, 2); // 名前が入ってる列

    if (scoreCell.getValue() &gt;= 90) {
      nameCell.setBackground("#b7e1cd"); // 90点以上は名前セルをハイライト
    }
  }
}
</code></pre>

このコードでは、A2からC10までの範囲から、90点以上の成績を持っている学生の名前セルをハイライトするんだよ。

### 2-2. 動的な範囲制御

次は、データが増減する場合に役立つ使い方。たとえば、新しく追加されたデータを自動で処理する場合。

<pre class="wp-block-code"><code>function processDynamicRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow(); // 最終行を取得
  const range = sheet.getRange(2, 1, lastRow-1, 3);

  range.getCell(1, 1).setValue("更新日時"); // 更新日時を1行目に追加
  range.getCell(1, 2).setValue(new Date()); // 現在日時を設定
}
</code></pre>

このように、データの最終行を動的に取得して処理できるんだね。

## 3. getRangeとの併用

`getCell`を使う場面では、`getRange`と一緒に使うことが多いんだよ。例えば、大きな範囲から特定のセルを取り出す時。

<pre class="wp-block-code"><code>const masterSheet = SpreadsheetApp.openById("シートID").getSheetByName("データ");
const baseRange = masterSheet.getRange("B5:M100");
const criticalCell = baseRange.getCell(45, 3).setFontColor("red"); // 45行目、3列目のセルを赤くする
</code></pre>

こうすると、大きな範囲から必要なセルだけを効率よく操作できるんだね。

## 4. 高度な応用テクニック

少し進んだ使い方も覚えておこう。

### 4-1. 条件付き書式の動的適用

たとえば、特定のセルに注釈や背景色を動的に変更する場合。

<pre class="wp-block-code"><code>function applyConditionalFormatting() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();

  dataRange.getCell(5, 2).setBackground("#fff2cc");
  dataRange.getCell(5, 2).setNote("重要：月末在庫確認必須");
}
</code></pre>

これで、セルに背景色やメモを付けることができるよ。

### 4-2. 配列との連携

`getCell`を使って、配列と一緒にデータを更新することもできるんだよ。

<pre class="wp-block-code"><code>function updateFromArray() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getRange("A1:C3");
  const values = dataRange.getValues();

  values&#91;1]&#91;1] = "更新値"; // 配列内の値を変更
  dataRange.getCell(2, 2).setValue(values&#91;1]&#91;1]); // セルに反映
}
</code></pre>

こうすれば、配列操作と組み合わせて効率よくデータを更新できるんだね。

## 5. エラー処理とデバッグ

最後に、エラー処理も覚えておこう。`getCell`を使う時に範囲外を指定するとエラーが出るから、それを防ぐ方法だよ。

<pre class="wp-block-code"><code>try {
  const invalidCell = sheet.getRange("A1:B2").getCell(3, 1);
} catch (e) {
  console.error("エラー発生:", e.message);
  // 範囲外アクセス時の代替処理
  const validCell = sheet.getRange("A3");
}
</code></pre>

こうすることで、エラーが発生しても適切に処理できるんだよ。

## 結論

`getCell(row, column)`は、スプレッドシート内で特定のセルを操作するために非常に役立つメソッドなんだよ。その特徴を理解してうまく使うことで、効率的なスクリプトを作れるようになるけん、ぜひ実践してみてね！

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
  
  <br /> <a rel="noopener" href="https://stackoverflow.com/questions/44024096/get-cell-value-by-row-and-column-number-using-google-script" title="Attention Required! | Cloudflare" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstackoverflow.com%2Fquestions%2F44024096%2Fget-cell-value-by-row-and-column-number-using-google-script?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstackoverflow.com%2Fquestions%2F44024096%2Fget-cell-value-by-row-and-column-number-using-google-script?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
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
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/44024096/get-cell-value-by-row-and-column-number-using-google-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/44024096/get-cell-value-by-row-and-column-number-using-google-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a>
</div>

じゃ、試してみてな！
