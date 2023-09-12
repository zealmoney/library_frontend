import { createMedia } from "@artsy/fresnel"
import 'semantic-ui-css/semantic.min.css'
import Home from './components/Home';
import IssueABook from './components/IssueABook';
import BooksIssued from './components/BooksIssued';
import BookDetails from './components/BookDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserPage from './components/UserPage';
import SignUp from './components/SignUp';
import UserAccount from './components/UserAccount';
import LogOut from './components/LogOut';
import ReturnBook from './components/ReturnBook';
import AdminHomePage from './Admin/AdminHomePage';
import AdminLoginPage from './Admin/AdminLoginPage';
import AdminLogOut from './Admin/AdminLogOut';
import RequestedBook from './components/RequestedBook';
import ReadBook from './components/ReadBook';
import MobileContainer from "./components/MobileContainer";
import DesktopContainer from "./components/DesktopContainer";
import MobileUserPage from "./components/MobileUserPage";
import DesktopUserPage from "./components/DesktopUserPage";
import DesktopBookDetails from "./components/DesktopBookDetails";
import MobileBookDetails from "./components/MobileBookDetails";
import MobileSignUp from "./components/MobileSignUp";
import DesktopSignUp from "./components/DesktopSignUp";
import DesktopUserAccount from "./components/DesktopUserAccount";
import MobileUserAccount from "./components/MobileUserAccount";
import MobileReadBook from "./components/MobileReadBook";
import MobileReturnBook from "./components/MobileReturnBook";
import DesktopReturnBook from "./components/DesktopReturnBook";
import MobileRequestedBook from "./components/MobileRequestedBook";
import DesktopRequestedBook from "./components/DesktopRequestedBook";
import MobileIssueABook from "./components/MobileIssueABook";
import DesktopIssueABook from "./components/DesktopIssueABook";
import MobileBooksIssued from "./components/MobileBooksIssued";
import DesktopBooksIssued from "./components/DesktopBooksIssued";
import PaginationComponent from "./components/PaginationComponent";
import DesktopContainerPagination from "./components/DesktopContainerPagination";
import MobileContainerPagination from "./components/MobileContainerPagination";


const { MediaContextProvider, Media } = createMedia({
  breakpoints:{
    mobile: 0,
    tablet: 768,
    computer: 1024
  }
})

function App() {
  return (
    <div>
      <MediaContextProvider>
        <Media at="mobile">
          <BrowserRouter>
            <Routes>
              <Route index element={<MobileContainer />} />
              <Route index path='/:pageno' element={<MobileContainerPagination />} />
              <Route path='issueabook' element={<MobileIssueABook />} />
              <Route path='booksissued' element={<MobileBooksIssued />} />
              <Route path='bookdetails/:author_name/:book_id' element={<MobileBookDetails />} />
              <Route path='/:author_name/:book_id' element={<BookDetails />} />
              <Route path='users' element={<MobileUserPage />} />
              <Route path='signup' element={<MobileSignUp />} />
              <Route path='useraccount' element={<MobileUserAccount />} />
              <Route path='logout' element={<LogOut />} />
              <Route path='returnbook/:bookissuedid/:bookid/:bookname/:studentid/:studentname' element={<MobileReturnBook />} />
              <Route path='requestbook' element={<MobileRequestedBook />} /> 
              <Route path='readbook/:bookid/:bookname' element={<MobileReadBook />} />
              
              <Route path='admin' element={<AdminHomePage />} />
              <Route path='adminlogin' element={<AdminLoginPage />} />
              <Route path='adminlogout' element={<AdminLogOut />} />
            </Routes>
          </BrowserRouter>
        </Media>

        <Media greaterThan="mobile">
          <BrowserRouter>
            <Routes>
              <Route index element={<DesktopContainer />} />
              <Route index path='/:pageno' element={<DesktopContainerPagination />} />
              <Route path='issueabook' element={<DesktopIssueABook />} />
              <Route path='booksissued' element={<DesktopBooksIssued />} />
              <Route path='bookdetails/:author_name/:book_id' element={<DesktopBookDetails />} />
              <Route path='/:author_name/:book_id' element={<BookDetails />} />
              <Route path='users' element={<DesktopUserPage />} />
              <Route path='signup' element={<DesktopSignUp />} />
              <Route path='useraccount' element={<DesktopUserAccount />} />
              <Route path='logout' element={<LogOut />} />
              <Route path='returnbook/:bookissuedid/:bookid/:bookname/:studentid/:studentname' element={<DesktopReturnBook />} />
              <Route path='requestbook' element={<DesktopRequestedBook />} /> 
              <Route path='readbook/:bookid/:bookname' element={<ReadBook />} />
              
              
              <Route path='admin' element={<AdminHomePage />} />
              <Route path='adminlogin' element={<AdminLoginPage />} />
              <Route path='adminlogout' element={<AdminLogOut />} />
            </Routes>
          </BrowserRouter>
        </Media>
      </MediaContextProvider>
    </div>
  );
}

export default App;
