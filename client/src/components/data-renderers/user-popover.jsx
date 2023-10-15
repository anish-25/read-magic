import CustomLink from "../general/custom-link"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "../../components/general/menu-bar"
const UserPopover = ({ icon }) => {
    return (
        <Menubar className={'border-none p-0 m-0'}>
            <MenubarMenu>
                <MenubarTrigger className="!p-0 cursor-pointer hover:text-gray-700"><icon.icon className={'text-gray-600'} /></MenubarTrigger>
                <MenubarContent className="bg-white gap-3">
                    <MenubarItem className="hover:bg-gray-100">
                        <CustomLink className="text-sm py-2 w-full" to={'/sign-in'}>Sign in</CustomLink>
                    </MenubarItem>
                    <MenubarItem className="hover:bg-gray-100"> <CustomLink className="text-sm py-2 w-full" to={'/sign-up'}>Sign up</CustomLink></MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>

    )
}

export default UserPopover