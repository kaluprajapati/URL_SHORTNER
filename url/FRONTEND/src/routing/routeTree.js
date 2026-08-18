import { createRootRoute } from "@tanstack/react-router"
import { homePageRoute } from "./homepage"
import { authRoute } from "./auth.route"
import { dasboardRoute } from "./dashboard"
import RootLayout from "../RootLayout"
import RedirectPage from "../pages/RedirectPage"
import { createRoute } from "@tanstack/react-router"

export const rootRoute = createRootRoute({
    component: RootLayout
})

export const redirectRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/redirect',
    component: RedirectPage,
})

export const routeTree = rootRoute.addChildren([
    homePageRoute,
    authRoute,
    dasboardRoute,
    redirectRoute,
])

