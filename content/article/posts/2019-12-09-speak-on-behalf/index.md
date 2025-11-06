---
title: LINE Botを使って別グループに代理発言させる方法
author: arukayies
date: 2019-12-09T13:16:52+00:00
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
    
    %HTAGS%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1245029889108897793";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1245029889108897793";s:5:"pDate";s:19:"2020-03-31 16:47:11";}}";
tags:
  - "LINE BOT"
tags:
  - GAS
  - Google Apps Script
  - LINE BOT

---
ツーリングクラブの運営をLINE BOTを使って効率化しました。この記事ではその紹介になります。



## 概要

ツーリングクラブでの連絡のやり取りにはLINEを使っており、3つのグループが存在します。

<ul class="wp-block-list">
  <li>
    雑談するためのグループ
  </li>
  <li>
    連絡専用のグループ
  </li>
  <li>
    管理メンバーのみが企画を話し合うグループ
  </li>
</ul>

管理メンバーが全体連絡を行っているのですが、そこでこのような問題がありました。

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box bad-box">
  <ul class="wp-block-list">
    <li>
      全体に連絡するのに<span class="marker-under-red">ちょっと抵抗を感じる</span>。
    </li>
    <li>
      連絡した人が質問窓口になってしまい、<span class="marker-under-red">負担が一極集中する</span>。
    </li>
  </ul>
</div>

この問題を少しでも和らげるために、LINE BOTが代わりに発言してもらうシステムを作りました！

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box good-box">
  <ul class="wp-block-list">
    <li>
      LINE BOTが代わりに発言することで、<span class="marker-under">特定人物に質問が集中しない</span>ようにする。
    </li>
    <li>
      誰でも全体連絡を<span class="marker-under">気軽</span>に行えるようにする。
    </li>
  </ul>
  
    
</div>

## 動作の流れ

![![](img_5dfa1fc3362be.png)](img_5dfa1fc3362be.png) 

<div class="wp-block-cocoon-blocks-caption-box-1 caption-box block-box has-border-color has-key-color-border-color cocoon-block-caption-box">
  <div class="caption-box-label block-box-label box-label fab-pencil">
    <span class="caption-box-label-text block-box-label-text box-label-text">処理の概要</span>
  </div>
  
  <div class="caption-box-content block-box-content box-content">
    <ol class="wp-block-list">
      <li>
        LINE BOTがいるグループで<span class="bold-red">「<strong>代理発言 〇〇○</strong>」</span>と発言します。
      </li>
      <li>
        代理発言というキーワードでwebhookが作動し、<span class="marker">クイックリプライイベント</span>が送られます。
      </li>
      <li>
        クイックリプライには「雑談」・「連絡用」・「キャンセル」という選択肢があります。
      </li>
      <li>
        選択したグループには<span class="bold-red">「<strong><strong>代理発言 〇〇○</strong></strong>」</span>の<span class="bold-blue">〇〇〇</span>の部分が代理で送信されます。
      </li>
    </ol>
    
    <p class="has-text-align-center">
      <span class="badge-blue">※各グループに&nbsp;LINE BOTがいることが条件になります。</span>
    
  
<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-related">
  <a href="https://arukayies.com/gas/line_bot/pushmessage_quick_reply" title="【LINE BOT】GASで『クイックリプライメッセージ』の送り方" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    ![![](pushmessage_quick_reply.png)](pushmessage_quick_reply.png)
    
    <noscript>
      ![![](pushmessage_quick_reply.png)](pushmessage_quick_reply.png)
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【LINE BOT】GASで『クイックリプライメッセージ』の送り方
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        くらこんにちは「くら」です！LINE公式ドキュメント を参考に GAS を使って各APIを試しています。くらその他のアクションについては別記事で紹介しています。くら今回は「 クイックリプライボタンメッセージ 」の送り方を紹介します。公式ドキ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com/gas/line_bot/pushmessage-quick-reply" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com/gas/line_bot/pushmessage-quick-reply" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          arukayies.com
        </div>
      </div>
    </div>
  </div></a>
</div>

## 事前準備

LINE Developersでトークンを取得してください。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-related">
  <a href="https://arukayies.com/gas/line_bot/gettoken" title="LINE Messaging APIアクセストークンの取得方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](gettoken-1-160x90.png)](gettoken-1-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        LINE Messaging APIアクセストークンの取得方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        LINEBOTに必要なトークンの取得方法を画像付きで解説します。
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

LINEグループのIDの調べ方はこの手順で確認できます。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-related">
  <a href="https://arukayies.com/gas/line_bot/get-userid" title="【LINE BOT】GASでLINEの『ユーザID』の取得方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](get_userid-160x90.png)](get_userid-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        【LINE BOT】GASでLINEの『ユーザID』の取得方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        くらこんにちは「くら」です！LINE公式ドキュメント を参考に GAS を使って各APIを試しています。くら今回はLINEの「ユーザID」の取得方法を紹介します。ログを見るときによく使っています。ＬＩＮＥ　ＢＯＴを作ろう！ Ｍｅｓｓａｇｉｎ...
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

GASを使ってLINE BOTを作成する記事を以前書いているので、参考にしてください。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-related">
  <a href="https://arukayies.com/gas/line_bot/line_bot_with_gas#GAS" title="GASで作る簡単なLINE BOTの作り方" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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

## GASのコード

## 実際の動作

### 「代理発言　送信テスト」とLINEでしゃべる

![![](img_5dfa1fc37deba.jpg)](img_5dfa1fc37deba.jpg) <figcaption class="wp-element-caption">管理グループ</figcaption></figure> 

### 「グルチャに送信」を押下する

![![](img_5dfa1fc3c0a74.jpg)](img_5dfa1fc3c0a74.jpg) <figcaption class="wp-element-caption">管理グループ</figcaption></figure> <figure class="wp-block-image aligncenter size-large is-resized">![![](img_5dfa1fc419eba.jpg)](img_5dfa1fc419eba.jpg)<figcaption class="wp-element-caption">雑談グループ</figcaption></figure> 

<p class="has-text-align-center">
  <span class="marker-under-red"><strong>雑談用グループに代理でLINE BOTが発言してくれます！</strong></span>


### 「連絡用に送信」を押下する

![![](img_5dfa1fc481313.jpg)](img_5dfa1fc481313.jpg) <figcaption class="wp-element-caption">管理グループ</figcaption></figure> <figure class="wp-block-image aligncenter size-large is-resized">![![](img_5dfa1fc4d0857.png)](img_5dfa1fc4d0857.png)<figcaption class="wp-element-caption">連絡用グループ</figcaption></figure> 

<p class="has-text-align-center">
  <strong><span class="marker-under-blue">今度は連絡用グループに代理でLINE BOTが発言してくれます！</span></strong>


## これを作って良かったこと！

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box good-box">
  <ul class="wp-block-list">
    <li>
      個人的にクイックリプライを試すことができた！
    </li>
    <li>
      管理メンバーもすぐに使いこなしてくれた！
    </li>
    <li>
      LINE BOTの存在がメンバー全員に馴染んだ気がする。
    </li>
    <li>
      <strong><span class="marker-under">気軽に全体連絡できる雰囲気は達成できた！！！</span></strong>
    </li>
  </ul>
</div>


