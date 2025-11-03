---
title: GASだけで作れる買い物リストを管理するLINE BOTの作り方
author: arukayies
type: post
date: 2020-05-03T16:43:29+00:00
excerpt: GASだけで作れる買い物リストを管理できるLINE BOTの作り方を紹介します！コピペで作れるのでぜひ使ってみてください！
url: /gas/line_bot/shopping-list-post
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
  - 1588524210
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1256987881526095872";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1256987881526095872";s:5:"pDate";s:19:"2020-05-03 16:43:59";}}";
last_modified:
  - 2024-11-15 16:28:24
categories:
  - LINE BOT
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
  </div>
</div>

それでは作り方を紹介します！

コードだけ見たい！って方は<a href="https://arukayies.com/gas/line_bot/shopping-list-post#toc4" class="aioseop-link">こちら</a>からどうぞ！

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" ><img decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/20010009784798150734_1.jpg" style="border: none;" /></a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >ＬＩＮＥ　ＢＯＴを作ろう！ Ｍｅｓｓａｇｉｎｇ　ＡＰＩを使ったチャットボットの/翔泳社/立花翔</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3DLINE%2520bot%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3DLINE%2520bot" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" ><img decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/20010009784798064741_1.jpg" style="border: none;" /></a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
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

## 【LINE】BOTを作成する

BOTの作成方法は過去記事を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/gettoken" title="LINE Messaging APIアクセストークンの取得方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail internal-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" width="160" height="90" src="https://arukayies.com/wp-content/uploads/2019/07/gettoken-1-160x90.png" class="blogcard-thumb-image internal-blogcard-thumb-image wp-post-image" alt="" srcset="https://arukayies.com/wp-content/uploads/2019/07/gettoken-1-160x90.png 160w, https://arukayies.com/wp-content/uploads/2019/07/gettoken-1-120x68.png 120w, https://arukayies.com/wp-content/uploads/2019/07/gettoken-1-320x180.png 320w, https://arukayies.com/wp-content/uploads/2019/07/gettoken-1-376x212.png 376w" sizes="(max-width: 160px) 100vw, 160px" /></figure>
    
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

