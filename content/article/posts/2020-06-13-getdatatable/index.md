---
title: GASでスプレッドシートのグラフデータを効率的に取得する方法
author: arukayies
date: 2020-06-13T14:27:36+00:00
excerpt: GASでスプレッドシートのグラフのデータ範囲を取得する方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1592058456
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
tags:
  - "GAS"
tags:
  - GAS
  - getDataTable()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）の`getDataTable()`メソッドって、スプレッドシートのデータを簡単に扱えるとっても便利な機能なんだよね。このメソッドを活用すると、データ分析やグラフ作成が劇的に簡単になるばい。今回は、この`getDataTable()`を基本から応用まで、わかりやすく解説していくけんね！


## まずは基本から！getDataTable()の使い方

### getDataTable()メソッドの基本

`getDataTable()`は、スプレッドシートの特定の範囲からデータを取得し、構造化された形式で返してくれるメソッドなんだ。これにより、データをグラフやチャートに簡単に変換できるけんね。

例えば、次のように使うんだ。

<pre class="wp-block-code"><code>const range = ss.getSheetByName("サンプルA").getRange("E2:F4");
const dataTable = range.getDataTable();
</code></pre>

このコードでは、「サンプルA」というシートから、E2:F4の範囲を取得して、それを`getDataTable()`で構造化されたデータに変換しているんだよ。

### ヘッダー行を使いたい時

もし、最初の行をヘッダーとして認識させたい場合は、`getDataTable(true)`を使うことで、Charts APIが自動的に軸ラベルを設定してくれるんだ。

<pre class="wp-block-code"><code>const dataTable = range.getDataTable(true);  // ヘッダー行を認識
</code></pre>

これで、さらに便利に使えるようになるばい。

## getDataTable()の内部構造

### カラムのタイプを指定

`getDataTable()`で取得したデータのカラムに、明示的にデータタイプを指定することもできるんだ。例えば、日付型と数値型を組み合わせてデータを処理する場合、こんな感じになるよ。

<pre class="wp-block-code"><code>const dataTable = Charts.newDataTable()
    .addColumn(Charts.ColumnType.DATE, '日付')
    .addColumn(Charts.ColumnType.NUMBER, '売上高')
    .addRow(&#91;new Date(2023, 0, 15), 150000])
    .build();
</code></pre>

このように、カラムのデータ型をしっかり指定することで、データがより整理されて、後の作業が楽になるけんね。

### メタデータの活用

`DataTable`には、データそのものだけでなく、メタデータ（データの情報）も含まれているんだ。例えば、列数を取得したり、カラムのラベルを調べたりすることができるばい。

<pre class="wp-block-code"><code>const numberOfColumns = dataTable.getNumberOfColumns();
const columnLabel = dataTable.getColumnLabel(0);
</code></pre>

これで、データの構造をしっかり把握できるけん、さらに活用の幅が広がるんだよ。

## グラフ作成との連携

### 動的にグラフを作ろう

`getDataTable()`を使えば、動的にグラフを作るのも簡単になるばい。例えば、円グラフと棒グラフを組み合わせたグラフを作る時は、こんな感じでコードを組めるんだ。

<pre class="wp-block-code"><code>const chart = Charts.newComboChart()
    .setDataTable(dataTable)
    .setTitle('売上分析')
    .setSeriesType(Charts.ChartType.COLUMN)
    .setSecondAxisSeriesType(Charts.ChartType.LINE)
    .setDimensions(800, 600)
    .build();
</code></pre>

これで、売上分析のグラフを簡単に作れるけんね。グラフの種類や見た目も細かくカスタマイズできるんだよ。

### グラフのスタイルを設定

グラフのデザインやスタイルも細かく設定できるんだ。例えば、色や線の太さを変更したり、データラベルを表示したりできるよ。

<pre class="wp-block-code"><code>.setOption('series', {
    0: { color: '#FF6D00', lineWidth: 3 },
    1: { dataLabel: 'value', annotations: { textStyle: {color: '#2962FF'} } }
})
</code></pre>

これで、自分の好みに合わせたグラフが作れるんだ。

## 大規模データの処理

### メモリ最適化のポイント

`getDataTable()`を使って、大量のデータを処理する場合、メモリの使い方に気をつけなきゃならんばい。例えば、10万行超のデータを扱う時は、バッチ処理やJSONシリアライズを活用することで、パフォーマンスを最適化できるんだ。

<pre class="wp-block-code"><code>const batchSize = 5000;
for (let i = 0; i &lt; totalRows; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    // 処理を行う
}
</code></pre>

これで、大きなデータセットでも効率よく処理できるようになるけんね。

## 結論

`getDataTable()`メソッドを使いこなせば、Google Apps Scriptを使ったデータ分析やグラフ作成が格段に楽になるばい！データを構造化して、チャートを動的に作り、さらに大規模データの処理も問題なくこなせるようになるけん、ぜひ試してみてほしいんだ。最初はちょっと難しいかもしれんけど、コツをつかめば、あっという間に便利なツールになるけんね！


{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}
{{< blog-card "https://qiita.com/cpp0302/items/b6767e32cb05fb804763" >}}
{{< blog-card "https://engineering.mobalab.net/2024/12/11/google-apps-script-gas%E3%81%A7%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%E3%82%92get%E3%81%99%E3%82%8B/" >}}

これで、GASを使ったデータ処理がさらに楽しくなること間違いなしやけん、ガンガン活用していこうね！
