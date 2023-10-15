import { Minus, Plus } from "lucide-react"
import Button from "../general/button"
import { updateProductQuantity } from "../../services/cart.services"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { mergeClasses } from "../../lib/utils"

const QuantitySelector = ({ id,quantity }) => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    return (
        <div className={mergeClasses("flex w-[100px] h-[35px] border justify-around items-center rounded-lg border-gray-300",loader ? 'opacity-60 cursor-wait' : 'opacity-100')}>
            <Button disabled={loader} className="!min-w-[0px] !min-h-0 !py-0 bg-transparent text-black !text- hover:!bg-transparent" onClick={() => quantity > 1 && updateProductQuantity(id, quantity - 1,dispatch,setLoader)}> <Minus size={16} /></Button>
            <input className="text-sm font-semibold bg-transparent w-[20px] pl-1.5 flex items-center justify-center" value={quantity} onChange={() => {}} />
            <Button disabled={loader} className="!min-w-[0px] !min-h-0 !py-0 bg-transparent text-black !text- hover:!bg-transparent" onClick={() => quantity < 9 && updateProductQuantity(id, quantity + 1,dispatch,setLoader)}> <Plus size={16} /></Button>
        </div>
    )
}

export default QuantitySelector