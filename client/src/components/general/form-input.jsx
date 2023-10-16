import { useState } from 'react'
import { mergeClasses } from '../../lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import Typography from './typography'

const FormInput = ({ label, Icon, placeholder, type, inputClass, disableTyping, labelClass, error, errorMessage, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className='flex flex-col space-y-2 w-full'>
            <label className={mergeClasses("md:text-sm text-xs", labelClass, error && 'text-red-500')}>{label}</label>
            <div className="relative">
                <input type={type === 'password' ? (showPassword ? 'text' : 'password') : type} placeholder={placeholder}
                    className={
                        mergeClasses('w-full text-xs md:text-base h-[49.813px] !pl-10 !pr-10 flex-shrink-0 rounded-[9.963px] border-[0.996px] border-gray-200 focus:outline-none px-4 hover:border-gray-300 focus:border-gray-300 shadow-sm'
                            , error && 'border-red-500 focus:border-red-500 hover:border-red-500',
                            disableTyping && "border-transparent hover:border-transparent focus:border-transparent shadow-none caret-transparent cursor-default"
                            , inputClass)}
                    {...props} />
                {
                    error ? (
                        <Typography className="text-red-500 text-xs mt-1 absolute hidden md:block">{errorMessage}</Typography>
                    ) : <></>
                }
                <Icon color={'#797979'} className="absolute left-3 top-3.5" size={18} />
                {
                    type === 'password' ? (
                        showPassword ? (
                            <Eye
                                onClick={() => setShowPassword(false)}
                                size={18} color={'#797979'} className="absolute right-3 top-3.5 cursor-pointer" />
                        ) : (
                            <EyeOff
                                onClick={() => setShowPassword(true)}
                                size={18} color={'#797979'} className="absolute right-3 top-3.5 cursor-pointer" />
                        )
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    )
}

export default FormInput