let container = document.querySelector(".container")
let operation1 = document.querySelector(".operation1")
let selections = document.querySelectorAll(".selections button")
let start = document.querySelector(".start")
let operation2 = document.querySelector(".operation2")
let choosen_level = document.querySelector(".choosen_level")
let choosen_secon = document.querySelector(".choosen_secon")
let choosen_word = document.querySelector(".choosen_word")
let type = document.querySelector(".type")
let all_words = document.querySelector(".all_words")
let time = document.querySelector(".times")
let times = document.querySelector(".scored")
let timee = document.querySelector(".from")
let warning = document.querySelector(".warnig")
let count = 0
the_levels = {
    easy  : ["cat","fat","sun","run","leg","fan","man","boy","gun","set","see","sad"],
    midum : ["doog","book","tree","play","ahmed","tall","shot","sand","rope","roll","pole","flag"],
    hard  : ["univarsety","dangerous","distenguish","congratolation","adequate","interval","sergary","abdellatif","october","intelegance","progress"]
}
var audio = new Audio('type.mp3');
var bb = new Audio('bb.mp3');

selections.forEach(function (e) {
    e.onclick = function ()
    {
        audio.play();
        container.setAttribute("data-level", `${this.textContent}`)
        container.setAttribute("data-time", `${this.getAttribute("data-time")}`)
        choosen_level.textContent=container.getAttribute("data-level")
        choosen_secon.textContent=container.getAttribute("data-time")
        selections.forEach((r)=> r.style.cssText = "transform : scale(1) ; background-color : #blueviolet")
        this.style.transform = "scale(1.05)"
        warning.style.cssText = "transform: translate(-50%, 00%)"
    }
})
start.onclick = _ =>
{
            audio.play();
    
    if (container.getAttribute("data-level") == "") {
        selections.forEach((r) => r.style.cssText  = "background-color: #e91e63; color : #343434; box-shadow: 0 0 7px #e91e63;")
        warning.style.cssText = "transform: translate(-50%, 100%)"
    } else {
        operation1.style.display = "none"
        operation2.style.display = "flex"
        timee.textContent = the_levels[`${container.getAttribute("data-level")}`].length
        time.textContent = container.getAttribute("data-time")
        let set = setInterval(function () {
            time.textContent = +time.textContent - 1
            if (+time.textContent == 0) {
                clearTimeout(set)
                type.style.display = "none"
                all_words.style.display = "none"
                choosen_word.textContent = "you lost"
                
                document.body.style.backgroundColor = "#343434"
                setTimeout(() => {
                    location.reload(); 
                }, 2000);
            }
        }, 1000)
        putswords()
        vvv()
        type.oninput = function ()
        {
            bb.play();
            if (this.value == choosen_word.textContent) {
                if (document.querySelectorAll(".all_words span").length > 0) {
                    times.textContent = ++count
                    vvv()
                    time.textContent = container.getAttribute("data-time")
                    this.value = ""
                } else {
                    if (this.value == choosen_word.textContent) {
                        times.textContent = ++count
                        type.style.display = "none"
                        all_words.style.display = "none"
                        choosen_word.textContent = "you won"
                        clearTimeout(set)
                        setTimeout(() => {
                            location.reload(); 
                        }, 2000);
                    }
                }
            }
        }
        time.textContent = 7
        type.focus()
    }
}
// putting words to the word container
function putswords() {
    let level = the_levels[`${container.getAttribute("data-level")}`].sort((a, b) => 0.5 - Math.random())
    for (let i = 0; i < level.length; i++)
    {
        let span = document.createElement("span")
        let txt = document.createTextNode(level[i])
        span.appendChild(txt)
        all_words.appendChild(span)
    }
    timee.textContent = level.length
}
// putting the choosen word and remove it from the words container 
function vvv() {
    let ran = Math.floor(Math.random() * document.querySelectorAll(".all_words span").length)
    choosen_word.textContent = document.querySelectorAll(".all_words span")[ran].textContent
    document.querySelectorAll(".all_words span")[ran].remove()
}