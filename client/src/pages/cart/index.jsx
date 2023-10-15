import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/layout/loader"
import ProductCard from "../../components/data-renderers/product-card"
import DeliveryCard from "../../components/data-renderers/delivery-card"
import { useEffect, useState } from "react"
import { fetchCartProductDetails } from "../../services/cart.services"
import NotFound from "../not-found/NotFound"
import images from "../../assets/images"

const CartPage = () => {
    const [loader, setLoader] = useState(true)
    const userCart = useSelector((state) => state.auth.user.cart)
    const cartProductDetails = useSelector((state) => state.auth.user.cartProductDetails)
    const dispatch = useDispatch()

    useEffect(() => {
        let productIds = userCart?.map((item) => item.product)
        if (productIds?.length && !cartProductDetails?.length) {
            fetchCartProductDetails(productIds, dispatch, setLoader)
        }
        else {
            setTimeout(() => {
                setLoader(false)
            }, 1000)
        }
    }, [])

    if (loader) return <Loader />
    return (
        <div className="w-full h-full flex flex-col lg:flex-row justify-around items-center py-6">
            {
                cartProductDetails?.length > 0 ?
                    <>
                        <div className="lg:w-[60%] flex justify-start items-start flex-col gap-4 px-5 lg:h-[calc(100vh-170px)] lg:overflow-auto">
                            {
                                cartProductDetails?.map((product) => (
                                    <ProductCard key={product?._id} product={product} />
                                ))
                            }
                        </div>
                        <div className="lg:w-[40%] w-full lg:mt-0 mt-4  flex justify-center items-center px-6">
                            <DeliveryCard />
                        </div>
                    </>
                    :
                    <NotFound image={images.EmptyCartImage} message="Your cart is empty" />

            }

        </div>
    )
}

export default CartPage