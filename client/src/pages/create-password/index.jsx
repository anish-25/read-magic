import { useEffect, useState } from 'react'
import Typography from '../../components/general/typography'
import FormInput from '../../components/general/form-input'
import { Lock } from 'lucide-react'
import Button from '../../components/general/button'
import ImageWrapper from '../../components/data-renderers/image-wrapper'
import images from '../../assets/images'
import CustomLink from '../../components/general/custom-link'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleSignUp } from '../../services/auth.services'
import { useDispatch } from 'react-redux'
import { login } from '../../slices/authSlice'

const CreatePasswordPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userInputs, setUserInputs] = useState({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState(
    {
      password: { state: false, message: '' },
      confirmPassword: { state: false, message: '' },
    }
  )
  const clearErrors = (name) => {
    setErrors((prevState) => ({
      ...prevState,
      [name]: { state: false, message: '' },
    }))
  }
  const handleChange = (e) => {
    if (e.target.value === '') {
      return setErrors((prevState) => ({
        ...prevState,
        [e.target.name]: { state: true, message: 'This field is required' },
      }))
    }
    clearErrors(e.target.name)
    setUserInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(userInputs.password==="" || userInputs.confirmPassword===""){
      return setErrors((prevState) => ({
        ...prevState,
        password: { state: userInputs.password==="", message: 'This field is required' },
        confirmPassword: { state: userInputs.confirmPassword==="", message: 'This field is required' },
      }))
    }
    else if (userInputs.password !== userInputs.confirmPassword) {
      return setErrors((prevState) => ({
        ...prevState,
        confirmPassword: { state: true, message: 'Passwords do not match' },
      }))
    }
    else if (userInputs.password.length < 8) {
      return setErrors((prevState) => ({
        ...prevState,
        password: { state: true, message: 'Password must be at least 8 characters' },
      }))
    }
    else{
      clearErrors('password')
      clearErrors('confirmPassword')
      handleSignUp(userInputs).then(res => {
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
      })
    }
  }

  useEffect(() => {
    if (location?.state?.email) {
      setUserInputs((prevState) => ({
        ...prevState,
        email: location?.state?.email,
        name: location?.state?.fullName,
        username: location?.state?.username,
      }))
    }
    else{
      navigate('/sign-up', { replace: true })
    }
  }, [])
  

  return (
    <div className="h-screen w-screen flex justify-around items-center sm:px-20 px-10">
      <div className="hidden md:flex w-[50%]">
        <ImageWrapper src={images.CreatePasswordImage} />
      </div>
      <form onSubmit={handleSubmit} className='md:w-[498.125px] md:h-fit sm:w-[398.125px] sm:h-fit w-full h-fit px-10 gap-5 flex justify-start py-8 items-center flex-col flex-shrink-0 rounded-[9.963px] bg-white shadow-md'>
        <Typography variant="h3" className="text-[#e59499]">Create a Password</Typography>
        <FormInput name={'password'} error={errors.password.state} errorMessage={errors.password.message} onChange={handleChange} label={"Choose Password"} Icon={Lock} placeholder={"Minimum 8 characters"} type={"password"} />
        <FormInput name={'confirmPassword'} error={errors.confirmPassword.state} errorMessage={errors.confirmPassword.message} onChange={handleChange} label={"Confirm Password"} Icon={Lock} placeholder={"Confirm password"} type={"password"} />
        <Button type="submit" className="mt-5 rounded-[9.963px] py-3 bg-gradient-to-r from-[#FFA7A7] via-[#FFA7A7] to-[#FF014E] hover:opacity-80 transition-all duration-150 w-full">Save and Continue</Button>
        <Typography className="my-5 text-sm">
          Already have an account? <CustomLink className="text-[#e59499] hover:text-[#fd6a73]" to="/sign-in">Sign In</CustomLink>
        </Typography>

      </form>
    </div>
  )
}

export default CreatePasswordPage