{{< custom-figure src="お買い物BOT.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">お買い物BOT</figcaption></figure> 

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

<img loading="lazy" decoding="async" width="1024" height="478" src="https://arukayies.com/wp-content/uploads/2020/05/アカウントリスト-1024x478.png" alt="アカウントリスト" class="wp-image-3019" style="aspect-ratio:714/333" srcset="https://arukayies.com/wp-content/uploads/2020/05/アカウントリスト-1024x478.png 1024w, https://arukayies.com/wp-content/uploads/2020/05/アカウントリスト-300x140.png 300w, https://arukayies.com/wp-content/uploads/2020/05/アカウントリスト-768x359.png 768w, https://arukayies.com/wp-content/uploads/2020/05/アカウントリスト-1536x717.png 1536w, https://arukayies.com/wp-content/uploads/2020/05/アカウントリスト.png 1565w" sizes="(max-width: 1024px) 100vw, 1024px" /> <figcaption class="wp-element-caption">アカウントリスト</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

3　リッチメニューから『**作成**』ボタンを押下します。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large"><img loading="lazy" decoding="async" width="1024" height="467" src="https://arukayies.com/wp-content/uploads/2020/05/リッチメニューを選択-1024x467.png" alt="リッチメニューを選択" class="wp-image-3020" srcset="https://arukayies.com/wp-content/uploads/2020/05/リッチメニューを選択-1024x467.png 1024w, https://arukayies.com/wp-content/uploads/2020/05/リッチメニューを選択-300x137.png 300w, https://arukayies.com/wp-content/uploads/2020/05/リッチメニューを選択-768x350.png 768w, https://arukayies.com/wp-content/uploads/2020/05/リッチメニューを選択-1536x701.png 1536w, https://arukayies.com/wp-content/uploads/2020/05/リッチメニューを選択.png 1583w" sizes="(max-width: 1024px) 100vw, 1024px" /><figcaption class="wp-element-caption">リッチメニューを選択</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large"><img loading="lazy" decoding="async" width="1024" height="190" src="https://arukayies.com/wp-content/uploads/2020/05/リッチメニューの作成を選択-1024x190.png" alt="リッチメニューの作成を選択" class="wp-image-3021" srcset="https://arukayies.com/wp-content/uploads/2020/05/リッチメニューの作成を選択-1024x190.png 1024w, https://arukayies.com/wp-content/uploads/2020/05/リッチメニューの作成を選択-300x56.png 300w, https://arukayies.com/wp-content/uploads/2020/05/リッチメニューの作成を選択-768x142.png 768w, https://arukayies.com/wp-content/uploads/2020/05/リッチメニューの作成を選択.png 1247w" sizes="(max-width: 1024px) 100vw, 1024px" /><figcaption class="wp-element-caption">リッチメニューの作成を選択</figcaption></figure>
  </div>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

4　**表示設定**を以下のように設定します。<figure class="wp-block-image aligncenter size-large is-resized">

<img loading="lazy" decoding="async" width="1024" height="441" src="https://arukayies.com/wp-content/uploads/2020/05/表示設定の例-1024x441.png" alt="表示設定の例" class="wp-image-3022" style="aspect-ratio:714/307" srcset="https://arukayies.com/wp-content/uploads/2020/05/表示設定の例-1024x441.png 1024w, https://arukayies.com/wp-content/uploads/2020/05/表示設定の例-300x129.png 300w, https://arukayies.com/wp-content/uploads/2020/05/表示設定の例-768x331.png 768w, https://arukayies.com/wp-content/uploads/2020/05/表示設定の例.png 1108w" sizes="(max-width: 1024px) 100vw, 1024px" /> <figcaption class="wp-element-caption">表示設定の例</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

5　コンテンツ設定で『テンプレートを選択』ボタンを押下します。<figure class="wp-block-image aligncenter size-large is-resized">

<img loading="lazy" decoding="async" width="1024" height="303" src="https://arukayies.com/wp-content/uploads/2020/05/テンプレートを選択-1024x303.png" alt="テンプレートを選択" class="wp-image-3023" style="aspect-ratio:714/211" srcset="https://arukayies.com/wp-content/uploads/2020/05/テンプレートを選択-1024x303.png 1024w, https://arukayies.com/wp-content/uploads/2020/05/テンプレートを選択-300x89.png 300w, https://arukayies.com/wp-content/uploads/2020/05/テンプレートを選択-768x227.png 768w, https://arukayies.com/wp-content/uploads/2020/05/テンプレートを選択.png 1226w" sizes="(max-width: 1024px) 100vw, 1024px" /> <figcaption class="wp-element-caption">テンプレートを選択</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

6　**大**の**4分割**の**テンプレート**を選択します。<figure class="wp-block-image aligncenter size-large is-resized">

{{< custom-figure src="テンプレート大を選択.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">テンプレート大4分割を選択</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

7　『**画像を作成**』ボタンを押下します。<figure class="wp-block-image size-large is-resized">

<img loading="lazy" decoding="async" width="1024" height="591" src="https://arukayies.com/wp-content/uploads/2020/05/画像を作成-1024x591.png" alt="画像を作成" class="wp-image-3025" style="aspect-ratio:714/412" srcset="https://arukayies.com/wp-content/uploads/2020/05/画像を作成-1024x591.png 1024w, https://arukayies.com/wp-content/uploads/2020/05/画像を作成-300x173.png 300w, https://arukayies.com/wp-content/uploads/2020/05/画像を作成-768x443.png 768w, https://arukayies.com/wp-content/uploads/2020/05/画像を作成-120x68.png 120w, https://arukayies.com/wp-content/uploads/2020/05/画像を作成.png 1101w" sizes="(max-width: 1024px) 100vw, 1024px" /> <figcaption class="wp-element-caption">画像を作成</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

8　4枚の画像をアップロードして、適用します。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image aligncenter size-large is-resized">{{< custom-figure src="画像を設定.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption">画像をアップロード</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image aligncenter size-large is-resized">{{< custom-figure src="画像の例.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption">画像の例</figcaption></figure> 
    
    <p>
    </p>
  </div>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

9　A,B,C,Dのアクションタイプを『**テキスト**』にし、以下のような文言を入力します。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image aligncenter size-large is-resized"><img loading="lazy" decoding="async" width="1024" height="515" src="https://arukayies.com/wp-content/uploads/2020/05/Aを押下した時の動作-1024x515.png" alt="Aのアクション" class="wp-image-3028" style="aspect-ratio:357/179" srcset="https://arukayies.com/wp-content/uploads/2020/05/Aを押下した時の動作-1024x515.png 1024w, https://arukayies.com/wp-content/uploads/2020/05/Aを押下した時の動作-300x151.png 300w, https://arukayies.com/wp-content/uploads/2020/05/Aを押下した時の動作-768x386.png 768w, https://arukayies.com/wp-content/uploads/2020/05/Aを押下した時の動作.png 1131w" sizes="(max-width: 1024px) 100vw, 1024px" /><figcaption class="wp-element-caption">Aのアクション</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image aligncenter size-large"><img loading="lazy" decoding="async" width="1024" height="535" src="https://arukayies.com/wp-content/uploads/2020/05/Bを押下した時の動作-1024x535.png" alt="Bのアクション" class="wp-image-3029" srcset="https://arukayies.com/wp-content/uploads/2020/05/Bを押下した時の動作-1024x535.png 1024w, https://arukayies.com/wp-content/uploads/2020/05/Bを押下した時の動作-300x157.png 300w, https://arukayies.com/wp-content/uploads/2020/05/Bを押下した時の動作-768x401.png 768w, https://arukayies.com/wp-content/uploads/2020/05/Bを押下した時の動作.png 1118w" sizes="(max-width: 1024px) 100vw, 1024px" /><figcaption class="wp-element-caption">Bのアクション</figcaption></figure>
  </div>
</div>

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image aligncenter size-large is-resized"><img loading="lazy" decoding="async" width="1024" height="509" src="https://arukayies.com/wp-content/uploads/2020/05/Cを押下した時の動作-1024x509.png" alt="Cのアクション" class="wp-image-3030" style="aspect-ratio:357/177" srcset="https://arukayies.com/wp-content/uploads/2020/05/Cを押下した時の動作-1024x509.png 1024w, https://arukayies.com/wp-content/uploads/2020/05/Cを押下した時の動作-300x149.png 300w, https://arukayies.com/wp-content/uploads/2020/05/Cを押下した時の動作-768x382.png 768w, https://arukayies.com/wp-content/uploads/2020/05/Cを押下した時の動作.png 1119w" sizes="(max-width: 1024px) 100vw, 1024px" /><figcaption class="wp-element-caption">Cのアクション</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image aligncenter size-large"><img loading="lazy" decoding="async" width="1024" height="516" src="https://arukayies.com/wp-content/uploads/2020/05/Dを押下したときの動作-1024x516.png" alt="Dのアクション" class="wp-image-3031" srcset="https://arukayies.com/wp-content/uploads/2020/05/Dを押下したときの動作-1024x516.png 1024w, https://arukayies.com/wp-content/uploads/2020/05/Dを押下したときの動作-300x151.png 300w, https://arukayies.com/wp-content/uploads/2020/05/Dを押下したときの動作-768x387.png 768w, https://arukayies.com/wp-content/uploads/2020/05/Dを押下したときの動作.png 1110w" sizes="(max-width: 1024px) 100vw, 1024px" /><figcaption class="wp-element-caption">Dのアクション</figcaption></figure>
  </div>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

10　すべて入力できたら、『**保存**』ボタンを押下します。<figure class="wp-block-image aligncenter size-large is-resized">

<img loading="lazy" decoding="async" width="1024" height="461" src="https://arukayies.com/wp-content/uploads/2020/05/設定できたら保存する-1024x461.png" alt="保存" class="wp-image-3032" style="aspect-ratio:714/321" srcset="https://arukayies.com/wp-content/uploads/2020/05/設定できたら保存する-1024x461.png 1024w, https://arukayies.com/wp-content/uploads/2020/05/設定できたら保存する-300x135.png 300w, https://arukayies.com/wp-content/uploads/2020/05/設定できたら保存する-768x346.png 768w, https://arukayies.com/wp-content/uploads/2020/05/設定できたら保存する.png 1100w" sizes="(max-width: 1024px) 100vw, 1024px" /> <figcaption class="wp-element-caption">保存</figcaption></figure> 

## 【LINE】チャンネルアクセストークンを取得する

チャンネルアクセストークンの取得方法は過去記事を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/gettoken" title="LINE Messaging APIアクセストークンの取得方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail internal-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" width="160" height="90" src="https://arukayies.com/wp-content/uploads/2019/07/gettoken-1-160x90.png" class="blogcard-thumb-image internal-blogcard-thumb-image wp-post-image" alt="" srcset="https://arukayies.com/wp-content/uploads/2019/07/gettoken-1-160x90.png 160w, https://arukayies.com/wp-content/uploads/2019/07/gettoken-1-120x68.png 120w, https://arukayies.com/wp-content/uploads/2019/07/gettoken-1-320x180.png 320w, https://arukayies.com/wp-content/uploads/2019/07/gettoken-1-376x212.png 376w" sizes="(max-width: 160px) 100vw, 160px" /></figure>
    
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
    </div><figure class="blogcard-thumbnail internal-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" width="160" height="90" src="https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-160x90.png" class="blogcard-thumb-image internal-blogcard-thumb-image wp-post-image" alt="" srcset="https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-160x90.png 160w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-120x68.png 120w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-320x180.png 320w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-376x212.png 376w" sizes="(max-width: 160px) 100vw, 160px" /></figure>
    
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
    </div><figure class="blogcard-thumbnail internal-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" width="160" height="90" src="https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-160x90.png" class="blogcard-thumb-image internal-blogcard-thumb-image wp-post-image" alt="" srcset="https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-160x90.png 160w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-120x68.png 120w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-320x180.png 320w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-376x212.png 376w" sizes="(max-width: 160px) 100vw, 160px" /></figure>
    
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

{{< custom-figure src="スクリプトプロパティ.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">スクリプトプロパティ</figcaption></figure> 

## 【Google】ウェブアプリケーションの公開URLを取得する

ウェブアプリケーションの公開URLの取得方法は過去記事を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/line-bot-with-gas#toc7" title="GASで作る簡単なLINE BOTの作り方" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail internal-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" width="160" height="90" src="https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-160x90.png" class="blogcard-thumb-image internal-blogcard-thumb-image wp-post-image" alt="" srcset="https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-160x90.png 160w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-120x68.png 120w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-320x180.png 320w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-376x212.png 376w" sizes="(max-width: 160px) 100vw, 160px" /></figure>
    
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
    </div><figure class="blogcard-thumbnail internal-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" width="160" height="90" src="https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-160x90.png" class="blogcard-thumb-image internal-blogcard-thumb-image wp-post-image" alt="" srcset="https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-160x90.png 160w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-120x68.png 120w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-320x180.png 320w, https://arukayies.com/wp-content/uploads/2019/07/line-bot-with-gas-376x212.png 376w" sizes="(max-width: 160px) 100vw, 160px" /></figure>
    
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
</p>
<p>
豊富なテンプレートもあり、なにも調べることなく簡単に設定できました！　<strong><span class="fz-20px">LINEすごい！</span></strong>
</p>
<p>
他にもいろんなことがLINE BOTで出来そうなので、どんどん作ってブログで紹介したいと思います！

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" ><img decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/20010009784798150734_1.jpg" style="border: none;" /></a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >ＬＩＮＥ　ＢＯＴを作ろう！ Ｍｅｓｓａｇｉｎｇ　ＡＰＩを使ったチャットボットの/翔泳社/立花翔</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3DLINE%2520bot%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3DLINE%2520bot" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" ><img decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/20010009784798064741_1.jpg" style="border: none;" /></a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
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

 [1]: https://arukayies.com/gas/line_bot/shopping-list-post#toc5
