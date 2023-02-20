let bookCollection = [];

const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");
const bookContainer = document.querySelector(".books-container");

const removeBook = function () {
  const title = this.id.split("-")[0];
  const author = this.id.split("-")[1];
  bookCollection = bookCollection.filter((book) => {
    book.title !== title;
    book.author !== author;
  });
  displayBooks();
};

function displayBooks() {
  bookContainer.innerHTML = "";
  bookCollection.forEach((book) => {
    bookContainer.insertAdjacentHTML(
      "beforeend",
      `<div>
   <p>${book.title}</p>
   <p>${book.author}</p>
    <button class="remove" type="button" id="${book.title}-${book.author}">Remove</button>
    <hr>
    </div>`
    );
  });
  document.querySelectorAll(".remove").forEach((removeBtn) => {
    removeBtn.addEventListener("click", removeBook);
  });
}

const addBook = function () {
  if (title.value && author.value) {
    const bookObject = {
      title: title.value,
      author: author.value,
    };
    bookCollection.push(bookObject);
    title.value = "";
    author.value = "";
    displayBooks();
  }
};

const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", addBook);
