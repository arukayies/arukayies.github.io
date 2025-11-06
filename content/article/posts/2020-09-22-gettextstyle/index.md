---
title: GASでスプレッドシートの指定セルからフォントや装飾など書式情報を取得する方法
author: arukayies
date: 2020-09-22T02:51:06+00:00
excerpt: GASでスプレッドシートの指定セルのテキストの書式を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1600743068
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
  - getTextStyle()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
Google Apps Script（GAS）って、スプレッドシートをプログラムで操るための便利なツールじゃけ、今回はその中でも特に便利な`getTextStyle()`メソッドを深掘りしていくよ。このメソッドを使えば、スプレッドシートのセルに設定されたテキストのスタイル（フォント、色、太さなど）を取得して、さまざまな使い方ができるんよね。初心者でもわかるように解説するけん、ぜひ見ていってな！


## getTextStyle()メソッドってなに？

`getTextStyle()`メソッドは、Googleスプレッドシートのセル内に設定されたテキストの書式情報を取得するためのメソッドばい。これを使うことで、セルの文字のフォントや色、サイズなどの情報をプログラムから取得して、カスタマイズしたり、他のシートに転送したりできるんよ。

例えば、以下のコードを使えば、セルのフォントサイズを取得することができるけ。

<pre class="wp-block-code"><code>const textStyle = range.getTextStyle();
console.log(textStyle.getFontSize()); // フォントサイズ取得
</code></pre>

これが一番シンプルな使い方やけど、これだけでもスプレッドシートの操作がずっと楽になるんよね。

## リッチテキストの操作方法

次に、ちょっと高度な使い方についても触れていくけん、リッチテキストって知っとるかい？これは、セル内でフォントが異なったり、太字や斜体が混じってるようなテキストのことよ。こうしたテキストを扱うには、`getRichTextValue()`メソッドと組み合わせて使うんじゃ。

例えば、「**HelloWorld**」みたいなテキストがあったとき、その中の「Hello」と「World」を別々に書式を取り出すことができるんよ。以下のコードで、テキストの書式を個別に取得できるけ。

<pre class="wp-block-code"><code>const richText = range.getRichTextValue();
const runs = richText.getRuns();

runs.forEach(run =&gt; {
  const style = run.getTextStyle();
  console.log(`Text: ${run.getText()}, Bold: ${style.isBold()}`);
});
</code></pre>

これを使えば、リッチテキストの書式を細かく処理できるようになるんよね。

## 条件付き書式の解析方法

スプレッドシートでは、条件付き書式っていう機能もあるんよ。たとえば、特定の条件を満たしたときにセルの文字色を赤にしたり、太字にしたりする機能じゃけど、この条件付き書式と`getTextStyle()`を組み合わせることで、どんな条件で書式が変更されたのかを確認できるんよ。

例えば、以下のようにコードを書くことで、条件付き書式が適用されたセルを探せるけ。

<pre class="wp-block-code"><code>const rules = sheet.getConditionalFormatRules();
rules.forEach(rule =&gt; {
  const styles = rule.getTextStyles();
  styles.forEach(style =&gt; {
    if(style.isBold()) {
      console.log('条件付きの太字が検出されました');
    }
  });
});
</code></pre>

これで、条件に基づいた書式を検出できるようになるんよ。

## パフォーマンスを上げるテクニック

`getTextStyle()`を使っていると、複数セルの書式情報を取得したいときに、パフォーマンスが気になることがあるけど、そんなときには一度に複数セルの書式を取得できる`getTextStyles()`メソッドを使うといいんよ。これを使うことで、大量のデータを効率的に処理できるけ。

例えば、次のようにコードを書けば、複数セルの書式を一度に取得できるんじゃ。

<pre class="wp-block-code"><code>const stylesMatrix = range.getTextStyles();
stylesMatrix.forEach((row, rowIndex) =&gt; {
  row.forEach((style, colIndex) =&gt; {
    if(style.isItalic()) {
      console.log(`イタリック体が見つかった場所: ${rowIndex}, ${colIndex}`);
    }
  });
});
</code></pre>

この方法で、複数セルの書式をまとめて取得できるから、APIの呼び出し回数を減らしてパフォーマンスを向上させることができるんよ。

