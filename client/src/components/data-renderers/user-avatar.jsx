import CustomLink from "../general/custom-link"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "../../components/general/menu-bar"
import useLogout from "../../hooks/useLogout"
import { UserProfile } from "../general/avatar"
const UserAvatar = () => {
    const logout = useLogout()
    return (
        <Menubar className={'border-none p-0 m-0'}>
            <MenubarMenu>
                <MenubarTrigger className="!p-0 cursor-pointer hover:text-gray-700 text-center flex items-center justify-center">
                    <UserProfile className="h-8 w-8 text-sm" />
                </MenubarTrigger>
                <MenubarContent className="bg-white gap-3">
                    <MenubarItem className="hover:bg-gray-100">
                        <CustomLink className="text-sm py-2 w-full" to={'/my-profile'}>Profile</CustomLink>
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