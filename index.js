import Books from './modules/books.js';

import getTime from './modules/date.js';

const booksContainer = document.querySelector('.books-container');
const form = document.querySelector('form');
const list = document.getElementById('list');
const addNew = document.getElementById('add-new');
const contactSection = document.getElementById('contact-section');
const contact = document.getElementById('contact');
// show the Books on UI

const book = new Books();
book.showBooks();

// Add book and update UI as well as localStorage

form.addEventListener('submit', (e) => {
  e.preventDefault();
  book.updateBooks();
  form.reset();
});

// Remove that Book

booksContainer.addEventListener('click', (e) => {
  book.removeBook(e);
});

const booksContainerParent = document.querySelector('.books-container-parent');

list.addEventListener('click', (e) => {
  e.preventDefault();
  booksContainerParent.style.display = 'block';
  form.style.display = 'none';
  contactSection.style.display = 'none';
});

addNew.addEventListener('click', (e) => {
  e.preventDefault();
  form.style.display = 'flex';
  booksContainerParent.style.display = 'none';
  contactSection.style.display = 'none';
});

contact.addEventListener('click', (e) => {
  e.preventDefault();
  contactSection.style.display = 'block';
  booksContainerParent.style.display = 'none';
  form.style.display = 'none';
});
getTime();
setInterval(getTime, 1000);
