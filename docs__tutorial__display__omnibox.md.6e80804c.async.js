(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[44],{vT9I:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),r=n.n(a),i=(n("B2uJ"),n("+su7"),n("qOys")),o=n.n(i);n("5Yjd");t["default"]=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"markdown"},r.a.createElement("h1",{id:"omnibox"},r.a.createElement("a",{"aria-hidden":"true",href:"#omnibox"},r.a.createElement("span",{className:"icon icon-link"})),"omnibox"),r.a.createElement("p",null,r.a.createElement("code",null,"omnibox"),"\u662f\u5411\u7528\u6237\u63d0\u4f9b\u641c\u7d22\u5efa\u8bae\u7684\u4e00\u79cd\u65b9\u5f0f\u3002\u5148\u6765\u770b\u4e2a",r.a.createElement("code",null,"gif"),"\u56fe\u4ee5\u4fbf\u4e86\u89e3\u4e00\u4e0b\u8fd9\u4e1c\u897f\u5230\u5e95\u662f\u4e2a\u4ec0\u4e48\u9b3c\uff1a"),r.a.createElement("p",null,r.a.createElement("img",{src:"http://image.liuxianan.com/201706/20170621_155455_980_5359.gif"})),r.a.createElement("p",null,"\u6ce8\u518c\u67d0\u4e2a\u5173\u952e\u5b57\u4ee5\u89e6\u53d1\u63d2\u4ef6\u81ea\u5df1\u7684\u641c\u7d22\u5efa\u8bae\u754c\u9762\uff0c\u7136\u540e\u53ef\u4ee5\u4efb\u610f\u53d1\u6325\u4e86\u3002"),r.a.createElement("p",null,"\u9996\u5148\uff0c\u914d\u7f6e\u6587\u4ef6\u5982\u4e0b\uff1a"),r.a.createElement(o.a,{code:'{\n  "omnibox": { "keyword": "go" }\n}\n',lang:"json"}),r.a.createElement("p",null,"\u7136\u540e",r.a.createElement("code",null,"background.js"),"\u4e2d\u6ce8\u518c\u76d1\u542c\u4e8b\u4ef6\uff1a"),r.a.createElement(o.a,{code:"chrome.omnibox.onInputChanged.addListener((text, suggest) => {\n  console.log('inputChanged: ' + text);\n  if (!text) return;\n  if (text == '\u7f8e\u5973') {\n    suggest([\n      { content: '\u4e2d\u56fd' + text, description: '\u4f60\u8981\u627e\u201c\u4e2d\u56fd\u7f8e\u5973\u201d\u5417\uff1f' },\n      { content: '\u65e5\u672c' + text, description: '\u4f60\u8981\u627e\u201c\u65e5\u672c\u7f8e\u5973\u201d\u5417\uff1f' },\n      { content: '\u6cf0\u56fd' + text, description: '\u4f60\u8981\u627e\u201c\u6cf0\u56fd\u7f8e\u5973\u6216\u4eba\u5996\u201d\u5417\uff1f' },\n      { content: '\u97e9\u56fd' + text, description: '\u4f60\u8981\u627e\u201c\u97e9\u56fd\u7f8e\u5973\u201d\u5417\uff1f' },\n    ]);\n  } else if (text == '\u5fae\u535a') {\n    suggest([\n      { content: '\u65b0\u6d6a' + text, description: '\u65b0\u6d6a' + text },\n      { content: '\u817e\u8baf' + text, description: '\u817e\u8baf' + text },\n      { content: '\u641c\u72d0' + text, description: '\u641c\u7d22' + text },\n    ]);\n  } else {\n    suggest([\n      { content: '\u767e\u5ea6\u641c\u7d22 ' + text, description: '\u767e\u5ea6\u641c\u7d22 ' + text },\n      { content: '\u8c37\u6b4c\u641c\u7d22 ' + text, description: '\u8c37\u6b4c\u641c\u7d22 ' + text },\n    ]);\n  }\n});\n\nchrome.omnibox.onInputEntered.addListener((text) => {\n  console.log('inputEntered: ' + text);\n  if (!text) return;\n  var href = '';\n  if (text.endsWith('\u7f8e\u5973'))\n    href =\n      '[http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=](http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=)' +\n      text;\n  else if (text.startsWith('\u767e\u5ea6\u641c\u7d22'))\n    href =\n      '[https://www.baidu.com/s?ie=UTF-8&wd=](https://www.baidu.com/s?ie=UTF-8&wd=)' +\n      text.replace('\u767e\u5ea6\u641c\u7d22 ', '');\n  else if (text.startsWith('\u8c37\u6b4c\u641c\u7d22'))\n    href =\n      '[https://www.google.com.tw/search?q=](https://www.google.com.tw/search?q=)' +\n      text.replace('\u8c37\u6b4c\u641c\u7d22 ', '');\n  else\n    href =\n      '[https://www.baidu.com/s?ie=UTF-8&wd=](https://www.baidu.com/s?ie=UTF-8&wd=)' +\n      text;\n  openUrlCurrentTab(href);\n});\nfunction getCurrentTabId(callback) {\n  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {\n    if (callback) callback(tabs.length ? tabs[0].id : null);\n  });\n}\n\nfunction openUrlCurrentTab(url) {\n  getCurrentTabId((tabId) => {\n    chrome.tabs.update(tabId, { url: url });\n  });\n}\n",lang:"js"})))}}}]);