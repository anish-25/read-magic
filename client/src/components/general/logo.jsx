import { useNavigate } from "react-router-dom";
import Typography from "./typography"

const Logo = () => {
    const navigate = useNavigate()
    return (
        <Typography variant="h1" className="!text-[#e59499] hover:!text-[#ef6770] transition-all !text-xl md:!text-2xl font-bold cursor-pointer" onClick={() => { navigate('/'); window.scroll({ top: 0, behavior: 'smooth' }) }}>
            {'ReadMagic'}
        </Typography>
    )
}
Logo.displayName = 'Logo'
export default Logo