import { useDispatch, useSelector } from "react-redux";
import images from "../../assets/images"
import BookCard from "../../components/data-renderers/book-card";
import HeroCarousel from "../../components/data-renderers/carousel"
import { setBooks } from "../../slices/booksSlice";
import { useEffect } from "react";
import { getPopularBooks } from "../../services/book.services";
import { hideLoader, showLoader } from "../../slices/loaderSlice";
import Loader from "../../components/layout/loader";
import Pagination from "../../components/general/paginate";

const slideImages = [
    images.HeroImage, images.HeroImage2, images.HeroImage3
];
const LandingPage = () => {
    const { books } = useSelector((state) => state.books)
    const dispatch = useDispatch()
    const pageLoader = useSelector((state) => state.loader.pageLoader)
    const fetchBooks = () => {
        getPopularBooks().then(res => dispatch(setBooks(res.data?.data))).finally(() => {
            dispatch(hideLoader('pageLoader'))
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
    if(pageLoader) return <Loader />
    return (
        <>
            <div className="flex justify-center items-center gap-24 min-h-[500px] w-full">
                <div className="max-w-[80vw] !overflow-hidden">
                    <HeroCarousel slideImages={slideImages} />
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