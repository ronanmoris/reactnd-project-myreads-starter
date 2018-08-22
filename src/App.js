import React from "react";
import Bookshelf from "./Bookshelf";
import Search from "./Search";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      shelves: {}
    };
    this.changeShelf = this.changeShelf.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ shelves: this.sortShelves(books) });
    });
  }

  getAllBooks() {
    let list = [];
    Object.keys(this.state.shelves).forEach(shelf => {
      list = list.concat(this.state.shelves[shelf]);
    });
    return list;
  }

  sortShelves(books) {
    const shelves = {};

    if (!books) return shelves;
    books.forEach(book => {
      const bookShelf = book.shelf;
      if (shelves[bookShelf]) {
        shelves[bookShelf].push(book);
        return;
      }
      shelves[bookShelf] = [];
      shelves[bookShelf].push(book);
    });
    return shelves;
  }

  findBookIndex(book) {
    const shelves = this.state.shelves;
    const shelf = shelves[book.props.shelf];
    return shelf.findIndex(b => book.props.id === b.id);
  }

  removeBookFromShelf(book, index) {
    if (index !== -1) {
      const shelves = this.state.shelves;
      const shelf = shelves[book.props.shelf];

      shelf.splice(index, 1);
      shelves[book.props.shelf] = shelf;
      this.setState({ shelves: shelves });
    }
  }

  addBookToShelf(book, shelfToGo) {
    const shelves = this.state.shelves;
    if (!shelves[shelfToGo]) {
      shelves[shelfToGo] = [];
    }
    shelves[shelfToGo].push(book.props);
    this.setState({ shelves: shelves });
  }

  changeShelf(book, shelfToGo) {
    const copy = {};
    Object.assign(copy, book);
    if (book.props.shelf != "none") {
      const index = this.findBookIndex(book);
      this.removeBookFromShelf(book, index);
    }
    copy.shelf = shelfToGo;
    this.addBookToShelf(copy, shelfToGo);
  }

  updateBook(book, e) {
    let shelf = e.target.value;
    BooksAPI.update(book.props, e.target.value).then(result => {
      BooksAPI.getAll().then(books => {
        this.setState({ shelves: this.sortShelves(books) });
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <Search
              allBooks={this.getAllBooks()}
              bookChangedShelf={this.updateBook}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {Object.keys(this.state.shelves).map((key, index) => {
                    const booksOnThisShelf = this.state.shelves[key];
                    return (
                      <Bookshelf
                        bookChangedShelf={this.updateBook}
                        key={index}
                        books={booksOnThisShelf}
                        title={key}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
