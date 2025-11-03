---
title: GASでスプレッドシートのデータを活用したピボットテーブル作成方法
author: arukayies
type: post
date: 2020-05-25T12:53:12+00:00
excerpt: GASでスプレッドシートのピボットテーブルを作成する方法を紹介します！
url: /gas/createpivottable
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
  - 1590411193
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-03-07 22:53:59
categories:
  - GAS
tags:
  - createPivotTable(sourceData)
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年5月"]
---
Google Apps Script（GAS）でスプレッドシートを操作するなら、データ集計を効率化するピボットテーブルの活用は必須ばい！今回は`createPivotTable(sourceData)`メソッドを使って、データを自動で整理・分析する方法を紹介するけん、最後まで見ていきんしゃい。

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

## 1. createPivotTable(sourceData) って何？

GASの`createPivotTable(sourceData)`メソッドを使えば、スクリプトでピボットテーブルを作成できるとよ。例えば、売上データの集計やカテゴリー別の分析が一発でできるっちゃね。

### 基本の書き方

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('データ');
const sourceData = sheet.getDataRange();
const pivotSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ピボット');
pivotSheet.getRange('A1').createPivotTable(sourceData);
</code></pre>

このコードでは、データシート全体を対象にして、ピボットシートのA1セルからピボットテーブルを作成しよるばい。データ範囲を固定せんで`getDataRange()`を使えば、新しいデータが増えても自動で対応できるけん便利じゃね。

## 2. ピボットテーブルをカスタマイズしよう！

ピボットテーブルの基本が分かったら、次は集計する項目やフィルターを設定して、実践で使える形にカスタマイズしてみよう。

### 行と列を設定する

ピボットテーブルでデータを整理するには、行と列のグループ化が重要ばい。

<pre class="wp-block-code"><code>const pivotTable = pivotSheet.getRange('A1').createPivotTable(sourceData);
pivotTable.addRowGroup(2);  // 2列目を行グループに設定
pivotTable.addColumnGroup(3); // 3列目を列グループに設定
</code></pre>

これで2列目のデータを行ごと、3列目を列ごとに集計できるばい。

### 集計方法を設定する

ピボットテーブルでは、合計や平均など、さまざまな方法でデータを集計できるっちゃね。

<pre class="wp-block-code"><code>const salesValue = pivotTable.addPivotValue(4, SpreadsheetApp.PivotTableSummarizeFunction.SUM);
salesValue.setDisplayName('売上総額');
</code></pre>

このコードでは、4列目のデータを合計して「売上総額」として表示するようにしとるばい。

## 3. フィルターでデータを絞り込む

データが多いと、特定の条件でフィルタリングしたくなるよね？そんな時は、`addFilter()`メソッドを使うといいばい。

<pre class="wp-block-code"><code>const criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(&#91;'東京支店', '大阪支店'])
  .build();
pivotTable.addFilter(2, criteria);
</code></pre>

この例では、2列目のデータを「東京支店」と「大阪支店」に絞り込んどるけん、他のデータは表示されんごつなるとよ。

## 4. 実践で使えるテクニック

### 1. 列幅を自動調整する

ピボットテーブルを作ると、列幅が自動調整されんけん、スクリプトで整えよう！

<pre class="wp-block-code"><code>pivotSheet.autoResizeColumns(1, pivotSheet.getLastColumn());
</code></pre>

### 2. データ更新時に再計算する

スプレッドシートのデータを更新したら、ピボットテーブルもリフレッシュせんといかんばい！

<pre class="wp-block-code"><code>function refreshPivotTable() {
  const pivotTable = pivotSheet.getPivotTables()&#91;0];
  pivotTable.refresh();
}
</code></pre>

このスクリプトを定期的に実行すれば、最新データが反映されるばい。

## まとめ

GASの`createPivotTable(sourceData)`メソッドを使えば、データの整理・分析が劇的に楽になるとよ！

<ul class="wp-block-list">
  <li>
    ピボットテーブルを作成する基本
  </li>
  <li>
    行・列の設定
  </li>
  <li>
    集計方法の指定
  </li>
  <li>
    フィルターの活用
  </li>
  <li>
    便利なテクニック
  </li>
</ul>

この方法をマスターすれば、業務の効率がグンと上がるばい！ぜひ活用してみてね。

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
  <a rel="noopener" href="https://qiita.com/goriland/items/fc5dc78b62aa8d769e46" title="GASでピボットテーブルを作る - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnFpaXRhLWltYWdlLXN0b3JlLnMzLmFtYXpvbmF3cy5jb20lMkYwJTJGMjA1MjM3JTJGcHJvZmlsZS1pbWFnZXMlMkYxNTIxNjA0NzAxP2l4bGliPXJiLTQuMC4wJmFyPTElM0ExJmZpdD1jcm9wJm1hc2s9ZWxsaXBzZSZiZz1GRkZGRkYmZm09cG5nMzImcz1kZTkyNGYwMjY1YWYwNGEwNGVhZGNjODc5ZmRlYjE2Mg%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D533926fe0f96f9690cc800c6987a8389?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R0FTJUUzJTgxJUE3JUUzJTgzJTk0JUUzJTgzJTlDJUUzJTgzJTgzJUUzJTgzJTg4JUUzJTgzJTg2JUUzJTgzJUJDJUUzJTgzJTk2JUUzJTgzJUFCJUUzJTgyJTkyJUU0JUJEJTlDJUUzJTgyJThCJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LXBhZD0wJnM9MDYzN2M5ZmVkNDQxOTVlY2QzMGUxZDI5MmE1OTMzY2I&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBnb3JpbGFuZCZ0eHQtY29sb3I9JTIzMUUyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTM2JnR4dC1wYWQ9MCZzPTA5Nzg4NjI4YWRjOTc1Y2E1MzEyNTJhMDUwYzNjNDIx&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=5682ae67b22f1d413371116f93a324e3" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASでピボットテーブルを作る - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        ピボットテーブルを操作するためのメモ。 こちらの記事を参考にさせていただきました。 集計元データ こんな感じのデータを元にピボットテーブルを作る。 シート名 データが入ってるシートの名前 → data ピボットテーブルを作るシートの名前 →...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/goriland/items/fc5dc78b62aa8d769e46" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/goriland/items/fc5dc78b62aa8d769e46" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://kumaroot.readthedocs.io/ja/latest/gas/gas-spreadsheet-pivottable.html" title="ピボットテーブル操作したい（PivotTable）" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://kumaroot.readthedocs.io/ja/latest/_static/quma.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://kumaroot.readthedocs.io/ja/latest/_static/quma.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        ピボットテーブル操作したい（PivotTable）
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        スプレッドシートのデータを整理するとき、ピボットテーブルはとても便利です。 データを選択する, →, を選択- 新しいシート, 既存のシート → 挿入先のセルを選択., 「行」を追加, 「列」を追加, 「値」を追加, 「フィルタ」を追加. ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://kumaroot.readthedocs.io/ja/latest/gas/gas-spreadsheet-pivottable.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://kumaroot.readthedocs.io/ja/latest/gas/gas-spreadsheet-pivottable.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          kumaroot.readthedocs.io
        </div>
      </div>
    </div>
  </div></a>
</div>
