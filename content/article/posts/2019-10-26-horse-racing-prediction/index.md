---
title: "【GAS活用術】JRAレース結果をスクレイピングして競馬予想するシステムを構築"
description: "Google Apps Script（GAS）を使い、JRA公式サイトから過去のレース結果を自動で収集・分析。独自のスコアリングで着順を予想するシステムの開発過程と、実際のレースでの検証結果を初心者にも分かりやすく解説します。"
tags: ["Google Apps Script", "スプレッドシート", "スクレイピング", "競馬予想"]
date: "2019-10-26T12:36:19.000Z"
url: "/gas/horse-racing-prediction"
share: true
toc: true
categories: ["GAS"]
archives: ["2019年10月"]
lastmod: "2025-11-27T20:50:15+09:00"
---

**この記事で学べること**
*   GASを使ったWebスクレイピングの基本的な実装方法
*   収集したデータをスプレッドシートで管理・分析するテクニック
*   独自のロジックに基づいた競馬予想システムの構築アプローチ

**注意**：本記事で紹介するスクレイピング手法は、JRA公式サイトのHTML構造に依存しており、サイト構造の変更によって動作しなくなる可能性があります。また、JRA公式サイトでは、掲載コンテンツの二次利用（複製、改変、転載など）を許可していません。本記事の試みは、あくまで個人的な学習・研究目的で一時的にデータを収集・分析したものであり、収集したデータの再配布や営利目的での利用は一切行いません。読者が同様の手法を試す場合は、JRAの利用規約を十分に確認し、自己の責任において行ってください。データ分析や予想に関する内容も筆者の個人的な試みであり、その精度を保証するものではありません。

## はじめに：競馬予想への挑戦

ある日、競馬観戦をきっかけに「データに基づいて着順を予想できないか？」というアイデアが浮かびました。プログラミングの知識を活かし、Google Apps Script（GAS）を使ってJRA公式サイトの過去レース結果を収集し、独自のスコアリングで予想するシステムを開発することに挑戦しました。

この記事では、その開発過程とシステムを使って2019年の天皇賞（秋）を予想した結果を共有します。

## 競馬予想システムの概要

このシステムは、以下の3つのステップで着順を予想します。

1.  **データ収集**：GASの`UrlFetchApp`サービスを使い、JRA公式サイトから指定した年の重賞レース結果ページをスクレイピングします。
2.  **データ整形と保存**：収集したHTMLデータから、レース名、競馬場、コース、着順、馬名、騎手名、天候などの情報を正規表現で抽出し、Googleスプレッドシートに整理して保存します。
3.  **スコア算出と予想**：スプレッドシートに蓄積された過去データをもとに、独自の計算式で出走馬と騎手のスコアを算出し、着順を予想します。

## ステップ1：GASによるデータ収集と整形

システムの根幹となるのが、GASを使ったデータ収集・整形プロセスです。ここでは、対象ページのHTMLを取得し、必要な情報を抽出してスプレッドシートに書き込むまでのコードを解説します。

### 1-1. レース一覧から個別レースへのURLを取得

まず、年ごとの重賞レース一覧ページにアクセスし、各レース結果ページへのリンクを取得します。

