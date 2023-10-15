import { useDispatch, useSelector } from "react-redux"
import BlogCards from "../components/data-renderers/blog-cards"
import Tag from "../components/data-renderers/tag"
import Container from "../components/layout/container"
import { useEffect } from "react"
import { setBlogs } from "../slices/blogsSlice"
import axios from "axios"
import { server } from "../lib/configurables"
import NoData from "../components/general/no-data"
import { Helmet } from "react-helmet"
import CustomLink from "../components/general/custom-link"

const Blogs = () => {
    const { blogs } = useSelector((state) => state.blogs)
    const dispatch = useDispatch()

    const fetchBlogs = () => {
        axios.get(server + '/api/blogs').then(res => dispatch(setBlogs(res.data)))
    }

    useEffect(() => {
        if (!blogs?.length) {
            fetchBlogs()
        }
    }, [blogs])
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <Container>
            <Helmet>
                <title>Anish&apos;s Blogs</title>
                <meta name="description" content="Explore Anish's thought-provoking and informative blogs covering a wide range of topics for an engaging reading experience." />
                <meta name="author" content="Anish" />
                <meta name="keywords" content="Anish, Anish's blogs, Blog, Blog posts, Blog posts by Anish, Blog posts by Anish, Anish blogs, Anish blogs, Anish's blogs" />
            </Helmet>
            <div className="flex flex-col items-center gap-5">
                <div className="self-center">
                    <Tag label="Blogs" />
                </div>
                {blogs?.length ?
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20">
                        {blogs?.map((blog) => (
                            <CustomLink to={blog?.node?.url} externalLink={true} key={blog?.node?.id}>
                                <BlogCards blog={blog} />
                            </CustomLink>
                        ))}
                    </div>
                    :
                    typeof blogs !== 'undefined' ?
                        <NoData message="No Blogs Found" />
                        : <></>
                }
            </div>
        </Container>
    )
}

export default Blogs