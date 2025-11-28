---
title: "【GAS】日時選択アクションでユーザーから日時を取得する方法"
description: "Google Apps Script (GAS) を使ってLINE BOTに日時選択アクションを実装する方法を解説します。ユーザーがカレンダーから日付や時刻を選ぶだけで、予約やリマインダー設定が簡単に行えるようになります。サンプルコード付きで紹介。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "日時選択"]
date: "2019-11-09T06:27:58.000Z"
url: "/gas/line_bot/datetime-picker-action"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T14:11:20+09:00"
---

この記事では、Google Apps Script (GAS) を利用して、LINE BOTでユーザーに日時を選択させるための「日時選択アクション」の実装方法を詳しく解説します。

この機能を使えば、ユーザーはカレンダーUIから直感的に日付や時刻を選べるようになり、ボットでの予約受付やリマインダー設定がスムーズになります。

公式ドキュメント：[日時選択アクション - LINE Developers](https://developers.line.biz/ja/reference/messaging-api/#datetime-picker-action)

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

## 『日時選択アクション』を送るサンプルコード

以下のコードをGASのスクリプトエディタに貼り付けることで、指定したユーザーに日時選択アクションを含むボタンテンプレートメッセージを送信できます。

```javascript:datetime_picker_action.js
/*
ボタンテンプレートメッセージを送る(datetime_picker)
———————————–*/
function datetime_picker_action() {
	/* スクリプトプロパティのオブジェクトを取得 */
	const prop = PropertiesService.getScriptProperties().getProperties();

	/* ボタンテンプレートメッセージを送る(datetime_picker) */
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
					"altText": "datetime_picker",
					"template": {
						"type": "buttons",
						"thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=datetime_picker", // 画像のURL
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
								"type": "datetimepicker",
								"label": "日時を選択してください。",
								"data": "action=settime",
								"mode": "datetime",
								"initial": "2017-12-25t00:00",
								"max": "2018-01-24t23:59",
								"min": "2017-12-25t00:00"
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

## 『日時選択アクション』を送った結果

{{< custom-figure src="img_5dfa24fd054ab.jpg" title="" Fit="1280x1280 webp q90" >}}

{{< custom-figure src="img_5dfa24fd5e175.jpg" title="" Fit="1280x1280 webp q90" >}} 

ユーザーが日時を選択すると、`postback`イベントとして`data`で指定したデータと、選択された日時(`params.datetime`)がWebhookで送信されます。

この情報を利用して、Googleカレンダーへの予定登録やスプレッドシートへの記録などが可能です。

他のアクションオブジェクトについても、以下の記事で解説しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
