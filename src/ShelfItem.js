
import React, { Component } from 'react' 

class ShelfItem extends Component{
  state = {
    moveTo : ''
  }

  handleChange = (b, e) =>{
    this.setState({moveTo: e.target.value}, () => {this.props.updateBook(b, this.state.moveTo)}) 
  }
  

render(){
  let booksList = []
  const shelf = this.props.shelf
  if(shelf === 'currentlyReading'){
    booksList = this.props.currentBooksOnShelves.currentlyReading
  }else if(shelf === 'wantToRead'){
    booksList = this.props.currentBooksOnShelves.wantToRead
  }else if(shelf === 'read'){
    booksList = this.props.currentBooksOnShelves.read
  }else{
    booksList = this.props.searchedBooks
    for(let book of booksList){
      if(this.props.currentBooksOnShelves.currentlyReading.some(el => el.title === book.title)){
        book["shelf"] = "currentlyReading"
      }else if(this.props.currentBooksOnShelves.wantToRead.some(el => el.title === book.title)){
        book["shelf"] = "wantToRead"
      }else if(this.props.currentBooksOnShelves.read.some(el => el.title === book.title)){
        book["shelf"] = "read"
      }else{
        book["shelf"] = "none"
      }
    }
  }
      return(
        <ol className="books-grid">
        {booksList.map(book => (
          <li key={book.title}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select defaultValue={
                      (book.shelf === "currentlyReading" || book.shelf === "wantToRead" || book.shelf === "read"
                        ? book.shelf
                        : 'none'
                      )
                    } value={this.state.value} onChange={(e) => this.handleChange(book, e)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
        </ol>
                      
      )
}
    
}

export default ShelfItem