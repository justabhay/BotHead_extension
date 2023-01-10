
//emails extracting

const btnExt=document.getElementById("scrapEmails");
const scrapeEmails=document.getElementById('scrapEmails');
let list=document.getElementById("emailList");

//function to copy to clipboard
function copyTC(){
    
    navigator.permissions.query({name: "clipboard-write"}).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(list.innerText);
        }
      });

    
}
const btnCopy=document.getElementById("btnCopy");
btnCopy.addEventListener("click",()=>{
    copyTC();
})

//functioning
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{

    emails=request.emails;

    if(emails == null || emails.length ==0){

        let li= document.createElement('li');
        li.innerText="No Emails Found";
        list.appendChild(li);
    }
    else{
        emails.forEach((email)=>{
            let li=document.createElement('li');
            li.innerText=email;
            list.appendChild(li);
        });
    }
});

btnExt.addEventListener("click",async()=>{
    let [tab]=await chrome.tabs.query(
        {active:true,
            currentWindow:true
        });

        function scrapeEmailsFromPage(){
            const emailRegEx = /[\w\.=-]+@[\w\w.-]+\.[\w]{2,4}/gim;
    
            let emails = document.body.innerHTML.match(emailRegEx);
            chrome.runtime.sendMessage({emails});
            
        }

        chrome.scripting.executeScript({
            target:{tabId:tab.id},
            func:scrapeEmailsFromPage,
        });   
})

btnExt.addEventListener("click",async()=>{
    let [tab]=await chrome.tabs.query({
        active:true,
        currentWindow:true
    });
    
    function run(){
   
    }

    chrome.scripting.executeScript({
        target:{tabId:tab.id},
        func:run,
    });

});

















//youtube buttons
const btnRecomend=document.getElementById("btnRecomend");


btnRecomend.addEventListener("click",async()=>{
    let [tab]= await chrome.tabs.query({
        active:true,
        currentWindow:true
    });
    
    function removeRecomend(){
         const recomR=document.getElementById("secondary");
         const recomL=document.getElementById("items");
        
         recomL.remove();
         recomR.remove();
    }

    chrome.scripting.executeScript({
        target:{tabId:tab.id},
        func:removeRecomend,
    });
});

const btnComment=document.getElementById("btnComment");
btnComment.addEventListener("click",async()=>{
    let [tab]= await chrome.tabs.query({
        active:true,
        currentWindow:true
    });
    
    function removeRecomend(){
         const comment=document.getElementById("comments");

         comment.remove();
         
    }

    chrome.scripting.executeScript({
        target:{tabId:tab.id},
        func:removeRecomend,
    });
});










//Stay Hydrate

//support  functions







//






//







//theme conversion
const btnInvertTheme=document.getElementById("btnInvertTheme");
let i=0;
btnInvertTheme.addEventListener("click",async()=>{
    let [tab]= await chrome.tabs.query({
        active:true,
        currentWindow:true
    });

    function changeLight(){
        document.querySelector("html").style.filter="invert(1) hue-rotate(180deg)";

        let media=document.querySelectorAll("img,picture,video");

        media.forEach((mediaItem)=>{
            mediaItem.style.filter="invert(1) hue-rotate(180deg)";
        })();
    }

    function changeLtD(){
        document.querySelector("html").style.filter="invert(0) hue-rotate(0deg)";

        let media=document.querySelectorAll("img,picture,video");

        media.forEach((mediaItem)=>{
            mediaItem.style.filter="invert(0) hue-rotate(0deg)";
        })();
    }
    
    if(i==0){
        chrome.scripting.executeScript({
            target:{
                tabId:tab.id
            },
            func:changeLight
        });
        i=1;
    }
    else{
        chrome.scripting.executeScript({
            target:{
                tabId:tab.id
            },
            func:changeLtD
        });
        i=0;
    }
    
    
});
















//Font Size Changer
const increase=document.getElementsByClassName("increase");
const decrease=document.getElementById("decrease");

increase.addEventListener("click",async()=>{
    let [tab]=await chrome.tabs.query(
        {active:true,
            currentWindow:true
        });
    function increaseFn(){
        body.style.fontSize="10px"
    }
    chrome.scripting.executeScript({
            target:{tabId:tab.id},
            func:increaseFn,
        });    
});

decrease.addEventListener("click",async()=>{
    let [tab]=await chrome.tabs.query(
        {active:true,
            currentWindow:true
        });

    function decreaseFn(){

    }

    chrome.scripting.executeScript({
            target:{tabId:tab.id},
            func:decreaseFn,
        }); 
});
