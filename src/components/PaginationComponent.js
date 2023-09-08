import { useEffect, useState } from "react"
import { Pagination } from "semantic-ui-react"
import API from "../services/API"
import { useNavigate, useParams } from "react-router-dom"

const PaginationComponent = () => {
    const [activePage, setActivePage] = useState()
    const [totalPages, setTotalPages] = useState()

    const [books, setBooks] = useState([])

    const navigate = useNavigate()
    const params = useParams()

    let count = 0
    
    const getBooks = () => {
        API.get("/")
         .then((res) => setBooks(res.data))
          .catch(console.error)
    }

    useEffect(() => {
        setActivePage(params.pageno)
        getBooks()
        getTotalPages()
    })

    const getTotalPages = () => {
        books.map((book) => {
            ++count
        })
        let total = Math.ceil(count/4)
        setTotalPages(total)
    }

    const handlePaginationChange = (activePage) => {
        setActivePage(activePage)
        navigate("/" + activePage)

    }

    return(
        <Pagination 
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={(e, {activePage}) => {handlePaginationChange(activePage)}}
        />
    )
}
export default PaginationComponent