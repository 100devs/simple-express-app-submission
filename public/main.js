//Get the button:
const mybutton = document.getElementById("myBtn");
const likes = document.querySelectorAll('.like-btn');
const inspired = document.querySelectorAll('.inspired-btn');
const sort = document.querySelectorAll('.sort-items');



// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//sort event listeners
Array.from(sort).forEach((el)=> {
  el.addEventListener('click', sortList);
})

//sort list get request
async function sortList() {
  const itemID = this.dataset.id;
  try {
    window.location.replace(`/${itemID}`);
  }
  catch (err) {
    console.error(err);
  }
}

//like button event listeners
Array.from(likes).forEach((el)=> {
  el.addEventListener('click', addLike)
})

//fetch request to update Likes
async function addLike() {
  const itemID = this.parentNode.parentNode.parentNode.dataset.id;
  try {
    let likes = await fetch('addLike', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            'itemID': itemID
        })
    })
    const data = await likes.json();
    location.reload();
  }
  catch(err) {
    console.error(err);
  }
}



//inspired button event listeners
Array.from(inspired).forEach((el)=> {
  el.addEventListener('click', addInspired)
})

//fetch request to update inspired
async function addInspired() {
  const itemID = this.parentNode.parentNode.parentNode.dataset.id;
  try {
    let inspired = await fetch('addInspired', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            'itemID': itemID
        })
    })
    const data = await inspired.json();
    location.reload();
  }
  catch(err) {
    console.error(err);
  }
}
