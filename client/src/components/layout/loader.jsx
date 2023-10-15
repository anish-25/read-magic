import BouncingDotsLoader from '../general/bouncing-dots'

const Loader = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <BouncingDotsLoader className={"bg-[#e59499]"} />
        </div>
    )
}

export default Loader
