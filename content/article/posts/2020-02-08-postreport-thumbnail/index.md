---
title: GASを使ってアイキャッチ画像付でWordPressに自動投稿する方法
author: arukayies
type: post
date: 2020-02-08T14:52:57+00:00
url: /gas/wordpress-rest-api/postreport-thumbnail
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
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1245394028033503232";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1245394028033503232";s:5:"pDate";s:19:"2020-04-01 16:54:09";}}";
last_modified:
  - 2024-11-19 13:21:42
categories:
  - WordpressAPI
tags:
  - GAS
  - Google Apps Script
  - WordpressAPI

archives: ["2020年2月"]
---
以前の記事でこんなことを紹介しました。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-together">
  <a href="https://arukayies.com/gas/wordpress-rest-api/postreport" title="GASを使ってWordPressに自動投稿する方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail internal-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" width="160" height="90" src="https://arukayies.com/wp-content/uploads/2020/02/postreport-160x90.png" class="blogcard-thumb-image internal-blogcard-thumb-image wp-post-image" alt="" srcset="https://arukayies.com/wp-content/uploads/2020/02/postreport-160x90.png 160w, https://arukayies.com/wp-content/uploads/2020/02/postreport-120x68.png 120w, https://arukayies.com/wp-content/uploads/2020/02/postreport-320x180.png 320w, https://arukayies.com/wp-content/uploads/2020/02/postreport-376x212.png 376w" sizes="(max-width: 160px) 100vw, 160px" /></figure>
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASを使ってWordPressに自動投稿する方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        WordPress を使って広告収入を得たい！でもサラリーマンで毎日記事を書いてる時間はない！だったら、自動化だ！と思い立って、年末からいろいろ試していました「くら」です。まずはメインである。記事の自動投稿をGASを使って自動化します。プロ...
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

この記事ではタイトルと内容を自動投稿させるのみでしたが、

今回は**アイキャッチ画像付き**で自動投稿させます！

前回同様にプログラム未経験者でもコピペで実現できるように手順を紹介します。

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

## 自動投稿できるまでの流れ

<ol class="wp-block-list">
  <li>
    WordPressにプラグイン「Application Password」をインストール＆設定！
  </li>
  <li>
    GASのコードをコピーし、実行！
  </li>
  <li>
    これだけで自動投稿できます！
  </li>
</ol>

## WordPressにプラグイン「Application Password」をインストール

前回の手順を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-detail">
  <a href="https://arukayies.com/gas/wordpress-rest-api/postreport#toc2" title="GASを使ってWordPressに自動投稿する方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail internal-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" width="160" height="90" src="https://arukayies.com/wp-content/uploads/2020/02/postreport-160x90.png" class="blogcard-thumb-image internal-blogcard-thumb-image wp-post-image" alt="" srcset="https://arukayies.com/wp-content/uploads/2020/02/postreport-160x90.png 160w, https://arukayies.com/wp-content/uploads/2020/02/postreport-120x68.png 120w, https://arukayies.com/wp-content/uploads/2020/02/postreport-320x180.png 320w, https://arukayies.com/wp-content/uploads/2020/02/postreport-376x212.png 376w" sizes="(max-width: 160px) 100vw, 160px" /></figure>
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASを使ってWordPressに自動投稿する方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        WordPress を使って広告収入を得たい！でもサラリーマンで毎日記事を書いてる時間はない！だったら、自動化だ！と思い立って、年末からいろいろ試していました「くら」です。まずはメインである。記事の自動投稿をGASを使って自動化します。プロ...
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

## GASを使ってWordPressに自動投稿するコード(アイキャッチ画像付)

以下の部分を書き換えることで、自分のサイトにアイキャッチ画像付で自動投稿できます！

<pre class="wp-block-preformatted">var siteUrl = 'WordpressサイトのURL';
var user = 'ユーザ名';
var pass = 'パスワード';
var title = '自動投稿テスト';
var content = 'これは自動投稿です。';
var imageID = postImage(siteUrl, user, pass, 'アイキャッチ画像にしたい画像URL');</pre>

## 処理の説明

記事のタイトル・内容を投稿する処理は前回と変わりません。

アイキャッチ画像を設定するためには2つの処理が必要になります。

### 画像をアップロードする

画像をアップロードし、その結果をJSONで取得する処理です。

このJSONにWordPress上での画像IDが含まれています。

<pre class="wp-block-code"><code>function postImage(siteUrl, user, pass, imageUrl) {

	var apiUrl = siteUrl + 'wp-json/wp/v2/media';

	var headers = {
		'Content-Type': 'image/png',
		'Content-Disposition': 'attachment;filename=画像のファイル名.png',
		'accept': 'application/json',
		'Authorization': 'Basic ' + Utilities.base64Encode(user + ":" + pass)
	};

	var options = {
		'method': 'POST',
		'muteHttpExceptions': true,
		'headers': headers,
		'payload': UrlFetchApp.fetch(imageUrl)
	};

	var response = UrlFetchApp.fetch(apiUrl, options);
	var responseJson = JSON.parse(response.getContentText());

	return responseJson;
}</code></pre>

### JSONから画像IDを取得する

アップロードした結果はJSONとして、imageIDに格納されます。

WordPressでの画像IDは、imageID[&#8220;id&#8221;]これで取得できます。

WordPressAPIではIntger型で画像IDを指定するため、Number(imageID[&#8220;id&#8221;])で文字列を変換しています。

<pre class="wp-block-code"><code>//画像をアップロードする
var imageID = postImage(siteUrl, user, pass, 'アイキャッチ画像にしたい画像URL');
//アップロードした結果の画像IDを取得
imageID = Number(imageID&#91;"id"])</code></pre>

## 実際に自動投稿してみた結果

このような感じに記事を自動投稿できます！{{< custom-figure src="スクリーンショット-2020-02-08-22.56.18.png" title="" Fit="1280x1280 webp q90" >}} 

## まとめ

アイキャッチ画像付で自動投稿できることで、一気に記事のクオリティが上がったと思います。

次はなんと・・・

アイキャッチ画像の自動生成を紹介します！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-related">
  <a href="https://arukayies.com/gas/wordpress-rest-api/create-eyecatchimage" title="GASでアイキャッチ画像を自動生成させるツールを作ってみた" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail internal-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" width="160" height="90" src="https://arukayies.com/wp-content/uploads/2020/06/create-eyecatchimage2-160x90.png" class="blogcard-thumb-image internal-blogcard-thumb-image wp-post-image" alt="" srcset="https://arukayies.com/wp-content/uploads/2020/06/create-eyecatchimage2-160x90.png 160w, https://arukayies.com/wp-content/uploads/2020/06/create-eyecatchimage2-120x68.png 120w, https://arukayies.com/wp-content/uploads/2020/06/create-eyecatchimage2-320x180.png 320w, https://arukayies.com/wp-content/uploads/2020/06/create-eyecatchimage2-376x212.png 376w" sizes="(max-width: 160px) 100vw, 160px" /></figure>
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASでアイキャッチ画像を自動生成させるツールを作ってみた
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        誰でも作れるように詳細な解説付きです！背景画像と文字入り画像を合成して、Wordpressにアップロードまで自動化しています。
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
