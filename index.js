const bookCollection = [];

const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");

const addBook = function () {
  const bookObject = {
    title: title.value,
    author: author.value,
  };
  bookCollection.push(bookObject);
  title.value = "";
  author.value = "";
};

const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", addBook);
