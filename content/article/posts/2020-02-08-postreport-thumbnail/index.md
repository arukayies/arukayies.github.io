---
title: "【GAS】WordPress REST APIを使ってアイキャッチ画像付き記事を自動投稿する方法"
description: "Google Apps Script (GAS) と WordPress REST API を利用して、アイキャッチ画像付きの記事を自動で投稿する方法を解説します。コピペで使えるサンプルコード付きで、ブログ投稿の自動化を実現します。"
tags: ["GAS", "Google Apps Script", "WordPress", "REST API", "自動投稿"]
date: "2020-02-08T14:52:57.000Z"
url: "/gas/wordpress-rest-api/postreport-thumbnail"
share: true
toc: true
categories: ["WordpressAPI"]
archives: ["2020年2月"]
lastmod: "2025-11-27T10:33:25+09:00"
---

この記事では、Google Apps Script (GAS) を使って、WordPressに**アイキャッチ画像付き**の記事を自動で投稿する方法を解説します。

[以前の記事](https://arukayies.com/gas/wordpress-rest-api/postreport)で、テキストのみの自動投稿方法を紹介しましたが、今回はそれをさらにパワーアップさせます。

プログラムが初めての方でも、この記事の手順に沿ってコピペするだけで実装できるように、分かりやすく説明していきます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## 実現までの3ステップ

自動投稿は、以下の3つの簡単なステップで実現できます。

1.  **WordPressの準備**: プラグイン「Application Passwords」をインストールして設定します。
2.  **GASの準備**: Google Apps Scriptにコードをコピー＆ペーストします。
3.  **実行**: スクリプトを実行すれば、自動投稿が完了します。

## 1. WordPressの準備（Application Passwordsの設定）

まず、GASからWordPressに安全に接続するために、「Application Passwords」というプラグインを利用します。

詳しいインストール方法や設定手順については、以前の記事で解説していますので、こちらを参考にしてください。

{{< self-blog-card "article/posts/2020-02-08-postreport" >}}

## 2. GASで自動投稿するコード

次に、Google Apps Scriptのスクリプトエディタを開き、以下のコードを貼り付けます。

コード内の`siteUrl`, `user`, `pass`, `title`, `content`と、アイキャッチ画像のURLは、ご自身の環境に合わせて書き換えてください。

```javascript
/*
 * 関数概要: WordPressにアイキャッチ画像付きの記事を投稿する
 * @return {Object} 実行結果のJSONオブジェクト
 */
function postReport_thumbnail() {

	var siteUrl = 'あなたのWordpressサイトのURL';
	var user = 'あなたのユーザ名';
	var pass = 'Application Passwordsで生成したパスワード';
	var title = '自動投稿テスト(アイキャッチ画像付)';
	var content = 'これはGASによる自動投稿です。(アイキャッチ画像付)';
	var imageUrl = 'アイキャッチ画像にしたい画像のURL';

	// 1. 画像をアップロードしてIDを取得
	var imageID = postImage(siteUrl, user, pass, imageUrl);
	if (!imageID || !imageID["id"]) {
		Logger.log('画像のアップロードに失敗しました。');
		return;
	}
	var featuredMediaId = Number(imageID["id"]);

	// 2. 記事を投稿
	var apiUrl = siteUrl + '/wp-json/wp/v2/posts';
	var headers = {
		'Authorization': 'Basic ' + Utilities.base64Encode(user + ":" + pass)
	};

	var payload = {
		'title': title,
		'content': content,
		'featured_media': featuredMediaId, // アイキャッチ画像のIDを指定
		'status': 'publish',
		'comment_status': 'closed'
	};

	var options = {
		'method': 'POST',
		'contentType': 'application/json',
		'headers': headers,
		'payload': JSON.stringify(payload),
		'muteHttpExceptions': true
	};

	var response = UrlFetchApp.fetch(apiUrl, options);
	var responseJson = JSON.parse(response.getContentText());

	Logger.log(responseJson);
	return responseJson;
}

/*
 * 関数概要: WordPressに画像をアップロードし、結果を返す
 * @param {string} siteUrl - サイトのURL
 * @param {string} user - ユーザー名
 * @param {string} pass - パスワード
 * @param {string} imageUrl - 画像のURL
 * @return {Object} アップロード結果のJSONオブジェクト
 */
function postImage(siteUrl, user, pass, imageUrl) {
	var apiUrl = siteUrl + '/wp-json/wp/v2/media';
	var imageBlob = UrlFetchApp.fetch(imageUrl).getBlob();
	var fileName = 'eyecatch.png'; // 任意のファイル名

	var headers = {
		'Authorization': 'Basic ' + Utilities.base64Encode(user + ":" + pass),
		'Content-Disposition': 'attachment; filename="' + fileName + '"'
	};

	var options = {
		'method': 'POST',
		'contentType': imageBlob.getContentType(),
		'headers': headers,
		'payload': imageBlob,
		'muteHttpExceptions': true
	};

	var response = UrlFetchApp.fetch(apiUrl, options);
	var responseJson = JSON.parse(response.getContentText());

	return responseJson;
}
```

## 3. コードの解説

アイキャッチ画像を設定するためには、大きく分けて2つの処理が必要です。

### 1. WordPressへ画像をアップロード

まず、`postImage`関数を使って、指定したURLの画像をWordPressのメディアライブラリにアップロードします。

アップロードが成功すると、WordPressはその画像に一意の「メディアID」を割り当てます。このIDが、記事とアイキャッチ画像を紐付けるために必要になります。

### 2. 取得したIDを使って記事を投稿

次に、`postReport_thumbnail`関数内で、先ほど取得したメディアIDを`featured_media`というパラメータに設定して記事情報を投稿します。

これにより、WordPressは「この記事のアイキャッチ画像はこのIDの画像だ」と認識し、正しく設定してくれます。

## 実行結果

スクリプトを実行すると、このようにアイキャッチ画像が設定された記事が自動で投稿されます。

{{< custom-figure src="スクリーンショット-2020-02-08-22.56.18.png" title="自動投稿された記事の例" Fit="1280x1280 webp q90" >}} 

## まとめ

今回は、GASを使ってWordPressにアイキャッチ画像付きの記事を自動投稿する方法を紹介しました。

記事の投稿を自動化することで、コンテンツ作成により集中でき、ブログ運営の効率が格段にアップします。

さらに、次のステップとしてアイキャッチ画像そのものを自動生成する方法も紹介しています。ぜひ挑戦してみてください。

{{< self-blog-card "article/posts/2020-06-13-create-eyecatchimage" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
