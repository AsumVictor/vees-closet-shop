import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
    HomePage,
    ShopPage,
    ShopMenPage,
    ShopWomenPage,
    ShopCategoryPage,
    ProductSearchPage,
    ProductDetailsPage,
    CartPage,
    CheckoutPage,
    LoginPage,
    SignupPage,
    AccountPage,
    AccountSettings,
    Address,
    Security,
    Orders,
    OrderDetail,
    MyAccount,
    ResetPasswordPage
} from './routes';
import {
    AdminLayout,
    AdminLoginPage,
    Products,
    SpecificProduct,
    SettingLayout,
    VariationPage,
    DeliveryPage,
    GenderPage,
    CategoriesPage,
    AdminOrders,
    AdminOrderDetails,
    CreateProduct,
    Dashboard,
} from './adminRoutes';
import PageLayout from './layout/Page.layout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCart } from './redux/actions/cart';
import { getNewProducts } from './redux/actions/newProducts';
import { loadUser } from './redux/actions/user';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/auth/ProtectedRoutes';
import AdminProtected from './components/auth/adminRoutes';
import { LoadCategories } from './redux/actions/variations';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart());
        dispatch(getNewProducts());
        dispatch(loadUser());
        dispatch(LoadCategories());
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<PageLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/men" element={<ShopMenPage />} />
                        <Route path="/women" element={<ShopWomenPage />} />
                        <Route path="/category/:name" element={<ShopCategoryPage />} />
                        <Route path="/product" element={<ProductSearchPage />} />
                        <Route path="/product/:name" element={<ProductDetailsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/forgot-password" element={<ResetPasswordPage />} />
                        {/* User account */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/my-account" element={<AccountPage />}>
                                <Route index element={<MyAccount />} />

                                <Route path="settings" element={<AccountSettings />} />
                                <Route path="orders" element={<Orders />} />
                                <Route path="orders/:id" element={<OrderDetail />} />
                                <Route path="addresses" element={<Address />} />
                                <Route path="security" element={<Security />} />
                            </Route>
                        </Route>

                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Route>
                    <Route element={<AdminProtected />}>
                        <Route path="admin" element={<AdminLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="products" element={<Products />} />
                            <Route path="create-product" element={<CreateProduct />} />

                            <Route path="products/:id" element={<SpecificProduct />} />
                            <Route path="orders" element={<AdminOrders />} />
                            <Route path="orders/:id" element={<AdminOrderDetails />} />

                            <Route path="settings" element={<SettingLayout />}>
                                <Route index element={<h1>Index</h1>} />
                                <Route path="variations" element={<VariationPage />} />
                                <Route path="delivery" element={<DeliveryPage />} />
                                <Route path="gender" element={<GenderPage />} />
                                <Route path="category" element={<CategoriesPage />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="admin/login" element={<AdminLoginPage />} />
                </Routes>
            </BrowserRouter>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </>
    );
}

export default App;
