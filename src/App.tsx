import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import {
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
// inclu <ThemedHeaderV2>, <ThemedSiderV2> et son <ThemedTitleV2> par default,
// <Footer> et <OffLayoutArea> non default value
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  // Navigate,
} from "react-router-dom";
// We'll wrap our app with Ant Design's ConfigProvider to set the theme and App component to use the theme properly.
import { ConfigProvider, App as AntdApp } from "antd";
// We're importing a reset.css file to reset the default styles of the browser.

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";
import { i18nProvider } from "./providers/i18n-provider";

import { ShowProduct } from "./pages/products/show";
import { ShowProductAntd } from "./pages/products/showAntd";
import { EditProduct } from "./pages/products/edit";
import { EditProductUseForm } from "./pages/products/editUseForm";
import { EditProductUseFormAntd } from "./pages/products/editUseFormAntd";
import { ListProducts } from "./pages/products/list";
import { ListProductsUseTable } from "./pages/products/listUseTable";
import { ListProductsUseTableAntd } from "./pages/products/listUseTableAntd";
import { CreateProduct } from "./pages/products/create";
import { CreateProductAntd } from "./pages/products/createAntd";

import { ListCategories } from "./pages/categories/list";
import { CreateCategoryAntd } from "./pages/categories/createAntd";
import { EditCategoryAntd } from "./pages/categories/editAntd";
import { ShowCategoryAntd } from "./pages/categories/showAntd";

import { Login } from "./pages/login";
import { LoginAntd } from "./pages/loginAntd";
// import { Header } from "./components/header";

import "antd/dist/reset.css";

function App(): JSX.Element {
  return (
    (<BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              // i18nProvider={i18nProvider}
              dataProvider={dataProvider}
              authProvider={authProvider}
              routerProvider={routerProvider}
              // notif pop up for record is created, updated, or deleted, when there is an error from your data provider or your auth provider.
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "protected-products",
                  list: "/products",
                  show: "/products/:id",
                  edit: "/products/:id/edit",
                  create: "/products/create",
                  meta: { label: "Products" }, //applique dans <ThemedSiderV2 />
                },
                // We're adding the categories resource to the resources array
                // This way, there will be a link to the categories list in the sidebar
                {
                  name: "categories",
                  list: "/categories",
                  show: "/categories/:id",
                  edit: "/categories/:id/edit",
                  create: "/categories/create",
                  meta: {
                    label: "Categories",
                    canDelete: true
                  },
                },
              ]}
              options={{
                projectId: "jCWb2V-MyRTth-N7mvsv"
              }}>
              <Routes>
                <Route
                  element={
                    // We're wrapping our routes with the `<Authenticated />` component
                    // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
                    // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
                    <Authenticated
                      key="authenticated-routes"
                      redirectOnFail="/login"
                    >
                      {/* <Header /> */}
                      <ThemedLayoutV2
                        Title={(props) => (
                          <ThemedTitleV2 {...props} text="tuto refine" />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    // element={<Navigate to="/products" />}
                    // We're also replacing the <Navigate /> component with the <NavigateToResource /> component.
                    // It's tailored version of the <Navigate /> component that will redirect to the resource's list route.
                    element={
                      <NavigateToResource resource="protected-products" />
                    }
                  />
                  <Route path="/products">
                    {/* <Route index element={<ListProducts />} /> */}
                    {/* <Route index element={<ListProductsUseTable />} /> */}
                    <Route index element={<ListProductsUseTableAntd />} />
                    {/* <Route path=":id" element={<ShowProduct />} /> */}
                    <Route path=":id" element={<ShowProductAntd />} />
                    {/* <Route path=":id/edit" element={<EditProduct />} /> */}
                    {/* <Route path=":id/edit" element={<EditProductUseForm />} /> */}
                    <Route
                      path=":id/edit"
                      element={<EditProductUseFormAntd />}
                    />
                    {/* <Route path="create" element={<CreateProduct />} /> */}
                    <Route path="create" element={<CreateProductAntd />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<ListCategories />} />
                    <Route path="create" element={<CreateCategoryAntd />} />
                    <Route path=":id/edit" element={<EditCategoryAntd />} />
                    <Route path="/categories/:id" element={<ShowCategoryAntd />} />
                  </Route>
                </Route>
                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      {/* We're redirecting the user to `/` if they are authenticated and trying to access the `/login` route */}
                      {/* <Navigate to="/products" /> */}
                      {/* We're also replacing the <Navigate /> component with the <NavigateToResource /> component. */}
                      {/* It's tailored version of the <Navigate /> component that will redirect to the resource's list route. */}
                      <NavigateToResource resource="protected-products" />
                    </Authenticated>
                  }
                >
                  {/* <Route path="/login" element={<Login />} /> */}
                  <Route path="/login" element={<LoginAntd />} />
                </Route>
              </Routes>
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>)
  );
}

export default App;
