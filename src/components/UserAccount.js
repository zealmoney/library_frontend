import React from "react";
import 'semantic-ui-css/semantic.min.css'
import Headers from "./Headers";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_STUDENT from "../services/API_STUDENT";
import API_ISSUED_BOOKS from "../services/API_ISSUED_BOOKS";
import API from "../services/API";
import moment from "moment";
import { Container, Divider, Grid, Header, Icon, List, Segment, Table } from "semantic-ui-react";

const UserAccount = () => {
    var session = sessionStorage.getItem("student_username")
    var id = sessionStorage.getItem("student_id")

    const [students, setStudents] = useState([])
    const [books, setBooks] = useState([])
    const [booksIssued, setBooksIssued] = useState([])

    useEffect(() => {
        getStudents();
        getBooks();
        getBooksIssued();
    }, [])

    const getStudents = () => {
        API_STUDENT.get("/")
        .then((res) => setStudents(res.data))
        .catch(console.error)
    }

    const getBooks = () => {
        API.get("/")
        .then((res) => setBooks(res.data))
        .catch(console.error)
    }

    const getBooksIssued = () => {
        API_ISSUED_BOOKS.get("/")
        .then((res) => setBooksIssued(res.data))
        .catch(console.error)
    }

    return(
        <div>
            <Segment vertical style={{padding: '6em 0em'}}>
                <Container>
                    <Grid stackable>
                        {
                            students.map((student) => {
                                if(student.id == id){
                                    return(
                                        <Grid.Row>
                                            <Grid.Column width={4}>
                                                <Segment>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column>
                                                                <Header>
                                                                    Welcome, {student.fullname}
                                                                </Header>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Divider />
                                                        <Grid.Row>
                                                            <Grid.Column>
                                                                <List relaxed size="large">
                                                                    <List.Item>
                                                                        <Icon name="student" />
                                                                        Student Id: {"000" + student.id}
                                                                    </List.Item>
                                                                    <List.Item>
                                                                        <Icon name="user outline" />
                                                                        Username: {student.username}
                                                                    </List.Item>
                                                                    <List.Item>
                                                                        <Icon name="calendar outline" />
                                                                        Birth Date: {student.dob}
                                                                    </List.Item>
                                                                    <List.Item>
                                                                        <Icon name="address book outline" />
                                                                        Address: {student.address}
                                                                    </List.Item>
                                                                </List>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Segment>
                                            </Grid.Column>
                                            <Grid.Column width={12}>
                                                <Segment>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column>
                                                                <Header 
                                                                    content='Current Books Borrowed'
                                                                />
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Divider />
                                                        <Grid.Row>
                                                            <Grid.Column>
                                                                <div style={{overflowX: 'scroll'}}>
                                                                    <Table celled unstackable>
                                                                        <Table.Header>
                                                                            <Table.Row>
                                                                                <Table.HeaderCell>Book Name</Table.HeaderCell>
                                                                                <Table.HeaderCell> Author</Table.HeaderCell>
                                                                                <Table.HeaderCell> Borrowed Date</Table.HeaderCell>
                                                                                <Table.HeaderCell>View</Table.HeaderCell>
                                                                                <Table.HeaderCell>Return</Table.HeaderCell>
                                                                            </Table.Row>
                                                                        </Table.Header>
                                                                        <Table.Body>
                                                                            {
                                                                                booksIssued.map((bookissued) => {
                                                                                    return(
                                                                                        books.map((book) => {
                                                                                            if(bookissued.book === book.id && bookissued.stud_id == id){
                                                                                                return(
                                                                                                    <Table.Row key={book.id}>
                                                                                                        <Table.Cell>{book.name}</Table.Cell>
                                                                                                        <Table.Cell>{book.author}</Table.Cell>
                                                                                                        <Table.Cell>{moment(bookissued.dateissued).format("MMMM Do YYYY")}</Table.Cell>
                                                                                                        <Table.Cell><Link to={"/readbook" + "/" + book.id + "/" + book.name}>Read</Link></Table.Cell>
                                                                                                        <Table.Cell><Link to={"/returnbook" + "/" + bookissued.id + "/" + book.id + "/" 
                                                                                                                    + book.name + "/" + bookissued.stud_id + "/" + bookissued.student}>Return Book</Link></Table.Cell>
                                                                                                    </Table.Row>
                                                                                                )
                                                                                            }
                                                                                        })
                                                                                    )
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
                                    )
                                }
                            })
                            
                        }
                    </Grid>
                </Container>
            </Segment>
        </div>
    )
}

export default UserAccount;