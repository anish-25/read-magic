import { Route, Routes, useLocation } from 'react-router-dom'

import PrivateRoutes from "./private-routes"
import PublicRoutes from "./public-routes"
import { commonRoutes, privateRoutes, publicRoutes } from "./routes"

import Header from '../components/layout/header'
import Container from '../components/layout/container'

import { pathsWithoutHeader } from "./paths"
import NotFound from '../pages/not-found/NotFound'
import Footer from '../components/layout/footer'

const AllRoutes = () => {
    const location = useLocation()
    const hideHeader = pathsWithoutHeader.includes(location.pathname)
    return (
        <>
            {hideHeader ? null : <Header />}
            <Container>
                <Routes>
                    {
                        commonRoutes.map(route => {
                            return (
                                <Route key={route.path} path={route.path} element={route.element} />
                            )
                        })
                    }
                    <Route path="/" element={<PublicRoutes />}>
                        {
                            publicRoutes.map(route => {
                                return (
                                    <Route key={route.path} path={route.path} element={route.element} />
                                )
                            })
                        }
                    </Route>
                    <Route path="/" element={<PrivateRoutes />}>
                        {
                            privateRoutes.map(route => {
                                return (
                                    <Route key={route.path} path={route.path} element={route.element} />
                                )
                            })
                        }
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
            {hideHeader ? null : <Footer />}
        </>
    )
}

export default AllRoutes