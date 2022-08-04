function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }
  
  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.classList.remove('success')
    formControl.classList.add('error')
    formControl.classList.add('mb-5')
    small.innerText = message;
  }
  
  function setSuccessFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.classList.remove('error')
    formControl.classList.remove('mb-5')
    formControl.classList.add('success')
    small.innerText = ''
  }
  
  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/.test(password);
  }

export {isValidDate, setErrorFor, setSuccessFor, isEmail, isValidPassword}