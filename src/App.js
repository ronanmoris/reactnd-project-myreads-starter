import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Book.js";
import Bookshelf from "./Bookshelf";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      shelves: {},
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ shelves: this.sortShelves(books) });
    });
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

  changeShelf(e) {
    console.log("chegouuuu ", e);
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : this.state.shelves ? (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {Object.keys(this.state.shelves).map((key, index) => {
                  const booksOnThisShelf = this.state.shelves[key];
                  console.log(booksOnThisShelf);
                  return (
                    <Bookshelf
                      bookChangedShelf={this.changeShelf}
                      key={index}
                      books={booksOnThisShelf}
                      title={key}
                    />
                  );
                })}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        ) : (
          <span>Loading</span>
        )}
      </div>
    );
  }
}

export default BooksApp;
