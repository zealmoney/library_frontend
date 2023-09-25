import React from "react";
import Admin_Headers from "../Admin/Admin_Headers";
import Footer from "../components/Footer";
import { Container, Grid, Image, Segment } from "semantic-ui-react";

const AdminHomePage = () => {
    return(
        <div>
            <Admin_Headers />
            <Segment vertical style={{padding: '10em 0em'}}>
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column style={{width: "400px", margin: "auto"}}>
                                <Image style={{width: "400px"}} src="images/library.jpg" />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
            <Footer />
        </div>
    )
}

export default AdminHomePage;