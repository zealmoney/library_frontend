import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Headers from "./Headers";
import API from "../services/API";
import API_RETURN_BOOKS from "../services/API_RETURN_BOOKS";
import API_ISSUED_BOOKS from "../services/API_ISSUED_BOOKS";
import Footer from "./Footer";
import { Button, Container, Divider, Form, Grid, Header, Icon, Segment } from "semantic-ui-react";

const ReturnBook = () => {
    const params = useParams()

    const [books, setBooks] = useState([])

    const [msg, setMsg] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = () => {
        API.get("/")
        .then((res) => setBooks(res.data))
        .catch(console.error)
    }

    const returnBook = () => {
        //let newBook = books.filter((b) => b.id == params.bookid)[0]
        //let id = newBook.id
        let available = true
        let item = {available}
        API.patch(`/${params.bookid}/`, item)
        .catch(console.error)

        let book_id = params.bookid
        let book_name = params.bookname
        let student_id = params.studentid
        let student_name = params.studentname
        let item1 = {book_id, book_name, student_id, student_name}
        API_RETURN_BOOKS.post("/", item1)
        .then(() => setMsg("Book has been returned"))
        .catch(console.error)

        API_ISSUED_BOOKS.delete(`/${params.bookissuedid}/`)
    }

    const btnCancel = () => {
        navigate("/useraccount")
    }

    return(
        <div>
            <Segment vertical style={{padding: '6em 0em'}}>
                <Container>
                    <Segment>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header 
                                        icon="book"
                                        content="Return Book"
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Divider />
                            <Grid.Row>
                                <Grid.Column>
                                    <Form size="large">
                                        <Form.Group widths="equal">
                                            <Form.Field>
                                                <label>Book ID</label>
                                                <Form.Input 
                                                    type="text" 
                                                    value={params.bookid} 
                                                    onChange={(e) => e.target.value}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Book Name</label>
                                                <Form.Input 
                                                    type="text" 
                                                    value={params.bookname} 
                                                    onChange={(e) => e.target.value}
                                                />
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Group widths="equal">
                                            <Form.Field>
                                                <label>Student ID</label>
                                                <Form.Input 
                                                    type="text" 
                                                    value={params.studentid}
                                                    onChange={(e) => e.target.value} 
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Student Name</label>
                                                <Form.Input
                                                    type="text" value={params.studentname} 
                                                    onChange={(e) => e.target.value} 
                                                />
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Field>
                                            <Button
                                                type="button" 
                                                negative
                                                onClick={() => btnCancel()}
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                primary
                                                onClick={() => returnBook()}
                                            >
                                                Return Book
                                            </Button>
                                            <span>{msg}</span>
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Container>
            </Segment>
        </div>

    )
}

export default ReturnBook;