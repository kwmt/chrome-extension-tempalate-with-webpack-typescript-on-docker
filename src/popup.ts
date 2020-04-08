document.addEventListener('DOMContentLoaded', function() {
  // ログは、chrome拡張アイコンを右クリックしてInspect PopUp後のDeveloper Toolのコンソールから確認できる。
  console.log("Popup DOM fully loaded and parsed");
  // タブ取得のサンプル
  // タブを取得するには、manifest.jsonのpermissionsにtabsの権限追加が必要
  chrome.tabs.query({},function(tabs){
    document.getElementById("tabnum").innerHTML = '現在開いているタブの数は['+tabs.length+']個です'
  });
  document.getElementById("click_event_sample").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // content_scriptへのメッセージ送信
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        // content_script.tsからのレスポンスサンプル
        console.log(response.farewell);
      });
    });
  });
});
