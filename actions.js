const tabs = document.querySelectorAll('[data-tab-value]')
const tabInfos = document.querySelectorAll('[data-tab-info]')

// function to cycle through tabs
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document
            .querySelector(tab.dataset.tabValue);

        tabInfos.forEach(tabInfo => {
            tabInfo.classList.remove('active')
        })
        target.classList.add('active');
    })
})

// function to check in equipment

const checkIn = document.querySelector('#checkInButton').addEventListener('click', checkUpdate)

// checkIn.addEventListener('click', _ => {
//     fetch('/update', {
//         method: 'put',
//         headers: { 'Content-Type' : 'application/json' },
//         body: JSON.stringify (data)

//     })
// })

function checkUpdate() {
    const data = {
        CalSticker : `${document.querySelector('#checkInCalStick').value}`,
        Loc : 'HomeBase',
        Date : document.querySelector('#checkInDate').value
    }
    console.log(data)
}