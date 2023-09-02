import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API_READ_BOOKS from "../services/API_READ_BOOKS";
import { Button, Container, Divider, Grid, Header, Icon, Segment } from "semantic-ui-react";

const ReadBook = () => {
    const [docs, setDocs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getDocs();
    }, [])

    const getDocs = () => {
        API_READ_BOOKS.get("/")
        .then((res) => setDocs(res.data))
        .catch(console.error)
    }

    const params = useParams()
    return(
        <div>
            <Segment vertical style={{backgroundColor: '#F4F6F6', padding: '2em 0em'}}>
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign="center">
                                <Header
                                    content={params.bookname} 
                                    size="huge"
                                />
                                <Divider />
                            </Grid.Column>    
                        </Grid.Row>
                        {
                            docs.map((doc) => {
                                if(doc.book_id == params.bookid){
                                    return(
                                        <Segment style={{margin: '0em 1em'}}>
                                            <Container>
                                                <Grid>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <Header 
                                                                content='Overview'
                                                            />
                                                            <p style={{fontSize: '1.1em'}}>
                                                                {doc.overView}
                                                            </p>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <Header 
                                                                content='Introduction'
                                                            />
                                                            <p style={{fontSize: '1.1em'}}>
                                                                {doc.introduction}
                                                            </p>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <Header 
                                                                content='Content'
                                                            />
                                                            <p style={{fontSize: '1.1em'}}>
                                                                {doc.content}
                                                            </p>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Container>
                                        </Segment>
                                    )
                                }
                            })
                        }
                        <Grid.Row>
                            <Grid.Column>
                                <Button 
                                    primary
                                    onClick={() => {navigate("/useraccount")}}
                                >
                                    <Icon name="arrow left" />Back
                                </Button>                                                                  
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </div>
    )
}

export default ReadBook;