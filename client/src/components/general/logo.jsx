import { useNavigate } from "react-router-dom";
import Typography from "./typography"

const Logo = () => {
    const navigate = useNavigate()
    const heroSection = document.getElementById("hero")
    return(
    <Typography variant="h1" className="!text-[#e59499] hover:!text-[#ff646e] transition-all !text-2xl font-bold cursor-pointer" onClick={() => {navigate('/');heroSection.scrollIntoView({behavior: 'smooth'})}}>
        {'ReadMagic'}
    </Typography>
)}
Logo.displayName = 'Logo'
export default Logo