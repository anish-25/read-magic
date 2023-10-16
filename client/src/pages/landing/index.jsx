import { useDispatch, useSelector } from "react-redux";
import BookCard from "../../components/data-renderers/book-card";
import HeroCarousel from "../../components/data-renderers/carousel"
import { setBooks, setNewlyPublished } from "../../slices/booksSlice";
import { useEffect } from "react";
import { getNewlyPublishedBooks, getPopularBooks } from "../../services/book.services";
import { hideLoader, showLoader } from "../../slices/loaderSlice";
import Loader from "../../components/layout/loader";

const LandingPage = () => {
    const { books, newlyPublished } = useSelector((state) => state.books)
    const dispatch = useDispatch()
    const pageLoader = useSelector((state) => state.loader.pageLoader)
    const fetchBooks = () => {
        getNewlyPublishedBooks("?page=4").then(res => dispatch(setNewlyPublished(res.data?.data))).finally(() => {
            getPopularBooks().then(res => dispatch(setBooks(res.data?.data))).finally(() => {
                dispatch(hideLoader('pageLoader'))
            })
        })
    }
    useEffect(() => {
        dispatch(showLoader('pageLoader'))
        if (!books?.length) {
            fetchBooks()
        }
        else {
            setTimeout(() => {
                dispatch(hideLoader('pageLoader'))
            }, 1000)
        }
    }, [])
    if (pageLoader || !books?.length || !newlyPublished?.length) return <Loader />
    return (
        <>
            <div className="flex justify-center items-center gap-24 min-h-[500px] w-full">
                <div className="max-w-[100vw] !overflow-hidden hero-carousel">
                    <HeroCarousel slideImages={newlyPublished} heading={"Newly Published"} />
                </div>
            </div>
            <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {
                    books?.map((book) => (
                        <BookCard book={book} key={book?._id} />
                    ))
                }
            </div>
        </>
    )
}

export default LandingPage