import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Loader from "../../components/layout/loader"
import { useDispatch, useSelector } from "react-redux"
import { fetchCartProductDetails } from "../../services/cart.services"
import { getBookDetails } from "../../services/book.services"
import Typography from "../../components/general/typography"
import Button from "../../components/general/button"
import ImageWrapper from "../../components/data-renderers/image-wrapper"
import { IndianRupee } from "lucide-react"
import { constants } from "../../lib/constants"

const CheckoutPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(true)
  const [orderSummary, setOrderSummary] = useState([])
  const dispatch = useDispatch()
  const userCart = useSelector((state) => state.auth.user.cart)
  const navigate = useNavigate()
  const cartProductDetails = useSelector((state) => state.auth.user.cartProductDetails)
  useEffect(() => {
    const product = queryParams.get('product');
    if (product) {
      getBookDetails(product).then(res => {
        setOrderSummary([{ ...res.data, quantity: 1 }])
      })
      setLoading(false)
    }
    else if (!cartProductDetails?.length && userCart?.length) {
      const ids = userCart?.map((item) => item?.product)
      fetchCartProductDetails(ids, dispatch)
    }
    else {
      // navigate('/')
    }

  }, [])
  useMemo(() => {
    const product = queryParams.get('product');
    if (cartProductDetails?.length > 0 && !product) {
      const orderData = userCart?.map((item) => {
        return {
          ...cartProductDetails?.find((book) => book?._id === item?.product),
          quantity: item?.quantity
        }
      })
      setOrderSummary(orderData)
      setLoading(false)
    }
  }, [cartProductDetails])
  if (loading || !orderSummary?.length) return <Loader />
  return (
    <div className="min-w-[90%] md:min-w-[50%] min-h-[70%] border flex flex-col gap-4 justify-center items-start p-6 rounded py-10">
      <Typography variant="subtitle" className="!text-md font-semibold text-left w-full">Order Summary</Typography>
      <div className="flex w-full justify-between flex-col">
        {
          orderSummary?.map((item) => {
            return (
              <div key={item?._id} className="flex w-full justify-between min-h-[100px] max-h-[100px]">
                <div className="w-[20%] flex items-center justify-center">
                  <ImageWrapper className="w-[50px]" src={`https://covers.openlibrary.org/b/isbn/${item?.isbn}-S.jpg`} />
                </div>
                <div className="w-[80%] flex flex-col items-start justify-center">
                  <Typography className="!text-sm font-semibold">{item?.title}</Typography>
                  <Typography className="!text-xs text-gray-400">{item?.authors}</Typography>
                  <Typography className="!text-sm mt-3 font-semibold text-gray-800 flex tracking-wider">{item?.quantity} x <span className="flex justify-center items-center"><IndianRupee size={12} />{item?.price}</span></Typography>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="flex w-full justify-between border"></div>
      <div className="flex w-full justify-between items-center px-14 space-x-3 mt-3 text-xl">
        <Typography className="text-gray-500 text-sm">Total</Typography>
        <Typography className="font-semibold">Rs. {orderSummary?.reduce((acc, item) => acc + item?.price * item?.quantity, 0)}</Typography>
      </div>
      <div className="flex w-full justify-center items-center mt-3">
        <Button onClick={() => { navigate("/success?order=success", { state: { message: constants.orderSuccess, from: "checkout" } }) }} className="w-[80%] bg-[#e59499] hover:bg-[#e59499]/80 rounded-md">Confirm Order</Button>
      </div>
    </div>
  )
}

export default CheckoutPage