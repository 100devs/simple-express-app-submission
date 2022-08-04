
  import { isValidPassword, isEmail, setErrorFor, setSuccessFor } from './formValidationFunctions.js'

  const registerForm = document.querySelector('#register-form')

  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')
    const password2 = document.querySelector('#password2')
  
    checkInputs(username, password, password2);
  });
  
  function checkInputs(username, password, password2) {
    let usernameValue = username.value;
    let passwordValue = password.value;
    let password2Value = password2.value;

    let errors = 0

    if (usernameValue === '' || !isEmail(usernameValue)) {
      errors++
      setErrorFor(username, 'Enter a valid email address!');
    } else {
      setSuccessFor(username);
    }

    if (passwordValue !== password2Value) {
      errors++
      setErrorFor(password2, 'Passwords do not match!');
    }

    if (passwordValue === '' || !isValidPassword(passwordValue)) {
      errors++
      setErrorFor(password, 'Password does not meet requirements above!');
    } else {
      setSuccessFor(password);
    }

  if (errors === 0) {
    fetch(`/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue
      })
    })
      .then(response => {
      window.location = response.url   
    })
      .catch(err => {
      console.log(err)
    })      
  }
}
  
