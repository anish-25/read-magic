import { useState } from 'react'
import Typography from '../../components/general/typography'
import FormInput from '../../components/general/form-input'
import { Lock, Mail } from 'lucide-react'
import Button from '../../components/general/button'
import logos from '../../assets/logos'
import ImageWrapper from '../../components/data-renderers/image-wrapper'
import images from '../../assets/images'
import CustomLink from '../../components/general/custom-link'
import { validateEmail } from '../../lib/utils'
import { handleSignIn } from '../../services/auth.services'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { hideLoader, showLoader } from '../../slices/loaderSlice'

const SignInPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signInButtonLoader = useSelector((state) => state.loader.signInButton)
    const [userInputs, setUserInputs] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: { state: false, message: "" },
        password: { state: false, message: "" }
    })
    const clearErrors = (name) => {
        setErrors((prevState) => ({
            ...prevState,
            [name]: { state: false, message: "" }
        }))
    }
    const handleChange = (e) => {
        if (e.target.value === "") {
            return setErrors((prevState) => ({
                ...prevState,
                [e.target.name]: { state: true, message: "This field is required" },
            }))
        }
        else {
            clearErrors(e.target.name)
        }
        setUserInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = userInputs
        if (email === "" || password === "") {
            return setErrors((prevState) => ({
                ...prevState,
                email: { state: email === "", message: "This field is required" },
                password: { state: password === "", message: "This field is required" }
            }))
        }
        else if (!validateEmail(email)) {
            return setErrors((prevState) => ({
                ...prevState,
                email: { state: true, message: "Please enter a valid email" }
            }))
        }
        else if (password.length < 8) {
            return setErrors((prevState) => ({
                ...prevState,
                password: { state: true, message: "Password must be at least 8 characters" }
            }))
        }
        else {
            dispatch(showLoader("signInButton"))
            handleSignIn(userInputs).then(res => {
                if (res?.data?.id) {
                    let data = {
                        accessToken: res?.data?.accessToken,
                        refreshToken: res?.data?.refreshToken,
                        user: res?.data,
                        isAuthenticated: true
                    }
                    localStorage.setItem('refresh', res?.data?.refreshToken?.token)
                    dispatch(login(data))
                    navigate('/', { replace: true })
                }
            }).catch(err => {
                console.log(err)
                setErrors((prevState) => ({
                    ...prevState,
                    email: { state: true, message: "" },
                    password: { state: true, message: "" }
                }))
            }).finally(() => {
                dispatch(hideLoader("signInButton"))
            })
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center sm:px-20 px-10">
            <div className="hidden md:flex w-[50%]">
                <ImageWrapper src={images.SignInImage} />
            </div>
            <form onSubmit={handleSubmit} className='md:w-[498.125px] md:h-fit sm:w-[398.125px] sm:h-fit w-full h-[70%] px-10 gap-8 flex justify-start py-8 items-center flex-col flex-shrink-0 rounded-[9.963px] bg-white shadow-md'>
                <Typography variant="h3" className="text-[#e59499]">Sign In</Typography>
                <FormInput autoComplete="on" error={errors.email.state} errorMessage={errors.email.message} name="email" onChange={handleChange} label={"Email"} Icon={Mail} placeholder={"Enter your email"} type={"email"} />
                <FormInput name="password" error={errors.password.state} errorMessage={errors.password.message} onChange={handleChange} label={"Password"} Icon={Lock} placeholder={"Enter your password"} type={"password"} />
                <Button disabled={signInButtonLoader} loader={signInButtonLoader} type="submit" className="mt-5 rounded-[9.963px] py-3 bg-gradient-to-r from-[#FFA7A7] via-[#FFA7A7] to-[#FF014E] hover:opacity-80 transition-all duration-150 w-full">Sign In</Button>
                <Button className="mt-5 rounded-[9.963px] py-3 transition-all text-[#797979] space-x-5 bg-transparent duration-150 w-full hover:bg-gray-100 border">
                    <span><img src={logos.Google} className=" md:w-7 md:h-7 h-5 w-5" alt="Google" /></span>
                    <Typography className=" md:text-base text-sm">
                        Sign In with Google
                    </Typography>
                </Button>
                <Typography className="my-5 text-sm">
                    Don&apos;t have an account? <CustomLink className="text-[#e59499] hover:text-[#fd6a73]" to="/sign-up">Sign Up</CustomLink>
                </Typography>
            </form>
        </div>
    )
}

export default SignInPage