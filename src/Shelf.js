import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ShelfItem from './ShelfItem'

class Shelf extends Component{

    
    render(){
        
        return(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {this.props.shelfTitles.map((shelf) => (
              <div key={shelf.title} className="list-books-content">
                <div className="bookshelf">
                  <h2  className="bookshelf-title">{shelf.title}</h2>
                  <div className="bookshelf-books">
                    
                      <ShelfItem currentBooksOnShelves={this.props.currentBooksOnShelves} shelf={shelf.title} updateBook={this.props.onUpdate}/>
                    
                  </div>
                </div>
            </div>
            ))}
            

            <div className="open-search">
             <Link to='/search'>
               <button>Add a book</button>
             </Link>
            </div>
        </div>
        )
    }
}

export default Shelf
