
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { mergeClasses } from "../../lib/utils"
import { useSelector } from "react-redux"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={mergeClasses(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
            className
        )}
        {...props}
    />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={mergeClasses("aspect-square h-full w-full", className)}
        {...props}
    />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={mergeClasses(
            "flex h-full w-full items-center justify-center rounded-full bg-muted",
            className
        )}
        {...props}
    />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const UserProfile = ({...props}) => {
    const userAvatar = useSelector((state) => state.auth?.user?.avatar)
    const name = useSelector((state) => state.auth?.user?.name)
    return (
        <Avatar {...props}>
            <AvatarImage className="object-cover border-2 rounded-full border-[#e59499]" src={userAvatar} />
            <AvatarFallback>
                <span className="text-white font-semibold w-full h-full bg-[#e59499] rounded-full flex items-center justify-center">{name.charAt(0).toUpperCase()}</span>
            </AvatarFallback>
        </Avatar>
    )
}

export { Avatar, AvatarImage, AvatarFallback, UserProfile }
