import { useEffect, useState } from 'react'
import '../../assets/css/success.css'

import Typography from '../../components/general/typography'
import Loader from '../../components/layout/loader'

import { useLocation, useNavigate } from 'react-router-dom'
import CustomLink from '../../components/general/custom-link'

const SuccessPage = () => {
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (location.state?.message) {
            setTimeout(() => {
                setLoading(false)
            }, 600);
        }
        else {
            setTimeout(() => {
                navigate('/')
            }, 600);
        }

    }, [])
    if (loading) return <Loader />
    return (
        <div className='success flex flex-col w-full h-full justify-center items-center gap-6'>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
            </svg>
            <Typography variant="h3" className="text-lg md:text-xl animate-drawer-open duration-700">{location.state?.message}</Typography>
            {
                location.state?.from === 'checkout' ?
                    <CustomLink className="text-sm text-[#e59499] mt-2 hover:text-[#e59499]/80" withUnderline to={'/'}>Continue shopping</CustomLink>
                    :
                    <></>
            }
        </div>
    )
}

export default SuccessPage