window.onload=function(){
    var flag = 0;

    function popup() {
        flag = 1;
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start","flag":flag,"brk":"no"});
       });
    }
document.getElementById("btnstrt").addEventListener("click", popup);



    function popup2() {
        flag = 0;
        console.log("stop");
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "stop","flag":flag,"brk":"yes"});
       });
    }
    
      document.getElementById("btnstp").addEventListener("click", popup2);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
         msgg =request.rcd; 
        var tb =request.elem
        console.log(tb);
            for(const z of tb){
                z.addEventListener('click',gn(this));
            }
            
    }
    
  );
  function gn(l){
    console.log(this.id);
    document.getElementById(l.id).value = msgg;
  }




        
