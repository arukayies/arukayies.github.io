---
title: GASでスプレッドシートのセル内容を書式を残して効率的に消去する方法
author: arukayies
date: 2020-03-14T08:22:35+00:00
excerpt: GASでスプレッドシートの指定範囲の値のみを 削除する方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1
tags:
  - "GAS"
tags:
  - clearContent()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）を使ってスプレッドシートを操作する時に便利なメソッドの一つが、`clearContent()`ばい！これは、指定した範囲のセルから値や数式を消去する機能なんじゃけど、書式設定やデータ検証はそのまま残るという特徴があるけ、使い方をしっかり理解しておくと便利よ～。


## clearContent()メソッドの基本

### メソッドの定義と動き

`clearContent()`は、指定した範囲（`Range`オブジェクト）内のセルの中身（値や数式）を消すメソッドばい。ただし、書式（色やフォント）、コメント、データ検証はそのまま残るという特徴があるけ、使い方をしっかり理解しておくと便利よ～。

### 基本的なコード

<pre class="wp-block-code"><code>const range = SpreadsheetApp.getActiveSpreadsheet()
  .getSheetByName('Sheet1')
  .getRange('A1:B10');
range.clearContent();
</code></pre>

これで、アクティブなスプレッドシートの「Sheet1」のA1からB10の範囲の内容が消えるけど、書式設定はそのままじゃよ。

### パラメータと返り値

`clearContent()`メソッドには特にパラメータはないばい。呼び出すと、その範囲が消去され、`Range`オブジェクト自体が返されるけ、メソッドチェーンで他の操作と組み合わせることもできるんじゃ。

## 他のメソッドとの比較

`clearContent()`と似たようなメソッドに`clear()`や`clearFormat()`があるけ、これらとは少し挙動が違うけど、それぞれの特徴を理解して使い分けることが重要じゃけ。

### メソッド比較

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド
    </th>
    
    <th>
      コンテンツ
    </th>
    
    <th>
      書式
    </th>
    
    <th>
      コメント
    </th>
    
    <th>
      データ検証
    </th>
  </tr>
  
  <tr>
    <td>
      <code>clear()</code>
    </td>
    
    <td>
      〇
    </td>
    
    <td>
      〇
    </td>
    
    <td>
      〇
    </td>
    
    <td>
      〇
    </td>
  </tr>
  
  <tr>
    <td>
      <code>clearContent()</code>
    </td>
    
    <td>
      〇
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>clearFormat()</code>
    </td>
    
    <td>
    </td>
    
    <td>
      〇
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
  </tr>
</table></figure> 

`clearContent()`はデータだけを消すので、テンプレートの構造をそのまま残してデータだけ更新したい場合にぴったりじゃけ。

## 実践的な活用例

### 基本的な使い方

<pre class="wp-block-code"><code>function clearSpecificRange() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange('C5:F20').clearContent();
}
</code></pre>

C5からF20までの範囲を消去する例じゃけ、定期的なレポートのテンプレート更新にも使えるけ。

### 動的な範囲指定

<pre class="wp-block-code"><code>function clearDynamicRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  sheet.getRange(2, 1, lastRow-1, 4).clearContent();
}
</code></pre>

`getLastRow()`を使えば、データのある範囲だけを動的に消去できるけ、可変データがあるシステムで便利じゃよ。

### 条件付きでデータを消去

<pre class="wp-block-code"><code>function conditionalClear() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  values.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 'DELETE_FLAG') {
        sheet.getRange(rowIndex+1, colIndex+1).clearContent();
      }
    });
  });
}
</code></pre>

特定のマーカー（ここでは&#8217;DELETE_FLAG&#8217;）があるセルを見つけて消去する方法じゃけ、データのクレンジングにも使えるんじゃ。

## パフォーマンス向上のコツ

### バッチ処理

<pre class="wp-block-code"><code>function batchClear() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const ranges = &#91;
    'A1:A10', 'C5:C15', 'E20:E30'
  ];
  
  ranges.forEach(range => {
    sheet.getRange(range).clearContent();
  });
}
</code></pre>

