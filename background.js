console.log("in background script")



let defaultDuration = .2;

chrome.alarms.onAlarm.addListener(function (alarm) {
  console.log(alarm)
  chrome.notifications.create("my notification", {
    type: "basic",
    iconUrl: "./icons/32.png",
    title: "Take a Break",
    "message": "Time To Take a break"
  }, function (notificationID) {
    console.log("displayed the notification")
  })
});

function createAlarm() {
  chrome.alarms.create("Take a Break", { periodInMinutes: defaultDuration });
}



const add=document.getElementById("add");
add.addEventListener("click",()=>{
    createAlarm();
})
 

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log("Event recieved in background page");
    defaultDuration = request.minutes * 1.0;
    createAlarm()
    sendResponse({ success: true });
  });

// omnibox

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  console.log(text);
  suggest([
    { content: "First content", description: "First desc" },
    { content: "Second Content", description: "Second Desc" }
  ])
})

chrome.omnibox.setDefaultSuggestion({description: "Default suggestion here"})

chrome.storage.sync.set({Name: "Stuart"}, function(){
  // when set runs
  console.log("value is set");

  chrome.storage.sync.get(['Name'], function(result){
    console.log(result)
  })
})

chrome.contextMenus.create({
  "id" : "Some id",
  "title" : "My Context Menu",
  "contexts": ["page"]
})

chrome.contextMenus.onClicked.addListener(function(clickData,tab){
  console.log(clickData)
  console.log(tab)
})