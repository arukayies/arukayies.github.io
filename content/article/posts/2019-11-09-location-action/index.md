---
title: "【GAS】位置情報アクションでユーザーの現在地を取得する方法"
description: "Google Apps Script (GAS) を使ってLINE BOTに位置情報アクションを実装する方法を解説します。ユーザーがボタンをタップするだけで、現在地情報を簡単に取得できるサンプルコード付きで紹介。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "位置情報"]
date: "2019-11-09T06:28:41.000Z"
url: "/gas/line_bot/location-action"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T14:05:52+09:00"
---
この記事では、Google Apps Script (GAS) を利用して、LINE BOTでユーザーの現在地を取得するための「位置情報アクション」の実装方法を詳しく解説します。

ユーザーがメッセージ内のボタンをタップするだけで、簡単に位置情報を送信してくれる便利な機能です。店舗検索やイベント案内など、位置情報を活用したサービスの開発に役立ちます。

公式ドキュメント：[位置情報アクション - LINE Developers](https://developers.line.biz/ja/reference/messaging-api/#location-action)

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## 事前準備

LINE Developersでトークンを取得してください。

{{< self-blog-card "article/posts/2019-07-02-gettoken" >}}

LINEの送信先IDの調べ方はこの手順で確認できます。

{{< self-blog-card "article/posts/2019-11-03-get-userid" >}}

GASのスクリプトプロパティの追加手順は過去の記事で紹介しています。  
手順7〜からが該当手順です。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

## 『位置情報アクション』を送るサンプルコード

以下のコードをGASのスクリプトエディタに貼り付けることで、指定したユーザーに位置情報アクションを含むボタンテンプレートメッセージを送信できます。

```javascript:location_action.js
/*
ボタンテンプレートメッセージを送る(location)
———————————–*/
function location_action() {
	/* スクリプトプロパティのオブジェクトを取得 */
	const prop = PropertiesService.getScriptProperties().getProperties();

	/* ボタンテンプレートメッセージを送る(location) */
	UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
		'headers': {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + prop.TOKEN, // スクリプトプロパティにトークンは事前に追加しておく
		},
		'method': 'POST',
		'payload': JSON.stringify({
			"to": prop.DEBUGID, // スクリプトプロパティに送信先IDは事前に追加しておく
			"messages": [
				{
					"type": "template",
					"altText": "location",
					"template": {
						"type": "buttons",
						"thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=location", // 画像のURL
						"imageAspectRatio": "rectangle", // 画像のアスペクト比、「rectangle: 1.51:1」・「square: 1:1」、デフォルト値はrectangle
						"imageSize": "cover", // 画像の表示形式
						"imageBackgroundColor": "#FFFFFF", // 画像の背景色
						"title": "メニュー",
						"text": "以下より選択してください。",
						"defaultAction": {
							"type": "uri",
							"label": "View detail",
							"uri": "https://arukayies.com/"
						},
						"actions": [
							{
								"type": "location",
								"label": "現在地を選択してください。"
							}
						]
					}
				}
			],
			"notificationDisabled": false // trueだとユーザーに通知されない
		}),
	});
}
```

`TOKEN`（アクセストークン）と`DEBUGID`（送信先のユーザーID）は、事前にスクリプトプロパティに設定しておく必要があります。

## 『位置情報アクション』を送った結果

{{< custom-figure src="img_5dfa242d10d60.jpg" title="" Fit="1280x1280 webp q90" >}}

{{< custom-figure src="img_5dfa242d5adf8.jpg" title="" Fit="1280x1280 webp q90" >}} 

ユーザーが位置情報を送信すると、WebhookイベントとしてGASに通知が届きます。その中には住所、緯度、経度といった情報が含まれているため、店舗検索やルート案内など、様々なサービスに応用できます。

他のアクションオブジェクトについても、以下の記事で解説しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
