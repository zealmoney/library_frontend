import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Menu, Segment } from "semantic-ui-react";

const AdminUserHeader = () => {
    const navigate = useNavigate()

    return(
        <Segment vertical style={{padding: '0em 0em'}}>
            <Menu
                fixed="top"
                pointing
                secondary
                size="huge"
                style={{backgroundColor: '#fff'}}
            >
                <Container>
                    <Menu.Item 
                        as="a"
                        onClick={() => navigate("/admin")}
                    >
                        Admin
                    </Menu.Item>
                    <Menu.Item 
                        as="a" 
                        position="right"
                        onClick={() => navigate("/issueabook")}
                    >
                        Issue Book
                    </Menu.Item>
                    <Menu.Item 
                        as="a"
                        onClick={() => navigate("/booksissued")}
                    >
                        Books Issued
                    </Menu.Item>
                    <Menu.Item 
                        as="a"
                        onClick={() => navigate("/adminlogout")}
                    >
                        Log Out
                    </Menu.Item>
                </Container>
            </Menu>
        </Segment>
    )

}

export default AdminUserHeader;