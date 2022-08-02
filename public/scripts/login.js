window.addEventListener("load", function () {
    const login = document.getElementById('loginForm')
    const test = document.querySelector('#test')
    const logout = document.querySelector('#logout')

    //put into cookies to save that they logged in
    let accessToken = ""

    login.addEventListener('submit', (event) => {
        // Stops the default submit action and allows us to perform our own aciton
        event.preventDefault()

        // TODO: Check for accessToken
        if (!accessToken) {

            // Saves the data from the form into FD
            let FD = new FormData(login)

            // Creates the JSON data from FD
            let data = {
                user: FD.get('user'),
                pass: FD.get('pass')
            }

            // Makes the fetch request to server
            fetch('/login', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.status == 200) {
                        document.cookie = `user=${res.accessToken};path=/` //saves user access token as a cookie
                        window.location = '/info'
                        //accessToken = res.accessToken
                    } else if (res.status == 401) {
                        this.alert(res.msg)
                    }
                })
                .then(res => {
                    if(!document.cookie){
                        console.log('input user and pass')
                    }else{
                        console.log('already logged in')
                        // window.location.replace('')
                        // res.render('index.ejs', { userInfo : document.cookie})
                    }
                })// returns to new homepage (not original page)
        } else {
            console.log("already logged in")
        }
    })

    test.addEventListener('click', () => {
        let userToken = document.cookie.split('=')
        // console.log(userToken)
        fetch('/test', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + userToken[1],
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })
            .catch(err => alert('not logged in'))
    })

    logout.addEventListener('click', () => {
        if(!document.cookie){
            alert('not logged in')
            return
        }
        let cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++){   
            let spcook =  cookies[i].split("=");
            deleteCookie(spcook[0]);
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
})
