const modEditSection = document.querySelector('#mods')
const addMod = document.querySelector('#addModButton')

addMod.addEventListener('click', _ => {
    let forms = modEditSection.getElementsByClassName('addMod')
    let firstForm = forms[0]
    let formClone = firstForm.cloneNode(true)
    modEditSection.appendChild(formClone)
})

const submitMod = document.getElementById('submitModBtn')

submitMod.addEventListener('click', (event) => {
    // Stops the default submit action and allows us to perform our own aciton
    event.preventDefault()

    const submitModData = Array.prototype.slice.call(document.getElementsByClassName('submitMod'))

    let mpName = '',
        mpURL = '',
        mpVer = '',
        mcVer = '',
        mpDate = '',
        mpIcon = '';

    let mods = []

    submitModData.forEach((e) => {
        let FD = new FormData(e)
        if (FD.get('mp_name') !== null) { // Modpack form
            mpName = FD.get('mp_name')
            mpAuthor = FD.get('mp_author')
            mpURL = FD.get('mp_link')
            mpVer = FD.get('mp_version')
            mcVer = FD.get('mc_version')
            mpDate = FD.get('mp_date')
            mpIcon = FD.get('mp_icon')
        } else { // Mod form
            let temp = {
                modName: '',
                modAuthor: '',
                modURL: ''
            }

            temp.modName = FD.get('mod_name')
            temp.modAuthor = FD.get('mod_author')
            temp.modURL = FD.get('mod_link')

            mods.push(temp)
        }
    })

    // Creates the JSON data from FD
    let data = {
        name: mpName,
        author: mpAuthor,
        url: mpURL,
        mpVer: mpVer,
        mcVer: mcVer,
        mpDate: mpDate,
        mpIcon: mpIcon,
        mods: mods
    }

    fetch('/editor', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + document.cookie, // Get cookie token
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
        })
})

let mpLink = document.querySelector('#mp_link')
let mpLinkWarning = document.querySelector('#mp_LinkWarning')

mpLink.addEventListener('change', () => {
    if(!validateURL(mpLink.value)){
        mpLinkWarning.classList.remove('hidden')
    }else{
        mpLinkWarning.classList.add('hidden')
    }
})

function validateURL(str){
    return /^https:\/\/www\.[a-z0-9-]+\.[a-z]+(\/[a-zA-Z0-9#_-]+\/?)*$/gm.test(str)
}