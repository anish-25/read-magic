import React, { useMemo, useState } from 'react'
import Typography from '../../components/general/typography'
import FormInput from '../../components/general/form-input'
import { Lock, Mail, User, UserCog2 } from 'lucide-react'
import Button from '../../components/general/button'
import logos from '../../assets/logos'
import ImageWrapper from '../../components/data-renderers/image-wrapper'
import images from '../../assets/images'
import CustomLink from '../../components/general/custom-link'
import { validateEmail } from '../../lib/utils'
import useDebounce from '../../hooks/useDebouncer'
import { checkEmail, checkUsername } from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [userInputs, setUserInputs] = useState({
    email: '',
    username: '',
    fullName: '',
  })
  const [errors, setErrors] = useState({
    email: { state: false, message: '' },
    username: { state: false, message: '' },
    fullName: { state: false, message: '' },
  })
  const clearErrors = (name) => {
    setErrors((prevState) => ({
      ...prevState,
      [name]: { state: false, message: '' },
    }))
  }
  const debouncedUsername = useDebounce(userInputs.username, 500)
  const debouncedEmail = useDebounce(userInputs.email, 500)

  useMemo(() => {
    if (debouncedUsername.length) {
      checkUsername(debouncedUsername).then(res => {
        if (res) {
          setErrors((prevState) => ({
            ...prevState,
            username: { state: false, message: '' },
          }))
        }
      }).catch(err => {
        if (err) {
          setErrors((prevState) => ({
            ...prevState,
            username: { state: true, message: "This username has already been taken" },
          }))
        }
      })
    }
  }, [debouncedUsername])

  useMemo(() => {
    if (debouncedEmail.length && validateEmail(debouncedEmail)) {
      checkEmail(debouncedEmail).then(res => {
        if (res) {
          setErrors((prevState) => ({
            ...prevState,
            email: { state: false, message: '' },
          }))
        }
      }).catch(err => {
        if (err) {
          setErrors((prevState) => ({
            ...prevState,
            email: { state: true, message: "This email has already been taken" },
          }))
        }
      })
    }
  }, [debouncedEmail])
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
    const { email, username, fullName } = userInputs
    if (email === '' || username === '' || fullName === '') {
      return setErrors((prevState) => ({
        ...prevState,
        email: { state: email === '', message: 'This field is required' },
        username: { state: username === '', message: 'This field is required' },
        fullName: { state: fullName === '', message: 'This field is required' },
      }))
    }
    else if (!validateEmail(email)) {
      return setErrors((prevState) => ({
        ...prevState,
        email: { state: true, message: 'Please enter a valid email' },
      }))
    }
    else {
      if(!errors.email.state && !errors.username.state && !errors.fullName.state){
        navigate('/create-password', { state: userInputs })
      }
    }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center sm:px-20 px-10">
      <div className="hidden md:flex w-[50%]">
        <ImageWrapper src={images.SignUpImage} />
      </div>
      <form onSubmit={handleSubmit} className='md:w-[498.125px] md:h-fit sm:w-[398.125px] sm:h-fit w-full h-fit px-10 gap-5 flex justify-start py-8 items-center flex-col flex-shrink-0 rounded-[9.963px] bg-white shadow-md'>
        <Typography variant="h3" className="text-[#e59499]">Let&apos;s get started</Typography>
        <FormInput name={'fullName'} error={errors.fullName.state} errorMessage={errors.fullName.message} onChange={handleChange} label={"Full Name"} Icon={User} placeholder={"John Doe"} type={"text"} />
        <FormInput name={'email'} error={errors.email.state} errorMessage={errors.email.message} onChange={handleChange} label={"Email"} Icon={Mail} placeholder={"Enter your email"} type={"email"} />
        <FormInput name={'username'} error={errors.username.state} errorMessage={errors.username.message} onChange={handleChange} label={"Username"} Icon={UserCog2} placeholder={"Choose a username"} type={"text"} />
        <Button type="submit" className="mt-5 rounded-[9.963px] py-3 bg-gradient-to-r from-[#FFA7A7] via-[#FFA7A7] to-[#FF014E] hover:opacity-80 transition-all duration-150 w-full">Sign Up</Button>
        <Button className="mt-5 rounded-[9.963px] py-3 transition-all text-[#797979] space-x-5 bg-transparent duration-150 w-full hover:bg-gray-100 border">
          <span><img src={logos.Google} className="md:w-7 md:h-7 h-5 w-5" alt="Google" /></span>
          <Typography className=" md:text-base text-sm">
            Sign Up with Google
          </Typography>
        </Button>
        <Typography className="my-5 text-sm">
          Already have an account? <CustomLink className="text-[#e59499] hover:text-[#fd6a73]" to="/sign-in">Sign In</CustomLink>
        </Typography>

      </form>
    </div>
  )
}

export default SignUpPage