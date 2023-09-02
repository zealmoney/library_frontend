import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Footer from './Footer'
import Home from './Home'
import UserPage from './UserPage'
import BookDetails from './BookDetails'

const MobileBookDetails = () => {
    const [sidebarOpened, setSidebarOpened] = useState()
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
                    <Link to="/" style={{color: 'white'}}>Home</Link>
                </Menu.Item>
                <Menu.Item as="a">
                    <Link to="/users" style={{color: 'white'}}><Icon name="sign in" />Sign In</Link>
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
                                <Link to="/" style={{color: 'white'}}>Library System</Link>
                            </Menu.Item> 
                        </Container>
                    </Menu>
                </Segment>
                <BookDetails />
                <Footer />
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}
export default MobileBookDetails;