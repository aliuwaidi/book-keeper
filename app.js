// Selecting UI Element
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const isbn = document.querySelector('#isbn');
const bookForm = document.querySelector('#book-form');
const submit = document.querySelector('#submit');
const bookList = document.querySelector('#book-list');
const container = document.querySelector('.container');

// Creating Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn
}

// Creating UI constructor
function UI() { }

// creating addBokToList function
UI.prototype.addBookToList = function (book) {
   
  // create tr element
  const row = document.createElement('tr');

  // adding content to row
  row.innerHTML = `
  <th>${book.title}</th>
  <th>${book.author}</th>
  <th>${book.isbn}</th>
  <th><a href='#' class='delete'>X</a></th>
  `;

  bookList.appendChild(row)

}

// Creating showAlert function
UI.prototype.showAlert = function (message, className) {
  // creating message div
  const div = document.createElement('div');

  // adding className to div
  div.className = ` alert ${className}`

  // adding message to div
  div.innerText = `${message}`

  // insert div message to form
  container.insertBefore(div, bookForm);

  // set TimeOut for alert
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000)
}

// cfretaing remove book function
UI.prototype.removeBook = function (target) {
   if (target.classList.contains('delete')) {
    target.parentElement.parentElement.remove();
  }
}


// Creating Clearfield function
UI.prototype.clearFields = function () {
  title.value = '';
  author.value = '';
  isbn.value = '';
}



// Adding Event Listener to the form
bookForm.addEventListener('submit', addBook);

//creating function addBook
function addBook(e) {
  e.preventDefault();

  // instantiate Book
  const book = new Book(title.value, author.value, isbn.value);

  // instantiate UI
  const ui = new UI();

  if (title.value === '' || author.value === '' || isbn.value === '') {
    // creating Alert message
    ui.showAlert('Please fill in all fields', 'error');
  } else {
     // add Book to UI
    ui.addBookToList(book);
    
    // alert succesfull book add
    ui.showAlert('Book added', 'success');

    // clear input field
    ui.clearFields();
  }

}

// adding event listener on delete btn
bookList.addEventListener('click', deleteBook);

// creating function deleteBook
function deleteBook(e) {
  e.preventDefault();

  // instantiate UI
  const ui = new UI();

  //remove book
  ui.removeBook(e.target)

   // alert succesfull delete Book
    ui.showAlert('Book deleted!', 'success');

}