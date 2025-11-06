---
title: GASだけで作れる買い物リストを管理するLINE BOTの作り方
author: arukayies
date: 2020-05-03T16:43:29+00:00
excerpt: GASだけで作れる買い物リストを管理できるLINE BOTの作り方を紹介します！コピペで作れるのでぜひ使ってみてください！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1588524210
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1256987881526095872";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1256987881526095872";s:5:"pDate";s:19:"2020-05-03 16:43:59";}}";
tags:
  - "LINE BOT"
tags:
  - GAS
  - Google Apps Script
  - LINE BOT

archives: ["2020年5月"]
---
<span class="fz-22px"><strong>さっそくですが、こんなことができます！！！</strong></span><figure class="wp-block-embed aligncenter is-type-rich is-provider-twitter wp-block-embed-twitter">

<div class="wp-block-embed__wrapper">
  <blockquote class="twitter-tweet" data-width="550" data-dnt="true">
    <p lang="ja" dir="ltr">
      有志の社内活動によるもくもく会の中で、<br />買い物リストを管理してくれるLINE BOTを作ってみた。<br /><br />リストをスプレッドシートで管理する方法なら、検索すれば見つかるけど、スプレッドシートは使わずに作ったのがこだわりです。<br /><br />スクリプトのプロパティに買い物リスト保存してます。<a href="https://twitter.com/hashtag/GAS?src=hash&ref_src=twsrc%5Etfw">#GAS</a> <a href="https://twitter.com/hashtag/LINE?src=hash&ref_src=twsrc%5Etfw">#LINE</a> <a href="https://t.co/jSGijS1dWk">pic.twitter.com/jSGijS1dWk</a>
    </p>&mdash; arukayies (@arukayies) 
    
    <a href="https://twitter.com/arukayies/status/1256587001244995585?ref_src=twsrc%5Etfw">May 2, 2020</a>
  </blockquote>
</div></figure> 

<div class="wp-block-cocoon-blocks-tab-caption-box-1 tab-caption-box block-box has-border-color has-red-border-color cocoon-block-tab-caption-box">
  <div class="tab-caption-box-label block-box-label box-label fab-check">
    <span class="tab-caption-box-label-text block-box-label-text box-label-text">機能一覧</span>
  </div>
  
  <div class="tab-caption-box-content block-box-content box-content">
    <ul class="wp-block-list">
      <li>
        『<strong>買い物リスト表示</strong>』ボタンで買い物リストを表示できます。
      </li>
      <li>
        『<strong>買い物リスト追加</strong>』ボタンで買い物リストに品目を追加できます。
      </li>
      <li>
        『<strong>買い物リスト削除</strong>』ボタンで買い物リストから品目を削除できます。
      </li>
      <li>
        『<strong>使い方</strong>』ボタンで使い方を表示します。 <ul class="wp-block-list">
          <li>
            『<strong>表示・追加・削除・使い方</strong>』のテキストに反応します。
          </li>
        </ul>
      </li>
    </ul>
  
それでは作り方を紹介します！

コードだけ見たい！って方は<a href="https://arukayies.com/gas/line_bot/shopping-list-post#toc4" class="aioseop-link">こちら</a>からどうぞ！



## 【LINE】BOTを作成する

BOTの作成方法は過去記事を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
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

ちなみに私はこんなBOTを作成しました！<figure class="wp-block-image aligncenter size-large">

![![](お買い物BOT.png)](お買い物BOT.png) <figcaption class="wp-element-caption">お買い物BOT</figcaption></figure> 

## 【LINE】リッチメニューを作成する

1　管理画面へアクセスします。※LINE Deverlopersにログインしている状態でアクセスしてください。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-official">
  <a rel="noopener" href="https://manager.line.biz/" title="LINE Business ID" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmanager.line.biz%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmanager.line.biz%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        LINE Business ID
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://manager.line.biz/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://manager.line.biz/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          manager.line.biz
        </div>
      </div>
    </div>
  </div></a>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

2　作成した**アカウント**を選択します。<figure class="wp-block-image aligncenter size-large is-resized">

![![](アカウントリスト-1024x478.png)](アカウントリスト-1024x478.png) <figcaption class="wp-element-caption">アカウントリスト</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

3　リッチメニューから『**作成**』ボタンを押下します。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large">![![](リッチメニューを選択-1024x467.png)](リッチメニューを選択-1024x467.png)<figcaption class="wp-element-caption">リッチメニューを選択</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">![![](リッチメニューの作成を選択-1024x190.png)](リッチメニューの作成を選択-1024x190.png)<figcaption class="wp-element-caption">リッチメニューの作成を選択</figcaption></figure>
  
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

4　**表示設定**を以下のように設定します。<figure class="wp-block-image aligncenter size-large is-resized">

![![](表示設定の例-1024x441.png)](表示設定の例-1024x441.png) <figcaption class="wp-element-caption">表示設定の例</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

5　コンテンツ設定で『テンプレートを選択』ボタンを押下します。<figure class="wp-block-image aligncenter size-large is-resized">

![![](テンプレートを選択-1024x303.png)](テンプレートを選択-1024x303.png) <figcaption class="wp-element-caption">テンプレートを選択</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

