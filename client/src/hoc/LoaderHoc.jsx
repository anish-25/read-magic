import { useEffect, useState } from 'react'
import BouncingDotsLoader from '../components/general/bouncing-dots'

const LoaderHoc = ({ Component }) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 600);
    }, [])

    if (!loading) {
        return (
            <Component />
        )
    }
    else {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <BouncingDotsLoader className={"bg-[#e59499]"} />
            </div>
        )
    }
}

export default LoaderHoc