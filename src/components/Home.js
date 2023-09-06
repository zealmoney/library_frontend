import React from "react";
import { useState, useEffect } from "react";
import API from "../services/API";
import moment from 'moment';
import Headers from "./Headers";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Segment } from "semantic-ui-react";
import PaginationComponent from "./PaginationComponent";


const Home = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        getBooks();
    }, []
    )

    const getBooks = () => {
        API.get("/")
        .then((res) => setBooks(res.data))
         .catch(console.error)
    }

    return(
        <div>
            <Segment vertical  style={{padding: '3em 0em'}}>
                <Container>
                    <Grid stackable>    
                        <Grid.Row>
                            {
                                books.map((book) => {
                                    let output = ""
                                    if (book.available){
                                        output = "Book is not issued"
                                    }else{
                                        output = "Book already issued"
                                    }
                                    return(
                                        <Grid.Column width={4} style={{padding: '1em 1em'}}>
                                            <Segment raised>
                                                <Grid>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                                <Header 
                                                                    content={book.name.substring(0, 25)}
                                                                />                                                        
                                                            <Image centered fluid src={book.book_image} />
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <List relaxed divided>
                                                                <List.Item>
                                                                    Published: {moment(book.pub_date).format('MMMM Do YYYY')}
                                                                </List.Item>
                                                                <List.Item>
                                                                    Language: {book.book_lang}
                                                                </List.Item>
                                                                <List.Item>
                                                                    Isbn no: {book.book_isbn10}
                                                                </List.Item>
                                                                <List.Item>
                                                                    Author: {book.author}
                                                                </List.Item>
                                                                <List.Item>
                                                                    Availability: {output}
                                                                </List.Item>
                                                                <List.Item>
                                                                    <Button size="small" primary>
                                                                        <Link style={{color: '#FFF'}} to={"bookdetails/" + book.author + "/" + book.id}>View Details</Link>
                                                                    </Button>
                                                                </List.Item>
                                                            </List>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    
                                                </Grid>    
                                            </Segment>
                                        </Grid.Column>
                                    )
                                })
                            }
                        </Grid.Row>    
                    </Grid>
                </Container>
            </Segment>
        </div>
    )
};

export default Home;