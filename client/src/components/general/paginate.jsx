import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({
    postsPerPage,
    totalPosts,
    paginate,
    currentPage,
}) {


    return (
        <div className='py-2'>
            <nav className='block'></nav>
            <div className="space-y-3">
                <nav
                    className='relative z-0 inline-flex rounded-md shadow-md -space-x-px w-full justify-center items-center'
                    aria-label='Pagination'
                >
                    <button
                        onClick={() => {
                            if (currentPage > 1) {
                                paginate(currentPage - 1);
                            }
                        }}
                        href='#'
                        className='relative inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-100 transition-all'
                    >
                        <span><ArrowLeft color="#e59499" size={23} /></span>
                    </button>
                    <div className="flex justify-between w-full items-center space-x-4 !mx-10 text-sm font-semibold">
                        {
                            Array.from({ length: Math.ceil(totalPosts / postsPerPage) }, (_, index) => (
                                index + 1 == currentPage - 1 || (index + 1 >= currentPage && index + 1 < currentPage + 6 && index + 1 !== Math.ceil(totalPosts / postsPerPage) - 4) || (index + 1 >= Math.ceil(totalPosts / postsPerPage) - 1) ?
                                    <span key={index} onClick={() => paginate(index + 1)} className={index + 1 === currentPage ? "text-[#e59499] cursor-pointer" : "text-gray-600 hover:text-[#e59499] cursor-pointer transition-all"}>{index + 1}</span>
                                    : index + 1 === Math.ceil(totalPosts / postsPerPage) - 4 ?
                                        <span key={index} className="text-gray-600">...</span>
                                        : null
                            ))
                        }
                    </div>
                    <button
                        onClick={() => {
                            if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
                                paginate(currentPage + 1);
                            }
                        }}
                        href='#'
                        className='relative inline-flex items-center px-2 py-2 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-100 transition-all'
                    >
                        <span><ArrowRight color="#e59499" size={23} /></span>
                    </button>
                </nav>
                <div>
                    <p className='text-sm text-gray-700'>
                        {'Showing '}
                        <span className='font-medium'>{(currentPage * postsPerPage) - postsPerPage + 1}</span>
                        {' to'}
                        <span className='font-medium'> {currentPage * postsPerPage} </span>
                        of
                        <span className='font-medium'> {totalPosts} </span>
                        results
                    </p>
                </div>
            </div>
        </div>
    );
}