複数範囲を一度に処理することで、スクリプトの実行時間を短縮できるけ、バッチ処理を使うと処理が効率よくなるんじゃよ。

### キャッシュを活用

<pre class="wp-block-code"><code>function cachedClear() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  const clearTargets = values
    .map((row, i) => row.map((cell, j) => cell === 'OLD' ? &#91;i+1, j+1] : null))
    .flat()
    .filter(coords => coords !== null);
  
  clearTargets.forEach((&#91;row, col]) => {
    sheet.getRange(row, col).clearContent();
  });
}
</code></pre>

データをキャッシュしてから不要データを消去することで、スプレッドシートへのアクセス回数を減らしてパフォーマンスを上げる方法じゃけ。

## セキュリティとアクセス制限

### アクセス制御

<pre class="wp-block-code"><code>function securedClear() {
  const userEmail = Session.getActiveUser().getEmail();
  const allowedUsers = &#91;'admin@example.com', 'editor@example.com'];
  
  if (!allowedUsers.includes(userEmail)) {
    throw new Error('Permission denied');
  }
  
  SpreadsheetApp.getActiveSheet().getRange('A1:Z100').clearContent();
}
</code></pre>

特定のユーザーにだけ権限を与えることで、重要なデータを保護できるんじゃけ。

## 結論

`clearContent()`メソッドは、Google Apps Scriptを使ったスプレッドシート操作でとても便利なツールばい！データ消去を選択的に行えるから、テンプレートの更新やデータ管理を効率よく行えるけ、ぜひ活用してみてほしいんじゃ。これを駆使すれば、システムのパフォーマンスも向上させることができるけど、使い方をしっかり理解しておくことが大事じゃよ～。


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://rinyan-7.com/gas/sheet_clearcontents/" title="&#12304;clearContents&#12513;&#12477;&#12483;&#12489;&#12398;&#39749;&#21147;&#12305;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12398;&#12487;&#12540;&#12479;&#12434;&#19968;&#30636;&#12391;&#25972;&#29702;&#12377;&#12427;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Fsheet_clearcontents%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Fsheet_clearcontents%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12304;clearContents&#12513;&#12477;&#12483;&#12489;&#12398;&#39749;&#21147;&#12305;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12398;&#12487;&#12540;&#12479;&#12434;&#19968;&#30636;&#12391;&#25972;&#29702;&#12377;&#12427;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/sheet_clearcontents/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/sheet_clearcontents/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          rinyan-7.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://pitapaka.com/gas7/" title="Google Apps Script&#12391;&#12475;&#12523;&#12434;&#12463;&#12522;&#12450;&#12377;&#12427;&#26041;&#27861; &#8211; PitaPaka" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fpitapaka.com%2Fgas7%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fpitapaka.com%2Fgas7%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Script&#12391;&#12475;&#12523;&#12434;&#12463;&#12522;&#12450;&#12377;&#12427;&#26041;&#27861; &#8211; PitaPaka
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://pitapaka.com/gas7/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://pitapaka.com/gas7/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          pitapaka.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://note.com/m_kakudo/n/n3efab3ba3201" title="【徒然GAS16】セルをクリアしてみた〜clear、clearContent、clearFormat、clearDataValidations、clearNote〜｜○△□堂" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/62258666/rectangle_large_type_2_f38502dd533a95b1c87587b177aeb6bd.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/62258666/rectangle_large_type_2_f38502dd533a95b1c87587b177aeb6bd.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【徒然GAS16】セルをクリアしてみた〜clear、clearContent、clearFormat、clearDataValidations、clearNote〜｜○△□堂
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        参考にしたサイト記事 【初心者向けGAS】スプレッドシートのセル範囲をクリアするいくつかの方法Google Apps ScriptでBotを作りながらその基本を学んでいくシリーズです。今回はスプレッドシートのセル範囲tonari-it.co...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/m_kakudo/n/n3efab3ba3201" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/m_kakudo/n/n3efab3ba3201" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://rinyan-7.com/gas/range_clearcontent/" title="&#12304;clearContent&#12513;&#12477;&#12483;&#12489;&#12398;&#27963;&#29992;&#27861;&#12305;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12391;&#12487;&#12540;&#12479;&#12434;&#12469;&#12463;&#12483;&#12392;&#28040;&#12377;&#65281;&#20351;&#12356;&#26041;&#12420;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#32057;&#20171;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_clearcontent%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_clearcontent%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12304;clearContent&#12513;&#12477;&#12483;&#12489;&#12398;&#27963;&#29992;&#27861;&#12305;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12391;&#12487;&#12540;&#12479;&#12434;&#12469;&#12463;&#12483;&#12392;&#28040;&#12377;&#65281;&#20351;&#12356;&#26041;&#12420;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#32057;&#20171;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_clearcontent/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_clearcontent/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          rinyan-7.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=ja" title="Class Sheet  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        Class Sheet  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://note.com/seiyas/n/na295d09adb3c" title="Googleスプレッドシートでデータ消去（GAS活用）｜安井清一郎" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/82815717/rectangle_large_type_2_e00fee375d679328cff1e09a2b009ab4.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/82815717/rectangle_large_type_2_e00fee375d679328cff1e09a2b009ab4.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Googleスプレッドシートでデータ消去（GAS活用）｜安井清一郎
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        スプレッドシートに様々なデータの貼付や消去をしていると 太字・斜体・取り消し線 テキストや塗りつぶしの色 水平／垂直方向の位置 テキストを折り返す などの情報残り、シートが汚れて使い回しにくくなりますよね？ 今回はデータ消去のTipsを紹介...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/seiyas/n/na295d09adb3c" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/seiyas/n/na295d09adb3c" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://www.smilevision.co.jp/blog/tsukutte05/" title="【作ってみた】GASでGoogleスプレッドシートのセルのクリアボタン" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.smilevision.co.jp/wp-content/uploads/2017/03/1dd9fcce6284b31bdbdb6379a575eccb.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.smilevision.co.jp/wp-content/uploads/2017/03/1dd9fcce6284b31bdbdb6379a575eccb.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【作ってみた】GASでGoogleスプレッドシートのセルのクリアボタン
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        開発部のおいぬです（▽・x・▽） 今回は初めてGoogle Apps Script というものを使ってみました…
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://www.smilevision.co.jp/blog/tsukutte05/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://www.smilevision.co.jp/blog/tsukutte05/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          www.smilevision.co.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/80syokumotsu/items/553b378a44add05c3495" title="[GAS] でセルの値をまとめてクリアする方法 - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnMzLWFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkZxaWl0YS1pbWFnZS1zdG9yZSUyRjAlMkYyNjQwODc2JTJGMjYzMTY0YjU0MWI2OWJlMDIzZmVjOGQyNTY4YzBmNTI1OTIyNGY0YiUyRmxhcmdlLnBuZyUzRjE2NTc5NTQxNDk_aXhsaWI9cmItNC4wLjAmYXI9MSUzQTEmZml0PWNyb3AmbWFzaz1lbGxpcHNlJmJnPUZGRkZGRiZmbT1wbmczMiZzPTFiM2ExY2RlMDA2OGRkMTgxZTMwMDgyZTA3NmZhNmNh%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D9a87242af5120c5b4a60b1c43c0033b0?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDA4MHN5b2t1bW90c3UmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtcGFkPTAmcz1jYzkwNzIxMjZjYjg3ZGY4ZWFhOWE2ZWI0YTE4MmI1Ng&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=653d850b19f817880937dd27198bb5fb" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS] でセルの値をまとめてクリアする方法 - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        getRangeセルの範囲を指定してclearContent()を使用する Sheetオブジェクト.getRange(行番号, 列番号, 行数, 列数) getRange(1,4,lastRow -1 ,14).clearContent()...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/80syokumotsu/items/553b378a44add05c3495" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/80syokumotsu/items/553b378a44add05c3495" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
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
- [ ] Re-run Hugo build
- [ ] Verify search index generation
- [ ] Fix search functionality
- [ ] Incorporate latest changes
- [ ] Merge changes
- [ ] Commit changes
</task_progress>
</write_to_file>
