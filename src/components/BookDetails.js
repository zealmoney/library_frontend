import React, { useEffect, useState } from "react";
import Headers from "./Headers";
import { Navigate, useParams } from "react-router-dom";
import API from "../services/API";
import API_AUTHORS from "../services/API_AUTHORS";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import API_REQUESTED_BOOKS from "../services/API_REQUESTED_BOOKS";
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Segment } from "semantic-ui-react";

const BookDetails = () => {
    const [books, setBooks] = useState([])
    const params = useParams()
    const [authors, setAuthors] = useState([])

    const [msg, setMsg] = useState("")

    var session_username = sessionStorage.getItem("student_username")
    var session_id = sessionStorage.getItem("student_id")

    const navigate = useNavigate()

    const getBooks = () => {
        API.get("/")
        .then((res) => setBooks(res.data))
        .catch(console.error)
    }

    useEffect(() => {
        getBooks();
        getAuthors();
    },[]
    )

    const getAuthors = () => {
        API_AUTHORS.get("/")
        .then((res) => setAuthors(res.data))
        .catch(console.error)
    }

    const requestBook = (bookId, bookName, bookImage) => {
        if(session_username === null && session_id === null){
            navigate("/users")
        }else{
            let book_id = bookId
            let book_name = bookName
            let book_image = bookImage
            let student_id = session_id
            let student_name = session_username 
            let item = {book_id, book_name, book_image, student_id, student_name}
            API_REQUESTED_BOOKS.post("/", item)
            .then(() => setMsg("Request has been sent to admin for approval"))
            .catch(console.error)
        }
    }

    return(
        <div>
            <Segment vertical  style={{padding: '6em 0em 10em'}}>
                <Container>
                    <Grid stackable>
                        {
                            books.map((book) => {
                                return(
                                    authors.map((author) => {
                                        if(book.id == params.book_id && author.name == params.author_name){
                                            return(
                                                <Grid.Row> 
                                                    <Grid.Column  width={4}>
                                                        <Segment vertical style={{paddingTop: '0em'}}>
                                                            <Image fluid src={"https://res.cloudinary.com/dfsyvrhom/" + book.book_image} />
                                                        </Segment>
                                                    </Grid.Column>
                                                    <Grid.Column  width={6}>
                                                        <Segment>
                                                            <Grid>
                                                                <Grid.Row>
                                                                    <Grid.Column>
                                                                        <Header 
                                                                            content='Book Details'
                                                                        />
                                                                    </Grid.Column>
                                                                </Grid.Row>
                                                                <Divider />
                                                                <Grid.Row>
                                                                    <Grid.Column>
                                                                        <List size="large" relaxed divided>
                                                                            <List.Item>
                                                                                <Icon name="book" /> {book.name}
                                                                            </List.Item>
                                                                            <List.Item>
                                                                                <Icon name="calendar outline" />{book.pub_date}
                                                                            </List.Item>
                                                                            <List.Item>
                                                                                <Icon name="book" /> {book.no_pages} pages
                                                                            </List.Item>
                                                                            <List.Item>
                                                                                <Icon name="resize horizontal" /> {book.book_dim}
                                                                            </List.Item>
                                                                            <List.Item>
                                                                                <Icon name="book" /> {book.book_isbn10} ISBN 10
                                                                            </List.Item>
                                                                            <List.Item>
                                                                                <Icon name="book" /> {book.book_isbn13} ISBN 13
                                                                            </List.Item>
                                                                            <List.Item>
                                                                                <Icon name="globe" />{book.book_lang}
                                                                            </List.Item>
                                                                            <List.Item>
                                                                                <Button
                                                                                    primary
                                                                                    onClick={() => requestBook(book.id, book.name, book.book_image)}
                                                                                >
                                                                                    Request Book
                                                                                </Button>
                                                                                <span>{msg}</span>
                                                                            </List.Item>
                                                                        </List>
                                                                    </Grid.Column>
                                                                </Grid.Row>
                                                            </Grid>
                                                        </Segment>
                                                    </Grid.Column>
                                                    <Grid.Column  width={6}>
                                                        <Segment>
                                                            <Grid>
                                                                <Grid.Row>
                                                                    <Grid.Column>
                                                                        <Header 
                                                                            content='Author Details'
                                                                        />
                                                                    </Grid.Column>
                                                                </Grid.Row>
                                                                <Divider />
                                                                <Grid.Row>
                                                                    <Grid.Column>
                                                                        <List size="large" relaxed divided>
                                                                            <List.Item>
                                                                                <Image src={"https://res.cloudinary.com/dfsyvrhom/" + author.author_image} className="ui avatar image" />
                                                                                {author.name}
                                                                            </List.Item>
                                                                            <List.Item>
                                                                                <Header 
                                                                                    content='About the author'
                                                                                />
                                                                                {author.about}
                                                                            </List.Item>
                                                                        </List>
                                                                    </Grid.Column>
                                                                </Grid.Row>
                                                            </Grid>
                                                        </Segment>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            )
                                        }
                                    })
                                )
                            })
                        }
                    </Grid>
                </Container>
            </Segment>
        </div>
    )
    
}

export default BookDetails;