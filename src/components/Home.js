import React from "react";
import { useState, useEffect } from "react";
import API from "../services/API";
import moment from 'moment';
import { Link, useParams } from "react-router-dom";
import { Button, Container, Dimmer, Grid, Header, Image, List, Loader, Segment } from "semantic-ui-react";
import PaginationComponent from "./PaginationComponent";


const Home = () => {
    const [books, setBooks] = useState([])
    const [active, setActive] = useState(true)

    useEffect(() => {
        getBooks();
        if(books.length > 0){
            setActive(false)
        }
    }
    )

    const getBooks = () => {
        API.get("/")
        .then((res) => setBooks(res.data))
         .catch(console.error)
    }

    const params = useParams()

    if(active){
        return(
            <Segment style={{padding: '17em 0em'}}>
            <Dimmer inverted active={active}>
                <Loader size="massive">
                    Loading
                </Loader>
            </Dimmer>
            </Segment>
        )
    }else{
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

                                    let lastItemId = params.pageno * 8
                                    let firstItemId = lastItemId - 7
                                    
                                    if(book.id >= 1 && book.id <= 8){
                                    return(
                                        <Grid.Column width={4} style={{padding: '1em 1em'}}>
                                            <Segment raised>
                                                <Grid>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                                <Header 
                                                                    content={book.name.substring(0, 25)}
                                                                />                                                        
                                                            <Image centered fluid src={"https://res.cloudinary.com/dfsyvrhom/" + book.book_image} />
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
                                    }
                                })
                            }
                        </Grid.Row> 
                        {
                        /*<Grid.Row>
                            <Grid.Column textAlign="center">
                                <PaginationComponent />
                            </Grid.Column>
                        </Grid.Row>*/
                        }   
                    </Grid>
                </Container>
            </Segment>
        </div>
    )
    }
};

export default Home;