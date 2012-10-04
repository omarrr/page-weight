// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function validateLinks(links, callback) {
  var results = [];
  var pendingRequests = 0;

  function fetchLink(link) {
    if (!/^http(s?):\/\//.test(link.href))
      return;
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", link.href, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState < xhr.HEADERS_RECEIVED || xhr.processed)
        return;
      if (!xhr.status || xhr.status >= 400) {
        results.push({
            href: link.href,
            text: link.text,
            status: xhr.statusText
        });
      }
      xhr.processed = true;
      xhr.abort();
      if (!--pendingRequests) {
        callback({ total: links.length, badlinks: results });
      }
    };
    try {
      xhr.send(null);
      pendingRequests++;
    } catch (e) {
      console.error("XHR failed for " + link.href + ", " + e);
    }
  }

  for (var i = 0; i < links.length; ++i)
    fetchLink(links[i]);
}

chrome.extension.onMessage.addListener(function(request, sender, callback) {

  alert("on onMessage");
  console.log("ON MESSAGE");

    var response = {};
    callback(response); // snub them.
  //callback(getLinks());

/*
  var tabId = request.tabId;
  chrome.tabs.executeScript(tabId, { file: "content.js" }, function() {
    chrome.tabs.sendResponse(tabId, {}, function(results) {
      validateLinks(results, callback);
    });
  });
*/
});

//-----
// AUX
console.log("BGGGGGGGGGGG");

chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
      console.log("on devtools");
      /*
      if (request.response.bodySize > 40*1024)
        chrome.experimental.devtools.console.addMessage(
            chrome.experimental.devtools.console.Severity.Warning,
            "Large image: " + request.request.url);
      */
    }
);
chrome.experimental.webRequest.onResponseStarted.addListener(
  function(details) {
    console.log("on webRequest");
    for (var i = 0; i < details.responseHeaders.length; ++i) {
      if (details.responseHeaders[i].name === 'Content-Length') {
        console.log(details.url + ': ' + details.responseHeaders[i].value +
                    'bytes');
      }
    }
  },
  {},
  ["responseHeaders"]);