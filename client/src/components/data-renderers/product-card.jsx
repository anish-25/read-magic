import ImageWrapper from './image-wrapper'
import Typography from '../general/typography'
import Rating from './rating'
import QuantitySelector from './quantity'
import Button from '../general/button'
import { Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { mergeClasses } from '../../lib/utils'
import { useState } from 'react'
import { addorRemoveFromCart, fetchCartProductDetails } from '../../services/cart.services'
import { updateCart, updateCartProductDetails } from '../../slices/authSlice'
import BouncingDotsLoader from '../general/bouncing-dots'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const userCart = useSelector((state) => state.auth.user.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const quantity = userCart?.find(item => item?.product?.toString() === product?._id)?.quantity
    const [loading, setLoading] = useState(false)
    const handleRemoveFromCart = () => {
        setLoading(true)
        addorRemoveFromCart(product?._id).then(res => {
            let productIds = res.data?.cart?.map((item) => item.product)
            dispatch(updateCart(res.data?.cart))
            if (productIds?.length > 0) {
                fetchCartProductDetails(productIds, dispatch)
            }
            else {
                dispatch(updateCartProductDetails([]))
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
        })
    }
    return (
        <div className="flex w-full min-h-[230px] max-h-[230px] border shadow-md rounded-md p-3 justify-center items-center hover:bg-gray-100 transition-all">
            {
                loading ?
                    <div className="w-full h-full flex justify-center items-center">
                        <BouncingDotsLoader className={"bg-[#e59499]"} />
                    </div>
                    :
                    <>
                        <div className="w-[20%]">
                            <ImageWrapper className="rounded-md max-h-[170px]" src={`https://covers.openlibrary.org/b/isbn/${product?.isbn}-L.jpg`} />
                        </div>
                        <div className="w-[60%] flex justify-center items-start text-left px-4 flex-col">
                            <Typography onClick={() => { navigate(`/book-details/${product?._id}`) }} variant="h3" className="md:!text-lg !text-sm cursor-pointer">{product?.title?.length > 40 ? product?.title?.slice(0, 40) + '...' : product?.title}</Typography>
                            <Typography className={'text-gray-600 font-sans text-xs md:text-sm font-normal leading-normal capitalize min-h-[30px]'}>{product?.authors}</Typography>
                            <Rating rating_value={product?.average_rating} numberOfReviews={product?.ratings_count} />
                            <Typography className="mt-2 text-sm text-gray-500">Rs.{product?.price}</Typography>
                            <div className={mergeClasses("mt-3 opacity-60 hover:opacity-80")}>
                                <QuantitySelector id={product?._id} quantity={quantity} />
                            </div>
                        </div>
                        <div className="w-[20%] flex justify-center items-center flex-col h-full gap-6">
                            <Typography variant="h3" className="md:!text-lg !text-sm">Rs. {product?.price * quantity}</Typography>
                            <Button onClick={handleRemoveFromCart} className="!min-h-0 !min-w-0 !py-0 !text-sm rounded-md h-[30px] group  transition-all text-gray-400 bg-transparent space-x-2 hover:!bg-transparent hover:text-red-500">
                                <span><Trash2 size={16} className='fill-gray-200 group-hover:fill-red-200' /></span>
                                <span className='md:flex hidden'>Remove</span>
                            </Button>
                        </div>
                    </>
            }
        </div>
    )
}

export default ProductCard