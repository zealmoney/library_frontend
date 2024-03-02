import { useEffect, useState } from "react"
import { Container, Header, Icon, Menu, Segment } from "semantic-ui-react"
import API_REQUESTED_BOOKS from "../services/API_REQUESTED_BOOKS"
import { Link } from "react-router-dom"

const Headers = () => {
    const [requestedBooks, setRequestedBooks] = useState([])
    const [itemCount, setItemCount] = useState(0)
    
    var count = 0

    var session_id = sessionStorage.getItem("student_id")
    var session_username = sessionStorage.getItem("student_username")

    useEffect(() => {
        getRequestedBooks();
        requestedBooks.map((requestedBook) => {
            if(requestedBook.student_id == session_id){
                ++count
                setItemCount(count)
            }
        })
    })

    const getRequestedBooks = () => {
        API_REQUESTED_BOOKS.get("/")
        .then((res) => setRequestedBooks(res.data))
        .catch(console.error)
    }

    var session_username = sessionStorage.getItem("student_username")
    var session_id = sessionStorage.getItem("student_id")

    if(session_username === null && session_id === null){
        return(
            <div>
                <Segment
                    vertical
                    style={{padding: '1em 0em'}}
                >
                    <Menu
                        fixed="top"
                        size="huge"
                        secondary
                        pointing
                        style={{backgroundColor: '#FFF'}}
                    >
                        <Container>
                            <Menu.Item as='a'>
                                <Link to="/"><h3>Zee Library</h3></Link>
                            </Menu.Item>
                            <Menu.Item as='a' position="right">
                                <Link to="/" style={{color: '#000'}}>Home</Link>
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <Link to="/users" style={{color: '#000'}}><Icon name="sign in" />Sign In</Link>
                            </Menu.Item>
                        </Container>
                    </Menu>
                </Segment>
            </div>
        )
    }else{
        return(
            <div>
                <Segment
                    vertical
                    style={{padding: '1em 0em'}}
                >
                    <Menu
                        fixed="top"
                        size="huge"
                        secondary
                        pointing
                        style={{backgroundColor: '#FFF'}}
                    >
                        <Container>
                            <Menu.Item as='a'>
                                <h3>Library System</h3>
                            </Menu.Item>
                            <Menu.Item as='a' position="right">
                                <Link to="/" style={{color: '#000'}}>Home</Link>
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <Link to="/requestbook" style={{color: '#000'}}>Requested books</Link>
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <Link to="/useraccount" style={{color: '#000'}}>{session_username}</Link>
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <Link to="/logout" style={{color: '#000'}}><Icon name="logout" />Log out</Link>
                            </Menu.Item>
                        </Container>
                    </Menu>
                </Segment>
            </div>
        ) 
    }
    
}
export default Headers