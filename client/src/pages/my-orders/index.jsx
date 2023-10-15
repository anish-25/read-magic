import images from "../../assets/images"
import NotFound from "../not-found/NotFound"

const OrdersPage = () => {
    return (
        <NotFound message="This feature is currently under development" image={images.UnderDevelopmentImage} />
    )
}

export default OrdersPage