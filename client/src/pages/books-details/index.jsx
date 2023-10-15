import { BadgeDollarSign, ShoppingCart } from "lucide-react"
import ImageWrapper from "../../components/data-renderers/image-wrapper"
import Button from "../../components/general/button"
import Typography from "../../components/general/typography"
import { useNavigate, useParams } from 'react-router-dom'
import NotFound from "../not-found/NotFound"
import { useEffect, useMemo, useState } from "react"
import { getBookDetails } from "../../services/book.services"
import { addorRemoveFromCart, fetchCartProductDetails } from "../../services/cart.services"
import { hideLoader, showLoader } from "../../slices/loaderSlice"
import { useDispatch, useSelector } from "react-redux"
import { updateCart, updateCartProductDetails } from "../../slices/authSlice"
import Loader from "../../components/layout/loader"
const BookDetailsPage = () => {
  const [notfound, setNotFound] = useState(false)
  const [bookData, setBookData] = useState({})
  const dispatch = useDispatch()
  const naviate = useNavigate()
  const cartLoader = useSelector((state) => state.loader.cartButton)
  const userCart = useSelector((state) => state.auth.user.cart)
  const params = useParams()
  const pageLoader = useSelector((state) => state.loader.pageLoader)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    if (params?.bookId && params.bookId !== bookData?._id) {
      dispatch(showLoader('pageLoader'))
      getBookDetails(params.bookId).then(res => {
        setBookData(res.data)
      }).catch(err => {
        console.log(err)
        setNotFound(true)
      }).finally(() => {
        dispatch(hideLoader('pageLoader'))
      })
    }
  }, [])

  useMemo(() => {
    if (params?.bookId && bookData?._id && params.bookId !== bookData?._id) {
      dispatch(showLoader('pageLoader'))
      getBookDetails(params.bookId).then(res => {
        setBookData(res.data)
      }).catch(err => {
        console.log(err)
        setNotFound(true)
      }).finally(() => {
        dispatch(hideLoader('pageLoader'))
      })
    }
  }, [params?.bookId, bookData])

  const handleCart = () => {
    if (!isAuthenticated) {
      return naviate('/sign-in')
    }
    dispatch(showLoader('cartButton'))
    addorRemoveFromCart(bookData?._id).then(res => {
      let productIds = res.data?.cart?.map((item) => item.product)
      if (productIds?.length > 0) {
        fetchCartProductDetails(productIds, dispatch)
      }
      else {
        dispatch(updateCartProductDetails([]))
      }
      dispatch(updateCart(res.data?.cart))
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      dispatch(hideLoader('cartButton'))
    })
  }

  if (pageLoader) return <Loader />

  if (notfound) {
    return (
      <NotFound message="Oops! The book you are looking for is not available" />
    )
  }
  return (
    <div className="flex w-full flex-col md:flex-row justify-center items-center py-8">
      <div className="md:w-[50%] sm:w-[80%] w-[90%] md:pl-4 flex items-center justify-center">
        <ImageWrapper src={`https://covers.openlibrary.org/b/isbn/${bookData?.isbn}-L.jpg`} alt={'Book Cover'}
          className="object-fill rounded-md" />
      </div>
      <div className="md:w-[50%] sm:w-[80%] w-[90%] md:pr-4 h-full flex flex-col justify-center items-center pt-6 md:pt-0 md:items-start gap-4 md:gap-8">
        <Typography variant="h2" className="text-[#e59499]">{bookData?.title} </Typography>
        <Typography className="text-gray-400 md:text-base text-sm">By {bookData?.authors}</Typography>
        <Typography className="text-gray-400 text-left !text-sm">{bookData?.description}</Typography>
        <Typography variant="h3" className="text-[#ff525e]">Rs.{bookData?.price}</Typography>
        <div className="flex md:flex-row gap-4 flex-col w-full justify-center md:justify-start md:space-x-5 items-center">
          <Button onClick={handleCart} disabled={cartLoader} loader={cartLoader} className="bg-[#e59499] rounded-md md:w-fit w-full space-x-3 hover:bg-[#e59499]/90 py-2 min-w-[180px]">
            <span><ShoppingCart size={16} fill={userCart?.find(product => product?.product === bookData?._id)?._id ? '#fff' : 'transparent'} /></span>
            <span>{userCart?.find(product => product?.product === bookData?._id)?._id ? 'Added to Cart' : 'Add to Cart'}</span>
          </Button>
          <Button onClick={() => {
            if (!isAuthenticated) {
              return naviate('/sign-in')
            }
            naviate(`/checkout?product=${bookData?._id}`)
          }} className="py-2 rounded-md  md:w-fit w-full space-x-3">
            <span><BadgeDollarSign size={16} /></span>
            <span>Buy Now</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsPage