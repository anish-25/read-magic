import { Star } from "lucide-react"
import Typography from "../general/typography";

const Rating = ({ rating_value, numOfStars = 6,numberOfReviews }) => {
    const filledStars = Math.min(numOfStars, Math.max(0, rating_value));
    const emptyStars = numOfStars - filledStars;
    const filledStarArray = Array.from({ length: filledStars }, (_, index) => (
        <span key={index} className="text-yellow-400 stroke-yellow-300 text-2xl pr-1">
            <Star fill="#F2C94C" size={16} stroke="#F2C94C" />
        </span>
    ));

    // Create an array of empty stars
    const emptyStarArray = Array.from({ length: emptyStars }, (_, index) => (
        <span key={index} className="text-gray-300 text-2xl pr-1">
            <Star size={16}/>
        </span>
    ));
    return (
        <div className="flex md:flex-row flex-col md:space-x-3 justify-start items-start md:items-center">
        <div className="flex">
            {filledStarArray}
            {emptyStarArray}
        </div>
        <Typography className={'text-gray-400 font-sans text-xs md:mt-0 mt-3 md:text-sm font-normal leading-4 text-left md:text-center'}>{numberOfReviews + (numberOfReviews==1?" review":" reviews")}</Typography>
        </div>
    )
}

export default Rating