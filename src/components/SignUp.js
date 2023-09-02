import React, { useEffect, useState } from "react";
import Headers from "./Headers";
import Footer from "./Footer";
import 'semantic-ui-css/semantic.min.css';
import cryptoJS from "crypto-js";
import API_STUDENT from "../services/API_STUDENT";
import { Button, Container, Divider, Form, Grid, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState("")
    const [passwd, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [students, setStudents] = useState([])
    const [address, setAddress] = useState("")
    const [dob, setDob] = useState("")
    const [fullname, setFullname] = useState("")

    const [msg, setMsg] = useState("")

    useEffect(() => {
        getStudents();
    })


    const getStudents = () => {
        API_STUDENT.get("/")
        .then((res) => setStudents(res.data))
        .catch(console.error)
    }

    const student_signup = () => {
        var count = 0
        students.map((student) => {
            if(student.username === username){
                ++count
            }
        })
        if(username === "" || passwd === "" || confirmPassword === "" || address === "" || dob === "" || fullname === ""){
            setMsg("No Empty fields")
        }else if(passwd !== confirmPassword){
            setMsg("Passwords Do not Match")
        }else if(count > 0){
           setMsg("Username Already Exists")
        }else{
            var password = cryptoJS.SHA256(passwd).toString()
            let item = {username, password, dob, address, fullname}
            API_STUDENT.post("/", item)
            .then(() => setMsg("Sign Up Was Successful"))
            .catch(console.error)
        }
        
    }

    return(
        <div>
            <Segment vertical style={{padding: '3em 0em'}}>
                <Container>
                    <Grid textAlign="center">
                        <Grid.Row>
                            <Grid.Column style={{maxWidth: 500}}>
                                <Segment raised>    
                                    <Form size="large" style={{padding: '1em 2em'}}>
                                    <Header 
                                        content="Sign Up"
                                    />
                                    <Divider />
                                        <Form.Field style={{textAlign: 'left'}}>
                                            <label>Full Name</label>
                                            <Form.Input 
                                                type="text" 
                                                value={fullname}
                                                placeholder='Enter your full name'
                                                onChange={(e) => setFullname(e.target.value)}
                                                onFocus={() => setMsg("")}
                                            />
                                        </Form.Field>
                                        <Form.Field style={{textAlign: 'left'}}>
                                            <label>Username</label>
                                            <Form.Input 
                                                type="text" 
                                                value={username}
                                                placeholder='Enter your username'
                                                onChange={(e) => setUsername(e.target.value)}
                                                onFocus={() => setMsg("")}
                                            />
                                        </Form.Field>
                                        <Form.Field style={{textAlign: 'left'}}>
                                            <label>Password</label>
                                            <Form.Input 
                                                type="password" 
                                                value={passwd}
                                                placeholder='Enter your password'
                                                onChange={(e) => setPassword(e.target.value)}
                                                onFocus={() => setMsg("")}
                                            />
                                        </Form.Field>
                                        <Form.Field style={{textAlign: 'left'}}>
                                            <label>Confirm Password</label>
                                            <Form.Input 
                                                type="password" 
                                                value={confirmPassword}
                                                placeholder='Re-enter password'
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                onFocus={() => setMsg("")}
                                            />
                                        </Form.Field>
                                        <Form.Field style={{textAlign: 'left'}}>
                                            <label>Birth Date</label>
                                            <Form.Input 
                                                type="date" 
                                                value={dob}
                                                placeholder='Enter your DOB'
                                                onChange={(e) => setDob(e.target.value)}
                                                onFocus={() => setMsg("")}
                                            />
                                        </Form.Field>
                                        <Form.Field style={{textAlign: 'left'}}>
                                            <label>Address</label>
                                            <Form.TextArea 
                                                value={address}
                                                placeholder='Enter your address'
                                                onChange={(e) => setAddress(e.target.value)}
                                                onFocus={() => setMsg("")}
                                            />
                                        </Form.Field>
                                        <Form.Field style={{textAlign: 'left'}}>
                                            <Button 
                                                primary
                                                onClick={() => student_signup()}
                                            >
                                                Sign Up
                                            </Button>
                                            <span style={{color: "red"}}>{msg}</span>
                                        </Form.Field>
                                        <Form.Field>
                                            <span>
                                                Already have an account? <Link to="/users">Sign In</Link>
                                            </span>
                                        </Form.Field>
                                    </Form>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </div>
    )
}

export default SignUp;