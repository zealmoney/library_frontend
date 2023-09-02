import { Link, useNavigate } from "react-router-dom";
import { Container, Icon, Menu, Segment } from "semantic-ui-react";

const Admin_Headers = () => {
    const navigate = useNavigate()

    return(
        <Segment 
            vertical
            style={{padding: '0em 0em'}}
        >
            <Menu
                fixed="top"
                pointing
                secondary
                size="huge"
                style={{backgroundColor: '#fff'}}
            >
                <Container>
                    <Menu.Item as="a" onClick={() => {navigate("/admin")}}> Admin Page</Menu.Item>
                    <Menu.Item as="a" position="right" onClick={() => {navigate("/adminlogin")}}><Icon name="sign in" />Login</Menu.Item>
                </Container>
            </Menu>
        </Segment>
    )

}

export default Admin_Headers;