import { Search } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../general/dialog"
import FormInput from "../general/form-input"
import SearchedBook from "../data-renderers/searched-book"
import ImageWrapper from "../data-renderers/image-wrapper"
import images from "../../assets/images"
import Typography from "../general/typography"
import { useEffect, useMemo, useState } from "react"
import useDebounce from "../../hooks/useDebouncer"
import { searchForABook } from "../../services/book.services"
import NotFound from "../../pages/not-found/NotFound"
import BouncingDotsLoader from "../general/bouncing-dots"


const SearchModal = () => {
    const [searchTerm, setSearchTerm] = useState("")
    let debounced = useDebounce(searchTerm, 500)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [infiniteLoading, setInfiniteLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [searchResults, setSearchResults] = useState([])
    const [open, setIsOpen] = useState(false)
    const handleChange = (e) => {
        setSearchResults([])
        setSearchTerm(e.target.value)
    }
    useMemo(() => {
        if (debounced?.length) {
            setLoading(true)
            setHasMore(true)
            setPage(0)
            searchForABook(debounced).then(res => {
                if (res.data?.length) {
                    setSearchResults(res.data)
                }
                else setSearchResults([])
            }).catch(err => {
                console.log(err)
                setSearchResults([])
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [debounced])

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;

        if (scrollTop + clientHeight === scrollHeight) {
            if (!infiniteLoading && hasMore) {
                setInfiniteLoading(true)
                setPage((prev) => prev + 1)
            }
        }
    };
    useMemo(() => {
        if (page + 1 > 1 && debounced?.length && hasMore) {
            searchForABook(searchTerm, page + 1).then(res => {
                if (res.data?.length) {
                    setSearchResults([...searchResults, ...res.data])
                }
                else {
                    setHasMore(false)
                }
            }).catch(err => {
                console.log(err)
                setSearchResults([])
            }).finally(() => {
                setTimeout(() => {
                    setInfiniteLoading(false)
                }, 500);
            })
        }
    }, [page])
    useEffect(() => {
        const divElement = document.getElementById('scrollableDiv');
        if (divElement) {
            divElement.addEventListener('scroll', handleScroll);

        }
    }, [searchResults]);
    return (
        <Dialog open={open} onOpenChange={() => { setIsOpen(prev => !prev); setSearchTerm("") }}>
            <DialogTrigger className="text-center flex items-center justify-center"><Search className="text-gray-600" /></DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle className="text-sm text-left md:text-lg md:text-center">Search for a book using title or author</DialogTitle>
                    <DialogDescription className={'min-h-[50vh] rounded px-3 flex flex-col gap-8 justify-center items-center'}>
                        <FormInput name="search" value={searchTerm} error={false} errorMessage={""} onChange={handleChange} label={""} Icon={Search} placeholder={"Angels & Demons or J.K Rowling"} type={"text"} />
                        <div id="scrollableDiv" className="w-full flex flex-col justify-center items-center min-h-[60vh]  max-h-[60vh] overflow-y-auto gap-3">
                            {
                                searchTerm?.length ?
                                    loading ?
                                        <div className="w-full h-full min-h-[40vh] flex justify-center items-center">
                                            <BouncingDotsLoader className={"bg-[#e59499]"} />
                                        </div>
                                        :
                                        !searchResults?.length && typeof searchResults !== "undefined" ?
                                            <div className="">
                                                <NotFound message={"No books found"} />
                                            </div>
                                            :
                                            <div className="w-full h-full min-h-[40vh] flex flex-col py-4 justify-start items-center">
                                                {
                                                    searchResults?.map((book) => {
                                                        return (
                                                            <SearchedBook setIsOpen={setIsOpen} key={book?.id} book={book} />
                                                        )
                                                    })
                                                }
                                            </div>
                                    :
                                    <div className="flex flex-col w-full justify-center items-center h-full gap-8">
                                        <ImageWrapper className={'w-[50%]'} src={images.SearchModalImage} />
                                        <Typography variant="h3" className="!text-lg text-[#e59499]">Enter a search term</Typography>
                                    </div>
                            }
                        </div>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SearchModal
