const buttons = document.querySelector("#loginRegister")

buttons.addEventListener("click", e => {
    let word = e.path[0].innerText
        if (word === "Login"){
            document.querySelector("#loginForm").classList.toggle("hidden")
        }
        if (word === "Register"){
            document.querySelector("#registerForm").classList.toggle("hidden")
        }
        
    }
)

    
