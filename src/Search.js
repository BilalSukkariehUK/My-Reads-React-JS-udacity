import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ShelfItem from './ShelfItem'
import * as BooksAPI from './BooksAPI'

const searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
const pStyle = {
  marginTop: '60px',
  textAlign: 'center'

}
class Search extends Component{

  state = {
    searchedBooks : [],
    validQuery : false
  }

  searchBooks(query){
    let upperCase = query.charAt(0).toUpperCase() + query.slice(1);
    if(upperCase.trim() !== '' && searchTerms.includes(upperCase.trim())){
      BooksAPI.search(query.trim()).then(books => {
        this.setState(() =>({
          searchedBooks: books,
          validQuery : true
        }))
      })
    }else{
      this.setState({
        searchedBooks : [],
        validQuery: false
      })
    }
  }

    render(){

        return(
        <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'>
              <button className="close-search" >Close</button>
              </Link>
              
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(e) => this.searchBooks(e.target.value)}/>

              </div>
            </div>
              {!this.state.validQuery 
                ? <p style={pStyle}>please enter a valid search term, check valid terms at <a href='https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md'>Valid Terms</a> </p>
                : null
              }
            <div className="search-books-results">
              <ShelfItem searchedBooks={this.state.searchedBooks} updateBook={this.props.onUpdate} currentBooksOnShelves={this.props.currentBooksOnShelves}/>
            </div>
          </div>
        )
        
    }
}

export default Search