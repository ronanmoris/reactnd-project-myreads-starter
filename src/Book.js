import React from "react";
import "./App.css";

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shelf: props.shelf,
      authors: this.getAuthorsOutput(props.authors)
    };
    this.changeSelf = this.changeSelf.bind(this);
  }

  getAuthorsOutput(authors) {
    if (!authors) return "";
    let result = "";

    authors.forEach((author, index) => {
      result += author + (authors.length - 1 != index ? ", " : "");
    });
    return result;
  }

  changeSelf(e) {
    this.props.shelfChanged(this, e);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          {this.props.imageLinks ? (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: "url(" + this.props.imageLinks.thumbnail + ")"
              }}
            />
          ) : (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193
              }}
            >
              This book has no Image
            </div>
          )}
          <div className="book-shelf-changer">
            <select
              onChange={this.changeSelf.bind(this)}
              value={this.state.shelf}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>

        <div className="book-authors">{this.state.authors}</div>
      </div>
    );
  }
}

export default Book;
