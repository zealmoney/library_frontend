import React, { useEffect, useState } from "react";
import Headers from "./Headers";
import 'semantic-ui-css/semantic.min.css'
import API_REQUESTED_BOOKS from "../services/API_REQUESTED_BOOKS";
import Footer from "./Footer";
import { Container, Divider, Grid, Header, Image, Segment, Table } from "semantic-ui-react";
import moment from "moment";


const RequestedBook = () => {
    const [requestedBooks, setRequestedBooks] = useState([])

    var session_id = sessionStorage.getItem("student_id")
    var session_username = sessionStorage.getItem("student_username")


    useEffect(() => {
        getRequestedBooks();
    }, [])

    const getRequestedBooks = () => {
        API_REQUESTED_BOOKS.get("/")
        .then((res) => setRequestedBooks(res.data))
        .catch(console.error)
    }

    return(
       <div>
            <Segment vertical style={{padding: '6em 0em 15em'}}>
                <Container>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Segment>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Header 
                                                    content='List of requested books'
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Divider />
                                        <Grid.Row>
                                            <Grid.Column>
                                                <div style={{overflowX: 'scroll'}}>
                                                    <Table unstackable>
                                                        <Table.Header>
                                                            <Table.Row>
                                                                <Table.HeaderCell>Book Image</Table.HeaderCell>
                                                                <Table.HeaderCell>Book ID</Table.HeaderCell>
                                                                <Table.HeaderCell>Book Name</Table.HeaderCell>
                                                                <Table.HeaderCell>Student ID</Table.HeaderCell>
                                                                <Table.HeaderCell>Student Name</Table.HeaderCell>
                                                                <Table.HeaderCell>Request Date</Table.HeaderCell>
                                                                <Table.HeaderCell>Due Date</Table.HeaderCell>
                                                                <Table.HeaderCell>Approved Status</Table.HeaderCell>    
                                                            </Table.Row>
                                                        </Table.Header>
                                                        <Table.Body>
                                                            {
                                                                requestedBooks.map((book) => {
                                                                    if(book.student_id == session_id){
                                                                        return(
                                                                            <Table.Row>
                                                                                <Table.Cell><Image src={"https://res.cloudinary.com/dfsyvrhom/" + book.book_image} className="ui avatar image" /></Table.Cell>
                                                                                <Table.Cell>{book.book_id}</Table.Cell>
                                                                                <Table.Cell>{book.book_name}</Table.Cell>
                                                                                <Table.Cell>{book.student_id}</Table.Cell>
                                                                                <Table.Cell>{book.student_name}</Table.Cell>
                                                                                <Table.Cell>{moment(book.request_date).format("MMMM Do YYYY")}</Table.Cell>
                                                                                <Table.Cell>--</Table.Cell>
                                                                                <Table.Cell><input type="checkbox" checked={book.request_status} readOnly /></Table.Cell>

                                                                            </Table.Row>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </Table.Body>
                                                    </Table>
                                                </div>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
       </div>
    )
}

export default RequestedBook;