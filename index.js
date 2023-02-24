const bookContainer = document.querySelector(".books-container");

class BookCollection {
  constructor(bookArray) {
    this.bookArray = bookArray;
  }

  displayBooks() {
    bookContainer.innerHTML = "";
    this.bookArray.forEach((book) => {
      bookContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="book-details" id="book-${book.id}">
        <p>"${book.title}" by ${book.author}</p> 
        <button class="remove" type="button" id="remove-${book.id}">Remove</button>
      </div>`
      );
    });

    if (this.bookArray.length !== 0) {
      bookContainer.style.border = "solid 3px #000000";
    } else bookContainer.style.border = "none";
  }

  storeInLocalBrowser() {
    localStorage.setItem("bookCollectionArray", JSON.stringify(this.bookArray));
  }

  removeBook(book) {
    this.bookArray.splice(book, 1);
    this.storeInLocalBrowser();
    bookContainer.innerHTML = "";
    this.bookArray.forEach((book, i) => {
      book.id = i;
    });
    this.displayBooks();
  }

  addBook(title, author) {
    this.bookArray.push({
      title,
      author,
      id: this.bookArray.length,
    });
    this.storeInLocalBrowser();
    this.displayBooks();
  }
}

const bookCollection = localStorage.getItem("bookCollectionArray")
  ? new BookCollection(JSON.parse(localStorage.getItem("bookCollectionArray")))
  : new BookCollection([]);

bookCollection.displayBooks();

const addButton = document.querySelector(".add-button");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
addButton.addEventListener("click", () => {
  if (titleInput.value && authorInput.value) {
    bookCollection.addBook(titleInput.value, authorInput.value);
    titleInput.value = "";
    authorInput.value = "";
  }
});

document.querySelectorAll(".section").forEach((section) => {
  if (!(section.id === "book-list")) section.style.display = "none";
});

const navBar = document.querySelector(".nav-Bar");
navBar.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const anchorHref = e.target.href.split("#")[1];
    document.querySelectorAll(".section").forEach((section) => {
      if (section.id === anchorHref) section.style.display = "flex";
      else section.style.display = "none";
    });
  }
});

bookContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const removeBtn = e.target;
    const book = bookCollection.bookArray.find(
      (book) => book.id === removeBtn.id.split("-")[1]
    );
    bookCollection.removeBook(book);
  }
});
