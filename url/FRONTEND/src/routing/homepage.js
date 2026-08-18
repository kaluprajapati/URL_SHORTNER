import { createRoute, redirect } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"

export const homePageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: ({ context }) => {
      const { store } = context
      const { isAuthenticated } = store.getState().auth

      if (isAuthenticated) {
        throw redirect({ to: '/dashboard' })
      }

      throw redirect({ to: '/auth' })
    },
  })