6　**大**の**4分割**の**テンプレート**を選択します。<figure class="wp-block-image aligncenter size-large is-resized">

![![](テンプレート大を選択.png)](テンプレート大を選択.png) <figcaption class="wp-element-caption">テンプレート大4分割を選択</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

7　『**画像を作成**』ボタンを押下します。<figure class="wp-block-image size-large is-resized">

![![](画像を作成-1024x591.png)](画像を作成-1024x591.png) <figcaption class="wp-element-caption">画像を作成</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

8　4枚の画像をアップロードして、適用します。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image aligncenter size-large is-resized">![![](画像を設定.png)](画像を設定.png)<figcaption class="wp-element-caption">画像をアップロード</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image aligncenter size-large is-resized">![![](画像の例.png)](画像の例.png)<figcaption class="wp-element-caption">画像の例</figcaption></figure> 
    
        
  
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

9　A,B,C,Dのアクションタイプを『**テキスト**』にし、以下のような文言を入力します。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image aligncenter size-large is-resized">![![](Aを押下した時の動作-1024x515.png)](Aを押下した時の動作-1024x515.png)<figcaption class="wp-element-caption">Aのアクション</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image aligncenter size-large">![![](Bを押下した時の動作-1024x535.png)](Bを押下した時の動作-1024x535.png)<figcaption class="wp-element-caption">Bのアクション</figcaption></figure>
  
<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image aligncenter size-large is-resized">![![](Cを押下した時の動作-1024x509.png)](Cを押下した時の動作-1024x509.png)<figcaption class="wp-element-caption">Cのアクション</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image aligncenter size-large">![![](Dを押下したときの動作-1024x516.png)](Dを押下したときの動作-1024x516.png)<figcaption class="wp-element-caption">Dのアクション</figcaption></figure>
  
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

10　すべて入力できたら、『**保存**』ボタンを押下します。<figure class="wp-block-image aligncenter size-large is-resized">

![![](設定できたら保存する-1024x461.png)](設定できたら保存する-1024x461.png) <figcaption class="wp-element-caption">保存</figcaption></figure> 

## 【LINE】チャンネルアクセストークンを取得する

チャンネルアクセストークンの取得方法は過去記事を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
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

取得したトークンはGASのスクリプトプロパティに保存します。[こちら][1]{.aioseop-link}からどうぞ！

## 【Google】GASのコードを登録する

1ファイルのコードだけで動作します！

登録方法は過去記事を参考にしてください！

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

## 【Gogole】スクリプトプロパティを設定する

スクリプトプロパティに保存する方法は過去記事を参考にしてください！

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

登録するプロパティは**3つ**あります。

| プロパティ | 値         | 説明                               |
| ----- | --------- | -------------------------------- |
| CONF  |           | 『0』と登録してください。                    |
| TOKEN | LINEのトークン | LINEのトークンを登録してください。              |
| LIST  | 初期値       | ここに買い物リストが保存されます。『初期値』と登録してください。 |<figure class="wp-block-image aligncenter size-large is-resized">

![![](スクリプトプロパティ.png)](スクリプトプロパティ.png) <figcaption class="wp-element-caption">スクリプトプロパティ</figcaption></figure> 

## 【Google】ウェブアプリケーションの公開URLを取得する

ウェブアプリケーションの公開URLの取得方法は過去記事を参考にしてください！

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

## 【LINE】LINE DevelopersにWebhook URLを設定する

LINE DevelopersにWebhook URLを設定する方法は過去記事を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/line-bot-with-gas#toc8" title="GASで作る簡単なLINE BOTの作り方" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
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

## 買い物リストBOTを動かしてみる

<div class="wp-block-embed__wrapper">
  <blockquote class="twitter-tweet" data-width="550" data-dnt="true">
    <p lang="ja" dir="ltr">
      有志の社内活動によるもくもく会の中で、<br />買い物リストを管理してくれるLINE BOTを作ってみた。<br /><br />リストをスプレッドシートで管理する方法なら、検索すれば見つかるけど、スプレッドシートは使わずに作ったのがこだわりです。<br /><br />スクリプトのプロパティに買い物リスト保存してます。<a href="https://twitter.com/hashtag/GAS?src=hash&ref_src=twsrc%5Etfw">#GAS</a> <a href="https://twitter.com/hashtag/LINE?src=hash&ref_src=twsrc%5Etfw">#LINE</a> <a href="https://t.co/jSGijS1dWk">pic.twitter.com/jSGijS1dWk</a>
    </p>&mdash; arukayies (@arukayies) 
    
    <a href="https://twitter.com/arukayies/status/1256587001244995585?ref_src=twsrc%5Etfw">May 2, 2020</a>
  </blockquote>
</div></figure> 

## まとめ

<strong>リッチメニュー</strong>を初めて使ってみました！


豊富なテンプレートもあり、なにも調べることなく簡単に設定できました！　<strong><span class="fz-20px">LINEすごい！</span></strong>


他にもいろんなことがLINE BOTで出来そうなので、どんどん作ってブログで紹介したいと思います！



 [1]: https://arukayies.com/gas/line_bot/shopping-list-post#toc5
