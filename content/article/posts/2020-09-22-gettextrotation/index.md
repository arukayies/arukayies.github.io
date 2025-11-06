---
title: GASでスプレッドシートの指定セルからテキスト回転設定を確認する方法
author: arukayies
date: 2020-09-22T02:17:08+00:00
excerpt: GASでスプレッドシートの指定セルのテキストの回転設定を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1600741030
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
  - GAS
  - getTextRotation()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
こんにちは！今日はGoogle Apps Script（GAS）における`getTextRotation()`メソッドについて、初心者でもわかりやすく解説するけんね。実はこれ、スプレッドシートのセル内にあるテキストの回転角度を取得できるメソッドで、業務でもよく使われる便利な機能ばい。では、早速詳しく見ていこう！


## 1. getTextRotation()メソッドの基本を知ろう

### 1.1 メソッドの使い方と戻り値

まずは、`getTextRotation()`メソッドの基本的な使い方を紹介するけ。このメソッドを使うと、セル内のテキストがどんな角度で回転しているかがわかるよ。

<pre class="wp-block-code"><code>const rotation = range.getTextRotation();
</code></pre>

このコードで、`range`は取得したいセル範囲（例えば`SpreadsheetApp.getActiveSpreadsheet().getRange()`）を指すんやけど、これでテキストの回転角度や縦書きかどうかがわかるんだね。

返ってくる`TextRotation`オブジェクトには、以下のプロパティがあるんよ。

<ul class="wp-block-list">
  <li>
    <code>degrees</code>: テキストの回転角度（整数）
  </li>
  <li>
    <code>isVertical</code>: テキストが縦書きかどうか（真偽値）
  </li>
</ul>

### 1.2 角度の取り扱い

テキストの回転は、角度によって反時計回りや時計回りで変わるけど、縦書き設定がされてる場合は角度設定は無視される点に注意が必要ばい。

## 2. 実際にコードを書いてみよう

### 2.1 単一セルの回転を確認

例えば、B2セルの回転角度を確認したい場合は、こんな風に書くことができるんよ。

<pre class="wp-block-code"><code>function getSingleCellRotation() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const cell = sheet.getRange("B2");
  const rotation = cell.getTextRotation();
  
  Logger.log(`回転角度: ${rotation.getDegrees()}度`);
  Logger.log(`縦書き状態: ${rotation.isVertical() ? "有効" : "無効"}`);
}
</code></pre>

これで、B2セルがどう回転してるかが分かるわけよ。すごく簡単じゃろ？

### 2.2 複数セルをまとめて確認

もし、範囲内にある複数のセルの回転情報を知りたい場合は、以下のように書くといいよ。

<pre class="wp-block-code"><code>function getRangeRotations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("B2:D4");
  const rotations = range.getTextRotations();
  
  rotations.forEach((row, rowIndex) =&gt; {
    row.forEach((cellRotation, colIndex) =&gt; {
      console.log(`セル&#91;${rowIndex+2},${colIndex+2}] 角度: ${cellRotation.getDegrees()}度`);
    });
  });
}
</code></pre>

`getTextRotations()`を使うことで、範囲内の全セルの回転を一気に取得できるけん、便利じゃろ？

## 3. 応用編！実践的な活用法

### 3.1 特定の角度に回転したセルをハイライト

例えば、45度回転したセルを見つけて、色を変えるような場合にはこんなコードが使えるよ。

<pre class="wp-block-code"><code>function highlightSpecificRotations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const rotations = dataRange.getTextRotations();
  
  rotations.forEach((row, r) =&gt; {
    row.forEach((rotation, c) =&gt; {
      if (rotation.getDegrees() === 45) {
        sheet.getRange(r+1, c+1)
          .setBackground("#FFF2CC");
      }
    });
  });
}
</code></pre>

こうやって、データの視覚的強調を簡単にできるけ。これ、データ分析とかで重宝するばい！

### 3.2 書式設定の複製

別のセル範囲に、あるセルの回転書式をそのままコピーすることもできるんだね。

<pre class="wp-block-code"><code>function copyRotationFormat() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const source = sheet.getRange("E5");
  const target = sheet.getRange("B2:D4");
  
  const rotationTemplate = source.getTextRotation();
  target.setTextRotation(rotationTemplate);
}
</code></pre>

これで、E5の回転設定を一括でB2:D4範囲に適用できるけ、便利やろ？

## 4. まとめ

`getTextRotation()`メソッドは、スプレッドシートの見た目をプログラムで調整する際に超便利なツールやけん、ぜひ使いこなしてほしいばい！基本的な使い方から、実務で活かせる応用例まで紹介したけど、実際の業務で活躍させるには、こういったコードを組み合わせることが大事よ。

パフォーマンスを気にしながらデータを処理する方法や、エラー処理の実装も忘れずにね。これで、回転の管理も楽々だし、業務効率化にもつながるんよ。今後の開発に活かしていこうぜ！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://rinyan-7.com/gas/body_gettext/" title="&#12304;`getText`&#12513;&#12477;&#12483;&#12489;&#12398;&#39749;&#21147;&#12305;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12391;&#12489;&#12461;&#12517;&#12513;&#12531;&#12488;&#12398;&#12486;&#12461;&#12473;&#12488;&#12434;&#31777;&#21336;&#12395;&#21462;&#24471;&#12375;&#12424;&#12358;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Fbody_gettext%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Fbody_gettext%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12304;`getText`&#12513;&#12477;&#12483;&#12489;&#12398;&#39749;&#21147;&#12305;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12391;&#12489;&#12461;&#12517;&#12513;&#12531;&#12488;&#12398;&#12486;&#12461;&#12473;&#12488;&#12434;&#31777;&#21336;&#12395;&#21462;&#24471;&#12375;&#12424;&#12358;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/body_gettext/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/body_gettext/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          rinyan-7.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-rotation/" title="【GAS】スプレッドシートのテキスト回転機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/rotation.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/rotation.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートのテキスト回転機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートのテキスト回転機能をすべてまとめました。テキストをはみ出さず、セルにどうしてもスッポリ収めたい時、テキストを回転させてオシャレに表示することも可能になります。角度を指定できたり、縦書きにしてみたり、自由に設
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-rotation/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-rotation/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-rrotation/" title="[GAS]テキストの回転角度や方向を取得・設定する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-5.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-5.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]テキストの回転角度や方向を取得・設定する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲のセルのテキストの回転角度や方向を取得・設定する方法を説
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rrotation/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rrotation/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a>
</div>
