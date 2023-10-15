import { useSelector } from "react-redux"
import useScroll from "../../hooks/useScroll"
import useWindowSize from "../../hooks/useWindowSize"
import { mergeClasses } from "../../lib/utils"
import { NavbarIcons, NavbarLinks, mobileNavIcons } from "../../lib/configurables"
import CustomLink from "../general/custom-link"
import IconButton from "../general/icon-button"
import { Menu, Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../general/drawer"
import Logo from "../general/logo"
import UserPopover from "../data-renderers/user-popover"
import UserAvatar from "../data-renderers/user-avatar"
import { useLocation } from "react-router-dom"
import SearchModal from "../modals/search-modal"
import Typography from "../general/typography"
import useLogout from "../../hooks/useLogout"
import ImageWrapper from "../data-renderers/image-wrapper"

const Header = () => {
  const scrolled = useScroll(40)
  const windowSize = useWindowSize()
  const logout = useLogout()
  const [isOpen, setIsOpen] = useState(false)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const userCart = useSelector((state) => state.auth.user.cart)
  useEffect(() => {
    if (windowSize?.width && windowSize?.width > 767 && isOpen) {
      setIsOpen(false);
    }
  }, [windowSize, isOpen]);
  const avatar = useSelector((state) => state.auth?.user?.avatar)
  const name = useSelector((state) => state.auth?.user?.name)
  const location = useLocation()
  return (
    <header id="header" className={mergeClasses(
      'sticky top-0 z-30 w-full border-b border-transparent bg-gray max-md:border-gray-200 transition-colors duration-300',
      scrolled ? 'bg-gray/25 backdrop-blur-md md:border-gray-100' : '',
    )}>
      <div className="mx-auto flex w-full md:min-h-[80px] max-w-7xl items-center justify-between p-4 md:px-8">
        <Logo />
        <div className="hidden items-center gap-6 md:flex">
          <ul className={"flex list-none items-center gap-6"}>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <CustomLink to={link.href}
                  className={mergeClasses("text-gray-500 text-xs font-bold uppercase", location.pathname === link.href ? "text-[#e59499] hover:text-[#e59499]/90" : "")}
                >{link.label}</CustomLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <ul className={mergeClasses("flex list-none items-center gap-6")}>
            {NavbarIcons.map((icon) => {
              return (
                icon.private === isAuthenticated || icon.name === "Search" ? (
                  icon.name === "User" ? (
                    <UserPopover key={icon.name} icon={icon} />
                  ) :
                    icon.name === "Avatar" ? (
                      <UserAvatar key={icon.name} />
                    ) :
                      icon.name === "Search" ? (
                        <SearchModal key={icon.name} />
                      ) :
                        (
                          <li key={icon.name}>
                            <CustomLink className="relative" to={icon.href}
                            >
                              {
                                icon.name === "ShoppingCart" && userCart?.length ? (
                                  <span className="absolute bottom-4 left-4 font-normal bg-[#e59499] text-white !text-xs px-1 rounded-full">{userCart?.length}</span>
                                ):<></>
                              }
                              <icon.icon />
                            </CustomLink>
                          </li>
                        )) : <></>
              )
            })}
          </ul>
        </div>
        <div className="flex md:hidden space-x-6">
          <SearchModal key={Search} />

          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild className="flex md:hidden">
              <IconButton className="hover:bg-transparent" aria-label={"menu-icon-open"}
                role="button"
                id={"menu-icon-open"}>
                <Menu />
              </IconButton>
            </DrawerTrigger>
            <DrawerContent className="!bg-[gainsboro]">
              <div className="flex items-center justify-between border-b border-gray-100 p-4">
                <Logo />
                <DrawerClose asChild>
                  <IconButton className="hover:bg-transparent" aria-label={"menu-icon-close"}
                    role="button"
                    id={"menu-icon-close"}>
                    <X />
                  </IconButton>
                </DrawerClose>
              </div>
              <div className="border-b border-gray-100 p-4">
                <ul className="flex list-none flex-col gap-4">
                  {NavbarLinks.map((link, index) => (
                    <li key={index}>
                      <CustomLink
                        to={link.href}
                        onClick={() => {
                          const timeoutId = setTimeout(() => {
                            setIsOpen(false);
                            clearTimeout(timeoutId);
                          }, 200);
                        }}
                      >
                        {link.label}
                      </CustomLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="items-center gap-6 justify-around w-full p-4 pt-8 flex">
                <ul className={"flex list-none flex-col items-start gap-6 w-full"}>
                  {mobileNavIcons.map((icon) => {
                    return (
                      icon.private === isAuthenticated || icon.name === "ShoppingCart" ? (
                        icon.name === "Logout" ? (
                          <li key={icon.name}
                            onClick={() => {
                              const timeoutId = setTimeout(() => {
                                setIsOpen(false);
                                clearTimeout(timeoutId);
                              }, 200);
                            }}>
                            <CustomLink className="flex space-x-2 items-center justify-center" onClick={logout}
                            >
                              <icon.icon />
                              <Typography className="text-base">{icon.name}</Typography>
                            </CustomLink>
                          </li>
                        ) :
                          icon.name === "Profile" ? (
                            <li key={icon.name} onClick={() => {
                              const timeoutId = setTimeout(() => {
                                setIsOpen(false);
                                clearTimeout(timeoutId);
                              }, 200);
                            }}>
                              <CustomLink className="flex space-x-2 items-center justify-center" to={icon.href}
                              >
                                {
                                  avatar ? (
                                    <ImageWrapper src={avatar} alt="User Avatar" width={30} height={30} />
                                  ) : (
                                    <span className="text-white text-sm font-semibold w-7 h-7 bg-green-700 rounded-full flex items-center justify-center">{name.charAt(0).toUpperCase()}</span>
                                  )
                                }
                                <Typography className="text-base">{icon.name}</Typography>
                              </CustomLink>
                            </li>
                          ) :
                            (
                              <li key={icon.name} onClick={() => {
                                const timeoutId = setTimeout(() => {
                                  setIsOpen(false);
                                  clearTimeout(timeoutId);
                                }, 200);
                              }}>
                                <CustomLink className="flex space-x-2 items-center justify-center" to={icon.href}
                                >
                                  <icon.icon />
                                  <Typography className="text-base text-gra">{icon.name}</Typography>
                                </CustomLink>
                              </li>
                            )) : <></>
                    )
                  })}
                </ul>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  )
}

export default Header