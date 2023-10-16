import { Mail, MapPin, Phone } from "lucide-react"
import CustomLink from "../general/custom-link"
import Logo from "../general/logo"
import Typography from "../general/typography"

const Footer = () => {
    return (
        <div className="w-full flex lg:flex-row flex-col justify-start lg:space-x-24 gap-6 items-center md:items-start p-12 min-h-[150px] border border-gray-50 bg-gray-100">
            <div className="flex flex-col w-full">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <Typography className="md:text-base text-sm font-semibold text-left md:text-left">Pages</Typography>
                <div className="mt-3 flex flex-col !text-sm gap-2">
                    <CustomLink className="md:text-sm text-xs" to={'/popular-books'}>Popular</CustomLink>
                    <CustomLink className="md:text-sm text-xs" to={'/best-sellers'}>Best sellers</CustomLink>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <Typography className="md:text-base text-sm font-semibold text-left md:text-left">Services</Typography>
                <div className="mt-3 flex flex-col !text-sm gap-2">
                    <CustomLink className="md:text-sm text-xs">Book Delivery</CustomLink>
                    <CustomLink className="md:text-sm text-xs">Book Returns</CustomLink>
                    <CustomLink className="md:text-sm text-xs">Book Exchange</CustomLink>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <Typography className="md:text-base text-sm font-semibold text-left">Contact</Typography>
                <div className="mt-3 flex flex-col !text-sm gap-2 justify-start items-start">
                    <Typography className="md:text-sm text-xs !text-left flex !space-x-2 justify-center items-center">
                        <span><Phone size={16} fill="#e59499" className="text-gray-100" /></span>
                        <span>(+91) 9884958938</span>
                    </Typography>
                    <Typography className="md:text-sm text-xs !text-left flex !space-x-2 justify-center items-center">
                        <span><Mail size={16} fill="#e59499" className="text-gray-100" /></span>
                        <span>readmagic@gmail.com</span>
                    </Typography>
                    <Typography className="md:text-sm text-xs !text-left flex !space-x-2 justify-center items-center">
                        <span><MapPin size={16} fill="#e59499" className="text-gray-100" /></span>
                        <span>2972 Westheimer Rd. Santa Ana, Illinois 85486 </span>
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default Footer