import { useEffect, useState } from "react";
import API from "../services/API";
import API_ISSUED_BOOKS from "../services/API_ISSUED_BOOKS";
import moment from 'moment';
import { Link } from "react-router-dom";
import Footer from "./Footer";
import AdminUserHeader from "../Admin/AdminUserHeader";
import { Container, Grid, Image, List, Segment } from "semantic-ui-react";


const BooksIssued = () => {
    const [books, setBooks] = useState([])
    const [issuedBooks, setIssuedBooks] = useState([])
        

    useEffect(() => {
        getBooks();
        getIssuedBooks();
    }, []
    )

    const getBooks = () => {
        API.get("/")
        .then((res) => setBooks(res.data))
        .catch(console.error)
    }

    const getIssuedBooks = () => {
        API_ISSUED_BOOKS.get("/")
        .then((res) => setIssuedBooks(res.data))
        .catch(console.error)
    }
    
    return(
        <div className="">
            <Segment vertical style={{padding: '3em 0em'}}>
                <Container>
                    <Grid stackable>
                        <Grid.Row>
                            {
                                issuedBooks.map((book) => {
                                    return(
                                        books.map((newBook) => {
                                            if(book.book === newBook.id){
                                                return(
                                                    <Grid.Column width={4}>
                                                        <Segment>
                                                            <Image centered fluid src={newBook.book_image}  />
                                                            <List relaxed divided>
                                                                <List.Item>{newBook.name}</List.Item>
                                                                <List.Item>{moment(book.dateissued).format('MMMM Do YYYY')}</List.Item>
                                                                <List.Item>{book.student}</List.Item>
                                                            </List>
                                                        </Segment>
                                                    </Grid.Column>
                                                )
                                            }
                                        })
                                    )
                                })
                            }
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </div>
    )

}

export default BooksIssued;