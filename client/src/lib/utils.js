import clsx from "clsx"
import { twMerge } from "tailwind-merge"


export const mergeClasses = (...classes) => {
  return twMerge(clsx(classes))
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

export const replaceZoomInUrl = (url, newZoomValue) => {
  var regex = /(http:\/\/|https:\/\/)([^&]*)/;
  var newUrl = url.replace(regex, 'https://$2');
  newUrl = newUrl.replace(/(\bzoom=)(\d+)/, '$1' + newZoomValue);
  return newUrl;
}