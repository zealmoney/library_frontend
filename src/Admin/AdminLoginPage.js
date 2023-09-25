import React, { useEffect, useState } from "react";
import 'semantic-ui-css/semantic.min.css'
import Admin_Headers from "./Admin_Headers";
import Footer from "../components/Footer";
import API_USERS from "../services/API_USERS";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Grid, Header, Segment } from "semantic-ui-react";

const AdminLoginPage = () => {
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [msg, setMsg] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        API_USERS.get("/")
        .then((res) => setUsers(res.data))
        .catch(console.error)
    }

    const adminLogin = () => {
        var count = 0
        var password_ash = CryptoJS.SHA256(password).toString()
        users.map((user) => {
            if(username === user.username && password_ash === user.password){
                ++count
            }
        })

        if(username === "" || password === ""){
            setMsg("No Empy Fields")
        }else if(count == 0){
            setMsg("Invalid Username or Password")
        }else if(count > 0){
            navigate("/issueabook")           
        }
    }

    return(
        <div>
            <Admin_Headers />
            <Segment vertical style={{padding: '8em 0em'}}>
                <Grid stackable textAlign="center">
                    <Grid.Row>
                        <Grid.Column style={{maxWidth: 500}}>
                            <Segment raised>
                                <Form size="large">
                                    <Header
                                        content="Admin Login" 
                                    />
                                    <Divider />
                                    <Form.Field style={{textAlign: 'left'}}>
                                        <label>Username</label>
                                        <Form.Input 
                                            type="text"
                                            placeholder="Username"
                                            onChange={(e) => setUsername(e.target.value)}
                                            onFocus={() => setMsg("")}
                                        />
                                    </Form.Field>
                                    <Form.Field style={{textAlign: 'left'}}>
                                        <label>Password</label>
                                        <Form.Input 
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={() => setMsg("")}
                                        />
                                    </Form.Field>
                                    <Form.Field style={{textAlign: 'left'}}>
                                        <Button
                                            type="button"
                                            primary
                                            size="large"
                                            onClick={() => adminLogin()}
                                        >
                                            Login
                                        </Button>
                                        <span style={{color: 'red'}}>{msg}</span>
                                    </Form.Field>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Footer />
        </div>
    )
}

export default AdminLoginPage;