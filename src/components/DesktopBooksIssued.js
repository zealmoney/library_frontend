import AdminUserHeader from "../Admin/AdminUserHeader"
import BooksIssued from "./BooksIssued"
import Footer from "./Footer"

const DesktopBooksIssued = () => {
    return(
        <div>
            <AdminUserHeader />
            <br/><br/>
            <BooksIssued />
            <Footer />
        </div>
    )
}
export default DesktopBooksIssued