<div className="ui stackable four column grid">

                {
                    books.map((book) =>{
                        let output = ""
                        if (book.available){
                            output = "This Book is not issued"
                        }else{
                            output = "This book has been issued"
                        }
                        return(
                            <div className="column">
                                <div className="ui card">
                                    <div className="image">
                                        <img src={book.book_image} alt="image not seen" />
                                    </div>
                                    <div className="content">
                                        <div className="header">
                                            <Link to={'bookdetails/' + book.author + '/' + book.id}>{book.name}</Link>
                                            
                                        </div>
                                        <div className="meta">
                                            {moment(book.pub_date).format('MMMM Do YYYY')}
                                        </div>
                                        <div className="description">
                                            <p> Language: {book.book_lang}</p>
                                            <p>Isbn no: {book.book_isbn10}</p>
                                        </div>
                                        <div className="extra content">
                                            <p>Author: {book.author}</p>
                                            <p>Availability:
                                                {output} 
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <br/><br/>
            <div className="ui centered header">
                <div className="ui pagination menu">
                    <a className="item" type="prevItem" 
                    value="1"
                    onClick={() => paginationHolder(previousURL)}
                    >
                        <i className="ui step backward icon"></i>Previous
                    </a>
                    <a className="item" type="nextItem"
                        value="2"
                        onClick={() => paginationHolder(nextURL)}
                    >
                        <i className="ui step forward icon"></i>Next
                    </a>
                </div>
            </div>