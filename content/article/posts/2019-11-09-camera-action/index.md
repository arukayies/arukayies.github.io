---
title: "【GAS】カメラアクションでユーザーに写真を撮影・送信させる方法"
description: "Google Apps Script (GAS) を使ってLINE BOTにカメラアクションを実装する方法を解説します。ユーザーにカメラを起動させて写真を撮影・送信してもらう機能です。サンプルコード付きで紹介。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "カメラ"]
date: "2019-11-09T06:28:12.000Z"
url: "/gas/line_bot/camera-action"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T14:31:03+09:00"
---

この記事では、Google Apps Script (GAS) を利用して、LINE BOTでユーザーにカメラを起動させ、撮影した写真を送信してもらう「カメラアクション」の実装方法を詳しく解説します。

この機能を使えば、ユーザーはその場で撮影した写真をBOTに送ることができるため、報告書作成やQRコード読み取りなど、リアルタイムな画像のやり取りが必要な場面で役立ちます。

公式ドキュメント：[カメラアクション - LINE Developers](https://developers.line.biz/ja/reference/messaging-api/#camera-action)

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

## 『カメラアクション』を送るサンプルコード

以下のコードをGASのスクリプトエディタに貼り付けることで、指定したユーザーにカメラアクションを含むボタンテンプレートメッセージを送信できます。

```javascript:camera_action.js
/*
ボタンテンプレートメッセージを送る(camera)
———————————–*/
function camera_action() {
	/* スクリプトプロパティのオブジェクトを取得 */
	const prop = PropertiesService.getScriptProperties().getProperties();

	/* ボタンテンプレートメッセージを送る(camera) */
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
					"altText": "camera",
					"template": {
						"type": "buttons",
						"thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=camera", // 画像のURL
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
								"type": "camera",
								"label": "カメラを起動します。"
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

## 『カメラアクション』を送った結果

{{< custom-figure src="img_5dfa24d95d158.jpg" title="" Fit="1280x1280 webp q90" >}}

{{< custom-figure src="img_5dfa24d9989a0.jpg" title="" Fit="1280x1280 webp q90" >}} 

ユーザーが写真を撮影して送信すると、`image`メッセージとしてWebhookイベントが通知されます。イベントオブジェクトに含まれる`message.id`を使って、送信された画像データを取得できます。

画像データの取得方法について、詳しくは[こちら](https://developers.line.biz/ja/reference/messaging-api/#get-content)の公式ドキュメントを参照してください。

他のアクションオブジェクトについても、以下の記事で解説しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
