---
title: Nuxt.js + Amplify SSGデプロイのポイント（自サイトSSG化）
id: mysite-staticization
image: /works/mysite.png
description: ようやっとNuxt.js + Amplify Console でSSGのサイトを不自由なくデプロイする方法に行き着くことができたので、そのまとめ
url: /works/mysite-staticization/
date: 2020-11-19 00:00:00
---

***

<img src="/works/mysite.png" width="100%">

***

<br>

## 3行で言うと

***

<br>

- **Nuxt.js** で[このサイトを作り直した](/works/mysite)時は結局 **SPA** にしたけど、**SSG** で **Amplify** でもよろしくデプロイする方法がわかったので、 **SSG** に移行した
- 当然のことながら、動的ルーティングされる各ページにも **index.html** ができないと、基本的には静的サイトとしてはうまいこと動かない
- **OGP** も下層ページごとに設定できて、ようやくブログらしい（人にも提案できる）体裁になった

<br>

## 経緯

***

<br>

### **OGP** 対応、やっぱりしたい

- **SPA** は **SPA** のメリットあるので、そのまま下層ページの **OGP** 対応できないかな？ => 文字通り **SPA** なので、基本的に無理
- **Lambda@Edge** を使えば **SSR** にしなくても対応できるらしく、その原理もなんとなくわかったが、高いらしいし、めんどくさそう...
- **SPA** のまま動的ルーティングの **index.html** までgenerateする方法を模索してたときに、「これができなかったの、そもそも [**SSG** 上手く動かなかったの](/works/mysite)の元凶じゃね？」と気づく
- もう一回 **SSG** でデプロイするの頑張ってみることに

<br>

## 構成

***

<br>

<img src="/works/mysite_architecture.png" width="100%">

### 解説

- 基本的に[この時](/works/mysite)から使用技術とアーキテクチャ的な変化はなし

<br>

## 本題: **Nuxt.js** の動的ルーティングを含む **SSG** サイトを **Amplify Console** からデプロイするには

***

<br>

### ビルドの設定

- 下記の通りで、ここも[この時](/works/mysite)と変化なし
- `npm run generate` の実行をここで追記するおかげで、後述の動的ルーティングのページも生成される

<br>

**amplify.yml**

```
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
        - npm run generate
  artifacts:
    # IMPORTANT - Please verify your build output directory
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

<br>

### 書き換えて、リダイレクト

- ここは、 [**SPA** の場合](/works/mysite)と異なり、デフォルトから特に触る必要なし

```
[
  {
      "source": "/<*>",
      "target": "/index.html",
      "status": "404-200",
      "condition": null
  }
]
```

<br>

### generate時のルーティングを追加

- ここがこの記事のミソ
- 今回は **nuxt/contents** を使ってデータソースとして **Markdown** を使った例だけど、適当に書いた **JSON** なりなんなりでも良いと思う
- デフォルト状態では存在しない `generate` オプションを下記の通り追記する(追記位置は `modules` オプションの後なら問題ないと思う)

**nuxt.config.ts**

```
~略~

  generate: {
    routes () {
      const { $content } = require('@nuxt/content')
      return $content.database.items._data.map((data: any) => data.path === '/index' ? '/' : data.path)
    }
  },

~略~
```

- [公式](https://content.nuxtjs.org/)では[こんな風](https://content.nuxtjs.org/ja/advanced/#%E9%9D%99%E7%9A%84%E3%82%B5%E3%82%A4%E3%83%88%E7%94%9F%E6%88%90)に書いているが、そのまんまだと上手く動かなかったけど理由まで深掘りしてない
- 公式をそのまんまTSにしたコードだと、どうもちゃんと非同期でデータを取ってくるの待ってくれてない感じなので、誰かかっちょいい書き方教えてください

<br>

## まとめ

***

<br>

- 動的ページの **OGP** 対応できた！幸せ！
- **OGP** 対応できたし、本格的にサーバーレスで **CMS** の類の代替ができる気がしてきた
- **Nuxt.js** 側の、特に **nuxt/content** 周りについてはまた別で深い話になるので、とりあえず[このサイトのソースコード](https://github.com/matsuihidetoshi/mysite-static)を参考にしてほしい