```javascript
/**
 * 指定された正規表現でHTMLコンテンツからテキストを抽出するヘルパー関数
 * @param {string} content - HTMLコンテンツ
 * @param {RegExp} regex - 抽出用の正規表現
 * @returns {string[]} 抽出されたテキストの配列
 */
const extractData = (content, regex) => {
  const matches = content.match(regex) || [];
  const japaneseRegex = /[^\x00-\x7Eｧ-ﾝﾞﾟ]+/g;
  return matches.map(match => (match.match(japaneseRegex) || [''])[0]);
};

/**
 * JRAサイトから指定された年のレース成績データを取得し、スプレッドシートに書き込むメイン関数
 */
function getSeiseki() {
  const years = [2019]; // 取得対象の年
  const baseUrl = 'http://www.jra.go.jp';

  for (const year of years) {
    const url = `${baseUrl}/datafile/seiseki/replay/${year}/jyusyo.html`;
    const response = UrlFetchApp.fetch(url);
    const content = response.getContentText('Shift_JIS');

    // レース一覧ページから基本情報を一括で抽出
    const raceData = extractData(content, /<td class="race">([\s\S]*?)<\/td>/g);
    const placeData = extractData(content, /<td class="place">([\s\S]*?)<\/td>/g);
    const courseData = extractData(content, /<td class="course"><span class="type">([\s\S]*?)<\/span>/g);
    const resultUrlMatches = content.match(/<td class="result"><a href="([\s\S]*?).html"/g) || [];

    resultUrlMatches.forEach((match, index) => {
      const path = match.replace(/<td class="result"><a href="|"/g, '');
      const resultUrl = `${baseUrl}${path}`;

      const resultData = getResult(resultUrl);
      if (!resultData) return; // 結果が取得できなければスキップ

      const sheetData = resultData.map(result => [
        `=HYPERLINK("${resultUrl}","${raceData[index]}")`,
        placeData[index],
        courseData[index],
        result[0], // 着順
        result[1], // 馬名
        result[2], // 騎手
        result[3], // 天候
      ]);

      writeSheet(sheetData);
    });
  }
}
```

### 1-2. 各レース結果ページから詳細情報を抽出

次に、取得したURLを元に個別のレース結果ページを解析し、馬名、騎手名、天候などを抽出します。

```javascript
/**
 * 複数の正規表現パターンを試して最初に一致した結果を返すヘルパー関数
 * @param {string} content - HTMLコンテンツ
 * @param {RegExp[]} patterns - 試行する正規表現の配列
 * @returns {string[] | null} 一致した結果の配列、またはnull
 */
const findMatch = (content, patterns) => {
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match;
    }
  }
  return null;
};

/**
 * 個別のレース結果ページから詳細情報（馬名、騎手名、天候）を抽出する
 * @param {string} resultUrl - レース結果ページのURL
 * @returns {Array[]|null} 抽出されたレース結果の二次元配列、またはnull
 */
function getResult(resultUrl) {
  try {
    const response = UrlFetchApp.fetch(resultUrl);
    const content = response.getContentText('Shift_JIS');
    const japaneseRegex = /[^\x00-\x7Eｧ-ﾝﾞﾟ]+/g;

    // 馬名の抽出パターン
    const horsePatterns = [
      /<td align="left" class="gray12"> ([\s\S]*?)<\/td>/g,
      /<td class="horse">([\s\S]*?)<\/td>/g,
      /<td class="umameiCol">([\s\S]*?)<\/td>/g,
    ];
    const horseMatches = findMatch(content, horsePatterns) || [];
    const horseData = horseMatches.map(match => (match.match(japaneseRegex) || [''])[0]);

    // 騎手名の抽出パターン
    const jockeyPatterns = [
      /<td width="75" align="left" class="gray12">([\s\S]*?)<\/td>/g,
      /<td class="jockey">([\s\S]*?)<\/td>/g,
      /<td class="jocCol">([\s\S]*?)<\/td>/g,
    ];
    const jockeyMatches = findMatch(content, jockeyPatterns) || [];
    const nameData = jockeyMatches.map(match => (match.replace(/\s+/g, '').match(japaneseRegex) || [''])[0]);

    // 天候の抽出パターン
    const weatherPatterns = [
      /<td align="right">天候：([\s\S]*?)<\/td>/g,
      /<div class="raceTenkou">天候：([\s\S]*?)<\/div>/g,
      /<li class="weather">.*?<span class="txt">([\s\S]*?)<\/span>/g,
    ];
    const weatherMatch = findMatch(content, weatherPatterns);
    let weather = '';
    if (weatherMatch) {
      weather = (weatherMatch[0].match(japaneseRegex) || ['',''])[1] || (weatherMatch[0].match(japaneseRegex) || [''])[0];
      weather = weather.replace(/天候：|\s+/g, '');
    }
    
    if (horseData.length === 0) return null;

    return horseData.map((horse, index) => [
      index + 1, // 着順
      horse,
      nameData[index],
      weather,
    ]);
  } catch (e) {
    Logger.log(`Error fetching or parsing ${resultUrl}: ${e.message}`);
    return null;
  }
}
```

