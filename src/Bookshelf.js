import React from "react";
import "./App.css";
import Book from "./Book";

class Bookshelf extends React.Component {
  getTitleOutput() {
    const output = this.props.title.replace(/([a-z](?=[A-Z]))/g, "$1 ");
    return this.capitalizeFirstLetter(output);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.getTitleOutput()}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book, index) => {
              return (
                <li key={index}>
                  <Book
                    shelfChanged={this.props.bookChangedShelf.bind(this)}
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

export default Bookshelf;
