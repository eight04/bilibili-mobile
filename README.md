bilibili-mobile
===========

![Github Build](https://github.com/eight04/bilibili-mobile/workflows/.github/workflows/build.yml/badge.svg)

An extension to improve `www.bilibili.com` on mobile browsers.

Features
--------

* Responsive design.
* Since you are viewing desktop site, you can view commnents, recommendations, and other desktop-only features.

Screenshots
-----------

![Screenshot_20240821-150530 (Medium)](https://github.com/user-attachments/assets/ebcdda6f-805f-4bd1-b8de-678369c81d7a) ![Screenshot_20240821-150611 (Medium)](https://github.com/user-attachments/assets/a3759532-bd5b-4f9f-8084-a54263d0ad45) ![Screenshot_20240821-150625 (Medium)](https://github.com/user-attachments/assets/a7342eba-40cf-4db4-b035-8795ee96e58d)

Dark theme made by [tolking](https://github.com/tolking/usercss/tree/main/bilibili-palette).

Installation
------------

Download the latest release from the [release page](https://github.com/eight04/bilibili-mobile/releases).

Currently, only kiwi supports loading extensions from ZIP files.

See also
---------

* [Bilibili - 防止视频被自动暂停及弹出登录窗口](https://greasyfork.org/zh-TW/scripts/467474-bilibili-%E9%98%B2%E6%AD%A2%E8%A7%86%E9%A2%91%E8%A2%AB%E8%87%AA%E5%8A%A8%E6%9A%82%E5%81%9C%E5%8F%8A%E5%BC%B9%E5%87%BA%E7%99%BB%E5%BD%95%E7%AA%97%E5%8F%A3)
* [Bilibili - 在未登录的情况下照常加载评论](https://greasyfork.org/zh-TW/scripts/552388-bilibili-%E5%9C%A8%E6%9C%AA%E7%99%BB%E5%BD%95%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E7%85%A7%E5%B8%B8%E5%8A%A0%E8%BD%BD%E8%AF%84%E8%AE%BA)
* [bilibili Dark Theme by y-64](https://userstyles.world/style/10951/bilibili-dark-theme)

Changelog
---------

* 0.10.4 (Jul 7, 2026)

  - Fix: video doesn't stick after URL change.
  - Add: crx build.

* 0.10.1 (Jun 10, 2026)

  - Fix: app min-width.
  - Fix: search page layout.

* 0.10.0 (Mar 27, 2026)

  - Fix: right container disappeared.
  - Fix: home page overflowed.
  - Add: build CRX.

* 0.9.0 (Dec 21, 2025)

  - Fix: activity banner.
  - Add: support search.bilibili.com.

* 0.8.0 (Nov 21, 2025)

  - Add: support space.bilibili.com.

* 0.7.0 (Nov 4, 2025)

  - Fix: scroll the entire page instead of just the app container.
  - Fix: video player is convered by replies.
  - Fix: remove app banner on home page.
  - Fix: container and comment is changed.

* 0.6.0 (Sep 3, 2024)

  - Add: header bar.
  - Fix: don't snap vertically.
  - Fix: webRequest doesn't work on Firefox.
  - Fix: missing addon ID.

* 0.5.0 (Aug 23, 2024)

  - Fix: remove large dark area during video loading.
  - Fix: scroll to top when video changes.
  - Add: sticky video player.

* 0.4.0 (Aug 22, 2024)

  - Add: support dragging in image viewer.
  - Fix: infinite loop on `space.bilibili.com`

* 0.3.0 (Aug 21, 2024)

  - Add: scroll snap.
  - Add: calculate scrollbar width.

* 0.2.0 (Aug 21, 2024)

  - Fix: 403 error when requesting videos.

* 0.1.0 (Aug 21, 2024)

  - First release.