## 他のサービスとの連携

Google Apps Scriptでは、スプレッドシートの書式情報を他のGoogleサービスと連携させることもできるけ。例えば、スプレッドシートの書式をGoogleスライドに転送したいとき、以下のようにコードを書けば、スライドのテキストにスプレッドシートの書式を適用できるんよ。

<pre class="wp-block-code"><code>const slideText = slideShape.getText();
const spreadsheetStyle = sheet.getTextStyle();

slideText.getTextStyle()
  .setFontFamily(spreadsheetStyle.getFontFamily())
  .setFontSize(spreadsheetStyle.getFontSize())
  .setBold(spreadsheetStyle.isBold());
</code></pre>

この方法で、スライドにもスプレッドシートの書式を反映させることができるけど、リッチテキストの部分書式転送には限界があるから注意が必要やけ。

## まとめ

今回は、Google Apps Scriptの`getTextStyle()`メソッドを活用して、スプレッドシートの書式を自在に操作する方法を解説したけど、これを使いこなすことで、より効率的にシートを管理できるようになるんよ。特にリッチテキストの処理や、条件付き書式の解析、大規模データの取り扱いにおいて、その真価を発揮するけね。

今後はさらに、機械学習を活用して自動書式最適化なんてこともできるようになるかもしれんよ。Google Apps Scriptをうまく使って、より便利なツールを作ってみてな！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/slides/text-style" title="Class TextStyle  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        Class TextStyle  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/slides/text-style" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/slides/text-style" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
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
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-richtext/" title="【GAS】スプレッドシートのリッチテキスト機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/richtext.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/richtext.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートのリッチテキスト機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートのリッチテキスト機能をすべてまとめました。セル値そのものではなく、セル内の一部分だけに色を付けられる意外と便利なリッチテキスト。確実に手動でやるよりGASを使った方が早くなりますね。使いこなせば、きっとかゆ
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-richtext/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-richtext/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://www.pre-practice.net/2019/02/blog-post_2.html" title="セルの文字色を取得する" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://drive.google.com/thumbnail?sz=w1000&#038;id=1rAEWdtGjUSXnKfMhrI35mZ0E_5fU85v6" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://drive.google.com/thumbnail?sz=w1000&#038;id=1rAEWdtGjUSXnKfMhrI35mZ0E_5fU85v6" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        セルの文字色を取得する
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        日々Google Apps Scriptを書く中で、気づいたことや作ったものなどを更新しています。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://www.pre-practice.net/2019/02/blog-post_2.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://www.pre-practice.net/2019/02/blog-post_2.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          www.pre-practice.net
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
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-text-style/" title="【GAS】スプレッドシートのテキストスタイル機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/textstyle1.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/textstyle1.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートのテキストスタイル機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートのテキストスタイル機能をすべてまとめました。フォント設定の機能の色、字体、太字、斜体、下線、サイズなどの全般機能です。設定だけでなく、現在の確認処理なども含みます。全部まとめたら随分と長くなってしまいました
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-text-style/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-text-style/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://stackoverflow.com/questions/70760546/how-to-get-textstyles-attributes-fontcolor-fontfamily-etc-of-a-googlesheet" title="How to get TextStyles/Attributes (fontColor, fontFamily, etc.) of a Googlesheet cell in AppScript, then set it in a Table" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        How to get TextStyles/Attributes (fontColor, fontFamily, etc.) of a Googlesheet cell in AppScript, then set it in a Table
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        I have a Script in Googlesheets that is suposed to use the sheet as a modifiable template (colors and font should be mod...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/70760546/how-to-get-textstyles-attributes-fontcolor-fontfamily-etc-of-a-googlesheet" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/70760546/how-to-get-textstyles-attributes-fontcolor-fontfamily-etc-of-a-googlesheet" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-rfontsetting/" title="[GAS]フォントやフォントの色・線・斜体などを取得・設定する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-3.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-3.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]フォントやフォントの色・線・斜体などを取得・設定する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲のフォントや、色・線・斜体などのフォント関連の設定を取得
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rfontsetting/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rfontsetting/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a>
</div>
