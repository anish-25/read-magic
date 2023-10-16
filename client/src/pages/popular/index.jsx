import { useEffect, useMemo, useState } from "react"
import Loader from "../../components/layout/loader"
import { useSearchParams } from "react-router-dom"
import Pagination from "../../components/general/paginate"
import { getPopularBooks } from "../../services/book.services"
import { setPopularBooks } from "../../slices/booksSlice"
import { useDispatch, useSelector } from "react-redux"
import BookCard from "../../components/data-renderers/book-card"
import Typography from "../../components/general/typography"

const PopularPage = () => {
  const [loader, setLoader] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 })
  const page = searchParams.get("page")
  const dispatch = useDispatch()
  const popularBooks = useSelector((state) => state.books.popularBooks)
  const fetchBooks = () => {
    getPopularBooks('?page=' + page).then(res => dispatch(setPopularBooks(res.data))).finally(() => {
      setLoader(false)
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])
  useMemo(() => {
    setLoader(true)
    fetchBooks()
  }, [page])
  const handlePagination = (page) => {
    setSearchParams({ page })
  }
  if (loader || !popularBooks?.data?.length) return <Loader />
  return (
    <div className="w-full flex flex-col justify-center items-center py-5">
      <Typography className="md:text-xl text-lg font-semibold text-[#bfb9b9] -mb-8 mt-4">Popular Books</Typography>
      <div className="min-h-[60vh]">
        <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {
            popularBooks?.data?.map((book) => (
              <div key={book?._id}>
                <BookCard book={book} />
              </div>
            ))
          }
        </div>
      </div>
      <div className="">
        <Pagination postsPerPage={10} totalPosts={popularBooks?.count} paginate={handlePagination} currentPage={parseInt(page)} />
      </div>
    </div>
  )
}

export default PopularPage