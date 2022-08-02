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

// ========= Fetch NYTimes Books API JSON Data ========= //
// NYTimes API Docs - https://developer.nytimes.com/docs/books-product/1/overview

// ---(IIFE)--- Fetch all Latest bestsellers books from each category of books
(async function fetchNytBestSellers() {
  try {
    const response = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=fMS1dkIc0WhACTkyYfl7RxhqN6XnJcDn`
    );
    const data = await response.json();
    const bookCategories = data.results.lists;
    console.log(bookCategories);

    // When book data is fetched, run these two functions next
    displayBestSellersFiction(bookCategories);
    displayBestSellersNonfiction(bookCategories);
    displayBestSellersAdvice(bookCategories);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
})();

// Display all fiction best seller books in the "Most Popular in Fiction" discovery section
async function displayBestSellersFiction(bookCategories) {
  const bookResultsFiction = bookCategories[0].books;
  // console.log(bookResultsFiction);

  try {
    bookResultsFiction.forEach((elem) => {
      let bookItem = document.createElement('section');
      bookItem.setAttribute('class', 'bookResult');
      bookItem.setAttribute('data-isbn', `${elem.primary_isbn13}`);
      bookItem.innerHTML = `<a class="bookCoverImage" href="#${elem.primary_isbn13}"> <img src="${elem.book_image}" alt="book cover image" /></a>
        <section id="${elem.primary_isbn13}" class="modal">
          <section class="modal__content">
            <section class="editBookSummaryMain flexBox">
              <img
                src="${elem.book_image}"
                alt="book cover image"
                class="bookCoverImage"
              />
              <section class="editBookInfo">
                <p class="bookTitle">${elem.title}</p>
                <p class="bookAuthor">${elem.author}</p>
              </section>
            </section>
            <section class="modalMoreBtns">
              <span class="saveToPlaylistBtn" data-isbn="${elem.primary_isbn13}">
                <i class="fa-solid fa-circle-plus addToPlaylistBtn" data-isbn="${elem.primary_isbn13}"></i>
                Add to playlist
              </span>
            </section>
            <h4 class="modal--subheader">Description</h4>
            <p class="bookDescription">${elem.description}</p>
            <h4 class="modal--subheader">Purchase</h4>
            <section class="bookPurchaseLinks">
              <a class="purchaseLink" href="${elem.buy_links[0].url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${elem.buy_links[0].name}</a>
              <a class="purchaseLink" href="${elem.buy_links[1].url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${elem.buy_links[1].name}</a>
              <a class="purchaseLink" href="${elem.buy_links[2].url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${elem.buy_links[2].name}</a>
            </section>
            <a href="#" class="modal__close">&times;</a>
          </section>
        </section>
      `;
      document.querySelector('.bookResultsFiction').appendChild(bookItem);
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
}

// Display all nonfiction best seller books in the "Most Popular in Nonfiction" discovery section
async function displayBestSellersNonfiction(bookCategories) {
  const bookResultsNonfiction = bookCategories[1].books;
  // console.log(bookResultsNonfiction);

  try {
    bookResultsNonfiction.forEach((elem) => {
      let bookItem = document.createElement('section');
      bookItem.setAttribute('class', 'bookResult');
      bookItem.setAttribute('data-isbn', `${elem.primary_isbn13}`);
      bookItem.innerHTML = `<a class="bookCoverImage" href="#${elem.primary_isbn13}"> <img src="${elem.book_image}" alt="book cover image" /></a>
        <section id="${elem.primary_isbn13}" class="modal">
          <section class="modal__content">
            <section class="editBookSummaryMain flexBox">
              <img
                src="${elem.book_image}"
                alt="book cover image"
                class="bookCoverImage"
              />
              <section class="editBookInfo">
                <p class="bookTitle">${elem.title}</p>
                <p class="bookAuthor">${elem.author}</p>
              </section>
            </section>
            <section class="modalMoreBtns">
              <span class="saveToPlaylistBtn" data-isbn="${elem.primary_isbn13}">
                <i class="fa-solid fa-circle-plus addToPlaylistBtn" data-isbn="${elem.primary_isbn13}"></i>
                Add to playlist
              </span>
            </section>
            <h4 class="modal--subheader">Description</h4>
            <p class="bookDescription">${elem.description}</p>
            <h4 class="modal--subheader">Purchase</h4>
            <section class="bookPurchaseLinks">
              <a class="purchaseLink" href="${elem.buy_links[0].url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${elem.buy_links[0].name}</a>
              <a class="purchaseLink" href="${elem.buy_links[1].url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${elem.buy_links[1].name}</a>
              <a class="purchaseLink" href="${elem.buy_links[2].url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${elem.buy_links[2].name}</a>
            </section>
            <a href="#" class="modal__close">&times;</a>
          </section>
        </section>
      `;
      document.querySelector('.bookResultsNonfiction').appendChild(bookItem);

      // Add event listener to Save to Playlist Button (on each) to trigger save
      const saveToPlaylistBtn = document.querySelectorAll('.saveToPlaylistBtn');
      Array.from(saveToPlaylistBtn).forEach((elem) => {
        elem.addEventListener('click', matchISBN);
      });
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
}

// Display all Advice/How-To best seller books in the "Most Popular in Advice/How-To" discovery section
async function displayBestSellersAdvice(bookCategories) {
  const bookResultsAdvice = bookCategories[6].books;
  // console.log(bookResultsAdvice);

  try {
    bookResultsAdvice.forEach((elem) => {
      let bookItem = document.createElement('section');
      bookItem.setAttribute('class', 'bookResult');
      bookItem.setAttribute('data-isbn', `${elem.primary_isbn13}`);
      bookItem.innerHTML = `<a class="bookCoverImage" href="#${elem.primary_isbn13}"> <img src="${elem.book_image}" alt="book cover image" /></a>
        <section id="${elem.primary_isbn13}" class="modal">
          <section class="modal__content">
            <section class="editBookSummaryMain flexBox">
              <img
                src="${elem.book_image}"
                alt="book cover image"
                class="bookCoverImage"
              />
              <section class="editBookInfo">
                <p class="bookTitle">${elem.title}</p>
                <p class="bookAuthor">${elem.author}</p>
              </section>
            </section>
            <section class="modalMoreBtns">
              <span class="saveToPlaylistBtn" data-isbn="${elem.primary_isbn13}">
                  <i class="fa-solid fa-circle-plus addToPlaylistBtn" data-isbn="${elem.primary_isbn13}"></i>
                  Add to playlist
              </span>
            </section>
            <h4 class="modal--subheader">Description</h4>
            <p class="bookDescription">${elem.description}</p>
            <h4 class="modal--subheader">Purchase</h4>
            <section class="bookPurchaseLinks">
              <a class="purchaseLink" href="${elem.buy_links[0].url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${elem.buy_links[0].name}</a>
              <a class="purchaseLink" href="${elem.buy_links[1].url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${elem.buy_links[1].name}</a>
              <a class="purchaseLink" href="${elem.buy_links[2].url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${elem.buy_links[2].name}</a>
            </section>
            <a href="#" class="modal__close">&times;</a>
          </section>
        </section>
      `;
      document.querySelector('.bookResultsAdvice').appendChild(bookItem);

      // Add event listener to Save to Playlist Button (on each) to trigger save
      const saveToPlaylistBtn = document.querySelectorAll('.saveToPlaylistBtn');
      Array.from(saveToPlaylistBtn).forEach((elem) => {
        elem.addEventListener('click', matchISBN);
      });
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
}

// ========= Update == Add book item from book discovery to Books Playlist Page ========= //

async function matchISBN() {
  const bookISBN = this.getAttribute('data-isbn');
  console.log(`Book ISBN13 - ${bookISBN}`);

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${bookISBN}&key=AIzaSyByYEeZn4taw9OfJDef1qCOgAgSDschcaE`
    );
    const data = await response.json();
    const matchedBookData = data.items[0];
    console.log(matchedBookData);

    // Once a match is found, run addBookToPlaylist Function
    addBookToPlaylist(matchedBookData);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
}

// == POST == Send new book data to MongoDB on POST (see server.js)
async function addBookToPlaylist(matchedBookData) {
  const bookId = matchedBookData.id;
  const bookTitle = matchedBookData.volumeInfo.title;
  const bookAuthors = matchedBookData.volumeInfo.authors;
  const bookPageCount = matchedBookData.volumeInfo.pageCount;
  const bookDescription = matchedBookData.volumeInfo.description;
  const bookImage = matchedBookData.volumeInfo.imageLinks.smallThumbnail;

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
