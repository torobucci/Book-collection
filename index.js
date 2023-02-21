const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");
const bookContainer = document.querySelector(".books-container");

class BookCollectionClass {
  constructor(bookArray) {
    this.bookArray = bookArray;
  }
  get addBook() {
    if (title.value && author.value) {
      this.bookArray.push(new Book(title.value, author.value));
      console.log(this.bookArray[0]);
      this.bookArray[0].displayBooks();
      localStorage.setItem(
        "bookCollectionArray",
        JSON.stringify(this.bookArray)
      );
    }
  }
  removeBook(bk) {
    this.bookArray.splice(bk, 1);
    localStorage.setItem("bookCollectionArray", JSON.stringify(this.bookArray));
  }
}

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  displayBooks() {
    bookContainer.innerHTML = "";
    bookCollection.bookArray.forEach((book) => {
      bookContainer.insertAdjacentHTML(
        "beforeend",
        `<div>
   <p>${book.title}</p>
   <p>${book.author}</p>
    <button class="remove" type="button">Remove</button>
    <hr>
    </div>`
      );
    });
    title.value = "";
    author.value = "";
    const removeBtns = document.querySelectorAll(".remove");
    removeBtns.forEach((removeBtn, i) => {
      removeBtn.addEventListener("click", () => {
        bookCollection.removeBook(i);
        this.displayBooks();
      });
    });
  }
}
const addButton = document.querySelector(".add-button");
console.log(addButton);
addButton.addEventListener("click", () => {
  bookCollection.addBook;
});

let bookCollection = new BookCollectionClass([]);
if (localStorage.getItem("bookCollectionArray")) {
  JSON.parse(localStorage.getItem("bookCollectionArray")).forEach((book) =>
    bookCollection.bookArray.push(new Book(book.title, book.author))
  );
}
bookCollection.bookArray[0].displayBooks();
