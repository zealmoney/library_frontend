import 'semantic-ui-css/semantic.min.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Headers from './Headers';
import Footer from './Footer';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import API_STUDENT from '../services/API_STUDENT';
import { Button, Container, Divider, Form, Grid, Header, Segment } from 'semantic-ui-react';

const UserPage = ({mobile}) => {
    const [username, setUsername] = useState("")
    const [passwd, setPassword] = useState("")
    const [students, setStudents] = useState([])

    const navigate = useNavigate()

    const [msg, setMsg] = useState("")

    useEffect(() => {
        var session = sessionStorage.getItem("student_username")
        if(session === null){
            getStudents();
        }else{
            navigate("/useraccount")
        }
    }, []
    )

    const getStudents = () => {
        API_STUDENT.get("/")
        .then((res) => setStudents(res.data))
        .catch(console.log)
    }

    const signIn = () => {
        var count = 0
        var id = 0
        var password = CryptoJS.SHA256(passwd).toString()
        students.map((student) => {
          if(student.username == username && student.password == password){
            id = student.id
            ++count
          }  
        })
        if(username === "" || passwd === ""){
            setMsg("Enter all fields")
        }else if(count === 0){
            setMsg("Invalid Username or Password")
        }else if(count > 0){
            sessionStorage.setItem("student_username", username)
            sessionStorage.setItem("student_id", id)
            navigate("/useraccount")
        }
      
    }

    return(
        <div>
            <Segment vertical style={{padding: '3em 0em'}}>
                <Container>
                    <Grid textAlign='center'>
                        <Grid.Row>
                            <Grid.Column style={{maxWidth: 500}}>
                                <Segment raised>
                                    <Form size='large' style={{padding: '1em 2em'}}>
                                        <Header
                                            content="Login Details" 
                                        />
                                        <Divider />
                                        <Form.Field>
                                            <label style={{textAlign: 'left'}}>Username</label>
                                            <Form.Input 
                                                type='text' 
                                                value={username}
                                                placeholder='Enter your username'
                                                onFocus={() => setMsg()}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label style={{textAlign: 'left'}}>Password</label>
                                            <Form.Input 
                                                type='password' 
                                                value={passwd}
                                                placeholder='Enter your password'
                                                onFocus={() => setMsg()}
                                                onChange={(e) => setPassword(e.target.value)} 
                                            />
                                        </Form.Field>
                                        <Form.Field style={{textAlign: 'left'}}>
                                            <Button
                                                type='button' 
                                                primary
                                                onClick={() => signIn()}
                                            >
                                                Login
                                            </Button>
                                            <span style={{color: "red"}}>{msg}</span>
                                        </Form.Field>
                                        <Form.Field style={{textAlign: 'left'}}>
                                            <span>
                                                Already have an account? <Link to='/signup'>Click to sign up</Link>
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

export default UserPage;