import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search.js'
import Shelf from './Shelf.js'

const shelfTitles = [{title: 'currentlyReading'},{title: 'wantToRead'},{title: 'read'}]

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyReading :[],
      wantToRead : [],
      read : []
      }

    // This binding is necessary to make `this` work in the callback
    this.moveBook = this.moveBook.bind(this);
    this.getAllBooks = this.getAllBooks.bind(this);
    }
  
  

    componentDidMount(){
      this.getAllBooks()
    }

    getAllBooks(){
      BooksAPI.getAll().then((books) => {
        this.setState(() =>({
          currentlyReading : books.filter((book) => book.shelf === 'currentlyReading'),
          wantToRead : books.filter((book) => book.shelf === 'wantToRead'),
          read : books.filter((book) => book.shelf === 'read')
        }))
      })
    }

    moveBook(book, shelf) {
      BooksAPI.update(book, shelf).then(() => {this.getAllBooks()})
    }
     

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelf goToSearch={this.searchBooks} shelfTitles={shelfTitles} currentBooksOnShelves={this.state} onUpdate={this.moveBook}/>
        )}/>
        <Route exact path='/search' render={() =>(
          <Search goToShelves={this.viewShelves} onQuery={this.searchBooks} onUpdate={this.moveBook} currentBooksOnShelves={this.state}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
