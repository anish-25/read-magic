import { useState } from "react"
import images from "../../assets/images"
import ImageWrapper from "../../components/data-renderers/image-wrapper"
import Typography from "../../components/general/typography"
import { useEffect } from "react"
import Loader from "../../components/layout/loader"

const NotFound = ({ message = "Oops! Page not found", image }) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 600);
    }, [])
    if (loading) return <Loader />
    return (
        <div className="flex flex-col space-y-8 md:space-y-0 justify-center items-center">
            <div className="w-[50%]">
                <ImageWrapper className="" src={image || images.NotFoundImage} />
            </div>
            <Typography variant="h2" className="text-[#e59499] md:!text-xl sm:!text-lg !text-xs !mt-4">
                {message}
            </Typography>

        </div>
    )
}

export default NotFound