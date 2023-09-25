import API from "../services/API";
import API_STUDENT from "../services/API_STUDENT";
import { useState, useEffect } from "react";
import API_ISSUED_BOOKS from "../services/API_ISSUED_BOOKS";
import API_REQUESTED_BOOKS from "../services/API_REQUESTED_BOOKS";
import moment from "moment";
import { Button, Container, Divider, Form, Grid, Header, Icon, Image, Input, Segment, Table } from "semantic-ui-react";
import AdminUserHeader from "../Admin/AdminUserHeader";
import Footer from "./Footer";

const IssueABook = () => {
    const [requestedBooks, setRequestedBooks] = useState([])

    const [books, setBooks] = useState([])
    const [book_name, setBookName] = useState("")
    const [pub_date, setPubDate] = useState("")
    const [no_pages, setNoPages] = useState("")

    const [students, SetStudents] = useState([])
    const [student_full_name, setStudentFullName] = useState("")
    const [student_birth_date, setStudentBirthDate] = useState("")
    const [student_address, setStudentAddress] = useState("")   

    const [msg, setMsg] = useState("")

    useEffect(() => {
        getBooks();
        getStudents();
        getRequestedBooks();
    }, []
    )

    const getRequestedBooks = () => {
        API_REQUESTED_BOOKS.get("/")
        .then((res) => setRequestedBooks(res.data))
        .catch(console.error)
    }

    const getStudents = () => {
        API_STUDENT.get("/")
        .then((res) => SetStudents(res.data))
        .catch(console.error)
    }

    const getBooks = () => {
        API.get("/")
        .then((res) => setBooks(res.data))
        .catch(console.error)
    }
    const issuedBook = () => {
        if(book_name === "" || pub_date === "" || no_pages === "" || 
        student_full_name === "" || student_birth_date === "" || student_address === ""){
            setMsg("Fill in all fields")
              
        }else{
            let newBook = books.filter((b) => b.name === book_name)[0]
            let book = newBook.id

            let student_id = document.getElementById("sid").value;
            let sid = parseInt(student_id)
            let new_student = students.filter((s) => s.id === sid)[0]
            let student = new_student.fullname
            let stud_id = sid
           
            let available = false
            let item1 = {available}
            API.patch(`/${book}/`, item1 )


            let item = {book, student, stud_id}
            API_ISSUED_BOOKS.post("/", item)
            .then(() => setMsg("Book has been issued"))
            .catch(console.error)

            let newRequested_book = requestedBooks.filter((b) => b.book_name === book_name)[0]
            let id = newRequested_book.id
            let request_status = true
            let item2 = {request_status}
            API_REQUESTED_BOOKS.patch(`/${id}/`, item2)
            .catch(console.error)
        }
    }

    const updateBooks = () => {
        let book = document.getElementById("bk").value
        let newBook = books.filter((b) => b.name === book)[0]
        setBookName(newBook.name)
        setPubDate(newBook.pub_date)
        setNoPages(newBook.no_pages)
    } 

    const updateStudents = () => {
        let s_id = document.getElementById("sid").value
        let sid = parseInt(s_id)
        let new_student = students.filter(s => s.id === sid)[0]
        let fullname = new_student.fullname
        setStudentFullName(fullname)
        setStudentBirthDate(new_student.dob)
        setStudentAddress(new_student.address)
    }

    const clearMsg = () => {
        setMsg("")
    }

    const deleteRequest = (id) => {

        API_REQUESTED_BOOKS.delete(`/${id}/`)
        
        
    }

    return(
        <div>
            <Segment vertical style={{padding: '5em 0em'}}>
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Segment>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Header 
                                                    content='Requested Books'
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Divider style={{marginBottom: '0em', marginTop: '0em'}} />
                                        <Grid.Row>
                                            <Grid.Column>
                                            <div style={{overflowX: 'scroll'}}>
                                                <Table unstackable>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell>Book Image</Table.HeaderCell>
                                                            <Table.HeaderCell>Book ID</Table.HeaderCell>
                                                            <Table.HeaderCell>Book Name</Table.HeaderCell>
                                                            <Table.HeaderCell>Student ID</Table.HeaderCell>
                                                            <Table.HeaderCell>Student Name</Table.HeaderCell>
                                                            <Table.HeaderCell>Request  Date</Table.HeaderCell>
                                                            <Table.HeaderCell>Request  Status</Table.HeaderCell>
                                                            <Table.HeaderCell>Due Date</Table.HeaderCell>
                                                            <Table.HeaderCell>Delete Request</Table.HeaderCell>
                                                        </Table.Row> 
                                                    </Table.Header>
                                                    <Table.Body>
                                                        {
                                                            requestedBooks.map((book) => {
                                                                return(
                                                                    <Table.Row key={book.id}>
                                                                        <Table.Cell>
                                                                            <Image className="ui avatar image" src={"https://res.cloudinary.com/dfsyvrhom/" + book.book_image} />
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                            {book.book_id}
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                            {book.book_name}
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                            {book.student_id}
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                            {book.student_name}
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                            {moment(book.request_date).format("MMMM Do YYYY")}
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                            <Input type="checkbox" checked={book.request_status} />
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                            --
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                            <span>
                                                                                <Icon name="trash" onClick={() => deleteRequest(book.id)} />
                                                                            </span>
                                                                        </Table.Cell>
                                                                    </Table.Row>
                                                                )
                                                            })
                                                        }
                                                    </Table.Body>
                                                </Table>
                                            </div>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Segment>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Header 
                                                    content='Book Details'
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Divider style={{marginBottom: '0em', marginTop: '0em'}} />
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form size="large">
                                                    <Form.Group widths="equal">
                                                        <Form.Field>
                                                            <label>Select Book</label>
                                                            <select
                                                                onChange={() => updateBooks()}
                                                                value={book_name}
                                                                id="bk"
                                                                onFocus={() => clearMsg()}
                                                            >
                                                                <option>Select Book</option>
                                                                {
                                                                    books.map((book) => {
                                                                        if(book.available){
                                                                            return(
                                                                                <option key={book.name} value={book.name}>{book.name}</option>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </select>
                                                        </Form.Field>
                                                        <Form.Field>
                                                            <label>Book Name</label>
                                                            <Form.Input 
                                                                type="text" 
                                                                placeholder="search a book" 
                                                                value={book_name} 
                                                                onChange={(e) => setBookName(e.target.value)}
                                                            />
                                                        </Form.Field>
                                                        <Form.Field>
                                                            <label>Publication Date</label>
                                                            <Form.Input 
                                                                type="text" 
                                                                placeholder="Date of Publication" 
                                                                value={pub_date} 
                                                                onChange={(e) => setPubDate(e.target.value)}
                                                            />
                                                        </Form.Field>
                                                        <Form.Field>
                                                            <label>Number of Pages</label>
                                                            <Form.Input 
                                                                type="text" 
                                                                placeholder="No of Pages" 
                                                                value={no_pages}
                                                                onChange={(e) => setNoPages(e.target.value)}
                                                            />
                                                        </Form.Field>
                                                    </Form.Group>
                                                    <Form.Group widths="equal">
                                                        <Form.Field>
                                                            <label>Select ID</label>
                                                            <select 
                                                                id="sid" 
                                                                onChange={() => updateStudents()} 
                                                                onFocus={() => clearMsg()}
                                                            >
                                                                <option>Choose ID</option>
                                                                {
                                                                    students.map((student) => {
                                                                        return(      
                                                                            <option key={student.id} value={student.id}>{student.id}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select> 
                                                        </Form.Field> 
                                                        <Form.Field>
                                                            <label>Student Name</label>
                                                            <Form.Input 
                                                                type="text" 
                                                                value={student_full_name}
                                                                onChange={(e) => setStudentFullName(e.target.value)}
                                                            />
                                                        </Form.Field>
                                                        <Form.Field>
                                                            <label>Birth Date</label>
                                                            <Form.Input type="text" 
                                                                value={student_birth_date}
                                                                onChange={(e) => setStudentBirthDate(e.target.value)}
                                                            />
                                                        </Form.Field> 
                                                        <Form.Field>
                                                            <label>Address</label>
                                                            <Form.Input type="text" 
                                                                value={student_address}
                                                                onChange={(e) => setStudentAddress(e.target.value)}
                                                            />
                                                        </Form.Field>              
                                                    </Form.Group>
                                                    <Form.Field>
                                                        <Button
                                                            size="large"
                                                            primary
                                                            onClick={() => issuedBook()}
                                                        >
                                                            Issue Book
                                                        </Button>
                                                    </Form.Field>
                                                    <span>{msg}</span>
                                                </Form>
                                            </Grid.Column>
                                        </Grid.Row> 
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        
                    </Grid>
                </Container>
            </Segment>
        </div>
        
    )

}

export default IssueABook;