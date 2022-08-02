let logoutEJS = document.querySelector('#logoutEJS')
let loginEJS = document.querySelector('#loginEJS')
let dropbtn = document.querySelector('.dropbtn')
//check if there is a cookie
//if there is, make fetch with cookie in body

let data = { 'cookie': document.cookie }

if (document.cookie) {
    fetch('/info', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((res) => {
            dropbtn.innerHTML = res.user.name
        })
}else{
    logoutEJS.classList.add('hidden')
    loginEJS.classList.remove('hidden')
}

logoutEJS.addEventListener('click', () => {
    if(!document.cookie){
        alert('not logged in')
        return
    }
    let cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++){   
        let spcook =  cookies[i].split("=");
        deleteCookie(spcook[0]);
        dropbtn.innerHTML = 'USER'
        logoutEJS.classList.add('hidden')
        loginEJS.classList.remove('hidden')
    }

    function deleteCookie(cookiename){
        let d = new Date();
        d.setDate(d.getDate() - 1);
        let expires = ";expires="+d;
        let name=cookiename;
        //alert(name);
        let value="";
        document.cookie = name + "=" + value + expires + "; path=/";                    
    }
    console.log('logged out')
    //TODO: REFRESH PAGE ON LOGOUT
    //location.reload();
    //window.location = ""; // TO REFRESH THE PAGE
})  

function findMod(id){
    id = id.split('-')[1]
    let expandeds = document.getElementsByClassName('expanded')
    for(let i = 0; i < expandeds.length ;i++){
        expandeds[i].classList.add('hidden')
    }
    document.getElementById(`expanded-${id}`).classList.remove('hidden')
    document.getElementById(`expanded-${id}`).scrollIntoView({behavior: "smooth",block: "center"})

}

function closeModPack(mp_id){
    mp_id = mp_id.split('-')[1]
    document.getElementById(`expanded-${mp_id}`).classList.add('hidden')
}