// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var category = chrome.experimental.devtools.audits.addCategory("Broken links", 100);

var auditResults;

//category.onAuditStarted.addListener(function callback(auditResults) {
category.onAuditStarted.addListener(function callback(audit_Results) {
  auditResults = audit_Results;

  alert("pre sendMessage: ");
  console.log("pre sendMessage");

//  chrome.extension.sendMessage({
//    method: "getWeight",
//    tabId: webInspector.inspectedWindow.tabId },
  chrome.extension.sendMessage({ tabId: "" },
      renderResults
  );

  //auditResults.done();
});



  function renderResults(results) {

        alert("post sendMessage");
        console.log("post sendMessage");

//auditResults.done();

        var details = auditResults.createResult("Details...");
        var styles = details.addChild("2 styles with small font");
        var elements = details.addChild("3 elements with small font");

        auditResults.addResult("Font Size (5)",
                          "5 elements use font size below 10pt",
                          auditResults.Severity.Severe,
                          details);
        auditResults.addResult("Contrast",
                          "Text should stand out from background",
                          auditResults.Severity.Info);
        /*
        if (!results.badlinks.length) {
          auditResults.addResult("No broken links",
                                 "There are no broken links on the page!",
                                 auditResults.Severity.Info);
        }
        else {
          var details = auditResults.createResult(results.badlinks.length +
              " links out of " + results.total + " are broken");
          for (var i = 0; i < results.badlinks.length; ++i) {
            details.addChild(auditResults.createURL(results.badlinks[i].href,
                                                    results.badlinks[i].text));
          }
          auditResults.addResult("Broken links found (" +
                                     results.badlinks.length +
                                     ")", "",
                                 auditResults.Severity.Severe,
                                 details);
        }
        auditResults.done();
        */
        auditResults.done();
      }