
import { useNavigate } from 'react-router-dom'
import Button from '../general/button'
import Typography from '../general/typography'
import Card from '../layout/card'
import ImageWrapper from './image-wrapper'
import Rating from './rating'
import { useSelector } from 'react-redux'

const BookCard = ({ book }) => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return (
        <Card
            className="mx-auto flex w-full !max-w-lg max-h-[650px] shadow-none hover:shadow-md md:flex-row transition-all flex-col justify-center items-center gap-4 p-8 md:gap-8">
            <ImageWrapper src={`https://covers.openlibrary.org/b/isbn/${book?.isbn}-L.jpg`} className="w-[212px] h-[327px] object-fill rounded-md" />
            <div className="space-y-2 whitespace-nowrap flex flex-col justify-start items-start">
                <Typography className={'text-gray-600 font-sans text-sm text-left font-normal leading-normal capitalize min-h-[30px]'}>{book?.authors}</Typography>
                <Typography onClick={() => { navigate(`/book-details/${book?._id}`) }} className={'text-black text-left text-base font-bold leading-normal cursor-pointer whitespace-pre-wrap min-h-[80px] max-h-[80px]'}>{book?.title}</Typography>
                <Rating rating_value={book?.average_rating} numberOfReviews={book?.ratings_count} />
                <Typography className={'whitespace-pre-wrap text-left text-gray-400 font-sans text-sm font-normal leading-4 capitalize min-h-[80px] max-h-[80px]'}>
                    {
                        book?.description?.length > 100 ? book?.description?.slice(0, 100) + '...' : book?.description
                    }
                </Typography>
                <Button onClick={() => {
                    if (isAuthenticated) {
                        navigate(`/checkout?product=${book?._id}`)
                    }
                    else {
                        navigate('/sign-in')
                    }
                }} className={'w-[80%] !mt-8 !text-xs h-[30px] bg-[#e59499] hover:bg-[#ff646e]'}>BUY NOW</Button>
            </div>
        </Card>
    )
}

export default BookCard