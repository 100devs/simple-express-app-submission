window.addEventListener("load", function () {
    const signup = document.getElementById('signupForm')

    signup.addEventListener('submit', (event) => {
        // Stops the default submit action and allows us to perform our own aciton
        event.preventDefault()

        // Saves the data from the form into FD
        let FD = new FormData(signup)

        // Creates the JSON data from FD
        let data = {
            user: FD.get('user'),
            pass: FD.get('pass')
        }

        // Makes the fetch request to server
        fetch('/signup', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    // Login with the created user
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
                            if (!document.cookie) {
                                console.log('input user and pass')
                            } else {
                                console.log('already logged in')
                                // window.location.replace('')
                                // res.render('index.ejs', { userInfo : document.cookie})
                            }
                        })
                } else if (res.status == 401) {
                    this.alert(res.msg)
                }
            })
        // .then(window.location.replace('/')) // return to homepage
    })
})