import React from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import "./App.css";
import { Link } from "react-router-dom";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      books: [],
      booksOnMyShelf: props.allBooks
    };
    console.log("props", props);
  }

  updateQuery(query) {
    this.setState({ query });
    if (!query) {
      this.setState({ books: [] });
      return;
    }

    BooksAPI.search(query).then(data => {
      if (!data || data.error) return;

      data.map(book => {
        let index = this.state.booksOnMyShelf.findIndex(b => b.id === book.id);
        if (index != -1) {
          book.shelf = this.state.booksOnMyShelf[index].shelf;
        } else {
          book.shelf = "none";
        }
      });
      // console.log(JSON.parse(JSON.stringify(data)));
      this.setState({ books: data });
    });
  }

  bookChangedShelf(book, e) {
    this.props.bookChangedShelf(book, e);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
            <input
              onChange={event => this.updateQuery(event.target.value)}
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => {
              return (
                <li key={book.id}>
                  <Book
                    shelfChanged={this.bookChangedShelf.bind(this)}
                    imageLinks={book.imageLinks}
                    title={book.title}
                    authors={book.authors}
                    id={book.id}
                    shelf={book.shelf}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
