import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Footer from './Footer'
import BooksIssued from './BooksIssued'

const MobileBooksIssued = () => {
    const [sidebarOpened, setSidebarOpened] = useState()

    var session_id = sessionStorage.getItem("student_id")
    var session_username = sessionStorage.getItem("student_username")
    
    return(
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation='overlay'
                vertical
                inverted
                onHide={() => setSidebarOpened(false)}
                visible={sidebarOpened}
            >
                <Menu.Item as="a">
                    <Link to="/admin" style={{color: 'white'}}>Admin</Link>
                </Menu.Item>
                <Menu.Item as='a'>
                    <Link to="/issueabook" style={{color: 'white'}}>Issue Book</Link>
                </Menu.Item>
                <Menu.Item as='a'>
                    <Link to="/booksissued" style={{color: 'white'}}>Books Issued</Link>
                </Menu.Item>
                <Menu.Item as='a'>
                    <Link to="/admin" style={{color: 'white'}}><Icon name="logout" />Log out</Link>
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={sidebarOpened}>
                <Segment
                    textAlign='center'
                    vertical
                    style={{padding: '1em 0em'}}
                >
                    <Menu
                        fixed='top'
                        size='huge'
                        secondary
                        pointing
                        style={{backgroundColor: '#00b7eb'}}
                    >
                        <Container>
                            <Menu.Item
                                onClick={() => setSidebarOpened(true)}
                            >
                                <Icon name='sidebar' style={{color: 'white'}} />
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/admin" style={{color: 'white'}}>Library System Admin</Link>
                            </Menu.Item> 
                        </Container>
                    </Menu>
                </Segment>
                <BooksIssued />
                <Footer />
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}
export default MobileBooksIssued;