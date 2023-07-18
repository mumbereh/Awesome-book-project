export default class BookCollection {
    constructor() {
      this.books = LocalStorage.getBooks() || [];
    }

    init() {
      this.displayBooks();
      this.setupForm();
    }

    addBook(title, author) {
      const book = new Book(title, author);

      this.books.push(book);
      LocalStorage.saveBooks(this.books);
    }

    removeBook(title) {
      this.books = this.books.filter((book) => book.title !== title);
      LocalStorage.saveBooks(this.books);
    }

    displayBooks() {
      const bookList = document.getElementById('book-lists');
      bookList.innerHTML = '';

      this.books.forEach((book) => {
        const listItem = document.createElement('li');
        listItem.style.listStyle = 'none';
        listItem.classList.add('list-item');

        const rmvBtn = document.createElement('button');
        rmvBtn.textContent = 'Remove';
        rmvBtn.classList.add('remove-button');
        rmvBtn.dataset.title = book.title;

        listItem.innerHTML = `"${book.title}" by ${book.author}`;

        bookList.appendChild(listItem);
        listItem.appendChild(rmvBtn);
      });
    }

    setupForm() {
      const form = document.querySelector('.form');

      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titleInput = document.getElementById('title');
        const authorInput = document.getElementById('author');

        this.addBook(titleInput.value, authorInput.value);
        this.displayBooks();

        titleInput.value = '';
        authorInput.value = '';
      });

      document.getElementById('book-lists').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-button')) {
          const { title } = event.target.dataset;

          this.removeBook(title);
          this.displayBooks();
        }
      });
    }
  }

