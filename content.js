var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var grammar = '#JSGF V1.0';
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var brk = null;
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.onspeechend = async function(){
    recognition.stop();
    return true;
} ;
recognition.onerror = function(event){
    alert('error occurred '+event.error);
}; 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var msgg =request.message; 
        let tb = request.activeTab;
        brk = request.brk;
        if(  msgg === "start" && request.flag ==1 && brk==="no"){
            alert("Kotha is activated")
            let a = document.querySelectorAll("input[type=text]");
            let b = document.querySelectorAll("input[type=password]");
            let c = document.querySelectorAll("input[type=search]");
            let d = document.querySelectorAll("input[type=email]");
            let e = document.querySelectorAll("input[type=url]");
            let f = document.querySelectorAll("input[type=number]");
            let x = [...a,...b,...c,...d,...e,...f];
            console.log(x);
            for(let z of x){
                z.addEventListener("click", async function(){
                    if(brk === "no"){
                        z.value = '';
                        recognition.start();
                        recognition.onresult = function(event){
                            let txt = event.results[0][0].transcript;
                            z.value = txt;
                                
                        }
                    }
                })
            }
            
        }
        else if (msgg === "stop" && request.flag ==0 &&  brk==="yes" ){
            alert("Kotha is Deactivated");
        }
        else {
            alert("some error occurred");
        }
    }
);