const title = document.querySelector('#title-input');
const author = document.querySelector('#author-input');
const bookContainer = document.querySelector('.books-container');

class BookCollectionClass {
  constructor(bookArray) {
    this.bookArray = bookArray;
  }

  addBook() {
    if (title.value && author.value) {
      this.bookArray.push(new Book(title.value, author.value));
      this.bookArray[0].displayBooks();
      localStorage.setItem(
        'bookCollectionArray',
        JSON.stringify(this.bookArray),
      );
    }
  }

  removeBook(bk) {
    this.bookArray.splice(bk, 1);
    localStorage.setItem('bookCollectionArray', JSON.stringify(this.bookArray));
  }
}
const bookCollection = new BookCollectionClass([]);
if (localStorage.getItem('bookCollectionArray')) {
  JSON.parse(localStorage.getItem('bookCollectionArray')).forEach((book) => bookCollection.bookArray.push(new Book(book.title, book.author)));
}
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  displayBooks() {
    bookContainer.innerHTML = '';
    bookCollection.bookArray.forEach((book) => {
      bookContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="book-details">
   <p>"${book.title}" by ${book.author}</p> 
    <button class="remove" type="button">Remove</button>
  
    </div>`,
      );
    });
    if (bookCollection.bookArray[0]) {
      bookContainer.style.border = '3px solid black';
    } else {
      bookContainer.style.border = 'none';
    }
    title.value = '';
    author.value = '';
    const removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach((removeBtn, i) => {
      removeBtn.addEventListener('click', () => {
        bookCollection.removeBook(i);
        this.displayBooks();
      });
    });
  }
}
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', () => {
  bookCollection.addBook;
});
console.log(bookCollection.bookArray[0])
if(bookCollection.bookArray[0]){
  bookCollection.bookArray[0].displayBooks();
}

