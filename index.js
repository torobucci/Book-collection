const bookContainer = document.querySelector(".books-container");

class BookCollection {
  constructor(bookArray) {
    this.bookArray = bookArray;
  }
  removeBook(book) {
    this.bookArray.splice(book, 1);
    localStorage.setItem(
      "bookCollectionArray",
      JSON.stringify(bookCollection.bookArray)
    );
    this.bookArray.forEach((book, i) => {
      book.id = i;
    });
    bookContainer.innerHTML = "";
    this.bookArray.forEach((book) => book.displayBook());
    document
      .querySelector(`#remove-${book.id}`)
      ?.addEventListener(`click`, this.removeBook.bind(this, book));
  }

  addBook(title, author) {
    this.bookArray.push({
      title: title,
      author: author,
      id: this.bookArray.length,

      displayBook: function () {
        bookContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="book-details" id="book-${this.id}">
              <p>"${this.title}" by ${this.author}</p> 
              <button class="remove" type="button" id="remove-${this.id}">Remove</button>
            </div>`
        );
      },
    });
    localStorage.setItem(
      "bookCollectionArray",
      JSON.stringify(bookCollection.bookArray)
    );

    this.bookArray[this.bookArray.length - 1].displayBook();
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
