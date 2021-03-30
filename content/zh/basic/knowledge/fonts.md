---
title: 跨平台的Web中文字体解决方案
menuTitle: 中文字体
description: ''
position: 1206
category: '知识篇-基础知识'
---

Fonts.css: <http://zenozeng.github.io/fonts.css/>

## 黑体

```css
font-family: -apple-system, 'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial, 'Liberation Sans', 'PingFang SC', 'Hiragino Sans GB',
  'Source Han Sans CN', 'Source Han Sans SC', 'Microsoft YaHei', 'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti', SimHei,
  'WenQuanYi Zen Hei Sharp', sans-serif;
```

- Use apple system font (like San Francisco) by default, see also: https://github.com/zenozeng/fonts.css/issues/29
- 某些 Linux 中 Helvetica 会自动 fallback 到 Nimbus Sans L （具体见 /etc/fonts/conf.d/30-metric-aliases.conf, debian jessie/sid ）
- 某些 Linux 中 Arial 会自动 fallback 到 Liberation Sans （具体见 /etc/fonts/conf.d/30-metric-aliases.conf, debian jessie/sid ）

## 楷体

```css
font-family: Baskerville, Georgia, 'Liberation Serif', 'Kaiti SC', STKaiti, 'AR PL UKai CN', 'AR PL UKai HK', 'AR PL UKai TW', 'AR PL UKai TW MBE',
  'AR PL KaitiM GB', KaiTi, KaiTi_GB2312, DFKai-SB, 'TW\-Kai', serif;
```

## 宋体

```css
font-family: Georgia, 'Nimbus Roman No9 L', 'Songti SC', STSong, 'AR PL New Sung', 'AR PL SungtiL GB', NSimSun, SimSun, 'TW\-Sung',
  'WenQuanYi Bitmap Song', 'AR PL UMing CN', 'AR PL UMing HK', 'AR PL UMing TW', 'AR PL UMing TW MBE', PMingLiU, MingLiU, serif;
```

## 仿宋

```css
font-family: Baskerville, 'Times New Roman', 'Liberation Serif', STFangsong, FangSong, FangSong_GB2312, 'CWTEX\-F', serif;
```

- 某些 Linux 中 Times New Roman 会自动 fallback 到 Liberation Serif （具体见 /etc/fonts/conf.d/30-metric-aliases.conf, debian jessie/sid ）
- CWTEX 仿宋体是繁体字型

<adsbygoogle></adsbygoogle>