### 1-3. データをスプレッドシートに書き込む

整形したデータは、`setValues()`メソッドを使ってスプレッドシートに一括で書き込みます。

```javascript
/*
シートに書き込む処理
*/
function writeSheet(sheetData) {
	const sheet = SpreadsheetApp.getActiveSheet();
	sheet.getRange(sheet.getLastRow() + 1, 1, sheetData.length, sheetData[0].length).setValues(sheetData);
}
```

この処理を2016年からの重賞およびG1レースに適用し、約9,000件のデータを収集しました。
{{< custom-figure src="img_5dfa27abaa37b.png" title="収集したレースデータの一部" Fit="1280x1280 webp q90" >}}
データ収集の過程で、一部のカタカナ人名が正しく取得できないという課題も見つかりました。これは正規表現の精度に起因するもので、今後の改善点です。

## ステップ2：スコアリングロジックの構築

次に、収集したデータを使ってスコアを算出するロジックを構築します。

### 2-1. スコアの算出方法

スコアリングの核となるのは「**着順**」です。出走頭数と着順を用いて、以下の計算式でスコアを算出します。

`スコア = 100 * (出走頭数 / 着順)`

この計算式をベースに、以下の6つの要素で馬と騎手のスコアをそれぞれ算出します。

*   **馬のスコア**
    *   特定の**競馬場**での成績
    *   特定の**コース**（芝・ダート）での成績
    *   特定の**天候**での成績
*   **騎手のスコア**
    *   特定の**競馬場**での成績
    *   特定の**コース**での成績
    *   特定の**天候**での成績

### 2-2. スコア算出のGASコード

スプレッドシート上のボタンから実行されることを想定し、特定のセル（馬名、騎手名、レース条件）の値を読み取ってスコアを計算する関数を作成しました。

```javascript
/**
 * スプレッドシートから取得した過去データに基づき、馬と騎手のスコアを算出する
 */
function scoreCalculation() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const HEADER_ROWS = 18; // データ開始行のオフセット

  // 予想対象の条件をシートから取得
  const conditions = {
    horse: sheet.getRange('F9').getValue(),
    jockey: sheet.getRange('G9').getValue(),
    place: sheet.getRange('E11').getValue(),
    course: sheet.getRange('E12').getValue(),
    weather: sheet.getRange('E13').getValue(),
  };

  const scores = {
    horseByPlace: 0,
    horseByCourse: 0,
    horseByWeather: 0,
    jockeyByPlace: 0,
    jockeyByCourse: 0,
    jockeyByWeather: 0,
  };

  const sheetData = sheet.getDataRange().getValues();

  for (let i = HEADER_ROWS; i < sheetData.length; i++) {
    const row = sheetData[i];
    // データカラムのマッピング
    const race = {
      place: row[1],
      course: row[2],
      rank: row[3],
      horse: row[4],
      jockey: row[5],
      weather: row[6],
    };

    const headCount = getHeadCount(i, sheetData);
    if (!headCount || !race.rank) continue; // データ不備の場合はスキップ

    const score = 100 * (headCount / race.rank);

    // 馬のスコアを加算
    if (race.horse.includes(conditions.horse)) {
      if (race.place.includes(conditions.place)) scores.horseByPlace += score;
      if (race.course.includes(conditions.course)) scores.horseByCourse += score;
      if (race.weather.includes(conditions.weather)) scores.horseByWeather += score;
    }

    // 騎手のスコアを加算
    if (race.jockey.includes(conditions.jockey)) {
      if (race.place.includes(conditions.place)) scores.jockeyByPlace += score;
      if (race.course.includes(conditions.course)) scores.jockeyByCourse += score;
      if (race.weather.includes(conditions.weather)) scores.jockeyByWeather += score;
    }
  }

  // 計算結果をシートに書き込み
  sheet.getRange('F11').setValue(scores.horseByPlace);
  sheet.getRange('F12').setValue(scores.horseByCourse);
  sheet.getRange('F13').setValue(scores.horseByWeather);
  sheet.getRange('G11').setValue(scores.jockeyByPlace);
  sheet.getRange('G12').setValue(scores.jockeyByCourse);
  sheet.getRange('G13').setValue(scores.jockeyByWeather);
}
```

