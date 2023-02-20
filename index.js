const bookCollection = [];

const title = document.querySelector('#title-input');
const author = document.querySelector('#author-input');
const bookContainer = document.querySelector('.book-container');

const addBook = function() {
  const bookObject = {
    title: title.value,
    author: author.value,
  };
  bookCollection.push(bookObject);
  title.value = '';
  author.value = '';

  bookContainer.innerHTML = '';
  bookContainer.insertAdjacentHTML('beforeend', `<div>
   <p>${bookObject.title}</p>
   <p>${bookObject.author}</p>
    <button class="remove" type="button">Remove</button>
    <hr>
    </div>`);
};

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', addBook);
