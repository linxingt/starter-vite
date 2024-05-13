import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { RefineThemes, ThemedLayoutV2, ThemedTitleV2, RefineSnackbarProvider, useNotificationProvider } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { ShowProductMui } from "./pages/products/showMui";
import { EditProduct } from "./pages/products/edit";
import { EditProductMui } from "./pages/products/editMui";
import { ListProducts } from "./pages/products/list";
import { ListProductsMui } from "./pages/products/listMui";
import { CreateProduct } from "./pages/products/create";
import { CreateProductMui } from "./pages/products/createMui";

import { ListCategoriesMui } from "./pages/categories/listMui";

import { Login } from "./pages/login";
import { LoginMui } from "./pages/loginMui";
import { Header } from "./components/header";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      {/* We're using Refine's Blue theme here. You can use other variants or create your own theme without constraints. */}
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              },
               // We're adding the categories resource to the resources array
              // This way, there will be a link to the categories list in the sidebar
              {
                name: "categories",
                list: "/categories",
                meta: { label: "Categories" },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <ThemedLayoutV2
                      Title={(props) => (
                        <ThemedTitleV2 {...props} text="Awesome Project" />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="protected-products" />}
                />
                <Route path="/products">
                  {/* <Route index element={<ListProducts />} /> */}
                  <Route index element={<ListProductsMui />} />
                  {/* <Route path=":id" element={<ShowProduct />} /> */}
                  <Route path=":id" element={<ShowProductMui />} />
                  {/* <Route path=":id/edit" element={<EditProduct />} /> */}
                  <Route path=":id/edit" element={<EditProductMui />} />
                  {/* <Route path="create" element={<CreateProduct />} /> */}
                  <Route path="create" element={<CreateProductMui />} />
                </Route>
                <Route path="/categories">
                  <Route index element={<ListCategoriesMui />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="protected-products" />
                  </Authenticated>
                }
              >
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/login" element={<LoginMui />} />
              </Route>
            </Routes>
          </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}