const booksContainer = document.querySelector(".books-container");
const form = document.querySelector("form");
const list = document.getElementById("list");
const addNew = document.getElementById("add-new");
const contactSection = document.getElementById("contact-section");
const contact = document.getElementById("contact");

// Create book class, add attributes and methods

class Books {
  constructor() {
    this.by = null;
    this.books = [
      {
        title: "Fid",
        author: "foo",
      },
      {
        title: "Sec",
        author: "Tes",
      },
    ];
  }

  generateBook(book) {
    this.by = "by";
    return `
    <div><ul>
          <li>"${book.title}"</li>
          <li>${this.by}</li>
          <li>${book.author}</li> 
      </ul>
      <button>Remove</button>
      </div>
      `;
  }

  showBooks() {
    const booksFromLocalStorage = JSON.parse(localStorage.getItem("books"));
    if (booksFromLocalStorage) {
      this.books = booksFromLocalStorage;
      booksContainer.innerHTML = booksFromLocalStorage
        .map((book) => this.generateBook(book))
        .join("");
    } else {
      localStorage.setItem("books", JSON.stringify(this.books));
      booksContainer.innerHTML = this.books
        .map((book) => this.generateBook(book))
        .join("");
    }
  }

  updateBooks() {
    const title = form.title.value.trim();
    const author = form.author.value.trim();
    if (title && author) {
      this.books.push({ title, author });
    }
    localStorage.setItem("books", JSON.stringify(this.books));
    this.showBooks();
  }

  removeBook(e) {
    if (e.target.tagName === "BUTTON") {
      const title =
        e.target.parentElement.firstElementChild.firstElementChild.textContent;
      this.books = this.books.filter(
        (obj) => obj.title !== title.slice(1, title.length - 1)
      );
      localStorage.setItem("books", JSON.stringify(this.books));
      this.showBooks();
    }
  }
}

// show the Books on UI

const book = new Books();
book.showBooks();

// Add book and update UI as well as localStorage

form.addEventListener("submit", (e) => {
  e.preventDefault();
  book.updateBooks();
  form.reset();
});

// Remove that Book

booksContainer.addEventListener("click", (e) => {
  book.removeBook(e);
});

const booksContainerParent = document.querySelector(".books-container-parent");

list.addEventListener("click", (e) => {
  e.preventDefault();
  booksContainerParent.style.display = "block";
  form.style.display = "none";
  contactSection.style.display = "none";
});

addNew.addEventListener("click", (e) => {
  e.preventDefault();
  form.style.display = "flex";
  booksContainerParent.style.display = "none";
  contactSection.style.display = "none";
});

contact.addEventListener("click", (e) => {
  e.preventDefault();
  contactSection.style.display = "block";
  booksContainerParent.style.display = "none";
  form.style.display = "none";
});

function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(", ", " - ");
  timeDisplay.textContent = formattedString;
}
setInterval(refreshTime, 1000);
