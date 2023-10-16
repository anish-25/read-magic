import { useNavigate } from "react-router-dom"
import Typography from "../general/typography"
import ImageWrapper from "./image-wrapper"
import Rating from './rating'
const SearchedBook = ({ book,setIsOpen }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => {navigate(`/book-details/${book?._id}`,{replace: true});setIsOpen(false);}} className="flex w-full justify-start items-center md:py-0 py-3 hover:bg-gray-100 cursor-pointer transition-all">
      <div className="w-[20%]">
        <ImageWrapper src={`https://covers.openlibrary.org/b/isbn/${book?.isbn}-L.jpg`} />
      </div>
      <div className="w-[80%] flex justify-start items-start text-left px-4 flex-col">
        <Typography variant="h3" className="md:!text-lg !text-sm">{book?.title}</Typography>
        <Typography className={'text-gray-600 font-sans text-xs md:text-sm font-normal leading-normal capitalize min-h-[30px] text-left'}>{book?.authors}</Typography>
        <Rating rating_value={book?.average_rating} numberOfReviews={book?.ratings_count} />
      </div>
    </div>
  )
}

export default SearchedBook