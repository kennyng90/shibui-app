import { Outlet, Router, Route, RootRoute } from '@tanstack/react-router';
import { Navbar, SignIn } from '@/components';
import App from '@/App';

const rootRoute = new RootRoute({
  component: () => (
    <main className="mx-auto max-w-3xl px-3 lg:px-10">
      <Navbar />
      <Outlet />
    </main>
  )
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return <App />;
  }
});

const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: function auth() {
    return <SignIn />;
  }
});

const routeTree = rootRoute.addChildren([indexRoute, signInRoute]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
