class BookCollection {
  constructor() {
    this.books = this.loadBooks();
  }

  addBook(title, author) {
    const book = { title, author };
    this.books.push(book);
    this.saveBooks();
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
    this.saveBooks();
  }

  displayBooks() {
    const bookList = document.getElementById('book-lists');
    bookList.innerHTML = '';

    this.books.forEach((book) => {
      const li = document.createElement('li');
      li.textContent = `"${book.title}" by ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-button');
      removeButton.textContent = 'Remove';
      removeButton.dataset.title = book.title;

      li.appendChild(removeButton);
      bookList.appendChild(li);
    });
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

    loadBooks = () => {
      const booksData = localStorage.getItem('books');
      return booksData ? JSON.parse(booksData) : [];
    };
}

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  const sections = document.getElementsByTagName('section');

  for (let i = 0; i < sections.length; i += 1) {
    sections[i].style.display = 'none';
  }

  section.style.display = 'block';
}

const bookCollection = new BookCollection();

document.getElementById('button').addEventListener('click', (event) => {
  event.preventDefault();

  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  bookCollection.addBook(titleInput.value, authorInput.value);
  bookCollection.displayBooks();

  titleInput.value = '';
  authorInput.value = '';
});

document.getElementById('book-lists').addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-button')) {
    const { title } = event.target.dataset;

    bookCollection.removeBook(title);
    bookCollection.displayBooks();
  }
});

document.getElementById('list').addEventListener('click', () => {
  toggleSection('lists');
});

document.getElementById('add-new').addEventListener('click', () => {
  toggleSection('forms');
});

document.getElementById('contact').addEventListener('click', () => {
  toggleSection('contact-section');
});

window.addEventListener('DOMContentLoaded', () => {
  bookCollection.displayBooks();
});
