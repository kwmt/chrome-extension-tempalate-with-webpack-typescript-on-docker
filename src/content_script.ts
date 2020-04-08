
window.addEventListener('load', function() {
    // 対象のタブのコンソールログに出力される
    console.log("コンテントスクリプトだよ");
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        // chrome extension(popup.tsに送り返す例)
        if (request.greeting == "hello") {
            sendResponse({farewell: "goodbye"});
        }
    });
})