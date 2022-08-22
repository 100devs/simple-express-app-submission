const cardPicker = document.querySelector('#card-picker');
const cardImage = document.querySelector('#card-image')
const cardNumber = document.querySelector('#card-number')
const cardName = document.querySelector('#card-name')
const cardKeywordsUp = document.querySelector('#keywords-up')
const cardKeywordsRev = document.querySelector('#keywords-rev')
const cardDescUp = document.querySelector('#description-up')
const cardDescRev = document.querySelector('#description-rev')

const descHeaders = document.querySelectorAll('.description-header')

cardPicker.addEventListener('click', drawRandom)

Number.prototype.romanize = function () {
    // console.log(this)
    if (isNaN(this))
        return NaN;
    if (this == 0)
        return 0
    var digits = String(+this).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}


let deck = {};
newDeck();
async function newDeck() {
    const res = await fetch('api');
    deck = await res.json();
    console.log('deck', deck)
}

async function drawRandom() {
    const res = await fetch('/api/random-card');
    const data = await res.json();

    console.log('random card', data);

    descHeaders.forEach(e => e.classList.remove('hidden'))
    
    cardImage.src = data.image;
    cardNumber.innerText = Number(data.number).romanize();
    cardName.innerText = data.name;
    cardKeywordsUp.innerText = data.keywordsUp;
    cardDescUp.innerText = data.descriptionUp;
    cardKeywordsRev.innerText = data.keywordsRev;
    cardDescRev.innerText = data.descriptionRev;
}

