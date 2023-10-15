import { Mail, MapPin, Phone } from "lucide-react"
import CustomLink from "../general/custom-link"
import Logo from "../general/logo"
import Typography from "../general/typography"

const Footer = () => {
    return (
        <div className="w-full flex justify-start md:px-[300px] space-x-24 items-start p-12 min-h-[150px] border border-gray-50 bg-gray-100">
            <div className="flex flex-col">
                <Logo />
            </div>
            <div className="flex flex-col">
                <Typography className="text-base font-semibold text-left">Pages</Typography>
                <div className="mt-3 flex flex-col !text-sm">
                    <CustomLink className="text-sm" to={'/popular-books'}>Popular</CustomLink>
                    <CustomLink className="text-sm" to={'/best-sellers'}>Best sellers</CustomLink>
                </div>
            </div>
            <div className="flex flex-col">
                <Typography className="text-base font-semibold text-left">Services</Typography>
                <div className="mt-3 flex flex-col !text-sm">
                    <CustomLink className="text-sm">Book Delivery</CustomLink>
                    <CustomLink className="text-sm">Book Returns</CustomLink>
                    <CustomLink className="text-sm">Book Exchange</CustomLink>
                </div>
            </div>
            <div className="flex flex-col">
                <Typography className="text-base font-semibold text-left">Contact</Typography>
                <div className="mt-3 flex flex-col !text-sm justify-start items-start">
                    <Typography className="text-sm !text-left flex !space-x-2 justify-center items-center">
                        <span><Phone size={16} fill="#e59499" className="text-gray-100" /></span>
                        <span>(+91) 9884958938</span>
                    </Typography>
                    <Typography className="text-sm !text-left flex !space-x-2 justify-center items-center">
                        <span><Mail size={16} fill="#e59499"  className="text-gray-100" /></span>
                        <span>readmagic@gmail.com</span>
                    </Typography>
                    <Typography className="text-sm !text-left flex !space-x-2 justify-center items-center">
                        <span><MapPin size={16} fill="#e59499"  className="text-gray-100" /></span>
                        <span>2972 Westheimer Rd. Santa Ana, Illinois 85486 </span>
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default Footer