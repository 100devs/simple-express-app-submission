let logoutEJS = document.querySelector('#logoutEditor')
let loginEJS = document.querySelector('#loginEditor')
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

//TODO:
/*

- Call that dudes API to get all the modpacks https://www.modpackindex.com/api/v1/modpacks
- Allow filtering search by name for all modpacks from API
- onclick of '+', add *formatted* data of selected modpack into db

- Add every modpack in db inside of remove modpacks
- onclick of '-', remove data of selected modpack from db
*MAYBE*: add search/filter for modpacks inside of DB to remove

*/