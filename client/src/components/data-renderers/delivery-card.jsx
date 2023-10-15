import { useDispatch, useSelector } from "react-redux"
import Button from "../general/button"
import Typography from "../general/typography"
import { useNavigate } from "react-router-dom"
import { hideLoader, showLoader } from "../../slices/loaderSlice"

const DeliveryCard = () => {
  const userCartProductDetails = useSelector((state) => state.auth.user.cartProductDetails)
  const proceedToCheckoutButton = useSelector((state) => state.loader.proceedToCheckoutButton)
  const userCart = useSelector((state) => state.auth.user.cart)
  const subtotal = userCartProductDetails?.reduce((acc, item) => acc + item.price * userCart?.find(book => book?.product?.toString() === item?._id)?.quantity, 0)
  let discount = parseInt(subtotal * 0.2)
  if (discount > 500) discount = 500
  const tax = parseInt(subtotal * 0.18)
  const total = subtotal - discount + tax
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className="w-full border flex flex-col !text-xs md:!text-sm gap-4 justify-center items-start p-6 rounded md:py-28 py-6">
      <Typography variant="subtitle" className="!text-md font-semibold text-left w-full">Card Totals</Typography>
      <div className="flex w-full justify-between mt-3">
        <Typography className="text-gray-500">Subtotal</Typography>
        <Typography className="font-semibold">Rs. {subtotal}</Typography>
      </div>
      <div className="flex w-full justify-between">
        <Typography className="text-gray-500">Shipping</Typography>
        <Typography className="font-semibold">Free</Typography>
      </div>
      <div className="flex w-full justify-between">
        <Typography className="text-gray-500">Discount - (20% - upto 500)</Typography>
        <Typography className="font-semibold">Rs. {discount}</Typography>
      </div>
      <div className="flex w-full justify-between">
        <Typography className="text-gray-500">Tax - (18%)</Typography>
        <Typography className="font-semibold">Rs. {tax}</Typography>
      </div>
      <div className="flex w-full justify-between border"></div>
      <div className="flex w-full justify-between mt-3">
        <Typography className="text-gray-500">Total</Typography>
        <Typography className="font-semibold">Rs. {total}</Typography>
      </div>
      <div className="flex w-full justify-center items-center mt-3">
        <Button loader={proceedToCheckoutButton} onClick={() => {
          dispatch(showLoader('proceedToCheckoutButton'))
          setTimeout(() => {
            navigate("/checkout")
            dispatch(hideLoader('proceedToCheckoutButton'))
          }, 1000)
        }} className="w-[80%] bg-[#e59499] hover:bg-[#e59499]/80 rounded-md">Proceed To Checkout</Button>
      </div>
    </div>
  )
}

export default DeliveryCard