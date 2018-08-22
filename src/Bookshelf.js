import React from "react";
import "./App.css";
import Book from "./Book";

export default class Bookshelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book, index) => {
              return (
                <li key={index}>
                  <Book
                    shelfChanged={this.props.bookChangedShelf}
                    imageLinks={book.imageLinks}
                    shelf={book.shelf}
                    title={book.title}
                    authors={book.authors}
                    id={book.id}
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
