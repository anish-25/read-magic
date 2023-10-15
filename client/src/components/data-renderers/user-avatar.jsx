import { useSelector } from "react-redux"
import CustomLink from "../general/custom-link"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "../../components/general/menu-bar"
import ImageWrapper from "./image-wrapper"
import useLogout from "../../hooks/useLogout"
const UserAvatar = () => {
    const avatar = useSelector((state) => state.auth?.user?.avatar)
    const name = useSelector((state) => state.auth?.user?.name)
    const logout = useLogout()
    return (
        <Menubar className={'border-none p-0 m-0'}>
            <MenubarMenu>
                <MenubarTrigger className="!p-0 cursor-pointer hover:text-gray-700">
                    {
                        avatar ? (
                            <ImageWrapper src={avatar} alt="User Avatar" width={30} height={30} />
                        ) : (
                            <span className="text-white text-sm font-semibold w-7 h-7 bg-green-700 rounded-full flex items-center justify-center">{name.charAt(0).toUpperCase()}</span>
                        )
                    }
                </MenubarTrigger>
                <MenubarContent className="bg-white gap-3">
                    <MenubarItem className="hover:bg-gray-100">
                        <CustomLink className="text-sm py-2 w-full" to={'/sign-in'}>Profile</CustomLink>
                    </MenubarItem>
                    <MenubarItem className="hover:bg-gray-100">
                        <CustomLink className="text-sm py-2 w-full" to={'/my-orders'}>My Orders</CustomLink>
                    </MenubarItem>
                    <MenubarItem className="hover:bg-gray-100"> <CustomLink className="text-sm py-2 w-full text-red-500 hover:text-red-500" onClick={logout}>Logout</CustomLink></MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>

    )
}

export default UserAvatar