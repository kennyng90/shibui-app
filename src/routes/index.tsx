import { Outlet, Router, Route, RootRoute } from '@tanstack/react-router';
import { Navbar, Login } from '@/components';
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

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: function login() {
    return <Login />;
  }
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
