---
title: GASでスプレッドシートの指定範囲からメモのみを削除する方法
author: arukayies
type: post
date: 2020-03-14T07:55:46+00:00
excerpt: GASでスプレッドシートの指定範囲のメモのみを 削除する方法を紹介します！
url: /gas/clearnote
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
last_modified:
  - 2025-03-07 22:46:42
categories:
  - GAS
tags:
  - clearNote()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）の中で、スプレッドシートのメモを管理する方法として、`clearNote()`メソッドを知っておくと便利ばい！このメソッドを使うことで、セルに設定されたメモを簡単に削除できるけん、業務の効率化に繋がるんだ。今回はその使い方について、しっかり解説するけん、ぜひ参考にしてみてな。

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

## メモとは？そしてclearNote()メソッドの役割

まずは、スプレッドシートのメモ機能について簡単に説明しようか。メモは、セルに関連する非表示の注釈やコメントとして使われ、他のユーザーに通知されることはないんだ。コメントとは違って、主に自分用のメモとして使うことが多いさ。

で、この`clearNote()`メソッドは、これらのメモを一括で削除するための方法なんだよ。手動で消す手間を省けるから、定期的なメンテナンスやバッチ処理の際に大活躍するんだよね。

## clearNote()メソッドの使い方

### 基本的な構文

<pre class="wp-block-code"><code>range.clearNote();
</code></pre>

このメソッドは、簡単な構文で、指定した範囲内のメモを削除するよ。ここで重要なのは、`range`が削除対象の範囲を指すってこと。例えば、特定のセルや範囲を指定して削除できるんだ。

### 単一セルのメモ削除

<pre class="wp-block-code"><code>function clearSingleCellNote() {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange('B2').clearNote();
}
</code></pre>

これを実行すると、B2セルに設定されているメモだけを削除することができるんだ。でも、アクティブシートに依存しているから、特定のシートを指定するようにするほうが堅実な方法だよ。

### 範囲指定での一括削除

<pre class="wp-block-code"><code>function clearRangeNotes() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SalesData');
  const dataRange = sheet.getRange('C3:F20');
  dataRange.clearNote();
}
</code></pre>

この例では、C3からF20までの範囲内のメモを一括で削除できるよ。特に営業データのように、定期的に更新が必要なシートにとっては、便利な使い方だね。

## 実務で役立つ！条件付きメモ削除の活用

もし、特定の条件でメモを削除したい場合、`clearNote()`を条件付きで使うこともできるよ。例えば、メモに「[TEMP]」というタグがついている場合にのみ削除する方法を見てみよう。

<pre class="wp-block-code"><code>function clearConditionalNotes() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const notes = sheet.getRange(`A2:A${lastRow}`).getNotes();
  
  notes.forEach((note, index) =&gt; {
    if (note&#91;0].includes('&#91;TEMP]')) {
      sheet.getRange(index + 2, 1).clearNote();
    }
  });
}
</code></pre>

これで、A列のメモに「[TEMP]」が含まれているものだけを削除できるんだ。必要なメモを選んで消せるから、かなり便利ばい。

## いろんなクリアメソッドとの比較

`clearNote()`の他にも、Google Apps Scriptにはいろんなクリアメソッドがあるけん、どれを使うかは目的に合わせて選ぼうね。<figure class="wp-block-table">

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド名
    </th>
    
    <th>
      対象範囲
    </th>
    
    <th>
      削除内容
    </th>
    
    <th>
      戻り値
    </th>
  </tr>
  
  <tr>
    <td>
      <code>clear()</code>
    </td>
    
    <td>
      セル
    </td>
    
    <td>
      値・書式・メモ・入力規則すべて
    </td>
    
    <td>
      Rangeオブジェクト
    </td>
  </tr>
  
  <tr>
    <td>
      <code>clearContent()</code>
    </td>
    
    <td>
      セル
    </td>
    
    <td>
      値と数式のみ
    </td>
    
    <td>
      Rangeオブジェクト
    </td>
  </tr>
  
  <tr>
    <td>
      <code>clearNote()</code>
    </td>
    
    <td>
      セル
    </td>
    
    <td>
      メモのみ
    </td>
    
    <td>
      Rangeオブジェクト
    </td>
  </tr>
  
  <tr>
    <td>
      <code>clearNotes()</code>
    </td>
    
    <td>
      シート全体
    </td>
    
    <td>
      全メモ
    </td>
    
    <td>
      Sheetオブジェクト
    </td>
  </tr>
</table></figure> 

`clearNote()`はメモ専用だから、データや書式などを消したくないときに特に役立つんだよ。

## 高度な使い方：ログの記録や安全対策

### メモ削除前にログを記録

<pre class="wp-block-code"><code>function clearNotesWithLogging() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const notes = sheet.getRange('B2:D10').getNotes();
  const logSheet = SpreadsheetApp.getActive().getSheetByName('AuditLog') 
    || SpreadsheetApp.getActive().insertSheet('AuditLog');

  notes.flat().forEach((note, index) =&gt; {
    if (note) {
      const cell = sheet.getRange(2 + Math.floor(index/3), 2 + (index%3));
      logSheet.appendRow(&#91;new Date(), cell.getA1Notation(), note]);
      cell.clearNote();
    }
  });
}
</code></pre>

このように、メモを削除する前にログを記録しておくと、後でどんな変更があったのか確認できて便利だよね。

### メモの存在チェックと最適化

<pre class="wp-block-code"><code>function safeClearNotes() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange('A1:Z1000');
  const notes = range.getNotes();
  
  if (notes.flat().some(note =&gt; note !== '')) {
    range.clearNote();
    console.log('Cleared existing notes in range A1:Z1000');
  } else {
    console.log('No notes found in specified range');
  }
}
</code></pre>

メモが存在する場合にのみ削除することで、パフォーマンスも最適化できるんだよ。大規模なデータ範囲で使うときに便利さ。

## 結論

`clearNote()`メソッドは、Google Apps Scriptを使ってスプレッドシートのメモを効率的に管理できる強力なツールなんだ。業務でよく使うメモ削除を自動化したり、バッチ処理を行ったりする際に特に役立つよ！これをうまく活用すれば、作業の効率がかなりアップするけん、ぜひ使ってみてな！

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
  <a rel="noopener" href="https://excel-ubara.com/apps_script1/GAS029.html" title="メモの挿入・削除と改行文字｜Google Apps Script入門" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://excel-ubara.com/apps_script1/image310.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://excel-ubara.com/apps_script1/image310.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        メモの挿入・削除と改行文字｜Google Apps Script入門
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GoogleAppsScriptで、スプレッドシートのセルにメモを挿入・削除するスクリプトの書き方です、メモを改行する時の改行コードについても解説します。メモは、まさしくメモとして各種注意事項や、変更履歴等として使う事の出来る機能です。ただ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://excel-ubara.com/apps_script1/GAS029.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://excel-ubara.com/apps_script1/GAS029.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          excel-ubara.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/clearnote/" title="セル範囲に設定されているメモのみクリアする：clearNote()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="http://gsuiteguide.jp/wp-content/uploads/cover_googlespreadsheet-486x290.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="http://gsuiteguide.jp/wp-content/uploads/cover_googlespreadsheet-486x290.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        セル範囲に設定されているメモのみクリアする：clearNote()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        セル範囲に設定されているメモのみクリアする。 サンプルコード // 現在アクティブなシートにある A1:B5 のセル範囲を取得 var range = SpreadsheetApp.getActive().getRange(‘A1:B5’)...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/clearnote/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/clearnote/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a>
</div>
