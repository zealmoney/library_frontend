import 'semantic-ui-css/semantic.min.css';
import { Container, Grid, Header, Icon, List, Segment } from 'semantic-ui-react';

const Footer = () => {
    return(
        <Segment vertical style={{backgroundColor: '#000', padding: '3em 0em', marginTop: '0em'}}>
            <Container>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={4} style={{color: '#fff'}}>
                            <Header 
                                content="Our Links"
                                style={{color: '#fff'}}
                            />
                            <List inverted relaxed>
                                <List.Item>Home</List.Item>
                                <List.Item>About Us</List.Item>
                                <List.Item>Contact Us</List.Item>
                                <List.Item>Book an appointment today</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4} style={{color: '#fff'}}>
                            <Header 
                                content="Our Links"
                                style={{color: '#fff'}}
                            />
                            <List inverted relaxed>
                                <List.Item>Home</List.Item>
                                <List.Item>About Us</List.Item>
                                <List.Item>Contact Us</List.Item>
                                <List.Item>Book an appointment today</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4} style={{color: '#fff'}}>
                            <Header 
                                content="Our Links"
                                style={{color: '#fff'}}
                            />
                            <List inverted relaxed>
                                <List.Item>Home</List.Item>
                                <List.Item>About Us</List.Item>
                                <List.Item>Contact Us</List.Item>
                                <List.Item>Book an appointment today</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4} style={{color: '#fff'}}>
                            <Header 
                                content="Social Media Links"
                                style={{color: '#fff'}}
                            />
                            <List relaxed>
                                <List.Item><Icon name='facebook' />Facebook</List.Item>
                                <List.Item><Icon name='tweeter square' />Tweeter</List.Item>
                                <List.Item><Icon name='linkedin square' />Linkedin</List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column style={{color: '#fff'}} textAlign='center'>
                            All Right Reserved @ 2003
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    )
}
export default Footer;