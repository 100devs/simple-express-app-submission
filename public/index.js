const authLink = document.querySelector('a#auth-link');
let user = JSON.parse( localStorage.getItem('user') );

// Update Sign Up link to User's Name
if (user) {
  authLink.textContent = user.username;
}