出走頭数を取得するための補助関数も用意しました。
```javascript
/**
 * 特定のレースの出走頭数をデータから算出する
 * @param {number} rowIndex - 現在の行インデックス
 * @param {Array[]} data - シート全体のデータ
 * @returns {number} 出走頭数
 */
function getHeadCount(rowIndex, data) {
  // 同じレース（URLが同じ）のエントリをすべて探す
  const currentRaceUrl = data[rowIndex][0];
  let maxRank = 0;
  for (let i = rowIndex; i < data.length && data[i][0] === currentRaceUrl; i++) {
    if (data[i][3] > maxRank) {
      maxRank = data[i][3];
    }
  }
  for (let i = rowIndex - 1; i >= 0 && data[i][0] === currentRaceUrl; i--) {
    if (data[i][3] > maxRank) {
      maxRank = data[i][3];
    }
  }
  return maxRank;
}
```

## ステップ3：天皇賞（秋）2019を予想・検証

開発したシステムを使い、実際に行われた「天皇賞（秋）2019」の着順を予想し、その結果を検証しました。

### 3-1. 予想結果

当時のオッズ人気順は以下の通りでした。
1.  アーモンドアイ
2.  サートゥルナーリア
3.  ダノンプレミアム

一方、レース条件（東京競馬場・芝コース・曇）で算出したスコア上位3頭は以下の結果となりました。
{{< custom-figure src="img_5dfa27ac1e238.png" title="スコア算出結果" Fit="1280x1280 webp q90" >}}

1.  **アーモンドアイ**
2.  **ランフォザローゼス**
3.  **アエロリット**

1位はオッズと一致しましたが、2位、3位は異なる馬がランクインしました。

### 3-2. レース観戦と実際の結果

この予想に基づき、馬券（馬番 2-13-5）を購入して現地で観戦しました。
{{< custom-figure src="img_5dfa27ac9f3d7.jpg" title="東京競馬場での観戦" Fit="1280x1280 webp q90" >}} 
{{< custom-figure src="img_5dfa27ad3ca88.jpg" title="購入した馬券" Fit="1280x1280 webp q90" >}}

そして、実際の結果は...
{{< custom-figure src="img_5dfa27adc8e09.jpg" title="レース結果" Fit="1280x1280 webp q90" >}}
**結果：2-9-5**

あと一歩、2着の馬が違えば的中という、非常に惜しい結果に終わりました。

## まとめと今後の展望

今回の挑戦では、競馬知識ゼロの状態からデータに基づいた予想システムを構築し、実際のレースで非常に惜しい結果を得ることができました。これは、データドリブンなアプローチがある程度の有効性を持つことを示唆しています。

**今後の改善点**
*   **スクレイピングの安定化**：正規表現ではなく、DOMパーサー（Cheerioなど）を導入してHTML構造の変化に強いコードにする。
*   **スコアリングの高度化**：単なる着順だけでなく、オッズ、斤量、レース間隔など、より多様なファクターを取り入れたロジックに改良する。
*   **データソースの拡充**：JRAだけでなく、他の競馬情報サイトからもデータを収集し、分析の精度を高める。

GASとスプレッドシートを使えば、アイデア次第でこのような面白いシステムを誰でも開発できます。この記事が、あなたのプロジェクトのヒントになれば幸いです。
