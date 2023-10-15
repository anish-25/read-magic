import { mergeClasses } from "../../lib/utils"

const BouncingDotsLoader = ({ className }) => {
    return (
        <div className="bouncing-loader">
            <div className={mergeClasses("bg-white h-[10px] w-[10px]", className)}></div>
            <div className={mergeClasses("bg-white h-[10px] w-[10px]", className)}></div>
            <div className={mergeClasses("bg-white h-[10px] w-[10px]", className)}></div>
        </div >
    )
}

export default BouncingDotsLoader