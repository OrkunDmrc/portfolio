const blocks = [
    {
        id: "mailBlock",
        element: document.getElementById("mailBlock"),
        isOn: false,
        accordionDetails: []
    },
    {
        id: "projectBlock",
        element: document.getElementById("projectBlock"),
        isOn: false,
        accordionDetails: [
            {
                id: "2023AccordionDetails",
                element: document.getElementById("2023AccordionDetails")
            },
            {
                id: "2022AccordionDetails",
                element: document.getElementById("2022AccordionDetails")
            }
        ]
    },
    {
        id: "skillBlock",
        element: document.getElementById("skillBlock"),
        isOn: false,
        accordionDetails: [
            {
                id: "languageAccordionDetails",
                element: document.getElementById("languageAccordionDetails")
            },
            {
                id: "IT-SkillsAccordionDetails",
                element: document.getElementById("IT-SkillsAccordionDetails")
            }
        ]
    },
    {
        id: "experienceBlock",
        element: document.getElementById("experienceBlock"),
        isOn: false,
        accordionDetails: [
            {
                id: "yazAccordionDetails",
                element: document.getElementById("yazAccordionDetails")
            },
            {
                id: "akalAccordionDetails",
                element: document.getElementById("akalAccordionDetails")
            },
            {
                id: "vinyaAccordionDetails",
                element: document.getElementById("vinyaAccordionDetails")
            },
            {
                id: "tskAccordionDetails",
                element: document.getElementById("tskAccordionDetails")
            },
        ]
    }
]
const data = document.querySelector("body");
const jup = document.getElementById("jup");
const mars = document.getElementById("mars");
const neptun = document.getElementById("neptun");
const from = document.getElementById("from");
const subject = document.getElementById("subject");
const mailMessage = document.getElementById("mailMessage");
const isBrowserFit = (function (agent) {        
    switch (true) {
        case agent.indexOf("edge") > -1: return true;
        case agent.indexOf("edg/") > -1: return true;
        case agent.indexOf("opr") > -1 && !!window.opr: return true;
        case agent.indexOf("chrome") > -1 && !!window.chrome: return false;
        case agent.indexOf("trident") > -1: return true;
        case agent.indexOf("firefox") > -1: return true;
        case agent.indexOf("safari") > -1: return true;
        default: return false;
    }
})(window.navigator.userAgent.toLowerCase());
const isMobile = function(){
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}
if(!isMobile()){
    (function() {
        var mousePos;
        document.onmousemove = handleMouseMove;
        setInterval(getMousePosition, 10);
        function handleMouseMove(event) {
            var dot, eventDoc, doc, body, pageX, pageY;
            event = event || window.event;
            if (event.pageX == null && event.clientX != null) {
                eventDoc = (event.target && event.target.ownerDocument) || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;

                event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY +
                (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                (doc && doc.clientTop  || body && body.clientTop  || 0 );
            }
            mousePos = {
                x: event.pageX,
                y: event.pageY
            };
        }
        function getMousePosition() {
            const pos = mousePos;
            if (!pos) {
                // We haven't seen any movement yet
            }
            else {
                if(isBrowserFit === true){
                    data.style.backgroundPositionX = -pos.x / 40 + "px";
                    data.style.backgroundPositionY = -pos.y / 40 + "px";
                }
                jup.style.transform = "rotate(3deg) translate( "+ -pos.x / 50 + "px," + pos.y / 50  + "px)";
                mars.style.transform = "rotate(-3deg) translate( "+ pos.x / 50 + "px," + -pos.y / 50  + "px)";
                neptun.style.transform = "rotate(-5deg) translate( "+ -pos.x / 50 + "px," + -pos.y / 50  + "px)";
            }
        }
    })();
}

function sendMail(){
    if(from.validity.typeMismatch){
        from.setCustomValidity('Please enter correct email');
    }else{
        const myMail = "orkundemircit147@gmail.com";
        document.location = `mailto:${myMail}?subject=${subject.value}&body=${mailMessage.value}`
    }
}

let sentences = {
    grertings: ["Hello... ", "Hi... :) "], 
    infos: ["My name is Orkun ", "I live in Istanbul, from Turkey ", "I am a software developer ", 
    "You can contact me with links that bottom of the page ",  "Wellcome to my page. ",
    "I'm currently learning React. ",
    "Ask me about .net Core, MSSQL, HTML, CSS, Javascript, Flutter, Kotlin. "]
}
var currentLeterIndex = 0;
var wordLength = 0;
var randomGreeting = 0;
var randomInfo = 0;
var selectedSentence = "";
const writeSentence = () => {
    if(wordLength === 0){
        randomGreeting = getRandomInt(sentences.grertings.length);
        randomInfo = getRandomInt(sentences.infos.length);
        selectedSentence = sentences.grertings[randomGreeting] + sentences.infos[randomInfo];
        wordLength = selectedSentence.length;
        clearInterval(timer);
        timer = setInterval(writeSentence, 100);
    }else{
        sentence.textContent = selectedSentence.substring(0,currentLeterIndex) + "_";
        currentLeterIndex++;
        if(currentLeterIndex === wordLength){
            wordLength = 0;
            currentLeterIndex = 0;
            clearInterval(timer);
            timer = setInterval(writeSentence, 1000);
        }
    }
}
const getRandomInt = (max) =>  Math.floor(Math.random() * max);
var timer = setInterval(writeSentence, 100);

const setBlocks = (enableBlockIds) => {
    blocks.forEach((block) => {enableBlockIds.includes(block.id) ? enableBlock(block) : disableBlock(block);});
}
const enableBlock = (block) => block.element.style.display = "block";
const disableBlock = (block) => block.element.style.display = "none";

function setAccordion(blockId, accordionDetailId){
    blocks.find((block) => block.id === blockId).accordionDetails.forEach((accDet) => {
        accDet.element.style.display = accDet.id === accordionDetailId 
        ? 
        accDet.element.style.display === "block" ? "none" : "block"
        : 
        "none";
    });
}
function setBlockStateEntered(id){
    blocks.find((block) => block.id === id).isOn = true;
}
function setBlockStateLeaved(id){
    blocks.find((block) => block.id === id).isOn = false;
}
var isOnFooter = false;
const setOnFooter = (value = false) => isOnFooter = value;
function bodyClick(){
    if(!blocks.some((block) => block.isOn) && !isOnFooter){
        blocks.forEach((block) => {disableBlock(block);});
    }
}