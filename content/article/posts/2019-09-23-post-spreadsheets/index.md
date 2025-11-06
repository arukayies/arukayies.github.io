---
title: 【LINE BOT】GASでスプレッドシートの情報をLINEに通知させてみた
author: arukayies
date: 2019-09-23T03:26:10+00:00
excerpt: LINE BOTを使ってスプレッドシートの情報を通知させたいと思います。日々のタスクや買い物リスト等、スプレッドシートの情報を通知させることが出来たらいろいろ応用がききます！！
toc: true
snap_isAutoPosted:
  - 1
the_review_rate:
  - 5
snap_isRpstd579:
  - 1577779072
snap_isRpstd2493:
  - 1586731765
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1249469700834119680";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1249469700834119680";s:5:"pDate";s:19:"2020-04-12 22:49:25";}}";
tags:
  - "LINE BOT"
tags:
  - GAS
  - Google Apps Script
  - LINE BOT

archives: ["2019年9月"]
---
こんにちは！


前回このような記事を書きました！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-check">
  <a href="https://arukayies.com/gas/line_bot/line_bot_with_gas" title="GASで作る簡単なLINE BOTの作り方" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    ![![](line-bot-with-gas.png)](line-bot-with-gas.png)
    
    <noscript>
      ![![](line-bot-with-gas.png)](line-bot-with-gas.png)
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASで作る簡単なLINE BOTの作り方
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GASで作るLINE BOTの簡単な作り方を紹介します！
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com/gas/line_bot/line-bot-with-gas" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com/gas/line_bot/line-bot-with-gas" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          arukayies.com
        </div>
      </div>
    </div>
  </div></a>
</div>

今回はこの応用で、LINE BOTを使って<strong>スプレッドシートの情報を通知</strong>させたいと思います。


日々のタスクや買い物リスト等、スプレッドシートの情報を通知させることが出来たらいろいろ応用がききます！！



## GASでコーディング

GASでコーディングする方法は前回の記事を参照お願いします。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/line-bot-with-gas#toc2" title="GASで作る簡単なLINE BOTの作り方" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](line-bot-with-gas-160x90.png)](line-bot-with-gas-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASで作る簡単なLINE BOTの作り方
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        GASで作るLINE BOTの簡単な作り方を紹介します！
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2024.11.19
        </div>
      </div>
    </div>
  </div></a>
</div>

前回の「**messageController**」処理を変更します。今回は**買い物リスト**と発言があった場合にスプレッドシート上のリストを通知する処理を作ります。

<div class="wp-block-cocoon-blocks-caption-box-1 caption-box block-box has-border-color has-light-blue-border-color cocoon-block-caption-box">
  <div class="caption-box-label block-box-label box-label fab-check">
    <span class="caption-box-label-text block-box-label-text box-label-text">チェック</span>
  </div>
  
  <div class="caption-box-content block-box-content box-content">
          どんな処理？
    
    
    <ul class="wp-block-list">
      <li>
        LINEから送られてきたメッセージを取得します。
      </li>
      <li>
        メッセージに<strong>買い物リスト</strong>という文字列が含まれていた場合、<strong>スプレッドシートに書かれているリスト</strong>を通知します。
      </li>
      <li>
        通知メッセージは<strong>replyLine</strong>に渡されます。その時にスクリプトプロパティのオブジェクト、返信メッセージ、返信するための宛先を引数として渡します。
      </li>
    </ul>
  
## ウェブアプリをデプロイする

過去の記事で手順を紹介しているので、そちらを参照お願いします！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/line-bot-with-gas#toc6" title="GASで作る簡単なLINE BOTの作り方" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](line-bot-with-gas-160x90.png)](line-bot-with-gas-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASで作る簡単なLINE BOTの作り方
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        GASで作るLINE BOTの簡単な作り方を紹介します！
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2024.11.19
        </div>
      </div>
    </div>
  </div></a>
</div>

## LINE DevelopersにWebhook URLを設定する

過去の記事で手順を紹介しているので、そちらを参照お願いします！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/line-bot-with-gas#toc7" title="GASで作る簡単なLINE BOTの作り方" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](line-bot-with-gas-160x90.png)](line-bot-with-gas-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASで作る簡単なLINE BOTの作り方
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        GASで作るLINE BOTの簡単な作り方を紹介します！
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2024.11.19
        </div>
      </div>
    </div>
  </div></a>
</div>

## 話しかけてみた

買い物リスト通知機能

<ul class="wp-block-list">
  <li>
    『<strong>買い物リスト</strong>』としゃべると、『<strong>スプレッドシートに書かれているリスト</strong>』を通知します。
  </li>
</ul><figure class="wp-block-image aligncenter is-resized">

![![](img_5dfa287f5a4fd.png)](img_5dfa287f5a4fd.png) <figcaption class="wp-element-caption">買い物リスト</figcaption></figure> <figure class="wp-block-image aligncenter is-resized">![![](img_5dfa287fa479c.gif)](img_5dfa287fa479c.gif)<figcaption class="wp-element-caption">買い物リストを通知する様子</figcaption></figure> 

## まとめ

スプレッドシートの情報をLINEBOTで通知できるようになると、いろいろ応用ができそうですね！


Googleカレンダーと連携すると、予定をLINEに通知することも出来たりします！


LINEに情報を集中させて、効率よくするのもいいかもしれないですね！

<p class="has-text-align-center">
  後日・・・


買い物リストを管理するLINEBOTを作ってみたので、よかったらこちらも見てください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-together">
  <a href="https://arukayies.com/gas/line_bot/shopping-list-post-v2" title="GASだけで作れる買い物リストを管理するLINE BOTの作り方Ver2.0" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](shopping-list-post-v2-160x90.png)](shopping-list-post-v2-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASだけで作れる買い物リストを管理するLINE BOTの作り方Ver2.0
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        以前作った買い物リストを管理してくれるLINE BOT を少し改良しました！削除の面倒な手間を減らし、V8ランタイムを意識してリファクタリング行いました！
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2024.11.19
        </div>
      </div>
    </div>
  </div></a>
</div>


