import { MailCheck, Pen, Phone, User, UserCog2 } from "lucide-react"
import { UserProfile } from "../../components/general/avatar"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../slices/authSlice";
import FormInput from "../../components/general/form-input";
import Button from "../../components/general/button";
import { hideLoader, showLoader } from "../../slices/loaderSlice";
import { updateProfilePic, updateUser } from "../../services/user.services";
import Loader from "../../components/layout/loader";

const ProfilePage = () => {
    const fileInputRef = useRef(null);
    const [editing, setEditing] = useState(false)
    const [loader, setLoader] = useState(true)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const profileSaveButton = useSelector((state) => state.loader.profileSaveButton);
    const [errors, setErrors] = useState({
        name: { state: false, message: '' },
        email: { state: false, message: '' },
        mobile: { state: false, message: '' },
        username: { state: false, message: '' },
    })
    const [userInputs, setUserInputs] = useState({
        name: user?.name,
        email: user?.email,
        mobile: user?.mobile,
        username: user?.username,
    })

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 1000)
    }, [])


    const handleProfilePicClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            updateProfilePic(formData).then(
                (res) => {
                    dispatch(updateUserDetails({ avatar: res?.data?.url }));
                }
            )
        }
    };
    const handleChange = (e) => {
        setUserInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleSave = (e) => {
        e.preventDefault()
        if (!userInputs.name?.length) {
            return setErrors((prevState) => ({
                ...prevState,
                name: { state: true, message: 'This field is required' },
            }))
        }
        if (userInputs?.mobile?.length) {
            if (!/^[0-9]{10}$/.test(userInputs?.mobile)) {
                return setErrors((prevState) => ({
                    ...prevState,
                    mobile: { state: true, message: 'Please enter a valid mobile number' },
                }))
            }
        }
        setErrors((prevState) => ({
            ...prevState,
            name: { state: false, message: '' },
            mobile: { state: false, message: '' },
        }))
        dispatch(showLoader('profileSaveButton'))
        updateUser(user?.id, userInputs).then(res => {
            dispatch(updateUserDetails(
                {
                    name: res?.data?.name,
                    mobile: res?.data?.mobile,
                }
            ))
            dispatch(hideLoader('profileSaveButton'))
            setEditing(false)
        })
    }
    if (loader) return <Loader />
    return (
        <>
            <form className="sm:w-[500px] w-full flex p-4 flex-col items-center justify-start min-h-[75vh] border rounded-md border-gray-200 shadow-md">
                <div className="relative">
                    <UserProfile className="md:h-[150px] w-[120px]  md:w-[150px] h-[120px] text-6xl cursor-pointer" onClick={handleProfilePicClick} />
                    <Pen className="absolute right-3 bottom-1 text-gray-600 cursor-pointer" size={20} onClick={handleProfilePicClick} />
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                    />
                </div>
                <div className="mt-4 w-full px-4 space-y-1 md:space-y-3">
                    <FormInput error={errors.name.state} errorMessage={errors.name.message} id="name" label={'Name'} name="name" value={userInputs?.name} onChange={handleChange} autoFocus disableTyping={!editing} Icon={User} placeholder={'Enter your name'} type={'text'} inputClass={''} />
                    <FormInput error={errors.username.state} errorMessage={errors.username.message} id="username" label={'Username'} name="username" value={userInputs?.username} onChange={handleChange} disableTyping Icon={UserCog2} placeholder={'Enter your username'} type={'text'} inputClass={''} />
                    <FormInput error={errors.email.state} errorMessage={errors.email.message} id="email" label={'Email'} name="email" value={userInputs?.email} onChange={handleChange} disableTyping Icon={MailCheck} placeholder={'Enter your email'} type={'email'} inputClass={''} />
                    <FormInput error={errors.mobile.state} errorMessage={errors.mobile.message} id="mobile" label={'Phone Number'} name="mobile" value={userInputs?.mobile ? userInputs?.mobile : editing ? '' : '-'} onChange={handleChange} disableTyping={!editing} Icon={Phone} placeholder={'Enter your mobile number'} type={'tel'} inputClass={''} />
                </div>
                <div className="mt-12">
                    {
                        editing ? (
                            <div className="w-full flex md:flex-row flex-col gap-4 md:space-x-4 justify-center items-center">
                                <Button type="button" onClick={(e) => { e.preventDefault(); setUserInputs(user); dispatch(hideLoader('profileSaveButton')); setEditing(false); setErrors({ name: { state: false, message: '' }, mobile: { state: false, message: '' }, email: { state: false, message: '' }, username: { state: false, message: '' } }) }} className=" min-h-5 h-9 py-0 rounded-2xl text-xs md:text-base">
                                    Cancel
                                </Button>
                                <Button type="submit" loader={profileSaveButton} onClick={handleSave} className=" min-h-5 h-9 py-0 bg-[#e59499] hover:bg-[#d7858a] rounded-2xl text-xs md:text-base">
                                    Save
                                </Button>
                            </div>
                        ) : (
                            <Button onClick={(e) => { e.preventDefault(); document.getElementById("name").focus(); setEditing(true) }} className=" min-h-5 h-9 py-0 bg-[#e59499] hover:bg-[#d7858a] rounded-2xl text-xs md:text-base">
                                Edit
                            </Button>
                        )
                    }
                </div>
            </form >
        </>
    )
}

export default ProfilePage