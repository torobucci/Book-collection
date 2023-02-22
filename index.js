const bookContainer = document.querySelector(".books-container");

displayBook = function (book) {
  bookContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="book-details" id="book-${book.id}">
        <p>"${book.title}" by ${book.author}</p> 
        <button class="remove" type="button" id="remove-${book.id}">Remove</button>
      </div>`
  );
}

class BookCollection {
  constructor(bookArray) {
    this.bookArray = bookArray;
  }
  removeBook(book) {
    console.log(this.bookArray)
    this.bookArray.splice(book, 1);
    console.log(this.bookArray)

    localStorage.setItem(
      "bookCollectionArray",
      JSON.stringify(bookCollection.bookArray)
    );
    this.bookArray.forEach((book, i) => {
      book.id = i;
    });
    bookContainer.innerHTML = "";
    this.bookArray.forEach((book) => displayBook(book));
    document
      .querySelector(`#remove-${book.id}`)
      ?.addEventListener(`click`, this.removeBook.bind(this, book));
  }

  addBook(title, author) {
    this.bookArray.push({
      title: title,
      author: author,
      id: this.bookArray.length,
    });
    localStorage.setItem(
      "bookCollectionArray",
      JSON.stringify(bookCollection.bookArray)
    );

    displayBook(this.bookArray[this.bookArray.length - 1]);
    document
      .querySelector(`#remove-${this.bookArray[this.bookArray.length - 1].id}`)
      .addEventListener("click", () => {
        this.removeBook(this.bookArray[this.bookArray.length - 1]);
      });
  }
}

const bookCollection = localStorage.getItem("bookCollectionArray")
  ? new BookCollection(JSON.parse(localStorage.getItem("bookCollectionArray")))
  : new BookCollection([]);
console.log(bookCollection)
bookCollection.bookArray.forEach(book =>{
  displayBook(book)
})
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
