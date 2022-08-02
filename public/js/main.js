// ========= On Mobile - Hamburger button Open & Close ========= //
const hamburgerBtn = document.querySelector('.hamburgerBtn');
hamburgerBtn.addEventListener('click', toggleSideBar);

async function toggleSideBar() {
  let sideBar = document.querySelector('.sideBar');
  let profileArea = document.querySelector('.profileArea');
  let navContent = document.querySelector('.navContent');

  sideBar.classList.toggle('open');
  profileArea.classList.toggle('visible');
  navContent.classList.toggle('visible');
}

// ========= Fetch Google Books API JSON Data ========= //
// GOOGLE API Docs - https://developers.google.com/books/docs/v1/using

// ========= Auto Complete Functions ========= //
// On event 'input' enable autocomplete search input
async function enableBookSearchInput() {
  let searchInput = document.querySelector('.bookSearchInput');
  searchInput.addEventListener('input', () => {
    let searchInputResult = searchInput.value;
    // console.log(searchInputResult);

    fetchBooksData(searchInputResult);
  });
}
enableBookSearchInput();

// after autocomplete search input is enabled = get book results based on input event
async function fetchBooksData(searchInputResult) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchInputResult}&key=AIzaSyByYEeZn4taw9OfJDef1qCOgAgSDschcaE`
    );
    const data = await response.json();
    const bookSearchResults = data.items;
    // console.log(bookSearchResults);

    writeToSuggestions(bookSearchResults);
    suggestionsListListeners(bookSearchResults);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
}

// Write book autocomplete suggestions to DOM
async function writeToSuggestions(bookSearchResults) {
  let suggestions = document.querySelector('.suggestions');
  suggestions.innerHTML = '';

  // If there are matches in the book api ...
  if (bookSearchResults.length > 0) {
    // create the HTML list items (title & Authors)
    let html = bookSearchResults.map((elem) => {
      return `
        <li class="autocomplete-item" data-id="${elem.id}">
          <p class="itemTitle">${elem.volumeInfo.title}: ${elem.volumeInfo.subtitle}</p>
          <p class="itemAuthors">${elem.volumeInfo.authors}</p>
        </li>
              `;
    });
    // Add HTML list items to the DOM
    html.unshift(suggestions);
    suggestions.innerHTML = html.join('');
  } else {
    console.log('no results');
    res.sendStatus(404);
    return;
  }
}

// Add event listeners on book autocomplete suggestion list li's
async function suggestionsListListeners(bookSearchResults) {
  let listItems = document.querySelectorAll('.autocomplete-item');

  // Iterate through all suggestion items li's in the list ul
  for (let item of listItems) {
    item.addEventListener('click', (e) => {
      document.querySelector('.suggestions').innerHTML = '';
      document.querySelector('.bookSearchInput').value = '';
      // Get object data by the data-id attribute
      const clickedBookItem = bookSearchResults.filter(
        (item) => item.id === e.currentTarget.getAttribute('data-id')
      );
      console.log(clickedBookItem);

      // Send and run selected book item data to addbook() function
      addBook(clickedBookItem);
    });
  }
}

// ========= CRUD main.js <--> server.js connections ========= //

// == POST == Send new book data to MongoDB on POST (see server.js)
async function addBook(clickedBookItem) {
  const bookId = clickedBookItem[0].id;
  const bookTitle = clickedBookItem[0].volumeInfo.title;
  const bookAuthors = clickedBookItem[0].volumeInfo.authors;
  const bookPageCount = clickedBookItem[0].volumeInfo.pageCount;
  const bookDescription = clickedBookItem[0].volumeInfo.description;
  const bookImage = clickedBookItem[0].volumeInfo.imageLinks.smallThumbnail;

  try {
    const response = await fetch('addBook', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId: bookId,
        bookTitle: bookTitle,
        bookAuthors: bookAuthors,
        bookPageCount: bookPageCount,
        bookDescription: bookDescription,
        bookImage: bookImage,
        userRating: null,
        isFavorited: false,
        isCompleted: false,
        completionDate: null,
      }),
    });
    const data = await response.json();
    console.log(data);
    window.location.replace('/');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
}

// == UPDATE == Adds/removes a book to favorites on '/addFavorite' or '/rmFavorite' (see server.js)
const favoriteBookBtn = document.querySelectorAll('.likeBookItemBtns');
Array.from(favoriteBookBtn).forEach((elem) => {
  elem.addEventListener('click', toggleFavoriteBookItem);

  // Immediately show books that are favorited/not favorited
  if (elem.getAttribute('data-isFavorited') === 'true') {
    elem.style.color = '#63da63dc';
    elem.classList.add('visible');
    elem.classList.remove('invisible');
  } else if (elem.getAttribute('data-isFavorited') === 'false') {
    elem.style.color = 'white';
    elem.classList.add('invisible');
    elem.classList.remove('visible');
  }
});

async function toggleFavoriteBookItem() {
  const bookId = this.getAttribute('data-id');
  console.log(this.getAttribute('data-isFavorited'));

  // If the button is invisible (book not favorited) -> favorite book and add heart button
  if (this.classList.contains('invisible')) {
    try {
      const response = await fetch('addFavorite', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: bookId,
        }),
      });
      const data = await response.json();
      console.log(data);

      this.style.color = '#63da63dc';
      this.classList.add('visible');
      this.classList.remove('invisible');
      location.reload();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    // If the button is visible (book favorited) -> unfavorite book and add remove heart button
  } else if (this.classList.contains('visible')) {
    try {
      const response = await fetch('rmFavorite', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: bookId,
        }),
      });
      const data = await response.json();
      console.log(data);

      this.style.color = 'white';
      this.classList.add('invisible');
      this.classList.remove('visible');
      location.reload();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
  }
}

// == UPDATE == (un)favorites a book when clicking the MODAL button
const modalFavoriteBookBtn = document.querySelectorAll('.modalLikeBookItemBtns');
Array.from(modalFavoriteBookBtn).forEach((elem) => {
  elem.addEventListener('click', modalToggleFavoriteBookItem);
  // Immediately show books that are favorited/not favorited
  if (elem.getAttribute('data-isFavorited') === 'true') {
    elem.style.color = '#63da63dc';
  } else if (elem.getAttribute('data-isFavorited') === 'false') {
    elem.style.color = 'white';
  }
});

async function modalToggleFavoriteBookItem() {
  const bookId = this.getAttribute('data-id');
  console.log(this.getAttribute('data-isFavorited'));

  // If the modal button data-attr is false -> favorite book and change heart color to green
  if (this.getAttribute('data-isFavorited') === 'false') {
    try {
      const response = await fetch('addFavorite', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: bookId,
        }),
      });
      const data = await response.json();
      console.log(data);

      this.style.color = '#63da63dc';
      location.reload();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    // If the modal button data-attr is true -> unfavorite book and change heart color to white
  } else if (this.getAttribute('data-isFavorited') === 'true') {
    try {
      const response = await fetch('rmFavorite', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: bookId,
        }),
      });
      const data = await response.json();
      console.log(data);

      this.style.color = 'white';
      location.reload();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
  }
}

// == UPDATE == Adds/removes a book from Completed List on '/markCompleted' or '/markIncompleted' (see server.js)
const markCompleteBtns = document.querySelectorAll('.completeBookItem');
Array.from(markCompleteBtns).forEach((elem) => {
  elem.addEventListener('click', markBookCompleted);

  // Immediately show if book is completed or not (green or white)
  if (elem.getAttribute('data-isCompleted') === 'true') {
    elem.style.color = '#63da63dc';
  } else if (elem.getAttribute('data-isCompleted') === 'false') {
    elem.style.color = 'white';
  }
});

async function markBookCompleted() {
  const bookId = this.getAttribute('data-id');

  // if book is not completed -> mark book as complete in the mongoDB database
  if (this.getAttribute('data-isCompleted') === 'false') {
    try {
      const response = await fetch('markCompleted', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: bookId,
        }),
      });
      const data = await response.json();
      console.log(data);
      location.reload();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    // if book is already completed -> mark book as incomplete in the mongoDB database
  } else if (this.getAttribute('data-isCompleted') === 'true') {
    try {
      const response = await fetch('markIncompleted', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: bookId,
        }),
      });
      const data = await response.json();
      console.log(data);
      location.reload();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
  }
}

// == DELETE ==  Remove selected book from MongoDB on '/rmBook' on DELETE (see server.js)
// Add event listeners on all rbBookItemBtns
const rmBookBtn = document.querySelectorAll('.removeBookItemBtns');
Array.from(rmBookBtn).forEach((elem) => {
  elem.addEventListener('click', rmBookItem);
});

// Get data-id attributes from rmBookBtns and remove from mongoDB database by bookId
async function rmBookItem() {
  const bookId = this.getAttribute('data-id');

  try {
    const response = await fetch('rmBook', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId: bookId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
}
