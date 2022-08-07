let p1 = document.querySelector('#p1')
let p2 = document.querySelector('#p2')
let button = document.querySelector('.button')

button.href = `/turn/${p1.value}/${p2.value}/`

p1.onchange = characterselect
p2.onchange = characterselect

function characterselect() {
    button.href = `/turn/${p1.value}/${p2.value}/`
}
