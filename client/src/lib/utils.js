import axios from "axios"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import { server } from "./configurables"

export const lightColors = {
  primary: "#000000",
  secondary: "#ffffff",
  primaryText: "#000000",
  primaryBg: "bg-white",
  secondaryBg: "bg-gray-100"
}
export const darkColors = {
  primary: "#ffffff",
  secondary: "#000000",
  primaryText: "#ffffff",
  primaryBg: "bg-black",
  secondaryBg: "bg-[#111827]"
}

export const mergeClasses = (...classes) => {
  return twMerge(clsx(classes))
}

export const scrollOnMount = (width) => {
  const path = window.location.pathname
  let id = path.split("/")[1]
  if (id) {
    let section = document.getElementById(id)
    if (section) {
      if(width > 767){
        section.scrollIntoView({ behavior: 'smooth' })
      }else{
        scrollIntoView(id,true)
      }
    }
  }
}

export const isLinkActive = (path) => {
  return window.location.pathname.split("/")[1] === path
}

export const copyTextToClipboard = async (text) => {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
};

export const scrollIntoView = (id,mobile=false) => {
  if (id !== "blogs") {
    if(mobile){
      const element = document.getElementById(id);
      const offset = 45;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    else{
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    }
  }
}

export const setDefaultTheme = () => {
  const storedTheme = localStorage.getItem('theme')
  if (!storedTheme) {
    localStorage.setItem('theme', import.meta.env.VITE_DEFAULT_THEME.toLowerCase())
  }
}

export function formatDate(isoDateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(isoDateString);
  return date.toLocaleDateString(undefined, options);
}

export const logUser = () => {
  axios.get('https://api.ipify.org?format=json')
  .then(response =>{
    axios.post(server+'/api/log',{
      ip: response?.data?.ip
    })
  })
  .catch(error => console.log(error))
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password) => {
  return password.length >= 8
}